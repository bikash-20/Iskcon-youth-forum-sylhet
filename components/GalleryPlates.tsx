"use client";

/**
 * Each plate is a "devotional museum plate" — parchment-coloured rectangle
 * with a maroon double-line frame, plate number top-right, title and
 * Devanagari caption at the bottom, and a small painted centre motif.
 *
 * The art is a pure SVG composition drawn for the brand palette
 * (cream / saffron / maroon) — no external assets, no images.
 */

export type PlateCategory =
  | "Kīrtan"
  | "Festivals"
  | "Classes"
  | "Behind the scenes";

export type PlateMeta = {
  id: string;
  number: string;
  title: string;
  deva: string;
  caption: string; // italic pull-quote
  longCaption: string; // used in the lightbox
  date: string;
  location: string;
  type: PlateCategory;
  /** "wide" tiles span 2 columns on lg+; "tall" tiles span 2 rows */
  span?: "wide" | "tall" | "feature";
};

type PlateProps = {
  meta: PlateMeta;
  /** Background gradient — adds the series variety */
  bgClass: string;
  onClick?: () => void;
  /** Whether this plate is currently selected in lightbox */
  selected?: boolean;
};

export function Plate({ meta, bgClass, onClick, selected }: PlateProps) {
  // Find the matching catalogue entry so we can render its art inline.
  const entry = CATALOGUE.find((c) => c.meta.id === meta.id);
  const Art = entry?.art;

  return (
    <figure
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={`Open ${meta.title}`}
      data-selected={selected ? "true" : undefined}
      className={`group relative overflow-hidden rounded-[18px] border border-maroon-700/15 bg-cream-50 shadow-soft outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-22px_rgba(122,29,29,0.45)] focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 ${bgClass} ${
        selected ? "ring-2 ring-saffron-400 ring-offset-2 ring-offset-cream-50" : ""
      }`}
    >
      {/* The framed plate */}
      <div className="relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-[10px] border border-maroon-700/40 bg-cream-50">
        <div className="pointer-events-none absolute inset-2 rounded-[6px] border border-maroon-700/15" />
        {/* Plate number — top-right, classic museum card */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.22em] text-maroon-700/70">
          <span className="font-serif text-sm not-italic tracking-normal text-maroon-700">
            {meta.number}
          </span>
          <span aria-hidden>/</span>
          <span>08</span>
        </div>
        {/* Centre art */}
        <div className="absolute inset-0">{Art ? <Art /> : null}</div>
      </div>

      {/* Caption block */}
      <figcaption className="px-5 pb-5 pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl text-ink-900 tracking-tightish">
            {meta.title}
          </h3>
          <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.18em] text-maroon-700/60">
            {meta.type}
          </span>
        </div>
        <p className="mt-1 font-serif text-base italic leading-snug text-ink-800/75">
          {meta.caption}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-deva text-base text-maroon-700/90">
            {meta.deva}
          </span>
          <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink-800/45">
            {meta.date}
          </span>
        </div>
      </figcaption>

      {/* Hover saffron underline sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 bottom-3 h-px origin-left scale-x-0 bg-gradient-to-r from-saffron-400 via-maroon-700/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Plate art — eight small compositions. Each is a self-contained SVG  */
/*  rendered inside the plate frame at 400 × 300 viewBox space.         */
/* ------------------------------------------------------------------ */

// 01 — Sandhyā Arati: a five-wick diya under a saffron sun
function ArtArati() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="A five-flame diya lit against the evening sky"
    >
      <defs>
        <radialGradient id="arati-sun" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f5a524" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fdfaf3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arati-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fdfaf3" />
          <stop offset="100%" stopColor="#fde8c8" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#arati-bg)" />
      {/* Soft warm halo */}
      <circle cx="200" cy="115" r="120" fill="url(#arati-sun)" />
      {/* Distant maroon horizon */}
      <rect x="0" y="220" width="400" height="40" fill="#7a1d1d" opacity="0.18" />
      <line x1="0" y1="220" x2="400" y2="220" stroke="#7a1d1d" strokeOpacity="0.55" strokeWidth="1" />
      {/* Sun rays */}
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const x1 = 200 + Math.cos(a) * 70;
        const y1 = 115 + Math.sin(a) * 70;
        const x2 = 200 + Math.cos(a) * 105;
        const y2 = 115 + Math.sin(a) * 105;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f5a524"
            strokeOpacity={0.55}
            strokeWidth="1.2"
          />
        );
      })}
      {/* Diya base */}
      <ellipse cx="200" cy="222" rx="64" ry="9" fill="#7a1d1d" />
      <ellipse cx="200" cy="218" rx="58" ry="6" fill="#9a2b2b" />
      {/* Wick stems */}
      {[0, 1, 2, 3, 4].map((i) => {
        const cx = 200 + (i - 2) * 26;
        return <line key={i} x1={cx} y1="218" x2={cx} y2="190" stroke="#7a1d1d" strokeWidth="1.5" />;
      })}
      {/* Flames — teardrops */}
      {[0, 1, 2, 3, 4].map((i) => {
        const cx = 200 + (i - 2) * 26;
        const heights = [12, 18, 24, 18, 12];
        const h = heights[i];
        return (
          <g key={i}>
            <ellipse
              cx={cx}
              cy={183 - h / 2}
              rx="4.5"
              ry={h / 2}
              fill="#f5a524"
            />
            <ellipse
              cx={cx}
              cy={183 - h / 2}
              rx="2"
              ry={h / 2.5}
              fill="#fde68a"
            />
          </g>
        );
      })}
    </svg>
  );
}

