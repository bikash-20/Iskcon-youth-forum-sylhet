"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DAILY_PROGRAMME,
  type DailySlot,
} from "@/lib/content";
import {
  diffMinutes,
  formatBDClock,
  formatFuture,
  nowBD,
  todayAtBD,
} from "@/lib/bdTime";

function classify(now: Date, slots: DailySlot[]): {
  current: DailySlot | null;
  next: DailySlot | null;
  upcoming: DailySlot[];
} {
  // Walk today's slots in order; the last one whose time <= now is "current"
  // unless it's a "closes" entry we already passed (Temple Closes twice).
  let current: DailySlot | null = null;
  let next: DailySlot | null = null;
  const upcoming: DailySlot[] = [];
  for (const s of slots) {
    const t = todayAtBD(s.time);
    if (t.getTime() <= now.getTime()) current = s;
    else upcoming.push(s);
  }
  next = upcoming[0] ?? slots[0];
  return { current, next, upcoming };
}

export default function LiveScheduleCard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const now = useMemo(() => nowBD(), [tick]);
  const { current, next, upcoming } = useMemo(
    () => classify(now, DAILY_PROGRAMME),
    [now]
  );

  // Next's countdown uses today's BD time; if next slot is the first slot of
  // tomorrow, treat all of DAILY_PROGRAMME as upcoming.
  const showCountdown = (slot: DailySlot) => {
    const t = todayAtBD(slot.time);
    const min = diffMinutes(now, t);
    return formatFuture(min);
  };

  const headerNote = current
    ? current.kind === "closes"
      ? "Temple currently closed"
      : current.kind === "opens"
        ? "Temple just reopened"
        : "Quiet until the next programme."
    : "Quiet until the next programme.";

  return (
    <section className="paper mt-16 sm:mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
              Live schedule
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-ink-900 tracking-tightish">
              <span className="text-maroon-700">Bangladesh</span> ·{" "}
              <span className="tabular-nums">{formatBDClock(now)}</span>
            </h2>
            <p className="mt-2 text-base text-ink-800/80">
              {current
                ? `Right now: ${current.name}. ${headerNote}`
                : headerNote}
            </p>

            <ol className="mt-8 divide-y divide-maroon-700/10 rounded-2xl border border-maroon-700/10 bg-cream-50 shadow-soft">
              {DAILY_PROGRAMME.map((s) => {
                const isCurrent = current?.name === s.name && current?.time === s.time;
                const isNext = next?.name === s.name && next?.time === s.time;
                const dotColor =
                  s.kind === "closes"
                    ? "bg-ink-800/40"
                    : s.kind === "opens"
                      ? "bg-saffron-500"
                      : "bg-maroon-700";
                return (
                  <li
                    key={`${s.time}-${s.name}`}
                    className={`flex items-baseline gap-4 px-5 py-4 sm:px-7 sm:py-5 ${
                      isCurrent
                        ? "bg-saffron-100/60"
                        : isNext
                          ? "bg-saffron-50"
                          : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`}
                    />
                    <p className="w-20 shrink-0 font-sans text-sm font-semibold tabular-nums text-ink-900">
                      {to12(s.time)}
                    </p>
                    <div className="flex-1">
                      <p className="font-serif text-lg text-ink-900">{s.name}</p>
                      {isNext && (
                        <p className="text-xs text-maroon-700">
                          {showCountdown(s)}
                        </p>
                      )}
                    </div>
                    {isCurrent && (
                      <span className="rounded-full bg-maroon-700 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-cream-50">
                        Now
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-6 shadow-soft sm:p-7">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                Coming up
              </p>
              <ul className="mt-4 space-y-3">
                {upcoming.slice(0, 5).map((s) => (
                  <li
                    key={`u-${s.time}-${s.name}`}
                    className="flex items-baseline justify-between gap-4 border-b border-maroon-700/10 pb-3 last:border-none last:pb-0"
                  >
                    <div>
                      <p className="font-serif text-lg text-ink-900">{s.name}</p>
                      <p className="text-xs text-ink-800/70">{to12(s.time)}</p>
                    </div>
                    <p className="text-sm font-medium text-maroon-700">
                      {showCountdown(s)}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-ink-800/60">
                Schedule ticks every minute. Times follow Bangladesh Standard
                Time (UTC+6).
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function to12(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
