"use client";

import AnimatedNumber from "./AnimatedNumber";

/**
 * AnimatedCountdown — a "time until" phrase whose digits roll like an
 * odometer when the value changes.
 *
 * Mirrors `formatFuture` from lib/bdTime ("in 3 h 10 m" / "in 5 m" /
 * "now") but the numeric parts animate on change instead of swapping.
 * Pass `minutes` as the count of minutes until the target.
 */
export default function AnimatedCountdown({
  minutes,
  className = "",
}: {
  minutes: number;
  className?: string;
}) {
  if (minutes <= 0) return <span className={className}>now</span>;

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) {
    return (
      <span className={`whitespace-nowrap ${className}`}>
        in <AnimatedNumber value={m} pad={1} /> m
      </span>
    );
  }
  if (m === 0) {
    return (
      <span className={`whitespace-nowrap ${className}`}>
        in <AnimatedNumber value={h} pad={1} /> h
      </span>
    );
  }
  return (
    <span className={`whitespace-nowrap ${className}`}>
      in <AnimatedNumber value={h} pad={1} /> h{" "}
      <AnimatedNumber value={m} pad={2} /> m
    </span>
  );
}
