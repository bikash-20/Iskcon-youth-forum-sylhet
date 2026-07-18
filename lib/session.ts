import crypto from "node:crypto";
import { env } from "./env";

/**
 * Tiny stateless session: HMAC-signed cookie carrying `exp`.
 *
 * Format: `${base64url(JSON)}|${base64url(hmac)}`.
 *
 * Why not `iron-session` or NextAuth? We have exactly one authenticated
 * surface (the admin dashboard), one secret, one cookie. Adding a dep for
 * 30 lines of well-trodden crypto would be over-engineering.
 */

const ENCODER = new TextEncoder();

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function hmac(payload: string): string {
  const key = crypto.createHash("sha256").update(env.SESSION_SECRET).digest();
  const sig = crypto.createHmac("sha256", key).update(ENCODER.encode(payload));
  return b64urlEncode(sig.digest());
}

export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + env.SESSION_TTL_SECONDS;
  const payload = JSON.stringify({ exp });
  return `${b64urlEncode(Buffer.from(payload))}|${hmac(payload)}`;
}

export type SessionVerifyResult =
  | { ok: true; exp: number }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" };

export function verifySessionToken(token: string | undefined): SessionVerifyResult {
  if (!token) return { ok: false, reason: "malformed" };
  const [body, sig] = token.split(".");
  if (!body || !sig) return { ok: false, reason: "malformed" };

  let payload: string;
  try {
    payload = b64urlDecode(body).toString("utf8");
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (hmac(payload) !== sig) return { ok: false, reason: "bad-signature" };

  let parsed: { exp?: number };
  try {
    parsed = JSON.parse(payload);
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (typeof parsed.exp !== "number") return { ok: false, reason: "malformed" };
  if (parsed.exp * 1000 < Date.now()) return { ok: false, reason: "expired" };

  return { ok: true, exp: parsed.exp };
}

/**
 * Constant-time string compare. Use for password checks to neutralise
 * timing oracles — Next.js servers sit behind shared infra.
 */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export const SESSION_COOKIE = env.SESSION_COOKIE_NAME;
