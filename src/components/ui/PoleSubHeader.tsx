"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import type { SideNavSection } from "./PoleSideNav";

interface PoleSubHeaderProps {
  poleLabel: string;
  sections: SideNavSection[];
  accentColor?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function PoleSubHeader({
  poleLabel,
  sections,
  accentColor = "var(--color-offer-yellow)",
  ctaLabel = "Contacter un expert",
  ctaHref = "/contact",
}: PoleSubHeaderProps) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observers: IntersectionObserver[] = [];
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
          if (entry.isIntersecting) latestVisible[id] = entry.intersectionRatio;
          else delete latestVisible[id];
          update();
        },
        { threshold: [0, 0.1], rootMargin: "-15% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-0 right-0 z-40 hidden md:block"
          style={{ top: "var(--header-height)" }}
        >
          <div
            className="w-full border-b"
            style={{
              backgroundColor: "rgba(10,12,28,0.85)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="mx-auto flex items-center justify-between gap-6 px-6 md:px-10 lg:px-16"
              style={{ maxWidth: "1200px", height: "44px" }}
            >
              {/* Pole label */}
              <span
                className="font-body font-semibold text-xs uppercase tracking-widest shrink-0 whitespace-nowrap"
                style={{ color: accentColor, letterSpacing: "0.1em" }}
              >
                {poleLabel}
              </span>

              {/* Section links */}
              <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center overflow-hidden">
                {sections.map(({ id, label }) => {
                  const isActive = activeId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="relative px-3 py-1 rounded text-xs font-body whitespace-nowrap transition-colors"
                      style={{
                        color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pole-subheader-active"
                          className="absolute inset-0 rounded"
                          style={{ backgroundColor: `${accentColor}18` }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* CTA */}
              <Link
                href={ctaHref}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded text-xs font-body font-semibold whitespace-nowrap transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: `${accentColor}22`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {ctaLabel}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
