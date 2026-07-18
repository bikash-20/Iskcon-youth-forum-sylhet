import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { listSubmissions, type SubmissionKind } from "@/lib/store";
import { fail, methodNotAllowed } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(v: unknown): string {
  if (v === undefined || v === null) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(req: Request) {
  if (req.method !== "GET") return methodNotAllowed(["GET"]);

  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token).ok) {
    return fail(401, "Not authenticated", "unauthorized");
  }

  const url = new URL(req.url);
  const kindRaw = (url.searchParams.get("kind") ?? "all") as SubmissionKind | "all";
  const kind: SubmissionKind | "all" =
    kindRaw === "contact" || kindRaw === "volunteer" ? kindRaw : "all";

  const items = await listSubmissions({ kind, limit: 1000 });

  const headers = [
    "id",
    "kind",
    "createdAt",
    "name",
    "email",
    "phone",
    "availability",
    "skills",
    "note",
    "message",
    "ip",
    "userAgent",
  ];

  const lines = [headers.join(",")];
  for (const s of items) {
    lines.push(
      [
        s.id,
        s.kind,
        new Date(s.createdAt).toISOString(),
        s.name,
        s.email,
        s.kind === "volunteer" ? s.phone : (s.phone ?? ""),
        s.kind === "volunteer" ? s.availability : "",
        s.kind === "volunteer" ? (s.skills ?? []).join("|") : "",
        s.kind === "volunteer" ? (s.note ?? "") : "",
        s.kind === "contact" ? s.message : "",
        s.ip,
        s.userAgent,
      ]
        .map(csvEscape)
        .join(","),
    );
  }

  const body = lines.join("\n");
  const filename = `iyf-submissions-${kind}-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}