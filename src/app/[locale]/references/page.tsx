import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { HeroSnapWrapper } from "@/components/blocks/HeroSnapWrapper";
import { LogoBanner, type LogoItem } from "@/components/blocks/LogoBanner";
import { ReferencesClientSection } from "@/components/blocks/ReferencesClientSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { references } from "@/lib/content/references";

const LOGOS: LogoItem[] = [
  { src: "/images/logos/bpce.svg",       alt: "BPCE",      width: 160, height: 60 },
  { src: "/images/logos/fdj.svg",        alt: "FDJ",        width: 100, height: 60 },
  { src: "/images/logos/laposte.svg",    alt: "La Poste",   width: 180, height: 60 },
  { src: "/images/logos/bienveo.png",    alt: "Bienveo",    width: 160, height: 60 },
  { src: "/images/logos/marketpay.svg",  alt: "Marketpay",  width: 200, height: 60 },
  { src: "/images/logos/sncf.svg",       alt: "SNCF",       width: 120, height: 60 },
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-nav-bg flex flex-col">
      <Header ctaLabel="Je lance mon projet" ctaHref="/#contact" />

      <main className="flex flex-col flex-1">
        <HeroSnapWrapper>
          <HeroSection
            eyebrow="NOS ÉTUDES DE CAS & RÉFÉRENCES"
            title={"L'ingénieur\naugmenté au service\nde vos ambitions."}
            highlightWord="augmenté"
            description="Nous fusionnons expertise technique industrielle et innovation numérique pour bâtir des solutions robustes, agiles et performantes."
          />
        </HeroSnapWrapper>

        <div className="py-6 md:py-10">
          <LogoBanner logos={LOGOS} />
        </div>

        <section className="pt-8 md:pt-12 pb-20 md:pb-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <ReferencesClientSection references={references} />
          </div>
        </section>

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

      <Footer
        copyright="©2025 Steamulo"
        address="14 rue Auber - 75009 Paris"
        socials={{
          linkedin: "https://linkedin.com/company/steamulo",
          instagram: "https://instagram.com/steamulo",
          github: "https://github.com/steamulo",
        }}
      />
    </div>
  );
}
