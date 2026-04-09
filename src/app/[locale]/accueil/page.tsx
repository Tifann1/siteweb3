// Page d'accueil — Ingénieur Augmenté (node 437:2081)
// Composition pure de composants Storybook.
// Toute modification d'un composant se répercute automatiquement ici.

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { LogoBanner, type LogoItem } from "@/components/blocks/LogoBanner";
import { ProjectForm } from "@/components/blocks/ProjectForm";
import { OffersSection } from "@/components/blocks/OffersSection";
import { IntegrationSchema } from "@/components/blocks/IntegrationSchema";
import { CtaBanner } from "@/components/blocks/CtaBanner";

// TODO: déplacer les logos dans /public/images/logos/ et mettre à jour les chemins.
// Les dimensions (width/height) sont indicatives — maintenir le ratio du fichier SVG final.
const PARTNER_LOGOS: LogoItem[] = [
  { src: "/images/logos/carrefour.svg", alt: "Carrefour", width: 100, height: 30 },
  { src: "/images/logos/inpi.svg", alt: "INPI", width: 55, height: 30 },
  { src: "/images/logos/bpce.svg", alt: "BPCE", width: 80, height: 30 },
  { src: "/images/logos/fdj.svg", alt: "FDJ", width: 50, height: 30 },
  { src: "/images/logos/laposte.svg", alt: "La Poste", width: 90, height: 30 },
  { src: "/images/logos/bienveo.svg", alt: "Bienveo", width: 80, height: 30 },
  { src: "/images/logos/marketpay.svg", alt: "MarketPay", width: 100, height: 30 },
];

// TODO: déplacer les icônes dans /public/images/icons/ et mettre à jour les chemins.
const PROMISES = [
  { iconSrc: "/images/icons/france.svg", title: "Acteur Français au coeur de Paris." },
  { iconSrc: "/images/icons/cles-en-main.svg", title: "Une solution sur-mesure, clés en main." },
  { iconSrc: "/images/icons/referent.svg", title: "Un référent dédié pour votre projet." },
  { iconSrc: "/images/icons/excellence.svg", title: "Excellence technique." },
  { iconSrc: "/images/icons/ingenieur.svg", title: "Travailler avec des Ingénieurs augmentés." },
  { iconSrc: "/images/icons/decoupage.svg", title: "Découper un besoin complexe." },
];

export default function AccueilPage() {
  return (
    <div className="bg-deep-navy min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1 gap-0">
        {/* Héro principal */}
        <HeroSection />

        {/* Bandeau logos partenaires */}
        <div className="py-12">
          <LogoBanner logos={PARTNER_LOGOS} />
        </div>

        {/* Formulaire de projet */}
        <div className="flex justify-center py-16">
          <ProjectForm />
        </div>

        {/* Nos offres */}
        <OffersSection />

        {/* Nos promesses */}
        <IntegrationSchema
          title="Nos promesses."
          description="Ce qui nous différencie, concrètement."
          miniCards={PROMISES.map((p) => ({
            iconSrc: p.iconSrc,
            title: p.title,
            subtitle: "",
          }))}
        />

        {/* CTA bas de page */}
        <div className="px-8 py-16">
          <CtaBanner />
        </div>
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
