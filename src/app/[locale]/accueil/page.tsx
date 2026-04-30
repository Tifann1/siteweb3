// Page d'accueil — Ingénieur Augmenté (node 437:2081)
// Composition pure de composants Storybook.
// Toute modification d'un composant se répercute automatiquement ici.

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { HeroSnapWrapper } from "@/components/blocks/HeroSnapWrapper";
import { LogoBanner, type LogoItem } from "@/components/blocks/LogoBanner";
import { OffersSection } from "@/components/blocks/OffersSection";
import { ProcessStepper } from "@/components/blocks/ProcessStepper";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import {
  SectionNosPromesses,
  type PromiseItem,
} from "@/components/blocks/SectionNosPromesses";

const PARTNER_LOGOS: LogoItem[] = [
  { src: "/images/logos/carrefour.svg", alt: "Carrefour", width: 200, height: 60 },
  { src: "/images/logos/inpi.svg", alt: "INPI", width: 110, height: 60 },
  { src: "/images/logos/bpce.svg", alt: "BPCE", width: 160, height: 60 },
  { src: "/images/logos/fdj.svg", alt: "FDJ", width: 100, height: 60 },
  { src: "/images/logos/laposte.svg", alt: "La Poste", width: 180, height: 60 },
  { src: "/images/logos/bienveo.png", alt: "Bienveo", width: 160, height: 60 },
  { src: "/images/logos/marketpay.svg", alt: "MarketPay", width: 200, height: 60 },
];

const NOS_PROMESSES: PromiseItem[] = [
  {
    eyebrow: "Paris · Lyon · France",
    title: "Acteur français au cœur de Paris et de Lyon.",
    description:
      "Même fuseau horaire, même langue, mêmes contraintes réglementaires. Disponibles rapidement, ancrés dans l'écosystème tech parisien.",
    stat: { value: "< 2h", label: "Délai de réponse moyen" },
    accent: "orange",
  },
  {
    eyebrow: "Livraison",
    title: "Solution sur mesure, clés en main.",
    description:
      "Pas de template, pas de raccourci. Chaque solution est conçue pour votre contexte, vos contraintes, vos équipes. On livre quelque chose qui fonctionne — et qui dure.",
    highlights: [
      "Architecture alignée avec vos systèmes existants",
      "Documentation de prise en main incluse dans chaque livraison",
      "Formation de vos équipes à la solution livrée",
    ],
    accent: "default",
  },
  {
    eyebrow: "Notre différence",
    title: "Travailler avec des ingénieurs augmentés.",
    description:
      "Nos ingénieurs embarquent l'IA dans leurs processus quotidiens. Moins d'erreurs, plus de vélocité, des livrables plus solides — sans jamais sacrifier la qualité.",
    highlights: [
      "IA intégrée à chaque phase : cadrage, code, revue",
      "Vélocité accrue sur les projets complexes",
      "Rigueur ingénieur maintenue en toutes circonstances",
    ],
    accent: "blue",
  },
];

export default function AccueilPage() {
  return (
    <div className="bg-nav-bg min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1">
        {/* Héro principal — snap vers la section suivante au premier scroll */}
        <HeroSnapWrapper>
          <HeroSection showFactory />
        </HeroSnapWrapper>

        {/* Nos expertises — process stepper sticky scroll */}
        <ProcessStepper />

        {/* Bandeau logos partenaires — full width */}
        <div className="py-6 md:py-10">
          <LogoBanner logos={PARTNER_LOGOS} />
        </div>

        {/* Nos offres — full width */}
        <OffersSection />

        {/* Nos promesses */}
        <SectionNosPromesses
          title="Nos promesses."
          description="Ce qui nous différencie, concrètement."
          items={NOS_PROMESSES}
        />

        {/* CTA bas de page */}
        <section className="py-20 md:py-28">
          <div style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}>
            <CtaBanner />
          </div>
        </section>
      </main>

      <Footer
        socials={{
          github: "https://github.com/steamulo",
          instagram: "https://instagram.com/steamulo",
          linkedin: "https://linkedin.com/company/steamulo",
        }}
      />
    </div>
  );
}
