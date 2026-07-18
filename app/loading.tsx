/**
 * Global route-level loading skeleton.
 *
 * Shown by Next.js whenever the current route segment is suspended
 * (data fetching, server actions, dynamic imports). We render a
 * brand-consistent placeholder rather than a generic spinner so the
 * UI never feels like it stalls.
 *
 * The skeleton mirrors the hero composition — Om glyph, three
 * hairline blocks, a tone-tinted card row — so the transition into
 * real content feels continuous rather than jarring.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="min-h-[60vh] grid place-items-center px-5 py-24"
    >
      <div className="w-full max-w-3xl">
        {/* Brand mark + wordmark */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-maroon-700 text-cream-50 font-serif text-2xl leading-none shadow-soft animate-om"
          >
            ॐ
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-xl text-ink-900 tracking-tightish">
              ISKCON Youth Forum
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-maroon-700/80">
              Preparing the page…
            </span>
          </span>
        </div>

        {/* Skeleton headline */}
        <div className="mt-12 space-y-4">
          <div className="skeleton-shimmer h-10 w-2/3 rounded-md" />
          <div className="skeleton-shimmer h-10 w-1/2 rounded-md" />
        </div>

        {/* Skeleton lede */}
        <div className="mt-6 space-y-3">
          <div className="skeleton-shimmer h-4 w-full rounded" />
          <div className="skeleton-shimmer h-4 w-11/12 rounded" />
          <div className="skeleton-shimmer h-4 w-3/4 rounded" />
        </div>

        {/* Skeleton card row */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="skeleton-shimmer h-32 rounded-2xl" />
          <div className="skeleton-shimmer h-32 rounded-2xl" />
          <div className="skeleton-shimmer h-32 rounded-2xl" />
        </div>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
