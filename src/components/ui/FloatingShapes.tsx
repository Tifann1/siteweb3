"use client";

import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";

/**
 * FloatingShapes — shapes colorées avec texte dans les marges de la page.
 *
 * Ce ne sont pas des halos flous — ce sont des badges/pills/blobs solides
 * avec du contenu lisible, positionnés dans les gouttières (< 10% des bords).
 *
 * Techniques :
 *   Shapes dures (border-radius varié, clip-path) — pills, circles, squircles, blobs
 *   Drift autonome — oscillation X/Y indépendante par shape
 *   Scroll fade — disparaissent après le premier viewport pour ne pas gêner le contenu
 *
 * position: fixed + z-index: 200 — au-dessus de tous les fonds opaques.
 * pointer-events: none — aucun blocage d'interaction.
 */

type ShapeType = "pill" | "squircle" | "circle" | "blob";
type ColorKey = "blue" | "green" | "yellow" | "peach" | "glass";
type Variant = "filled" | "outlined";

interface ShapeDef {
  text: string;
  shape: ShapeType;
  color: ColorKey;
  variant: Variant;
  top: string;
  left?: string;
  right?: string;
  rotate?: number;
  driftDuration: number;
  driftAmplitude: [number, number];
  delay: number;
  fontSize?: string;
}

const PALETTE: Record<ColorKey, Record<Variant, { bg: string; border: string; text: string }>> = {
  blue: {
    filled: {
      bg: "rgba(71,70,233,0.16)",
      border: "rgba(71,70,233,0.45)",
      text: "#8B8BFF",
    },
    outlined: {
      bg: "transparent",
      border: "rgba(71,70,233,0.5)",
      text: "#7474FF",
    },
  },
  green: {
    filled: {
      bg: "rgba(70,186,135,0.14)",
      border: "rgba(70,186,135,0.45)",
      text: "#4ECF97",
    },
    outlined: {
      bg: "transparent",
      border: "rgba(70,186,135,0.5)",
      text: "#46BA87",
    },
  },
  yellow: {
    filled: {
      bg: "rgba(230,176,2,0.13)",
      border: "rgba(230,176,2,0.45)",
      text: "#D4A800",
    },
    outlined: {
      bg: "transparent",
      border: "rgba(230,176,2,0.5)",
      text: "#C9A000",
    },
  },
  peach: {
    filled: {
      bg: "rgba(255,182,146,0.13)",
      border: "rgba(255,182,146,0.4)",
      text: "#FFB692",
    },
    outlined: {
      bg: "transparent",
      border: "rgba(255,182,146,0.4)",
      text: "#FFB692",
    },
  },
  glass: {
    filled: {
      bg: "rgba(255,255,255,0.05)",
      border: "rgba(255,255,255,0.14)",
      text: "rgba(255,255,255,0.45)",
    },
    outlined: {
      bg: "transparent",
      border: "rgba(255,255,255,0.14)",
      text: "rgba(255,255,255,0.35)",
    },
  },
};

const SHAPE_RADIUS: Record<ShapeType, string | undefined> = {
  pill: "9999px",
  squircle: "16px",
  circle: "50%",
  blob: "42% 58% 68% 32% / 38% 52% 62% 48%",
};

