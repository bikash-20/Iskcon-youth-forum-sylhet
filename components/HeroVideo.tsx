"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Try to play; some browsers block autoplay with sound. We default to muted.
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // ignore — user can press play
      }
    };
    tryPlay();
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/media/temple.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="metadata"
          poster=""
          aria-hidden="true"
        />
        {/* Layered film for legibility — not flat black */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/55 to-ink-900/85" />
        <div className="absolute inset-0 mix-blend-multiply bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_85%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-28 sm:pt-28 sm:pb-40 lg:pt-36 lg:pb-52">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-cream-50/20 bg-cream-50/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cream-50/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron-300" />
            Sri Sri Radha Madhava Mandir · Jugaltila
          </p>

          <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-cream-50 tracking-tightish">
            A quieter path
            <br />
            for the next generation.
          </h1>

          <p className="mt-6 max-w-xl font-serif text-lg sm:text-xl leading-relaxed text-cream-50/85">
            The ISKCON Youth Forum, Sylhet — a circle of students and young
            professionals reading scripture, singing kīrtan, and learning to
            live with intention.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full bg-saffron-500 px-6 py-3 text-sm font-medium text-ink-900 shadow-soft transition-all hover:bg-saffron-400"
            >
              Upcoming Events
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-cream-50/10"
            >
              Daily Schedule
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4 text-cream-50/70">
            <button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                if (v.paused) {
                  v.play();
                  setPlaying(true);
                } else {
                  v.pause();
                  setPlaying(false);
                }
              }}
              className="grid h-9 w-9 place-items-center rounded-full border border-cream-50/30 hover:bg-cream-50/10"
              aria-label={playing ? "Pause background video" : "Play background video"}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                setMuted((m) => !m);
                if (videoRef.current) videoRef.current.muted = !muted;
              }}
              className="grid h-9 w-9 place-items-center rounded-full border border-cream-50/30 hover:bg-cream-50/10"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M5 9v6h4l5 4V5L9 9H5z" />
                  <path d="M16 8l4 8M20 8l-4 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M5 9v6h4l5 4V5L9 9H5z" />
                  <path d="M16 8c1.5 1 1.5 7 0 8M19 6c3 3 3 9 0 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </button>
            <span className="font-deva text-2xl text-saffron-300/90">
              हरे कृष्ण हरे कृष्ण
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade into page content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-50" />
    </section>
  );
}
