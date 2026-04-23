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
];
