"use client";

import { useState, useEffect, useRef } from "react";
import { RevealTitle } from "@/components/ui/RevealTitle";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Pixels de scroll consommés par étape */
const SCROLL_PER_STEP = 700;

interface Step {
  id: string;
  num: string;
  title: string;
  description: string;
  highlights: string[];
  accent: string;
}

const STEPS: Step[] = [
  {
    id: "developpement",
    num: "01",
    title: "Développement",
    description:
      "Applications web sur mesure, APIs robustes, architectures scalables. Nos ingénieurs livrent du code qui dure — pas du code qui impressionne en présentation.",
    highlights: [
      "Full-stack : React, Next.js, Node.js, Go, Python",
      "Architecture micro-services et APIs RESTful / GraphQL",
      "Revue de code systématique à chaque pull request",
    ],
    accent: "var(--color-offer-blue)",
  },
  {
    id: "ia",
    num: "02",
    title: "Intelligence Artificielle",
    description:
      "Agents IA, automatisations intelligentes, LLM intégrés aux workflows métier. Nous industrialisons l'IA sur des cas d'usage réels — pas des démos.",
    highlights: [
      "Conception et déploiement d'agents IA autonomes",
      "Intégration LLM dans vos processus existants",
      "Formation de vos équipes à l'IA augmentée",
    ],
    accent: "var(--color-offer-green)",
  },
  {
    id: "hebergement",
    num: "03",
    title: "Hébergement & Infrastructure",
    description:
      "Cloud, on-premise ou hybride — nous concevons et opérons l'infrastructure adaptée à vos contraintes de sécurité, de performance et de coût.",
    highlights: [
      "Cloud souverain ou multi-cloud selon vos contraintes",
      "CI/CD, monitoring et alerting en production",
      "SLA garantis et astreinte disponible",
    ],
    accent: "var(--color-brand-orange)",
  },
  {
    id: "conseil",
    num: "04",
    title: "Conseil & Transformation",
    description:
      "Audit technique, roadmap produit, accompagnement à la transformation digitale. Nous structurons votre vision avant d'écrire la première ligne de code.",
    highlights: [
      "Audit de l'existant et détection des dettes techniques",
      "Cadrage stratégique et découpage en livrables concrets",
      "Accompagnement des équipes internes dans la durée",
    ],
    accent: "var(--color-offer-yellow)",
  },
];

const N = STEPS.length;

// Hauteur de la zone de scroll : 100vh pour l'affichage sticky + N étapes × SCROLL_PER_STEP
const OUTER_HEIGHT = `calc(100vh + ${N * SCROLL_PER_STEP}px)`;

/**
 * Bouton de navigation d'étape.
 * La barre de progression est pilotée par un MotionValue — binding direct,
 * sans animation Framer Motion (c'est le scroll qui fixe la valeur).
 */
function StepButton({
  step,
  isActive,
  progressValue,
  onClick,
}: {
  step: Step;
  isActive: boolean;
  progressValue: MotionValue<number>;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-5 px-5 py-5 rounded-[var(--radius-card)] text-left w-full transition-colors"
      style={{
        background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
      }}
      aria-pressed={isActive}
    >
      {/* Indicateur gauche — glisse entre les steps via layoutId */}
      {isActive && (
        <motion.div
          layoutId="step-border"
          className="absolute left-0 inset-y-3 w-[3px] rounded-full"
          style={{ backgroundColor: step.accent }}
          transition={{ duration: 0.4, ease: EASE }}
          aria-hidden="true"
        />
      )}

      {/* Numéro de l'étape */}
      <span
        className="font-sans font-bold tabular-nums shrink-0"
        style={{
          fontSize: "var(--text-stat-value)",
          lineHeight: 1,
          width: "2.5rem",
          color: isActive ? step.accent : "rgba(255,255,255,0.15)",
          transition: "color 0.35s ease",
        }}
      >
        {step.num}
      </span>

      {/* Titre + barre de progression */}
      <div className="flex flex-col gap-2.5 flex-1 min-w-0">
        <span
          className="font-sans font-semibold"
          style={{
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.3,
            color: isActive
              ? "var(--color-text-heading)"
              : "rgba(255,255,255,0.35)",
            transition: "color 0.35s ease",
          }}
        >
          {step.title}
        </span>

        {/* Barre de progression — scaleX piloté directement par le scroll */}
        <div
          className="h-px w-full rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: step.accent,
              transformOrigin: "left",
              scaleX: progressValue,
            }}
          />
        </div>
      </div>
    </button>
  );
}

/**
 * Panneau de contenu actif.
 * T05 — spotlight cursor dont la couleur correspond à l'étape active.
 * AnimatePresence mode="wait" pour des transitions propres entre steps.
 */
