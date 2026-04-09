// Page — Pôle Conseil & Transformation
// Route : /[locale]/nos-poles/conseil

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { PoleTabsNavWrapper } from "./PoleTabsNavWrapper";

export default function PoleConseilPage() {
  return (
    <main
      className="flex flex-col gap-20 items-center justify-center pt-[70px] w-full"
      style={{ backgroundColor: "var(--color-nav-bg)" }}
    >
      {/* Header */}
      <Header />

      {/* Hero */}
      <HeroSection
        eyebrow="Pôle Conseil & Transformation"
        title={"Accélérer votre\ntransformation\npar l'IA."}
        highlightWord="transformation\npar l'IA"
        highlightStyle="solid"
        highlightColor="#FBA275"
        description="Nous accompagnons vos équipes pour identifier, prioriser et lancer vos premières initiatives IA à fort impact."
        align="right"
      />

      {/* Tabs navigation pôles */}
      <PoleTabsNavWrapper />

      {/* CTA Banner */}
      <div className="px-8 w-full max-w-[1280px]">
        <CtaBanner
          title="Prêt à augmenter\nvos projets ?"
          description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
          primaryLabel="Parlons de votre projet"
          primaryHref="/#contact"
          secondaryLabel="Voir nos offres"
          secondaryHref="/#offres"
        />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
