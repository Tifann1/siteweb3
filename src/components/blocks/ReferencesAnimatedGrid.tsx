"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ReferenceCard, type ReferenceCardProps } from "@/components/ui/ReferenceCard";

interface ReferencesAnimatedGridProps {
  cards: ReferenceCardProps[];
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ReferencesAnimatedGrid({ cards }: ReferencesAnimatedGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
    >
      {cards.map((card, i) => (
        <div key={i} style={{ perspective: "1200px" }}>
          <motion.div
            style={{ transformStyle: "preserve-3d", position: "relative" }}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isInView ? 0 : 180 }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.12 }}
          >
            {/* Face avant — contenu réel */}
            <div style={{ backfaceVisibility: "hidden" }}>
              <ReferenceCard {...card} />
            </div>
            {/* Face arrière — fond sombre neutre */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[var(--radius-input)]"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "rgba(28,31,47,0.98)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
