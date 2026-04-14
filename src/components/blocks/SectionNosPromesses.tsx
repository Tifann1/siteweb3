"use client";

// SectionNosPromesses — Bento grid asymétrique pour la page accueil
// Remplace l'IntegrationSchema dans la section "Nos promesses."

import { motion } from "framer-motion";

export interface PromiseItem {
  /** Petite étiquette au-dessus du titre (ex: "Notre différence", "Paris · France") */
  eyebrow?: string;
  title: string;
  description: string;
  /** Chiffre-clé affiché en bas de la carte */
  stat?: { value: string; label: string };
  /** Points concrets (liste à puce) — idéal pour les cartes larges */
  highlights?: string[];
  /** Couleur d'accentuation : bordure top + eyebrow + stat */
  accent?: "orange" | "blue" | "default";
}

interface SectionNosPromessesProps {
  title?: string;
  description?: string;
  /** Exactement 6 items pour le layout bento 3×2 */
  items: PromiseItem[];
}

// Styles d'accentuation par type
const ACCENT = {
  orange: {
    topBorder: "2px solid var(--color-brand-orange)",
    eyebrow: "var(--color-brand-orange-light)",
    stat: "var(--color-brand-orange)",
    bgImage:
      "linear-gradient(140deg, rgba(255, 126, 51, 0.09) 0%, transparent 55%)",
  },
  blue: {
    topBorder: "2px solid var(--color-bento-dev-accent)",
    eyebrow: "var(--color-bento-dev-accent)",
    stat: "var(--color-bento-dev-accent)",
    bgImage:
      "linear-gradient(140deg, rgba(116, 116, 255, 0.08) 0%, transparent 55%)",
  },
  default: {
    topBorder: undefined,
    eyebrow: "var(--color-text-muted)",
    stat: "var(--color-text-heading)",
    bgImage: undefined,
  },
} as const;

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-[3px]"
    >
      <path
        d="M2 7l3.5 3.5L12 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PromiseCard({
  item,
  index,
  wide,
}: {
  item: PromiseItem;
  index: number;
  wide: boolean;
}) {
  const a = ACCENT[item.accent ?? "default"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.18, ease: "easeOut" } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.48,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="h-full flex flex-col justify-between gap-6 border border-white/5 bg-card-bg cursor-default"
      style={{
        borderRadius: "var(--radius-card)",
        padding: wide ? "2.5rem" : "2rem",
        ...(a.topBorder ? { borderTop: a.topBorder } : {}),
        ...(a.bgImage ? { backgroundImage: a.bgImage } : {}),
      }}
    >
      {/* Contenu principal */}
      <div className="flex flex-col gap-5">
        {item.eyebrow && (
          <span
            className="font-ui font-semibold uppercase tracking-widest"
            style={{
              fontSize: "var(--text-label)",
              lineHeight: 1,
              color: a.eyebrow,
            }}
          >
            {item.eyebrow}
          </span>
        )}

        <div className="flex flex-col gap-3">
          <h3
            className="font-sans font-bold text-text-heading"
            style={{
              fontSize: wide ? "var(--text-tab)" : "var(--text-nav)",
              lineHeight: 1.25,
            }}
          >
            {item.title}
          </h3>
          <p
            className="font-body text-text-body-warm"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
              opacity: 0.85,
            }}
          >
            {item.description}
          </p>
        </div>

        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 mt-1">
            {item.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-text-body-warm"
              >
                <span className="text-brand-orange">
                  <CheckIcon />
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: "var(--text-nav)",
                    lineHeight: "var(--text-nav--line-height)",
                    opacity: 0.85,
                  }}
                >
                  {h}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stat — collé en bas */}
      {item.stat && (
        <div className="flex flex-col gap-1 pt-5 border-t border-white/10">
          <span
            className="font-sans font-bold"
            style={{
              fontSize: "var(--text-stat-value)",
              lineHeight: "var(--text-stat-value--line-height)",
              color: a.stat,
            }}
          >
            {item.stat.value}
          </span>
          <span
            className="font-body text-text-muted"
            style={{ fontSize: "var(--text-label)", lineHeight: 1.5 }}
          >
            {item.stat.label}
          </span>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Section "Nos promesses" en bento grid asymétrique.
 *
 * Layout 3 colonnes, zigzag :
 *   Row 1 : [0 ── wide ──] [1 narrow]
 *   Row 2 : [2 narrow] [3 ──── wide ────]
 *   Row 3 : [4 ── wide ──] [5 narrow]
 *
 * Passe exactement 6 items dans la prop `items`.
 */
export function SectionNosPromesses({
  title = "Nos promesses.",
  description = "Ce qui nous différencie, concrètement.",
  items,
}: SectionNosPromessesProps) {
  return (
    <section
      className="w-full py-20 md:py-28"
      style={{
        paddingLeft: "var(--page-margin-x)",
        paddingRight: "var(--page-margin-x)",
      }}
    >
      <div className="flex flex-col gap-12 max-w-[1280px] mx-auto w-full">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-4"
        >
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
            className="font-body text-text-body-warm max-w-[500px]"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
              opacity: 0.85,
            }}
          >
            {description}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.slice(0, 6).map((item, index) => {
            // Indices larges : 0, 3, 4 → col-span-2
            // Indices étroits : 1, 2, 5 → col-span-1
            const isWide = index === 0 || index === 3 || index === 4;
            return (
              <div
                key={index}
                className={[
                  "col-span-1",
                  isWide ? "md:col-span-2" : "md:col-span-1",
                ].join(" ")}
              >
                <PromiseCard item={item} index={index} wide={isWide} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
