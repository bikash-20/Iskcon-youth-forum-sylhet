"use client";

import { useScrollToHash } from "@/components/useScrollToHash";

/**
 * Tiny client island used by `app/contact/page.tsx` so the page itself can
 * stay a Server Component (keeps metadata + zero-JS for the rest).
 *
 * If the user arrives at `/contact#volunteer`, this fires a Lenis-driven
 * scroll to the volunteer form once the page has mounted.
 */
export default function HashScrollIsland() {
  useScrollToHash();
  return null;
}
