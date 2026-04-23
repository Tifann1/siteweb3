"use client";

import { useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";

interface Feature {
  icon: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  /** Si true, la carte occupe 2 colonnes sur desktop */
  wide?: boolean;
}

export const FEATURES_DEFAULT: Feature[] = [
  {
    icon: "◈",
    label: "Agents IA",
    title: "Agents sur mesure, ancrés dans vos usages",
    description:
      "Nous concevons des agents IA qui s'intègrent à vos outils existants — pas des démos, des systèmes en production qui réduisent la charge cognitive de vos équipes.",
    accent: "var(--color-brand-orange)",
    wide: true,
  },
  {
    icon: "⬡",
    label: "Architecture",
    title: "Scalable par design",
    description:
      "Cloud-native, microservices, serverless — nous choisissons l'architecture qui grandit avec vous, pas celle qui impressionne en démo.",
    accent: "var(--color-bento-dev-accent)",
  },
  {
    icon: "⚙",
    label: "DevOps",
    title: "CI/CD & infrastructure as code",
    description:
      "Déploiements sans friction, monitoring proactif, rollback en secondes. L'infrastructure n'est plus un frein.",
    accent: "var(--color-bento-devops-border)",
  },
  {
    icon: "◎",
    label: "Conseil",
    title: "Stratégie avant l'exécution",
    description:
      "Audit de stack, roadmap technique, choix de modèles IA — nous nous posons les bonnes questions avant d'écrire la première ligne.",
    accent: "var(--color-offer-green)",
    wide: true,
  },
];

function BentoCard({
  feature,
  delay,
  isFlipped,
}: {
  feature: Feature;
  delay: number;
  isFlipped: boolean;
}) {
  return (
    /* Outer container : gère le col-span + la perspective 3D */
    <div
      className={[feature.wide ? "md:col-span-2" : "md:col-span-1", "h-full"].join(" ")}
      style={{ perspective: "1200px" }}
    >
      {/* Flip wrapper : effectue la rotation 3D */}
      <motion.div
        style={{ transformStyle: "preserve-3d", position: "relative", height: "100%" }}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {/* Face avant — contenu complet */}
        <motion.article
          className="group relative flex flex-col gap-6 p-8 rounded-[var(--radius-card)] border border-white/8 bg-white/3 cursor-default h-full"
          style={{ backfaceVisibility: "hidden" }}
          whileHover={{ scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* Accent glow au hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[var(--radius-card)]"
            style={{
              background: `radial-gradient(ellipse at 30% 40%, ${feature.accent}18 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {/* Border accent au hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: `inset 0 0 0 1px ${feature.accent}40` }}
            aria-hidden="true"
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              {/* Label badge */}
              <span
                className="font-body font-semibold uppercase tracking-widest"
                style={{
                  fontSize: "var(--text-badge)",
                  letterSpacing: "0.1em",
                  color: feature.accent,
                }}
              >
                {feature.label}
              </span>

              {/* Titre */}
              <h3
                className="font-sans font-bold text-text-heading"
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  lineHeight: 1.2,
                }}
              >
                {feature.title}
              </h3>
            </div>

            {/* Icône */}
            <span
              className="text-3xl shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color: feature.accent }}
              aria-hidden="true"
            >
              {feature.icon}
            </span>
          </div>

          {/* Description */}
          <p
            className="font-body text-text-light/60"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {feature.description}
          </p>

          {/* Ligne décorative en bas */}
          <div className="mt-auto">
            <div
              className="h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
              style={{ backgroundColor: feature.accent, opacity: 0.4 }}
              aria-hidden="true"
            />
          </div>
        </motion.article>

        {/* Face arrière — tag uniquement */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[var(--radius-card)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `radial-gradient(ellipse at 50% 40%, ${feature.accent}1a 0%, rgba(28,31,47,0.98) 70%)`,
            border: `1px solid ${feature.accent}40`,
          }}
          aria-hidden="true"
        >
          <span
            className="text-4xl opacity-60"
            style={{ color: feature.accent }}
          >
            {feature.icon}
          </span>
          <span
            className="font-body font-semibold uppercase tracking-widest"
            style={{
              fontSize: "var(--text-badge)",
              letterSpacing: "0.12em",
              color: feature.accent,
            }}
          >
            {feature.label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

interface FeatureBentoProps {
  features?: Feature[]
  sectionLabel?: string
  heading?: React.ReactNode
}

export function FeatureBento({ features = FEATURES_DEFAULT, sectionLabel = "Ce qu'on fait", heading }: FeatureBentoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const isFlipped = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="bg-nav-bg"
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
        aria-label="Nos expertises"
      >
        {/* Header section */}
        <div className="flex flex-col gap-4 mb-14">
          <motion.span
            className="font-body font-semibold text-brand-orange uppercase tracking-widest"
            style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {sectionLabel}
          </motion.span>

          <motion.h2
            className="font-sans font-bold text-text-heading"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {heading ?? (
              <>
                Quatre pôles.
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
                  }}
                >
                  Un seul objectif.
                </span>
              </>
            )}
          </motion.h2>
        </div>

        {/* Grille bento 3 colonnes — hauteur fixe pour égaliser les 4 blocs */}
        <div className="md:h-[640px]">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 md:h-full gap-4">
          {features.map((feature, i) => (
            <BentoCard
              key={feature.label}
              feature={feature}
              delay={i * 0.12}
              isFlipped={isFlipped}
            />
          ))}
        </div>
        </div>
      </section>
    </MotionConfig>
  );
}
