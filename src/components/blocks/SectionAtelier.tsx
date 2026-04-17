"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  MotionConfig,
  type MotionValue,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const POLES = [
  {
    id: "conseil",
    label: "Conseil",
    sub: "Architecture & Stratégie",
    color: "#FF7E33",
    x: 22,
    y: 28,
    size: 88,
    depth: 1,
  },
  {
    id: "dev",
    label: "Développement",
    sub: "Full-stack & Mobile",
    color: "#7474FF",
    x: 62,
    y: 18,
    size: 96,
    depth: 2,
  },
  {
    id: "ia",
    label: "IA & Data",
    sub: "LLM, RAG, Agents",
    color: "#46BA87",
    x: 72,
    y: 68,
    size: 80,
    depth: 1,
  },
  {
    id: "devops",
    label: "DevOps",
    sub: "Cloud & Infra",
    color: "#E6B002",
    x: 30,
    y: 74,
    size: 84,
    depth: 2,
  },
] as const;

// SVG connection lines between pole centers (% coords on 100×100 viewBox)
const CONNECTIONS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 0 },
  { from: 0, to: 2 },
];

// Hexagon clip-path
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// Floating particles per connection
const PARTICLES = CONNECTIONS.map((c, i) => ({
  connection: i,
  delay: i * 0.4,
}));

