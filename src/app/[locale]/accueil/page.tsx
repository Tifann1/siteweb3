// Page d'accueil — Ingénieur Augmenté (node 437:2081)
// Composition pure de composants Storybook.
// Toute modification d'un composant se répercute automatiquement ici.

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { LogoBanner, type LogoItem } from "@/components/blocks/LogoBanner";
import { ProjectForm } from "@/components/blocks/ProjectForm";
import { OffersSection } from "@/components/blocks/OffersSection";
import { SectionNosPromesses, type PromiseItem } from "@/components/blocks/SectionNosPromesses";
import { CtaBanner } from "@/components/blocks/CtaBanner";

const PARTNER_LOGOS: LogoItem[] = [
  { src: "/images/logos/carrefour.svg", alt: "Carrefour", width: 100, height: 30 },
  { src: "/images/logos/inpi.svg", alt: "INPI", width: 55, height: 30 },
  { src: "/images/logos/bpce.svg", alt: "BPCE", width: 80, height: 30 },
  { src: "/images/logos/fdj.svg", alt: "FDJ", width: 50, height: 30 },
  { src: "/images/logos/laposte.svg", alt: "La Poste", width: 90, height: 30 },
  { src: "/images/logos/bienveo.png", alt: "Bienveo", width: 80, height: 30 },
  { src: "/images/logos/marketpay.svg", alt: "MarketPay", width: 100, height: 30 },
];

const PROMISES: PromiseItem[] = [
  {
    eyebrow: "Notre différence",
    title: "Des Ingénieurs Augmentés.",
    description:
      "Nos ingénieurs embarquent l'IA dans leurs processus quotidiens. Moins d'erreurs, plus de vélocité, des livrables plus solides — sans jamais sacrifier la qualité de l'architecture.",
    highlights: [
      "IA intégrée à chaque phase : cadrage, code, revue, doc",
      "Modèles de langage sur les flux de revue de code",
      "Documentation générée et maintenue en continu",
    ],
    accent: "orange",
  },
  {
    eyebrow: "Paris · France",
    title: "Ancrés en France, disponibles vite.",
    description:
      "Même fuseau horaire, même langue, mêmes contraintes réglementaires. Pas de frottement, pas de traduction perdue.",
    stat: { value: "< 2h", label: "Délai de réponse moyen" },
  },
  {
    eyebrow: "Suivi projet",
    title: "Un référent unique, de bout en bout.",
    description:
      "Du premier cadrage à la livraison finale, un ingénieur identifié suit votre projet. Pas de relais. Pas de perte de contexte.",
    stat: { value: "0", label: "Rotation d'équipe en cours de projet" },
  },
  {
    eyebrow: "Excellence",
    title: "Un niveau technique qui ne descend pas.",
    description:
      "Ingénieurs seniors certifiés, revues de code systématiques, formation continue. Nous ne faisons pas de compromis sur la qualité.",
    highlights: [
      "Profils seniors uniquement — 5 ans d'expérience minimum",
      "Revue de code obligatoire à chaque pull request",
      "Veille et certifications maintenues en continu",
    ],
    accent: "blue",
  },
  {
    eyebrow: "Livraison",
    title: "Sur-mesure, clé en main.",
    description:
      "Pas de template, pas de raccourci. Chaque solution est conçue pour votre contexte, vos contraintes, vos équipes. On livre quelque chose qui fonctionne — et qui dure.",
    highlights: [
      "Architecture alignée avec vos systèmes existants",
      "Documentation de prise en main incluse dans chaque livraison",
      "Formation de vos équipes à la solution livrée",
    ],
  },
  {
    eyebrow: "Méthode",
    title: "Transformer le flou en feuille de route.",
    description:
      "Notre valeur commence avant la première ligne de code : cadrer, prioriser, découper un besoin complexe en étapes claires et livrables concrets.",
  },
];

export default function AccueilPage() {
  return (
    <div className="bg-nav-bg min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1">
        {/* Héro principal */}
        <HeroSection />

        {/* Bandeau logos partenaires — full width */}
        <div className="py-20 md:py-28">
          <LogoBanner logos={PARTNER_LOGOS} />
        </div>

        {/* Formulaire de projet */}
        <section className="py-20 md:py-28">
          <div
            className="flex justify-center"
            style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
          >
            <ProjectForm />
          </div>
        </section>

        {/* Nos offres — full width */}
        <OffersSection />

        {/* Nos promesses — bento grid asymétrique */}
        <SectionNosPromesses items={PROMISES} />

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
