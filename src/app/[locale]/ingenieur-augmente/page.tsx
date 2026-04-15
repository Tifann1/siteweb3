import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { SectionAgentsFlow } from "@/components/blocks/SectionAgentsFlow";
import { SectionAppsAugmentees } from "@/components/blocks/SectionAppsAugmentees";
import { SectionCopilote } from "@/components/blocks/SectionCopilote";

export default function IngenieurAugmentePage() {
  return (
    <div className="bg-nav-bg flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col flex-1">
        <HeroSection
          eyebrow="L'INGÉNIEUR AUGMENTÉ"
          title={"L'humain et l'IA,\nensemble plus forts."}
          highlightWord="ensemble"
          highlightStyle="gradient"
          description="Nous ne remplaçons pas l'ingénieur — nous l'augmentons. Découvrez comment l'IA amplifie notre expertise pour livrer plus vite, mieux et de manière plus fiable."
        />

        <SectionAgentsFlow />
        <SectionAppsAugmentees />
        <SectionCopilote />

        {/* CTA */}
        <section
          className="py-16 md:py-24"
          style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
        >
          <CtaBanner
            title={"Prêt à travailler avec des\ningénieurs augmentés ?"}
            description="Nos experts sont disponibles pour auditer votre stack et identifier vos premiers leviers d'accélération IA."
            primaryLabel="Discutons de votre projet"
            primaryHref="/contact"
            secondaryLabel="Voir nos produits IA"
            secondaryHref="/produits"
          />
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
