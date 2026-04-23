"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

export interface StatItem {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ReferenceBentoProps {
  expertImageSrc: string;
  expertImageAlt?: string;
  expertName: string;
  expertRole: string;
  expertBio: string;
  featureCardTitle: string;
  featureItems: FeatureItem[];
  ethosTitle: string;
  ethosDescription: string;
  stats: StatItem[];
  brandLogoSrc?: string;
  brandLogoAlt?: string;
  brandName: string;
  brandSubtitle: string;
  brandCtaLabel?: string;
  brandCtaHref?: string;
}

const spring = { type: "spring", stiffness: 260, damping: 28 } as const;

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Parse "12+", "$500M+", "×2,4" → { prefix, numeric, suffix }
function parseStatValue(value: string) {
  const match = value.match(/^([^0-9,.]*)([0-9]+(?:[,.][0-9]+)?)([^0-9,.]*)$/);
  if (!match) return { prefix: "", numeric: NaN, suffix: value };
  return {
    prefix: match[1],
    numeric: parseFloat(match[2].replace(",", ".")),
    suffix: match[3],
  };
}

function AnimatedStatCard({
  stat,
  isInView,
  delay,
}: {
  stat: StatItem;
  isInView: boolean;
  delay: number;
}) {
  const { prefix, numeric, suffix } = parseStatValue(stat.value);
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => {
    if (isNaN(numeric)) return stat.value;
    const formatted =
      numeric % 1 === 0
        ? Math.round(v).toString()
        : v.toFixed(1).replace(".", ",");
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!isInView || isNaN(numeric)) return;
    const controls = animate(count, numeric, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      delay,
    });
    return () => controls.stop();
  }, [isInView, numeric, delay, count]);

  return (
    <motion.div
      variants={rowVariants}
      whileHover={{ scale: 1.04, transition: spring }}
      className="flex flex-col gap-1 items-center p-[25px] bg-card-bg border border-white/5 rounded-[var(--radius-input)] cursor-default"
    >
      <motion.span
        className={[
          "font-sans text-center",
          stat.highlight ? "text-brand-orange-light" : "text-white",
        ].join(" ")}
        style={{ fontSize: "30px", lineHeight: "36px" }}
      >
        {isNaN(numeric) ? stat.value : display}
      </motion.span>
      <span
        className="font-body font-normal text-text-muted uppercase tracking-[var(--text-sector-badge--letter-spacing)] text-center"
        style={{ fontSize: "10px" }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export function ReferenceBento({
  expertImageSrc,
  expertImageAlt = "",
  expertName,
  expertRole,
  expertBio,
  featureCardTitle,
  featureItems,
  ethosTitle,
  ethosDescription,
  stats,
  brandLogoSrc,
  brandLogoAlt = "",
  brandName,
  brandSubtitle,
  brandCtaLabel = "Voir le portfolio",
  brandCtaHref,
}: ReferenceBentoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const row0Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0 };
  const row1Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.18 };
  const row2Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.36 };

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 w-full">
      {/* ── Col 1 : Expert portrait (spans 3 rows) ── */}
      <motion.div
        variants={rowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={row0Transition}
        className="col-start-1 row-start-1 row-span-3 flex flex-col gap-3 items-center justify-start"
      >
        <div className="relative w-full flex-1 min-h-[300px] rounded-[6px] overflow-hidden">
          <Image
            src={expertImageSrc}
            alt={expertImageAlt}
            fill
            className="object-cover object-top"
          />
        </div>
        <p className="font-sans text-text-heading text-center" style={{ fontSize: "22px" }}>
          {expertName}
        </p>
        <p
          className="font-sans font-semibold text-brand-orange-light uppercase text-center tracking-wider"
          style={{ fontSize: "13px" }}
        >
          {expertRole}
        </p>
        <p
          className="font-body font-normal text-meta-secondary text-center px-4"
          style={{ fontSize: "16px", lineHeight: "20px" }}
        >
          {expertBio}
        </p>
      </motion.div>

      {/* ── Col 2 : Feature card ── */}
      <motion.div
        variants={rowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ ...row0Transition, delay: 0.08 }}
        whileHover={{ scale: 1.02, transition: spring }}
        className="col-start-2 row-start-1 flex flex-col gap-[30px] items-start justify-center p-[34px] bg-deep-navy border border-white/5 rounded-[var(--radius-input)]"
      >
        <h3 className="font-sans text-white" style={{ fontSize: "22px" }}>
          {featureCardTitle}
        </h3>
        <div className="flex flex-col gap-4 w-full">
          {featureItems.map((item, i) => (
            <div key={i} className="flex flex-col items-start">
              <span className="font-sans text-brand-orange-light" style={{ fontSize: "16px", lineHeight: "20px" }}>
                {item.title}
              </span>
              <span className="font-body font-normal text-text-light" style={{ fontSize: "13px" }}>
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Col 3 : Ethos card ── */}
      <motion.div
        variants={rowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ ...row0Transition, delay: 0.16 }}
        whileHover={{ scale: 1.02, transition: spring }}
        className="col-start-3 row-start-1 flex flex-col gap-4 items-start p-8 bg-deep-navy border border-white/5 rounded-[var(--radius-input)]"
      >
        <div className="flex items-center justify-center size-12 rounded-[8px] bg-brand-orange-light/10">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="18" height="16" rx="2" stroke="#FFB692" strokeWidth="1.5" />
            <path d="M5 6h10M5 10h6" stroke="#FFB692" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="font-sans text-white" style={{ fontSize: "22px" }}>
          {ethosTitle}
        </h3>
        <p className="font-body font-normal text-meta-secondary" style={{ fontSize: "14px", lineHeight: "22.75px" }}>
          {ethosDescription}
        </p>
      </motion.div>

      {/* ── Stats row : cols 2-3 — compteur + hover ── */}
      <motion.div
        variants={rowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={row1Transition}
        className="col-start-2 col-span-2 row-start-2 grid grid-cols-3 gap-6"
      >
        {stats.map((stat, i) => (
          <AnimatedStatCard
            key={i}
            stat={stat}
            isInView={isInView}
            delay={row1Transition.delay + i * 0.1}
          />
        ))}
      </motion.div>

      {/* ── Brand row : cols 2-3 ── */}
      <motion.div
        variants={rowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={row2Transition}
        whileHover={{ scale: 1.01, transition: spring }}
        className="col-start-2 col-span-2 row-start-3 flex items-center justify-between px-8 py-[33px] bg-deep-navy border-t border-white/10 rounded-[var(--radius-input)]"
      >
        <div className="flex items-center gap-6">
          {brandLogoSrc && (
            <div className="relative size-12 shrink-0">
              <Image src={brandLogoSrc} alt={brandLogoAlt} fill className="object-contain" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-sans font-bold text-white" style={{ fontSize: "16px", lineHeight: "24px" }}>
              {brandName}
            </span>
            <span className="font-body font-normal text-text-muted" style={{ fontSize: "12px" }}>
              {brandSubtitle}
            </span>
          </div>
        </div>
        {brandCtaLabel && (
          <a
            href={brandCtaHref ?? "#"}
            className="font-body font-semibold text-brand-orange-light uppercase tracking-[1.2px] text-[length:var(--text-badge)] hover:opacity-80 transition-opacity"
          >
            {brandCtaLabel} ↗
          </a>
        )}
      </motion.div>
    </div>
  );
}
