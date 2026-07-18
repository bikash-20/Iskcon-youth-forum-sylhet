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

export function isString(x: unknown): x is string {
  return typeof x === "string";
}