function ContentPanel({ step }: { step: Step }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    setCursor({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      className="relative rounded-[var(--radius-card)] border border-white/8 overflow-hidden"
      style={{ minHeight: "360px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fond de base */}
      <div className="absolute inset-0 bg-nav-bg" aria-hidden="true" />

      {/* T05 — Spotlight cursor (couleur = accent de l'étape) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: `radial-gradient(600px circle at ${cursor.x}% ${cursor.y}%, ${step.accent}0d 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Ligne accent en haut — couleur change avec le step */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${step.accent}80, ${step.accent}20, transparent)`,
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* AnimatePresence — le contenu entre/sort avec blur + y */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          className="relative z-10 flex flex-col gap-8 p-8 md:p-10"
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Étape + titre */}
          <div className="flex flex-col gap-3">
            <span
              className="font-body font-semibold uppercase tracking-widest"
              style={{
                fontSize: "var(--text-badge)",
                letterSpacing: "0.12em",
                color: step.accent,
              }}
            >
              {step.num}
            </span>
            <h3
              className="font-sans font-bold text-text-heading"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {step.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="font-body text-text-light/55"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
              maxWidth: "540px",
            }}
          >
            {step.description}
          </p>

          {/* Points clés — stagger à l'entrée */}
          <ul className="flex flex-col gap-3.5">
            {step.highlights.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 font-body text-text-light/55"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.12 + i * 0.08 }}
                style={{ fontSize: "var(--text-nav)" }}
              >
                <span
                  className="shrink-0 rounded-full mt-[6px] size-[5px]"
                  style={{ backgroundColor: step.accent }}
                  aria-hidden="true"
                />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * ProcessStepper — Notre méthode de collaboration en 4 étapes.
 *
 * Architecture sticky-scroll :
 *   - L'outer div crée l'espace de scroll (100vh + N × SCROLL_PER_STEP)
 *   - L'inner div est sticky (top-0, h-screen)
 *   - Le scroll listener calcule rawProgress [0,1] → stepIndex + stepProgress
 *   - Les MotionValues des barres sont mises à jour directement (pas d'animation)
 *   - Le clic sur une étape scroll vers la position correspondante
 */
export function ProcessStepper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Un MotionValue par étape — initialisé en dehors de tout callback (règle des hooks)
  const p0 = useMotionValue(0);
  const p1 = useMotionValue(0);
  const p2 = useMotionValue(0);
  const p3 = useMotionValue(0);
  const progressValues: MotionValue<number>[] = [p0, p1, p2, p3];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const containerTop = el.getBoundingClientRect().top + window.scrollY;
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, window.scrollY - containerTop);
      const rawProgress =
        totalScroll > 0 ? Math.min(1, scrolled / totalScroll) : 0;

      const stepSize = 1 / N;
      const stepIndex = Math.min(N - 1, Math.floor(rawProgress / stepSize));
      const stepProgress = prefersReduced
        ? rawProgress >= (stepIndex + 1) * stepSize
          ? 1
          : 0
        : (rawProgress - stepIndex * stepSize) / stepSize;

      setActiveIndex(stepIndex);

      progressValues.forEach((pv, i) => {
        if (i < stepIndex) pv.set(1);
        else if (i === stepIndex) pv.set(stepProgress);
        else pv.set(0);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // progressValues refs are stable — intentionally omitted from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToStep(index: number) {
    const el = containerRef.current;
    if (!el) return;
    const containerTop = el.getBoundingClientRect().top + window.scrollY;
    const stepSize = 1 / N;
    const progress = index * stepSize;
    const totalScroll = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + progress * totalScroll,
      behavior: "smooth",
    });
  }

  const activeStep = STEPS[activeIndex];

  return (
    <MotionConfig reducedMotion="user">
      <div ref={containerRef} className="relative" style={{ height: OUTER_HEIGHT }}>
        <div className="sticky top-0 h-screen bg-deep-navy flex flex-col justify-center"
          style={{
            paddingTop: "6rem",
            paddingBottom: "6rem",
            paddingLeft: "var(--page-margin-x)",
            paddingRight: "var(--page-margin-x)",
          }}
        >
          {/* Header section */}
          <div className="flex flex-col gap-4 mb-14">
            <motion.span
              className="font-body font-semibold text-brand-orange uppercase tracking-widest"
              style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              Nos expertises
            </motion.span>

            <RevealTitle
              text="Notre savoir-faire."
              highlightWord="savoir-faire."
              delay={0.1}
              className="font-sans font-bold text-text-heading"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            />
          </div>

          {/* Grille : navigation gauche (2/5) + contenu droite (3/5) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            {/* Navigation des étapes */}
            <div className="md:col-span-2 flex flex-col">
              {STEPS.map((step, i) => (
                <StepButton
                  key={step.id}
                  step={step}
                  isActive={activeIndex === i}
                  progressValue={progressValues[i]}
                  onClick={() => scrollToStep(i)}
                />
              ))}
            </div>

            {/* Panel de contenu */}
            <div className="md:col-span-3">
              <ContentPanel step={activeStep} />
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
