"use client";

import { motion, MotionConfig } from "framer-motion";

/**
 * Halos lumineux flottants — HeroSection (Client Component).
 *
 * Palette du blanc chaud (#DFE1F8) vers l'orange (#FF7E33) — tokens DS.
 * Animation : initial → animate + repeatType:"mirror" pour un pendule propre.
 * Amplitude : ≥ 60px pour que le flottement soit perceptible à travers le blur.
 */

interface HaloConfig {
  color: string;
  size: number;
  blur: number;
  /** Position de repos (CSS absolu) */
  position: React.CSSProperties;
  /** Demi-amplitude verticale en px */
  ampY: number;
  /** Demi-amplitude horizontale en px */
  ampX: number;
  /** Durée du cycle Y (s) */
  durationY: number;
  /** Durée du cycle X (s) — différente de Y pour un trajet non-linéaire */
  durationX: number;
  delay: number;
}

const HALOS: HaloConfig[] = [
  {
    // HALO 1 — blanc chaud, derrière le titre.
    color: "rgba(223, 225, 248, 0.20)",
    size: 700,
    blur: 80,
    position: { left: "12%", top: "18%" },
    ampY: 80,
    ampX: 30,
    durationY: 12,
    durationX: 17,   // ratio irrationnel → trajet elliptique libre
    delay: 0,
  },
  {
    // HALO 2 — beige, coin haut-droite.
    color: "rgba(223, 192, 179, 0.18)",
    size: 500,
    blur: 70,
    position: { right: "5%", top: "-5%" },
    ampY: 70,
    ampX: 35,        // réduit pour rester dans le viewport
    durationY: 10,
    durationX: 15,
    delay: 2.5,
  },
  {
    // HALO 3 — pêche, bas-gauche.
    color: "rgba(255, 182, 146, 0.18)",
    size: 560,
    blur: 80,
    position: { left: "5%", bottom: "8%" },
    ampY: 90,
    ampX: 40,        // réduit pour rester dans le viewport
    durationY: 14,
    durationX: 9,
    delay: 1.2,
  },
  {
    // HALO 4 — orange, bas-droite.
    color: "rgba(255, 126, 51, 0.14)",
    size: 460,
    blur: 70,
    position: { right: "8%", bottom: "12%" },
    ampY: 65,
    ampX: 30,        // réduit pour rester dans le viewport
    durationY: 11,
    durationX: 16,
    delay: 4,
  },
];

export function HeroHalos() {
  return (
    <MotionConfig reducedMotion="user">
      {/*
       * overflow-hidden : empêche les halos de créer une scrollbar horizontale.
       * Les amplitudes x sont calibrées pour rester dans le viewport même avec ce clip.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {HALOS.map((halo, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: halo.size,
              height: halo.size,
              background: `radial-gradient(circle, ${halo.color} 0%, transparent 80%)`,
              filter: `blur(${halo.blur}px)`,
              ...halo.position,
            }}
            /*
             * X et Y ont des durées différentes (ratio irrationnel).
             * Résultat : le halo dessine un trajet elliptique/lissajous
             * qui ne se répète jamais exactement — mouvement organique.
             */
            initial={{ y: -halo.ampY, x: -halo.ampX }}
            animate={{ y: halo.ampY, x: halo.ampX }}
            transition={{
              y: {
                duration: halo.durationY,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: halo.delay,
              },
              x: {
                duration: halo.durationX,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: halo.delay * 0.7,
              },
            }}
          />
        ))}
      </div>
    </MotionConfig>
  );
}
