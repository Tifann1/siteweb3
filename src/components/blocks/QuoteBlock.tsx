"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionConfig,
  type MotionValue,
} from "framer-motion";

export interface QuoteBlockProps {
  quote: string;
  attribution?: string;
}

function AnimatedWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/**
 * Carte seule — utilisée dans QuoteBentoSection où le scroll progress
 * vient d'un conteneur parent. Pas de sticky wrapper.
 */
export function QuoteBlockCard({
  quote,
  attribution,
  progress,
}: {
  quote: string;
  attribution?: string;
  progress: MotionValue<number>;
}) {
  const words = quote.split(" ");
  return (
    <div
      className="flex flex-col gap-5 items-start w-full px-8 py-7 rounded-[var(--radius-input)] bg-card-bg border border-white/5 backdrop-blur-[10px]"
      style={{
        boxShadow:
          "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
      }}
    >
      <p
        className="font-sans font-bold text-text-heading"
        style={{ fontSize: "28px", lineHeight: "36px" }}
      >
        &ldquo;
        {words.map((word, i) => (
          <AnimatedWord
            key={i}
            word={word}
            progress={progress}
            start={i / words.length}
            end={(i + 1) / words.length}
          />
        ))}
        &rdquo;
      </p>
      {attribution && (
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-brand-orange-light shrink-0" />
          <span
            className="font-body font-normal text-meta-secondary uppercase tracking-[var(--text-sector-badge--letter-spacing)]"
            style={{ fontSize: "13px" }}
          >
            {attribution}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Version autonome avec sticky scroll self-contained.
 * Utilisée sur /references/[slug] et partout où QuoteBlock est seul.
 */
export function QuoteBlock({
  quote,
  attribution = "Strategic Vision 2025",
}: QuoteBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <MotionConfig reducedMotion="user">
      <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center">
          <QuoteBlockCard
            quote={quote}
            attribution={attribution}
            progress={scrollYProgress}
          />
        </div>
      </div>
    </MotionConfig>
  );
}
