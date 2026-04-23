"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export interface AugmentedFeature {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  description: string;
}

export interface AugmentedStep {
  number: string;
  title: string;
  accent?: "orange" | "blue";
}

export interface AugmentedSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  features: AugmentedFeature[];
  steps: AugmentedStep[];
}

const ease = [0.22, 1, 0.36, 1] as const;

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

  // Feature active : suit l'étape courante, clampé à l'index max des features
  const activeFeature = Math.min(
    Math.max(0, activeStep),
    features.length - 1
  );

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
          {/* ── Colonne gauche ── */}
          <div className="flex flex-1 flex-col gap-[50px] items-start">
            {eyebrow && (
              <div className="flex items-center gap-2 px-[17px] py-[9px] rounded-full bg-badge-blue-bg border border-badge-blue-border w-fit">
                <span className="size-2 rounded-full bg-badge-blue shrink-0" />
                <span className="font-body font-normal text-badge-blue tracking-[var(--text-sector-badge--letter-spacing)] text-[length:var(--text-sector-badge)] uppercase whitespace-nowrap">
                  {eyebrow}
                </span>
              </div>
            )}

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

            {/* Liste de features — la feature active est mise en avant */}
            <div className="flex flex-col gap-6 w-full">
              {features.map((feature, i) => {
                const isActive = i === activeFeature && activeStep >= 0;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: isActive ? 1 : 0.3,
                      x: isActive ? 0 : -6,
                    }}
                    transition={{ duration: 0.4, ease }}
                    className="flex gap-4 items-start"
                  >
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
                      <span
                        className="font-sans text-white whitespace-nowrap"
                        style={{ fontSize: "22px" }}
                      >
                        {feature.title}
                      </span>
                      <span
                        className="font-body font-normal text-text-muted"
                        style={{ fontSize: "16px", lineHeight: "20px" }}
                      >
                        {feature.description}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

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
                    <StepCard step={step} />
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
                    <StepCard step={step} />
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

function StepCard({ step }: { step: AugmentedStep }) {
  const numberColor =
    step.accent === "blue" ? "text-badge-blue" : "text-brand-orange-light";

  return (
    <div className="flex flex-col items-start justify-between p-[33px] bg-card-bg border border-white/5 rounded-[16px] w-full gap-4">
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
