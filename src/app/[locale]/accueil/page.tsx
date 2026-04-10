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

const PARTNER_LOGOS: LogoItem[] = [
  { src: "/images/logos/carrefour.svg", alt: "Carrefour", width: 100, height: 30 },
  { src: "/images/logos/inpi.svg", alt: "INPI", width: 55, height: 30 },
  { src: "/images/logos/bpce.svg", alt: "BPCE", width: 80, height: 30 },
  { src: "/images/logos/fdj.svg", alt: "FDJ", width: 50, height: 30 },
  { src: "/images/logos/laposte.svg", alt: "La Poste", width: 90, height: 30 },
  { src: "/images/logos/bienveo.png", alt: "Bienveo", width: 80, height: 30 },
  { src: "/images/logos/marketpay.svg", alt: "MarketPay", width: 100, height: 30 },
];

const PROMISES = [
  { iconSrc: "", title: "Acteur Français au coeur de Paris." },
  { iconSrc: "", title: "Une solution sur-mesure, clés en main." },
  { iconSrc: "", title: "Un référent dédié pour votre projet." },
  { iconSrc: "", title: "Excellence technique." },
  { iconSrc: "", title: "Travailler avec des Ingénieurs augmentés." },
  { iconSrc: "", title: "Découper un besoin complexe." },
];

export default function AccueilPage() {
  return (
    <div className="bg-deep-navy min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1">
        {/* Héro principal */}
        <HeroSection />

        {/* Bandeau logos partenaires — full width */}
        <div className="py-10">
          <LogoBanner logos={PARTNER_LOGOS} />
        </div>

        {/* Formulaire de projet */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex justify-center">
            <ProjectForm />
          </div>
        </section>

        {/* Nos offres — full width */}
        <OffersSection />

        {/* Nos promesses */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <IntegrationSchema
              title="Nos promesses."
              description="Ce qui nous différencie, concrètement."
              miniCards={PROMISES.map((p) => ({
                iconSrc: p.iconSrc,
                title: p.title,
                subtitle: "",
              }))}
            />
          </div>
        </section>

        {/* CTA bas de page */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
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
