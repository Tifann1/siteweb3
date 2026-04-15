"use client";

// SectionAgentsFlow — Pipeline "De votre besoin à l'agent IA"
// Page : /ingenieur-augmente

import { motion } from "framer-motion";

// ─── Icônes ────────────────────────────────────────────────────────────────

function IconTarget() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconCpu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" />
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

const FLOW_STEPS = [
  {
    number: "01",
    icon: <IconTarget />,
    title: "Besoin réel client",
    description: "Un problème métier récurrent, documenté sur le terrain. Ce besoin n'est pas hypothétique — il vient d'une mission en cours.",
    output: "Brief validé",
    outputColor: "var(--color-brand-orange-light)",
  },
  {
    number: "02",
    icon: <IconCpu />,
    title: "Conception & prototypage IA",
    description: "Nos ingénieurs conçoivent l'agent, l'itèrent en conditions réelles avec le client, et industrialisent uniquement ce qui fonctionne.",
    output: "Agent fonctionnel",
    outputColor: "var(--color-badge-blue)",
  },
  {
    number: "03",
    icon: <IconPackage />,
    title: "Produit réutilisable",
    description: "L'agent devient un produit documenté, packageable, déployable sur d'autres projets clients sans reconstruire de zéro.",
    output: "Agent packagé",
    outputColor: "var(--color-offer-green)",
  },
];

const STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Composant ─────────────────────────────────────────────────────────────

export function SectionAgentsFlow() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      {/* Grid décoratif en fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-heading) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-heading) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto flex flex-col gap-16">
        {/* En-tête */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4">
            <SectionLabel>NOS AGENTS IA</SectionLabel>
            <h2
              className="font-sans font-bold text-text-heading"
              style={{ fontSize: "var(--text-card-title)", lineHeight: "var(--text-card-title--line-height)" }}
            >
              {"De votre besoin\nà l'agent IA."}
            </h2>
          </div>
          <p
            className="font-body text-text-body-warm opacity-80 max-w-[420px] lg:text-right"
            style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)" }}
          >
            Nos agents ne partent pas d'une spec abstraite — ils émergent d'un problème réel, itèrent avec le client, et deviennent un produit durable.
          </p>
        </motion.div>

        {/* Cartes en pipeline */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="group relative flex flex-col gap-6 p-8 rounded-[var(--radius-card)] border border-white/10 overflow-hidden"
              style={{ background: "rgba(67,70,116,0.12)", backdropFilter: "blur(8px)" }}
              variants={FADE_UP}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Watermark numéro */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-4 font-sans font-bold leading-none select-none"
                style={{ fontSize: "8rem", color: step.outputColor, opacity: 0.06, lineHeight: 1 }}
              >
                {step.number}
              </span>

              {/* Barre accent en haut */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${step.outputColor}, transparent)` }}
              />

              {/* Contenu */}
              <div className="relative z-10 flex flex-col gap-6">
                {/* Numéro + icône */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-sans font-bold"
                    style={{ fontSize: "var(--text-stat-value)", color: step.outputColor, opacity: 0.5 }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-input)]"
                    style={{
                      background: `color-mix(in srgb, ${step.outputColor} 12%, transparent)`,
                      color: step.outputColor,
                      border: `1px solid color-mix(in srgb, ${step.outputColor} 25%, transparent)`,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3
                  className="font-sans font-semibold text-text-heading"
                  style={{ fontSize: "var(--text-tab)", lineHeight: 1.3 }}
                >
                  {step.title}
                </h3>

                <p
                  className="font-body text-text-body-warm"
                  style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)", opacity: 0.8 }}
                >
                  {step.description}
                </p>

                {/* Output tag */}
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/[0.06]">
                  <span
                    className="font-ui font-semibold uppercase"
                    style={{ fontSize: "var(--text-sector-badge)", letterSpacing: "var(--text-sector-badge--letter-spacing)", color: "var(--color-text-muted)" }}
                  >
                    Output
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: step.outputColor }} />
                    <span
                      className="font-ui font-bold uppercase"
                      style={{ fontSize: "var(--text-sector-badge)", letterSpacing: "var(--text-sector-badge--letter-spacing)", color: step.outputColor }}
                    >
                      {step.output}
                    </span>
                  </div>
                </div>
              </div>

              {/* Flèche inter-cartes */}
              {i < FLOW_STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 rounded-full"
                  style={{ background: "var(--color-nav-bg)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <IconArrowRight />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bandeau résultat final */}
        <motion.div
          className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6 rounded-[var(--radius-card)] border border-brand-orange/20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(255,126,51,0.08) 0%, rgba(9,15,66,0) 60%)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          <div className="flex items-center gap-5">
            <span
              className="font-sans font-bold text-brand-orange-light"
              style={{ fontSize: "var(--text-card-title)", lineHeight: 1 }}
            >
              +12
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-sans font-semibold text-text-heading" style={{ fontSize: "var(--text-nav)" }}>
                agents IA déployés en production
              </span>
              <span className="font-body text-text-body-warm opacity-70" style={{ fontSize: "var(--text-label)" }}>
                Chez nos clients, sur des cas d'usage métier réels et mesurés.
              </span>
            </div>
          </div>
          <div className="flex gap-6 shrink-0">
            {[
              { value: "×3", label: "Réutilisation" },
              { value: "6 sem", label: "Time-to-prod moyen" },
              { value: "98%", label: "Taux de satisfaction" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5 text-center">
                <span className="font-sans font-bold text-brand-orange-light" style={{ fontSize: "var(--text-stat-value)" }}>
                  {s.value}
                </span>
                <span
                  className="font-ui font-semibold uppercase text-text-light"
                  style={{ fontSize: "var(--text-sector-badge)", letterSpacing: "var(--text-sector-badge--letter-spacing)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
