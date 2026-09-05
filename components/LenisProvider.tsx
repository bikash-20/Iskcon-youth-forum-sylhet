"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type Lenis from "lenis";
import type { LenisOptions } from "lenis";

import { scrollToId, splitHash } from "@/lib/scroll";

/**
 * Editorial & heavy — picks up where the rest of the brand motion leaves off.
 *
 * `globals.css` ships an `--ease-out-weighted: cubic-bezier(0.22, 1, 0.36, 1)`
 * and Framer Motion uses [0.22, 1, 0.36, 1] throughout; Lenis's easing here
 * matches the same quartic-out shape so momentum release feels native to the
 * brand.
 *
 * - `lerp: 0.085`           → gentle momentum (smaller = heavier).
 * - `duration: 1.4`         → upper bound on any programmatic tween.
 * - `wheelMultiplier: 0.9`  → slightly softer per wheel notch.
 * - `touchMultiplier: 1.4`  → a touch is one thrust, weight it more.
 * - `syncTouch: false`      → keep native iOS momentum; sync mode fights it.
 * - `autoResize: true`      → re-measure when the live BD clock or festival
 *                              countdown reflows layout.
 * - `autoRaf: true`         → Lenis self-drives its RAF loop. The
 *                              `<ReactLenis>` wrapper does NOT start a RAF
 *                              for the `root` mode (it only relays scroll
 *                              events) — if we leave `autoRaf: false`, the
 *                              lerp loop never runs and the page appears
 *                              "stuck" because targetScroll never reaches
 *                              window.scrollY.
 * - `respectReducedMotion: true` → Lenis auto-disables smoothing when the
 *                              user requests reduced motion (forces lerp=1
 *                              so scroll tracks input 1:1). Default in
 *                              1.3.x, made explicit for stability.
 * - `anchors: false`        → we install our own delegated click handler
 *                              below because Lenis's built-in anchor jump
 *                              can't account for our sticky `<header>`.
 */
const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.085,
  duration: 1.4,
  // Quartic-out: matches the rest of the site's motion language.
  easing: (t: number) => 1 - Math.pow(1 - t, 4),
  wheelMultiplier: 0.9,
  touchMultiplier: 1.4,
  smoothWheel: true,
  syncTouch: false,
  autoResize: true,
  autoRaf: true,
  respectReducedMotion: true,
  anchors: false,
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * LenisProvider — owns exactly one Lenis instance for the lifetime of the
 * app. Sits inside `<MotionProvider>` in the root layout so Framer Motion
 * and Lenis share the React render tree without colliding.
 *
 * Crucially, `<ReactLenis root>` does NOT insert a wrapper element — the
 * instance is hosted on `document.documentElement` (the default scroll
 * container). The root layout uses
 * `<body class="grain-page min-h-screen flex flex-col">`; an extra wrapper
 * `<div>` from Lenis would break the `flex-1` push of the footer.
 *
 * Side responsibility: install a single delegated click handler that
 * intercepts in-page anchor links (`#foo`, `/contact#volunteer`) and routes
 * them through `lenis.scrollTo` with the correct sticky-header offset.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lastPathRef = useRef<string>(pathname);

  // Cache the Lenis instance so the delegated document-level click handler
  // can read it without subscribing to the Lenis context from outside React.
  // `useLenis(cb, deps, priority)` runs `cb` whenever the scroll event fires,
  // AND returns the instance synchronously after first mount.
  useLenis((lenis) => {
    _lenisInstance = lenis;
  }, []);
  useEffect(() => {
    return () => {
      _lenisInstance = null;
    };
  }, []);

  // Install the delegated anchor handler exactly once.
  //
  // We deliberately do NOT call `e.preventDefault()` on cross-route hash
  // links — Next.js should still navigate. Cross-route scroll-to-hash
  // is handled by a small `useScrollToHash` hook in the consumer pages
  // (e.g. `app/contact/page.tsx` for `#volunteer`), which runs after
  // mount and calls `scrollToId(lenis, "volunteer")`.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Find the closest <a> along the composed event path so this works
      // through portals and any future shadow DOM usage.
      let anchor: HTMLAnchorElement | null = null;
      for (const node of e.composedPath()) {
        if (node instanceof HTMLAnchorElement) {
          anchor = node;
          break;
        }
      }
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const { path: targetPath, hash } = splitHash(href);
      if (!hash) return;

      // Reject external links outright.
      let url: URL | null = null;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Only intercept if the click would be a same-route hash jump.
      // Cross-route hash navigation is handled by `useScrollToHash` in
      // the destination page after mount.
      const here = window.location.pathname;
      const there = targetPath || here;
      if (there !== here) return;

      e.preventDefault();
      scrollToId(_lenisInstance, hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Track pathname changes — we don't scroll here because we deliberately
  // hand that job to `<Header>` (via `useLenis()`) so the reset happens at
  // the right moment relative to the cross-fade transition.
  useEffect(() => {
    if (pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;
  }, [pathname]);

  // Respect reduced motion: render children without Lenis. The library
  // already does this automatically, but we skip the wrapper entirely so
  // (a) zero Lenis code runs and (b) the click handler is never installed.
  if (prefersReducedMotion()) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny module-scoped registry so the delegated click handler can    */
/*  read the live Lenis instance without prop-drilling or Context.   */
/*  Written from inside the provider via `useLenis(...)` and cleared */
/*  on unmount.                                                       */
/* ------------------------------------------------------------------ */

let _lenisInstance: Lenis | null = null;

/** Read-only accessor for the current Lenis instance (or null when off). */
export function getLenisInstance(): Lenis | null {
  return _lenisInstance;
}
