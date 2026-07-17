"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const SKILLS = [
  "Kīrtan / Music",
  "Cooking / Prasādam",
  "Decoration / Floral",
  "Photography / Video",
  "Teaching / Mentoring",
  "Logistics / Setup",
  "Social Media",
  "Translation",
];

export default function VolunteerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: new Set<string>(),
    availability: "Weekends",
    note: "",
  });

  const toggleSkill = (s: string) => {
    setForm((f) => {
      const next = new Set(f.skills);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return { ...f, skills: next };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skills: Array.from(form.skills),
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-7 shadow-soft sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputCls}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone">
          <input
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputCls}
            placeholder="+880 ..."
          />
        </Field>
        <Field label="Availability">
          <select
            value={form.availability}
            onChange={(e) =>
              setForm((f) => ({ ...f, availability: e.target.value }))
            }
            className={inputCls}
          >
            {[
              "Weekday mornings",
              "Weekday evenings",
              "Weekends",
              "Festival days only",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <span className="block text-xs font-medium uppercase tracking-wider text-maroon-700/80">
          Skills / Interests
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {SKILLS.map((s) => {
            const on = form.skills.has(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggleSkill(s)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  on
                    ? "border-maroon-700 bg-maroon-700 text-cream-50"
                    : "border-maroon-700/20 text-maroon-700 hover:border-maroon-700/50"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <label className="block">
          <span className="block text-xs font-medium uppercase tracking-wider text-maroon-700/80">
            Anything else?
          </span>
          <textarea
            rows={4}
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            className={`${inputCls} mt-2 resize-y`}
            placeholder="Languages, prior experience, a quiet note..."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-maroon-700 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-maroon-800 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Sign me up"}
        </button>
        {status === "success" && (
          <p className="text-sm text-maroon-700">
            Thank you &mdash; we&rsquo;ll be in touch.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-maroon-700">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-maroon-700/15 bg-cream-100/40 px-4 py-3 text-base text-ink-900 outline-none placeholder:text-ink-800/40 focus:border-maroon-700/50 focus:bg-cream-50 transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-maroon-700/80">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}