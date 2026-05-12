"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link, useRouter } from "@/navigation";
import { StatTile } from "@/components/ui/StatTile";
import type { Agent, Produit, Locale } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const TRANSITION = { duration: 0.78, ease: EASE };

export interface AgentCarouselProps {
  agents: Agent[];
  produits: Produit[];
  locale: Locale;
  initialIndex?: number;
}

export function AgentCarousel({ agents, produits, locale, initialIndex = 0 }: AgentCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(Math.max(0, Math.min(initialIndex, agents.length - 1)));
  const lockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      const next = activeIndex + dir;
      if (next < 0) return;
      if (next >= agents.length) {
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
    [activeIndex, agents.length],
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
  }, [activeIndex, navigate, agents.length]);

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
      {agents.map((agent, index) => {
        const isActive = index === activeIndex;
        const isNext = index === activeIndex + 1;
        const isPrev = index < activeIndex;
        const associatedProduit = produits.find((p) => p.slug === agent.produitSlug);

        let y = "120%";
        if (isActive) y = "0%";
        else if (isNext) y = "calc(100% - 96px)";
        else if (isPrev) y = "-100%";

        return (
          <motion.div
            key={agent.slug}
            className="absolute inset-0"
            animate={{
              y,
              opacity: isPrev ? 0 : isNext ? 0.45 : 1,
            }}
            transition={TRANSITION}
            style={{ willChange: "transform" }}
          >
            <AgentSlide
              agent={agent}
              locale={locale}
              isActive={isActive}
              associatedProduit={associatedProduit}
            />
          </motion.div>
        );
      })}

      {/* Navigation dots verticaux */}
      <nav
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
        aria-label="Navigation agents"
      >
        {agents.map((a, i) => (
          <button
            key={a.slug}
            onClick={() => {
              if (!lockRef.current) setActiveIndex(i);
            }}
            aria-label={`Agent ${i + 1}`}
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
          / {String(agents.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {activeIndex < agents.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => navigate(1)}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors"
            aria-label="Agent suivant"
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

      {/* CTA agent actif — z-30 pour passer au-dessus du scroll hint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={agents[activeIndex]?.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute bottom-10 right-20 z-30"
        >
          <Link
            href={`/produits/${agents[activeIndex]?.produitSlug}`}
            className="flex items-center gap-2.5 px-5 bg-gradient-to-b from-[var(--color-brand-orange-cta-from)] to-[var(--color-brand-orange-cta-to)] rounded-[var(--radius-cta)] shadow-[var(--shadow-cta)] text-white font-sans whitespace-nowrap"
            style={{ height: "40px", fontSize: "var(--text-nav)" }}
          >
            Lancer l&apos;agent
            <ArrowIcon />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── AgentSlide ───────────────────────────────────────────────────────────────

interface AgentSlideProps {
  agent: Agent;
  locale: Locale;
  isActive: boolean;
  associatedProduit?: Produit;
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

function AgentSlide({ agent, locale, isActive, associatedProduit }: AgentSlideProps) {
  const features = agent.features.map((f) => ({
    title: f.title[locale],
    description: f.description?.[locale],
  }));

  return (
    <div className="relative w-full h-full">
      {/* Background image + dégradé */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={agent.backgroundImage}
          alt=""
          fill
          className="object-cover object-right"
          priority={isActive}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--color-nav-bg) 0%, rgba(9,15,66,0.97) 22%, rgba(9,15,66,0.85) 48%, rgba(9,15,66,0.55) 100%)",
          }}
        />
      </div>

      {/* Trait supérieur */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/12" />

      {/* Layout */}
      <div className="relative h-full flex items-center">
        {/* Colonne gauche */}
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
            {agent.badge && (
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
                    {agent.badge[locale]}
                  </span>
                </span>
              </motion.div>
            )}

            {/* Titre agent */}
            <motion.h2
              variants={staggerItem}
              className="font-sans font-bold text-white"
              style={{
                fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              {agent.name[locale]}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="font-sans text-white mt-5"
              style={{
                fontSize: "var(--text-nav)",
                lineHeight: "var(--text-nav--line-height)",
                maxWidth: "400px",
              }}
            >
              {agent.description[locale]}
            </motion.p>

            {/* Stats */}
            <motion.div variants={staggerItem} className="flex gap-3 mt-9">
              {agent.stats.map((stat) => (
                <StatTile
                  key={stat.label[locale]}
                  value={stat.value}
                  label={stat.label[locale]}
                />
              ))}
            </motion.div>

            {/* Produit associé — rectangle d'aperçu */}
            {associatedProduit && (
              <motion.div variants={staggerItem} className="mt-6">
                <ProduitPreviewCard
                  produit={associatedProduit}
                  locale={locale}
                  agentSlug={agent.slug}
                />
              </motion.div>
            )}
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
                  Capacités
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

// ─── ProduitPreviewCard ───────────────────────────────────────────────────────

interface ProduitPreviewCardProps {
  produit: Produit;
  locale: Locale;
  agentSlug: string;
}

function ProduitPreviewCard({ produit, locale, agentSlug }: ProduitPreviewCardProps) {
  const router = useRouter();
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      router.push(`/produits?from=${agentSlug}`);
    }, 300);
  };

  return (
    <div style={{ perspective: "800px", maxWidth: "320px" }}>
      <motion.button
        onClick={handleClick}
        animate={{
          rotateY: isFlipping ? -90 : 0,
          opacity: isFlipping ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex flex-col w-full text-left cursor-pointer rounded-xl p-4 backdrop-blur-sm transition-colors"
        style={{
          transformStyle: "preserve-3d",
          width: "100%",
          border: "1px solid rgba(255, 182, 146, 0.28)",
          background: "linear-gradient(135deg, rgba(255,123,50,0.10) 0%, rgba(255,150,96,0.04) 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-px" style={{ backgroundColor: "rgba(255,182,146,0.6)" }} />
          <span
            className="font-sans uppercase tracking-[1.5px]"
            style={{ fontSize: "10px", color: "rgba(255,182,146,0.8)" }}
          >
            Produit associé
          </span>
        </div>
        <span
          className="font-sans font-bold text-white"
          style={{ fontSize: "1.05rem" }}
        >
          {produit.name[locale]}
        </span>
        <span
          className="font-sans mt-1 line-clamp-2"
          style={{
            fontSize: "var(--text-nav)",
            lineHeight: "var(--text-nav--line-height)",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {produit.description[locale]}
        </span>
        <div
          className="flex items-center gap-1.5 mt-3 group-hover:gap-2.5 transition-all duration-200"
          style={{ color: "var(--color-brand-orange-light)" }}
        >
          <span className="font-sans uppercase tracking-[1.5px]" style={{ fontSize: "10px" }}>
            Voir le produit
          </span>
          <ArrowIcon />
        </div>
      </motion.button>
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