// 02 — Sunday Kīrtan: clashing kartal with sound rings
function ArtKartal() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="Two kartal cymbals mid-clash with sound rings"
    >
      <defs>
        <linearGradient id="kartal-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fdfaf3" />
          <stop offset="100%" stopColor="#fae8d4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#kartal-bg)" />
      {/* Sound rings */}
      {[60, 90, 120, 150].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="150"
          r={r}
          fill="none"
          stroke="#7a1d1d"
          strokeOpacity={0.18 - i * 0.03}
          strokeDasharray="2 4"
          strokeWidth="1"
        />
      ))}
      {/* Tulasi leaf (small accent) */}
      <path
        d="M50 60 Q 60 40 80 45 Q 75 60 50 60 Z"
        fill="#7a1d1d"
        opacity="0.7"
      />
      {/* Two kartal leaves mid-clash */}
      <g transform="rotate(-22 130 150)">
        <path
          d="M70 150 Q 130 100 200 150 Q 130 200 70 150 Z"
          fill="#9a2b2b"
        />
        <path
          d="M85 150 Q 130 115 180 150 Q 130 185 85 150 Z"
          fill="none"
          stroke="#fdfaf3"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </g>
      <g transform="rotate(22 270 150)">
        <path
          d="M200 150 Q 270 100 330 150 Q 270 200 200 150 Z"
          fill="#7a1d1d"
        />
        <path
          d="M220 150 Q 270 115 315 150 Q 270 185 220 150 Z"
          fill="none"
          stroke="#fdfaf3"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </g>
      {/* Clash spark */}
      <circle cx="200" cy="150" r="5" fill="#f5a524" />
      <circle cx="200" cy="150" r="11" fill="#f5a524" opacity="0.35" />
      {/* Saffron trailing ribbon */}
      <path
        d="M40 240 Q 150 220 200 230 T 360 215"
        stroke="#f5a524"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

