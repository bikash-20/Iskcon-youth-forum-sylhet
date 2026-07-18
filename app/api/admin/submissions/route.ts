import { listSubmissions, type SubmissionKind } from "@/lib/store";
import { requireAdmin } from "@/lib/session";
import { ok, fail } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const gate = requireAdmin();
  if (gate) return gate;

  const url = new URL(req.url);
  const raw = url.searchParams.get("kind") ?? "all";
  const kind: SubmissionKind | "all" =
    raw === "contact" || raw === "volunteer" ? raw : "all";

  try {
    const items = await listSubmissions({ kind, limit: 200 });
    return ok({ items });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin/submissions] list failed", err);
    return fail(
      503,
      "Submissions could not be loaded. Check that REDIS_URL is configured.",
      "redis_unavailable",
    );
  }
}
