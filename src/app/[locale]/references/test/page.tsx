// Page — Étude de cas Armatis (ancienne page /references, maintenant sur /references/test)

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ReferenceHero } from "@/components/blocks/ReferenceHero";
import { LogoBanner, type LogoItem } from "@/components/blocks/LogoBanner";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import { ReferenceBento } from "@/components/blocks/ReferenceBento";
import { AugmentedSection } from "@/components/blocks/AugmentedSection";
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

const HERO_BG = "/images/references/inpi-2.webp";
const EXPERT_IMAGE = "/images/team/emeric.png";
const BRAND_LOGO =
  "https://www.figma.com/api/mcp/asset/100e224e-88ce-4d3c-a831-b974ea920cb7";
const ICON_COPILOT =
  "https://www.figma.com/api/mcp/asset/859fe79d-941e-41f9-b7c3-981f10330814";
const ICON_TEST =
  "https://www.figma.com/api/mcp/asset/b112401d-e8fd-48d1-8db3-f42f655fe0cf";
const ICON_SPEED =
  "https://www.figma.com/api/mcp/asset/384f6f7b-ecd7-40b8-b87e-dd6faba449c4";

export default function ReferencesTestPage() {
  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header ctaLabel="Je lance mon projet" ctaHref="/contact" />

      <PageTransition className="flex flex-col flex-1">
      <main className="flex flex-col gap-[120px] px-[32px] pb-[80px]">
        {/* Hero */}
        <ReferenceHero
          eyebrow="ÉTUDE DE CAS : ARMATIS"
          title="Armatis, le déploiement de l'IA à grande échelle"
          highlightPhrase="déploiement de l'IA"
          description="Nous fusionnons expertise technique industrielle et innovation numérique pour bâtir des solutions robustes, agiles et performantes."
          backgroundImageSrc={HERO_BG}
          backgroundImageAlt="Équipe Armatis en opération"
        />

        {/* Bandeau logos partenaires */}
        <div className="py-10">
          <LogoBanner logos={PARTNER_LOGOS} duration={25} />
        </div>

        {/* Quote + Bento */}
        <section className="flex flex-col gap-6 w-full max-w-[1045px] mx-auto">
          <QuoteBlock
            quote="L'intégration d'une intelligence artificielle au cœur des process ouvre des perspectives fortes en matière de performance, de qualité de service et d'accompagnement des conseillers"
            attribution="Strategic Vision 2025"
          />

          <ReferenceBento
            expertImageSrc={EXPERT_IMAGE}
            expertImageAlt="Emeric, Chef de projet"
            expertName="Emeric"
            expertRole="Head of Strategy"
            expertBio="Spécialiste en prospective technologique et pilotage de roadmaps IA complexes."
            featureCardTitle="Une plateforme métier augmentée"
            featureItems={[
              {
                title: "Simplification des workflow",
                description: "Monitoring & Suivi des appels",
              },
              {
                title: "Modules intelligents",
                description: "Analyse prédictive et alertes automatisées",
              },
            ]}
            ethosTitle="Professional Ethos"
            ethosDescription="With over 15 years at the intersection of heavy industry and software engineering, Alexandre has scaled STEAMULO from a niche consultancy to a global reliability partner."
            stats={[
              { value: "12+", label: "Global Markets" },
              { value: "$500M+", label: "Impact Delivered", highlight: true },
              { value: "250+", label: "Specialists Led" },
            ]}
            brandLogoSrc={BRAND_LOGO}
            brandLogoAlt="Steamulo"
            brandName="The Steamulo Standard"
            brandSubtitle="Uncompromising Reliability by Design"
            brandCtaLabel="Download Portfolio"
          />
        </section>

        {/* Section Ingénieur Augmenté */}
        <section className="w-full max-w-[1165px] mx-auto">
          <AugmentedSection
            eyebrow="Innovation IA"
            title="L'Ingénieur Augmenté au service d'Armatis"
            description="Chez Steamulo, nos développeurs ne codent plus seuls. Ils sont propulsés par l'Intelligence Artificielle pour transcender les limites de la productivité et de la fiabilité."
            features={[
              {
                iconSrc: ICON_COPILOT,
                iconAlt: "Copilot",
                title: "Pair-Programming avec Copilot",
                description:
                  "Génération de boilerplate et suggestion d'algorithmes complexes en temps réel.",
              },
              {
                iconSrc: ICON_TEST,
                iconAlt: "Tests",
                title: "Tests Automatisés par IA",
                description:
                  "Identification prédictive des cas limites et génération de suites de tests exhaustives.",
              },
              {
                iconSrc: ICON_SPEED,
                iconAlt: "Vitesse",
                title: "Vitesse de Livraison ×3",
                description:
                  "Réduction drastique du time-to-market sans compromis sur la dette technique.",
              },
            ]}
            steps={[
              { number: "01", title: "Cadre & conception", accent: "orange" },
              { number: "02", title: "Predictive QA", accent: "blue" },
              { number: "03", title: "Code Generation", accent: "orange" },
              { number: "04", title: "Auto-Doc", accent: "blue" },
            ]}
          />
        </section>

        {/* CTA Banner */}
        <section className="w-full max-w-[1101px] mx-auto">
          <CtaBanner
            title={"Prêt à augmenter\nvos projets ?"}
            description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
            primaryLabel="Parlons de votre projet"
            primaryHref="/contact"
            secondaryLabel="Voir nos offres"
            secondaryHref="/contact"
          />
        </section>
      </main>
      </PageTransition>

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
