"use client";

import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";

/**
 * FloatingOrbs — shapes organiques colorées en atmosphère de page.
 *
 * position: fixed + z-index: 200 → toujours visible au-dessus des sections.
 * pointer-events: none → aucun impact sur les interactions.
 * Blur réduit (30-50px) pour que les formes soient réellement perceptibles.
 */

interface OrbDef {
  color: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  /** Opacité centrale du radial-gradient */
  opacity: number;
  blur: number;
  driftDuration: number;
  driftAmplitude: [number, number];
  scrollY: [number, number];
  radii: [string, string];
  delay: number;
}

// Couleurs des tokens DNA uniquement
// --color-offer-blue: #4746E9 | --color-offer-green: #46BA87
// --color-offer-yellow: #E6B002 | --color-brand-orange-light: #FFB692
const ORBS: OrbDef[] = [
  {
    color: "#4746E9",
    size: 500,
    top: "5%",
    right: "-5%",
    opacity: 0.35,
    blur: 40,
    driftDuration: 14,
    driftAmplitude: [30, 45],
    scrollY: [0, -150],
    radii: [
      "40% 60% 70% 30% / 40% 50% 60% 50%",
      "60% 40% 30% 70% / 60% 50% 40% 50%",
    ],
    delay: 0,
  },
  {
    color: "#46BA87",
    size: 380,
    top: "35%",
    left: "-4%",
    opacity: 0.3,
    blur: 35,
    driftDuration: 18,
    driftAmplitude: [25, 40],
    scrollY: [0, 130],
    radii: [
      "60% 40% 50% 50% / 30% 60% 40% 70%",
      "40% 60% 50% 50% / 70% 40% 60% 30%",
    ],
    delay: 0.4,
  },
  {
    color: "#E6B002",
    size: 300,
    top: "62%",
    left: "6%",
    opacity: 0.28,
    blur: 30,
    driftDuration: 16,
    driftAmplitude: [20, 45],
    scrollY: [0, -90],
    radii: [
      "70% 30% 50% 50% / 50% 50% 30% 70%",
      "30% 70% 50% 50% / 50% 50% 70% 30%",
    ],
    delay: 0.6,
  },
  {
    color: "#FFB692",
    size: 420,
    top: "50%",
    right: "-3%",
    opacity: 0.28,
    blur: 38,
    driftDuration: 20,
    driftAmplitude: [28, 35],
    scrollY: [0, -160],
    radii: [
      "40% 60% 60% 40% / 50% 60% 40% 50%",
      "60% 40% 40% 60% / 50% 40% 60% 50%",
    ],
    delay: 0.2,
  },
  {
    color: "#4746E9",
    size: 340,
    top: "78%",
    right: "10%",
    opacity: 0.22,
    blur: 32,
    driftDuration: 22,
    driftAmplitude: [35, 25],
    scrollY: [0, 100],
    radii: [
      "50% 50% 40% 60% / 60% 40% 50% 50%",
      "50% 50% 60% 40% / 40% 60% 50% 50%",
    ],
    delay: 0.8,
  },
];

function Orb({ orb }: { orb: OrbDef }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], orb.scrollY);

  const opacityHex = Math.round(orb.opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: orb.top,
        ...(orb.left !== undefined ? { left: orb.left } : { right: orb.right }),
        width: orb.size,
        height: orb.size,
        y,
        pointerEvents: "none",
        zIndex: 200,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: orb.delay, ease: "easeOut" }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 45% 40%, ${orb.color}${opacityHex} 0%, ${orb.color}00 68%)`,
          filter: `blur(${orb.blur}px)`,
          willChange: "transform, border-radius",
        }}
        animate={{
          borderRadius: [orb.radii[0], orb.radii[1], orb.radii[0]],
          x: [0, orb.driftAmplitude[0], -orb.driftAmplitude[0] * 0.6, 0],
          y: [0, -orb.driftAmplitude[1] * 0.5, orb.driftAmplitude[1], 0],
        }}
        transition={{
          borderRadius: {
            duration: orb.driftDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          },
          x: {
            duration: orb.driftDuration * 1.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay + 0.5,
          },
          y: {
            duration: orb.driftDuration * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay + 0.2,
          },
        }}
      />
    </motion.div>
  );
}

export function FloatingOrbs() {
  return (
    <MotionConfig reducedMotion="user">
      {ORBS.map((orb, i) => (
        <Orb key={i} orb={orb} />
      ))}
    </MotionConfig>
  );
}
