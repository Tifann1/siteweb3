"use client";

// SectionCopilote — L'IA comme copilote au quotidien (bento grid)
// Page : /ingenieur-augmente

import { motion } from "framer-motion";

// ─── Icônes ────────────────────────────────────────────────────────────────

function IconCpu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="12" y1="7" x2="16" y2="7" /><line x1="12" y1="11" x2="16" y2="11" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h12M6 2l-2 6h16l-2-6M4 8c0 6 8 12 8 12s8-6 8-12" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
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

const CAPABILITIES = [
  {
    icon: <IconZap />,
    title: "Code Generation",
    description: "Génération de boilerplate, stubs et tests. Les ingénieurs se concentrent sur la logique métier.",
    badge: "+40% vitesse",
    color: "var(--color-brand-orange-light)",
    wide: true,
  },
  {
    icon: <IconShield />,
    title: "Review & Qualité",
    description: "IA pair-reviewer : détection des patterns à risque, revue sécurité avant chaque merge.",
    badge: "0 dette cachée",
    color: "var(--color-badge-blue)",
    wide: false,
  },
  {
    icon: <IconBook />,
    title: "Docs vivantes",
    description: "Génération de documentation technique synchronisée avec le code en temps réel.",
    badge: "×5 lisibilité",
    color: "var(--color-offer-green)",
    wide: false,
  },
  {
    icon: <IconFlask />,
    title: "Tests prédictifs",
    description: "Identification des cas limites par analyse sémantique. Couverture maximale sans effort manuel.",
    badge: "+95% coverage",
    color: "var(--color-brand-orange-light)",
    wide: false,
  },
  {
    icon: <IconRocket />,
    title: "CI/CD augmentée",
    description: "Pipelines intelligents adaptatifs. Déploiements rapides, rollbacks prédictifs.",
    badge: "-60% incidents",
    color: "var(--color-badge-blue)",
    wide: true,
  },
  {
    icon: <IconUsers />,
    title: "Knowledge Sharing",
    description: "IA qui capitalise les décisions d'architecture et les partage aux équipes en temps réel.",
    badge: "0 silo",
    color: "var(--color-offer-green)",
    wide: false,
  },
];

// ─── Composant ─────────────────────────────────────────────────────────────

export function SectionCopilote() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
        {/* En-tête */}
        <motion.div
          className="flex flex-col gap-4 max-w-[640px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>AU QUOTIDIEN</SectionLabel>
          <h2
            className="font-sans font-bold text-text-heading"
            style={{ fontSize: "var(--text-card-title)", lineHeight: "var(--text-card-title--line-height)" }}
          >
            {"L'IA comme copilote\nau quotidien."}
          </h2>
          <p
            className="font-body text-text-body-warm opacity-80"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--text-body-lg--line-height)" }}
          >
            Chaque ingénieur DevFun dispose d'un arsenal IA intégré à son workflow — de la première ligne de code au déploiement en production.
          </p>
        </motion.div>

        {/* Bento grid principale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured card — grande, à gauche */}
          <motion.div
            className="relative lg:col-span-4 lg:row-span-2 flex flex-col justify-between gap-10 p-8 rounded-[var(--radius-card)] border border-white/10 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(255,182,146,0.08) 0%, rgba(67,70,116,0.18) 50%, rgba(9,15,66,0) 100%)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Barre top accent */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 w-1/2 h-[2px]"
              style={{ background: "linear-gradient(90deg, var(--color-brand-orange-light), transparent)" }}
            />
            {/* Watermark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 right-4 font-sans font-bold select-none leading-none"
              style={{ fontSize: "9rem", color: "var(--color-brand-orange-light)", opacity: 0.05 }}
            >
              IA
            </span>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-input)] bg-[color:var(--color-badge-blue-bg)] text-badge-blue">
                <IconCpu />
              </div>
              <h3
                className="font-sans font-bold text-text-heading"
                style={{ fontSize: "var(--text-tab)", lineHeight: 1.3 }}
              >
                L'ingénieur passe 4× plus de temps sur ce qui compte.
              </h3>
              <p
                className="font-body text-text-body-warm opacity-80"
                style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)" }}
              >
                Pas de boilerplate, pas de docs à rédiger manuellement, pas de tests répétitifs. L'IA absorbe la friction — l'ingénieur s'occupe de l'architecture et de la valeur métier.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              {["+40%", "×4", "-60%"].map((v, i) => (
                <div key={v} className="flex items-center justify-between py-3 border-t border-white/[0.06]">
                  <span className="font-body text-text-body-warm opacity-70" style={{ fontSize: "var(--text-label)" }}>
                    {["Vitesse d'implémentation", "Temps sur la valeur métier", "Incidents en production"][i]}
                  </span>
                  <span className="font-sans font-bold text-brand-orange-light" style={{ fontSize: "var(--text-stat-value)" }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 6 capability cards */}
          {CAPABILITIES.map((cap, index) => (
            <motion.div
              key={cap.title}
              className={[
                "relative flex flex-col gap-4 p-6 rounded-[var(--radius-card)] border border-white/10 overflow-hidden group",
                cap.wide ? "lg:col-span-5" : "lg:col-span-4",
              ].join(" ")}
              style={{ background: "rgba(67,70,116,0.10)", backdropFilter: "blur(6px)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 + index * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse 80% 60% at 20% 20%, color-mix(in srgb, ${cap.color} 8%, transparent), transparent)` }}
              />

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${cap.color} 12%, transparent)`,
                    color: cap.color,
                    border: `1px solid color-mix(in srgb, ${cap.color} 20%, transparent)`,
                  }}
                >
                  {cap.icon}
                </div>
                <span
                  className="px-2.5 py-1 rounded-full font-ui font-bold shrink-0"
                  style={{
                    fontSize: "var(--text-sector-badge)",
                    letterSpacing: "var(--text-sector-badge--letter-spacing)",
                    color: cap.color,
                    background: `color-mix(in srgb, ${cap.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${cap.color} 20%, transparent)`,
                  }}
                >
                  {cap.badge}
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-text-heading" style={{ fontSize: "var(--text-nav)" }}>
                  {cap.title}
                </h3>
                <p
                  className="font-body text-text-body-warm opacity-80"
                  style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}
                >
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
