"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";

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

/**
 * Architecture sticky-scroll :
 *   - containerRef (200vh) fournit l'espace de scroll
 *   - L'inner div (sticky top-0 h-screen) reste fixe à l'écran
 *   - scrollYProgress [0→1] pilote le dévoilement mot par mot
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

  const words = quote.split(" ");

  return (
    <MotionConfig reducedMotion="user">
      {/* Outer container : 200vh → 100vh de scroll disponibles pendant que l'inner est sticky */}
      <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
        {/* Inner sticky : reste fixé pendant tout le scroll de l'outer container */}
        <div className="sticky top-0 h-screen flex items-center">
          <div
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
        </div>
      </div>
    </MotionConfig>
  );
}
