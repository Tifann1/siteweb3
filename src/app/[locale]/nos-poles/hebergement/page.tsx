// Page — Pôle DevOps & Infrastructure (Hébergement)
// Route : /[locale]/nos-poles/hebergement
// Figma node 533:5629

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

export default function PoleHebergementPage() {
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
            eyebrow="pôle DevOps & Infrastructure"
            title={"Garantir la souveraineté\net la sécurité de vos\nagents IA."}
            highlightWord={"souveraineté\net la sécurité"}
            highlightStyle="gradient"
            description="Nous concevons des environnements d'hébergement, de déploiement et d'exploitation pensés pour des agents IA sécurisés, conformes et maîtrisés."
            align="right"
            sizeMode="flex"
          />

          {/* Tabs navigation pôles (node 533:5777) — DevOps actif */}
          <div className="py-6">
            <div className="max-w-[1280px] mx-auto px-6 md:px-8">
              <PoleTabsNavWrapper />
            </div>
          </div>
        </div>

        {/* Identité du pôle */}
        <PoleIdentityBanner
          poleLabel="DevOps & Infrastructure"
          accentColor="var(--color-tab-active-devops)"
          accentColorLight="var(--color-offer-yellow)"
          tagline="Infrastructure invisible. Performance maximale."
          stats={[
            { value: "+80", label: "Infras pilotées" },
            { value: "10 ans", label: "Expertise cloud" },
            { value: "99.9%", label: "Disponibilité cible" },
          ]}
          keywords={["Cloud", "CI/CD", "Sécurité", "Monitoring", "Souveraineté"]}
        />

        {/* Bento Grid — L'équipe derrière vos agents IA (node 533:5642) */}
        <SectionBentoGrid
          title="L'équipe derrière vos agents IA"
          featureCard={{
            image: "/images/poles/devops-team.png",
            imageAlt: "L'équipe du pôle DevOps",
            title: "L'équipe du pôle Devops",
            description:
              "Nous concevons des environnements d'hébergement maîtrisés pour vos agents IA, avec un haut niveau d'exigence sur la sécurité, la conformité et la souveraineté.",
          }}
          featureCardGradientFrom="var(--color-feature-devops-from)"
          wideCard={{
            title: "Déploiement maîtrisé",
            description:
              "Nous industrialisons la mise en production de vos agents IA avec des pipelines fiables, des environnements stables et une exploitation sans rupture.",
          }}
          bottomCards={[
            {
              title: "Sécurité intégrée",
              description:
                "DevSecOps, contrôle des accès, supervision, durcissement : la sécurité est pensée dès le départ, pas ajoutée après coup.",
              variant: "highlight-yellow",
            },
            {
              title: "Conformité & exploitation",
              description:
                "Nous structurons des socles techniques conformes, traçables et opérables, adaptés à vos contraintes métier et réglementaires.",
            },
          ]}
          ctaLabel="Je réserve un rendez-vous avec un expert."
          ctaVariant="yellow"
        />

        {/* Section Des infrastructures IA maîtrisées (node 627:5209) */}
        <section className="py-16 md:py-24">
          <SectionAugmentedDev
            accentColor="var(--color-bento-devops-border)"
            heading="Des infrastructures IA maîtrisées"
            subheading="Nous concevons des environnements d'hébergement et d'exploitation pensés pour des agents IA souverains, sécurisés et opérables à l'échelle."
            steps={[
              {
                icon: (
                  <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 6h18M3 12h18M3 18h18" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 6v12M16 6v12" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Scalabilité maîtrisée",
                description:
                  "Nous structurons des environnements capables d'absorber la charge, de garantir la disponibilité et d'accompagner la montée en usage.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="#DFE1F8" strokeWidth="1.5" />
                    <path d="M8 21h8M12 17v4" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 9l2.5 2.5L14 7" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Pilotage des ressources",
                description:
                  "Nous optimisons l'infrastructure, la consommation et l'exploitation pour concilier performance, maîtrise des coûts et stabilité.",
              },
              {
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="#DFE1F8" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Sécurité proactive",
                description:
                  "Nous intégrons supervision, détection d'anomalies et mécanismes de protection pour sécuriser vos environnements IA en continu.",
              },
            ]}
            techCards={[
              {
                icon: (
                  <svg width="24" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" stroke="#DFE1F8" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Montée en charge",
                subtitle: "Scalabilité pilotée",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M18 20V10M12 20V4M6 20v-6" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Supervision continue",
                subtitle: "Alertes & observabilité",
              },
              {
                icon: (
                  <svg width="24" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="#DFE1F8" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Infra sécurisée",
                subtitle: "Protection continue",
              },
            ]}
          />
        </section>

        {/* Section Nos Succès (node 533:5738) */}
        <SectionNosSucces
          title="Nos Succès"
          subtitle="L'IA concrète au service de nos partenaires."
          ctaLabel="Voir toutes les études de cas"
          cards={[
            {
              image: "/images/references/infra-cloud.webp",
              imageAlt: "Migration Cloud",
              logo: "/images/logos/inpi.svg",
              logoAlt: "Client",
              sector: "Secteur privé",
              title: "Migration d'une infrastructure vers un Cloud unifié",
              stats: [
                { value: "+24%", label: "Productivité logistique globale" },
                { value: "-30%", label: "Coûts d'infrastructure" },
              ],
            },
            {
              image: "/images/references/laposte.jpg",
              imageAlt: "Refonte application La Poste",
              logo: "/images/logos/laposte.svg",
              logoAlt: "La Poste",
              sector: "Secteur Privé",
              title: "Refonte de l'application Veiller sur mes parents",
              stats: [
                { value: "+24%", label: "Productivité logistique globale" },
                { value: "+40%", label: "Disponibilité applicative" },
              ],
            },
          ]}
        />

        {/* Section Directeur du Pôle (node 533:5771) */}
        <SectionDirecteurPole
          name="Thibault Buze"
          role="Directeur du Pôle Hébergement"
          imageSrc="/images/team/thibault-buze.png"
          poleLabel="Hébergement"
          accentColor="var(--color-tab-active-devops)"
          badgeColor="var(--color-offer-yellow)"
          vision="Une infrastructure invisible est une infrastructure réussie. Mon équipe s'assure que vos produits tournent, s'adaptent et évoluent — sans que vous ayez jamais à y penser."
          stats={[
            { value: "10 ans", label: "Expérience" },
            { value: "+80", label: "Infras pilotées" },
          ]}
          ctaLabel="Auditer mon infra"
          ctaHref="/contact"
        />

        {/* CTA Banner */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
