"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Reference } from "@/types";
import { ReferenceFilterBar, type FilterChip } from "@/components/blocks/ReferenceFilterBar";
import { ReferencesAnimatedGrid } from "@/components/blocks/ReferencesAnimatedGrid";
import type { ReferenceCardProps } from "@/components/ui/ReferenceCard";

const PER_PAGE = 6;

const FILTER_ROWS: FilterChip[][] = [
  [
    { label: "Conseil & Design", value: "Conseil & Design" },
    { label: "Développement", value: "Développement" },
    { label: "Cloud", value: "Cloud" },
    { label: "IA & Data", value: "IA & Intelligence Artificielle" },
  ],
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function toCardProps(ref: Reference): ReferenceCardProps {
  return {
    imageSrc: ref.imageSrc ?? "/images/references/inpi.webp",
    imageAlt: ref.client,
    logoSrc: ref.logoSrc,
    logoAlt: ref.client,
    category: ref.category[0] ?? "",
    title: ref.description.fr,
    ctaHref: `/references/${ref.slug}`,
  };
}

interface ReferencesClientSectionProps {
  references: Reference[];
}

export function ReferencesClientSection({ references }: ReferencesClientSectionProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return references;
    return references.filter((r) =>
      r.category.some((c) => activeFilters.includes(c))
    );
  }, [references, activeFilters]);

  const pageCount = Math.ceil(filtered.length / PER_PAGE);
  const cards: ReferenceCardProps[] = filtered
    .slice(page * PER_PAGE, (page + 1) * PER_PAGE)
    .map(toCardProps);

  const handleFilterChange = (active: string[]) => {
    setActiveFilters(active);
    setPage(0);
  };

  const goTo = (p: number) => setPage(p);

  return (
    <div className="flex flex-col gap-12">
      <ReferenceFilterBar
        rows={FILTER_ROWS}
        defaultActive={[]}
        onChange={handleFilterChange}
      />

      <ReferencesAnimatedGrid
        key={`${page}-${activeFilters.join(",")}`}
        cards={cards}
      />

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <NavButton
            onClick={() => goTo(Math.max(0, page - 1))}
            disabled={page === 0}
            aria-label="Page précédente"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavButton>

          {Array.from({ length: pageCount }, (_, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={[
                "w-9 h-9 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer",
                i === page
                  ? "bg-brand-orange text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {i + 1}
            </motion.button>
          ))}

          <NavButton
            onClick={() => goTo(Math.min(pageCount - 1, page + 1))}
            disabled={page === pageCount - 1}
            aria-label="Page suivante"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavButton>
        </div>
      )}

      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-center text-white/40 font-body py-16"
          >
            Aucune référence pour ces filtres.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({
  children,
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? undefined : { scale: 1.1 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200",
        disabled
          ? "bg-white/5 text-white/20 cursor-not-allowed"
          : "bg-white/10 text-white hover:bg-white/20 cursor-pointer",
      ].join(" ")}
    >
      {children}
    </motion.button>
  );
}
