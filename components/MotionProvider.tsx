"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Client wrapper that applies `reducedMotion="user"` app-wide.
 *
 * Honours prefers-reduced-motion: transform + layout animations (the
 * sliding nav pill, odometer rolls, hover lifts, lightbox motion) are
 * disabled for users who ask for less motion, while opacity fades
 * remain so content still eases in.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
