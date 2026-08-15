"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * AnimatedNumber — a countdown digit that rolls upward when its value
 * changes, like a mechanical odometer.
 *
 * The old value slides out the top while the new one slides in from
 * the bottom. Uses AnimatePresence keyed on the padded string so
 * every tick gets a fresh, contained roll instead of a hard swap.
 * Reduced-motion collapses the roll to an instant crossfade (the
 * global <MotionConfig reducedMotion="user"> handles this too).
 *
 * Keep the container's width stable (padded 2-digit strings) so the
 * roll doesn't reflow the layout.
 */
export default function AnimatedNumber({
  value,
  pad = 2,
  className = "",
}: {
  value: number;
  pad?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const text = String(value).padStart(pad, "0");

  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={prefersReduced ? { opacity: 0 } : { y: "1.1em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: "-1.1em", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block ${className}`}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
