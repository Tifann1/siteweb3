"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export interface AugmentedFeature {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  description: string;
}

export interface AugmentedStepDetail {
  heading?: string;
  description: string;
  points?: string[];
}

export interface AugmentedStep {
  number: string;
  title: string;
  accent?: "orange" | "blue";
  detail?: AugmentedStepDetail;
}

export interface AugmentedSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  features: AugmentedFeature[];
  steps: AugmentedStep[];
}

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Icône checkmark ──────────────────────────────────────────────────────────

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-[3px]"
    >
      <path
        d="M2 7l3.5 3.5L12 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Contenu gauche : soit le contenu global, soit le détail de l'étape ──────

function LeftContent({
  eyebrow,
  title,
  description,
  features,
  activeStep,
  steps,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  features: AugmentedFeature[];
  activeStep: number;
  steps: AugmentedStep[];
}) {
  const hasActiveStep = activeStep >= 0 && steps[activeStep]?.detail;
  const step = hasActiveStep ? steps[activeStep] : null;
  const detail = step?.detail;
  const accentColor =
    step?.accent === "blue"
      ? "var(--color-bento-dev-accent)"
      : "var(--color-brand-orange-light)";

  return (
    <div className="flex flex-1 flex-col gap-[50px] items-start">
      {/* Eyebrow — toujours visible */}
      {eyebrow && (
        <div className="flex items-center gap-2 px-[17px] py-[9px] rounded-full bg-badge-blue-bg border border-badge-blue-border w-fit">
          <span className="size-2 rounded-full bg-badge-blue shrink-0" />
          <span className="font-body font-normal text-badge-blue tracking-[var(--text-sector-badge--letter-spacing)] text-[length:var(--text-sector-badge)] uppercase whitespace-nowrap">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Zone animée : change par étape */}
      <AnimatePresence mode="wait">
        {!hasActiveStep ? (
          // État initial : titre + description + features
          <motion.div
            key="initial"
            className="flex flex-col gap-[50px] w-full"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease }}
          >
            <h2
              className="font-sans font-bold text-white w-full"
              style={{ fontSize: "40px", lineHeight: "40px" }}
            >
              {title}
            </h2>
            <p
              className="font-sans text-meta-secondary max-w-[519px]"
              style={{ fontSize: "22px" }}
            >
              {description}
            </p>
            <div className="flex flex-col gap-6 w-full">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start opacity-70">
                  <div className="flex items-center justify-center size-12 rounded-full bg-dropdown-open shrink-0">
                    {feature.iconSrc ? (
                      <div className="relative size-5">
                        <Image
                          src={feature.iconSrc}
                          alt={feature.iconAlt ?? ""}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <DefaultFeatureIcon />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-white whitespace-nowrap" style={{ fontSize: "22px" }}>
                      {feature.title}
                    </span>
                    <span className="font-body font-normal text-text-muted" style={{ fontSize: "16px", lineHeight: "20px" }}>
                      {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Étape active : contenu spécifique de l'étape
          <motion.div
            key={`step-${activeStep}`}
            className="flex flex-col gap-8 w-full"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.42, ease }}
          >
            {/* Numéro + titre de l'étape */}
            <div className="flex flex-col gap-3">
              <span
                className="font-body font-semibold uppercase tracking-widest"
                style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em", color: accentColor }}
              >
                Étape {step!.number}
              </span>
              <h2
                className="font-sans font-bold text-white"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                {detail!.heading ?? step!.title}
              </h2>
            </div>

            {/* Description de l'étape */}
            <p
              className="font-body text-meta-secondary max-w-[480px]"
              style={{ fontSize: "18px", lineHeight: "1.6" }}
            >
              {detail!.description}
            </p>

            {/* Points clés */}
            {detail!.points && detail!.points.length > 0 && (
              <ul className="flex flex-col gap-3 mt-2">
                {detail!.points.map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 font-body text-text-body-warm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.08 }}
                    style={{ fontSize: "var(--text-nav)" }}
                  >
                    <span style={{ color: accentColor }}>
                      <CheckIcon color={accentColor} />
                    </span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function AugmentedSection({
  eyebrow = "Innovation IA",
  title,
  description,
  features,
  steps,
}: AugmentedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // activeStep : -1 = aucune étape, 0..steps.length-1 = étape visible
  const [activeStep, setActiveStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Réserve 8% en début et fin pour une transition souple
    const adjusted = (latest - 0.08) / 0.84;
    const step = Math.floor(adjusted * steps.length);
    setActiveStep(Math.max(-1, Math.min(steps.length - 1, step)));
  });

  const leftSteps = steps.filter((_, i) => i % 2 === 0);
  const rightSteps = steps.filter((_, i) => i % 2 === 1);

  return (
    // Conteneur scroll : (steps + 1) × 100vh pour avoir 1 "scroll" par étape
    <div
      ref={containerRef}
      style={{ height: `${(steps.length + 1) * 100}vh` }}
      className="w-full"
    >
      {/* Zone sticky — reste à l'écran pendant toute la durée du scroll */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="flex gap-[50px] items-start w-full">
          {/* ── Colonne gauche : contenu animé par étape ── */}
          <LeftContent
            eyebrow={eyebrow}
            title={title}
            description={description}
            features={features}
            activeStep={activeStep}
            steps={steps}
          />

          {/* ── Colonne droite : grille 2×2 décalée — étapes apparaissent au scroll ── */}
          <div className="flex gap-5 items-center self-stretch w-[549px] shrink-0">
            {/* Sous-colonne gauche : étapes 1, 3 */}
            <div className="flex flex-1 flex-col gap-[50px] items-start">
              {leftSteps.map((step, i) => {
                const stepIndex = i * 2;
                const visible = stepIndex <= activeStep;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: visible ? 1 : 0,
                      y: visible ? 0 : 28,
                    }}
                    transition={{ duration: 0.45, ease }}
                    className="w-full"
                  >
                    <StepCard step={step} isActive={stepIndex === activeStep} />
                  </motion.div>
                );
              })}
            </div>

            {/* Sous-colonne droite : étapes 2, 4 — décalée vers le bas */}
            <div className="flex flex-1 flex-col gap-[50px] items-start pt-[80px]">
              {rightSteps.map((step, i) => {
                const stepIndex = i * 2 + 1;
                const visible = stepIndex <= activeStep;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: visible ? 1 : 0,
                      y: visible ? 0 : 28,
                    }}
                    transition={{ duration: 0.45, ease }}
                    className="w-full"
                  >
                    <StepCard step={step} isActive={stepIndex === activeStep} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, isActive }: { step: AugmentedStep; isActive: boolean }) {
  const numberColor =
    step.accent === "blue" ? "text-badge-blue" : "text-brand-orange-light";
  const accentColor =
    step.accent === "blue"
      ? "var(--color-bento-dev-accent)"
      : "var(--color-brand-orange-light)";

  return (
    <div
      className="flex flex-col items-start justify-between p-[33px] border rounded-[16px] w-full gap-4 transition-colors duration-500"
      style={{
        background: isActive
          ? `color-mix(in srgb, ${accentColor} 8%, var(--color-card-bg))`
          : "var(--color-card-bg)",
        borderColor: isActive
          ? `color-mix(in srgb, ${accentColor} 40%, transparent)`
          : "rgba(255,255,255,0.05)",
      }}
    >
      <span
        className={["font-body font-semibold", numberColor].join(" ")}
        style={{ fontSize: "48px", lineHeight: "48px" }}
      >
        {step.number}
      </span>
      <span
        className="font-body font-semibold text-white"
        style={{ fontSize: "16px", lineHeight: "24px" }}
      >
        {step.title}
      </span>
    </div>
  );
}

function DefaultFeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="#FFB692" strokeWidth="1.5" />
      <path d="M10 7v3l2 2" stroke="#FFB692" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
