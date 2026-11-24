"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const CARDS = [
  {
    title: "Daily Programs",
    desc: "Arati, kīrtan, classes — the rhythm of the temple.",
    href: "/schedule",
    icon: "🪔",
  },
  {
    title: "Be SMART Course",
    desc: "Six weeks on simplicity, modesty, awareness, regularity, truthfulness.",
    href: "/programs#be-smart",
    icon: "📖",
  },
  {
    title: "Discover Yourself",
    desc: "Six interactive sessions on the Bhagavad-gītā — for ages 15–35.",
    href: "/programs#discover-yourself",
    icon: "🪷",
  },
  {
    title: "Gauradesh TV",
    desc: "Live kīrtan, arati, and festival streams — on YouTube.",
    href: "https://www.youtube.com/results?search_query=gauradesh+tv",
    icon: "📺",
    external: true,
  },
  {
    title: "Krishna Leela Mela",
    desc: "Janmāṣṭamī at Sri Sri Radha Madhava Mandir.",
    href: "/events#janmashtami-2026",
    icon: "🪈",
  },
  {
    title: "Visit Sylhet ISKCON Mondir",
    desc: "Open daily at Sri Sri Radha Madhava Mandir, Jugaltila.",
    href: "/visit",
    icon: "📍",
  },
];

const easeDivine = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardMotion = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeDivine } },
};

export default function QuickCards() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative -mt-16 sm:-mt-24 z-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial={prefersReduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          {CARDS.map((c) => (
            <motion.div key={c.title} variants={cardMotion}>
              <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="card-elevate accent-ribbon gold-hairline group relative block h-full overflow-hidden rounded-2xl border border-maroon-700/10 bg-cream-50 p-6 shadow-soft"
                >
                  <div className="absolute right-4 top-4 text-2xl opacity-70 transition-opacity group-hover:opacity-100">
                    {c.icon}
                  </div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-maroon-700/70">
                    {c.external ? "Watch live" : "Explore"}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800/80">
                    {c.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-maroon-700">
                    {c.external ? "Open YouTube" : "Learn more"}
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
