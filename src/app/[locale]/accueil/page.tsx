// Page d'accueil — Ingénieur Augmenté (node 437:2081)
// Composition pure de composants Storybook.
// Toute modification d'un composant se répercute automatiquement ici.

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { LogoBanner, type LogoItem } from "@/components/blocks/LogoBanner";
import { OffersSection } from "@/components/blocks/OffersSection";
import { ProcessStepper } from "@/components/blocks/ProcessStepper";
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

        {/* Nos offres — full width */}
        <OffersSection />

        {/* Promesses — process stepper */}
        <ProcessStepper />

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
