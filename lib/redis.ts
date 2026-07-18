import { Redis } from "@upstash/redis";
import { env } from "./env";

/**
 * Resolves the Redis REST client.
 *
 * Supports two configurations:
 *
 *   1) REDIS_URL + REDIS_TOKEN explicitly set.
 *   2) REDIS_URL alone, with credentials embedded:
 *        https://default:<token>@<host>.upstash.io
 *
 * Returns `null` if no Redis is configured — callers can then decide
 * whether to fall back or refuse the request.
 */

export type RedisResolved =
  | { ok: true; client: Redis }
  | { ok: false; reason: "missing" | "invalid-url" };

let cached: Redis | null = null;
let resolved: RedisResolved | null = null;

export function getRedis(): RedisResolved {
  if (resolved) return resolved;

  const raw = env.REDIS_URL.trim();
  if (!raw) {
    resolved = { ok: false, reason: "missing" };
    return resolved;
  }

  let url: string | null = null;
  let token: string | null = env.REDIS_TOKEN || null;

  try {
    // Accept either "redis://...", "rediss://...", or "https://...".
    const u = new URL(raw);
    if (u.protocol === "redis:" || u.protocol === "rediss:") {
      // TCP form. The Upstash REST SDK does not support it directly —
      // the user must set the REST URL+token in that case.
      resolved = { ok: false, reason: "invalid-url" };
      return resolved;
    }
    if (u.username) {
      token = token || decodeURIComponent(u.password);
      // Strip credentials from the URL — the SDK prefers them separate.
      u.username = "";
      u.password = "";
      url = u.toString().replace(/\/$/, "");
    } else {
      url = raw.replace(/\/$/, "");
    }
  } catch {
    resolved = { ok: false, reason: "invalid-url" };
    return resolved;
  }

  if (!token) {
    resolved = { ok: false, reason: "invalid-url" };
    return resolved;
  }

  cached = new Redis({ url: url as string, token });
  resolved = { ok: true, client: cached };
  return resolved;
}

/**
 * Throws-friendly variant for routes that must have Redis configured.
 */
export function requireRedis(): Redis {
  const r = getRedis();
  if (!r.ok) {
    throw new Error(
      r.reason === "missing"
        ? "Redis is not configured. Set REDIS_URL and REDIS_TOKEN."
        : "REDIS_URL appears to be a TCP/redis:// URL. The Upstash SDK requires the REST URL (https://...).",
    );
  }
  return r.client;
}