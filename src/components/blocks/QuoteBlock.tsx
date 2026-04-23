"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
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

export function QuoteBlock({
  quote,
  attribution = "Strategic Vision 2025",
}: QuoteBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Démarre quand le composant est bien visible, se termine après ~2 scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.1"],
  });

  const words = quote.split(" ");

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 items-start w-full p-[41px] rounded-[var(--radius-input)] bg-card-bg border border-white/5 backdrop-blur-[10px]"
      style={{
        boxShadow:
          "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
      }}
    >
      <p
        className="font-sans font-bold text-text-heading"
        style={{ fontSize: "32px", lineHeight: "40px" }}
      >
        &ldquo;
        {words.map((word, i) => (
          <AnimatedWord
            key={i}
            word={word}
            progress={scrollYProgress}
            start={i / words.length}
            end={(i + 1) / words.length}
          />
        ))}
        &rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div className="h-px w-12 bg-brand-orange-light shrink-0" />
        {attribution && (
          <span
            className="font-body font-normal text-meta-secondary uppercase tracking-[var(--text-sector-badge--letter-spacing)]"
            style={{ fontSize: "13px" }}
          >
            {attribution}
          </span>
        )}
      </div>
    </div>
  );
}
