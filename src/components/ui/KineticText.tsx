"use client";

import { motion, MotionConfig } from "framer-motion";

interface KineticTextProps {
  text: string;
  className?: string;
  /** Délai entre chaque caractère en secondes (défaut 0.03) */
  delayPerChar?: number;
  /** Délai initial avant le premier caractère en secondes (défaut 0.2) */
  initialDelay?: number;
  /** Easing bezier — spring agressive par défaut */
  ease?: [number, number, number, number];
}

export function KineticText({
  text,
  className,
  delayPerChar = 0.03,
  initialDelay = 0.2,
  ease = [0.16, 1, 0.3, 1],
}: KineticTextProps) {
  const chars = text.split("");

  return (
    <MotionConfig reducedMotion="user">
      <span className={className} aria-label={text}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              ease,
              delay: initialDelay + i * delayPerChar,
            }}
            className="inline-block"
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </MotionConfig>
  );
}
