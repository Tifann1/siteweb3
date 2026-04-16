"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * ReactiveCursor — cursor dot orange qui suit la souris avec spring.
 * Se dilate (scale 5) sur les éléments data-cursor-reactive.
 * Masqué sur mobile (pointeur non applicable).
 */
export function ReactiveCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const springX = useSpring(x, { damping: 28, stiffness: 350 });
  const springY = useSpring(y, { damping: 28, stiffness: 350 });
  const springScale = useSpring(scale, { damping: 22, stiffness: 250 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-reactive]")) {
        scale.set(5);
      } else {
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, scale]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        translateX: "-50%",
        translateY: "-50%",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "var(--color-brand-orange)",
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}
