import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import { HeroSection } from "@/components/blocks/HeroSection";
import { HeroSnapWrapper } from "@/components/blocks/HeroSnapWrapper";
import { PoleIdentityBanner } from "@/components/blocks/PoleIdentityBanner";
import { ProcessStepper, type Step } from "@/components/blocks/ProcessStepper";
import { WorkShowcase, type Project } from "@/components/blocks/WorkShowcase";
import { produits } from "@/lib/content/produits";
import { agents } from "@/lib/content/agents";
import type { Locale } from "@/types";

const RD_ACCENT = "var(--color-offer-green)";
const RD_ACCENT_LIGHT = "var(--color-offer-green)";

const RD_PROJECTS: Project[] = [
  {
    id: "carrefour-rd",
    client: "Carrefour",
    title: "Application mobile location voiture autonome",
    description:
      "Application mobile permettant la location de véhicules autonomes en magasin — gestion de flotte en temps réel et IA embarquée.",
    tags: ["Mobile", "IoT", "Véhicule autonome"],
    accent: "var(--color-offer-green)",
    wide: true,
  },
  {
    id: "louvre-hotels",
    client: "Louvre Hotels",
    title: "Machine Learning analyse prédictive",
    description:
      "Modèles prédictifs appliqués à la gestion hôtelière — anticipation de la demande, optimisation tarifaire et analyse comportementale.",
    tags: ["Machine Learning", "Prédictif", "Data"],
    accent: "var(--color-offer-blue)",
  },
  {
    id: "sncf",
    client: "SNCF",
    title: "Application mobile orientation malvoyants en gare",
    description:
      "Aide à la navigation en gare pour les voyageurs malvoyants — reconnaissance d'environnement par IA et guidage vocal.",
    tags: ["Mobile", "Accessibilité", "IA"],
    accent: "var(--color-offer-green)",
    wide: true,
  },
];

const RD_STEPS: Step[] = [
  {
    id: "identification",
    num: "01",
    title: "Identification",
    description:
      "Analyser le marché, les tendances et les besoins utilisateurs pour détecter et structurer les opportunités d'innovation.",
    highlights: [],
    accent: RD_ACCENT,
    pipeline: [
      {
        label: "Identification des opportunités d'innovation",
        description: "Analyser marché, tendances et besoins utilisateurs.",
      },
      {
        label: "Définition des objectifs",
        description: "Clarifier parties prenantes, accomplissements et bénéfices attendus.",
      },
      {
        label: "Recherche et veille technologique",
        description: "Approfondir la technologie existante, surveiller les innovations.",
      },
      {
        label: "Évaluation des ressources",
        description: "Compétences humaines et infrastructures.",
      },
      {
        label: "Génération d'idées",
        description: "Sessions brainstorming favorisant la diversité.",
      },
    ],
  },
  {
    id: "poc",
    num: "02",
    title: "Construction POC / MVP",
    description:
      "Sélectionner les concepts les plus prometteurs, puis construire, tester et valider en itérations courtes.",
    highlights: [],
    accent: RD_ACCENT,
    pipeline: [
      {
        label: "Sélection des concepts",
        description: "Évaluer faisabilité technique et viabilité économique.",
      },
      {
        label: "Prototypage",
        description:
          "Co-Conception et réalisation. Validation. Développement. Tests et validation continue.",
      },
    ],
  },
];

