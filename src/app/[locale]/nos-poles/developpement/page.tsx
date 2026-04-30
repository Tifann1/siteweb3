// Page — Pôle Développement Full-stack
// Route : /[locale]/nos-poles/developpement
// Figma node 533:5358

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { SectionBentoGrid } from "@/components/blocks/SectionBentoGrid";
import { SectionAugmentedDev } from "@/components/blocks/SectionAugmentedDev";
import { SectionNosSucces } from "@/components/blocks/SectionNosSucces";
import { ScrollRevealSection } from "@/components/blocks/ScrollRevealSection";
import { SectionDirecteurPole } from "@/components/blocks/SectionDirecteurPole";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { PoleIdentityBanner } from "@/components/blocks/PoleIdentityBanner";
import { PoleTabsNavWrapper } from "./PoleTabsNavWrapper";
import { FeatureBento } from "@/components/blocks/FeatureBento";
import { PoleOffersGrid } from "@/components/blocks/PoleOffersGrid";
import { OFFER_GRADIENTS } from "@/components/blocks/OffersSection";

export default function PoleDeveloppementPage() {
  return (
    <div
      className="min-h-screen flex flex-col w-full"
      style={{ backgroundColor: "var(--color-nav-bg)" }}
    >
      {/* Header sticky */}
      <Header />

      <main className="flex flex-col w-full">
        {/* Hero + tabs dans un écran — hero flex-1, tabs ancrés en bas */}
        <div className="min-h-screen flex flex-col">
          <HeroSection
            eyebrow="Pôle Développement Full-stack"
            title={"Des architectures\npour des agents IA\nfiables et performants."}
            highlightWord={"agents IA\nfiables et performants"}
            highlightStyle="gradient"
            description="Nous concevons les socles techniques, les intégrations et les interfaces qui permettent à vos agents IA de fonctionner à l'échelle."
            align="right"
            sizeMode="flex"
          />

          {/* Tabs navigation pôles (node 533:5506) */}
          <div className="py-6">
            <div className="max-w-[1280px] mx-auto px-6 md:px-8">
              <PoleTabsNavWrapper />
            </div>
          </div>
        </div>

        {/* Identité du pôle */}
        <PoleIdentityBanner
          poleLabel="Développement"
          accentColor="var(--color-bento-dev-accent)"
          accentColorLight="var(--color-bento-dev-accent)"
          tagline="Code solide. Agents IA fiables."
          stats={[
            { value: "+150", label: "Applis livrées" },
            { value: "8 ans", label: "Expertise full-stack" },
            { value: "×3", label: "Accélération time-to-market" },
          ]}
          keywords={["Next.js", "APIs", "Agents IA", "Mobile", "Tests"]}
        />

        {/* Bento Grid — L'équipe qui conçoit vos agents IA (node 533:5371) */}
        <SectionBentoGrid
          title="L'équipe qui conçoit vos agents IA"
          featureCard={{
            image: "/images/poles/dev-team.png",
            imageAlt: "L'équipe du pôle développement",
            title: "L'équipe du pôle développement",
            description:
              "Nos ingénieurs, spécialistes IA et experts produit conçoivent des agents IA utiles, robustes et pensés pour vos usages métier.",
          }}
          featureCardGradientFrom="var(--color-tab-active-dev)"
          ctaVariant="blue"
          wideCard={{
            title: "Développement sur mesure",
            description:
              "Nous concevons des agents IA adaptés à vos usages, à vos flux et à vos contraintes opérationnelles.",
          }}
          bottomCards={[
            {
              title: "Intégration métier",
              description:
                "Nous connectons vos agents IA à vos outils, vos données et vos environnements existants.",
              variant: "highlight-blue",
            },
            {
              title: "Pensé pour la production",
              description:
                "Nos agents IA sont conçus pour s'intégrer à vos outils, vos données et vos contraintes de sécurité, avec une approche robuste et souveraine.",
            },
          ]}
          ctaLabel="Réserver un rendez-vous avec un expert"
        />

        <FeatureBento
          sectionLabel="Nos savoir-faire"
          heading={
            <>
              Deux expertises.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)" }}
              >
                Une ambition commune.
              </span>
            </>
          }
          features={[
            {
              label: "Développement Web Sur Mesure",
              icon: "◈",
              title: "Des applications qui tiennent dans le temps",
              description:
                "Nous concevons des applications full-stack robustes, des APIs scalables et des architectures pensées pour durer — pas pour impressionner en démo.",
              accent: "var(--color-offer-blue)",
            },
            {
              label: "Agents IA",
              icon: "◎",
              title: "Les socles techniques de vos agents IA",
              description:
                "Nous construisons les intégrations, les pipelines de données et les interfaces qui permettent à vos agents IA de fonctionner à l'échelle, en production, dans la durée.",
              accent: "var(--color-offer-green)",
            },
          ]}
        />

        <PoleOffersGrid
          variant="list"
          tabs={[
            {
              label: "Projets Web Sur Mesure",
              cards: [
                {
                  title: "Développement\nweb & mobile",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Applications React / Next.js",
                    "APIs REST & GraphQL",
                    "Applications mobiles",
                    "Tests & qualité",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Architecture\n& APIs",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Micro-services",
                    "GraphQL / REST",
                    "Documentation OpenAPI",
                    "Revue de code",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Développement\nweb & mobile",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Applications React / Next.js",
                    "APIs REST & GraphQL",
                    "Applications mobiles",
                    "Tests & qualité",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Architecture\n& APIs",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Micro-services",
                    "GraphQL / REST",
                    "Documentation OpenAPI",
                    "Revue de code",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Développement\nweb & mobile",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Applications React / Next.js",
                    "APIs REST & GraphQL",
                    "Applications mobiles",
                    "Tests & qualité",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Architecture\n& APIs",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Micro-services",
                    "GraphQL / REST",
                    "Documentation OpenAPI",
                    "Revue de code",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
              ],
            },
            {
              label: "Agents IA",
              cards: [
                {
                  title: "Agents IA\nsur mesure",
                  accentColor: "var(--color-offer-green)",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Conception d'agents IA",
                    "Intégration LLM",
                    "RAG & bases vectorielles",
                    "Déploiement production",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Intégration\nmétier",
                  accentColor: "var(--color-offer-green)",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Connexion aux outils existants",
                    "Automatisation de workflows",
                    "Monitoring des agents",
                    "Formation équipes",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Agents IA\nsur mesure",
                  accentColor: "var(--color-offer-green)",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Conception d'agents IA",
                    "Intégration LLM",
                    "RAG & bases vectorielles",
                    "Déploiement production",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Intégration\nmétier",
                  accentColor: "var(--color-offer-green)",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Connexion aux outils existants",
                    "Automatisation de workflows",
                    "Monitoring des agents",
                    "Formation équipes",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
                {
                  title: "Agents IA\nsur mesure",
                  accentColor: "var(--color-offer-green)",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Conception d'agents IA",
                    "Intégration LLM",
                    "RAG & bases vectorielles",
                    "Déploiement production",
                  ],
                  ctaLabel: "Accéder à l'offre",
                  ctaHref: "/contact",
                },
              ],
            },
          ]}
        />

        {/* Section Développement augmenté par l'IA (node 533:5404) */}
        <section className="py-16 md:py-24">
          <SectionAugmentedDev accentColor="var(--color-bento-dev-accent)" />
        </section>

        {/* Bulle deep-navy → NosSucces + Directeur + CTA */}
        <ScrollRevealSection>
          <SectionNosSucces
            title="Nos Succès"
            subtitle="L'IA concrète au service de nos partenaires."
            ctaLabel="Voir tous les cas clients"
            cards={[
              {
                image: "/images/references/inpi.webp",
                imageAlt: "Application INPI",
                logo: "/images/logos/inpi.svg",
                logoAlt: "INPI",
                sector: "Secteur Public",
                title: "Application métier de gestion et de paiement",
                stats: [
                  { value: "+24%", label: "Productivité logistique globale" },
                  { value: "+18%", label: "Réduction du temps de traitement" },
                ],
              },
              {
                image: "/images/references/bpce.jpg",
                imageAlt: "Application BPCE",
                logo: "/images/logos/bpce.svg",
                logoAlt: "BPCE",
                sector: "Secteur Privé",
                title: "Application métier de suivi des clients",
                stats: [
                  { value: "+24%", label: "Productivité logistique globale" },
                  { value: "+30%", label: "Satisfaction utilisateur" },
                ],
              },
            ]}
          />

          <SectionDirecteurPole
            className="mt-12 md:mt-20"
            name="Sylvain Gourio"
            role="Directeur du Pôle Développement"
            imageSrc="/images/team/sylvain-gourio.png"
            poleLabel="Développement"
            accentColor="var(--color-tab-active-dev)"
            vision="Coder vite c'est bien. Coder juste, c'est mieux. Nous livrons des architectures qui tiennent dans le temps parce que nous refusons la dette technique dès le premier sprint."
            stats={[
              { value: "8 ans", label: "Expérience" },
              { value: "+150", label: "Applis livrées" },
            ]}
            ctaLabel="Voir nos réalisations"
            ctaHref="/references"
          />

          <section
            className="py-16 md:py-24"
            style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
          >
            <CtaBanner
              title={"Prêt à augmenter\nvos projets ?"}
              description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
              primaryLabel="Parlons de votre projet"
              primaryHref="/contact"
              secondaryLabel="Voir nos offres"
              secondaryHref="/contact"
            />
          </section>
        </ScrollRevealSection>
      </main>

      <Footer />
    </div>
  );
}
