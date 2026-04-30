// Page — Pôle Conseil & Transformation
// Route : /[locale]/nos-poles/conseil

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { SectionDirecteurPole } from "@/components/blocks/SectionDirecteurPole";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { SectionBentoGrid } from "@/components/blocks/SectionBentoGrid";
import { FeatureBento } from "@/components/blocks/FeatureBento";
import { SectionNosSucces } from "@/components/blocks/SectionNosSucces";
import { SectionAugmentedDev } from "@/components/blocks/SectionAugmentedDev";
import { PoleIdentityBanner } from "@/components/blocks/PoleIdentityBanner";
import { PoleTabsNavWrapper } from "./PoleTabsNavWrapper";
import { PoleOffersGrid } from "@/components/blocks/PoleOffersGrid";
import { OFFER_GRADIENTS } from "@/components/blocks/OffersSection";
import { PoleSideNav } from "@/components/ui/PoleSideNav";

const TEAM_PHOTO =
  "https://www.figma.com/api/mcp/asset/c59d9ca1-e33b-4ab1-b16e-d8b34e291938";
const REFERENCE_IMAGE =
  "https://www.figma.com/api/mcp/asset/a14db11b-9958-489f-8761-76f1d7a86e15";
const ARMATIS_LOGO =
  "https://www.figma.com/api/mcp/asset/038928eb-6df7-457e-917b-e4e151dbb022";

const SECTIONS = [
  { id: "pole-presentation", label: "Présentation" },
  { id: "pole-savoirfaire",  label: "Savoir-faire" },
  { id: "pole-projets",      label: "Notre approche" },
  { id: "pole-offres",       label: "Nos offres" },
  { id: "pole-succes",       label: "Nos succès" },
];

const ACCENT = "var(--color-tab-active)";

