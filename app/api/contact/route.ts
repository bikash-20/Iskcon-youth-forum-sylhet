import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { ContactSchema } from "@/lib/schema";
import { saveSubmission } from "@/lib/store";
import { confirmUser, notifyAdmin } from "@/lib/mail";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { getRedis } from "@/lib/redis";
import { fail, methodNotAllowed, ok } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = { key: "contact", limit: 5, windowSec: 60 * 10 }; // 5 per 10 min

export async function POST(req: Request) {
  // 1. Method-aware guard
  if (req.method !== "POST") {
    return methodNotAllowed(["POST"]);
  }

  // 2. Parse + validate
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return fail(400, "Invalid JSON body", "bad_json");
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return fail(422, parsed.error.issues[0]?.message ?? "Invalid input", "validation");
  }

  // 3. Rate limit (after parse so we can also key by email if needed)
  const ip = getClientIp(req.headers);
  const verdict = await rateLimit(`${RATE_LIMIT.key}:${ip}`, RATE_LIMIT.limit, RATE_LIMIT.windowSec);
  if (!verdict.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: { message: "Too many submissions. Try again later.", code: "rate_limited" },
      },
      { status: 429, headers: { "Retry-After": String(verdict.retryAfter) } },
    );
  }

  // 4. Persist to Redis. If Redis is unavailable we MUST refuse — otherwise
  //    the message vanishes and the user sees a fake success.
  const redisOk = getRedis().ok;
  if (!redisOk) {
    return fail(503, "Service temporarily unavailable. Please try again later.", "redis_unavailable");
  }

  const submission = {
    id: crypto.randomUUID(),
    kind: "contact" as const,
    createdAt: Date.now(),
    ip,
    userAgent: req.headers.get("user-agent") ?? "",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message,
  };

  try {
    await saveSubmission(submission);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[contact] persistence failed", err);
    return fail(500, "We could not save your message. Please try again.", "save_failed");
  }

  // 5. Fire-and-track emails. Email failures must not roll back persistence;
  //    the admin still has the dashboard as the source of truth.
  const [adminRes, userRes] = await Promise.allSettled([
    notifyAdmin(submission),
    confirmUser({ to: submission.email, name: submission.name, kind: "contact" }),
  ]);
  // eslint-disable-next-line no-console
  if (adminRes.status === "rejected" || (adminRes.status === "fulfilled" && "error" in adminRes.value)) {
    console.error("[contact] admin email failed", adminRes);
  }
  // eslint-disable-next-line no-console
  if (userRes.status === "rejected" || (userRes.status === "fulfilled" && "error" in userRes.value)) {
    console.error("[contact] user email failed", userRes);
  }

  return ok({ id: submission.id });
}

export async function GET() {
  return methodNotAllowed(["POST"]);
}