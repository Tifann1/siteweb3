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

// Duplication pour le loop sans pause visible
const DOUBLED = [...ITEMS, ...ITEMS];

interface InfiniteMarqueeProps {
  /** Durée d'un cycle complet en secondes (défaut 35) */
  duration?: number;
  /** Inversion du sens (défaut false) */
  reverse?: boolean;
}

export function InfiniteMarquee({
  duration = 35,
  reverse = false,
}: InfiniteMarqueeProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        className="relative overflow-hidden bg-nav-bg py-16"
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
          className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-nav-bg), transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--color-nav-bg), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Piste animée */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }}
          // Pause au hover
          whileHover={{ animationPlayState: "paused" }}
        >
          {DOUBLED.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 px-6 py-3 rounded-full border border-white/8 bg-white/3 whitespace-nowrap select-none"
            >
              {/* Dot orange */}
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
        </motion.div>
      </section>
    </MotionConfig>
  );
}
