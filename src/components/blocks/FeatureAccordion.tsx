"use client";

// FeatureAccordion — Liste de fonctionnalités dépliable
// Figma node 635:3976
// Items séparés par des Dividers, icône → (fermé) ou ∧ (ouvert, chevron down inversé)
// Un seul item ouvert à la fois

import { useState } from "react";
import { Divider } from "@/components/ui/Divider";

export interface FeatureItem {
  title: string;
  description?: string;
}

export interface FeatureAccordionProps {
  features: FeatureItem[];
  /** Index de l'item ouvert par défaut (-1 = aucun) */
  defaultOpen?: number;
}

export function FeatureAccordion({
  features,
  defaultOpen = -1,
}: FeatureAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  function toggle(idx: number) {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  }

  return (
    <div className="flex flex-col items-start w-full">
      {features.map((feature, idx) => {
        const isOpen = openIndex === idx;
        const hasDescription = Boolean(feature.description);

        return (
          <div key={feature.title} className="flex flex-col items-start w-full">
            {/* Item row */}
            <button
              onClick={() => toggle(idx)}
              className="flex items-center gap-[10px] py-[5px] text-left w-full group"
              aria-expanded={isOpen}
            >
              <span
                className="font-sans font-normal text-white"
                style={{ fontSize: "var(--text-tab)", lineHeight: "normal" }}
              >
                {feature.title}
              </span>
              <span className="shrink-0 transition-transform duration-200">
                {isOpen && hasDescription ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </span>
            </button>

            {/* Description dépliée */}
            {isOpen && feature.description && (
              <p
                className="text-white/90 mt-2 mb-1"
                style={{
                  fontSize: "var(--text-nav)",
                  lineHeight: "var(--text-nav--line-height)",
                }}
              >
                {feature.description}
              </p>
            )}

            {/* Séparateur sous chaque item sauf le dernier */}
            {idx < features.length - 1 && <Divider className="mt-3 mb-0" />}
          </div>
        );
      })}
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 5l5 5-5 5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 8l5 5 5-5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
