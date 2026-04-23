"use client";

import { useRef } from "react";
import { useScroll, MotionConfig } from "framer-motion";
import { QuoteBlockCard } from "./QuoteBlock";
import { ReferenceBento, type ReferenceBentoProps } from "./ReferenceBento";

export interface QuoteBentoSectionProps extends ReferenceBentoProps {
  quote: string;
  attribution?: string;
}

/**
 * Section combinée sticky :
 *   - QuoteBlock + ReferenceBento apparaissent ensemble à l'écran
 *   - Le scroll pilote la révélation mot par mot du QuoteBlock
 *   - La section se libère une fois le texte entièrement révélé
 *
 * Hauteur outer = 100vh (section visible) + espace de scroll proportionnel aux mots
 */
export function QuoteBentoSection({
  quote,
  attribution,
  ...bentoProps
}: QuoteBentoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll space : ~40px par mot (lisible sans être trop lent)
  const wordCount = quote.split(" ").length;
  const scrollPx = Math.max(700, wordCount * 42);

  return (
    <MotionConfig reducedMotion="user">
      {/* Outer container : crée l'espace de scroll */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `calc(100vh + ${scrollPx}px)` }}
      >
        {/* Sticky inner : reste visible pendant tout le scroll de l'outer */}
        <div
          className="sticky top-0 h-screen flex flex-col gap-6 overflow-hidden"
          style={{
            paddingTop: "5rem",
            paddingBottom: "2.5rem",
          }}
        >
          {/* QuoteBlockCard — progress piloté par ce conteneur sticky */}
          <QuoteBlockCard
            quote={quote}
            attribution={attribution}
            progress={scrollYProgress}
          />

          {/* ReferenceBento collé juste en dessous */}
          <div className="flex-1 min-h-0">
            <ReferenceBento {...bentoProps} />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