export default function PoleConseilPage() {
  return (
    <div
      className="min-h-screen flex flex-col w-full"
      style={{ backgroundColor: "var(--color-nav-bg)" }}
    >
      <Header />
      <PoleSideNav sections={SECTIONS} accentColor={ACCENT} />

      <main className="flex flex-col w-full">
        {/* Hero + tabs */}
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
          <div className="py-6">
            <div className="max-w-[1280px] mx-auto px-6 md:px-8">
              <PoleTabsNavWrapper />
            </div>
          </div>
        </div>

        {/* Identité du pôle */}
        <PoleIdentityBanner
          poleLabel="Conseil"
          accentColor="var(--color-tab-active)"
          accentColorLight="var(--color-highlight-pole)"
          tagline="Imaginer. Modéliser. Transformer."
          stats={[
            { value: "+200", label: "Projets livrés" },
            { value: "12 ans", label: "Expertise conseil" },
            { value: "98%", label: "Satisfaction clients" },
          ]}
          keywords={["Agents IA", "Design Thinking", "Stratégie", "ROI mesurable"]}
        />

        {/* Présentation */}
        <div id="pole-presentation">
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
            ctaLabel="Réserver un rendez-vous avec un expert"
            ctaHref="/contact"
          />
        </div>

        {/* Savoir-faire */}
        <div id="pole-savoirfaire">
          <FeatureBento
            sectionLabel="Nos savoir-faire"
            heading={
              <>
                Deux expertises.
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
                  }}
                >
                  Une ambition commune.
                </span>
              </>
            }
            features={[
              {
                icon: "◈",
                label: "Projets Web Sur Mesure",
                title: "De l'idée au produit livré",
                description:
                  "Nous prenons en charge l'intégralité de votre projet web — du cadrage stratégique jusqu'à l'infrastructure en production. Conseil, développement, hébergement : une seule équipe, une seule responsabilité.",
                accent: "var(--color-offer-blue)",
              },
              {
                icon: "◎",
                label: "Agents IA",
                title: "Des agents prêts à l'usage, pensés pour le terrain",
                description:
                  "Nous concevons des agents IA directement intégrés à vos outils — prêts à l'emploi, connectés à vos workflows, opérationnels dès le premier jour.",
                accent: "var(--color-offer-green)",
              },
            ]}
          />
        </div>

        {/* Notre approche — avant les offres */}
        <div id="pole-projets">
          <section className="py-16 md:py-24">
            <SectionAugmentedDev
              accentColor="var(--color-tab-active)"
              heading="La méthode derrière chaque transformation"
              subheading="Nous ne livrons pas des recommandations. Nous co-construisons des transformations durables, outillées par l'IA, mesurées par des résultats concrets."
              steps={[
                {
                  icon: (
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M11 8v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Diagnostic augmenté",
                  description:
                    "Nos outils IA analysent vos processus, vos données et vos enjeux métier pour identifier rapidement les leviers de transformation à fort impact.",
                },
                {
                  icon: (
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Conception sur mesure",
                  description:
                    "Nous concevons des agents IA et des solutions adaptés à vos contraintes opérationnelles, vos équipes et vos objectifs stratégiques.",
                },
                {
                  icon: (
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 16l4-5 4 3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Pilotage de l'impact",
                  description:
                    "Nous mesurons en continu la valeur générée — gains de productivité, réduction des délais, amélioration de la qualité — et ajustons la trajectoire.",
                },
              ]}
              techCards={[
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Insights stratégiques",
                  subtitle: "Analyse IA des enjeux",
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Roadmap IA",
                  subtitle: "Priorisation & séquençage",
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "ROI mesuré",
                  subtitle: "KPIs & impact réel",
                },
              ]}
            />
          </section>
        </div>

        {/* Nos offres */}
        <div id="pole-offres">
          <PoleOffersGrid
            variant="list"
            tabs={[
              {
                label: "Audit & Diagnostic",
                description: "Évaluation de la conformité, analyse UX et diagnostic de transformation — pour identifier vos leviers d'amélioration",
                cards: [
                  {
                    title: "Audit RGAA\n& plan de correction",
                    badge: "meilleure vente",
                    accentColor: "var(--color-offer-orange)",
                    headerGradient: OFFER_GRADIENTS.orange,
                    features: [
                      "Évaluation de la conformité RGAA des interfaces numériques",
                      "Identification des non-conformités principales",
                      "Priorisation des actions de correction",
                      "Définition d'une feuille de route de mise en conformité",
                    ],
                    profiles: ["Consultant UX", "Expert Accessibilité", "Chef de projet"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    articles: [
                      { title: "Gouvernance des données en 2024 : Les enjeux du secteur public", category: "Data", href: "/actualite/gouvernance-donnees-2024-secteur-public" },
                    ],
                    clientRefs: ["INPI", "CNIL", "Atout France", "CMN"],
                  },
                  {
                    title: "Audit UX &\nresearch utilisateurs",
                    accentColor: "var(--color-offer-orange)",
                    headerGradient: OFFER_GRADIENTS.orange,
                    features: [
                      "Analyse des usages réels et comportements utilisateurs",
                      "Identification des irritants et points de friction",
                      "Exploration des besoins métiers et parcours utilisateurs",
                      "Formalisation d'opportunités UX actionnables",
                    ],
                    profiles: ["UX Researcher", "Designer UX", "Consultant Produit"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    clientRefs: ["BPCE", "Paris Musées", "Institut Français", "La Poste"],
                  },
                  {
                    title: "Diagnostic de\ntransformation",
                    accentColor: "var(--color-offer-orange)",
                    headerGradient: OFFER_GRADIENTS.orange,
                    features: [
                      "Analyse des freins organisationnels, culturels et opérationnels",
                      "Étude des processus et modes de fonctionnement existants",
                      "Identification des blocages à la transformation digitale",
                      "Recommandations de leviers d'amélioration concrets",
                    ],
                    profiles: ["Consultant Senior", "Expert Transformation", "Chef de projet"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    clientRefs: ["INPI", "La Poste", "CMN", "Atout France"],
                  },
                ],
              },
              {
                label: "Stratégie & Cadrage",
                description: "Discovery produit & IA, cadrage AMOA et sprints design — pour aligner vision, technologie et valeur métier",
                cards: [
                  {
                    title: "Product &\nIA Discovery",
                    badge: "meilleure vente",
                    accentColor: "var(--color-offer-blue)",
                    headerGradient: OFFER_GRADIENTS.blue,
                    features: [
                      "Exploration des cas d'usage produit et IA",
                      "Définition d'une vision et des objectifs stratégiques",
                      "Priorisation des opportunités à forte valeur",
                      "Alignement business, produit et technologie",
                    ],
                    profiles: ["Product Manager", "Consultant IA", "Lead Stratégie"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    articles: [
                      { title: "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.", category: "Engineering", href: "/actualite/ia-generative-industrie-prototype-production" },
                      { title: "Lancement de SteamPulse : Le tableau de bord IA nouvelle génération.", category: "Produit", href: "/actualite/lancement-steampulse-tableau-de-bord-ia" },
                    ],
                    clientRefs: ["INPI", "BPCE", "Institut Français", "CMN"],
                  },
                  {
                    title: "Cadrage projet\n& AMOA",
                    accentColor: "var(--color-offer-blue)",
                    headerGradient: OFFER_GRADIENTS.blue,
                    features: [
                      "Structuration des besoins et du périmètre projet",
                      "Formalisation des exigences fonctionnelles et métiers",
                      "AMOA et coordination des parties prenantes",
                      "Suivi et sécurisation de la mise en œuvre",
                    ],
                    profiles: ["Chef de projet", "AMOA", "Consultant MOA"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    clientRefs: ["INPI", "La Poste", "Atout France", "CMN"],
                  },
                  {
                    title: "Sprint design\nde l'idée au prototype",
                    accentColor: "var(--color-offer-blue)",
                    headerGradient: OFFER_GRADIENTS.blue,
                    features: [
                      "Transformation rapide d'une idée en concept structuré",
                      "Conception UX centrée utilisateur",
                      "Production de prototypes testables",
                      "Validation des hypothèses produit",
                    ],
                    profiles: ["Designer UX/UI", "Product Manager", "Facilitateur"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    clientRefs: ["BPCE", "Paris Musées", "Institut Français"],
                  },
                ],
              },
              {
                label: "Expérimentation & Acculturation",
                description: "POC IA, formation des équipes et ateliers DSI — pour ancrer l'IA dans vos pratiques et votre culture",
                cards: [
                  {
                    title: "Réalisation\nde POC IA",
                    badge: "meilleure vente",
                    accentColor: "#5cc996",
                    headerGradient: OFFER_GRADIENTS.teal,
                    features: [
                      "Développement de preuves de concept IA",
                      "Validation de la faisabilité technique et métier",
                      "Mesure de la valeur et du potentiel d'industrialisation",
                      "Itérations rapides sur les cas d'usage",
                    ],
                    profiles: ["Développeur IA", "Consultant IA", "Lead Technique"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    articles: [
                      { title: "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.", category: "Engineering", href: "/actualite/ia-generative-industrie-prototype-production" },
                      { title: "Lancement de SteamPulse : Le tableau de bord IA nouvelle génération.", category: "Produit", href: "/actualite/lancement-steampulse-tableau-de-bord-ia" },
                    ],
                    clientRefs: ["BPCE", "La Poste", "Institut Français", "CMN"],
                  },
                  {
                    title: "Acculturation à l'IA\n& conduite du changement",
                    accentColor: "#5cc996",
                    headerGradient: OFFER_GRADIENTS.teal,
                    features: [
                      "Sensibilisation aux enjeux et usages de l'IA",
                      "Formation des équipes aux nouveaux outils",
                      "Accompagnement à l'adoption des pratiques",
                      "Développement d'une culture IA partagée",
                    ],
                    profiles: ["Consultant Change Management", "Formateur IA", "Expert IA"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    clientRefs: ["CMN", "Institut Français", "La Poste", "Atout France"],
                  },
                  {
                    title: "Événements & ateliers\nIA pour DSI",
                    accentColor: "#5cc996",
                    headerGradient: OFFER_GRADIENTS.teal,
                    features: [
                      "Analyse des freins organisationnels, culturels et opérationnels",
                      "Étude des processus et modes de fonctionnement existants",
                      "Identification des blocages à la transformation digitale",
                      "Recommandations de leviers d'amélioration concrets",
                    ],
                    profiles: ["Consultant DSI", "Facilitateur", "Expert IA"],
                    ctaLabel: "Prendre RDV",
                    ctaHref: "/contact",
                    clientRefs: ["INPI", "Atout France", "CMN", "La Poste"],
                  },
                ],
              },
            ]}
          />
        </div>

        {/* Nos succès — sans fond bleu */}
        <div id="pole-succes">
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
                href: "/references/test",
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

          <SectionDirecteurPole
            className="mt-12 md:mt-20"
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
