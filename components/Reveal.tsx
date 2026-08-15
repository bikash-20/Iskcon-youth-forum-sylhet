"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** ms to wait before this child reveals — used to stagger siblings */
  delay?: number;
  /** Translation distance in px on the Y axis (default 16) */
  y?: number;
  /** Tailwind classes for the wrapper */
  className?: string;
  /** Render as a different element (default div) */
  as?: keyof JSX.IntrinsicElements;
  /** Reveal only once, or every time it enters the viewport */
  once?: boolean;
};

/**
 * Reveal — a framer-motion whileInView fade-up.
 *
 * Replaces the old IntersectionObserver + inline-style implementation
 * with framer-motion's `whileInView`, so the reveal curve is one
 * consistent spring/divine ease across the app and prefers-reduced-
 * motion is handled centrally by <MotionConfig reducedMotion="user">.
 *
 * The delay is applied through a transition `delay` so staggered
 * siblings cascade the same way they did before (offset per card).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
  as: Tag = "div",
  once = true,
}: Props) {
  const prefersReduced = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}
