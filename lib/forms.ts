import crypto from "node:crypto";
import { z, type ZodTypeAny } from "zod";
import { rateLimit, getClientIp } from "./rateLimit";
import { getRedis } from "./redis";
import { saveSubmission, type Submission } from "./store";
import { notifyAdmin, confirmUser, type AdminNotifyPayload } from "./mail";
import { ok, fail, rateLimited } from "./http";

/**
 * Shared POST handler for the two public forms (contact + volunteer).
 *
 * Why a wrapper? Both endpoints had ~80% identical orchestration:
 *   parse → rate limit → redis health check → persist → notify
 *   admin + user → ok/fail. Drift here was a real bug risk (e.g. forgetting
 *   to add a retry-after header in one route).
 *
 * Each route still owns its schema, its rate-limit policy, and the mapping
 * from validated input to a Submission row. Everything else is here.
 */

type RateLimitPolicy = {
  /** Namespaces the rate-limit key (e.g. "contact"). */
  key: string;
  /** Max submissions per window. */
  limit: number;
  /** Window length in seconds. */
  windowSec: number;
};

export type SubmissionSpec<TSchema extends ZodTypeAny> = {
  schema: TSchema;
  rateLimit: RateLimitPolicy;
  /** Tag used in mail subjects and the dashboard. */
  kind: Submission["kind"];
  /** Map validated form input → full Submission row. */
  build: (input: z.infer<TSchema>, meta: { ip: string; userAgent: string }) => Submission;
};

/**
 * Wrap a SubmissionSpec into a Next.js POST handler.
 *
 * Runtime expectation: `runtime = "nodejs"`, `dynamic = "force-dynamic"`.
 * Edge runtime would break ioredis / node:crypto.
 */
export function withSubmission<TSchema extends ZodTypeAny>(
  spec: SubmissionSpec<TSchema>,
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    // 1. Parse JSON
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return fail(400, "Invalid JSON body", "bad_json");
    }

    // 2. Validate
    const parsed = spec.schema.safeParse(payload);
    if (!parsed.success) {
      return fail(422, parsed.error.issues[0]?.message ?? "Invalid input", "validation");
    }

    // 3. Rate limit by client IP
    const ip = getClientIp(req.headers);
    const verdict = await rateLimit(
      `${spec.rateLimit.key}:${ip}`,
      spec.rateLimit.limit,
      spec.rateLimit.windowSec,
    );
    if (!verdict.ok) return rateLimited(verdict.retryAfter);

    // 4. Refuse if Redis is down — silently dropping a form would be worse
    //    than a 503.
    if (!getRedis().ok) {
      return fail(
        503,
        "Service temporarily unavailable. Please try again later.",
        "redis_unavailable",
      );
    }

    // 5. Persist
    const userAgent = req.headers.get("user-agent") ?? "";
    const submission = spec.build(parsed.data, { ip, userAgent });
    try {
      await saveSubmission(submission);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`[${spec.kind}] persistence failed`, err);
      const msg =
        spec.kind === "contact"
          ? "We could not save your message. Please try again."
          : "We could not save your signup. Please try again.";
      return fail(500, msg, "save_failed");
    }

    // 6. Fire-and-track emails. Persistence is the source of truth; email
    //    failures are logged but never roll back the submission.
    const [adminRes, userRes] = await Promise.allSettled([
      notifyAdmin(submission satisfies AdminNotifyPayload),
      confirmUser({
        to: submission.email,
        name: submission.name,
        kind: spec.kind,
      }),
    ]);
    if (
      adminRes.status === "rejected" ||
      (adminRes.status === "fulfilled" && "error" in adminRes.value)
    ) {
      // eslint-disable-next-line no-console
      console.error(`[${spec.kind}] admin email failed`, adminRes);
    }
    if (
      userRes.status === "rejected" ||
      (userRes.status === "fulfilled" && "error" in userRes.value)
    ) {
      // eslint-disable-next-line no-console
      console.error(`[${spec.kind}] user email failed`, userRes);
    }

    return ok({ id: submission.id });
  };
}

/** Helper to mint a submission id+timestamp in one call. */
export function newSubmission() {
  return { id: crypto.randomUUID(), createdAt: Date.now() };
}