// Contenu ancré dans l'ADN de l'agence
const SHAPES: ShapeDef[] = [
  // Colonne gauche
  {
    text: "Senior",
    shape: "pill",
    color: "blue",
    variant: "filled",
    top: "14%",
    left: "1%",
    rotate: -4,
    driftDuration: 13,
    driftAmplitude: [8, 18],
    delay: 0.1,
  },
  {
    text: "Production",
    shape: "squircle",
    color: "green",
    variant: "filled",
    top: "30%",
    left: "0.5%",
    rotate: 3,
    driftDuration: 17,
    driftAmplitude: [6, 22],
    delay: 0.5,
  },
  {
    text: "LLM & RAG",
    shape: "pill",
    color: "blue",
    variant: "outlined",
    top: "48%",
    left: "1%",
    rotate: -2,
    driftDuration: 21,
    driftAmplitude: [10, 16],
    delay: 0.9,
  },
  {
    text: "DevOps",
    shape: "squircle",
    color: "yellow",
    variant: "outlined",
    top: "63%",
    left: "1.5%",
    rotate: 5,
    driftDuration: 15,
    driftAmplitude: [7, 20],
    delay: 0.3,
  },
  {
    text: "Architecture",
    shape: "pill",
    color: "glass",
    variant: "outlined",
    top: "78%",
    left: "0.5%",
    rotate: -3,
    driftDuration: 19,
    driftAmplitude: [9, 14],
    delay: 0.7,
  },

  // Colonne droite
  {
    text: "2005",
    shape: "circle",
    color: "peach",
    variant: "outlined",
    top: "10%",
    right: "1.5%",
    rotate: 0,
    driftDuration: 16,
    driftAmplitude: [10, 20],
    delay: 0.2,
    fontSize: "1.1rem",
  },
  {
    text: "IA Agents",
    shape: "blob",
    color: "green",
    variant: "filled",
    top: "25%",
    right: "0.8%",
    rotate: 8,
    driftDuration: 14,
    driftAmplitude: [12, 24],
    delay: 0.6,
  },
  {
    text: "React · Next.js",
    shape: "pill",
    color: "blue",
    variant: "filled",
    top: "42%",
    right: "0.5%",
    rotate: -5,
    driftDuration: 22,
    driftAmplitude: [8, 18],
    delay: 1.0,
  },
  {
    text: "200+ clients",
    shape: "squircle",
    color: "peach",
    variant: "filled",
    top: "58%",
    right: "1%",
    rotate: 3,
    driftDuration: 18,
    driftAmplitude: [11, 15],
    delay: 0.4,
  },
  {
    text: "TypeScript",
    shape: "pill",
    color: "glass",
    variant: "outlined",
    top: "72%",
    right: "0.8%",
    rotate: -2,
    driftDuration: 12,
    driftAmplitude: [9, 21],
    delay: 0.8,
  },

  // Accents flottants — plus petits, vers le centre mais dans les marges
  {
    text: "k8s",
    shape: "circle",
    color: "yellow",
    variant: "filled",
    top: "18%",
    right: "8%",
    rotate: 0,
    driftDuration: 10,
    driftAmplitude: [14, 18],
    delay: 1.2,
    fontSize: "0.65rem",
  },
  {
    text: "Docker",
    shape: "pill",
    color: "glass",
    variant: "outlined",
    top: "35%",
    left: "8%",
    rotate: 6,
    driftDuration: 24,
    driftAmplitude: [10, 16],
    delay: 0.15,
    fontSize: "0.65rem",
  },
];

function Shape({ def }: { def: ShapeDef }) {
  const { scrollYProgress } = useScroll();
  // Fade out après le premier viewport
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const palette = PALETTE[def.color][def.variant];
  const radius = SHAPE_RADIUS[def.shape];
  const isCircle = def.shape === "circle";

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: def.top,
        ...(def.left !== undefined ? { left: def.left } : { right: def.right }),
        zIndex: 200,
        pointerEvents: "none",
        opacity,
        rotate: def.rotate ?? 0,
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: def.delay,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
      }}
    >
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(isCircle ? { width: "2.8rem", height: "2.8rem" } : {}),
          padding: isCircle ? 0 : "0.35rem 0.85rem",
          borderRadius: radius,
          background: palette.bg,
          border: `1px solid ${palette.border}`,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          whiteSpace: "nowrap",
        }}
        animate={{
          x: [0, def.driftAmplitude[0], -def.driftAmplitude[0] * 0.7, 0],
          y: [0, -def.driftAmplitude[1] * 0.6, def.driftAmplitude[1], 0],
        }}
        transition={{
          x: {
            duration: def.driftDuration * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: def.delay,
          },
          y: {
            duration: def.driftDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: def.delay + 0.3,
          },
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: def.fontSize ?? "0.7rem",
            letterSpacing: "0.06em",
            color: palette.text,
            textTransform: "uppercase",
          }}
        >
          {def.text}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function FloatingShapes() {
  return (
    <MotionConfig reducedMotion="user">
      {SHAPES.map((def, i) => (
        <Shape key={i} def={def} />
      ))}
    </MotionConfig>
  );
}
