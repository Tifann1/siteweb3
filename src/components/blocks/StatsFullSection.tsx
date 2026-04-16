"use client";

import { useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Années d'expertise" },
  { value: 200, suffix: "+", label: "Projets livrés" },
  { value: 4, suffix: "", label: "Pôles d'expertise" },
  { value: 98, suffix: "%", label: "Satisfaction client" },
];

function StatItem({ stat, isActive }: { stat: Stat; isActive: boolean }) {
  const count = useAnimatedCounter(stat.value, 1400, isActive);

  return (
    <div className="flex flex-col gap-2 items-start">
      <span
        className="font-sans font-bold text-text-heading tabular-nums"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}
      >
        {count}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
          }}
        >
          {stat.suffix}
        </span>
      </span>
      <span
        className="font-body text-text-light/60 uppercase tracking-widest"
        style={{ fontSize: "var(--text-badge)", letterSpacing: "0.1em" }}
      >
        {stat.label}
      </span>
    </div>
  );
}

/**
 * T08 — Oversized background numbers
 * Les chiffres clés sont répétés en très grand derrière les stat items,
 * transparents avec un stroke blanc subtil. Effet graphique sans distraction.
 */
export function StatsFullSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        className="relative overflow-hidden bg-deep-navy border-y border-white/5"
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
        aria-label="Chiffres clés"
      >
        {/* T08 — Chiffres fantômes en arrière-plan */}
        <div
          className="pointer-events-none select-none absolute inset-0 flex items-center overflow-hidden"
          style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
          aria-hidden="true"
        >
          <div className="flex w-full justify-between">
            {STATS.map((stat) => (
              <span
                key={stat.label}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(5rem, 14vw, 16rem)",
                  lineHeight: 1,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {stat.value}
                {stat.suffix}
              </span>
            ))}
          </div>
        </div>

        {/* Stat items — au premier plan */}
        <div className="relative z-10 flex flex-wrap gap-12 md:gap-0 md:justify-between items-start">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.12,
              }}
            >
              <StatItem stat={stat} isActive={isInView} />
            </motion.div>
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
