"use client";

import { motion } from "framer-motion";

interface HeroScrollIndicatorProps {
  delay?: number;
}

export function HeroScrollIndicator({ delay = 1.2 }: HeroScrollIndicatorProps) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      aria-hidden="true"
    >
      <span className="font-body text-text-light/40 text-xs tracking-widest uppercase">
        Scroll
      </span>
      <motion.div
        className="w-px h-10 bg-gradient-to-b from-text-light/30 to-transparent"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
