export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {/* Saffron thread above — signals a new chapter of content. */}
      <span
        aria-hidden
        className="block h-px w-12 bg-gradient-to-r from-saffron-500 to-transparent"
      />
      {eyebrow && (
        <p
          className={`mt-4 font-sans text-[11px] uppercase tracking-[0.24em] text-maroon-700/85 eyebrow-line ${
            isCenter ? "is-center justify-center" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-serif text-3xl sm:text-4xl display-tight text-ink-900 tracking-tightish">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed text-ink-800/80 ${
            isCenter ? "mx-auto max-w-xl" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
