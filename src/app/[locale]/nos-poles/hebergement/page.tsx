// Page — Pôle DevOps & Infrastructure (Hébergement)
// Route : /[locale]/nos-poles/hebergement

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { SectionBentoGrid } from "@/components/blocks/SectionBentoGrid";
import { SectionAugmentedDev } from "@/components/blocks/SectionAugmentedDev";
import { FeatureBento } from "@/components/blocks/FeatureBento";
import { PoleOffersGrid } from "@/components/blocks/PoleOffersGrid";
import { OFFER_GRADIENTS } from "@/components/blocks/OffersSection";
import { SectionNosSucces } from "@/components/blocks/SectionNosSucces";
import { ScrollRevealSection } from "@/components/blocks/ScrollRevealSection";
import { SectionDirecteurPole } from "@/components/blocks/SectionDirecteurPole";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { PoleIdentityBanner } from "@/components/blocks/PoleIdentityBanner";
import { PoleTabsNavWrapper } from "./PoleTabsNavWrapper";
import { PoleSideNav } from "@/components/ui/PoleSideNav";
import { PoleSubHeader } from "@/components/ui/PoleSubHeader";
import { ArticlesFeaturedSection } from "@/components/blocks/ArticlesFeaturedSection";
import { LabSection } from "@/components/blocks/LabSection";
import { articles } from "@/lib/content/actualite";
import { Link } from "@/navigation";

const SECTIONS = [
  { id: "pole-presentation", label: "Présentation" },
  { id: "pole-expertises",   label: "Nos expertises" },
  { id: "pole-savoirfaire",  label: "Savoir-faire" },
  { id: "pole-projets",      label: "Pour vos projets" },
  { id: "pole-offres",       label: "Nos offres" },
  { id: "pole-succes",       label: "Nos succès" },
];

const ACCENT = "var(--color-offer-yellow)";

