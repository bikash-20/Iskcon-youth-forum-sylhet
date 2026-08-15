"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const easeDivine = [0.22, 1, 0.36, 1] as const;

/**
 * MotionCard — the canonical animated card wrapper.
 *
 * Combines a whileInView fade-up entrance (staggered via `delay`) with
 * a gentle hover-lift + press spring, so every card across the site
 * shares one consistent motion language. Reduced motion collapses to
 * a plain opacity fade via the global <MotionConfig>.
 */
export default function MotionCard({
  children,
  className = "",
  delay = 0,
  hover = true,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** seconds to delay the entrance — used to stagger siblings */
  delay?: number;
  /** disable the hover/press springs (e.g. for non-interactive surfaces) */
  hover?: boolean;
  /** render as a different element (default div) */
  as?: "div" | "li" | "article";
} & Omit<React.ComponentProps<typeof motion.div>, "children" | "className">) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: easeDivine, delay }}
      {...rest}
    >
      <motion.div
        whileHover={hover ? { y: -4 } : undefined}
        whileTap={hover ? { scale: 0.99 } : undefined}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </MotionTag>
  );
}
