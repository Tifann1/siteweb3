import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ReactiveCursor } from "@/components/ui/ReactiveCursor";
import { HeroAugmented } from "@/components/blocks/HeroAugmented";
import { StatsBar } from "@/components/blocks/StatsBar";
import { InfiniteMarquee } from "@/components/blocks/InfiniteMarquee";
import { FeatureBento } from "@/components/blocks/FeatureBento";
import { SectionDiagonale } from "@/components/blocks/SectionDiagonale";
import { TestimonialBlock } from "@/components/blocks/TestimonialBlock";
import { CtaAugmented } from "@/components/blocks/CtaAugmented";

export default function IngenieurAugmenteTestPage() {
  return (
    <div className="bg-nav-bg flex flex-col min-h-screen">
      {/* Effets globaux de la page */}
      <GrainOverlay opacity={0.05} />
      <ReactiveCursor />

      <Header />

      <main className="flex flex-col flex-1">
        {/* 1. Hero — titre cinétique full-screen */}
        <HeroAugmented />

        {/* 2. Stats — compteurs animés au scroll */}
        <StatsBar />

        {/* 3. Marquee — technologies & expertises */}
        <InfiniteMarquee />

        {/* 4. Bento features — 4 pôles */}
        <FeatureBento />

        {/* 5. Engagements — cartes chamfrées zigzag */}
        <SectionDiagonale />

        {/* 6. Témoignage client */}
        <TestimonialBlock />

        {/* 6. CTA final */}
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
  );
}
