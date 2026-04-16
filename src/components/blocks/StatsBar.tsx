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
  { value: 15, suffix: "+", label: "Années d'expertise" },
  { value: 200, suffix: "+", label: "Projets livrés" },
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

export function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        className="relative bg-deep-navy border-y border-white/5"
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
      >
        <div className="flex flex-wrap gap-12 md:gap-0 md:justify-between items-start">
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
