import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  countSubmissions,
  listSubmissions,
  parseSubmissionKind,
} from "@/lib/store";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { kind?: string };
}) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token).ok) {
    redirect("/admin/login");
  }

  const kind = parseSubmissionKind(searchParams.kind);
  let items: Awaited<ReturnType<typeof listSubmissions>> = [];
  let counts = { contact: 0, volunteer: 0 };
  let loadError: string | null = null;
  try {
    [items, counts] = await Promise.all([
      listSubmissions({ kind, limit: 200 }),
      countSubmissions(),
    ]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin/page] load failed", err);
    loadError =
      "Submissions could not be loaded. Check that REDIS_URL is configured.";
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
            Admin
          </p>
          <h1 className="mt-2 font-serif text-5xl text-ink-900 tracking-tightish">
            Submissions
          </h1>
          <p className="mt-2 text-sm text-ink-800/70">
            {counts.contact} contact · {counts.volunteer} volunteer
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="text-xs uppercase tracking-[0.22em] text-maroon-700/80 hover:text-maroon-700"
          >
            Sign out
          </button>
        </form>
      </div>

      {loadError && (
        <p className="mt-6 rounded-xl border border-maroon-700/30 bg-maroon-50/60 p-4 text-sm text-maroon-800">
          {loadError}
        </p>
      )}

      <nav className="mt-8 flex flex-wrap gap-2 border-b border-maroon-700/10 pb-3 text-sm">
        {[
          { k: "all", label: "All" },
          { k: "contact", label: "Contact" },
          { k: "volunteer", label: "Volunteer" },
        ].map((t) => {
          const active = kind === (t.k as typeof kind);
          return (
            <Link
              key={t.k}
              href={`/admin?kind=${t.k}`}
              className={`rounded-full px-4 py-1.5 ${
                active
                  ? "bg-maroon-700 text-cream-50"
                  : "border border-maroon-700/20 text-maroon-700 hover:border-maroon-700/50"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
        <a
          href={`/api/admin/export?kind=${kind}`}
          className="ml-auto rounded-full border border-maroon-700/20 px-4 py-1.5 text-maroon-700 hover:border-maroon-700/50"
        >
          Export CSV
        </a>
      </nav>

      <AdminDashboard items={items} />
    </>
  );
}