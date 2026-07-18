import { deleteSubmission } from "@/lib/store";
import { requireAdmin } from "@/lib/session";
import { fail, methodNotAllowed, ok } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const gate = requireAdmin();
  if (gate) return gate;

  try {
    await deleteSubmission(params.id);
    return ok({ id: params.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin/submissions/id] delete failed", err);
    return fail(500, "Could not delete submission.", "delete_failed");
  }
}

export function GET() {
  return methodNotAllowed(["DELETE"]);
}
