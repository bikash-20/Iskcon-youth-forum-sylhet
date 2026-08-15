"use client";

import AnimatedNumber from "./AnimatedNumber";

/**
 * AnimatedClock — a 12-hour Bangladesh clock whose digits roll like
 * an odometer when the minute ticks over (the page re-renders every
 * minute via LiveScheduleCard's interval).
 *
 * The colon and meridiem stay put; only the hour and minute digits
 * roll, so the clock reads "9:07 PM" but the numbers animate on
 * change instead of hard-swapping.
 */
export default function AnimatedClock({
  date,
  className = "",
}: {
  /** BD-anchored Date whose UTC fields equal the wall clock in BD */
  date: Date;
  className?: string;
}) {
  let h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  return (
    <span className={`inline-flex items-baseline tabular-nums ${className}`}>
      <AnimatedNumber value={h} pad={1} />
      <span aria-hidden="true" className="px-px">
        :
      </span>
      <AnimatedNumber value={m} />
      <span className="ml-1">{ampm}</span>
    </span>
  );
}
