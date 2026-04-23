'use client'

// SectionDirecteurPole — Présentation éditoriale du directeur de pôle
// Layout : vidéo gauche 42% / contenu droit
// Entrée : useInView → contenu slide depuis la droite, vision staggerée en temps fixe

import { useRef } from "react"
import { motion, useInView, MotionConfig } from "framer-motion"
import { Link } from "@/navigation"

const DIRECTOR_VIDEO = "/videos/directeur.mp4"

export interface DirectorStat {
  value: string
  label: string
}

export interface SectionDirecteurPoleProps {
  name: string
  role: string
  /** Gardé pour compatibilité — la vidéo remplace la photo */
  imageSrc?: string
  imageAlt?: string
  poleLabel: string
  accentColor: string
  badgeColor?: string
  vision: string
  stats: DirectorStat[]
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function SectionDirecteurPole({
  name,
  role,
  poleLabel,
  accentColor,
  badgeColor,
  vision,
  stats,
  ctaLabel,
  ctaHref = "#",
  className,
}: SectionDirecteurPoleProps) {
  const badge = badgeColor ?? accentColor
  const ref = useRef<HTMLDivElement>(null)

  // Déclenche une seule fois quand le composant entre dans le viewport
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const words = vision.split(" ")

  return (
    <MotionConfig reducedMotion="user">
      {/* ── Desktop ────────────────────────────────────────────── */}
      <section
        ref={ref}
        className={["relative hidden md:block py-16 md:py-24", className ?? ""].join(" ")}
        style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
      >
        <div
          className="relative flex overflow-hidden w-full max-w-[1280px] mx-auto bg-deep-navy rounded-[var(--radius-card)]"
          style={{ minHeight: "520px" }}
        >
          {/* ── Vidéo gauche — 42% fixe ──────────────────────── */}
          <div className="relative w-[42%] shrink-0 self-stretch">
            <video
              src={DIRECTOR_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dégradé bas vers la couleur du pôle */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to bottom,
                  transparent 35%,
                  color-mix(in srgb, ${accentColor} 10%, transparent) 70%,
                  color-mix(in srgb, ${accentColor} 22%, var(--color-deep-navy)) 100%
                )`,
              }}
            />

            {/* Fondu latéral droit vers le fond */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 55%, var(--color-deep-navy) 100%)",
              }}
            />

            {/* Badge pôle */}
            <div className="absolute left-6 top-6">
              <div
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: "var(--color-nav-bg)",
                  border: `1px solid color-mix(in srgb, ${badge} 60%, transparent)`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: badge, boxShadow: `0 0 8px 0 ${badge}` }}
                />
                <span
                  className="font-ui font-bold uppercase"
                  style={{
                    color: badge,
                    fontSize: "var(--text-badge)",
                    letterSpacing: "var(--text-badge--letter-spacing)",
                  }}
                >
                  Pôle {poleLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ── Contenu droit — slide depuis la droite ─────────── */}
          <motion.div
            className="relative flex flex-1 flex-col justify-center gap-10 px-12 py-16 lg:px-16 lg:py-20"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Identité */}
            <div className="flex flex-col gap-1">
              <h2
                className="font-sans font-bold text-text-heading"
                style={{
                  fontSize: "var(--text-card-title)",
                  lineHeight: "var(--text-card-title--line-height)",
                }}
              >
                {name}
              </h2>
              <p
                className="font-sans text-text-light"
                style={{
                  fontSize: "var(--text-nav)",
                  lineHeight: "var(--text-nav--line-height)",
                }}
              >
                {role}
              </p>
            </div>

            {/* Vision — stagger temps fixe, tous les mots en ~0.6s */}
            <blockquote className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="select-none font-sans font-bold leading-none"
                style={{ color: accentColor, fontSize: "4.5rem", lineHeight: "0.5", opacity: 0.4 }}
              >
                &ldquo;
              </span>
              <p
                className="font-body italic text-text-body-warm"
                style={{
                  fontSize: "var(--text-body-lg)",
                  lineHeight: "var(--text-body-lg--line-height)",
                  maxWidth: "52ch",
                }}
              >
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0.1 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0.1 }}
                    transition={{
                      // délai décalé de 40ms par mot, commençant après le slide du contenu
                      delay: 0.3 + i * 0.04,
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </blockquote>

            {/* Stats */}
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))" }}
            >
              {stats.slice(0, 2).map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 rounded-[var(--radius-input)] px-5 py-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(67,70,116,0.5) 0%, rgba(9,15,66,0.65) 100%)",
                    border: `1px solid color-mix(in srgb, ${accentColor} 30%, rgba(255,255,255,0.08))`,
                    boxShadow:
                      "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="font-body font-bold"
                    style={{
                      color: "var(--color-text-heading)",
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
              ))}
            </div>

            {/* CTA */}
            {ctaLabel && (
              <div>
                <Link
                  href={ctaHref}
                  className="group relative inline-flex items-center justify-center gap-3 rounded-[var(--radius-pill-sm)] border px-[17px] py-[9px] font-sans text-white shadow-[var(--shadow-cta)] transition-all"
                  style={{
                    borderColor: accentColor,
                    fontSize: "var(--text-nav)",
                    lineHeight: "var(--text-nav--line-height)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}, color-mix(in srgb, ${accentColor} 55%, white))`,
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    {ctaLabel}
                    <ArrowRightIcon />
                  </span>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Mobile ─────────────────────────────────────────────── */}
      <section
        className={["relative py-16 md:hidden", className ?? ""].join(" ")}
        style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
      >
        <div className="relative flex flex-col overflow-hidden max-w-[1280px] mx-auto bg-deep-navy rounded-[var(--radius-card)]">
          {/* Vidéo mobile */}
          <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
            <video
              src={DIRECTOR_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, var(--color-deep-navy) 100%)",
              }}
            />
            <div className="absolute left-4 top-4">
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  backgroundColor: "var(--color-nav-bg)",
                  border: `1px solid color-mix(in srgb, ${badge} 60%, transparent)`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: badge }}
                />
                <span
                  className="font-ui font-bold uppercase"
                  style={{
                    color: badge,
                    fontSize: "var(--text-badge)",
                    letterSpacing: "var(--text-badge--letter-spacing)",
                  }}
                >
                  Pôle {poleLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Contenu mobile */}
          <div className="flex flex-col gap-8 px-6 py-10">
            <div className="flex flex-col gap-1">
              <h2
                className="font-sans font-bold text-text-heading"
                style={{
                  fontSize: "var(--text-card-title)",
                  lineHeight: "var(--text-card-title--line-height)",
                }}
              >
                {name}
              </h2>
              <p className="font-sans text-text-light" style={{ fontSize: "var(--text-nav)" }}>
                {role}
              </p>
            </div>

            <blockquote className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="select-none font-sans font-bold leading-none"
                style={{ color: accentColor, fontSize: "4.5rem", lineHeight: "0.5", opacity: 0.4 }}
              >
                &ldquo;
              </span>
              <p
                className="font-body italic text-text-body-warm"
                style={{
                  fontSize: "var(--text-body-lg)",
                  lineHeight: "var(--text-body-lg--line-height)",
                }}
              >
                {vision}
              </p>
            </blockquote>

            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {stats.slice(0, 2).map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 rounded-[var(--radius-input)] px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(67,70,116,0.5) 0%, rgba(9,15,66,0.65) 100%)",
                    border: `1px solid color-mix(in srgb, ${accentColor} 30%, rgba(255,255,255,0.08))`,
                  }}
                >
                  <span
                    className="font-body font-bold"
                    style={{
                      color: "var(--color-text-heading)",
                      fontSize: "var(--text-stat-value)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-ui font-semibold uppercase text-text-light"
                    style={{ fontSize: "var(--text-label)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {ctaLabel && (
              <Link
                href={ctaHref}
                className="group relative inline-flex items-center justify-center gap-3 self-start rounded-[var(--radius-pill-sm)] border px-[17px] py-[9px] font-sans text-white transition-all"
                style={{ borderColor: accentColor, fontSize: "var(--text-nav)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, color-mix(in srgb, ${accentColor} 55%, white))`,
                  }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  {ctaLabel}
                  <ArrowRightIcon />
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
