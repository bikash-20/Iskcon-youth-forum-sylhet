import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { deleteSubmission } from "@/lib/store";
import { fail, methodNotAllowed, ok } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requireAdmin(): NextResponse | null {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const v = verifySessionToken(token);
  if (!v.ok) return fail(401, "Not authenticated", "unauthorized");
  return null;
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const denied = requireAdmin();
  if (denied) return denied;

  const id = String(params.id ?? "").trim();
  if (!id) return fail(400, "Missing id", "bad_request");

  try {
    await deleteSubmission(id);
    return ok({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin/submissions/:id] delete failed", err);
    return fail(500, "Could not delete", "internal");
  }
}

export async function GET() {
  return methodNotAllowed(["DELETE"]);
}