import type { Produit } from "@/types";

export const produits: Produit[] = [
  {
    slug: "collabs",
    name: { fr: "Collabs", en: "Collabs" },
    description: {
      fr: "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
      en: "Intelligent automation of level 1 and 2 support. Capable of resolving complex requests by leveraging your internal knowledge base securely.",
    },
    showcaseTitle: {
      fr: "A quoi ça sert ?",
      en: "What is it for?",
    },
    showcaseDescription: {
      fr: "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
      en: "Intelligent automation of level 1 and 2 support. Capable of resolving complex requests by leveraging your internal knowledge base securely.",
    },
    features: [
      {
        title: { fr: "Gestion des présences", en: "Attendance management" },
        description: {
          fr: "Suivi automatique des présences et absences de vos collaborateurs, avec alertes configurables.",
          en: "Automatic tracking of employee attendance and absences, with configurable alerts.",
        },
      },
      {
        title: { fr: "Equipe & Collaboration", en: "Team & Collaboration" },
        description: {
          fr: "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
          en: "Intelligent automation of level 1 and 2 support. Capable of resolving complex requests leveraging your internal knowledge base.",
        },
      },
      {
        title: { fr: "Gestion de carrière", en: "Career management" },
        description: {
          fr: "Suivi des évolutions de carrière, entretiens annuels automatisés et recommandations de formation.",
          en: "Career progression tracking, automated annual reviews and training recommendations.",
        },
      },
      {
        title: { fr: "Inventaire", en: "Inventory" },
        description: {
          fr: "Gestion intelligente de votre inventaire avec prédiction des besoins et alertes de stock.",
          en: "Intelligent inventory management with demand forecasting and stock alerts.",
        },
      },
    ],
    stats: [
      { value: "-40%", label: { fr: "Temps de réponse", en: "Response time" } },
      { value: "24/7", label: { fr: "Disponibilité", en: "Availability" } },
    ],
    backgroundImage: "/images/references/collabs.png",
    showcaseImage: "/images/produits/collabs-showcase.jpg",
    iconSrc: "/images/produits%20ia/Collabs.png",
    badge: { fr: "Le plus vendu", en: "Best seller" },
  },
  {
    slug: "autoscribe",
    name: { fr: "Autoscribe", en: "Autoscribe" },
    description: {
      fr: "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
      en: "Intelligent automation of level 1 and 2 support. Capable of resolving complex requests by leveraging your internal knowledge base securely.",
    },
    showcaseTitle: {
      fr: "A quoi ça sert ?",
      en: "What is it for?",
    },
    showcaseDescription: {
      fr: "Générez automatiquement des comptes-rendus de réunion précis et structurés, intégrés directement dans vos outils de communication.",
      en: "Automatically generate accurate, structured meeting notes, integrated directly into your communication tools.",
    },
    features: [
      {
        title: { fr: "Génération de comptes-rendus", en: "Meeting notes generation" },
        description: {
          fr: "Génération automatique de comptes-rendus après chaque réunion, structurés selon vos modèles.",
          en: "Automatic generation of meeting notes after each meeting, structured according to your templates.",
        },
      },
      {
        title: { fr: "Intégration outils", en: "Tool integration" },
        description: {
          fr: "Connexion native avec Teams, Slack, Meet et vos outils internes pour un workflow fluide.",
          en: "Native connection with Teams, Slack, Meet and your internal tools for a seamless workflow.",
        },
      },
      {
        title: { fr: "Résumés personnalisables", en: "Customizable summaries" },
        description: {
          fr: "Adaptez le format, le niveau de détail et la structure des comptes-rendus à vos besoins.",
          en: "Adapt the format, level of detail and structure of meeting notes to your needs.",
        },
      },
    ],
    stats: [
      { value: "-40%", label: { fr: "Temps de réponse", en: "Response time" } },
      { value: "24/7", label: { fr: "Disponibilité", en: "Availability" } },
    ],
    backgroundImage: "/images/references/bpce.jpg",
    showcaseImage: "/images/produits/autoscribe-showcase.jpg",
    iconSrc: "/images/produits%20ia/Autoscribe.png",
    badge: { fr: "Le plus vendu", en: "Best seller" },
  },
];