// 03 — Janmāṣṭamī Mela: midnight cradle, peacock feather, stars
function ArtJanmashtami() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="A cradle holding baby Krishna, peacock feather above, midnight stars"
    >
      <defs>
        <radialGradient id="krishna-night" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#7a1d1d" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3a0d0d" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#krishna-night)" />
      {/* Stars */}
      {[
        [40, 40],
        [90, 70],
        [320, 35],
        [360, 90],
        [70, 130],
        [330, 140],
        [200, 60],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="1.2" fill="#fde68a" />
          <circle cx={x} cy={y} r="3" fill="#fde68a" opacity="0.25" />
        </g>
      ))}
      {/* Crescent moon */}
      <path
        d="M310 70 a22 22 0 1 0 0 0.1 a18 18 0 1 1 -0 -0.1"
        fill="#fde68a"
        opacity="0.9"
      />
      {/* Peacock feather */}
      <g transform="translate(110 95) rotate(-12)">
        <line x1="0" y1="0" x2="0" y2="120" stroke="#fde68a" strokeWidth="1.5" opacity="0.7" />
        <ellipse cx="0" cy="0" rx="14" ry="20" fill="#3a6b4a" />
        <ellipse cx="0" cy="-2" rx="9" ry="14" fill="#5fa173" />
        <ellipse cx="0" cy="-2" rx="5" ry="9" fill="#fde68a" />
        <ellipse cx="0" cy="-2" rx="2" ry="5" fill="#7a1d1d" />
      </g>
      {/* Cradle */}
      <path
        d="M120 230 Q 200 175 280 230 L 290 250 L 110 250 Z"
        fill="#fde68a"
        opacity="0.92"
      />
      {/* Baby silhouette */}
      <circle cx="200" cy="205" r="14" fill="#7a1d1d" />
      <path
        d="M186 220 Q 200 198 214 220 Z"
        fill="#7a1d1d"
      />
      {/* Cradle rope */}
      <line x1="120" y1="230" x2="80" y2="280" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
      <line x1="280" y1="230" x2="320" y2="280" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
      {/* Floor */}
      <rect x="0" y="270" width="400" height="30" fill="#fde68a" opacity="0.18" />
    </svg>
  );
}

// 04 — Gītā Class: open book + lamp
function ArtGita() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="An open Bhagavad Gita with a small lamp above the page"
    >
      <rect width="400" height="300" fill="#fdfaf3" />
      {/* Lamp glow */}
      <radialGradient id="gita-glow" cx="50%" cy="35%" r="40%">
        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#fdfaf3" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="300" fill="url(#gita-glow)" />
      {/* Lamp at top centre */}
      <line x1="200" y1="60" x2="200" y2="92" stroke="#7a1d1d" strokeWidth="1.5" />
      <ellipse cx="200" cy="86" rx="22" ry="5" fill="#7a1d1d" />
      <ellipse cx="200" cy="60" rx="5" ry="10" fill="#f5a524" />
      <ellipse cx="200" cy="60" rx="2.5" ry="6" fill="#fde68a" />
      {/* Open book */}
      <path
        d="M80 240 L 80 140 Q 140 110 200 140 Q 260 110 320 140 L 320 240 Q 260 210 200 240 Q 140 210 80 240 Z"
        fill="#fdfaf3"
        stroke="#7a1d1d"
        strokeWidth="1.5"
      />
      {/* Spine shadow */}
      <line x1="200" y1="140" x2="200" y2="240" stroke="#7a1d1d" strokeWidth="1" strokeOpacity="0.4" />
      {/* Page lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line
            x1={108}
            y1={160 + i * 10}
            x2={184}
            y2={158 + i * 10}
            stroke="#7a1d1d"
            strokeOpacity={0.35}
            strokeWidth="1"
          />
          <line
            x1={216}
            y1={158 + i * 10}
            x2={292}
            y2={160 + i * 10}
            stroke="#7a1d1d"
            strokeOpacity={0.35}
            strokeWidth="1"
          />
        </g>
      ))}
      {/* Title in the spread */}
      <text
        x="200"
        y="220"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="11"
        fill="#7a1d1d"
        opacity="0.85"
      >
        श्रीमद्भगवद्गीता
      </text>
    </svg>
  );
}

