/**
 * Scroll helpers — used by both the Lenis provider (anchor interception) and
 * any client component that wants to programmatically scroll to a section.
 *
 * The site has a sticky header (`components/Header.tsx`, `h-16 sm:h-20`),
 * so we measure the live header height on every call rather than hard-coding
 * a number. We also add 24px of breathing room so the target isn't butted
 * against the header edge.
 */

import type Lenis from "lenis";

const BREATHING_ROOM_PX = 24;

/**
 * Reads the live height of the sticky `<header>`. Falls back to 80px (the
 * sm+ height) if the header isn't mounted yet — for SSR safety and for the
 * rare case where `LenisProvider` runs before the DOM is hydrated.
 */
export function getHeaderOffset(): number {
  if (typeof document === "undefined") return 80;
  const header = document.querySelector("header");
  return header ? header.getBoundingClientRect().height : 80;
}

/**
 * Scrolls to a same-page element by id with the Lenis-driven momentum feel.
 * Pass `lenis` explicitly (it's the instance from `useLenis()`); if `lenis`
 * is undefined we fall back to native `scrollIntoView` so this function is
 * safe to call from contexts where Lenis isn't active (e.g. reduced motion).
 */
export function scrollToId(
  lenis: Lenis | null | undefined,
  id: string,
  opts: { offset?: number; immediate?: boolean } = {},
): void {
  if (typeof document === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  const offset = opts.offset ?? -(getHeaderOffset() + BREATHING_ROOM_PX);

  if (lenis) {
    lenis.scrollTo(el, { offset, immediate: opts.immediate ?? false });
  } else {
    // Native fallback — instant or smooth per the user's reduced-motion
    // preference. We deliberately pass `behavior: undefined` so the browser
    // honours `scroll-behavior: smooth` from globals.css when set.
    el.scrollIntoView({ behavior: "auto", block: "start" });
    // Manually apply the header offset since `scrollIntoView` ignores it.
    const headerH = -getHeaderOffset() - BREATHING_ROOM_PX;
    window.scrollBy({ top: headerH, behavior: "auto" });
  }
}

/**
 * Resets the page to the top using the same Lenis instance if available.
 * Used by Header / PageTransition on route change so the new route starts
 * from the top, never from wherever the user happened to be on the old route.
 */
export function scrollToTop(
  lenis: Lenis | null | undefined,
  { immediate = true }: { immediate?: boolean } = {},
): void {
  if (typeof window === "undefined") return;

  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

/**
 * Returns the current path of a URL relative to the current origin, for the
 * sole purpose of deciding whether a click is same-route or cross-route.
 * (We need this because `anchor.click` events expose `href`, not the parsed
 * URL of the click target's containing `<a>`.)
 */
export function splitHash(href: string): { path: string; hash: string } {
  const idx = href.indexOf("#");
  if (idx < 0) return { path: href, hash: "" };
  return { path: href.slice(0, idx), hash: href.slice(idx + 1) };
}

/**
 * Reads the current `window.location.hash` (without the leading `#`) safely
 * during SSR. Used by `useScrollToHash` below to decide whether to fire a
 * Lenis-driven scroll on mount.
 */
export function currentHash(): string {
  if (typeof window === "undefined") return "";
  const h = window.location.hash;
  return h.startsWith("#") ? h.slice(1) : h;
}
