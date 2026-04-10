"use client";

import { useState } from "react";
import { OfferCard, type OfferCardProps } from "@/components/ui/OfferCard";

export interface OfferTab {
  label: string;
  cards: OfferCardProps[];
}

interface OffersSectionProps {
  title?: string;
  tabs?: OfferTab[];
}

/** Dégradés extraits des SVG Figma — node 443:2391 */
export const OFFER_GRADIENTS = {
  orange:
    "radial-gradient(ellipse at 50% 0%, rgba(255,93,0,1) 0%, rgba(255,149,104,1) 100%)",
  blue: "radial-gradient(ellipse at 50% 0%, rgba(61,60,232,1) 0%, rgba(112,111,238,1) 100%)",
  yellow:
    "radial-gradient(ellipse at 0% 50%, rgba(230,173,0,1) 0%, rgba(229,206,32,1) 100%)",
  teal: "radial-gradient(ellipse at 0% 50%, rgba(10,155,177,1) 0%, rgba(128,217,92,1) 100%)",
} as const;

const DEFAULT_TABS: OfferTab[] = [
  {
    label: "Conseil",
    cards: [
      {
        title: "Etudes UX\n& Maquettes",
        accentColor: "var(--color-offer-orange)",
        headerGradient: OFFER_GRADIENTS.orange,
        ctaLabel: "Accéder à l'offre",
        features: [
          "Compréhension de votre besoin",
          "Atelier Design Thinking",
          "Propositions UX",
          "Maquettes UX - UI",
        ],
        discoverLabel: "Découvrir le pôle",
      },
      {
        title: "Agent analyse\n& décision",
        accentColor: "var(--color-offer-blue)",
        headerGradient: OFFER_GRADIENTS.blue,
        ctaLabel: "Accéder à l'offre",
        features: [
          "Analyse de documents",
          "Extraction d'informations clés",
          "Aide à la priorisation",
          "Restitution structurée",
        ],
        discoverLabel: "Découvrir le pôle",
        badge: "meilleure vente",
      },
    ],
  },
  {
    label: "Développement",
    cards: [
      {
        title: "Développement\nweb & mobile",
        accentColor: "var(--color-offer-blue)",
        headerGradient: OFFER_GRADIENTS.blue,
        ctaLabel: "Accéder à l'offre",
        features: [
          "Applications React / Next.js",
          "APIs REST & GraphQL",
          "Applications mobiles",
          "Tests & qualité",
        ],
        discoverLabel: "Découvrir le pôle",
      },
    ],
  },
  {
    label: "DevOps",
    cards: [
      {
        title: "Infrastructure\n& Cloud",
        accentColor: "var(--color-offer-yellow)",
        headerGradient: OFFER_GRADIENTS.yellow,
        ctaLabel: "Accéder à l'offre",
        features: [
          "CI/CD automatisée",
          "Migration Cloud",
          "Monitoring & alerting",
          "Infrastructure as Code",
        ],
        discoverLabel: "Découvrir le pôle",
      },
    ],
  },
  {
    label: "IA",
    cards: [
      {
        title: "Agents IA\nsur mesure",
        accentColor: "var(--color-offer-green)",
        headerGradient: OFFER_GRADIENTS.teal,
        ctaLabel: "Accéder à l'offre",
        features: [
          "Conception d'agents IA",
          "Fine-tuning de modèles",
          "RAG & bases vectorielles",
          "Intégration métier",
        ],
        discoverLabel: "Découvrir le pôle",
      },
    ],
  },
];

export function OffersSection({
  title = "Nos offres adaptables.",
  tabs = DEFAULT_TABS,
}: OffersSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="flex flex-col gap-14 items-center py-16 md:py-24 w-full bg-deep-navy">
      {/* Titre */}
      <h2
        className="font-sans font-bold text-white text-center whitespace-nowrap"
        style={{
          fontSize: "var(--text-card-title)",
          lineHeight: "var(--text-card-title--line-height)",
        }}
      >
        {title}
      </h2>

      <div className="flex flex-col gap-5 items-center px-20 w-full">
        {/* Tabs */}
        <nav className="flex items-center gap-8 h-7 justify-center" aria-label="Catégories d'offres">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={[
                "font-sans text-center transition-colors duration-200",
                "text-[length:var(--text-tab)]",
                i === activeTab
                  ? "text-white"
                  : "text-white/40 hover:text-white/70",
              ].join(" ")}
              aria-current={i === activeTab ? "true" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Cards */}
        <div className="flex gap-5 items-center overflow-x-auto w-full pb-2 scrollbar-none">
          {tabs[activeTab]?.cards.map((card, i) => (
            <OfferCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
