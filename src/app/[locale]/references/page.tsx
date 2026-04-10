import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReferenceHero } from "@/components/blocks/ReferenceHero";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import { ReferenceBento } from "@/components/blocks/ReferenceBento";
import { AugmentedSection } from "@/components/blocks/AugmentedSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";

const HERO_BG = "/images/references/infra-cloud.webp";
const EXPERT_IMAGE = "/images/team/sylvain-gourio.png";
const BRAND_LOGO = "/images/logos/armatis.png";

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header ctaLabel="Je lance mon projet" ctaHref="/#contact" />

      <main className="flex flex-col flex-1">
        {/* Hero */}
        <ReferenceHero
          eyebrow="ÉTUDE DE CAS : ARMATIS"
          title="Armatis, le déploiement de l'IA à grande échelle"
          highlightPhrase="déploiement de l'IA"
          description="Nous fusionnons expertise technique industrielle et innovation numérique pour bâtir des solutions robustes, agiles et performantes."
          backgroundImageSrc={HERO_BG}
          backgroundImageAlt="Équipe Armatis en opération"
        />

        {/* Quote + Bento */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col gap-6">
            <QuoteBlock
              quote="L'intégration d'une intelligence artificielle au cœur des process ouvre des perspectives fortes en matière de performance, de qualité de service et d'accompagnement des conseillers"
              attribution="Strategic Vision 2025"
            />

            <ReferenceBento
              expertImageSrc={EXPERT_IMAGE}
              expertImageAlt="Sophie Vasseur, Head of Strategy"
              expertName="Sophie Vasseur"
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
          </div>
        </section>

        {/* Section Ingénieur Augmenté */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <AugmentedSection
              eyebrow="Innovation IA"
              title="L'Ingénieur Augmenté au service d'Armatis"
              description="Chez Steamulo, nos développeurs ne codent plus seuls. Ils sont propulsés par l'Intelligence Artificielle pour transcender les limites de la productivité et de la fiabilité."
              features={[
                {
                  iconSrc: "",
                  iconAlt: "Copilot",
                  title: "Pair-Programming avec Copilot",
                  description:
                    "Génération de boilerplate et suggestion d'algorithmes complexes en temps réel.",
                },
                {
                  iconSrc: "",
                  iconAlt: "Tests",
                  title: "Tests Automatisés par IA",
                  description:
                    "Identification prédictive des cas limites et génération de suites de tests exhaustives.",
                },
                {
                  iconSrc: "",
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
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <CtaBanner
              title="Prêt à augmenter\nvos projets ?"
              description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
              primaryLabel="Parlons de votre projet"
              primaryHref="/#contact"
              secondaryLabel="Voir nos offres"
              secondaryHref="/#offres"
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
