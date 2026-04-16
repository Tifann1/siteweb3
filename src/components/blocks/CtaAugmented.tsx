"use client";

import { motion, MotionConfig } from "framer-motion";
import { Link } from "@/navigation";

export function CtaAugmented() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative overflow-hidden bg-nav-bg"
        style={{
          paddingTop: "8rem",
          paddingBottom: "8rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
        aria-label="Appel à l'action"
      >
        {/* Halo orange centré en fond */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="w-[700px] h-[400px] rounded-full blur-[120px] opacity-15"
            style={{
              background:
                "radial-gradient(ellipse, #FF7E33 0%, #FFB692 40%, transparent 70%)",
            }}
          />
        </div>

        {/* Ligne décorative en haut */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" aria-hidden="true" />

        <motion.div
          className="relative z-10 flex flex-col items-center text-center gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <span
            className="font-body font-semibold text-brand-orange uppercase tracking-widest"
            style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
          >
            Prêts à démarrer ?
          </span>

          {/* Titre */}
          <h2
            className="font-sans font-bold text-text-heading max-w-[700px]"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Votre prochain projet
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
              }}
            >
              commence ici.
            </span>
          </h2>

          {/* Description */}
          <p
            className="font-body text-text-body-warm/70 max-w-[500px]"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
            }}
          >
            Audit de stack, premier agent IA, refonte d&apos;architecture — nos
            experts répondent en 24h.
          </p>

          {/* Boutons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              data-cursor-reactive
              className="relative flex items-center justify-center px-10 py-5 rounded-[var(--radius-input)] font-sans font-bold text-cta-text-dark transition-all hover:scale-[1.03]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-brand-orange-cta-from) 0%, var(--color-brand-orange-cta-to) 100%)",
                fontSize: "var(--text-nav)",
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[var(--radius-input)]"
                style={{
                  boxShadow:
                    "0px 24px 40px -8px rgba(255,126,51,0.45), 0px 10px 16px -4px rgba(255,126,51,0.25)",
                }}
              />
              Parlons de votre projet
            </Link>

            <Link
              href="/poles"
              className="flex items-center gap-2 px-10 py-5 rounded-[var(--radius-input)] font-sans text-text-light border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              style={{ fontSize: "var(--text-nav)" }}
            >
              Explorer nos pôles
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
