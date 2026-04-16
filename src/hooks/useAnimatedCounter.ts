"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anime un compteur de 0 → target quand isActive passe à true.
 * Easing : ease-out cubique pour une sensation de précision.
 */
export function useAnimatedCounter(
  target: number,
  duration = 1400,
  isActive = true
) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, isActive]);

  return value;
}
