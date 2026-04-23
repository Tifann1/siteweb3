"use client";

import { motion } from "framer-motion";
import { RevealTitle } from "@/components/ui/RevealTitle";

export interface PromiseItem {
  eyebrow?: string;
  title: string;
  description: string;
  stat?: { value: string; label: string };
  highlights?: string[];
  accent?: "orange" | "blue" | "default";
}

interface SectionNosPromessesProps {
  title?: string;
  description?: string;
  items: PromiseItem[];
}

const ACCENT_COLOR: Record<string, string> = {
  orange: "var(--color-brand-orange-light)",
  blue:   "var(--color-badge-blue)",
  default: "rgba(255,255,255,0.55)",
};

const NUMBERS = ["01", "02", "03", "04", "05", "06"];

// ─── Icônes par index ──────────────────────────────────────────────────────
function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}
function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

const ICONS = [<IconPin key="pin" />, <IconBox key="box" />, <IconBolt key="bolt" />];

// ─── Card ─────────────────────────────────────────────────────────────────
const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function PromiseCard({ item, index }: { item: PromiseItem; index: number }) {
  const color = ACCENT_COLOR[item.accent ?? "default"];
  const number = NUMBERS[index] ?? "0" + (index + 1);
  const icon = ICONS[index % ICONS.length];

  return (
    <motion.div
      className="group relative flex flex-col gap-6 p-8 rounded-[var(--radius-card)] border border-white/10 overflow-hidden cursor-default"
      style={{ background: "rgba(67,70,116,0.12)", backdropFilter: "blur(8px)" }}
      variants={FADE_UP}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Barre accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Watermark numéro */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-5 font-sans font-bold select-none leading-none"
        style={{ fontSize: "7rem", color, opacity: 0.06 }}
      >
        {number}
      </span>

      {/* Numéro + icône */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="font-sans font-bold"
          style={{ fontSize: "var(--text-stat-value)", color, opacity: 0.5 }}
        >
          {number}
        </span>
        <div
          className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-input)]"
          style={{
            background: `color-mix(in srgb, ${color} 12%, transparent)`,
            color,
            border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col gap-3 flex-1">
        {item.eyebrow && (
          <span
            className="font-ui font-semibold uppercase"
            style={{
              fontSize: "var(--text-sector-badge)",
              letterSpacing: "var(--text-sector-badge--letter-spacing)",
              color,
            }}
          >
            {item.eyebrow}
          </span>
        )}

        <h3
          className="font-sans font-semibold text-text-heading"
          style={{ fontSize: "var(--text-tab)", lineHeight: 1.3 }}
        >
          {item.title}
        </h3>

        <p
          className="font-body text-text-body-warm"
          style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)", opacity: 0.8 }}
        >
          {item.description}
        </p>

        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 mt-2">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="font-body text-text-body-warm"
                  style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)", opacity: 0.8 }}
                >
                  {h}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stat footer */}
      {item.stat && (
        <div className="relative z-10 flex items-center gap-2 pt-5 border-t border-white/[0.06]">
          <span
            className="font-ui font-semibold uppercase"
            style={{
              fontSize: "var(--text-sector-badge)",
              letterSpacing: "var(--text-sector-badge--letter-spacing)",
              color: "var(--color-text-muted)",
            }}
          >
            Résultat
          </span>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span
              className="font-ui font-bold uppercase"
              style={{
                fontSize: "var(--text-sector-badge)",
                letterSpacing: "var(--text-sector-badge--letter-spacing)",
                color,
              }}
            >
              {item.stat.value} — {item.stat.label}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export function SectionNosPromesses({
  title = "Nos promesses.",
  description = "Ce qui nous différencie, concrètement.",
  items,
}: SectionNosPromessesProps) {
  return (
    <section
      className="w-full py-20 md:py-28"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      <div className="flex flex-col gap-16 max-w-[1280px] mx-auto w-full">
        {/* En-tête */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <RevealTitle
            text={title}
            className="font-sans font-bold text-white"
            style={{ fontSize: "var(--text-card-title)", lineHeight: "var(--text-card-title--line-height)" }}
          />
          <p
            className="font-body text-text-body-warm max-w-[420px] lg:text-right"
            style={{ fontSize: "var(--text-nav)", lineHeight: "var(--text-nav--line-height)", opacity: 0.8 }}
          >
            {description}
          </p>
        </motion.div>

        {/* Grille 3 colonnes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.slice(0, 3).map((item, i) => (
            <PromiseCard key={i} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
