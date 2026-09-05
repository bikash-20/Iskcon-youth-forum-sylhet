"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

import { currentHash, scrollToId } from "@/lib/scroll";

/**
 * Cross-route hash navigation helper.
 *
 * Add `useScrollToHash()` to any client page that has anchor targets
 * (e.g. `app/contact/page.tsx` for `#volunteer`). After mount, if
 * `window.location.hash` is non-empty, it scrolls to that element using
 * the live Lenis instance — accounting for the sticky header.
 *
 * The timing matters: PageTransition + the Header's `scrollToTop` effect
 * run first, then this hook fires on mount, then `setTimeout(..., 0)`
 * pushes the scroll past the layout-settle microtask. We also retry once
 * after a short delay in case the element is below a deferred boundary
 * (e.g. a hydration-suspended image is still measuring height).
 */
export function useScrollToHash(): void {
  const lenis = useLenis();

  useEffect(() => {
    const hash = currentHash();
    if (!hash) return;

    const tryScroll = (attempt: number) => {
      const el = document.getElementById(hash);
      if (el) {
        scrollToId(lenis ?? undefined, hash);
        return;
      }
      // Element not in the DOM yet (deferred boundary, future Suspense).
      // One follow-up retry after 120ms is enough in practice.
      if (attempt < 1) {
        window.setTimeout(() => tryScroll(attempt + 1), 120);
      }
    };

    // Defer past layout/microtask so the page is actually rendered.
    const id = window.setTimeout(() => tryScroll(0), 0);
    return () => window.clearTimeout(id);
  }, [lenis]);
}
