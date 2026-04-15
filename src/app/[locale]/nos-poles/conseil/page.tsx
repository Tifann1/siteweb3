// Page — Pôle Conseil & Transformation
// Route : /[locale]/nos-poles/conseil

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { SectionDirecteurPole } from "@/components/blocks/SectionDirecteurPole";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { SectionBentoGrid } from "@/components/blocks/SectionBentoGrid";
import { IntegrationSchema } from "@/components/blocks/IntegrationSchema";
import { SectionNosSucces } from "@/components/blocks/SectionNosSucces";
import { SectionExpertTeam } from "@/components/blocks/SectionExpertTeam";
import { PoleTabsNavWrapper } from "./PoleTabsNavWrapper";

// ⚠ Assets Figma — expirent dans 7 jours. Remplacer par /public/ avant mise en prod.
const ICON_ANALYSE =
  "https://www.figma.com/api/mcp/asset/98e8c280-f348-44b7-a7dd-ccb62777c876";
const ICON_CONCEPTION =
  "https://www.figma.com/api/mcp/asset/32556cd1-5415-40c9-934f-1101f0a59745";
const ICON_PILOTAGE =
  "https://www.figma.com/api/mcp/asset/8db3aa91-8feb-40aa-afa7-e2ed1720e431";
const ICON_INSIGHTS =
  "https://www.figma.com/api/mcp/asset/b3a7fcb7-2beb-4293-af87-7788c0ce5145";
const ICON_ROADMAP =
  "https://www.figma.com/api/mcp/asset/a44155be-2645-40fa-a9c6-2cd116618a21";
const ICON_ROI =
  "https://www.figma.com/api/mcp/asset/6a070cee-f136-4e2e-97f5-3a38666ebbf7";
const TEAM_PHOTO =
  "https://www.figma.com/api/mcp/asset/c59d9ca1-e33b-4ab1-b16e-d8b34e291938";
const REFERENCE_IMAGE =
  "https://www.figma.com/api/mcp/asset/a14db11b-9958-489f-8761-76f1d7a86e15";
const ARMATIS_LOGO =
  "https://www.figma.com/api/mcp/asset/038928eb-6df7-457e-917b-e4e151dbb022";

