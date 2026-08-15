"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * PageTransition — cross-fade route transitions for the App Router.
 *
 * Keys a motion.div on the current pathname so that when the route
 * changes, the old page fades/slides out before the new one eases in
 * (AnimatePresence mode="wait"). Header and Footer live outside this
 * wrapper in the root layout, so only the page content transitions —
 * the chrome stays put.
 *
 * Reduced motion: the global <MotionConfig reducedMotion="user">
 * collapses the y-slide to a plain opacity cross-fade.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