export default function PoleHebergementPage() {
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
            eyebrow="Pôle DevOps & Infrastructure"
            title={"Du bare metal au cloud,\nvos infrastructures entre\nde bonnes mains."}
            highlightWord={"vos infrastructures entre\nde bonnes mains"}
            highlightStyle="gradient"
            description="Hébergement souverain on-premise, cloud managé, cybersécurité et DevSecOps — nous concevons, déployons et opérons les environnements qui font tourner vos projets critiques et vos agents IA, sans compromis sur la maîtrise ni sur la conformité."
            align="right"
            sizeMode="flex"
          />
          <div className="py-6">
            <div className="max-w-[1280px] mx-auto px-6 md:px-8">
              <PoleTabsNavWrapper />
            </div>
          </div>
        </div>

        {/* Identité */}
        <PoleIdentityBanner
          poleLabel="DevOps & Infrastructure"
          accentColor="var(--color-tab-active-devops)"
          accentColorLight="var(--color-offer-yellow)"
          tagline="Souveraineté. Sécurité. Maîtrise totale."
          stats={[
            { value: "+80", label: "Infras pilotées" },
            { value: "10 ans", label: "Expertise cloud & on-premise" },
            { value: "99.9%", label: "Disponibilité contractuelle" },
          ]}
          keywords={["On-premise", "Kubernetes", "OVHcloud", "Scaleway", "WAF", "EDR", "CI/CD", "Ansible", "Terraform"]}
        />

        {/* 1 — Présentation */}
        <div id="pole-presentation">
          <SectionBentoGrid
            title="De la conception à l'exploitation, rien n'est laissé au hasard"
            featureCard={{
              image: "/images/poles/devops-team.png",
              imageAlt: "Pôle Hébergement & Infrastructure",
              title: "Pôle Hébergement & Infrastructure",
              description:
                "Hébergement souverain, cybersécurité, DevOps et infogérance : notre pôle couvre l'intégralité du cycle de vie de votre infrastructure — de la conception de l'architecture jusqu'au maintien en conditions opérationnelles 24/7.",
            }}
            featureCardGradientFrom="var(--color-feature-devops-from)"
            wideCard={{
              title: "OS-agnostique grâce à Kubernetes",
              description:
                "Notre staging et nos environnements de production tournent sur Kubernetes. Cette approche nous rend OS-agnostiques : même catalogue de services, même niveau de qualité, quel que soit le substrat — bare metal Proxmox, VM ou cloud public.",
            }}
            bottomCards={[
              {
                title: "Catalogue de services complet",
                description:
                  "De la VM à l'orchestration Kubernetes, de la gestion de domaine à la réversibilité totale — nous proposons un catalogue de services d'hébergement adapté à chaque niveau de criticité.",
                variant: "highlight-yellow",
              },
              {
                title: "Archi complexe by design",
                description:
                  "Nous concevons des architectures multi-zones et haute disponibilité selon vos contraintes métier. La complexité est pensée dès le départ, pas ajoutée après coup.",
              },
            ]}
            ctaLabel="Réserver un rendez-vous avec un expert"
            ctaVariant="yellow"
          />
        </div>

        {/* 2 — Nos expertises (4 verticales) */}
        <div id="pole-expertises">
          <FeatureBento
            sectionLabel="Nos expertises"
            heading={
              <>
                Quatre verticales.
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(162.47deg, #F0D88A 0%, #C9AA3A 100%)" }}
                >
                  Zéro compromis.
                </span>
              </>
            }
            features={[
              {
                icon: "◎",
                label: "Cybersécurité",
                title: "Protection, conformité et gouvernance sécurité",
                description:
                  "Avec l'entrée en vigueur de NIS 2 et le renforcement des exigences RGPD, les organisations ont l'obligation de structurer leur posture sécurité. Steamulo vous accompagne de l'audit initial jusqu'à la mise en conformité opérationnelle, avec des hébergements qualifiés SecNumCloud.",
                accent: "#a78bfa",
              },
              {
                icon: "☁",
                label: "Cloud souverain",
                title: "Multi-zones, certifié SecNumCloud, HDS et RGPD",
                description:
                  "Partenaire OVHcloud depuis plus de 7 ans, Steamulo conçoit des architectures cloud souveraines multi-zones, résilientes et conformes aux exigences réglementaires les plus strictes (SecNumCloud, HDS, RGPD). Nous accompagnons aussi bien les migrations vers le cloud que les architectures cloud-native.",
                accent: "#34d399",
              },
              {
                icon: "⬡",
                label: "On-premise & Datacenter",
                title: "Datacenters privés à Paris, réseau cœur et virtualisation HA",
                description:
                  "Pour les organisations qui exigent une maîtrise totale de leur infrastructure physique, Steamulo conçoit et opère des datacenters privés à Paris (Data4, Equinix PA6). Expertise réseau de niveau cœur de réseau, multi-zoning géographique, virtualisation haute disponibilité et QoS managée.",
                accent: "#60a5fa",
              },
              {
                icon: "⚙",
                label: "DevOps & Infogérance",
                title: "GitOps, CI/CD et MCO 24/7 avec self-healing IA",
                description:
                  "Steamulo opère vos plateformes en continu — de la mise en place de la chaîne CI/CD jusqu'au MCO 24/7. Notre approche GitOps et Infra as Code garantit des déploiements reproductibles et traçables. Notre agent IA de self-healing (N8N) réduit les incidents avant qu'ils n'impactent vos utilisateurs.",
                accent: "#fbbf24",
              },
            ]}
          />
        </div>

        {/* 3 — Savoir-faire (horizontales) */}
        <div id="pole-savoirfaire">
          <section
            style={{
              paddingTop: "6rem",
              paddingBottom: "6rem",
              paddingLeft: "var(--page-margin-x)",
              paddingRight: "var(--page-margin-x)",
            }}
          >
            <div className="flex flex-col gap-4 mb-14">
              <span
                className="font-body font-semibold text-brand-orange uppercase tracking-widest"
                style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
              >
                Savoir-faire
              </span>
              <h2
                className="font-sans font-bold text-text-heading"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                Le lien entre Dev et Ops.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
              {[
                {
                  label: "Usine logicielle CI/CD",
                  title: "Déploiements automatisés, livraisons sans friction",
                  description:
                    "Nous mettons en place des chaînes CI/CD industrialisées avec GitLab CI, GitHub Actions ou Jenkins. Du commit au déploiement en production, chaque étape est automatisée, versionnée et réversible en quelques secondes.",
                  accent: "var(--color-offer-yellow)",
                  tags: ["GitLab CI", "GitHub Actions", "Jenkins", "ArgoCD"],
                },
                {
                  label: "IaC, Migrations & Audits",
                  title: "Infrastructure as Code et urbanisation du SI",
                  description:
                    "Ansible et Terraform pour un infrastructure as code reproductible. Migrations de A à Z, audit de compliance et haute disponibilité, livrables formalisés (DAT, DEX, PAS) et accompagnement de vos équipes dans la durée.",
                  accent: "var(--color-bento-devops-border)",
                  tags: ["Ansible", "Terraform", "DAT / DEX", "Audit compliance"],
                },
                {
                  label: "Observabilité & SLA",
                  title: "Grafana, Prometheus et alerting proactif 24/7",
                  description:
                    "Dashboards temps réel, alertes intelligentes, tracing distribué. Nous définissons et tenons des engagements de service contractuels (GTI, GTR, RTO, RPO) avec comités de pilotage technique, sécurité et opérationnel.",
                  accent: "var(--color-offer-green)",
                  tags: ["Grafana", "Prometheus", "Loki", "SLA 24/7"],
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-6 px-0 py-8 md:py-0 md:px-10 first:pl-0 last:pr-0">
                  <div className="w-8 h-[3px] rounded-full" style={{ backgroundColor: item.accent }} />
                  <span
                    className="font-body font-semibold uppercase tracking-widest"
                    style={{ fontSize: "var(--text-badge)", letterSpacing: "0.1em", color: item.accent }}
                  >
                    {item.label}
                  </span>
                  <h3
                    className="font-sans font-bold text-text-heading"
                    style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", lineHeight: 1.25, letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-text-light/55 flex-1"
                    style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--text-body-lg--line-height)" }}
                  >
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${item.accent}14`,
                          color: item.accent,
                          border: `1px solid ${item.accent}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 4 — Pour vos projets */}
        <div id="pole-projets">
          <section className="py-16 md:py-24">
            <SectionAugmentedDev
              accentColor="var(--color-bento-devops-border)"
              heading="Une infrastructure à la hauteur de vos agents IA"
              subheading="Déployer un agent IA en production exige des garanties que le cloud public ne peut pas toujours offrir. Nous structurons des socles souverains, sécurisés et supervisés pour que vos agents fonctionnent sans compromis."
              steps={[
                {
                  icon: (
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 6h18M3 12h18M3 18h18" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 6v12M16 6v12" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Isolation et souveraineté",
                  description:
                    "Vos modèles et données d'entraînement restent sur notre infrastructure physique en France. Aucun transit hors périmètre, conformité RGPD garantie, isolation totale des environnements.",
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#DFE1F8" strokeWidth="1.5" />
                      <path d="M8 21h8M12 17v4" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 9l2.5 2.5L14 7" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Scalabilité pilotée",
                  description:
                    "Kubernetes orchestre vos agents IA avec la même agilité qu'un cloud public : ajustement des ressources CPU/RAM sans coupure, montée en charge transparente, staging dédié avant toute mise en production.",
                },
                {
                  icon: (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="#DFE1F8" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Sécurité runtime",
                  description:
                    "Falco surveille vos conteneurs en temps réel, l'EDR bloque les menaces avant intrusion, le Bastion d'administration sécurise chaque accès. La sécurité de vos agents IA est architecturée avant le déploiement, pas corrigée après incident.",
                },
              ]}
              techCards={[
                {
                  icon: (
                    <svg width="24" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" stroke="#DFE1F8" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Kubernetes",
                  subtitle: "OS-agnostique",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M18 20V10M12 20V4M6 20v-6" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Falco & EDR",
                  subtitle: "Sécurité runtime",
                },
                {
                  icon: (
                    <svg width="24" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="#DFE1F8" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "WAF & Fortigate",
                  subtitle: "Protection périmétrique",
                },
              ]}
            />
          </section>

          <FeatureBento
            sectionLabel="Pour vos projets"
            heading={
              <>
                Deux cas d'usage.
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(162.47deg, #F0D88A 0%, #C9AA3A 100%)" }}
                >
                  Un socle commun.
                </span>
              </>
            }
            features={[
              {
                icon: "⬡",
                label: "Projets Web Sur Mesure",
                title: "L'infra invisible de vos applications",
                description:
                  "CI/CD automatisée, cloud souverain OVHcloud ou Scaleway, monitoring Grafana/Prometheus, SLA contractuels — nous opérons l'infrastructure de vos applications web de bout en bout pour que vos équipes développement se concentrent sur le produit.",
                accent: "var(--color-offer-yellow)",
              },
              {
                icon: "◎",
                label: "Agents IA en production",
                title: "Des socles souverains pour vos agents IA",
                description:
                  "On-premise Kubernetes, isolation totale, conformité RGPD, sécurité runtime Falco et supervision 24/7 : nous structurons les environnements d'hébergement qui permettent à vos agents IA de fonctionner en production avec des garanties que le cloud public ne peut offrir.",
                accent: "var(--color-offer-green)",
              },
            ]}
          />
        </div>

        {/* 5 — Nos offres */}
        <div id="pole-offres">
          <PoleOffersGrid
            variant="list"
            tabs={[
              {
                label: "Cybersécurité",
                description: "Offre standalone — protection, conformité réglementaire et gouvernance sécurité pour organisations publiques et privées",
                cards: [
                  {
                    title: "Conformité\n& gouvernance",
                    accentColor: "#a78bfa",
                    headerGradient: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,1) 0%, rgba(109,40,217,1) 100%)",
                    features: [
                      "Mise en conformité RGPD, NIS 2",
                      "Privacy by design & PIA / EBIOS RM",
                      "Plan d'Assurance Sécurité (PAS)",
                      "RGS & qualification SecNumCloud",
                      "Cartographie SI & CMDB",
                      "Audits de conformité & KPI/KRI sécurité",
                      "Gestion secrets (VaultWarden) & ZED!",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Supply chain sécurité : Cosign + Harbor en production", tags: ["Cosign", "Harbor", "Trivy"], status: "done", cat: "cyber" },
                      { title: "DMZ Kubernetes : isolation réseau avancée par namespace", tags: ["Calico", "NetworkPolicy", "RBAC"], status: "active", cat: "cyber" },
                    ],
                    articles: [
                      { title: "Gouvernance des données en 2024 : Les enjeux du secteur public", category: "Data", href: "/actualite/gouvernance-donnees-2024-secteur-public" },
                    ],
                    clientRefs: ["CNIL", "CCI Hauts-de-France (SecNumCloud)", "Atout France", "CMN", "Agence de la Biomédecine"],
                  },
                  {
                    title: "Protection\npérimétrique",
                    accentColor: "#a78bfa",
                    headerGradient: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,1) 0%, rgba(109,40,217,1) 100%)",
                    features: [
                      "WAF avancé (OGO Security, ModSecurity)",
                      "Anti-DDoS (OVH Shield, CloudFlare)",
                      "Zero Trust & segmentation réseau",
                      "Bastion & accès privilégiés (MFA, VPN)",
                      "IAM / Keycloak / SSO / RBAC",
                      "Sécurité mail (DMARC, DKIM, SPF)",
                      "Signature cryptographique (Cosign)",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "DMZ Kubernetes : isolation réseau avancée par namespace", tags: ["Calico", "NetworkPolicy", "RBAC"], status: "active", cat: "cyber" },
                      { title: "Supply chain sécurité : Cosign + Harbor en production", tags: ["Cosign", "Harbor", "Trivy"], status: "done", cat: "cyber" },
                    ],
                    clientRefs: ["CNIL", "CMN", "Paris Musées"],
                  },
                  {
                    title: "SOC & détection\n(EDR)",
                    accentColor: "#a78bfa",
                    headerGradient: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,1) 0%, rgba(109,40,217,1) 100%)",
                    features: [
                      "EDR système : HarfangLab (nœuds OS)",
                      "EDR Kubernetes : Falco + Falco-Talon",
                      "Antivirus : ClamAV (volumes, uploads, CI)",
                      "SIEM & centralisation des logs",
                      "Détection vulnérabilités (Trivy, Tenable)",
                      "Sécurité containers (OPA, Notary)",
                      "Interface SOC tiers (Advens…)",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "EDR dual-layer sur Kubernetes : HarfangLab + Falco", tags: ["HarfangLab", "Falco", "K8s"], status: "done", cat: "cyber" },
                      { title: "ClamAV natif en CI/CD et volumes Kubernetes", tags: ["ClamAV", "CronJob", "CI/CD"], status: "done", cat: "cyber" },
                    ],
                    clientRefs: ["Paris Musées", "CMN", "Agence de la Biomédecine"],
                  },
                  {
                    title: "Audits\n& conseil",
                    accentColor: "#a78bfa",
                    headerGradient: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,1) 0%, rgba(109,40,217,1) 100%)",
                    features: [
                      "Audit de sécurité infrastructure",
                      "Audit de performance & disponibilité",
                      "Supply chain logicielle (CI/CD attestation)",
                      "Brand protection & DNS scraping",
                      "Confidential Computing (enclaves)",
                      "Formation & sensibilisation équipes",
                      "Veille & patch management (CVSS)",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Benchmark des projets certifiés CNCF en 2025", tags: ["CNCF", "Cilium", "Kyverno"], status: "active", cat: "infra" },
                      { title: "Supply chain sécurité : Cosign + Harbor en production", tags: ["Cosign", "Harbor", "Trivy"], status: "done", cat: "cyber" },
                    ],
                    clientRefs: ["CNIL", "Atout France", "CMN"],
                  },
                ],
              },
              {
                label: "Cloud souverain",
                description: "Hébergement cloud européen qualifié, multi-cloud, multi-zones — OVHcloud, Scaleway, 3DS Outscale",
                cards: [
                  {
                    title: "Architecture\ncloud",
                    accentColor: "#34d399",
                    headerGradient: OFFER_GRADIENTS.teal,
                    features: [
                      "Design d'architectures multi-cloud",
                      "Multi-zoning & géo-réplication",
                      "Kubernetes managé (Helm, ArgoCD, Harbor)",
                      "Serverless & Edge (Lambda, Fastly CDN)",
                      "Stockage objet (MinIO, Ceph, S3)",
                      "CDN & optimisation de performance",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Kubernetes HA multi-zoning : architecture et opérations", tags: ["K8s", "HA", "multi-zone"], status: "active", cat: "infra" },
                      { title: "Benchmark des projets certifiés CNCF en 2025", tags: ["CNCF", "Cilium", "Kyverno"], status: "active", cat: "infra" },
                    ],
                    articles: [
                      { title: "Kubernetes en production : retour d'expérience après 2 ans", category: "DevOps", href: "/actualite/kubernetes-production-retour-experience" },
                    ],
                    clientRefs: ["CNIL", "CMN", "La Poste", "Carrefour Spectacles"],
                  },
                  {
                    title: "Move\nto cloud",
                    accentColor: "#34d399",
                    headerGradient: OFFER_GRADIENTS.teal,
                    features: [
                      "Audit & stratégie de migration",
                      "Migration lift-and-shift ou re-platforming",
                      "Architecture hybride on-prem + cloud",
                      "Containerisation & modernisation applicative",
                      "Migration de bases de données managées",
                      "Réversibilité & portabilité garanties",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    articles: [
                      { title: "Hébergement souverain : pourquoi nous avons investi dans notre propre infrastructure physique", category: "DevOps", href: "/actualite/hebergement-souverain-infra-physique" },
                    ],
                    clientRefs: ["Paris Musées", "CMN", "La Poste", "Carrefour Spectacles"],
                  },
                  {
                    title: "Souveraineté\n& conformité",
                    accentColor: "#34d399",
                    headerGradient: OFFER_GRADIENTS.teal,
                    features: [
                      "Hébergement SecNumCloud (OVH, Scaleway)",
                      "Qualification HDS (données de santé)",
                      "Datacenters 100% France / Europe",
                      "Isolation des données & cloisonnement",
                      "Politique RSE & Green IT",
                      "Archivage long terme (Scaleway Glacier)",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    articles: [
                      { title: "Hébergement souverain : pourquoi nous avons investi dans notre propre infrastructure physique", category: "DevOps", href: "/actualite/hebergement-souverain-infra-physique" },
                    ],
                    clientRefs: ["CNIL", "CCI Hauts-de-France", "Atout France", "CMN"],
                  },
                  {
                    title: "Résilience\n& FinOps",
                    accentColor: "#34d399",
                    headerGradient: OFFER_GRADIENTS.teal,
                    features: [
                      "Haute disponibilité multi-zones",
                      "PCA / PRA avec RTO & RPO définis",
                      "Sauvegarde chiffrée & restauration testée",
                      "Tests de montée en charge (k6, Gatling)",
                      "Audit & optimisation des coûts cloud",
                      "HPC / GPU pour modèles LLM & IA",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "HPC & GPU cloud pour inférence LLM souveraine", tags: ["GPU", "LLM", "vLLM"], status: "soon", cat: "infra" },
                      { title: "FinOps multi-cloud souverain : méthodes et outils", tags: ["FinOps", "OVH", "Scaleway"], status: "soon", cat: "devops" },
                    ],
                    clientRefs: ["CMN", "La Poste"],
                  },
                ],
              },
              {
                label: "On-premise & Datacenter",
                description: "Infrastructure physique souveraine, réseau cœur et virtualisation — pour les organisations qui maîtrisent leur datacenter",
                cards: [
                  {
                    title: "Infrastructure\nphysique",
                    accentColor: "#60a5fa",
                    headerGradient: OFFER_GRADIENTS.blue,
                    features: [
                      "Rack, câblage, alimentation redondée (N+1)",
                      "Datacenters Paris : Data4, Equinix PA6",
                      "Gestion des resellers & achat matériel",
                      "Supervision 24/7/365 & présence on-site",
                      "Migration datacenter & portabilité",
                      "Gestion des obsolescences matérielles",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    articles: [
                      { title: "Hébergement souverain : pourquoi nous avons investi dans notre propre infrastructure physique", category: "DevOps", href: "/actualite/hebergement-souverain-infra-physique" },
                    ],
                    clientRefs: ["CNIL (serveurs dédiés)", "Paris Musées (Equinix PA6)", "CMN"],
                  },
                  {
                    title: "Réseau\n& connectivité",
                    accentColor: "#60a5fa",
                    headerGradient: OFFER_GRADIENTS.blue,
                    features: [
                      "Cœur de réseau (routeurs, switchs)",
                      "Firewalls (Fortigate, Cisco, OpenSense)",
                      "VLAN & segmentation réseau avancée",
                      "VPN mesh & tunnels sécurisés (IPsec, SSL)",
                      "Infrastructure multihomée & peering",
                      "QoS & gestion de bande passante",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "DMZ Kubernetes : isolation réseau avancée par namespace", tags: ["Calico", "NetworkPolicy", "RBAC"], status: "active", cat: "cyber" },
                      { title: "Proxmox multi-zone mutualisé : gestion et isolation", tags: ["Proxmox", "TrueNAS", "VLAN"], status: "active", cat: "infra" },
                    ],
                    clientRefs: ["CNIL", "CMN", "Market Pay"],
                  },
                  {
                    title: "Virtualisation\n& HA",
                    accentColor: "#60a5fa",
                    headerGradient: OFFER_GRADIENTS.blue,
                    features: [
                      "Hyperviseurs VMware & Proxmox",
                      "Clusters haute disponibilité multi-zones",
                      "Stockage distribué (TrueNAS ZFS, Ceph, SAN)",
                      "PCA / PRA & tests de bascule",
                      "Sauvegarde & archivage chiffrés",
                      "Supervision Prometheus / Grafana",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Proxmox multi-zone mutualisé : gestion et isolation", tags: ["Proxmox", "TrueNAS", "VLAN"], status: "active", cat: "infra" },
                    ],
                    clientRefs: ["Paris Musées", "CMN", "Market Pay"],
                  },
                  {
                    title: "Hybride\n& transition",
                    accentColor: "#60a5fa",
                    headerGradient: OFFER_GRADIENTS.blue,
                    features: [
                      "Architecture hybride on-prem + cloud",
                      "Interconnexion privée (VPN site-to-site)",
                      "Migration progressive vers le cloud",
                      "Conseil architecture & dimensionnement",
                      "Gestion des licences & conformité",
                      "Documentation & réversibilité",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Kubernetes HA multi-zoning : architecture et opérations", tags: ["K8s", "HA", "multi-zone"], status: "active", cat: "infra" },
                      { title: "HPC & GPU cloud pour inférence LLM souveraine", tags: ["GPU", "LLM", "vLLM"], status: "soon", cat: "infra" },
                    ],
                    articles: [
                      { title: "Hébergement souverain : pourquoi nous avons investi dans notre propre infrastructure physique", category: "DevOps", href: "/actualite/hebergement-souverain-infra-physique" },
                    ],
                    clientRefs: ["Atout France", "CMN", "Market Pay"],
                  },
                ],
              },
              {
                label: "DevOps & Infogérance",
                description: "Automatisation, CI/CD, MCO et supervision — de la chaîne de déploiement au maintien en conditions opérationnelles",
                cards: [
                  {
                    title: "CI/CD\n& automatisation",
                    accentColor: "var(--color-offer-yellow)",
                    headerGradient: OFFER_GRADIENTS.yellow,
                    features: [
                      "GitOps (GitLab CI, GitHub Actions, Jenkins)",
                      "Infra as Code (Terraform, Ansible, Helm)",
                      "ArgoCD — déploiement continu Kubernetes",
                      "Self-healing & auto-remédiation (N8N + IA)",
                      "Harbor — registry privé + scan Trivy/Cosign",
                      "ClamAV en CI (scan fichiers à chaque build)",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Self-healing IA : auto-remédiation des incidents avec N8N", tags: ["N8N", "IA", "Prometheus"], status: "done", cat: "devops" },
                      { title: "ClamAV natif en CI/CD et volumes Kubernetes", tags: ["ClamAV", "CronJob", "CI/CD"], status: "done", cat: "cyber" },
                    ],
                    articles: [
                      { title: "CI/CD avec GitLab et ArgoCD : comment on industrialise nos déploiements", category: "DevOps", href: "/actualite/cicd-gitlab-argocd-industrialisation" },
                    ],
                    clientRefs: ["Paris Musées", "CMN", "Institut Français"],
                  },
                  {
                    title: "Infogérance\n& MCO",
                    accentColor: "var(--color-offer-yellow)",
                    headerGradient: OFFER_GRADIENTS.yellow,
                    features: [
                      "Support N1 / N2 / N3 structuré",
                      "TMA applicative & maintenance corrective",
                      "Gestion tickets, incidents, problèmes (ITIL)",
                      "MCO & MCS (maintien en sécurité)",
                      "Gestion des MEP & mises à jour",
                      "FinOps & optimisation continue",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Self-healing IA : auto-remédiation des incidents avec N8N", tags: ["N8N", "IA", "Prometheus"], status: "done", cat: "devops" },
                      { title: "Monitoring multi-cluster : performance et scalabilité", tags: ["Thanos", "Prometheus", "Grafana"], status: "active", cat: "devops" },
                    ],
                    articles: [
                      { title: "Kubernetes en production : retour d'expérience après 2 ans", category: "DevOps", href: "/actualite/kubernetes-production-retour-experience" },
                    ],
                    clientRefs: ["CCI Hauts-de-France", "Atout France", "CMN", "Agence du Service Civique"],
                  },
                  {
                    title: "Observabilité",
                    accentColor: "var(--color-offer-yellow)",
                    headerGradient: OFFER_GRADIENTS.yellow,
                    features: [
                      "Monitoring SRE (Prometheus, Grafana)",
                      "Logs centralisés (Loki, ElasticSearch, Graylog)",
                      "Alerting & on-call 24/7",
                      "Dashboards SLA / SLI / SLO clients",
                      "Capacity planning & tests de charge",
                      "AI Ops : agent IA sur pipelines N8N",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    labItems: [
                      { title: "Monitoring multi-cluster : performance et scalabilité", tags: ["Thanos", "Prometheus", "Grafana"], status: "active", cat: "devops" },
                      { title: "Self-healing IA : auto-remédiation des incidents avec N8N", tags: ["N8N", "IA", "Prometheus"], status: "done", cat: "devops" },
                    ],
                    articles: [
                      { title: "Kubernetes en production : retour d'expérience après 2 ans", category: "DevOps", href: "/actualite/kubernetes-production-retour-experience" },
                    ],
                    clientRefs: ["CMN", "Market Pay", "Paris Musées"],
                  },
                  {
                    title: "Gouvernance\n& reporting",
                    accentColor: "var(--color-offer-yellow)",
                    headerGradient: OFFER_GRADIENTS.yellow,
                    features: [
                      "Portail client (JIRA, CMDB, GED)",
                      "Comitologie & rapports d'activité",
                      "SLA contractualisés & pénalités",
                      "Gestion de crise & astreintes",
                      "Réversibilité & transfert de compétences",
                      "Amélioration continue & post-mortems",
                    ],
                    ctaLabel: "Nous contacter",
                    ctaHref: "/contact",
                    discoverLabel: "Découvrir le pôle",
                    discoverHref: "/nos-poles/hebergement",
                    articles: [
                      { title: "CI/CD avec GitLab et ArgoCD : comment on industrialise nos déploiements", category: "DevOps", href: "/actualite/cicd-gitlab-argocd-industrialisation" },
                    ],
                    clientRefs: ["Paris Musées", "CMN", "Institut Français", "Market Pay"],
                  },
                ],
              },
            ]}
          />
        </div>

        {/* 6 — Nos succès */}
        <div id="pole-succes">
          <div>
            <SectionNosSucces
              title="Nos Succès"
              subtitle="Des infrastructures maîtrisées au service de projets critiques."
              ctaLabel="Voir toutes les études de cas"
              cards={[
                {
                  image: "/images/references/infra-cloud.webp",
                  imageAlt: "Migration Cloud CMN",
                  logo: "/images/logos/inpi.svg",
                  logoAlt: "CMN",
                  sector: "Secteur public",
                  title: "Migration et hébergement souverain d'une plateforme de santé",
                  stats: [
                    { value: "-30%", label: "Coûts d'infrastructure" },
                    { value: "99.9%", label: "Disponibilité contractuelle" },
                  ],
                },
                {
                  image: "/images/references/laposte.jpg",
                  imageAlt: "Infrastructure H2A",
                  logo: "/images/logos/laposte.svg",
                  logoAlt: "H2A",
                  sector: "Secteur privé",
                  title: "Mise en place d'une infra Kubernetes on-premise avec SLA 24/7",
                  stats: [
                    { value: "0", label: "Incident de sécurité" },
                    { value: "+40%", label: "Vitesse de déploiement" },
                  ],
                },
              ]}
            />

            <SectionDirecteurPole
              className="mt-12 md:mt-20"
              name="Thibault Buze"
              role="Directeur du Pôle Hébergement & Infrastructure"
              imageSrc="/images/team/thibault-buze.png"
              poleLabel="Hébergement"
              accentColor="var(--color-tab-active-devops)"
              badgeColor="var(--color-offer-yellow)"
              vision="Une infrastructure réussie, c'est une infrastructure dont vous n'entendez jamais parler. Mon équipe s'assure que vos applications, vos données et vos agents IA tournent, s'adaptent et évoluent — souverains, sécurisés, 24h/24."
              stats={[
                { value: "10 ans", label: "Expérience" },
                { value: "+80", label: "Infras pilotées" },
              ]}
              ctaLabel="Auditer mon infrastructure"
              ctaHref="/contact"
            />

            <section
              className="py-16 md:py-24"
              style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
            >
              <CtaBanner
                title={"Votre infrastructure\nentre de bonnes mains."}
                description="Nos experts analysent votre existant, identifient vos risques et vous proposent un plan d'action concret — souveraineté, sécurité et disponibilité garanties."
                primaryLabel="Demander un audit"
                primaryHref="/contact"
                secondaryLabel="Voir nos offres"
                secondaryHref="/contact"
              />
            </section>
          </div>

          {/* Lab — même catégorie que les Actualités */}
          <LabSection />

          {/* Actualités DevOps */}
          {(() => {
            const devopsArticles = articles.filter((a) => a.category === "DevOps");
            const [featured, ...recents] = devopsArticles;
            if (!featured) return null;
            return (
              <section
                style={{
                  paddingTop: "6rem",
                  paddingBottom: "6rem",
                  paddingLeft: "var(--page-margin-x)",
                  paddingRight: "var(--page-margin-x)",
                }}
              >
                <div className="flex items-end justify-between mb-10">
                  <div className="flex flex-col gap-3">
                    <span
                      className="font-body font-semibold uppercase tracking-widest text-brand-orange"
                      style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
                    >
                      Actualités
                    </span>
                    <h2
                      className="font-sans font-bold text-text-heading"
                      style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                    >
                      DevOps & Infrastructure
                    </h2>
                  </div>
                  <Link
                    href="/actualite"
                    className="hidden md:flex items-center gap-2 font-body text-sm text-text-light/50 hover:text-text-light transition-colors"
                  >
                    Voir toutes les actualités
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                <ArticlesFeaturedSection
                  featured={{
                    imageSrc: featured.imageSrc,
                    category: featured.category,
                    date: new Date(featured.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
                    readingTime: featured.readingTime,
                    title: featured.title.fr,
                    excerpt: featured.excerpt.fr,
                    ctaHref: `/actualite/${featured.slug}`,
                  }}
                  recentArticles={recents.map((a) => ({
                    imageSrc: a.imageSrc,
                    imageAlt: a.title.fr,
                    category: a.category,
                    title: a.title.fr,
                    href: `/actualite/${a.slug}`,
                  }))}
                />
              </section>
            );
          })()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