// 05 — Be SMART: a student under a tree with a desk lamp
function ArtStudy() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="A small figure seated reading under a tree at dusk"
    >
      <defs>
        <linearGradient id="study-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fae8d4" />
          <stop offset="100%" stopColor="#fdfaf3" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#study-bg)" />
      {/* Ground */}
      <path
        d="M0 240 Q 200 220 400 245 L 400 300 L 0 300 Z"
        fill="#7a1d1d"
        opacity="0.12"
      />
      {/* Tree */}
      <line x1="80" y1="240" x2="80" y2="140" stroke="#7a1d1d" strokeWidth="3" />
      <circle cx="80" cy="120" r="42" fill="#7a1d1d" opacity="0.85" />
      <circle cx="55" cy="135" r="28" fill="#7a1d1d" opacity="0.65" />
      <circle cx="105" cy="135" r="30" fill="#7a1d1d" opacity="0.65" />
      {/* Lamp */}
      <line x1="60" y1="165" x2="60" y2="180" stroke="#7a1d1d" strokeWidth="1.5" />
      <path d="M50 178 L 70 178 L 65 195 L 55 195 Z" fill="#7a1d1d" />
      <ellipse cx="60" cy="180" rx="8" ry="3" fill="#fde68a" opacity="0.95" />
      {/* Lamp glow */}
      <radialGradient id="lamp-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#fdfaf3" stopOpacity="0" />
      </radialGradient>
      <circle cx="60" cy="200" r="60" fill="url(#lamp-glow)" />
      {/* Student figure */}
      <circle cx="230" cy="195" r="10" fill="#7a1d1d" />
      <path
        d="M220 205 L 240 205 L 245 235 L 215 235 Z"
        fill="#7a1d1d"
      />
      <line x1="225" y1="222" x2="225" y2="232" stroke="#7a1d1d" strokeWidth="2" />
      <line x1="235" y1="222" x2="235" y2="232" stroke="#7a1d1d" strokeWidth="2" />
      {/* Open book on lap */}
      <path
        d="M218 222 L 230 218 L 242 222 L 230 226 Z"
        fill="#fdfaf3"
        stroke="#7a1d1d"
        strokeWidth="1"
      />
    </svg>
  );
}

// 06 — Ratha-yatrā: chariot wheel + canopy
function ArtRatha() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="A chariot wheel with a canopy above and ribbon trail behind"
    >
      <defs>
        <linearGradient id="ratha-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fdfaf3" />
          <stop offset="100%" stopColor="#fde8c8" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ratha-bg)" />
      {/* Procession ground */}
      <line x1="0" y1="240" x2="400" y2="240" stroke="#7a1d1d" strokeOpacity="0.4" strokeDasharray="4 6" />
      {/* Ribbon trail */}
      <path
        d="M30 230 Q 100 215 150 225 T 250 220"
        stroke="#f5a524"
        strokeWidth="3"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M30 240 Q 100 230 150 240 T 250 240"
        stroke="#7a1d1d"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
      />
      {/* Wheel */}
      <g transform="translate(280 170)">
        <circle r="68" fill="#fdfaf3" stroke="#7a1d1d" strokeWidth="3" />
        <circle r="58" fill="none" stroke="#7a1d1d" strokeWidth="1" strokeOpacity="0.5" />
        <circle r="48" fill="none" stroke="#7a1d1d" strokeWidth="1" strokeOpacity="0.4" />
        {/* Spokes */}
        {[...Array(8)].map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 8}
              y1={Math.sin(a) * 8}
              x2={Math.cos(a) * 62}
              y2={Math.sin(a) * 62}
              stroke="#7a1d1d"
              strokeWidth="1.5"
            />
          );
        })}
        <circle r="9" fill="#f5a524" />
        <circle r="3" fill="#7a1d1d" />
      </g>
      {/* Canopy above wheel */}
      <g transform="translate(280 60)">
        <path
          d="M-50 30 Q 0 -10 50 30 Z"
          fill="#7a1d1d"
        />
        <line x1="-30" y1="32" x2="-32" y2="55" stroke="#f5a524" strokeWidth="1.5" />
        <line x1="0" y1="32" x2="0" y2="58" stroke="#f5a524" strokeWidth="1.5" />
        <line x1="30" y1="32" x2="32" y2="55" stroke="#f5a524" strokeWidth="1.5" />
        <circle cx="-32" cy="58" r="2" fill="#f5a524" />
        <circle cx="0" cy="62" r="2" fill="#f5a524" />
        <circle cx="32" cy="58" r="2" fill="#f5a524" />
      </g>
    </svg>
  );
}

