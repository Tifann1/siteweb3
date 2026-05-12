"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/navigation";

// ─── CONFIG — ajuste ici sans toucher au composant ───────────────────────
const CONFIG = {
  heroMinHeight: "100svh",
  contentMaxWidth: "1320px",

  // Animation
  stagger: 0.11,           // délai entre chaque élément (s)
  springDamping: 62,
  springStiffness: 210,
  initY: 28,               // translation initiale (px)
  initBlur: "10px",        // blur initial

  // Cards desktop — positions absolues dans le conteneur droit
  card1: { top: "0%",   right: "4%",  rotate: -3, scale: 0.92, opacity: 0.85 },
  card2: { top: "22%",  right: "0%",  rotate:  1, scale: 1,    opacity: 1    },
  card3: { top: "58%",  right: "6%",  rotate: -1, scale: 0.9,  opacity: 0.8  },

  // Cards tailles
  cardW: 300,   // px, desktop
  cardH: 160,   // px, desktop

  // Ombres
  cardShadow: "0 20px 60px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3)",

  // Background orbs
  orb1Blur: 130,
  orb2Blur: 100,
  orb3Blur: 80,
} as const;
// ──────────────────────────────────────────────────────────────────────────

// ─── MOCK CARDS ──────────────────────────────────────────────────────────
interface MockCard {
  id: string;
  accent: string;
  eyebrow: string;
  value: string;
  unit?: string;
  sub: string;
  rows?: { label: string; ok: boolean }[];
}

const MOCK_CARDS: MockCard[] = [
  {
    id: "metric",
    accent: "#FF7E33",
    eyebrow: "Agent IA · Production",
    value: "+340",
    unit: "%",
    sub: "vélocité équipe · 30 jours",
  },
  {
    id: "review",
    accent: "#4746E9",
    eyebrow: "Code review automatisé",
    value: "94",
    unit: "%",
    sub: "couverture tests · PR mergeable",
    rows: [
      { label: "Vulnérabilités critiques", ok: true },
      { label: "Couverture tests ≥ 90 %",  ok: true },
      { label: "Conventions respectées",    ok: true },
    ],
  },
  {
    id: "pipeline",
    accent: "#46BA87",
    eyebrow: "Pipeline CI/CD",
    value: "14",
    unit: "s",
    sub: "Build · Test · Deploy · Monitor",
  },
];
// ──────────────────────────────────────────────────────────────────────────

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────
function spring(delay: number, damping: number = CONFIG.springDamping, stiffness: number = CONFIG.springStiffness) {
  return { delay, type: "spring" as const, damping, stiffness };
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: CONFIG.initY, filter: `blur(${CONFIG.initBlur})` },
  animate:  { opacity: 1, y: 0, filter: "blur(0px)", transition: spring(delay) },
});

const cardReveal = (delay: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.92, filter: "blur(8px)" },
  animate:  { opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)",
    transition: spring(delay, 55, 160) },
});
// ──────────────────────────────────────────────────────────────────────────

