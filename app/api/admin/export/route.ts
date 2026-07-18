import { listSubmissions, parseSubmissionKind } from "@/lib/store";
import { requireAdmin } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, "\"\"")}"`;
  return value;
}

function row(values: Array<string | number | undefined>): string {
  return values.map((v) => escapeCsv(v == null ? "" : String(v))).join(",");
}

const HEADER = [
  "id","kind","createdAt","name","email","phone","availability","skills","message","note","ip","userAgent",
].join(",");

export async function GET(req: Request) {
  const gate = requireAdmin();
  if (gate) return gate;

  const url = new URL(req.url);
  const kind = parseSubmissionKind(url.searchParams.get("kind"));

  const items = await listSubmissions({ kind, limit: 500 });
  const lines = [HEADER, ...items.map((s) =>
    s.kind === "contact"
      ? row([s.id, s.kind, s.createdAt, s.name, s.email, s.phone, "", "", s.message, "", s.ip, s.userAgent])
      : row([s.id, s.kind, s.createdAt, s.name, s.email, s.phone, s.availability, (s.skills ?? []).join("|"), "", s.note ?? "", s.ip, s.userAgent]),
  )];
  const body = lines.join("\n") + "\n";

  return new Response(body, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="submissions-${kind}-${Date.now()}.csv"`,
    },
  });
}
