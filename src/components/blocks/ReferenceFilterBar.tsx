"use client";

import { useState } from "react";

export interface FilterChip {
  label: string;
  value: string;
}

interface ReferenceFilterBarProps {
  /** Deux lignes de filtres */
  rows: FilterChip[][];
  /** Valeurs actives par défaut */
  defaultActive?: string[];
  onChange?: (active: string[]) => void;
}

/**
 * Barre de filtres en pills — deux lignes centrées.
 *
 * État inactif  : fond transparent bleuté, texte et dot bleu clair
 * État actif    : fond grisé solide, texte et dot sombre (inverted)
 *
 * (convention Figma node 577:4063 / 577:4143)
 */
export function ReferenceFilterBar({
  rows,
  defaultActive = [],
  onChange,
}: ReferenceFilterBarProps) {
  const [active, setActive] = useState<string[]>(defaultActive);

  const toggle = (value: string) => {
    const next = active.includes(value)
      ? active.filter((v) => v !== value)
      : [...active, value];
    setActive(next);
    onChange?.(next);
  };

  return (
    <div className="flex flex-col gap-[10px] items-center w-full">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex gap-4 items-center justify-center w-full flex-wrap"
        >
          {row.map((chip) => {
            const isActive = active.includes(chip.value);
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => toggle(chip.value)}
                className={[
                  "flex items-center gap-2 px-4 py-[6px] rounded-full transition-all duration-200",
                  isActive
                    ? "bg-[#94a3b8]"
                    : "bg-[rgba(148,160,221,0.1)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "size-2 rounded-full shrink-0",
                    isActive
                      ? "bg-deep-navy"
                      : "bg-badge-blue shadow-[0_0_8px_0_#b8c3ff]",
                  ].join(" ")}
                />
                <span
                  className={[
                    "font-body font-semibold text-[12px] tracking-[1.8px] uppercase whitespace-nowrap",
                    isActive ? "text-deep-navy" : "text-badge-blue",
                  ].join(" ")}
                >
                  {chip.label}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
