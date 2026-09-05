"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";

import { scrollToTop } from "@/lib/scroll";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/schedule", label: "Schedule" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Reset scroll position when the route changes. We fire this *before*
  // PageTransition's exit animation has fully finished — by the time the
  // next route mounts, the page is already at the top. We use `immediate:
  // true` because we're calling this *on navigation*, not on a user gesture,
  // and we don't want a long animated scroll fighting the cross-fade.
  //
  // If the route contains a hash (e.g. `/contact#volunteer`), the consumer
  // page installs its own `useScrollToHash` effect that re-targets the
  // scroll to the element after mount. Without that, we'd land at the top
  // — still a fine default, never a broken state.
  useEffect(() => {
    scrollToTop(lenis ?? null, { immediate: true });
  }, [pathname, lenis]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-cream-50/85 backdrop-blur-md border-b border-maroon-700/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-full bg-maroon-700 text-cream-50 font-serif text-xl leading-none shadow-soft aura-mark transition-transform duration-300 group-hover:scale-105"
            >
              ॐ
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg sm:text-xl text-ink-900 tracking-tightish">
                ISKCON Youth Forum
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-maroon-700/80">
                Sylhet · since 1966
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`glass-pill focus-saffron relative rounded-full px-3.5 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 ${
                    active
                      ? "text-cream-50"
                      : "text-ink-800/85 hover:text-maroon-700"
                  }`}
                >
                  {/* v1.1: active link gets a maroon pill that slides
                      between items via framer-motion's shared layoutId. */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="pointer-events-none absolute inset-0 rounded-full bg-maroon-700 shadow-soft"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/contact#volunteer"
              className="glass-pill focus-saffron rounded-full px-4 py-2 text-sm font-medium text-maroon-800 transition-all duration-200 hover:-translate-y-0.5 hover:text-maroon-900 hover:shadow-soft"
            >
              Volunteer
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="glass-pill focus-saffron lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-maroon-800 transition-all duration-200 hover:-translate-y-0.5 hover:text-maroon-900 hover:shadow-soft"
          >
            <span className="sr-only">Menu</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — AnimatePresence so it opens/closes with a
          fade + slide rather than a max-height snap. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-5 pb-6">
              <div className="glass rounded-2xl p-2">
                {NAV.map((item, i) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          active
                            ? "bg-maroon-700/85 text-cream-50"
                            : "text-ink-800/85 hover:bg-white/40 hover:text-maroon-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * NAV.length, duration: 0.25 }}
                >
                  <Link
                    href="/contact#volunteer"
                    className="glass-pill mt-2 block rounded-xl px-4 py-3 text-center font-medium text-maroon-800 hover:text-maroon-900"
                  >
                    Volunteer with us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
