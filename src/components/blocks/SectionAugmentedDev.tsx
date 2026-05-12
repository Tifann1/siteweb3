'use client'

// SectionAugmentedDev — node 533:5404
// Figma: "Développement augmenté par l'IA"
// Wrapper: px-8, gap-[64px], w-full
// Inner card: bg-card-bg, border border-white/5, rounded-[24px], p-[49px], gap-[64px]
// 3 process steps (carousel) + 3 tech cards below

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export interface ProcessStep {
  /** SVG icon inline (ReactNode) */
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface TechCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface SectionAugmentedDevProps {
  heading?: string;
  subheading?: string;
  steps?: ProcessStep[];
  techCards?: TechCard[];
  /**
   * Couleur d'accentuation du pôle.
   * Utilisée pour le gradient de la carte, les titres des étapes et la bordure des icônes.
   * Défaut : --color-brand-orange (pôle Conseil)
   */
  accentColor?: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    icon: (
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 17.5h7M17.5 14v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Architecture robuste",
    description:
      "Nous concevons des socles techniques évolutifs, pensés pour intégrer vos agents IA et supporter vos usages à l'échelle.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Déploiement fluide",
    description:
      "Nous industrialisons les développements pour livrer plus vite, avec des cycles fiables et une qualité maîtrisée.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Sécurité intégrée",
    description:
      "Nous intégrons les contrôles de sécurité dès le développement pour sécuriser vos applications, vos données et vos agents IA.",
  },
];

const DEFAULT_TECH_CARDS: TechCard[] = [
  {
    icon: (
      <svg width="24" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 9l-5 3 5 3M16 9l5 3-5 3M14 6l-4 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "APIs métier",
    subtitle: "Interfaces bien intégrées",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 8v4l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Supervision continue",
    subtitle: "Suivi des performances",
  },
  {
    icon: (
      <svg width="24" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 11l3 3L22 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Tests automatisés",
    subtitle: "Qualité du code renforcée",
  },
];

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 28 }

export function SectionAugmentedDev({
  heading = "Développement augmenté par l'IA",
  subheading = "Nous utilisons l'IA pour accélérer le développement, fiabiliser le code et permettre à nos ingénieurs de se concentrer sur l'architecture et la logique métier.",
  steps = DEFAULT_STEPS,
  techCards = DEFAULT_TECH_CARDS,
  accentColor = "var(--color-brand-orange)",
}: SectionAugmentedDevProps) {
  const [activeIndex, setActiveIndex] = useState(1)

  const count = steps.length
  // Always render [left, center, right] — center = activeIndex
  const displayOrder = [
    (activeIndex - 1 + count) % count,
    activeIndex,
    (activeIndex + 1) % count,
  ]

  return (
    <section
      className="flex flex-col gap-16 items-center overflow-hidden w-full pb-16 md:pb-24"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      <div className="flex flex-col gap-16 items-center w-full">
        {/* Heading block */}
        <div className="flex flex-col gap-4 items-center w-full">
          <h2
            className="font-sans font-bold text-white text-center"
            style={{
              fontSize: "var(--text-card-title)",
              lineHeight: "var(--text-card-title--line-height)",
            }}
          >
            {heading}
          </h2>
          <p
            className="font-sans text-text-light/60 text-center max-w-[825px]"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {subheading}
          </p>
        </div>

        {/* Main card */}
        <div
          className="relative bg-card-bg border border-white/5 rounded-[var(--radius-card)] p-[49px] flex flex-col gap-16 items-center overflow-hidden w-full"
        >
          {/* Radial gradient overlay — couleur du pôle */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${accentColor} 2%, transparent 55%)`,
            }}
          />

          {/* 3 process steps — carousel */}
          <div className="relative grid grid-cols-3 gap-12 w-full min-h-[196px]">
            {displayOrder.map((originalIndex) => {
              const step = steps[originalIndex]
              const isActive = originalIndex === activeIndex

              return (
                <motion.div
                  key={originalIndex}
                  layout
                  transition={SPRING}
                  animate={{
                    opacity: isActive ? 1 : 0.45,
                    scale: isActive ? 1 : 0.88,
                  }}
                  onClick={() => setActiveIndex(originalIndex)}
                  className="relative flex flex-col items-center col-span-1 self-center cursor-pointer select-none"
                  whileHover={!isActive ? { opacity: 0.7 } : undefined}
                >
                  {/* Icon box */}
                  <div className="flex flex-col items-start pb-6 w-20">
                    <div
                      className="bg-deep-navy flex items-center justify-center p-px rounded-[16px] size-20 border"
                      style={{
                        borderColor: accentColor,
                        color: accentColor,
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Title — always readable */}
                  <div className="flex flex-col items-start pb-2 w-full">
                    <h3
                      className="font-sans text-text-heading text-center w-full whitespace-nowrap"
                      style={{ fontSize: "var(--text-tab)" }}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Description — pleine opacité au centre, réduite sur les côtés */}
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0.32 }}
                    transition={{ duration: 0.22 }}
                    className="font-sans text-text-light/60 text-center w-full"
                    style={{
                      fontSize: "var(--text-nav)",
                      lineHeight: "var(--text-nav--line-height)",
                    }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              )
            })}
          </div>

          {/* Tech cards — même displayOrder que les steps, tournent en sync */}
          <div className="flex gap-5 items-center w-full">
            {displayOrder.map((originalIndex) => {
              const card = techCards[originalIndex]
              const isActive = originalIndex === activeIndex
              return (
                <motion.div
                  key={originalIndex}
                  layout
                  transition={SPRING}
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  onClick={() => setActiveIndex(originalIndex)}
                  className="bg-deep-navy border border-white/5 flex flex-1 gap-5 items-center justify-center px-[41px] py-[25px] rounded-[var(--radius-card)] cursor-pointer"
                >
                  <div className="shrink-0" style={{ color: accentColor }}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col items-start flex-1">
                    <p
                      className="font-sans text-text-heading"
                      style={{
                        fontSize: "var(--text-nav)",
                        lineHeight: "var(--text-nav--line-height)",
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      className="font-sans text-text-muted"
                      style={{
                        fontSize: "var(--text-label)",
                        lineHeight: "var(--text-label--line-height)",
                      }}
                    >
                      {card.subtitle}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
