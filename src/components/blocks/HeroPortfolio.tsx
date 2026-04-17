"use client";

import { useRef, useState } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { HeroHalos } from "@/components/blocks/HeroHalos";
import { Link } from "@/navigation";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * T04 — Line curtain reveal
 * Le container overflow-hidden masque le texte ; la span monte de y:110% → y:0%.
 */
function SplitLine({
  text,
  delay,
  gradient = false,
}: {
  text: string;
  delay: number;
  gradient?: boolean;
}) {
  return (
    <span className="block overflow-hidden" aria-hidden="true">
      <motion.span
        className={[
          "block",
          gradient ? "bg-clip-text text-transparent" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={
          gradient
            ? {
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
              }
            : undefined
        }
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.75, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/**
 * T06 — Magnetic wrapper
 * Le contenu est légèrement attiré vers le curseur (force 25%).
 */
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.25,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.25,
    });
  }
  function onMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function HeroPortfolio() {
  // T03 — Parallax sur STEAMULO : défile plus lentement que le reste
  const { scrollY } = useScroll();
  const steamuloY = useTransform(scrollY, [0, 700], [0, -110]);
  const steamuloOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative flex flex-col justify-center overflow-hidden min-h-screen bg-nav-bg"
        aria-label="Hero — Steamulo, agence digitale"
      >
        {/* Halos ambiants */}
        <HeroHalos />

        {/* T08 + T03 — STEAMULO fantôme avec parallax au scroll */}
        <motion.div
          className="pointer-events-none select-none absolute inset-0 flex items-end justify-end overflow-hidden"
          style={{ y: steamuloY, opacity: steamuloOpacity }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(8rem, 19vw, 22rem)",
              lineHeight: 0.85,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.035)",
              paddingRight: "2%",
              paddingBottom: "1%",
            }}
          >
            STEAMULO
          </span>
        </motion.div>

        {/* Contenu principal */}
        <div
          className="relative z-10 flex flex-col w-full"
          style={{
            paddingTop: "calc(var(--header-height) + 4rem)",
            paddingLeft: "var(--page-margin-x)",
            paddingRight: "var(--page-margin-x)",
            paddingBottom: "6rem",
            gap: "2.5rem",
          }}
        >
          {/* Eyebrow badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-[color:var(--color-badge-blue-bg)] border border-[color:var(--color-badge-blue-border)] w-fit"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span
              className="size-2 rounded-full bg-badge-blue shrink-0"
              style={{ boxShadow: "var(--shadow-badge-dot)" }}
            />
            <span className="font-body font-semibold text-badge-blue tracking-[1.8px] text-[length:var(--text-badge)] leading-4 uppercase whitespace-nowrap">
              Agence digitale · Paris · Depuis 2005
            </span>
          </motion.div>

          {/* H1 — T04 : curtain reveal ligne par ligne */}
          <h1
            className="font-sans font-bold text-text-heading leading-none"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
              letterSpacing: "-0.03em",
            }}
            aria-label="Nous faisons exister ce qui n'existait pas."
          >
            <SplitLine text="Nous faisons" delay={0.15} />
            <SplitLine text="exister" delay={0.28} gradient />
            <SplitLine text="ce qui n'existait pas." delay={0.41} />
          </h1>

          {/* Description */}
          <motion.p
            className="font-body text-text-body-warm max-w-[560px]"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
              opacity: 0.8,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
          >
            Depuis 2005, nous concevons et déployons les plateformes digitales
            les plus ambitieuses — du conseil architecture jusqu&apos;à la mise
            en production, avec les meilleurs ingénieurs.
          </motion.p>

          {/* Clients inline — preuve sociale immédiate */}
          <motion.div
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
          >
            <span
              className="font-body uppercase tracking-widest text-text-light/30"
              style={{ fontSize: "var(--text-badge)" }}
            >
              Clients
            </span>
            {["Carrefour", "INPI", "BPCE", "FDJ", "La Poste"].map((name) => (
              <span
                key={name}
                className="font-body text-text-light/50 border border-white/8 rounded-full px-3 py-[3px]"
                style={{ fontSize: "var(--text-badge)" }}
              >
                {name}
              </span>
            ))}
            <span
              className="font-body text-text-light/30"
              style={{ fontSize: "var(--text-badge)" }}
            >
              +195
            </span>
          </motion.div>

          {/* CTAs — T06 : magnétiques */}
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
          >
            <MagneticWrapper>
              <Link
                href="/contact"
                data-cursor-reactive
                className="relative flex items-center justify-center px-8 py-4 rounded-[var(--radius-input)] font-sans font-semibold text-cta-text-dark text-[length:var(--text-nav)]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-brand-orange-cta-from) 0%, var(--color-brand-orange-cta-to) 100%)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[var(--radius-input)]"
                  style={{
                    boxShadow:
                      "0px 20px 30px -8px rgba(255,126,51,0.35), 0px 8px 12px -4px rgba(255,126,51,0.2)",
                  }}
                />
                Démarrer un projet
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link
                href="/references"
                className="flex items-center gap-2 px-8 py-4 rounded-[var(--radius-input)] font-sans text-text-light text-[length:var(--text-nav)] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                Voir nos réalisations
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* Scroll indicator — ligne qui pulse + se déplace vers le bas */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden="true"
        >
          <span className="font-body text-text-light/40 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="relative w-px h-10 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-text-light/50 to-transparent"
              animate={{ top: ["-100%", "150%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
              style={{ height: "60%" }}
            />
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
