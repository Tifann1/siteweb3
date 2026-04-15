// Page — Pôle Développement Full-stack
// Route : /[locale]/nos-poles/developpement
// Figma node 533:5358

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { SectionBentoGrid } from "@/components/blocks/SectionBentoGrid";
import { SectionAugmentedDev } from "@/components/blocks/SectionAugmentedDev";
import { SectionNosSucces } from "@/components/blocks/SectionNosSucces";
import { SectionDirecteurPole } from "@/components/blocks/SectionDirecteurPole";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { PoleIdentityBanner } from "@/components/blocks/PoleIdentityBanner";
import { PoleTabsNavWrapper } from "./PoleTabsNavWrapper";

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
          accentColor="var(--color-tab-active-dev)"
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
          ctaLabel="Je réserve un rendez-vous avec un expert."
        />

        {/* Section Développement augmenté par l'IA (node 533:5404) */}
        <section className="py-16 md:py-24">
          <SectionAugmentedDev accentColor="var(--color-bento-dev-accent)" />
        </section>

        {/* Section Nos Succès (node 533:5467) */}
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

        {/* Section Directeur du Pôle (node 533:5500) */}
        <SectionDirecteurPole
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

        {/* CTA Banner (node 294:1434) */}
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
      </main>

      <Footer />
    </div>
  );
}
