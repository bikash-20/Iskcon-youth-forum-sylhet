import { NextResponse } from "next/server";

/**
 * Helpers for shaping HTTP responses consistently across routes.
 * Keeping these in one file means logs/headers are uniform.
 */

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(status: number, message: string, code?: string) {
  return NextResponse.json(
    { ok: false, error: { message, code: code ?? "error" } },
    { status },
  );
}

export function methodNotAllowed(allow: string[]) {
  return NextResponse.json(
    { ok: false, error: { message: "Method not allowed", code: "method_not_allowed" } },
    {
      status: 405,
      headers: { Allow: allow.join(", ") },
    },
  );
}

/**
 * Standard 429 response for rate-limited POSTs.
 */
export function rateLimited(retryAfter: number) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        message: "Too many submissions. Try again later.",
        code: "rate_limited",
      },
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}
