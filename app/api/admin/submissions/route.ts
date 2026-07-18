import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { countSubmissions, listSubmissions, type SubmissionKind } from "@/lib/store";
import { fail, methodNotAllowed, ok } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requireAdmin(): NextResponse | null {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const v = verifySessionToken(token);
  if (!v.ok) return fail(401, "Not authenticated", "unauthorized");
  return null;
}

export async function GET(req: Request) {
  if (req.method !== "GET") return methodNotAllowed(["GET"]);
  const denied = requireAdmin();
  if (denied) return denied;

  const url = new URL(req.url);
  const kind = (url.searchParams.get("kind") ?? "all") as SubmissionKind | "all";
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 100), 500);

  if (kind !== "all" && kind !== "contact" && kind !== "volunteer") {
    return fail(400, "Invalid kind", "bad_request");
  }

  try {
    const [items, counts] = await Promise.all([
      listSubmissions({ kind, limit }),
      countSubmissions(),
    ]);
    return ok({ items, counts });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin/submissions] failed", err);
    return fail(500, "Could not load submissions", "internal");
  }
}