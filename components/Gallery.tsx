"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATALOGUE, Plate, type PlateCategory, type PlateMeta } from "./GalleryPlates";
import Reveal from "./Reveal";

const FILTERS: ReadonlyArray<{ key: PlateCategory | "All"; label: string }> = [
  { key: "All", label: "All" },
  { key: "Kīrtan", label: "Kīrtan" },
  { key: "Festivals", label: "Festivals" },
  { key: "Classes", label: "Classes" },
  { key: "Behind the scenes", label: "Behind the scenes" },
];

export default function Gallery() {
  const [active, setActive] = useState<(typeof FILTERS)[number]["key"]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const items = useMemo(
    () =>
      active === "All"
        ? CATALOGUE
        : CATALOGUE.filter((p) => p.meta.type === active),
    [active],
  );

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (openIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  // Keyboard nav
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + items.length) % items.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, items.length]);

  // Focus the close button when lightbox opens
  useEffect(() => {
    if (openIndex !== null) {
      // small delay so the focus lands after the entrance animation
      const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [openIndex]);

  const onPrev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length,
    );
  }, [items.length]);

  const onNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
  }, [items.length]);

  return (
    <div>
      {/* Filter rail */}
      <Reveal>
        <div className="sticky top-16 z-30 -mx-5 sm:-mx-8 mt-2 mb-8 border-b border-maroon-700/10 bg-cream-50/85 px-5 sm:px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-cream-50/70">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-maroon-700/70">
              Filter
            </span>
            <span aria-hidden className="hairline w-6 sm:w-10" />
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gallery filter">
              {FILTERS.map((f) => {
                const isActive = f.key === active;
                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActive(f.key);
                      setOpenIndex(null);
                    }}
                    className={`pill-underline relative rounded-full px-4 py-1.5 font-sans text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive
                        ? "bg-maroon-700 text-cream-50 shadow-soft"
                        : "text-ink-800/70 hover:text-maroon-700"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
            <span className="ml-auto font-serif text-sm italic text-ink-800/60">
              {items.length} {items.length === 1 ? "plate" : "plates"}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Mosaic */}
      {items.length === 0 ? (
        <p className="py-20 text-center font-serif text-lg italic text-ink-800/60">
          No plates in this section yet — they're being printed.
        </p>
      ) : (
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[200px]"
        >
          {items.map((p, i) => {
            const meta: PlateMeta = p.meta;
            const span = meta.span;
            const wrapperClass = (() => {
              if (span === "feature")
                return "sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-[440px]";
              if (span === "wide") return "sm:col-span-2 lg:col-span-4";
              if (span === "tall") return "lg:col-span-2 lg:row-span-2";
              return "lg:col-span-2";
            })();
            return (
              <Reveal key={meta.id} delay={i * 60} y={18} className={wrapperClass}>
                <Plate
                  meta={meta}
                  bgClass={p.bg}
                  selected={openIndex === i}
                  onClick={() => setOpenIndex(i)}
                />
              </Reveal>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {openIndex !== null && items[openIndex] ? (
        <Lightbox
          entry={items[openIndex]}
          index={openIndex}
          total={items.length}
          onClose={() => setOpenIndex(null)}
          onPrev={onPrev}
          onNext={onNext}
          closeBtnRef={closeBtnRef}
        />
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox — large view, prev/next, keyboard, accessible close      */
/* ------------------------------------------------------------------ */

function Lightbox({
  entry,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  closeBtnRef,
}: {
  entry: (typeof CATALOGUE)[number];
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  closeBtnRef: React.MutableRefObject<HTMLButtonElement | null>;
}) {
  const Art = entry.art;
  const meta = entry.meta;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${meta.title} — plate ${meta.number}`}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop */}
      <button
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/70 backdrop-blur-md lightbox-enter"
      />

      {/* Card */}
      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-maroon-700/20 bg-cream-50 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] lightbox-card sm:grid-cols-2">
        {/* Plate art */}
        <div className={`relative ${entry.bg}`}>
          <div className="relative m-4 aspect-[4/3] overflow-hidden rounded-[10px] border border-maroon-700/40 bg-cream-50 sm:aspect-square">
            <div className="absolute inset-2 rounded-[6px] border border-maroon-700/15" />
            <div className="absolute inset-0">{Art()}</div>
          </div>
          <div className="absolute inset-x-6 bottom-4 hidden sm:block">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-maroon-700/70">
              Plate {meta.number} / {String(total).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Caption column */}
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-maroon-700/70">
              {meta.type}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="glass-pill grid h-9 w-9 place-items-center rounded-full text-maroon-800 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <h2 className="font-serif text-4xl text-ink-900 tracking-tightish">
            {meta.title}
          </h2>
          <p className="font-deva text-xl text-maroon-700">{meta.deva}</p>

          <p className="font-serif text-lg italic leading-relaxed text-ink-800/85">
            “{meta.caption}”
          </p>
          <p className="text-[15px] leading-relaxed text-ink-800/80">
            {meta.longCaption}
          </p>

          <div className="mt-2 grid grid-cols-2 gap-4 border-t border-maroon-700/15 pt-4 text-sm">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-maroon-700/60">
                Date
              </p>
              <p className="mt-1 font-serif text-base text-ink-900">{meta.date}</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-maroon-700/60">
                Location
              </p>
              <p className="mt-1 font-serif text-base text-ink-900">{meta.location}</p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous plate"
                className="glass-pill grid h-10 w-10 place-items-center rounded-full text-maroon-800 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next plate"
                className="glass-pill grid h-10 w-10 place-items-center rounded-full text-maroon-800 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-800/55">
              {index + 1} / {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
