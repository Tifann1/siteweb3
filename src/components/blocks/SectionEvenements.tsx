"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EvenementItem {
  id: string;
  title: string;
  description: string;
  date: { day: string; month: string; year: string };
  location: string;
  tags: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

interface SectionEvenementsProps {
  title?: string;
  subtitle?: string;
  ctaAllLabel?: string;
  ctaAllHref?: string;
  /** 1 à 4 événements — le premier est mis en avant (featured) */
  items: EvenementItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// Couleurs d'accentuation pour les tags (cycle par index)
const TAG_ACCENTS: { bg: string; border: string; text: string }[] = [
  {
    bg: "rgba(255,126,51,0.12)",
    border: "rgba(255,182,146,0.35)",
    text: "var(--color-brand-orange-light)",
  },
  {
    bg: "rgba(116,116,255,0.12)",
    border: "rgba(116,116,255,0.35)",
    text: "var(--color-bento-dev-accent)",
  },
  {
    bg: "rgba(230,173,0,0.12)",
    border: "rgba(230,173,0,0.35)",
    text: "var(--color-bento-devops-border)",
  },
  {
    bg: "rgba(70,186,135,0.12)",
    border: "rgba(70,186,135,0.35)",
    text: "var(--color-offer-green)",
  },
];

// Couleurs d'accentuation des cartes compactes (featured = orange, rest = blue/yellow/green)
const COMPACT_ACCENTS = [
  "var(--color-brand-orange-light)",
  "var(--color-bento-devops-border)",
  "var(--color-offer-green)",
];

// ─── Icônes ───────────────────────────────────────────────────────────────────

function PinIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M6 1a3.5 3.5 0 0 1 3.5 3.5c0 2.333-3.5 6.5-3.5 6.5S2.5 6.833 2.5 4.5A3.5 3.5 0 0 1 6 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="4.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M10 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── TagPill ──────────────────────────────────────────────────────────────────

function TagPill({
  label,
  colorIndex,
}: {
  label: string;
  colorIndex: number;
}) {
  const c = TAG_ACCENTS[colorIndex % TAG_ACCENTS.length];
  return (
    <span
      className="inline-flex items-center px-3 py-[3px] rounded-full font-ui font-semibold uppercase"
      style={{
        fontSize: "var(--text-sector-badge)",
        letterSpacing: "var(--text-sector-badge--letter-spacing)",
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
      }}
    >
      {label}
    </span>
  );
}

// ─── FeaturedEventCard ────────────────────────────────────────────────────────

function FeaturedEventCard({ item }: { item: EvenementItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative flex h-full flex-col justify-between overflow-hidden bg-card-bg border border-white/10 md:col-span-2 group cursor-default"
      style={{
        borderRadius: "var(--radius-card)",
        padding: "2.5rem",
        borderTop: "2px solid var(--color-brand-orange)",
        backgroundImage:
          "linear-gradient(145deg, rgba(255,126,51,0.07) 0%, transparent 50%)",
      }}
    >
      {/* Watermark jour */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-4 font-sans font-bold text-white select-none leading-none"
        style={{ fontSize: "11rem", opacity: 0.04 }}
      >
        {item.date.day}
      </span>

      {/* Overlay hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          borderRadius: "var(--radius-card)",
          background:
            "linear-gradient(145deg, rgba(255,126,51,0.1) 0%, transparent 55%)",
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col gap-6 h-full">
        {/* Top row : date pill + location */}
        <div className="flex items-start justify-between gap-4">
          {/* Date pill */}
          <div
            className="flex flex-col items-center justify-center px-5 py-3 shrink-0"
            style={{
              borderRadius: "var(--radius-offer-btn)",
              backgroundColor: "rgba(255,126,51,0.15)",
              border: "1px solid rgba(255,126,51,0.3)",
            }}
          >
            <span
              className="font-sans font-bold leading-none"
              style={{
                fontSize: "var(--text-stat-value)",
                color: "var(--color-brand-orange-light)",
              }}
            >
              {item.date.day}
            </span>
            <span
              className="font-ui font-semibold uppercase tracking-widest mt-1"
              style={{
                fontSize: "var(--text-sector-badge)",
                color: "var(--color-brand-orange-light)",
              }}
            >
              {item.date.month}
            </span>
            <span
              className="font-ui"
              style={{
                fontSize: "var(--text-sector-badge)",
                color: "var(--color-text-light)",
              }}
            >
              {item.date.year}
            </span>
          </div>

          {/* Location */}
          <div
            className="flex items-center gap-1.5 mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            <PinIcon />
            <span
              className="font-body"
              style={{ fontSize: "var(--text-label)" }}
            >
              {item.location}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, ti) => (
            <TagPill key={tag} label={tag} colorIndex={ti} />
          ))}
        </div>

