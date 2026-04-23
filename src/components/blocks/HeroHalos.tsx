"use client";

import { useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";

/**
 * HeroHalos — 3 halos oranges animés (Client Component).
 *
 * Trajectoires Lissajous (sin/sin) pour un mouvement organique en 8.
 * Mise à jour via style.transform direct sur un <div> ref — zéro overhead
 * Framer Motion sur le hot path.
 *
 * Respecte prefers-reduced-motion : RAF non lancé si activé.
 */

interface HaloConfig {
  color: string;
  size: number;
  blur: number;
  opacity: number;
  /** Centre de l'orbite en fraction [0,1] du conteneur */
  centerX: number;
  centerY: number;
  /** Amplitude en fraction [0,1] du conteneur */
  ampX: number;
  ampY: number;
  /** Fréquences angulaires (rad/ms) — ratios irrationnels pour éviter la boucle */
  freqX: number;
  freqY: number;
  /** Phases initiales (rad) pour désynchroniser les halos */
  phaseX: number;
  phaseY: number;
}

const HALOS: HaloConfig[] = [
  {
    color: "#FF7E33",
    size: 480,
    blur: 100,
    opacity: 0.45,
    centerX: 0.3,
    centerY: 0.4,
    ampX: 0.4,
    ampY: 0.35,
    freqX: 0.00018,
    freqY: 0.00025,
    phaseX: 0,
    phaseY: 0,
  },
  {
    color: "#FF6B35",
    size: 380,
    blur: 80,
    opacity: 0.35,
    centerX: 0.7,
    centerY: 0.55,
    ampX: 0.35,
    ampY: 0.4,
    freqX: 0.00022,
    freqY: 0.00015,
    phaseX: 1.2,
    phaseY: 2.4,
  },
  {
    color: "#FBA275",
    size: 280,
    blur: 60,
    opacity: 0.28,
    centerX: 0.5,
    centerY: 0.3,
    ampX: 0.45,
    ampY: 0.3,
    freqX: 0.00015,
    freqY: 0.0002,
    phaseX: 2.6,
    phaseY: 1.0,
  },
];

interface SingleHaloProps {
  config: HaloConfig;
}

function SingleHalo({ config }: SingleHaloProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const el = divRef.current;
    if (!el) return;

    // Opacité fixe au mount
    el.style.opacity = String(config.opacity);

    let rafId: number | null = null;
    let mounted = true;

    const tick = (t: number) => {
      if (!mounted) return;

      const parent = el.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;

      const x = config.centerX * w + config.ampX * w * Math.sin(config.freqX * t + config.phaseX);
      const y = config.centerY * h + config.ampY * h * Math.sin(config.freqY * t + config.phaseY);

      // Centre le halo sur le point calculé (décalage de -50% de sa propre taille)
      const half = config.size / 2;
      el.style.transform = `translate(${x - half}px, ${y - half}px)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={divRef}
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        width: config.size,
        height: config.size,
        background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
        filter: `blur(${config.blur}px)`,
        opacity: 0,
        top: 0,
        left: 0,
        willChange: "transform",
      }}
    />
  );
}

export function HeroHalos() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {HALOS.map((halo, i) => (
          <SingleHalo key={i} config={halo} />
        ))}
      </div>
    </MotionConfig>
  );
}