export default async function RDPage() {
  const locale = (await getLocale()) as Locale;

  return (
    <div className="bg-nav-bg min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <HeroSnapWrapper>
          <HeroSection
            eyebrow="PÔLE R&D — AGRÉMENTS CIR & CII DEPUIS 10 ANS"
            title={"De l'idée\nau produit,\nen partenaires."}
            highlightWord="partenaires"
            highlightStyle="solid"
            highlightColor="#46BA87"
            description="Nos équipes R&D structurent chaque projet d'innovation avec rigueur — de l'identification des opportunités au prototypage, pour nos clients et en interne."
            titleSize="compact"
            showScrollIndicator
          />
        </HeroSnapWrapper>

        {/* ── Idée 1 : Partenaire de vos innovations ───────────────── */}
        <PoleIdentityBanner
          poleLabel="R&D"
          accentColor={RD_ACCENT}
          accentColorLight={RD_ACCENT_LIGHT}
          tagline="Partenaire de vos innovations."
          description="Nous souhaitons dans notre démarche être force de proposition et d'accompagnement technique auprès de nos clients afin de pouvoir les accompagner au quotidien sur leurs projets d'innovations."
          stats={[
            { value: "10 ans", label: "Agréments CIR & CII" },
            { value: "2", label: "Domaines d'action R&D" },
            { value: "3", label: "Produits internes en production" },
          ]}
          keywords={[
            "Labs d'innovation clients",
            "Projets R&D internes",
            "IA factory",
            "Pôle produit",
          ]}
        />

        {/* ── Idée 2 : Démarche itérative numérotée ────────────────── */}
        <ProcessStepper
          steps={RD_STEPS}
          sectionLabel="Notre démarche"
          titleText="Une démarche itérative numérotée."
          highlightWord="itérative"
          labelColor={RD_ACCENT_LIGHT}
        />

        {/* ── Idée 3a : Projets clients R&D ───────────────────────── */}
        <WorkShowcase
          projects={RD_PROJECTS}
          sectionLabel="Projets clients"
          labelColor={RD_ACCENT}
          titleNode={
            <>
              La preuve{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(162.47deg, #8effc6 0%, #46BA87 100%)",
                }}
              >
                par l&apos;exemple.
              </span>
            </>
          }
        />

        {/* ── Nos produits ─────────────────────────────────────────── */}
        <section
          className="w-full py-16 md:py-20"
          style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
        >
          <div
            className="relative flex flex-col gap-10 p-10 md:p-14 rounded-[var(--radius-card)] border border-white/5 overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(255,126,51,0.10) 0%, #090F42 60%)",
              borderColor: "rgba(255,126,51,0.15)",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,126,51,0.12) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex flex-col gap-4 max-w-[580px]">
                <span
                  className="font-sans text-brand-orange-light uppercase tracking-widest"
                  style={{ fontSize: "var(--text-label)" }}
                >
                  Pôle produit
                </span>
                <h2
                  className="font-sans font-bold text-white"
                  style={{
                    fontSize: "var(--text-card-title)",
                    lineHeight: "var(--text-card-title--line-height)",
                  }}
                >
                  Des logiciels IA, développés en interne
                </h2>
                <p
                  className="font-sans text-text-light/60"
                  style={{
                    fontSize: "var(--text-nav)",
                    lineHeight: "var(--text-nav--line-height)",
                  }}
                >
                  Nos projets R&D internes via le pôle produit donnent naissance à des logiciels
                  complets, directement déployables dans votre organisation. Gestion des
                  collaborateurs, recrutement, santé, comptes-rendus — chaque produit répond
                  à un besoin métier réel.
                </p>
              </div>

              <Link
                href="/produits"
                className="flex items-center justify-center gap-2 px-6 h-10 rounded-[var(--radius-pill-sm)] border text-white font-sans shrink-0 transition-all"
                style={{
                  borderColor: "rgba(255,126,51,0.4)",
                  fontSize: "var(--text-nav)",
                  backgroundColor: "rgba(255,126,51,0.06)",
                }}
              >
                Voir nos produits
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
              {produits.map((produit) => (
                <Link
                  key={produit.slug}
                  href="/produits"
                  className="flex flex-col gap-4 p-5 rounded-[16px] border border-white/5 bg-deep-navy/50 hover:border-brand-orange/30 transition-colors group"
                >
                  {produit.iconSrc && (
                    <Image
                      src={decodeURIComponent(produit.iconSrc)}
                      alt={produit.name[locale]}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-sans font-semibold text-white group-hover:text-brand-orange-light transition-colors"
                      style={{ fontSize: "var(--text-tab)" }}
                    >
                      {produit.name[locale]}
                    </span>
                    {produit.badge && (
                      <span className="font-sans text-text-muted" style={{ fontSize: "var(--text-label)" }}>
                        {produit.badge[locale]}
                      </span>
                    )}
                  </div>
                  {produit.stats[0] && (
                    <span className="font-sans font-bold text-brand-orange-light" style={{ fontSize: "var(--text-nav)" }}>
                      {produit.stats[0].value}
                      <span className="text-text-muted font-normal ml-1">
                        {produit.stats[0].label[locale]}
                      </span>
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Nos agents ───────────────────────────────────────────── */}
        <section
          className="w-full py-16 md:py-20"
          style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
        >
          <div
            className="relative flex flex-col gap-10 p-10 md:p-14 rounded-[var(--radius-card)] border overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at bottom left, rgba(61,60,232,0.10) 0%, #090F42 60%)",
              borderColor: "rgba(61,60,232,0.2)",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(61,60,232,0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex flex-col gap-4 max-w-[580px]">
                <span
                  className="font-sans uppercase tracking-widest"
                  style={{
                    fontSize: "var(--text-label)",
                    color: "var(--color-bento-dev-accent)",
                  }}
                >
                  IA factory
                </span>
                <h2
                  className="font-sans font-bold text-white"
                  style={{
                    fontSize: "var(--text-card-title)",
                    lineHeight: "var(--text-card-title--line-height)",
                  }}
                >
                  Des agents IA, au service de vos usages
                </h2>
                <p
                  className="font-sans text-text-light/60"
                  style={{
                    fontSize: "var(--text-nav)",
                    lineHeight: "var(--text-nav--line-height)",
                  }}
                >
                  Notre IA factory produit des agents intelligents capables d&apos;automatiser
                  des processus complexes en langage naturel. Chaque agent se connecte à vos
                  outils existants ou à nos produits, sans modifier votre infrastructure.
                </p>
              </div>

              <Link
                href="/agents"
                className="flex items-center justify-center gap-2 px-6 h-10 rounded-[var(--radius-pill-sm)] border text-white font-sans shrink-0 transition-all"
                style={{
                  borderColor: "rgba(61,60,232,0.5)",
                  fontSize: "var(--text-nav)",
                  backgroundColor: "rgba(61,60,232,0.08)",
                }}
              >
                Voir nos agents
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <Link
                  key={agent.slug}
                  href={`/agents?from=${agent.produitSlug}`}
                  className="flex flex-col gap-4 p-5 rounded-[16px] border border-white/5 bg-deep-navy/50 transition-colors group"
                >
                  {agent.iconSrc && (
                    <Image
                      src={decodeURIComponent(agent.iconSrc)}
                      alt={agent.name[locale]}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-sans font-semibold text-white group-hover:text-[color:var(--color-bento-dev-accent)] transition-colors"
                      style={{ fontSize: "var(--text-tab)" }}
                    >
                      {agent.name[locale]}
                    </span>
                    {agent.badge && (
                      <span className="font-sans text-text-muted" style={{ fontSize: "var(--text-label)" }}>
                        {agent.badge[locale]}
                      </span>
                    )}
                  </div>
                  {agent.stats[0] && (
                    <span
                      className="font-sans font-bold"
                      style={{ fontSize: "var(--text-nav)", color: "var(--color-bento-dev-accent)" }}
                    >
                      {agent.stats[0].value}
                      <span className="text-text-muted font-normal ml-1">
                        {agent.stats[0].label[locale]}
                      </span>
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Idée 4 : Citation Steve Jobs ─────────────────────────── */}
        <QuoteBlock
          quote="Parfois, quand vous innovez, vous faites des erreurs. Celui qui n'a jamais commis d'erreurs, n'a jamais tenté d'innover."
          attribution="Steve Jobs"
        />

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-24"
          style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
        >
          <CtaBanner />
        </section>
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
