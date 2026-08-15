"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeDivine = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeDivine } },
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}
      variants={container}
      initial={prefersReduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {/* Saffron thread above — signals a new chapter of content. */}
      <motion.span
        variants={item}
        aria-hidden
        className="block h-px w-12 bg-gradient-to-r from-saffron-500 to-transparent"
      />
      {eyebrow && (
        <motion.p
          variants={item}
          className={`mt-4 font-sans text-[11px] uppercase tracking-[0.24em] text-maroon-700/85 eyebrow-line ${
            isCenter ? "is-center justify-center" : ""
          }`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={item}
        className="mt-4 font-serif text-3xl sm:text-4xl display-tight text-ink-900 tracking-tightish"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={item}
          className={`mt-4 text-base sm:text-lg leading-relaxed text-ink-800/80 ${
            isCenter ? "mx-auto max-w-xl" : ""
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
