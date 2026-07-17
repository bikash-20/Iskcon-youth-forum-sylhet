"use client";

import { useEffect, useState } from "react";
import {
  FESTIVALS,
  FEATURED_FESTIVAL,
  type Festival,
  type FestivalKind,
} from "@/lib/content";
import { countdownParts, groupByMonth, nowBD } from "@/lib/bdTime";

const KIND_LABEL: Record<FestivalKind, string> = {
  single: "Single day",
  multi: "Multi-day",
  month: "Month observance",
};

const KIND_TONE: Record<FestivalKind, string> = {
  single: "bg-cream-100 text-maroon-700 border-maroon-700/20",
  multi: "bg-saffron-100 text-maroon-800 border-saffron-300/40",
  month: "bg-maroon-700 text-cream-50 border-maroon-800",
};

export default function FestivalCalendar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const groups = groupByMonth(FESTIVALS);

  return (
    <section className="paper mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <UpcomingFestival />

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
              Festival calendar
            </p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl text-ink-900 tracking-tightish">
              The year at the mandir.
            </h3>
          </div>
          <Legend />
        </div>

        <div className="mt-12 space-y-14">
          {groups.map((g) => (
            <div key={g.month}>
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                {g.month}
              </p>
              <h4 className="mt-2 font-serif text-xl text-ink-900">
                {headingFor(g.month)}
              </h4>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((f) => (
                  <FestivalCard key={f.slug} f={f} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function headingFor(month: string) {
  // Subtle human touch — e.g. "August" → "the lean toward autumn"
  const m = month.toLowerCase();
  if (m.includes("march")) return "The first blossoms";
  if (m.includes("april")) return "Warmth begins";
  if (m.includes("may")) return "Pre-monsoon days";
  if (m.includes("june") || m.includes("july"))
    return "Rains and the chariot";
  if (m.includes("august")) return "Krishna's month";
  if (m.includes("september")) return "The mellow light";
  if (m.includes("october") || m.includes("november"))
    return "Damodara lamps";
  if (m.includes("december") || m.includes("january"))
    return "The shortest days";
  return "The season";
}

function FestivalCard({ f }: { f: Festival }) {
  return (
    <article className="group h-full rounded-2xl border border-maroon-700/10 bg-cream-50 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-ring">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${KIND_TONE[f.kind]}`}
        >
          {KIND_LABEL[f.kind]}
        </span>
        <span className="font-sans text-xs tabular-nums text-maroon-700/80">
          {f.when}
        </span>
      </div>
      <h5 className="mt-4 font-serif text-2xl text-ink-900">{f.name}</h5>
      <p className="mt-3 text-sm leading-relaxed text-ink-800/90">
        {f.description}
      </p>
      {f.tags && f.tags.length > 0 && (
        <ul className="mt-4 space-y-1">
          {f.tags.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2 text-xs text-maroon-700/90"
            >
              <span aria-hidden className="mt-1 inline-block h-1 w-1 rounded-full bg-maroon-700/70" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="rounded-full border border-maroon-700/20 bg-cream-100 px-3 py-1 text-maroon-700">
        Single day
      </span>
      <span className="rounded-full border border-saffron-300/40 bg-saffron-100 px-3 py-1 text-maroon-800">
        Multi-day
      </span>
      <span className="rounded-full border border-maroon-800 bg-maroon-700 px-3 py-1 text-cream-50">
        Month observance
      </span>
    </div>
  );
}

function UpcomingFestival() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(nowBD());
    const id = setInterval(() => setNow(nowBD()), 60_000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(FEATURED_FESTIVAL.iso);
  const parts = mounted && now ? countdownParts(target, now) : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-maroon-700/30 bg-gradient-to-br from-maroon-700 via-maroon-800 to-ink-900 p-8 text-cream-50 shadow-soft sm:p-12">
      <div
        aria-hidden
        className="absolute right-0 top-0 h-72 w-72 -translate-y-1/3 translate-x-1/4 rounded-full bg-saffron-400/20 blur-3xl"
      />
      <div className="relative grid gap-8 sm:grid-cols-2 sm:items-center">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-saffron-200">
            Upcoming festival
          </p>
          <h3 className="mt-3 font-serif text-4xl sm:text-5xl tracking-tightish">
            {FEATURED_FESTIVAL.name}
          </h3>
          <p className="mt-1 font-serif italic text-cream-50/80">
            Appearance day of Sri Krishna
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream-50/85">
            {FEATURED_FESTIVAL.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <Counter
            label="Days"
            value={parts?.days ?? 48}
          />
          <Counter
            label="Hours"
            value={parts?.hours ?? 4}
          />
          <Counter
            label="Min"
            value={parts?.minutes ?? 38}
          />
        </div>
      </div>
      <p className="relative mt-6 text-xs text-cream-50/60">
        Live schedule ticks every minute. Times follow Bangladesh Standard
        Time (UTC+6).
      </p>
    </div>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  const padded = value.toString().padStart(2, "0");
  return (
    <div className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-4 text-center backdrop-blur-sm">
      <p className="font-serif text-3xl sm:text-4xl tabular-nums text-cream-50 sm:text-5xl">
        {padded}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-saffron-200">
        {label}
      </p>
    </div>
  );
}