// 07 — Prasādam Hall: thali with offerings
function ArtPrasadam() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="A brass thali plate with small bowls of prasadam arranged on it"
    >
      <defs>
        <radialGradient id="plate-rad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fdfaf3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="#fdfaf3" />
      <rect width="400" height="300" fill="url(#plate-rad)" />
      {/* Thali plate viewed from above */}
      <g transform="translate(200 160)">
        <circle r="115" fill="#c8973a" />
        <circle r="115" fill="none" stroke="#7a1d1d" strokeWidth="2" />
        <circle r="105" fill="none" stroke="#fde68a" strokeWidth="1" opacity="0.6" />
        <circle r="55" fill="none" stroke="#7a1d1d" strokeWidth="1" opacity="0.55" />
        {/* Small bowls on plate */}
        <g>
          <circle cx="-60" cy="-30" r="22" fill="#7a1d1d" />
          <circle cx="-60" cy="-30" r="14" fill="#f5a524" />
          <circle cx="-60" cy="-30" r="6" fill="#fdfaf3" />
        </g>
        <g>
          <circle cx="60" cy="-30" r="22" fill="#7a1d1d" />
          <circle cx="60" cy="-30" r="14" fill="#9a2b2b" />
          <circle cx="60" cy="-30" r="6" fill="#fdfaf3" />
        </g>
        <g>
          <circle cx="0" cy="55" r="24" fill="#7a1d1d" />
          <circle cx="0" cy="55" r="15" fill="#f5a524" />
          <circle cx="0" cy="55" r="6" fill="#fdfaf3" />
        </g>
        {/* Tulasi leaf at centre */}
        <path
          d="M0 -10 Q 8 0 0 10 Q -8 0 0 -10 Z"
          fill="#3a6b4a"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}

// 08 — Children's Class: circle of small figures + easel with Om
function ArtChildren() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="A circle of children seated around an easel with the Om sign"
    >
      <defs>
        <radialGradient id="kids-bg" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fdfaf3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="#fdfaf3" />
      <rect width="400" height="300" fill="url(#kids-bg)" />
      {/* Floor circle */}
      <ellipse cx="200" cy="180" rx="155" ry="65" fill="none" stroke="#7a1d1d" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" />
      {/* Easel */}
      <g transform="translate(200 120)">
        <rect x="-35" y="-45" width="70" height="55" fill="#fdfaf3" stroke="#7a1d1d" strokeWidth="1.5" />
        <text x="0" y="-5" textAnchor="middle" fontFamily="serif" fontSize="32" fill="#7a1d1d">
          ॐ
        </text>
        <line x1="-30" y1="-45" x2="-30" y2="55" stroke="#7a1d1d" strokeWidth="1" />
        <line x1="30" y1="-45" x2="30" y2="55" stroke="#7a1d1d" strokeWidth="1" />
      </g>
      {/* Children figures around the circle */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i * 45 - 90) * (Math.PI / 180);
        const cx = 200 + Math.cos(a) * 130;
        const cy = 180 + Math.sin(a) * 60;
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <circle cx="0" cy="-10" r="7" fill="#7a1d1d" />
            <path
              d="M-9 -3 L 9 -3 L 12 14 L -12 14 Z"
              fill={i % 2 ? "#9a2b2b" : "#f5a524"}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Catalogue — plate metadata + which art and background go with it  */
/* ------------------------------------------------------------------ */

