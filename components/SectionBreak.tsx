type Props = {
  /** Centered glyph between the two rules */
  glyph?: string;
  /** Optional label, rendered in a small uppercase eyebrow above the glyph */
  label?: string;
};

/**
 * A maroon color-block "breathing" divider used between content-heavy sections.
 * Wraps in <div role="separator"> so it stays out of the document outline.
 */
export default function SectionBreak({ glyph = "•", label }: Props) {
  return (
    <div
      role="separator"
      aria-label={label ?? "section break"}
      className="my-16 sm:my-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-maroon-700/40 to-maroon-700/40" />
          <div className="flex flex-col items-center">
            {label && (
              <span className="mb-1 font-sans text-[10px] uppercase tracking-[0.28em] text-maroon-700/70">
                {label}
              </span>
            )}
            <span
              aria-hidden="true"
              className="font-deva text-base text-maroon-700/80"
            >
              {glyph}
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-maroon-700/40 to-maroon-700/40" />
        </div>
      </div>
    </div>
  );
}