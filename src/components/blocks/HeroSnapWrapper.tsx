"use client";

import { useEffect, useRef } from "react";

export function HeroSnapWrapper({ children }: { children: React.ReactNode }) {
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 10 || isScrolling.current || e.deltaY <= 0) return;

      e.preventDefault();
      isScrolling.current = true;

      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return <>{children}</>;
}
