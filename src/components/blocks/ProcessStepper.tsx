"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const AUTO_ADVANCE_MS = 4500;

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
    id: "cadrage",
    num: "01",
    title: "Cadrage",
    description:
      "Avant d'écrire une seule ligne de code, nous comprenons votre contexte. Contraintes techniques, objectifs métier, équipes en place — tout est cartographié.",
    highlights: [
      "Audit de l'existant (stack, dette technique, dépendances)",
      "Définition des critères de succès mesurables",
      "Découpage en livrables concrets et priorisés",
    ],
    accent: "var(--color-offer-blue)",
  },
  {
    id: "conception",
    num: "02",
    title: "Conception",
    description:
      "L'architecture est décidée, pas subie. Nous choisissons les patterns qui correspondent à vos contraintes — pas ceux qui impressionnent en présentation.",
    highlights: [
      "Architecture Decision Records documentés",
      "Prototype de validation avant construction",
      "Revue par un second expert senior",
    ],
    accent: "var(--color-offer-green)",
  },
  {
    id: "construction",
    num: "03",
    title: "Construction",
    description:
      "Des sprints courts, des livrables réels, des démonstrations régulières. Vous voyez avancer le projet à chaque étape — pas à la livraison finale.",
    highlights: [
      "Revue de code à chaque pull request",
      "CI/CD en place dès le premier sprint",
      "Démos client toutes les 2 semaines",
    ],
    accent: "var(--color-brand-orange)",
  },
  {
    id: "livraison",
    num: "04",
    title: "Livraison",
    description:
      "La mise en production n'est pas la fin de notre responsabilité. Documentation, formation, monitoring — nous livrons quelque chose qui dure.",
    highlights: [
      "Documentation technique et utilisateur incluse",
      "Formation de vos équipes à la solution",
      "Transfert de compétences progressif",
    ],
    accent: "var(--color-offer-yellow)",
  },
];

/**
 * Bouton de navigation d'étape.
 * Utilise layoutId="step-border" pour que l'indicateur gauche
 * glisse fluidement entre les steps (Framer Motion shared layout).
 */
function StepButton({
  step,
  isActive,
  onClick,
}: {
  step: Step;
  isActive: boolean;
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
      {/* layoutId — l'indicateur glisse entre les steps sans remontage */}
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

        {/* Barre de progression — se remplit sur AUTO_ADVANCE_MS, reset via key */}
        <div
          className="h-px w-full rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {isActive && (
            <motion.div
              key={step.id}
              className="h-full rounded-full"
              style={{
                backgroundColor: step.accent,
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
            />
          )}
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
              Étape {step.num}
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
 * Technique principale : AnimatePresence + layoutId
 *   → L'indicateur d'étape "glisse" visuellement (shared layout)
 *   → Le contenu entre/sort avec blur+fade (AnimatePresence mode=wait)
 *
 * Temporalité : avance automatiquement (setInterval 4.5s), resetté au clic.
 * Différence avec la page : seul composant dont l'état change SANS interaction.
 */
export function ProcessStepper() {
  const [activeId, setActiveId] = useState(STEPS[0].id);
  const [clickKey, setClickKey] = useState(0);

  // Auto-advance — redémarre proprement quand l'utilisateur clique
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveId((current) => {
        const idx = STEPS.findIndex((s) => s.id === current);
        return STEPS[(idx + 1) % STEPS.length].id;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [clickKey]);

  function handleClick(id: string) {
    setActiveId(id);
    setClickKey((k) => k + 1);
  }

  const activeStep = STEPS.find((s) => s.id === activeId)!;

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="bg-deep-navy"
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
        aria-label="Notre processus de collaboration"
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
            Notre méthode
          </motion.span>

          <motion.h2
            className="font-sans font-bold text-text-heading"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          >
            Comment on{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
              }}
            >
              travaille.
            </span>
          </motion.h2>
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
            {STEPS.map((step) => (
              <StepButton
                key={step.id}
                step={step}
                isActive={activeId === step.id}
                onClick={() => handleClick(step.id)}
              />
            ))}
          </div>

          {/* Panel de contenu */}
          <div className="md:col-span-3">
            <ContentPanel step={activeStep} />
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
