"use client";

// PoleIdentityBanner — Carte d'identité visuelle d'un pôle (post-hero)
// Layout 2 colonnes : tagline + keywords gauche / stats droite
// Accent entièrement piloté par les props accentColor et accentColorLight

import { motion } from "framer-motion";

export interface PoleIdentityBannerProps {
  /** Libellé court du pôle — ex: "Conseil" */
  poleLabel: string;
  /** Couleur principale du pôle — token CSS var, ex: "var(--color-tab-active-dev)" */
  accentColor: string;
  /** Couleur d'accent plus claire pour le texte — token CSS var, ex: "var(--color-bento-dev-accent)" */
  accentColorLight: string;
  /** Phrase d'accroche du pôle — ex: "Architecture IA. Performance réelle." */
  tagline: string;
  /** Métriques clés — max 3 affichées */
  stats: { value: string; label: string }[];
  /** Mots-clés du pôle — 3 à 5 items */
  keywords: string[];
  className?: string;
}

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function PoleIdentityBanner({
  poleLabel,
  accentColor,
  accentColorLight,
  tagline,
  stats,
  keywords,
  className,
}: PoleIdentityBannerProps) {
  return (
    <section
      className={["relative py-10 md:py-14", className ?? ""].join(" ")}
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      <div className="relative max-w-[1280px] mx-auto">
        {/* ── Carte principale ─────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-[var(--radius-card)]"
          style={{
            background: "rgba(67, 70, 116, 0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 0 40px -8px color-mix(in srgb, ${accentColor} 25%, transparent), 0 25px 50px rgba(0,0,0,0.25)`,
          }}
        >
          {/* Ligne lumineuse en haut — glow accent */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0"
            style={{
              height: "2px",
              background: `linear-gradient(90deg, transparent 0%, ${accentColor} 30%, ${accentColor} 70%, transparent 100%)`,
              boxShadow: `0 0 16px 2px ${accentColor}`,
            }}
          />

          {/* Halo d'ambiance en arrière-plan */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl"
            style={{ background: accentColor }}
          />

          <div className="relative grid grid-cols-1 gap-10 px-10 py-10 md:grid-cols-2 lg:px-14 lg:py-12">
            {/* ── Colonne gauche : tagline + keywords ───────── */}
            <div className="flex flex-col gap-8">
              {/* Badge pôle */}
              <div className="flex items-center gap-2 self-start">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 8px 0 ${accentColor}`,
                  }}
                />
                <span
                  className="font-ui font-bold uppercase"
                  style={{
                    color: accentColor,
                    fontSize: "var(--text-badge)",
                    letterSpacing: "var(--text-badge--letter-spacing)",
                  }}
                >
                  Pôle {poleLabel}
                </span>
              </div>

              {/* Tagline */}
              <motion.h2
                className="font-sans font-bold text-text-heading"
                style={{
                  fontSize: "var(--text-card-title)",
                  lineHeight: "var(--text-card-title--line-height)",
                  maxWidth: "20ch",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                {tagline}
              </motion.h2>

              {/* Keywords pills */}
              <motion.div
                className="flex flex-wrap gap-2"
                variants={CONTAINER_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {keywords.map((kw) => (
                  <motion.span
                    key={kw}
                    className="font-ui font-semibold uppercase rounded-full px-4 py-1.5 cursor-default"
                    style={{
                      fontSize: "var(--text-badge)",
                      letterSpacing: "var(--text-badge--letter-spacing)",
                      color: accentColorLight,
                      background: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${accentColor} 40%, transparent)`,
                    }}
                    variants={ITEM_VARIANTS}
                    whileHover={{
                      background: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
                      borderColor: `color-mix(in srgb, ${accentColor} 80%, transparent)`,
                      boxShadow: `0 0 10px 0 color-mix(in srgb, ${accentColor} 35%, transparent)`,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {kw}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* ── Colonne droite : stats ─────────────────────── */}
            <motion.div
              className="flex flex-col justify-center gap-4"
              variants={CONTAINER_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.slice(0, 3).map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-5 rounded-[12px] p-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  variants={ITEM_VARIANTS}
                >
                  {/* Trait accent latéral */}
                  <div
                    aria-hidden="true"
                    className="h-10 w-[3px] shrink-0 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
                    }}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-sans font-bold"
                      style={{
                        color: accentColorLight,
                        fontSize: "var(--text-stat-value)",
                        lineHeight: "var(--text-stat-value--line-height)",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-ui font-semibold uppercase text-text-light"
                      style={{
                        fontSize: "var(--text-label)",
                        lineHeight: "var(--text-label--line-height)",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
