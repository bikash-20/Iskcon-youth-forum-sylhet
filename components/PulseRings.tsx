"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * PulseRings — the "live" halo around the play button. Two saffron
 * rings expand and fade on an infinite loop, offset so the pulse
 * reads continuous rather than mechanical. Returns null under
 * prefers-reduced-motion.
 */
export default function PulseRings() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  const ring =
    "pointer-events-none absolute inset-0 rounded-full border border-saffron-300/60";

  return (
    <>
      <motion.span
        aria-hidden
        className={ring}
        animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        aria-hidden
        className={ring}
        animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
      />
    </>
  );
}
