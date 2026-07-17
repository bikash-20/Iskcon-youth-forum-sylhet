"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
              className="grid h-9 w-9 place-items-center rounded-full bg-maroon-700 text-cream-50 font-serif text-xl leading-none shadow-soft"
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
                  className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active
                      ? "text-maroon-700"
                      : "text-ink-800/80 hover:text-maroon-700"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-px origin-left transition-transform duration-300 bg-maroon-700 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/contact#volunteer"
              className="rounded-full bg-maroon-700 px-4 py-2 text-sm font-medium text-cream-50 shadow-soft hover:bg-maroon-800 transition-colors"
            >
              Volunteer
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-maroon-700/20 text-maroon-700"
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

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 pb-6">
          <div className="rounded-2xl border border-maroon-700/10 bg-cream-50/95 backdrop-blur p-2 shadow-soft">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    active
                      ? "bg-maroon-700 text-cream-50"
                      : "text-ink-800 hover:bg-maroon-700/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact#volunteer"
              className="mt-2 block rounded-xl bg-maroon-700 px-4 py-3 text-center text-cream-50 font-medium"
            >
              Volunteer with us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