export default function PoleConseilPage() {
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
            eyebrow="Pôle Conseil & Transformation"
            title={"Imaginer des agents IA,\nautomatiser vos\nprocessus métier."}
            highlightWord="agents IA"
            highlightStyle="gradient"
            description="Nous accompagnons les organisations dans la conception, l'intégration et le déploiement d'agents IA utiles, robustes et pensés pour le terrain."
            align="right"
            sizeMode="flex"
          />

          {/* Tabs navigation pôles */}
          <div className="py-6">
            <div className="max-w-[1280px] mx-auto px-6 md:px-8">
              <PoleTabsNavWrapper />
            </div>
          </div>
        </div>

        {/* Section Bento Grid — Agents IA & aide à la décision */}
        <SectionBentoGrid
          title="Agents IA & aide à la décision"
          featureCard={{
            image: TEAM_PHOTO,
            imageAlt: "Équipe du pôle conseil",
            title: "L'équipe du pôle conseil",
            description:
              "Nos ingénieurs, spécialistes IA et experts produit conçoivent des agents IA utiles, robustes et pensés pour vos usages métier.",
          }}
          wideCard={{
            title: "Stratégie augmentée par l'IA",
            description:
              "Nos experts n'analysent pas seulement vos enjeux : ils les modélisent. Grâce à nos outils exploitant LLMs et agents IA, nous accélérons la capacité de diagnostic et de projection.",
          }}
          bottomCards={[
            {
              title: "Audits automatisés",
              description:
                "Analyse rapide de vos stacks techniques, de vos flux et de vos dettes opérationnelles via nos moteurs IA.",
              variant: "highlight",
            },
            {
              title: "Copilote de décision",
              description:
                "Simulation de scénarios métier pour évaluer les options, anticiper les risques et éclairer l'investissement.",
              variant: "default",
            },
          ]}
          ctaLabel="Je réserve un rendez-vous avec un expert."
          ctaHref="/contact"
        />

        {/* Section Integration Schema — Des agents IA de l'idée à l'impact */}
        <IntegrationSchema
          title="Des agents IA de l'idée à l'impact"
          description="Nous cadrons, concevons et déployons des agents IA utiles, pensés pour vos métiers, vos équipes et vos résultats."
          steps={[
            {
              iconSrc: ICON_ANALYSE,
              iconAlt: "Analyse",
              title: "Analyse des usages",
              description:
                "Nous identifions vos cas d'usage prioritaires et les opportunités d'automatisation à plus forte valeur.",
            },
            {
              iconSrc: ICON_CONCEPTION,
              iconAlt: "Conception",
              title: "Conception de l'agent IA",
              description:
                "Nous cadrons le besoin, définissons les flux, les données et les interactions pour concevoir un agent IA activable.",
            },
            {
              iconSrc: ICON_PILOTAGE,
              iconAlt: "Pilotage",
              title: "Pilotage de la valeur",
              description:
                "Nous mesurons l'impact réel de vos agents IA sur vos opérations, vos délais et votre performance métier.",
            },
          ]}
          miniCards={[
            {
              iconSrc: ICON_INSIGHTS,
              title: "Insights rapides",
              subtitle: "Analyse métier assistée",
            },
            {
              iconSrc: ICON_ROADMAP,
              title: "Roadmap IA",
              subtitle: "Priorisation des usages",
            },
            {
              iconSrc: ICON_ROI,
              title: "ROI suivi",
              subtitle: "Décision pilotée par la donnée",
            },
          ]}
        />

        {/* Section Nos Succès */}
        <SectionNosSucces
            title="Nos Succès"
            subtitle="L'IA concrète au service de nos partenaires."
            ctaLabel="Voir tous les cas clients"
            ctaHref="/references"
            cards={[
              {
                image: REFERENCE_IMAGE,
                imageAlt: "Équipe Armatis en opération",
                logo: ARMATIS_LOGO,
                logoAlt: "Armatis Technology",
                sector: "Secteur Privé",
                title: "Application métier augmentée de suivi de qualité",
                stats: [
                  { value: "+24%", label: "Productivité logistique globale" },
                  { value: "-18%", label: "Taux d'erreurs de saisie" },
                ],
              },
              {
                image: REFERENCE_IMAGE,
                imageAlt: "Projet secteur public",
                sector: "Secteur Public",
                title: "Plateforme IA de traitement documentaire automatisé",
                stats: [
                  { value: "×3", label: "Vitesse de traitement des dossiers" },
                  { value: "95%", label: "Taux de satisfaction utilisateurs" },
                ],
              },
            ]}
          />

        {/* Section Directrice du Pôle */}
        <SectionDirecteurPole
          name="Virginie"
          role="Directrice du Pôle Conseil"
          imageSrc="/images/team/virginie.png"
          poleLabel="Conseil"
          accentColor="var(--color-tab-active)"
          vision="Notre rôle n'est pas de délivrer des slides — c'est de transformer durablement la façon dont nos clients opèrent. Chaque mission commence par comprendre l'humain derrière le problème."
          stats={[
            { value: "12 ans", label: "Expérience" },
            { value: "+200", label: "Projets livrés" },
          ]}
          ctaLabel="Discuter avec l'équipe"
          ctaHref="/contact"
        />

        {/* Section Les Visages du Pôle */}
        <SectionExpertTeam
          heading="Les Visages du Pôle"
          experts={CONSEIL_EXPERTS}
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

const CONSEIL_EXPERTS = [
  {
    name: "Virginie",
    imageSrc: "/images/team/virginie.png",
    role: "Directrice du Pôle",
  },
  {
    name: "Thomas",
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Thomas",
    role: "Lead Consultant IA",
  },
  {
    name: "Camille",
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Camille",
    role: "Expert Stratégie",
  },
  {
    name: "Julien",
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Julien",
    role: "Architecte IA",
  },
];