export function HeroLumeraInspired() {
  const reduced = useReducedMotion();

  const wrap = (anim: ReturnType<typeof fadeUp>) =>
    reduced ? {} : anim;

  return (
    <section
      className="relative flex flex-col overflow-hidden bg-nav-bg"
      style={{ minHeight: CONFIG.heroMinHeight }}
    >
      {/* ── Background : orbs colorés ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: "-10%", left: "-5%",
            background: "radial-gradient(circle, rgba(255,126,51,0.22) 0%, transparent 70%)",
            filter: `blur(${CONFIG.orb1Blur}px)`,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: "30%", right: "-8%",
            background: "radial-gradient(circle, rgba(71,70,233,0.18) 0%, transparent 70%)",
            filter: `blur(${CONFIG.orb2Blur}px)`,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 380, height: 380,
            bottom: "-5%", left: "40%",
            background: "radial-gradient(circle, rgba(70,186,135,0.12) 0%, transparent 70%)",
            filter: `blur(${CONFIG.orb3Blur}px)`,
          }}
        />
        {/* Grille de points subtile */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Contenu principal ── */}
      <div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between flex-1 w-full mx-auto gap-12 lg:gap-0"
        style={{
          maxWidth: CONFIG.contentMaxWidth,
          padding: "calc(var(--header-height) + 3rem) var(--page-margin-x) 5rem",
        }}
      >
        {/* ── Colonne gauche : texte ── */}
        <div className="flex flex-col items-start gap-7 w-full lg:max-w-[52%]">

          {/* Badge */}
          <motion.div {...wrap(fadeUp(0))}>
            <div className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-badge-blue-bg border border-badge-blue-border w-fit">
              <span
                className="size-2 rounded-full bg-badge-blue shrink-0"
                style={{ boxShadow: "var(--shadow-badge-dot)" }}
              />
              <span className="font-body font-semibold text-badge-blue tracking-[1.8px] text-[length:var(--text-badge)] leading-4 uppercase whitespace-nowrap">
                Ingénieur augmenté · IA sur mesure
              </span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            {...wrap(fadeUp(CONFIG.stagger))}
            className="font-sans font-bold text-text-heading whitespace-pre-line"
            style={{
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
            }}
          >
            {"On conçoit.\nOn déploie.\nOn augmente."}
          </motion.h1>

          {/* Sous-texte */}
          <motion.p
            {...wrap(fadeUp(CONFIG.stagger * 2))}
            className="font-body text-text-body-warm opacity-80 max-w-[480px]"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
            }}
          >
            Nous imaginons et déployons des agents IA sur mesure, connectés à vos usages réels, pour accélérer vos opérations et renforcer votre impact durablement.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...wrap(fadeUp(CONFIG.stagger * 3))}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              href="/contact"
              className="relative flex items-center justify-center px-6 py-3 rounded-[var(--radius-input)] bg-gradient-to-r from-brand-orange-light to-brand-orange font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-cta-text-dark transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[var(--radius-input)]"
                style={{ boxShadow: "0 12px 32px rgba(255,182,146,0.25)" }}
              />
              Parlons de votre projet
            </Link>
            <Link
              href="/nos-poles/conseil"
              className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-input)] border border-white/20 font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-text-light hover:text-white hover:border-white/40 transition-colors whitespace-nowrap"
            >
              Découvrir nos offres
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Proof — chiffres */}
          <motion.div
            {...wrap(fadeUp(CONFIG.stagger * 4))}
            className="flex gap-8 pt-2"
          >
            {[
              { value: "+20", label: "agents déployés" },
              { value: "×3",  label: "vélocité moyenne" },
              { value: "98%", label: "clients satisfaits" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-sans font-bold text-text-heading"
                  style={{ fontSize: "1.75rem", letterSpacing: "-0.03em" }}
                >
                  {value}
                </span>
                <span className="font-body text-text-body-warm opacity-60 text-sm">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Colonne droite : cards flottantes ── */}
        <div
          className="relative w-full lg:w-[44%] lg:self-stretch hidden lg:block"
          aria-hidden
        >
          {MOCK_CARDS.map((card, i) => {
            const pos = [CONFIG.card1, CONFIG.card2, CONFIG.card3][i];
            return (
              <motion.div
                key={card.id}
                {...(reduced ? {} : cardReveal(CONFIG.stagger * 4 + i * 0.14))}
                className="absolute"
                style={{
                  top: pos.top,
                  right: pos.right,
                  rotate: pos.rotate,
                  opacity: pos.opacity,
                  zIndex: i === 1 ? 2 : 1,
                }}
              >
                <MockCardUI card={card} />
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile : cards en ligne horizontale scrollable ── */}
        <div className="flex lg:hidden gap-4 overflow-x-auto pb-2 w-full" aria-hidden>
          {MOCK_CARDS.map((card) => (
            <div key={card.id} className="shrink-0">
              <MockCardUI card={card} small />
            </div>
          ))}
        </div>
      </div>

      {/* Séparateur bas — dégradé vers le fond suivant */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-nav-bg))" }}
      />
    </section>
  );
}

// ─── MOCK CARD UI ──────────────────────────────────────────────────────────
function MockCardUI({ card, small }: { card: MockCard; small?: boolean }) {
  const w = small ? 220 : CONFIG.cardW;
  const h = small ? 130 : CONFIG.cardH;

  return (
    <div
      className="flex flex-col justify-between rounded-2xl border border-white/10 bg-card-bg/80 backdrop-blur-sm overflow-hidden"
      style={{
        width: w,
        height: h,
        boxShadow: CONFIG.cardShadow,
        padding: small ? "14px" : "20px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-body text-white/50 text-xs tracking-wide uppercase">{card.eyebrow}</span>
        <span
          className="size-2 rounded-full shrink-0"
          style={{ background: card.accent, boxShadow: `0 0 8px ${card.accent}` }}
        />
      </div>

      {/* Valeur principale ou rows */}
      {card.rows ? (
        <ul className="flex flex-col gap-1">
          {card.rows.slice(0, small ? 2 : 3).map((row) => (
            <li key={row.label} className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="5.4" stroke={card.accent} strokeWidth="1.2"/>
                <path d="M3.5 6l1.8 1.8 3-3.6" stroke={card.accent} strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="font-body text-white/70 text-xs">{row.label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-end gap-1">
          <span
            className="font-sans font-bold text-white leading-none"
            style={{ fontSize: small ? "2rem" : "2.5rem", letterSpacing: "-0.04em" }}
          >
            {card.value}
          </span>
          {card.unit && (
            <span
              className="font-sans font-semibold pb-1"
              style={{ color: card.accent, fontSize: small ? "1rem" : "1.25rem" }}
            >
              {card.unit}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <span className="font-body text-white/40 text-xs">{card.sub}</span>
    </div>
  );
}
