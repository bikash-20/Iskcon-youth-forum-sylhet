import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { VolunteerSchema } from "@/lib/schema";
import { saveSubmission } from "@/lib/store";
import { confirmUser, notifyAdmin } from "@/lib/mail";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { getRedis } from "@/lib/redis";
import { fail, methodNotAllowed, ok } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = { key: "volunteer", limit: 3, windowSec: 60 * 60 }; // 3 per hour

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return methodNotAllowed(["POST"]);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return fail(400, "Invalid JSON body", "bad_json");
  }

  const parsed = VolunteerSchema.safeParse(payload);
  if (!parsed.success) {
    return fail(422, parsed.error.issues[0]?.message ?? "Invalid input", "validation");
  }

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

  const redisOk = getRedis().ok;
  if (!redisOk) {
    return fail(503, "Service temporarily unavailable. Please try again later.", "redis_unavailable");
  }

  const submission = {
    id: crypto.randomUUID(),
    kind: "volunteer" as const,
    createdAt: Date.now(),
    ip,
    userAgent: req.headers.get("user-agent") ?? "",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    skills: parsed.data.skills,
    availability: parsed.data.availability,
    note: parsed.data.note,
  };

  try {
    await saveSubmission(submission);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[volunteer] persistence failed", err);
    return fail(500, "We could not save your signup. Please try again.", "save_failed");
  }

  const [adminRes, userRes] = await Promise.allSettled([
    notifyAdmin(submission),
    confirmUser({ to: submission.email, name: submission.name, kind: "volunteer" }),
  ]);
  // eslint-disable-next-line no-console
  if (adminRes.status === "rejected" || (adminRes.status === "fulfilled" && "error" in adminRes.value)) {
    console.error("[volunteer] admin email failed", adminRes);
  }
  // eslint-disable-next-line no-console
  if (userRes.status === "rejected" || (userRes.status === "fulfilled" && "error" in userRes.value)) {
    console.error("[volunteer] user email failed", userRes);
  }

  return ok({ id: submission.id });
}

export async function GET() {
  return methodNotAllowed(["POST"]);
}