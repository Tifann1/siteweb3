import type { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "ia-generative-industrie-prototype-production",
    title: {
      fr: "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.",
      en: "Generative AI in Industry: From Prototype to Production at Scale.",
    },
    excerpt: {
      fr: "Comment Steamulo accompagne les leaders industriels dans l'intégration de LLMs sécurisés pour l'optimisation des chaînes de maintenance prédictive.",
      en: "How Steamulo helps industrial leaders integrate secure LLMs to optimize predictive maintenance chains.",
    },
    category: "Engineering",
    date: "2024-05-12",
    readingTime: 8,
    videoSrc: "/images/actualite/TEASING_EP1.mov",
  },
  {
    slug: "edge-computing-latence-usines-connectees",
    title: {
      fr: "Edge Computing : Réduire la latence dans les usines connectées.",
      en: "Edge Computing: Reducing Latency in Connected Factories.",
    },
    excerpt: {
      fr: "Les enjeux du traitement local des données pour les usines 4.0 et comment réduire la dépendance au cloud.",
      en: "The challenges of local data processing for Industry 4.0 and how to reduce cloud dependency.",
    },
    category: "IoT",
    date: "2024-04-08",
    readingTime: 5,
    imageSrc: "/images/actualite/actualite-1.png",
  },
  {
    slug: "lancement-steampulse-tableau-de-bord-ia",
    title: {
      fr: "Lancement de SteamPulse : Le tableau de bord IA nouvelle génération.",
      en: "Launching SteamPulse: The Next-Generation AI Dashboard.",
    },
    excerpt: {
      fr: "SteamPulse centralise vos KPIs métier et vos alertes intelligentes dans une interface unifiée pilotée par l'IA.",
      en: "SteamPulse centralises your business KPIs and smart alerts in a unified AI-driven interface.",
    },
    category: "Produit",
    date: "2024-03-21",
    readingTime: 4,
    imageSrc: "/images/actualite/actualite-2.png",
  },
  {
    slug: "gouvernance-donnees-2024-secteur-public",
    title: {
      fr: "Gouvernance des données en 2024 : Les enjeux du secteur public.",
      en: "Data Governance in 2024: Public Sector Challenges.",
    },
    excerpt: {
      fr: "Souveraineté numérique, interopérabilité et RGPD : tour d'horizon des défis auxquels font face les administrations françaises.",
      en: "Digital sovereignty, interoperability and GDPR: an overview of challenges facing French public administrations.",
    },
    category: "Data",
    date: "2024-02-14",
    readingTime: 6,
    imageSrc: "/images/actualite/actualite-3.png",
  },
  {
    slug: "kubernetes-production-retour-experience",
    title: {
      fr: "Kubernetes en production : retour d'expérience après 2 ans.",
      en: "Kubernetes in Production: Lessons Learned After 2 Years.",
    },
    excerpt: {
      fr: "Comment nous avons industrialisé nos déploiements Kubernetes, du premier cluster de staging à une infra multi-tenant en production gérant plus de 80 environnements clients.",
      en: "How we industrialised our Kubernetes deployments, from the first staging cluster to a multi-tenant production infrastructure managing over 80 client environments.",
    },
    category: "DevOps",
    date: "2024-06-18",
    readingTime: 7,
    imageSrc: "/images/actualite/actualite-1.png",
  },
  {
    slug: "hebergement-souverain-infra-physique",
    title: {
      fr: "Hébergement souverain : pourquoi nous avons investi dans notre propre infrastructure physique.",
      en: "Sovereign Hosting: Why We Invested in Our Own Physical Infrastructure.",
    },
    excerpt: {
      fr: "Face aux contraintes RGPD et aux exigences de souveraineté de nos clients, nous avons fait le choix d'une infra on-premise maîtrisée. Retour sur cette décision stratégique.",
      en: "Faced with GDPR constraints and our clients' sovereignty requirements, we chose a controlled on-premise infrastructure. A look back at this strategic decision.",
    },
    category: "DevOps",
    date: "2024-07-03",
    readingTime: 5,
    imageSrc: "/images/actualite/actualite-2.png",
  },
  {
    slug: "cicd-gitlab-argocd-industrialisation",
    title: {
      fr: "CI/CD avec GitLab et ArgoCD : comment on industrialise nos déploiements.",
      en: "CI/CD with GitLab and ArgoCD: How We Industrialise Our Deployments.",
    },
    excerpt: {
      fr: "De la pull request au déploiement en production en moins de 10 minutes. Notre stack CI/CD, nos choix techniques et les leçons apprises en déployant des dizaines d'environnements.",
      en: "From pull request to production deployment in under 10 minutes. Our CI/CD stack, technical choices and lessons learned deploying dozens of environments.",
    },
    category: "DevOps",
    date: "2024-08-15",
    readingTime: 6,
    imageSrc: "/images/actualite/actualite-3.png",
  },
];
