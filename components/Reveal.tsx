"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** ms to wait before this child reveals — used to stagger siblings */
  delay?: number;
  /** Translation distance in px on the Y axis (default 16) */
  y?: number;
  /** Tailwind classes for the wrapper */
  className?: string;
  /** Render as a different element (default div) */
  as?: keyof JSX.IntrinsicElements;
  /** Reveal only once, or every time it enters the viewport */
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
  as: Tag = "div",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: show immediately, no observer.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => setShown(true), delay);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, once]);

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${
          shown ? "0ms" : "0ms"
        }, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}