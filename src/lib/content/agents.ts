import type { Agent } from "@/types";

export const agents: Agent[] = [
  {
    slug: "agent-collabs",
    produitSlug: "collabs",
    name: { fr: "CollabsAI", en: "CollabsAI" },
    description: {
      fr: "Agent conversationnel de support RH qui traite les requêtes collaborateurs en langage naturel, consulte votre base de connaissance et résout les tickets sans intervention humaine.",
      en: "HR support conversational agent that handles employee queries in natural language, consults your knowledge base and resolves tickets without human intervention.",
    },
    features: [
      {
        title: { fr: "Compréhension NLP avancée", en: "Advanced NLP understanding" },
        description: {
          fr: "Analyse sémantique des demandes collaborateurs avec compréhension contextuelle et désambiguïsation automatique.",
          en: "Semantic analysis of employee requests with contextual understanding and automatic disambiguation.",
        },
      },
      {
        title: { fr: "Escalade intelligente", en: "Intelligent escalation" },
        description: {
          fr: "Détecte automatiquement les cas complexes et transfère vers le bon expert humain avec un résumé complet du contexte.",
          en: "Automatically detects complex cases and transfers to the right human expert with a full context summary.",
        },
      },
      {
        title: { fr: "Apprentissage continu", en: "Continuous learning" },
        description: {
          fr: "S'améliore à chaque interaction grâce à un mécanisme de feedback et de mise à jour de la base de connaissance.",
          en: "Improves with each interaction through a feedback mechanism and knowledge base updates.",
        },
      },
      {
        title: { fr: "Intégration SI complète", en: "Full IS integration" },
        description: {
          fr: "Connecté nativement à votre SIRH, outil de ticketing et messagerie interne pour des réponses toujours à jour.",
          en: "Natively connected to your HRIS, ticketing tool and internal messaging for always up-to-date responses.",
        },
      },
    ],
    stats: [
      { value: "85%", label: { fr: "Auto-résolution", en: "Auto-resolution" } },
      { value: "<30s", label: { fr: "Temps de réponse", en: "Response time" } },
    ],
    backgroundImage: "/images/references/collabs.png",
    iconSrc: "/images/produits%20ia/Collabs.png",
    badge: { fr: "Le plus utilisé", en: "Most used" },
  },
  {
    slug: "agent-autoscribe",
    produitSlug: "autoscribe",
    name: { fr: "TranscriberAI", en: "TranscriberAI" },
    description: {
      fr: "Agent de transcription et synthèse de réunions en temps réel. Identifie les locuteurs, extrait les décisions et actions items, et livre un compte-rendu structuré en quelques secondes.",
      en: "Real-time meeting transcription and synthesis agent. Identifies speakers, extracts decisions and action items, and delivers a structured report in seconds.",
    },
    features: [
      {
        title: { fr: "Transcription temps réel", en: "Real-time transcription" },
        description: {
          fr: "Capture et retranscrit les échanges audio avec une précision de 97%, même dans des environnements bruités.",
          en: "Captures and transcribes audio exchanges with 97% accuracy, even in noisy environments.",
        },
      },
      {
        title: { fr: "Identification des locuteurs", en: "Speaker identification" },
        description: {
          fr: "Différencie automatiquement les intervenants et attribue chaque prise de parole au bon participant.",
          en: "Automatically differentiates speakers and attributes each statement to the right participant.",
        },
      },
      {
        title: { fr: "Extraction des décisions", en: "Decision extraction" },
        description: {
          fr: "Identifie et liste automatiquement les décisions prises et les actions à mener avec leur responsable.",
          en: "Automatically identifies and lists decisions made and actions to be taken with their owner.",
        },
      },
      {
        title: { fr: "Support multi-langues", en: "Multi-language support" },
        description: {
          fr: "Transcrit et synthétise les réunions dans 15 langues avec basculement automatique en cas de réunion multilingue.",
          en: "Transcribes and synthesises meetings in 15 languages with automatic switching for multilingual meetings.",
        },
      },
    ],
    stats: [
      { value: "97%", label: { fr: "Précision transcription", en: "Transcription accuracy" } },
      { value: "15", label: { fr: "Langues supportées", en: "Supported languages" } },
    ],
    backgroundImage: "/images/references/bpce.jpg",
    iconSrc: "/images/produits%20ia/Autoscribe.png",
    badge: { fr: "Le plus vendu", en: "Best seller" },
  },
  {
    slug: "agent-steaminterview",
    produitSlug: "steaminterview",
    name: { fr: "RecruiterAI", en: "RecruiterAI" },
    description: {
      fr: "Agent de recrutement IA qui analyse les CVs en profondeur, génère des questions d'entretien personnalisées et produit des fiches de synthèse candidat prêtes à l'emploi.",
      en: "AI recruitment agent that deeply analyses CVs, generates personalised interview questions and produces ready-to-use candidate summary sheets.",
    },
    features: [
      {
        title: { fr: "Analyse sémantique des CVs", en: "Semantic CV analysis" },
        description: {
          fr: "Extrait et structure les informations clés : expériences, compétences, formations, avec scoring automatique selon le poste.",
          en: "Extracts and structures key information: experiences, skills, education, with automatic scoring per position.",
        },
      },
      {
        title: { fr: "Questions adaptatives", en: "Adaptive questioning" },
        description: {
          fr: "Génère des questions d'entretien personnalisées basées sur le profil du candidat et les exigences du poste cible.",
          en: "Generates personalised interview questions based on the candidate profile and target position requirements.",
        },
      },
      {
        title: { fr: "Scoring candidat", en: "Candidate scoring" },
        description: {
          fr: "Évalue objectivement chaque candidat selon des critères définis et produit un score de matching au poste.",
          en: "Objectively evaluates each candidate against defined criteria and produces a position matching score.",
        },
      },
      {
        title: { fr: "Rapport de synthèse IA", en: "AI synthesis report" },
        description: {
          fr: "Génère automatiquement une fiche candidat complète avec points forts, points d'attention et recommandation finale.",
          en: "Automatically generates a complete candidate sheet with strengths, watchpoints and final recommendation.",
        },
      },
    ],
    stats: [
      { value: "3x", label: { fr: "Accélération du tri", en: "Screening acceleration" } },
      { value: "99%", label: { fr: "Précision extraction", en: "Extraction accuracy" } },
    ],
    backgroundImage: "/images/references/france-competences.jpg",
    iconSrc: "/images/produits%20ia/Autoscribe.png",
  },
  {
    slug: "agent-opera",
    produitSlug: "opera",
    name: { fr: "PlannerAI", en: "PlannerAI" },
    description: {
      fr: "Agent d'optimisation de planning hospitalier. Analyse les contraintes réglementaires, les disponibilités du personnel et les urgences pour proposer le planning optimal du bloc opératoire.",
      en: "Hospital scheduling optimisation agent. Analyses regulatory constraints, staff availability and emergencies to propose the optimal operating theatre schedule.",
    },
    features: [
      {
        title: { fr: "Optimisation multi-contraintes", en: "Multi-constraint optimisation" },
        description: {
          fr: "Intègre les contraintes réglementaires, conventions collectives et préférences individuelles pour un planning légal et équitable.",
          en: "Integrates regulatory constraints, collective agreements and individual preferences for a legal and fair schedule.",
        },
      },
      {
        title: { fr: "Détection de conflits", en: "Conflict detection" },
        description: {
          fr: "Identifie en temps réel les chevauchements, sous-effectifs et incompatibilités avant qu'ils ne deviennent des problèmes.",
          en: "Identifies overlaps, understaffing and incompatibilities in real time before they become problems.",
        },
      },
      {
        title: { fr: "Suggestions de remplacement", en: "Replacement suggestions" },
        description: {
          fr: "En cas d'absence, propose automatiquement les meilleurs remplaçants disponibles selon leur profil et disponibilité.",
          en: "In case of absence, automatically proposes the best available replacements based on their profile and availability.",
        },
      },
      {
        title: { fr: "Alertes proactives", en: "Proactive alerts" },
        description: {
          fr: "Anticipe les risques de sous-effectif et notifie les responsables avant que la situation ne devienne critique.",
          en: "Anticipates understaffing risks and notifies managers before the situation becomes critical.",
        },
      },
    ],
    stats: [
      { value: "-35%", label: { fr: "Conflits de planning", en: "Scheduling conflicts" } },
      { value: "2min", label: { fr: "Mise à jour planning", en: "Schedule update" } },
    ],
    backgroundImage: "/images/references/infra-cloud.webp",
    iconSrc: "/images/produits%20ia/Collabs.png",
  },
];
