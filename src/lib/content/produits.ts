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
  {
    slug: "steaminterview",
    name: { fr: "Steaminterview", en: "Steaminterview" },
    description: {
      fr: "Plateforme de recrutement pilotée par l'IA : évaluation des candidats, génération automatique de CV et comptes-rendus d'entretien via AutoScribe.",
      en: "AI-powered recruitment platform: candidate assessment, automated CV generation and interview notes via AutoScribe.",
    },
    showcaseTitle: {
      fr: "A quoi ça sert ?",
      en: "What is it for?",
    },
    showcaseDescription: {
      fr: "Rationalisez votre processus de recrutement grâce à des évaluations personnalisées, un CRM candidat centralisé et la génération automatique de comptes-rendus d'entretien.",
      en: "Streamline your recruitment process with customisable assessments, a centralised candidate CRM and automatic interview note generation.",
    },
    features: [
      {
        title: { fr: "Tests personnalisables", en: "Customisable assessments" },
        description: {
          fr: "Concevez des évaluations adaptées : QCM, questions ouvertes, questions illustrées, avec niveaux de complexité et limites de temps configurables.",
          en: "Design tailored assessments: MCQ, open-ended, illustrated questions, with adjustable complexity levels and time limits.",
        },
      },
      {
        title: { fr: "CRM recrutement", en: "Recruitment CRM" },
        description: {
          fr: "Centralisez les profils candidats (stagiaires, prestataires, CDI) avec accès aux CVs, résultats de tests et historique des entretiens.",
          en: "Centralise candidate profiles (interns, contractors, permanent staff) with access to CVs, test results and interview history.",
        },
      },
      {
        title: { fr: "Notes d'entretien IA", en: "AI interview notes" },
        description: {
          fr: "Intégration AutoScribe : génération automatique de résumés d'entretien structurés, révisables et complétables par les recruteurs.",
          en: "AutoScribe integration: automatically generate structured interview summaries, reviewable and supplementable by recruiters.",
        },
      },
      {
        title: { fr: "Génération de CV automatisée", en: "Automated CV generation" },
        description: {
          fr: "Restructurez rapidement les candidatures via la fusion de données et exploitez les informations d'expérience fiables extraites par l'IA.",
          en: "Quickly restructure applications via data merging, leveraging reliable work experience data extracted by AI.",
        },
      },
    ],
    stats: [
      { value: "99%", label: { fr: "Précision extraction CV", en: "CV extraction accuracy" } },
      { value: "-60%", label: { fr: "Temps de traitement", en: "Processing time" } },
    ],
    backgroundImage: "/images/references/france-competences.jpg",
    iconSrc: "/images/produits%20ia/Autoscribe.png",
  },
  {
    slug: "opera",
    name: { fr: "Opéra", en: "Opera" },
    description: {
      fr: "Application de gestion des vacations au bloc opératoire pour anesthésistes, chirurgiens et IADE. Planning, absences, gardes et notifications en temps réel.",
      en: "Operating theatre scheduling app for anaesthetists, surgeons and nurse anaesthetists. Scheduling, absences, on-call and real-time notifications.",
    },
    showcaseTitle: {
      fr: "A quoi ça sert ?",
      en: "What is it for?",
    },
    showcaseDescription: {
      fr: "Optimisez l'organisation du bloc opératoire avec une solution intuitive de planification des vacations, gestion des absences et suivi des gardes.",
      en: "Optimise operating theatre organisation with an intuitive solution for shift scheduling, absence management and on-call tracking.",
    },
    features: [
      {
        title: { fr: "Planning hebdomadaire & quotidien", en: "Weekly & daily scheduling" },
        description: {
          fr: "Visualisez les interventions individuelles et collectives, améliorez la planification des vacations et réduisez les conflits de planning.",
          en: "Visualise individual and collective procedures, improve shift planning and reduce scheduling conflicts.",
        },
      },
      {
        title: { fr: "Gestion des absences & échanges", en: "Absence & swap management" },
        description: {
          fr: "Centralisez les demandes de congés, gérez les remplacements et traitez les échanges de vacations pour gagner du temps dans l'organisation.",
          en: "Centralise leave requests, manage replacements and process shift swaps to save time on organisation.",
        },
      },
      {
        title: { fr: "Suivi des gardes", en: "On-call tracking" },
        description: {
          fr: "Organisez et planifiez les gardes anesthésistes avec la possibilité d'échanger et de remplacer les gardes directement dans l'application.",
          en: "Organise and plan anaesthetist on-call duties with the ability to swap and replace shifts directly in the app.",
        },
      },
      {
        title: { fr: "Alertes & notifications", en: "Alerts & notifications" },
        description: {
          fr: "Informations en temps réel sur les modifications de planning, absences, remplacements et changements de salle opératoire.",
          en: "Real-time information on schedule changes, absences, replacements and operating room changes.",
        },
      },
    ],
    stats: [
      { value: "2021", label: { fr: "Année de lancement", en: "Launch year" } },
      { value: "24/7", label: { fr: "Notifications temps réel", en: "Real-time notifications" } },
    ],
    backgroundImage: "/images/references/infra-cloud.webp",
    iconSrc: "/images/produits%20ia/Collabs.png",
  },
];
