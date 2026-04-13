// Page — Pôle Conseil & Transformation
// Route : /[locale]/nos-poles/conseil

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { PoleTabsNavWrapper } from "./PoleTabsNavWrapper";

export default function PoleConseilPage() {
  return (
    <div
      className="min-h-screen flex flex-col w-full"
      style={{ backgroundColor: "var(--color-nav-bg)" }}
    >
      {/* Header sticky */}
      <Header />

      <main className="flex flex-col w-full">
        {/* Hero */}
        <HeroSection
          eyebrow="Pôle Conseil & Transformation"
          title={"Accélérer votre\ntransformation\npar l'IA."}
          highlightWord={"transformation\npar l'IA"}
          highlightStyle="gradient"
          description="Nous accompagnons vos équipes pour identifier, prioriser et lancer vos premières initiatives IA à fort impact."
          align="right"
        />

        {/* Tabs navigation pôles */}
        <div className="py-8">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <PoleTabsNavWrapper />
          </div>
        </div>

        {/* CTA Banner */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <CtaBanner
              title={"Prêt à augmenter\nvos projets ?"}
              description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
              primaryLabel="Parlons de votre projet"
              primaryHref="/contact"
              secondaryLabel="Voir nos offres"
              secondaryHref="/contact"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
