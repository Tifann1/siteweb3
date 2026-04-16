"use client";

import { motion, MotionConfig } from "framer-motion";
import { KineticText } from "@/components/ui/KineticText";
import { HeroHalos } from "@/components/blocks/HeroHalos";
import { Link } from "@/navigation";

const SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroAugmented() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative flex flex-col justify-center overflow-hidden min-h-screen bg-nav-bg"
        aria-label="Hero — L'Ingénieur Augmenté"
      >
        <HeroHalos />

        <div
          className="relative z-10 flex flex-col w-full"
          style={{
            paddingTop: "calc(var(--header-height) + 4rem)",
            paddingLeft: "var(--page-margin-x)",
            paddingRight: "var(--page-margin-x)",
            paddingBottom: "6rem",
            gap: "2.5rem",
          }}
        >
          {/* Badge eyebrow */}
          <motion.div
            className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-[color:var(--color-badge-blue-bg)] border border-[color:var(--color-badge-blue-border)] w-fit"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: SPRING }}
          >
            <span
              className="size-2 rounded-full bg-badge-blue shrink-0"
              style={{ boxShadow: "var(--shadow-badge-dot)" }}
            />
            <span className="font-body font-semibold text-badge-blue tracking-[1.8px] text-[length:var(--text-badge)] leading-4 uppercase whitespace-nowrap">
              L&apos;INGÉNIEUR AUGMENTÉ
            </span>
          </motion.div>

          {/* Titre — lignes 1 & 3 en kinetic char par char, ligne 2 en bloc gradient */}
          <h1
            className="font-sans font-bold text-text-heading leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "-0.03em",
            }}
          >
            <span className="block">
              <KineticText
                text="L'humain et l'IA,"
                initialDelay={0.1}
                delayPerChar={0.025}
              />
            </span>

            {/* Mot gradient animé en bloc (le gradient doit couvrir le mot entier) */}
            <motion.span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: SPRING, delay: 0.7 }}
            >
              ensemble
            </motion.span>

            <span className="block">
              <KineticText
                text="plus forts."
                initialDelay={1.1}
                delayPerChar={0.035}
              />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="font-body text-text-body-warm opacity-80 max-w-[600px]"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: SPRING, delay: 1.6 }}
          >
            Nous ne remplaçons pas l&apos;ingénieur — nous l&apos;augmentons.
            Découvrez comment l&apos;IA amplifie notre expertise pour livrer
            plus vite, mieux et de manière plus fiable.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: SPRING, delay: 1.9 }}
          >
            <Link
              href="/contact"
              data-cursor-reactive
              className="relative flex items-center justify-center px-8 py-4 rounded-[var(--radius-input)] font-sans font-semibold text-cta-text-dark text-[length:var(--text-nav)] transition-opacity hover:opacity-90"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-brand-orange-cta-from) 0%, var(--color-brand-orange-cta-to) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[var(--radius-input)]"
                style={{
                  boxShadow:
                    "0px 20px 30px -8px rgba(255,126,51,0.35), 0px 8px 12px -4px rgba(255,126,51,0.2)",
                }}
              />
              Discutons de votre projet
            </Link>

            <Link
              href="/references"
              className="flex items-center gap-2 px-8 py-4 rounded-[var(--radius-input)] font-sans text-text-light text-[length:var(--text-nav)] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Voir nos réalisations
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
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          aria-hidden="true"
        >
          <span className="font-body text-text-light/40 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-text-light/30 to-transparent"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
