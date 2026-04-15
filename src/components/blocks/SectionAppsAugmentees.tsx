"use client";

// SectionAppsAugmentees — Applications métier augmentées par l'IA
// Page : /ingenieur-augmente

import { motion } from "framer-motion";

// ─── Icônes ────────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
function IconTrendingUp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

// ─── SectionLabel ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-[color:var(--color-badge-blue-bg)] border border-[color:var(--color-badge-blue-border)] w-fit">
      <span className="size-2 rounded-full bg-badge-blue shrink-0" style={{ boxShadow: "var(--shadow-badge-dot)" }} />
      <span className="font-body font-semibold text-badge-blue tracking-[1.8px] text-[length:var(--text-badge)] leading-4 uppercase whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: "01",
    icon: <IconSearch />,
    title: "Audit & cartographie",
    description:
      "Nous cartographions vos processus existants et identifions les zones d'automatisation à haute valeur. Aucun investissement sans ROI prévisible.",
    tags: ["Analyse des flux", "Détection d'automatisables"],
  },
  {
    number: "02",
    icon: <IconLayers />,
    title: "Intégration modulaire",
    description:
      "Les modules IA se greffent sur votre stack sans réécriture — RAG, agents LLM, classification, OCR. Votre code existant reste le socle.",
    tags: ["RAG", "LLM", "OCR", "Zero legacy debt"],
  },
  {
    number: "03",
    icon: <IconTrendingUp />,
    title: "Déploiement & feedback loop",
    description:
      "Mise en production maîtrisée par phases. Chaque déploiement embarque une boucle de mesure — pour ajuster, améliorer, et prouver la valeur.",
    tags: ["A/B testing", "Monitoring IA", "Amélioration continue"],
  },
];

// ─── LayersIllustration ────────────────────────────────────────────────────

function LayersIllustration() {
  const layers = [
    { label: "Interface utilisateur", sublabel: "React · Next.js · Mobile", color: "var(--color-badge-blue)", depth: 0, featured: false },
    { label: "Module IA", sublabel: "RAG · LLM · Classification", color: "var(--color-brand-orange-light)", depth: 1, featured: true },
    { label: "Données & APIs", sublabel: "REST · GraphQL · Bases vectorielles", color: "var(--color-offer-green)", depth: 2, featured: false },
  ];
  return (
    <div className="relative flex flex-col gap-3 w-full">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          className="relative flex items-center gap-4 px-5 py-4 rounded-[var(--radius-input)] border"
          style={{
            background: layer.featured
              ? "linear-gradient(135deg, rgba(255,182,146,0.1) 0%, rgba(67,70,116,0.25) 100%)"
              : "rgba(67,70,116,0.15)",
            borderColor: layer.featured ? "rgba(255,182,146,0.3)" : "rgba(255,255,255,0.08)",
            marginLeft: `${i * 12}px`,
          }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
        >
          <div className="shrink-0 w-[3px] h-8 rounded-full" style={{ background: layer.color }} />
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="font-sans font-semibold text-text-heading truncate" style={{ fontSize: "var(--text-nav)" }}>
              {layer.label}
            </span>
            <span className="font-body text-text-body-warm opacity-70 truncate" style={{ fontSize: "var(--text-label)" }}>
              {layer.sublabel}
            </span>
          </div>
          {layer.featured && (
            <span
              className="shrink-0 px-2.5 py-1 rounded-full font-ui font-bold uppercase"
              style={{
                fontSize: "var(--text-sector-badge)",
                letterSpacing: "var(--text-sector-badge--letter-spacing)",
                color: layer.color,
                background: "rgba(255,182,146,0.12)",
                border: "1px solid rgba(255,182,146,0.25)",
              }}
            >
              IA
            </span>
          )}
        </motion.div>
      ))}
      {/* Connecteurs verticaux */}
      <div
        aria-hidden="true"
        className="absolute left-[18px] top-[56px] w-[1px] pointer-events-none"
        style={{ height: "calc(100% - 80px)", background: "linear-gradient(to bottom, var(--color-badge-blue), var(--color-offer-green))", opacity: 0.2 }}
      />
    </div>
  );
}

// ─── Composant ─────────────────────────────────────────────────────────────

export function SectionAppsAugmentees() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      {/* Halo orange en fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.04]"
        style={{ background: "var(--color-brand-orange)" }}
      />

      <div className="relative max-w-[1280px] mx-auto flex flex-col gap-16">
        {/* En-tête */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>INTÉGRATION IA</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="font-sans font-bold text-text-heading"
              style={{ fontSize: "var(--text-card-title)", lineHeight: "var(--text-card-title--line-height)" }}
            >
              {"Vos applications,\naugmentées par l'IA."}
            </h2>
            <p
              className="font-body text-text-body-warm opacity-80 max-w-[380px]"
              style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)" }}
            >
              Pas de réécriture, pas de big bang. Les modules IA s'intègrent proprement à votre stack existante.
            </p>
          </div>
        </motion.div>

        {/* Layout 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Gauche — 3 piliers numérotés */}
          <div className="flex flex-col gap-0">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                className="flex gap-6 py-8 border-b border-white/[0.06]"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <span
                  className="shrink-0 font-sans font-bold text-text-body-warm opacity-25 leading-none"
                  style={{ fontSize: "var(--text-card-title)", lineHeight: 1 }}
                >
                  {pillar.number}
                </span>
                <div className="flex flex-col gap-3 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[color:var(--color-badge-blue-bg)] text-badge-blue shrink-0">
                      {pillar.icon}
                    </div>
                    <h3 className="font-sans font-semibold text-text-heading" style={{ fontSize: "var(--text-nav)" }}>
                      {pillar.title}
                    </h3>
                  </div>
                  <p
                    className="font-body text-text-body-warm opacity-80"
                    style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)" }}
                  >
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full font-ui font-semibold uppercase"
                        style={{
                          fontSize: "var(--text-sector-badge)",
                          letterSpacing: "var(--text-sector-badge--letter-spacing)",
                          color: "var(--color-text-light)",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Droite — stack layers + stat */}
          <motion.div
            className="flex flex-col gap-6 lg:pt-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div
              className="flex flex-col gap-5 p-7 rounded-[var(--radius-card)] border border-white/10"
              style={{ background: "rgba(67,70,116,0.12)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans font-semibold text-text-heading" style={{ fontSize: "var(--text-nav)" }}>
                  Architecture type
                </span>
                <span
                  className="px-2.5 py-1 rounded-full font-ui font-semibold uppercase text-badge-blue bg-[color:var(--color-badge-blue-bg)]"
                  style={{ fontSize: "var(--text-sector-badge)", letterSpacing: "var(--text-sector-badge--letter-spacing)" }}
                >
                  Zero legacy debt
                </span>
              </div>
              <LayersIllustration />
            </div>

            <div
              className="flex items-center gap-5 px-7 py-5 rounded-[var(--radius-input)] border border-white/10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="font-sans font-bold text-badge-blue shrink-0" style={{ fontSize: "var(--text-card-title)", lineHeight: 1 }}>
                -40%
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans font-semibold text-text-heading" style={{ fontSize: "var(--text-nav)" }}>
                  de temps de développement moyen
                </span>
                <span className="font-body text-text-body-warm opacity-70" style={{ fontSize: "var(--text-label)" }}>
                  Par rapport à une intégration IA from-scratch sans méthodologie.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
