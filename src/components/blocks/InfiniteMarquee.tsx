"use client";

import { useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";

const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "Terraform",
  "CI/CD",
  "LLM",
  "RAG",
  "Agents IA",
  "OpenAI",
];

/**
 * Track — une piste de marquee.
 * CSS animation (pas Framer Motion) pour que `animation-play-state: paused`
 * fonctionne au hover — les animations Framer Motion JS ne supportent pas cette pause.
 */
function Track({
  items,
  direction,
  duration,
}: {
  items: string[];
  direction: "ltr" | "rtl";
  duration: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `${direction === "ltr" ? "marquee-ltr" : "marquee-rtl"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "running";
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-5 px-6 py-3 rounded-full border border-white/8 bg-white/3 whitespace-nowrap select-none cursor-default transition-colors duration-200 hover:border-white/20 hover:bg-white/6"
          >
            <span
              className="size-1.5 rounded-full bg-brand-orange shrink-0"
              aria-hidden="true"
            />
            <span
              className="font-body font-medium text-text-light/70"
              style={{ fontSize: "var(--text-nav)" }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfiniteMarquee() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        className="relative overflow-hidden bg-nav-bg py-14"
        aria-label="Technologies maîtrisées"
      >
        {/* Label section */}
        <motion.p
          className="font-body text-text-light/30 uppercase tracking-widest text-center mb-8"
          style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Technologies &amp; Expertises
        </motion.p>

        {/* Fondu sur les bords */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-nav-bg), transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--color-nav-bg), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Double track — gauche + droite inverse */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Track items={ITEMS} direction="ltr" duration={35} />
          <Track items={[...ITEMS].reverse()} direction="rtl" duration={28} />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
