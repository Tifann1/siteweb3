"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionConfig,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Project {
  id: string;
  client: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  wide?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "fdj",
    client: "FDJ",
    title: "Agent IA de support interne",
    description:
      "Assistant IA intégré aux outils RH — réduit de 40 % le volume de tickets support grâce au RAG sur la base documentaire interne.",
    tags: ["Agents IA", "LLM", "RAG"],
    accent: "var(--color-brand-orange)",
    wide: true,
  },
  {
    id: "inpi",
    client: "INPI",
    title: "Système de dépôt en ligne",
    description:
      "Application nationale de dépôt de brevets et marques, accessible à 500 000 utilisateurs simultanés.",
    tags: ["Architecture", "Java", "PostgreSQL"],
    accent: "var(--color-offer-green)",
  },
  {
    id: "bpce",
    client: "BPCE",
    title: "API banking open data",
    description:
      "Conception et déploiement d'APIs conformes DSP2 pour le second groupe bancaire français.",
    tags: ["API", "Sécurité", "Cloud"],
    accent: "var(--color-offer-blue)",
  },
  {
    id: "carrefour",
    client: "Carrefour",
    title: "Plateforme e-commerce B2B",
    description:
      "Migration et refonte complète de la plateforme de commande B2B desservant 50 000 professionnels à travers l'Europe.",
    tags: ["React", "Microservices", "DevOps"],
    accent: "var(--color-offer-yellow)",
    wide: true,
  },
];

/**
 * T01 + T02 — Tilt 3D au hover + clip-path reveal à l'entrée
 *
 * Structure :
 * motion.div  ← clip-path entrance animation (T02)
 *   div[perspective]  ← perspective pour le 3D + mouse events
 *     motion.article[rotateX, rotateY]  ← tilt 3D (T01)
 */
function TiltCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const perspRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springCfg = { damping: 30, stiffness: 280 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springCfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springCfg);

  function onMouseMove(e: React.MouseEvent) {
    const rect = perspRef.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={project.wide ? "md:col-span-2" : "md:col-span-1"}
      initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.12 }}
    >
      <div
        ref={perspRef}
        className="h-full"
        style={{ perspective: "1200px" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <motion.article
          className="group relative rounded-[var(--radius-card)] overflow-hidden border border-white/8 h-full cursor-default bg-deep-navy"
          style={{ rotateX, rotateY }}
        >
          {/* Accent tint ambiant — toujours visible, subtil */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 15% 90%, ${project.accent}0d 0%, transparent 55%)`,
            }}
            aria-hidden="true"
          />

          {/* Accent glow — hover uniquement */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at 30% 25%, ${project.accent}1a 0%, transparent 65%)`,
            }}
            aria-hidden="true"
          />

          {/* Border accent — hover uniquement */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: `inset 0 0 0 1px ${project.accent}40` }}
            aria-hidden="true"
          />

          {/* Contenu */}
          <div
            className="relative z-10 flex flex-col gap-6 p-8"
            style={{ minHeight: project.wide ? "280px" : "260px" }}
          >
            {/* Client */}
            <span
              className="font-body font-semibold uppercase tracking-widest"
              style={{
                fontSize: "var(--text-badge)",
                color: project.accent,
                letterSpacing: "0.1em",
              }}
            >
              {project.client}
            </span>

            {/* Titre */}
            <h3
              className="font-sans font-bold text-text-heading"
              style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)", lineHeight: 1.2 }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              className="font-body text-text-light/50"
              style={{
                fontSize: "var(--text-nav)",
                lineHeight: "var(--text-nav--line-height)",
              }}
            >
              {project.description}
            </p>

            {/* Footer : tags + arrow */}
            <div className="mt-auto flex items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs px-3 py-1 rounded-full border border-white/8 bg-white/3 text-text-light/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                style={{ color: project.accent }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

export function WorkShowcase() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="bg-nav-bg"
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
        aria-label="Nos réalisations"
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
            Réalisations
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
            Des projets qui{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
              }}
            >
              durent.
            </span>
          </motion.h2>
        </div>

        {/* Grille bento 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
