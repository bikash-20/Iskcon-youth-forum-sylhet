// Bangladesh Standard Time helpers (UTC+6).
// "BD now" as a Date with the same wall-clock fields as the current moment in
// Asia/Dhaka — used purely so the countdown matches the temple's local clock.

const BD_OFFSET_MIN = 6 * 60; // UTC+6

/** Returns a Date whose UTC fields equal the current wall-clock in BD. */
export function nowBD(): Date {
  const now = new Date();
  const utcMin = now.getTime() / 60000;
  const bdMin = utcMin + BD_OFFSET_MIN;
  return new Date(bdMin * 60000);
}

/** Build a Date today at HH:MM in BD, returned as a BD-anchored Date. */
export function todayAtBD(time: string): Date {
  const [hStr, mStr] = time.split(":");
  const bd = nowBD();
  bd.setUTCHours(parseInt(hStr, 10), parseInt(mStr, 10), 0, 0);
  return bd;
}

/** Difference in minutes between two BD-anchored Dates (b - a). */
export function diffMinutes(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 60000);
}

/** Format a future-minute count as "in 3 h 10 m" or "now". */
export function formatFuture(min: number): string {
  if (min <= 0) return "now";
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `in ${m} m`;
  if (m === 0) return `in ${h} h`;
  return `in ${h} h ${m.toString().padStart(2, "0")} m`;
}

/** Format BD now as "Bangladesh · H:MM AM/PM". */
export function formatBDClock(d: Date): string {
  let h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/** Countdown to a BD-anchored ISO instant. Returns {days, hours, minutes}. */
export function countdownParts(target: Date, now: Date) {
  let diffMs = target.getTime() - now.getTime();
  if (diffMs < 0) diffMs = 0;
  const totalMin = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  const minutes = totalMin % 60;
  return { days, hours, minutes, totalMin };
}

/** Group festivals by their `month` heading, preserving order of first appearance. */
export function groupByMonth<T extends { month: string }>(items: T[]): {
  month: string;
  items: T[];
}[] {
  const map = new Map<string, T[]>();
  for (const it of items) {
    if (!map.has(it.month)) map.set(it.month, []);
    map.get(it.month)!.push(it);
  }
  return Array.from(map.entries()).map(([month, items]) => ({ month, items }));
}