"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionConfig,
} from "framer-motion";
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
        ctaHref: "/contact",
        features: [
          "Compréhension de votre besoin",
          "Atelier Design Thinking",
          "Propositions UX",
          "Maquettes UX - UI",
        ],
        discoverLabel: "Découvrir le pôle",
        discoverHref: "/nos-poles/conseil",
      },
      {
        title: "Agent analyse\n& décision",
        accentColor: "var(--color-offer-blue)",
        headerGradient: OFFER_GRADIENTS.blue,
        ctaLabel: "Accéder à l'offre",
        ctaHref: "/contact",
        features: [
          "Analyse de documents",
          "Extraction d'informations clés",
          "Aide à la priorisation",
          "Restitution structurée",
        ],
        discoverLabel: "Découvrir le pôle",
        discoverHref: "/nos-poles/conseil",
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
        ctaHref: "/contact",
        features: [
          "Applications React / Next.js",
          "APIs REST & GraphQL",
          "Applications mobiles",
          "Tests & qualité",
        ],
        discoverLabel: "Découvrir le pôle",
        discoverHref: "/nos-poles/developpement",
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
        ctaHref: "/contact",
        features: [
          "CI/CD automatisée",
          "Migration Cloud",
          "Monitoring & alerting",
          "Infrastructure as Code",
        ],
        discoverLabel: "Découvrir le pôle",
        discoverHref: "/nos-poles/hebergement",
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
        ctaHref: "/contact",
        features: [
          "Conception d'agents IA",
          "Fine-tuning de modèles",
          "RAG & bases vectorielles",
          "Intégration métier",
        ],
        discoverLabel: "Découvrir le pôle",
        discoverHref: "/nos-poles/developpement",
      },
    ],
  },
];

/** Largeur d'une carte + gap entre cartes (en px, aligné sur w-[534px] gap-5) */
const CARD_W = 534;
const CARD_GAP = 20;
/** Pixels de scroll vertical consommés par pas de carte */
const SCROLL_PER_STEP = 650;

type FlatCard = OfferCardProps & { tabIndex: number };

export function OffersSection({
  title = "Nos offres adaptables.",
  tabs = DEFAULT_TABS,
}: OffersSectionProps) {
  const allCards: FlatCard[] = tabs.flatMap((tab, tabIndex) =>
    tab.cards.map((card) => ({ ...card, tabIndex }))
  );
  const N = allCards.length;

  const [activeTab, setActiveTab] = useState(0);
  const [vpWidth, setVpWidth] = useState(1280);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const update = () => {
      setVpWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Position X du track : centre la première carte (progress=0) → centre la dernière (progress=1)
  const startX = (vpWidth - CARD_W) / 2;
  const endX = startX - (N - 1) * (CARD_W + CARD_GAP);
  const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);

  // Sync onglet actif avec la carte la plus proche du centre
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.max(0, Math.min(N - 1, Math.round(v * (N - 1))));
    setActiveTab(allCards[idx].tabIndex);
  });

  // Clic sur un onglet → scroll vers la première carte de ce pôle
  function scrollToTab(tabIndex: number) {
    const firstIdx = allCards.findIndex((c) => c.tabIndex === tabIndex);
    if (firstIdx === -1 || !containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const progress = N > 1 ? firstIdx / (N - 1) : 0;
    const target = containerTop + progress * (N - 1) * SCROLL_PER_STEP;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  // Hauteur de la zone de scroll : 100vh pour l'affichage sticky + room pour N-1 pas
  const outerHeight = `calc(100vh + ${(N - 1) * SCROLL_PER_STEP}px)`;

  if (isMobile) {
    return <MobileOffersSection title={title} tabs={tabs} />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={containerRef} className="relative" style={{ height: outerHeight }}>
        <div className="sticky top-0 h-screen bg-deep-navy flex flex-col gap-14 items-center justify-center overflow-hidden">
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

          <div className="flex flex-col gap-5 items-center w-full">
            {/* Onglets de pôles */}
            <nav
              className="flex items-center gap-8 h-7 justify-center"
              aria-label="Catégories d'offres"
            >
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => scrollToTab(i)}
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

            {/* Piste de cartes — fade aux bords via mask-image */}
            <div
              className="relative w-full"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            >
              <motion.div className="flex gap-5 items-center" style={{ x }}>
                {allCards.map((card, i) => (
                  <OfferCard key={i} {...card} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

/** Fallback mobile : UI à onglets classique */
function MobileOffersSection({
  title,
  tabs,
}: {
  title: string;
  tabs: OfferTab[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="flex flex-col gap-14 items-center py-20 w-full bg-deep-navy">
      <h2
        className="font-sans font-bold text-white text-center whitespace-nowrap"
        style={{
          fontSize: "var(--text-card-title)",
          lineHeight: "var(--text-card-title--line-height)",
        }}
      >
        {title}
      </h2>
      <div
        className="flex flex-col gap-5 items-center w-full"
        style={{
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
      >
        <nav
          className="flex items-center gap-8 h-7 justify-center"
          aria-label="Catégories d'offres"
        >
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
        <div className="flex gap-5 items-center overflow-x-auto w-full pb-2 scrollbar-none">
          {tabs[activeTab]?.cards.map((card, i) => (
            <OfferCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
