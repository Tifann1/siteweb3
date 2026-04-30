// Page — Pôle Développement Full-stack
// Route : /[locale]/nos-poles/developpement

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
import { FeatureBento } from "@/components/blocks/FeatureBento";
import { PoleOffersGrid } from "@/components/blocks/PoleOffersGrid";
import { OFFER_GRADIENTS } from "@/components/blocks/OffersSection";
import { PoleSideNav } from "@/components/ui/PoleSideNav";

const SECTIONS = [
  { id: "pole-presentation", label: "Présentation" },
  { id: "pole-savoirfaire",  label: "Savoir-faire" },
  { id: "pole-projets",      label: "Pour vos projets" },
  { id: "pole-offres",       label: "Nos offres" },
  { id: "pole-succes",       label: "Nos succès" },
];

const ACCENT = "var(--color-offer-blue)";

export default function PoleDeveloppementPage() {
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
            eyebrow="Pôle Développement Full-stack"
            title={"Des architectures\npour des agents IA\nfiables et performants."}
            highlightWord={"agents IA\nfiables et performants"}
            highlightStyle="gradient"
            description="Nous concevons les socles techniques, les intégrations et les interfaces qui permettent à vos agents IA de fonctionner à l'échelle."
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

        {/* Présentation */}
        <div id="pole-presentation">
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

        </div>

        {/* Développement augmenté par l'IA — avant les offres */}
        <div id="pole-projets">
        <section className="py-16 md:py-24">
          <SectionAugmentedDev accentColor="var(--color-bento-dev-accent)" />
        </section>

        </div>

        {/* Nos offres */}
        <div id="pole-offres">
        <PoleOffersGrid
          variant="list"
          tabs={[
            {
              label: "IA & Data",
              description: "Solutions IA agentique, machine learning et data engineering — du prototype à la production souveraine",
              cards: [
                {
                  title: "Déploiement\nd'IA Agentique",
                  badge: "meilleure vente",
                  accentColor: "#5cc996",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Cadrage des workflows métiers automatisables",
                    "Conception d'architectures multi-agents",
                    "Intégration de modèles IA avancés",
                    "Déploiement full-stack & industrialisation",
                  ],
                  profiles: ["Développeur IA", "Architecte LLM", "Lead Technique"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  articles: [
                    { title: "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.", category: "Engineering", href: "/actualite/ia-generative-industrie-prototype-production" },
                    { title: "Lancement de SteamPulse : Le tableau de bord IA nouvelle génération.", category: "Produit", href: "/actualite/lancement-steampulse-tableau-de-bord-ia" },
                  ],
                  clientRefs: ["INPI", "BPCE", "La Poste", "Institut Français"],
                },
                {
                  title: "Développement\nMachine Learning",
                  accentColor: "#5cc996",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Étude de faisabilité & choix du modèle adapté",
                    "Conception & entraînement de modèles prédictifs",
                    "Visualisation & exploitation des résultats",
                    "Industrialisation & amélioration continue",
                  ],
                  profiles: ["Data Scientist", "ML Engineer", "Lead Data"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  articles: [
                    { title: "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.", category: "Engineering", href: "/actualite/ia-generative-industrie-prototype-production" },
                  ],
                  clientRefs: ["BPCE", "La Poste", "CMN"],
                },
                {
                  title: "Speech-to-Text\n& Voice of Customer",
                  accentColor: "#5cc996",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Capture & transcription automatique des interactions",
                    "Analyse IA des sentiments & de la qualité",
                    "Détection de signaux faibles métier",
                    "Infrastructure souveraine & conforme RGPD",
                  ],
                  profiles: ["Data Scientist", "ML Engineer", "Développeur Python"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  clientRefs: ["Institut Français", "CMN", "Agence de la Biomédecine"],
                },
                {
                  title: "Big Data &\nData Visualisation",
                  accentColor: "#5cc996",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Collecte & structuration de données massives",
                    "Traitement & enrichissement des données",
                    "Visualisation & pilotage métier",
                    "Infrastructure cloud sécurisée & scalable",
                  ],
                  profiles: ["Data Engineer", "Architecte Data", "Lead Data"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  articles: [
                    { title: "Gouvernance des données en 2024 : Les enjeux du secteur public", category: "Data", href: "/actualite/gouvernance-donnees-2024-secteur-public" },
                  ],
                  clientRefs: ["INPI", "La Poste", "Paris Musées", "Atout France"],
                },
                {
                  title: "Exposer ses données\nen Open Data",
                  accentColor: "#5cc996",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Structuration & mise en qualité des données",
                    "Conception de portails Open Data modernes",
                    "Exposition des données via API ouvertes",
                    "Architecture robuste, accessible & conforme",
                  ],
                  profiles: ["Data Engineer", "Développeur API", "Architecte Data"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  articles: [
                    { title: "Gouvernance des données en 2024 : Les enjeux du secteur public", category: "Data", href: "/actualite/gouvernance-donnees-2024-secteur-public" },
                  ],
                  clientRefs: ["CNIL", "Atout France", "CMN"],
                },
                {
                  title: "Caviardage de\ndocuments",
                  accentColor: "#5cc996",
                  headerGradient: OFFER_GRADIENTS.teal,
                  features: [
                    "Détection automatique des données personnelles (PII)",
                    "Traitement intelligent multi-formats",
                    "Caviardage IA avancé et contextualisé",
                    "Architecture souveraine & industrialisable",
                  ],
                  profiles: ["Développeur IA", "Expert NLP", "Architecte IA"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  clientRefs: ["CNIL", "Institut Français", "Agence de la Biomédecine"],
                },
              ],
            },
            {
              label: "Développement",
              description: "Applications web & mobile, APIs, CMS et expertise technique — des socles robustes pensés pour durer",
              cards: [
                {
                  title: "Développement\nReact",
                  badge: "meilleure vente",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Architecture front-end robuste et scalable",
                    "Design system modulaire et réutilisable",
                    "Qualité logicielle & tests automatisés",
                    "Intégration fluide et accessibilité native",
                  ],
                  profiles: ["Développeur Front-end", "Lead Front", "UX Engineer"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  articles: [
                    { title: "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.", category: "Engineering", href: "/actualite/ia-generative-industrie-prototype-production" },
                  ],
                  clientRefs: ["INPI", "BPCE", "Paris Musées", "Carrefour Spectacles"],
                },
                {
                  title: "Développement\nAPI REST",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Conception d'architectures API évolutives",
                    "Standardisation & documentation des services",
                    "Sécurité & gestion des accès",
                    "Intégration & scalabilité dans votre SI",
                  ],
                  profiles: ["Développeur Back-end", "Architecte API", "Lead Tech"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  clientRefs: ["INPI", "BPCE", "La Poste", "CMN"],
                },
                {
                  title: "Développement\nDrupal",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Déploiement de plateformes Drupal robustes",
                    "Structuration de contenus et parcours éditoriaux",
                    "Recherche avancée et performance SEO",
                    "Évolutivité, accessibilité et maintenance long terme",
                  ],
                  profiles: ["Développeur Drupal", "Intégrateur CMS", "Lead Technique"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  clientRefs: ["Atout France", "Institut Français", "CMN", "Paris Musées"],
                },
                {
                  title: "Reprise de\nmaintenance Java",
                  badge: "meilleure vente",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Audit et diagnostic du système existant",
                    "Modernisation progressive des applications",
                    "Sécurisation et mise à niveau technique",
                    "Maintenance et évolution continue",
                  ],
                  profiles: ["Développeur Java", "Lead Dev", "Architecte SI"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  clientRefs: ["BPCE", "La Poste", "Paris Musées", "CMN"],
                },
                {
                  title: "Signature\nélectronique",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Digitalisation complète des processus documentaires",
                    "Signature électronique et validation sécurisée",
                    "Archivage probant et conformité réglementaire",
                    "Interconnexion avec vos systèmes d'information",
                  ],
                  profiles: ["Développeur Back-end", "Lead Technique", "Expert GED"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  clientRefs: ["INPI", "CNIL", "CMN", "Agence de la Biomédecine"],
                },
                {
                  title: "Keycloak &\nSécurisation d'APIs",
                  accentColor: "var(--color-offer-blue)",
                  headerGradient: OFFER_GRADIENTS.blue,
                  features: [
                    "Mise en place d'une gestion centralisée des identités",
                    "Intégration SSO et fédération d'identités",
                    "Sécurisation des échanges API et services",
                    "Architecture IAM adaptable et multi-stack",
                  ],
                  profiles: ["Développeur Back-end", "Expert IAM", "Architecte Sécurité"],
                  ctaLabel: "Prendre RDV",
                  ctaHref: "/contact",
                  clientRefs: ["INPI", "BPCE", "Atout France", "CMN"],
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
