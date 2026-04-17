import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ReactiveCursor } from "@/components/ui/ReactiveCursor";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { HeroPortfolio } from "@/components/blocks/HeroPortfolio";
import { InfiniteMarquee } from "@/components/blocks/InfiniteMarquee";
import { StatsFullSection } from "@/components/blocks/StatsFullSection";
import { WorkShowcase } from "@/components/blocks/WorkShowcase";
import { FeatureBento } from "@/components/blocks/FeatureBento";
import { SectionDiagonale } from "@/components/blocks/SectionDiagonale";
import { SectionAtelier } from "@/components/blocks/SectionAtelier";
import { TestimonialBlock } from "@/components/blocks/TestimonialBlock";
import { CtaAugmented } from "@/components/blocks/CtaAugmented";
import { ScrollStatement } from "@/components/blocks/ScrollStatement";
import { ProcessStepper } from "@/components/blocks/ProcessStepper";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { FloatingShapes } from "@/components/ui/FloatingShapes";

export default function AccueilV2Page() {
  return (
    <>
    {/* Orbs ambients — halos colorés */}
    <FloatingOrbs />
    {/* Shapes — badges/pills/blobs visibles dans les marges */}
    <FloatingShapes />
    <LenisProvider>
    <div className="relative bg-nav-bg flex flex-col min-h-screen">
      {/* Effets globaux */}
      <GrainOverlay opacity={0.05} />
      <ReactiveCursor />

      <Header />

      <main className="relative z-10 flex flex-col flex-1">
        {/* 1. Hero — SplitLine curtain + STEAMULO oversized + CTAs magnétiques */}
        <HeroPortfolio />

        {/* 2. Atelier — 4 pôles interactifs, mouse parallax 3D */}
        <SectionAtelier />

        {/* 3. Marquee — stack technique */}
        <InfiniteMarquee />

        {/* 3. Manifeste — scroll-pinned, texte mot par mot, halos parallax */}
        <ScrollStatement />

        {/* 4. Stats — chiffres clés avec background fantôme oversized */}
        <StatsFullSection />

        {/* 4. Réalisations — tilt 3D + clip-path reveal par carte */}
        <WorkShowcase />

        {/* 5. Processus — stepper interactif auto-animé */}
        <ProcessStepper />

        {/* 6. Pôles — bento existant */}
        <FeatureBento />

        {/* 8. Engagements — cartes chamfrées zigzag */}
        <SectionDiagonale />

        {/* 8. Témoignage client */}
        <TestimonialBlock />

        {/* 7. CTA final */}
        <CtaAugmented />
      </main>

      <Footer
        socials={{
          github: "https://github.com/steamulo",
          instagram: "https://instagram.com/steamulo",
          linkedin: "https://linkedin.com/company/steamulo",
        }}
      />
    </div>
    </LenisProvider>
    </>
  );
}
