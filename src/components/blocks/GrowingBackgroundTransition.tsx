"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Paramètres à ajuster ──────────────────────────────────────────────
const DEFAULTS = {
  circleColor: "#090F42",
  initialSize: 120,
  maxScale: 45,
  originX: "50%",
  originY: "50%",
  scrub: 1.4,
  triggerStart: "top top",
  triggerEnd: "bottom bottom",
} as const;
// ───────────────────────────────────────────────────────────────────────

export interface GrowingBackgroundTransitionProps {
  children?: React.ReactNode;
  className?: string;
  circleColor?: string;
  initialSize?: number;
  maxScale?: number;
  triggerStart?: string;
  triggerEnd?: string;
  scrub?: number;
}

export function GrowingBackgroundTransition({
  children,
  className = "",
  circleColor = DEFAULTS.circleColor,
  initialSize = DEFAULTS.initialSize,
  maxScale = DEFAULTS.maxScale,
  triggerStart = DEFAULTS.triggerStart,
  triggerEnd = DEFAULTS.triggerEnd,
  scrub = DEFAULTS.scrub,
}: GrowingBackgroundTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) return;

    if (prefersReduced) {
      gsap.set(circle, { scale: maxScale });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        circle,
        { scale: 1 },
        {
          scale: maxScale,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: triggerStart,
            end: triggerEnd,
            scrub,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [maxScale, triggerStart, triggerEnd, scrub]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/*
       * Positionnement margin-based pour ne pas toucher au transform —
       * GSAP n'anime que scale, sans conflit avec la translation de centrage.
       */}
      <div
        ref={circleRef}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: initialSize,
          height: initialSize,
          background: circleColor,
          top: DEFAULTS.originY,
          left: DEFAULTS.originX,
          marginTop: -initialSize / 2,
          marginLeft: -initialSize / 2,
          transformOrigin: "center center",
          willChange: "transform",
          zIndex: 0,
        }}
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
