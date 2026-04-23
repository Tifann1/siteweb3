"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { StatTile } from "@/components/ui/StatTile";
import type { Produit, Locale } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const TRANSITION = { duration: 0.78, ease: EASE };

export interface ProductCarouselProps {
  produits: Produit[];
  locale: Locale;
}

export function ProductCarousel({ produits, locale }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      const next = activeIndex + dir;
      if (next < 0) return;
      if (next >= produits.length) {
        if (dir === 1) {
          lockRef.current = true;
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          setTimeout(() => { lockRef.current = false; }, 1200);
        }
        return;
      }
      lockRef.current = true;
      setActiveIndex(next);
      setTimeout(() => {
        lockRef.current = false;
      }, 950);
    },
    [activeIndex, produits.length],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = activeIndex + dir;
      if (next < 0) return;
      e.preventDefault();
      navigate(dir);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeIndex, navigate, produits.length]);

  const touchStart = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      navigate(delta > 0 ? 1 : -1);
    },
    [navigate],
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden bg-nav-bg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {produits.map((produit, index) => {
        const isActive = index === activeIndex;
        const isNext = index === activeIndex + 1;
        const isPrev = index < activeIndex;

        let y = "120%";
        if (isActive) y = "0%";
        else if (isNext) y = "calc(100% - 96px)";
        else if (isPrev) y = "-100%";

        return (
          <motion.div
            key={produit.slug}
            className="absolute inset-0"
            animate={{
              y,
              opacity: isPrev ? 0 : isNext ? 0.45 : 1,
            }}
            transition={TRANSITION}
            style={{ willChange: "transform" }}
          >
            <ProductSlide
              produit={produit}
              locale={locale}
              isActive={isActive}
            />
          </motion.div>
        );
      })}

      {/* Navigation dots verticaux */}
      <nav
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
        aria-label="Navigation produits"
      >
        {produits.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => {
              if (!lockRef.current) setActiveIndex(i);
            }}
            aria-label={`Produit ${i + 1}`}
            className="flex items-center justify-center w-6 h-6"
          >
            <span
              className="block rounded-full bg-brand-orange-light transition-all duration-500"
              style={{
                width: "4px",
                height: i === activeIndex ? "28px" : "4px",
                opacity: i === activeIndex ? 1 : 0.3,
              }}
            />
          </button>
        ))}
      </nav>

      {/* Compteur */}
      <div className="absolute bottom-10 left-16 z-20 flex items-baseline gap-1.5 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="font-body font-bold text-white"
            style={{ fontSize: "2.25rem", lineHeight: 1 }}
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span
          className="font-body text-white/30"
          style={{ fontSize: "1.125rem" }}
        >
          / {String(produits.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {activeIndex < produits.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => navigate(1)}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors"
            aria-label="Produit suivant"
          >
            <span
              className="font-sans uppercase tracking-[2px]"
              style={{ fontSize: "10px" }}
            >
              scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ChevronDownIcon />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ProductSlide ─────────────────────────────────────────────────────────────

interface ProductSlideProps {
  produit: Produit;
  locale: Locale;
  isActive: boolean;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function ProductSlide({ produit, locale, isActive }: ProductSlideProps) {
  const features = produit.features.map((f) => ({
    title: f.title[locale],
    description: f.description?.[locale],
  }));

  return (
    <div className="relative w-full h-full">
      {/* Background image + dégradé */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={produit.backgroundImage}
          alt=""
          fill
          className="object-cover object-right"
          priority={isActive}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--color-nav-bg) 0%, rgba(9,15,66,0.97) 22%, rgba(9,15,66,0.85) 48%, rgba(9,15,66,0.15) 100%)",
          }}
        />
      </div>

      {/* Trait supérieur — repère visuel quand carte "next" */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/12" />

      {/* Layout */}
      <div className="relative h-full flex items-center">
        {/* Colonne gauche — carte produit */}
        <motion.div
          animate={{ x: isActive ? -24 : 0 }}
          transition={TRANSITION}
          className="pl-16 md:pl-24 flex flex-col flex-shrink-0"
          style={{ width: "52%" }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="flex flex-col items-start"
          >
            {/* Badge */}
            {produit.badge && (
              <motion.div variants={staggerItem} className="mb-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nav-bg border border-white/10">
                  <span
                    className="size-1.5 rounded-full bg-badge-blue shrink-0"
                    style={{ boxShadow: "var(--shadow-badge-dot)" }}
                  />
                  <span
                    className="font-body font-semibold text-badge-blue tracking-[1.6px]"
                    style={{ fontSize: "var(--text-badge)" }}
                  >
                    {produit.badge[locale]}
                  </span>
                </span>
              </motion.div>
            )}

            {/* Titre produit */}
            <motion.h2
              variants={staggerItem}
              className="font-sans font-bold text-white"
              style={{
                fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              {produit.name[locale]}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="font-sans text-text-body-warm mt-5"
              style={{
                fontSize: "var(--text-nav)",
                lineHeight: "var(--text-nav--line-height)",
                maxWidth: "400px",
              }}
            >
              {produit.description[locale]}
            </motion.p>

            {/* Stats */}
            <motion.div variants={staggerItem} className="flex gap-3 mt-9">
              {produit.stats.map((stat) => (
                <StatTile
                  key={stat.label[locale]}
                  value={stat.value}
                  label={stat.label[locale]}
                />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={staggerItem} className="mt-8">
              <Link
                href={`/produits/${produit.slug}`}
                className="inline-flex items-center gap-2.5 group transition-opacity hover:opacity-75"
              >
                <span
                  className="font-sans text-brand-orange-light uppercase tracking-[1.5px]"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  Lancer l&apos;agent
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowIcon />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Colonne droite — accordéon technique */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: 0, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 30, y: "-50%" }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              style={{
                position: "absolute",
                right: "6%",
                top: "50%",
                width: "32%",
                maxWidth: "440px",
              }}
            >
              {/* Étiquette section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="w-5 h-px bg-brand-orange-light/70" />
                <p
                  className="font-sans font-semibold uppercase text-white/35"
                  style={{ fontSize: "10px", letterSpacing: "0.22em" }}
                >
                  Fonctionnalités
                </p>
              </motion.div>

              <AnimatedAccordion features={features} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── AnimatedAccordion ────────────────────────────────────────────────────────

interface AccordionFeature {
  title: string;
  description?: string;
}

function AnimatedAccordion({ features }: { features: AccordionFeature[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="flex flex-col w-full">
      {features.map((f, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={f.title}>
            <button
              onClick={() =>
                setOpenIndex((prev) => (prev === idx ? -1 : idx))
              }
              aria-expanded={isOpen}
              className="flex items-center justify-between w-full py-4 text-left group"
            >
              <span
                className="font-sans transition-colors duration-200"
                style={{
                  fontSize: "var(--text-tab)",
                  lineHeight: "normal",
                  color: isOpen ? "white" : "rgba(255,255,255,0.5)",
                }}
              >
                {f.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 ml-3"
                style={{
                  color: isOpen
                    ? "var(--color-brand-orange-light)"
                    : "rgba(255,255,255,0.25)",
                }}
              >
                <ChevronSmallIcon />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && f.description && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    className="text-white/55 pb-4 pr-6"
                    style={{
                      fontSize: "var(--text-nav)",
                      lineHeight: "var(--text-nav--line-height)",
                    }}
                  >
                    {f.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {idx < features.length - 1 && (
              <div className="w-full h-px bg-white/10" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Icônes ───────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M10 5l3 3-3 3"
        stroke="#FFB692"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 8l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
