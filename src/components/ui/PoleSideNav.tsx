"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SideNavSection {
  id: string;
  label: string;
}

interface PoleSideNavProps {
  sections: SideNavSection[];
  accentColor?: string;
}

export function PoleSideNav({ sections, accentColor = "var(--color-offer-yellow)" }: PoleSideNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Apparaît après le hero
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // IntersectionObserver pour chaque section
    const latestVisible: Record<string, number> = {};

    const update = () => {
      const sorted = Object.entries(latestVisible).sort((a, b) => b[1] - a[1]);
      if (sorted.length > 0) setActiveId(sorted[0][0]);
    };

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            latestVisible[id] = entry.intersectionRatio;
          } else {
            delete latestVisible[id];
          }
          update();
        },
        { threshold: [0, 0.1, 0.3, 0.5], rootMargin: "-15% 0px -55% 0px" }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observersRef.current.forEach((o) => o.disconnect());
      observersRef.current = [];
    };
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5"
          aria-label="Navigation des sections"
        >
          {sections.map(({ id, label }) => {
            const isActive = activeId === id;
            const isHovered = hoveredId === id;

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex items-center gap-3 group"
                aria-label={label}
              >
                {/* Dot */}
                <span
                  className="shrink-0 rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? "8px" : "5px",
                    height: isActive ? "8px" : "5px",
                    backgroundColor: isActive ? accentColor : "rgba(255,255,255,0.25)",
                    boxShadow: isActive ? `0 0 8px ${accentColor}80` : "none",
                  }}
                />

                {/* Label */}
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : isHovered ? 0.85 : 0.35,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="font-body text-xs whitespace-nowrap pointer-events-none"
                  style={{
                    color: isActive ? accentColor : isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                    fontWeight: isActive ? 600 : isHovered ? 500 : 400,
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </motion.span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