        {/* Title + description — poussés en bas */}
        <div className="flex flex-col gap-4 mt-auto">
          <h3
            className="font-sans font-bold text-text-heading"
            style={{
              fontSize: "var(--text-card-title)",
              lineHeight: "var(--text-card-title--line-height)",
            }}
          >
            {item.title}
          </h3>
          <p
            className="font-body text-text-body-warm max-w-[480px]"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
              opacity: 0.85,
            }}
          >
            {item.description}
          </p>
        </div>

        {/* CTA */}
        {item.ctaHref && (
          <Link
            href={item.ctaHref}
            className="self-start flex items-center gap-2 font-ui font-semibold transition-opacity hover:opacity-80 mt-2"
            style={{
              fontSize: "var(--text-nav)",
              color: "var(--color-brand-orange-light)",
            }}
          >
            {item.ctaLabel ?? "S'inscrire"}
            <ArrowIcon />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

// ─── CompactEventCard ─────────────────────────────────────────────────────────

function CompactEventCard({
  item,
  index,
}: {
  item: EvenementItem;
  index: number;
}) {
  const accent = COMPACT_ACCENTS[(index - 1) % COMPACT_ACCENTS.length];

  return (
    <motion.article
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.18, ease: "easeOut" } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.48, delay: index * 0.1, ease: EASE }}
      className="relative flex flex-col gap-3 overflow-hidden bg-card-bg border border-white/10 flex-1 group cursor-default"
      style={{
        borderRadius: "var(--radius-offer-card)",
        padding: "1.25rem 1.5rem",
        borderTop: `2px solid ${accent}`,
      }}
    >
      {/* Watermark jour */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-3 font-sans font-bold text-white select-none leading-none"
        style={{ fontSize: "5rem", opacity: 0.04 }}
      >
        {item.date.day}
      </span>

      {/* Date + location row */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span
            className="font-sans font-bold leading-none"
            style={{ fontSize: "var(--text-tab)", color: accent }}
          >
            {item.date.day}
          </span>
          <span
            className="font-ui font-semibold uppercase tracking-widest"
            style={{
              fontSize: "var(--text-sector-badge)",
              color: "var(--color-text-light)",
            }}
          >
            {item.date.month} {item.date.year}
          </span>
        </div>
        <div
          className="flex items-center gap-1 shrink-0"
          style={{ color: "var(--color-text-muted)" }}
        >
          <PinIcon />
          <span
            className="font-body"
            style={{ fontSize: "var(--text-sector-badge)" }}
          >
            {item.location}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-sans font-bold text-text-heading relative z-10"
        style={{ fontSize: "var(--text-nav)", lineHeight: 1.35 }}
      >
        {item.title}
      </h3>

      {/* Tags (max 2) */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {item.tags.slice(0, 2).map((tag, ti) => (
          <TagPill key={tag} label={tag} colorIndex={index + ti} />
        ))}
      </div>

      {/* CTA */}
      {item.ctaHref && (
        <Link
          href={item.ctaHref}
          className="relative z-10 self-start flex items-center gap-1.5 font-ui font-semibold transition-opacity hover:opacity-80"
          style={{ fontSize: "var(--text-label)", color: accent }}
        >
          {item.ctaLabel ?? "S'inscrire"}
          <ArrowIcon />
        </Link>
      )}
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function SectionEvenements({
  title = "Événements.",
  subtitle = "Rencontrez nos experts, participez aux échanges.",
  ctaAllLabel = "Voir tous les événements",
  ctaAllHref = "#evenements",
  items,
}: SectionEvenementsProps) {
  const [featured, ...rest] = items;

  return (
    <section
      className="w-full bg-nav-bg py-20 md:py-28"
      style={{
        paddingLeft: "var(--page-margin-x)",
        paddingRight: "var(--page-margin-x)",
      }}
    >
      <div className="flex flex-col gap-12 max-w-[1280px] mx-auto w-full">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-end justify-between gap-6 flex-wrap"
        >
          <div className="flex flex-col gap-3">
            <h2
              className="font-sans font-bold text-white"
              style={{
                fontSize: "var(--text-card-title)",
                lineHeight: "var(--text-card-title--line-height)",
              }}
            >
              {title}
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: "var(--text-nav)",
                lineHeight: "var(--text-nav--line-height)",
                color: "var(--color-text-light)",
              }}
            >
              {subtitle}
            </p>
          </div>

          {ctaAllLabel && (
            <Link
              href={ctaAllHref}
              className="flex items-center gap-2 font-sans text-brand-orange-light shrink-0 transition-opacity hover:opacity-80"
              style={{ fontSize: "var(--text-tab)" }}
            >
              {ctaAllLabel}
              <ArrowIcon />
            </Link>
          )}
        </motion.div>

        {/* Grille : featured (2/3) + colonne compacte (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured && <FeaturedEventCard item={featured} />}

          {rest.length > 0 && (
            <div className="flex flex-col gap-4 col-span-1">
              {rest.slice(0, 3).map((item, i) => (
                <CompactEventCard key={item.id} item={item} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
