"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Submission } from "@/lib/store";

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Dhaka",
});

export default function AdminDashboard({ items }: { items: Submission[] }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Delete this submission? This cannot be undone.")) return;
    setPending(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Could not delete.");
        setPending(null);
        return;
      }
      router.refresh();
    } finally {
      setPending(null);
    }
  };

  if (items.length === 0) {
    return (
      <p className="mt-10 text-sm text-ink-800/70">
        No submissions yet. The forms on the public site will appear here.
      </p>
    );
  }

  return (
    <ul className="mt-8 grid gap-4">
      {items.map((s) => {
        const when = DATE_FMT.format(new Date(s.createdAt));
        const isContact = s.kind === "contact";
        return (
          <li
            key={s.id}
            className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-5 shadow-soft"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider ${
                    isContact
                      ? "bg-saffron-100 text-maroon-800"
                      : "bg-maroon-100 text-maroon-800"
                  }`}
                >
                  {s.kind}
                </span>
                <h3 className="font-serif text-xl text-ink-900">
                  {s.name}
                </h3>
                <a
                  className="text-sm text-maroon-700 hover:underline"
                  href={`mailto:${s.email}`}
                >
                  {s.email}
                </a>
              </div>
              <span className="text-xs text-ink-800/60">{when} (BD)</span>
            </div>

            {isContact ? (
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink-800/85">
                {s.message}
              </p>
            ) : (
              <div className="mt-3 grid gap-2 text-sm text-ink-800/85 sm:grid-cols-2">
                <Row label="Phone" value={s.phone} />
                <Row label="Availability" value={s.availability} />
                <Row label="Skills" value={(s.skills ?? []).join(", ")} />
                {s.note && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-maroon-700/80">
                      Note
                    </p>
                    <p className="mt-1 whitespace-pre-wrap">{s.note}</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-3 text-xs text-ink-800/60">
              <span>IP {s.ip}</span>
              <button
                onClick={() => remove(s.id)}
                disabled={pending === s.id}
                className="rounded-full border border-maroon-700/20 px-3 py-1 text-maroon-700 hover:border-maroon-700/50 disabled:opacity-60"
              >
                {pending === s.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-maroon-700/80">
        {label}
      </p>
      <p>{value}</p>
    </div>
  );
}