function HexNode({
  pole,
  index,
  isInView,
  layerX,
  layerY,
}: {
  pole: (typeof POLES)[number];
  index: number;
  isInView: boolean;
  layerX: MotionValue<number>;
  layerY: MotionValue<number>;
}) {
  const s = pole.size;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${pole.x}%`,
        top: `${pole.y}%`,
        x: layerX,
        y: layerY,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: pole.depth,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        ease: EASE,
        delay: 0.3 + index * 0.12,
      }}
    >
      {/* Outer glow ring — dashed, rotating */}
      <motion.div
        style={{
          position: "absolute",
          inset: -18,
          clipPath: HEX,
          border: `1.5px dashed ${pole.color}40`,
          borderRadius: 0,
        }}
        animate={isInView ? { rotate: 360 } : {}}
        transition={{ duration: 18 + index * 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner hex node */}
      <motion.div
        style={{
          width: s,
          height: s,
          clipPath: HEX,
          background: `radial-gradient(circle at 40% 35%, ${pole.color}26 0%, ${pole.color}0A 60%, transparent 100%)`,
          border: `1.5px solid ${pole.color}50`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "default",
        }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      >
        {/* Accent dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: pole.color,
            boxShadow: `0 0 14px 4px ${pole.color}60`,
            marginBottom: 8,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: pole.color,
            textAlign: "center",
            lineHeight: 1.3,
            padding: "0 10px",
          }}
        >
          {pole.label}
        </span>
      </motion.div>

      {/* Label below */}
      <motion.div
        style={{
          position: "absolute",
          top: "110%",
          left: "50%",
          translateX: "-50%",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: 6 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.55 + index * 0.12 }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.06em",
          }}
        >
          {pole.sub}
        </span>
      </motion.div>
    </motion.div>
  );
}

function ConnectionLines({
  isInView,
  layerX,
  layerY,
}: {
  isInView: boolean;
  layerX: MotionValue<number>;
  layerY: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        x: layerX,
        y: layerY,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        aria-hidden="true"
      >
        {CONNECTIONS.map((c, i) => {
          const from = POLES[c.from];
          const to = POLES[c.to];
          const color = i % 2 === 0 ? POLES[c.from].color : POLES[c.to].color;
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={color}
              strokeWidth={0.25}
              strokeOpacity={0.3}
              strokeDasharray="1.2 1.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{
                duration: 1.2,
                ease: EASE,
                delay: 0.5 + i * 0.1,
                opacity: { duration: 0.4 },
              }}
            />
          );
        })}

        {/* Traveling particles along each connection */}
        {PARTICLES.map((p, i) => {
          const from = POLES[CONNECTIONS[p.connection].from];
          const to = POLES[CONNECTIONS[p.connection].to];
          const pColor = POLES[CONNECTIONS[p.connection].from].color;
          return (
            <motion.circle
              key={`p-${i}`}
              r={0.6}
              fill={pColor}
              opacity={0.7}
              initial={{ cx: from.x, cy: from.y }}
              animate={
                isInView
                  ? {
                      cx: [from.x, to.x, from.x],
                      cy: [from.y, to.y, from.y],
                    }
                  : {}
              }
              transition={{
                duration: 3.5 + i * 0.7,
                ease: "linear",
                repeat: Infinity,
                delay: 1 + p.delay,
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

/**
 * SectionAtelier — visualisation interactive des 4 pôles.
 *
 * Technique principale : T06 étendu — le curseur pilote 3 couches de parallax
 * et une perspective 3D (rotateX/Y) sur l'ensemble.
 *
 * Couches :
 *   L0 — background : grid blueprint SVG + halos statiques (parallax ×0.3)
 *   L1 — connexions : lignes SVG animées + particules (parallax ×0.5)
 *   L2 — noeuds hex : 4 pôles + labels (parallax ×0.8)
 *
 * Tilt 3D : perspective 1200px, rotateX ±8°, rotateY ±8°
 * Smooth : useSpring { damping: 26, stiffness: 110, mass: 1.0 }
 */
export function SectionAtelier() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Raw normalized mouse position [-0.5, 0.5]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smoothed
  const springCfg = { damping: 26, stiffness: 110, mass: 1.0 };
  const smoothX = useSpring(rawX, springCfg);
  const smoothY = useSpring(rawY, springCfg);

  // 3D tilt on outer container
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // Parallax layers (px offset)
  const bg0X = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const bg0Y = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const mid1X = useTransform(smoothX, [-0.5, 0.5], [-26, 26]);
  const mid1Y = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const fg2X = useTransform(smoothX, [-0.5, 0.5], [-42, 42]);
  const fg2Y = useTransform(smoothY, [-0.5, 0.5], [-32, 32]);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current!.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        aria-label="L'atelier — nos quatre pôles"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "var(--color-nav-bg)",
          paddingTop: "7rem",
          paddingBottom: "7rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "var(--text-badge)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
            }}
          >
            L&apos;atelier
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-heading)",
              margin: 0,
            }}
          >
            Quatre pôles.{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Un seul engagement.
            </span>
          </motion.h2>
        </div>

        {/* 3D stage */}
        <motion.div
          style={{
            perspective: 1200,
            perspectiveOrigin: "50% 50%",
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              position: "relative",
              height: "520px",
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {/* L0 — Blueprint grid + ambient halos */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                x: bg0X,
                y: bg0Y,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              {/* Blueprint dot grid */}
              <div
                style={{
                  position: "absolute",
                  inset: "-10%",
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
                }}
              />

              {/* Ambient halos */}
              <div
                style={{
                  position: "absolute",
                  width: 420,
                  height: 420,
                  top: "5%",
                  left: "10%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(116,116,255,0.07) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 320,
                  height: 320,
                  bottom: "5%",
                  right: "10%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(70,186,135,0.07) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
              />
            </motion.div>

            {/* L1 — Connection lines + particles */}
            <ConnectionLines
              isInView={isInView}
              layerX={mid1X}
              layerY={mid1Y}
            />

            {/* L2 — Hex nodes */}
            {POLES.map((pole, i) => {
              const lX = pole.depth === 2 ? fg2X : mid1X;
              const lY = pole.depth === 2 ? fg2Y : mid1Y;
              return (
                <HexNode
                  key={pole.id}
                  pole={pole}
                  index={i}
                  isInView={isInView}
                  layerX={lX}
                  layerY={lY}
                />
              );
            })}
          </motion.div>
        </motion.div>

        {/* Pole legend strip */}
        <motion.div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "3rem",
            position: "relative",
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
        >
          {POLES.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                borderRadius: "9999px",
                border: `1px solid ${p.color}30`,
                background: `${p.color}0A`,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: p.color,
                  boxShadow: `0 0 8px 2px ${p.color}50`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-badge)",
                  fontWeight: 600,
                  color: p.color,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {p.label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