export const CATALOGUE: ReadonlyArray<{
  meta: PlateMeta;
  art: () => JSX.Element;
  /** Cream / saffron / maroon background gradients, varied per plate */
  bg: string;
}> = [
  {
    meta: {
      id: "sandhya-arati",
      number: "01",
      title: "Sandhyā Arati",
      deva: "सान्ध्य आरती",
      caption: "Five wicks, one breath — the lamp opens the evening.",
      longCaption:
        "As the day cools, the five flames of the sandhyā arati are lit in a single line before the altar. They stand for the five elements, the five prāṇas, the five senses offered back to the Lord. The guru leads; the hall rings with bell, conch, and kīrtan.",
      date: "Friday · 6:42 pm",
      location: "Main altar",
      type: "Kīrtan",
      span: "feature",
    },
    art: ArtArati,
    bg: "bg-gradient-to-br from-cream-50 to-cream-200",
  },
  {
    meta: {
      id: "sunday-kirtan",
      number: "02",
      title: "Sunday Kīrtan",
      deva: "रविवार कीर्तन",
      caption: "Kartal in hand, mahā-mantra in the air.",
      longCaption:
        "Open courtyard. The youth forum gathers in a wide circle, kartal clashing on the downbeat, voices rising on the up. No microphones, no band — just mṛdaṅga, kartal, and the names of Hari ringing off the old tamarind trees.",
      date: "Sunday · 7:00 am",
      location: "Courtyard",
      type: "Kīrtan",
    },
    art: ArtKartal,
    bg: "bg-gradient-to-br from-cream-50 to-saffron-100",
  },
  {
    meta: {
      id: "janmashtami-mela",
      number: "03",
      title: "Janmāṣṭamī Mela",
      deva: "जन्माष्टमी मेला",
      caption: "Midnight — the cradle appears.",
      longCaption:
        "On the 8th day of the dark fortnight, the temple courtyard turns into a small village. Sweets lines, rangoli, a tiny cradle for Thākurji. At the stroke of midnight, śaṅkhās blow, the curtains part, and the abhiṣek begins — milk, yogurt, honey, ghee, poured one by one.",
      date: "Aug 2025 · midnight",
      location: "Temple courtyard",
      type: "Festivals",
      span: "tall",
    },
    art: ArtJanmashtami,
    bg: "bg-gradient-to-br from-maroon-700 to-ink-900",
  },
  {
    meta: {
      id: "gita-class",
      number: "04",
      title: "Gītā Class",
      deva: "गीता कक्षा",
      caption: "A chapter a week — the slow way in.",
      longCaption:
        "IYF Hall, Saturdays at five. A small lamp on the table, a single text in everyone's hand, one śloka read three times and unpacked phrase by phrase. The class is deliberately unhurried — read, listen, wait, ask.",
      date: "Saturday · 5:00 pm",
      location: "IYF Hall",
      type: "Classes",
    },
    art: ArtGita,
    bg: "bg-gradient-to-br from-cream-50 to-cream-100",
  },
  {
    meta: {
      id: "be-smart",
      number: "05",
      title: "Be SMART",
      deva: "बी स्मार्ट",
      caption: "Spring batch, twelve weeks, one lamp each.",
      longCaption:
        "Be SMART is the Forum's flagship character course for college students. Twelve evenings: a quiet syllabus on habits, study, attention, speech, simplicity, mindfulness. Each student keeps a small notebook — and is given one diya to take home.",
      date: "Spring 2026",
      location: "IYF Hall",
      type: "Classes",
    },
    art: ArtStudy,
    bg: "bg-gradient-to-br from-saffron-50 to-cream-50",
  },
  {
    meta: {
      id: "ratha-yatra",
      number: "06",
      title: "Ratha-yatrā",
      deva: "रथयात्रा",
      caption: "Jagannātha, Subhadrā, Baladeva — pulled by hand.",
      longCaption:
        "Once a year, on the Āṣāḍhā śukla dvitīyā, the Lord rides out. Three wood-and-cloth chariots carry Jagannāth, Subhadrā and Baladeva through the streets around the temple, pulled by devotees with thick rope. The kīrtan doesn't stop.",
      date: "Āṣāḍha śukla 2",
      location: "Temple road",
      type: "Festivals",
      span: "wide",
    },
    art: ArtRatha,
    bg: "bg-gradient-to-br from-cream-50 to-cream-200",
  },
  {
    meta: {
      id: "prasadam-hall",
      number: "07",
      title: "Prasādam Hall",
      deva: "प्रसादम हल",
      caption: "After arati, before the city — a hot meal.",
      longCaption:
        "Steel thalis lined in long rows. White rice, dal, sabji, a sweet — served hot to anyone who walks in. The kitchen runs on a rotation of volunteers and a handful of grandmothers who, between them, can feed two hundred in an hour.",
      date: "Daily · after sandhyā",
      location: "Prasādam hall",
      type: "Behind the scenes",
    },
    art: ArtPrasadam,
    bg: "bg-gradient-to-br from-cream-50 to-saffron-100",
  },
  {
    meta: {
      id: "childrens-class",
      number: "08",
      title: "Children's Class",
      deva: "बालकों की कक्षा",
      caption: "Small chairs, big questions, a circle of Om.",
      longCaption:
        "Saturday mornings are for the smallest members of the congregation. A simple lesson, a song with hand gestures, a short story, and a small altar circle with a tiny diya. They leave with a sticker and a sticker-shaped sense that the temple is theirs too.",
      date: "Saturday · 9:30 am",
      location: "Children's room",
      type: "Behind the scenes",
      span: "tall",
    },
    art: ArtChildren,
    bg: "bg-gradient-to-br from-cream-50 to-cream-100",
  },
];
