import type { Reference } from "@/types";

// expert.name / imageSrc sont des placeholders — à compléter depuis le Drive.

export const references: Reference[] = [
  // ─── ARMATIS ────────────────────────────────────────────────────────────────
  {
    slug: "armatis-supply-chain",
    client: "Armatis",
    category: ["IA & Intelligence Artificielle"],
    description: {
      fr: "Optimisation IA de la Supply Chain pour Armatis — +24% de productivité logistique globale.",
      en: "AI-driven supply chain optimization for Armatis — +24% overall logistics productivity.",
    },
    year: 2024,
    imageSrc: "/images/references/inpi.webp",
    logoSrc: "/images/logos/armatis.png",
    expert: {
      imageSrc: "/images/team/emeric.png",
      name: "Emeric", // TODO Drive
      role: "Head of Strategy",
      bio: "Spécialiste en prospective technologique et pilotage de roadmaps IA complexes.",
    },
    quote:
      "L'intégration d'une intelligence artificielle au cœur des process ouvre des perspectives fortes en matière de performance, de qualité de service et d'accompagnement des conseillers",
    quoteAttribution: "Strategic Vision 2025",
    stats: [
      { value: "12+", label: "Marchés Couverts" },
      { value: "+24%", label: "Productivité Logistique", highlight: true },
      { value: "250+", label: "Spécialistes Engagés" },
    ],
    featureCard: {
      title: "Une plateforme métier augmentée",
      items: [
        { title: "Simplification des workflow", description: "Monitoring & Suivi des appels" },
        { title: "Modules intelligents", description: "Analyse prédictive et alertes automatisées" },
      ],
    },
    ethos: {
      title: "Notre standard",
      description:
        "Avec plus de 15 ans à l'intersection de l'industrie lourde et du génie logiciel, nous avons bâti une expertise en fiabilité et performance qui ne tolère aucun compromis.",
    },
    augmented: {
      eyebrow: "Innovation IA",
      title: "L'Ingénieur Augmenté au service d'Armatis",
      description:
        "Chez DevFun, nos développeurs ne codent plus seuls. Ils sont propulsés par l'Intelligence Artificielle pour transcender les limites de la productivité et de la fiabilité.",
      features: [
        { title: "Pair-Programming avec Copilot", description: "Génération de boilerplate et suggestion d'algorithmes complexes en temps réel." },
        { title: "Tests Automatisés par IA", description: "Identification prédictive des cas limites et génération de suites de tests exhaustives." },
        { title: "Vitesse de Livraison ×3", description: "Réduction drastique du time-to-market sans compromis sur la dette technique." },
      ],
      steps: [
        {
          number: "01", title: "Cadre & conception", accent: "orange",
          detail: {
            heading: "Cadrage du besoin métier",
            description: "Avant d'écrire une ligne de code, nous avons audité les workflows existants chez Armatis. Chaque friction opérationnelle a été cartographiée, chaque cas d'usage priorisé selon son impact réel.",
            points: ["Analyse des 12 workflows de traitement d'appels", "Identification de 4 cas d'usage IA à fort ROI", "Définition des critères de succès mesurables"],
          },
        },
        {
          number: "02", title: "Predictive QA", accent: "blue",
          detail: {
            heading: "Assurance qualité prédictive",
            description: "Nos ingénieurs ont déployé un système de QA piloté par IA qui anticipe les régressions avant qu'elles n'atteignent la production.",
            points: ["Génération automatique de suites de tests sur chaque PR", "Réduction de 68% des régressions en production", "Couverture de test passée de 42% à 91%"],
          },
        },
        {
          number: "03", title: "Code Generation", accent: "orange",
          detail: {
            heading: "Accélération par génération de code",
            description: "Chaque ingénieur travaille en binôme avec un assistant IA. Le boilerplate, les algorithmes répétitifs et la documentation inline sont générés en temps réel.",
            points: ["Pair-programming IA sur 100% des sprints", "Vélocité de livraison multipliée par 3", "Zéro dette technique introduite sur la période"],
          },
        },
        {
          number: "04", title: "Auto-Doc", accent: "blue",
          detail: {
            heading: "Documentation générée en continu",
            description: "La documentation technique et fonctionnelle est produite et maintenue automatiquement à chaque livraison.",
            points: ["Documentation API générée à chaque déploiement", "Guides utilisateur mis à jour en continu", "Transfert de compétences en 2 semaines"],
          },
        },
      ],
    },
  },
  {
    slug: "armatis-qualite",
    client: "Armatis",
    category: ["IA & Intelligence Artificielle"],
    description: {
      fr: "Application métier augmentée de suivi de qualité pour Armatis.",
      en: "AI-augmented quality tracking business application for Armatis.",
    },
    year: 2024,
    imageSrc: "/images/references/collabs.png",
    logoSrc: "/images/logos/armatis.png",
    expert: {
      imageSrc: "/images/team/emeric.png",
      name: "Emeric", // TODO Drive
      role: "Head of Strategy",
      bio: "Spécialiste en prospective technologique et pilotage de roadmaps IA complexes.",
    },
    quote: "Une application métier augmentée par l'IA transforme radicalement la façon dont les équipes suivent et pilotent la qualité de service.",
  },
  {
    slug: "armatis-ia",
    client: "Armatis",
    category: ["IA & Intelligence Artificielle"],
    description: {
      fr: "Optimisation IA des processus internes Armatis.",
      en: "AI optimisation of Armatis internal processes.",
    },
    year: 2024,
    imageSrc: "/images/references/laposte.jpg",
    logoSrc: "/images/logos/armatis.png",
    expert: {
      imageSrc: "/images/team/emeric.png",
      name: "Emeric", // TODO Drive
      role: "Head of Strategy",
      bio: "Spécialiste en prospective technologique et pilotage de roadmaps IA complexes.",
    },
    quote: "L'optimisation IA des processus internes génère des gains de productivité mesurables dès les premières semaines de déploiement.",
  },
  {
    slug: "armatis-public",
    client: "Armatis",
    category: ["IA & Intelligence Artificielle"],
    description: {
      fr: "Projet de transformation IA pour le secteur public avec Armatis.",
      en: "AI transformation project for the public sector with Armatis.",
    },
    year: 2024,
    imageSrc: "/images/references/france-competences.jpg",
    logoSrc: "/images/logos/armatis.png",
    expert: {
      imageSrc: "/images/team/emeric.png",
      name: "Emeric", // TODO Drive
      role: "Head of Strategy",
      bio: "Spécialiste en prospective technologique et pilotage de roadmaps IA complexes.",
    },
    quote: "La transformation IA dans le secteur public exige une rigueur et une transparence exemplaires — des valeurs au cœur de notre approche.",
  },

  // ─── INPI ───────────────────────────────────────────────────────────────────
  {
    slug: "inpi-portail-open-data",
    client: "INPI",
    category: ["Développement"],
    description: {
      fr: "Création et TMA du Portail Open Data de l'INPI — données Dessins & Modèles, Brevets, Entreprises.",
      en: "Development and ongoing maintenance of INPI's Open Data Portal — Designs, Patents, and Companies datasets.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/Capture_d_ecran_2023_12_01_a_17_51_49_c6caa09d6e.png",
    expert: {
      imageSrc: "/images/team/alexandre-bodet.png",
      name: "Alexandre", // TODO Drive
      role: "Chef de Projet",
      bio: "Expert en architecture data et développement de portails Open Data.",
    },
    quote: "Rendre accessible la donnée publique au plus grand nombre via une interface web, c'est transformer l'information publique en valeur partagée.",
    stats: [
      { value: "43M", label: "Données d'entreprises" },
      { value: "10,6M", label: "Brevets indexés", highlight: true },
      { value: "100%", label: "Conformité RGAA" },
    ],
    featureCard: {
      title: "Portail Open Data INPI",
      items: [
        { title: "Données en libre accès", description: "Brevets, marques, dessins et modèles, entreprises" },
        { title: "Livraison en 3 mois", description: "4 sprints de 2 semaines pour une solution complète" },
      ],
    },
    ethos: {
      title: "Notre approche",
      description: "Ateliers de Design Thinking, conception MVP, développements itératifs — une méthode éprouvée pour livrer vite et bien.",
    },
    augmented: {
      eyebrow: "Développement & Open Data",
      title: "3 mois pour créer le portail Open Data de l'INPI",
      description: "Partant d'une page blanche, nous avons co-construit avec l'INPI une plateforme d'exposition des données publiques accessible à tous.",
      features: [
        { title: "Design Thinking", description: "Ateliers d'idéation dans l'innovation room pour définir les parcours utilisateurs" },
        { title: "MVP en 4 sprints", description: "Découpage en User Stories, 4 sprints de 2 semaines, livraison en 3 mois" },
        { title: "100% RGAA", description: "Accessibilité complète garantie dès la conception et maintenue en TMA" },
      ],
      steps: [
        {
          number: "01", title: "Design Thinking", accent: "orange",
          detail: {
            heading: "Ateliers d'idéation",
            description: "Ateliers ludiques et didactiques dans l'innovation room Steamulo. Chaque cas d'usage priorisé selon son impact pour les citoyens et les professionnels.",
            points: ["Idéation & UX avec direction artistique", "Co-création du parcours utilisateur", "Définition du MVP et backlog initial"],
          },
        },
        {
          number: "02", title: "Architecture", accent: "blue",
          detail: {
            heading: "Conception technique",
            description: "Choix d'une stack alignée sur performance, simplicité et sécurité. Configuration conjointe des environnements.",
            points: ["Stack technique orientée performance et sécurité", "Environnements intégration, recette, préprod et prod", "API pour diffusion aux professionnels"],
          },
        },
        {
          number: "03", title: "Développement", accent: "orange",
          detail: {
            heading: "4 sprints de 2 semaines",
            description: "Développements itératifs avec revues de sprint régulières et collaboration quotidienne INPI/Steamulo.",
            points: ["Daily meetings et sprint reviews cadencés", "Moteur de recherche simple et avancé", "Statistiques et contenus pratiques intégrés"],
          },
        },
        {
          number: "04", title: "TMA & enrichissement", accent: "blue",
          detail: {
            heading: "Évolution continue",
            description: "Après la livraison initiale, le portail s'est enrichi progressivement pour couvrir l'ensemble des titres de propriété industrielle.",
            points: ["43 millions de données d'entreprises indexées", "Extension aux brevets, marques, dessins et BODACC", "100% conformité RGAA maintenue"],
          },
        },
      ],
    },
  },

  // ─── LA POSTE — VEILLER SUR MES PARENTS ─────────────────────────────────────
  {
    slug: "laposte-veiller-sur-mes-parents",
    client: "La Poste",
    category: ["Conseil & Design", "Développement"],
    description: {
      fr: "Création et TMA de l'application mobile \"Veiller sur mes Parents\" pour La Poste.",
      en: "Creation and maintenance of La Poste's \"Veiller sur mes Parents\" mobile app.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/unnamed_8d06d23b57.png",
    expert: {
      imageSrc: "/images/team/julien.png",
      name: "Julien", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en applications mobiles et expérience utilisateur pour les services à la personne.",
    },
    quote: "STEAMULO est notre partenaire depuis plus de 6 ans sur diverses applications. Nous exprimons notre entière satisfaction à l'égard de leurs services.",
    quoteAttribution: "Laurence L. — Directrice du pilotage des projets stratégiques, La Poste",
    featureCard: {
      title: "Application mobile seniors",
      items: [
        { title: "Expérience omnicanale", description: "Interfaces harmonisées web, mobile et tablette" },
        { title: "Partenariat long terme", description: "Refonte, hébergement et maintenance évolutive depuis 6 ans" },
      ],
    },
    augmented: {
      eyebrow: "Conseil & Développement Mobile",
      title: "Refonte de l'application Veiller sur mes Parents",
      description: "La Poste SAP cherchait un partenaire capable de refondre, héberger et faire évoluer une application mobile destinée aux seniors — tout en gérant les futures transformations du SI.",
      features: [
        { title: "React Native", description: "Application mobile unifiée iOS et Android pour une expérience cohérente" },
        { title: "API REST", description: "Connexion aux API VSMP — téléassistance, visites, gestion des offres" },
        { title: "Hébergement cloud", description: "Back-office hébergé avec maintenance corrective, préventive et évolutive" },
      ],
      steps: [
        {
          number: "01", title: "Audit & cadrage", accent: "orange",
          detail: {
            heading: "État des lieux du SI existant",
            description: "Analyse des points de contact digitaux existants, identification des frictions et définition de la roadmap de refonte.",
            points: ["Audit de l'application VSMP existante", "Identification des axes d'amélioration UX", "Définition du périmètre fonctionnel cible"],
          },
        },
        {
          number: "02", title: "UX & Design", accent: "blue",
          detail: {
            heading: "Maquettes fonctionnelles et graphiques",
            description: "Conception de maquettes UX et UI pour une interface moderne, ergonomique et accessible sur tous les appareils.",
            points: ["Maquettes fonctionnelles et graphiques complètes", "Interface responsive — mobile, tablette, web", "Accessibilité pensée pour les utilisateurs seniors"],
          },
        },
        {
          number: "03", title: "Développement", accent: "orange",
          detail: {
            heading: "Développement React Native + API",
            description: "Développement des écrans mobiles, des API back-to-front et connexion aux systèmes VSMP existants.",
            points: ["Écrans mobiles en React Native (iOS et Android)", "Développement et connexion des API VSMP", "Évolution du backoffice"],
          },
        },
        {
          number: "04", title: "Maintenance long terme", accent: "blue",
          detail: {
            heading: "6 ans de partenariat",
            description: "Steamulo assure depuis plus de 6 ans la maintenance corrective, préventive et évolutive de l'ensemble du dispositif.",
            points: ["Maintenance corrective, préventive et évolutive", "Gestion des évolutions SI et intégrations partenaires", "Hébergement cloud du backoffice"],
          },
        },
      ],
    },
  },

  // ─── FDJ ────────────────────────────────────────────────────────────────────
  {
    slug: "fdj-centre-service-applicatif",
    client: "FDJ",
    category: ["Conseil & Design", "Développement"],
    description: {
      fr: "Centre de service applicatif FDJ — équipe AGILE pluridisciplinaire dédiée de 2015 à 2020.",
      en: "FDJ application service centre — dedicated multidisciplinary Agile team from 2015 to 2020.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/Capture_d_ecran_2023_12_01_a_13_39_25_0aa82a5acc.png",
    expert: {
      imageSrc: "/images/team/baptiste-renouf.png",
      name: "Baptiste", // TODO Drive
      role: "Chef de Projet",
      bio: "Pilote d'équipes Agile pluridisciplinaires sur des projets applicatifs complexes.",
    },
    quote: "65% des mises digitales sont effectuées sur mobile — nous avons anticipé cette réalité dès 2015 pour bâtir une architecture réellement mobile-first.",
    stats: [
      { value: "65%", label: "Mises digitales sur mobile", highlight: true },
      { value: "3,7M", label: "Joueurs sur l'app" },
      { value: "1,2M", label: "Utilisateurs desktop" },
    ],
    featureCard: {
      title: "Centre de service applicatif",
      items: [
        { title: "Équipe pluridisciplinaire", description: "10 collaborateurs — iOS, Android, ReactJS, Drupal, QA" },
        { title: "Qualité industrielle", description: "80% couverture tests unitaires, code review systématique" },
      ],
    },
    ethos: {
      title: "Notre méthode",
      description: "Scrum rigoureux, TDD, daily meetings, rétrospectives — une culture de livraison continue sur 5 ans.",
    },
    augmented: {
      eyebrow: "Centre de service applicatif",
      title: "5 ans aux côtés de la FDJ pour refondre tout le digital",
      description: "De 2015 à 2020, une équipe pluridisciplinaire de 10 collaborateurs Steamulo a accompagné la FDJ dans la refonte complète de son digital — site, apps iOS/Android, solutions mobiles.",
      features: [
        { title: "10 collaborateurs dédiés", description: "iOS/Swift, Android/Kotlin, ReactJS, Drupal 8, Symfony 4, QA" },
        { title: "TDD & Clean Code", description: "80% couverture tests unitaires, relecture obligatoire par un second développeur" },
        { title: "Scrum rigoureux", description: "Daily meetings, sprint reviews bihebdomadaires, poker planning, rétrospectives" },
      ],
      steps: [
        {
          number: "01", title: "Constitution équipe", accent: "orange",
          detail: {
            heading: "Équipe pluridisciplinaire dédiée",
            description: "Steamulo a constitué une équipe de 10 collaborateurs couvrant l'ensemble des besoins digitaux de la FDJ.",
            points: ["2 développeurs iOS/Swift + 2 Android/Kotlin", "2 développeurs ReactJS + 2 Drupal 8 & Symfony 4", "1 Scrummaster + 1 QA testeur"],
          },
        },
        {
          number: "02", title: "Méthode Agile", accent: "blue",
          detail: {
            heading: "Scrum avec outils industriels",
            description: "Organisation rigoureuse en Scrum avec JIRA, Confluence et Slack pour assurer la cadence et la transparence.",
            points: ["Daily Sprint Meetings quotidiens", "Revues de sprint bihebdomadaires avec démonstrations", "Poker Planning et Sprint Planning"],
          },
        },
        {
          number: "03", title: "Qualité industrielle", accent: "orange",
          detail: {
            heading: "TDD & Clean Code",
            description: "Chaque ligne de code est relue par un second développeur. Les tests unitaires sont écrits avant le code de production.",
            points: ["80% de couverture de tests unitaires garantie", "Relecture de code obligatoire avant merge", "Approche TDD sur l'ensemble des sprints"],
          },
        },
        {
          number: "04", title: "Résultats", accent: "blue",
          detail: {
            heading: "Impact digital mesurable",
            description: "5 ans de partenariat qui ont transformé la FDJ en acteur digital mobile-first avec des millions d'utilisateurs.",
            points: ["65% des mises digitales effectuées sur mobile", "3,7 millions de joueurs sur l'application", "1,2 million d'utilisateurs desktop actifs"],
          },
        },
      ],
    },
  },

  // ─── CMN ────────────────────────────────────────────────────────────────────
  {
    slug: "cmn-hebergement-infogerance",
    client: "Centre des Monuments Nationaux",
    category: ["Cloud"],
    description: {
      fr: "Hébergement et infogérance de la plateforme des 100 sites web et du portail du CMN.",
      en: "Hosting and managed services for the CMN's platform of 100 websites and main portal.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/5bae9414da71_carte_passion_monuments_fond_transparent_fbd5c8e0df.png",
    expert: {
      imageSrc: "/images/team/raphael-kalinowski.png",
      name: "Raphaël", // TODO Drive
      role: "Chef de Projet Cloud",
      bio: "Expert en infogérance cloud et gestion de plateformes multi-sites à haute disponibilité.",
    },
    quote: "Nous avons une grande confiance en l'expertise de Steamulo.",
    quoteAttribution: "Indrek P. — Chef de projet numérique, CMN",
    stats: [
      { value: "100", label: "Sites web hébergés" },
      { value: "1M+", label: "Visites / mois", highlight: true },
      { value: "8 To", label: "Bande passante / mois" },
    ],
    featureCard: {
      title: "Infrastructure haute disponibilité",
      items: [
        { title: "Architecture scalable", description: "Kubernetes, Redis, Solr — dimensionné aux pics de trafic" },
        { title: "Monitoring continu", description: "AWX, Matomo, WAF pour une disponibilité maximale" },
      ],
    },
    ethos: {
      title: "Notre engagement",
      description: "10 millions de visiteurs annuels dans les monuments — l'infrastructure numérique doit être à la hauteur du patrimoine qu'elle représente.",
    },
    augmented: {
      eyebrow: "Cloud & Infogérance",
      title: "Héberger 100 sites pour le premier opérateur touristique public de France",
      description: "Le CMN gère 100 monuments et accueille 10 millions de visiteurs par an. L'infrastructure doit absorber des pics de trafic extrêmes sans jamais faillir.",
      features: [
        { title: "Stack cloud native", description: "Kubernetes, Redis SaaS, cluster Solr 3 nœuds, base de données Master/Slave" },
        { title: "CDN & Load Balancer", description: "Distribution du trafic et mise en cache pour des temps de réponse optimaux" },
        { title: "Monitoring proactif", description: "AWX, Matomo, WAF — supervision continue et alertes automatiques" },
      ],
      steps: [
        {
          number: "01", title: "Architecture", accent: "orange",
          detail: {
            heading: "Dimensionnement sur tests de charge",
            description: "L'architecture a été conçue et dimensionnée selon les résultats de tests de montée en charge pour garantir la tenue lors des pics.",
            points: ["Tests de charge exhaustifs avant mise en production", "Architecture dimensionnée pour les 82 000 sessions journalières maximales", "Environnement de préproduction iso à la production"],
          },
        },
        {
          number: "02", title: "Déploiement", accent: "blue",
          detail: {
            heading: "Déploiements automatisés via AWX",
            description: "Chaque déploiement est automatisé, reproductible et tracé — zéro intervention manuelle sur la production.",
            points: ["Déploiements automatisés via AWX", "WAF pour la protection contre les attaques", "CDN pour la distribution des assets statiques"],
          },
        },
        {
          number: "03", title: "Infogérance", accent: "orange",
          detail: {
            heading: "Supervision 24/7",
            description: "L'équipe assure la supervision continue de la plateforme avec des alertes proactives et une réactivité maximale.",
            points: ["~1 million de visites/mois absorbées", "8 To de bande passante gérés par mois", "Haute disponibilité garantie par contrat"],
          },
        },
        {
          number: "04", title: "Évolutions", accent: "blue",
          detail: {
            heading: "Préparation des évolutions futures",
            description: "Au-delà de la gestion courante, Steamulo prépare les évolutions Matomo multi-serveurs et explore les fonctionnalités IA.",
            points: ["Migration Matomo multi-serveurs planifiée", "Exploration fonctionnalités IA pour la plateforme", "Scalabilité vers de nouveaux monuments"],
          },
        },
      ],
    },
  },

  // ─── POLD ───────────────────────────────────────────────────────────────────
  {
    slug: "pold-portail-innovation",
    client: "POLD",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Création, TMA et infogérance du portail POLD — Le Catalyseur de l'innovation de Paris Ouest La Défense.",
      en: "Creation, maintenance, and hosting of POLD's innovation hub portal for Paris Ouest La Défense.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/keys_c17f19a606.webp",
    expert: {
      imageSrc: "/images/team/adrien-trancoso.png",
      name: "Adrien", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en portails d'innovation et accompagnement des écosystèmes entrepreneuriaux.",
    },
    quote: "Un portail d'innovation doit être aussi agile que les idées qu'il catalyse — conçu pour évoluer en permanence avec les entrepreneurs du territoire.",
    featureCard: {
      title: "Portail d'innovation territorial",
      items: [
        { title: "Mise en relation unique", description: "Entrepreneurs, organismes, professionnels et administrations publiques" },
        { title: "Cartographie interactive", description: "Géolocalisation, parcours personnalisés, messagerie interne" },
      ],
    },
    augmented: {
      eyebrow: "Conseil & Développement",
      title: "Le portail qui connecte les entrepreneurs du territoire Paris Ouest La Défense",
      description: "POLD avait besoin d'une plateforme numérique unique pour connecter entrepreneurs, organismes d'accompagnement, professionnels et administrations publiques du territoire.",
      features: [
        { title: "Parcours personnalisés", description: "Réponses adaptées selon le profil et le stade de développement de l'entrepreneur" },
        { title: "Cartographie interactive", description: "Géolocalisation centrée utilisateur avec panoramique de l'offre territoriale" },
        { title: "Cloud français sécurisé", description: "Hébergement sur infrastructure française avec backup et chiffrement" },
      ],
      steps: [
        {
          number: "01", title: "Conception fonctionnelle", accent: "orange",
          detail: {
            heading: "Spécifications et design",
            description: "Définition des parcours utilisateurs selon les profils entrepreneurs, conception responsive et spécifications techniques.",
            points: ["Analyse des besoins des différents types d'entrepreneurs", "Conception fonctionnelle et responsive design", "Spécifications techniques détaillées"],
          },
        },
        {
          number: "02", title: "Développement itératif", accent: "blue",
          detail: {
            heading: "Sprints de 2 semaines",
            description: "Développement en sprints courts avec démonstrations régulières pour valider chaque fonctionnalité avec POLD.",
            points: ["Comptes utilisateurs et interface administration", "Messagerie interne et base de connaissances", "Moteur de recherche et support multi-langues"],
          },
        },
        {
          number: "03", title: "Infrastructure cloud", accent: "orange",
          detail: {
            heading: "Hébergement français sécurisé",
            description: "Déploiement sur cloud provider français avec toutes les mesures de sécurisation — backup, chiffrement, SEO.",
            points: ["Cloud provider français souverain", "Backup automatique et chiffrement des données", "Implémentation bonnes pratiques SEO"],
          },
        },
        {
          number: "04", title: "TMA & évolutions", accent: "blue",
          detail: {
            heading: "Maintenance et enrichissement",
            description: "La plateforme évolue continuellement pour répondre aux nouveaux besoins de l'écosystème entrepreneurial.",
            points: ["Maintenance corrective et évolutive continue", "Documentation complète livrée", "Évolutions fonctionnelles planifiées en sprints"],
          },
        },
      ],
    },
  },

  // ─── MAIF & RUE DES ÉCOLES ──────────────────────────────────────────────────
  {
    slug: "maif-objectif-brevet",
    client: "MAIF & Rue des écoles",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Création de l'application \"Objectif Brevet\" à destination des élèves de 3ème, en partenariat avec la MAIF.",
      en: "Development of the \"Objectif Brevet\" revision app for Year 10 students, in partnership with MAIF.",
    },
    year: 2025,
    imageSrc: "https://www.steamulo.com/uploads/Capture_d_ecran_2025_05_09_a_15_24_54_b6cbb67f42.png",
    expert: {
      imageSrc: "/images/team/virginie.png",
      name: "Virginie", // TODO Drive
      role: "Chef de Projet",
      bio: "Experte en applications éducatives et UX centrée sur les jeunes utilisateurs.",
    },
    quote: "Objectif Brevet permet aux collégiens de réviser dans 8 matières n'importe où, à leur rythme — la préparation au brevet rendue accessible à tous.",
    featureCard: {
      title: "Application pédagogique",
      items: [
        { title: "8 matières couvertes", description: "Français, maths, histoire-géo, sciences, EMC, technologie" },
        { title: "Contenu gamifié", description: "Quiz, fiches de révision, résumés audio 1–2 minutes" },
      ],
    },
    augmented: {
      eyebrow: "Conseil & Développement Éducatif",
      title: "L'application de révision brevet conçue par des enseignants, développée par Steamulo",
      description: "En partenariat avec Rue des écoles (maison d'édition pédagogique) et la MAIF, Steamulo a développé l'application gratuite Objectif Brevet pour tous les élèves de 3ème.",
      features: [
        { title: "8 matières couvertes", description: "Français, maths, histoire-géo, EMC, physique-chimie, SVT et technologie" },
        { title: "Contenu gamifié", description: "Quiz auto-évaluation, contenus à débloquer et fiches de révision synthétiques" },
        { title: "Résumés audio", description: "Capsules audio de 1 à 2 minutes pour réviser en déplacement" },
      ],
      steps: [
        {
          number: "01", title: "Conception pédagogique", accent: "orange",
          detail: {
            heading: "Co-construction avec Rue des écoles",
            description: "Les contenus ont été élaborés par des enseignants conformément aux programmes de l'Éducation nationale, puis structurés pour une expérience mobile optimale.",
            points: ["Contenus élaborés par des enseignants certifiés", "Conformité aux programmes officiels", "8 matières couvrant l'intégralité du brevet"],
          },
        },
        {
          number: "02", title: "UX pour collégiens", accent: "blue",
          detail: {
            heading: "Design centré sur les jeunes utilisateurs",
            description: "L'interface a été conçue pour maintenir l'engagement des collégiens — gamification, progression visible, sessions courtes.",
            points: ["Quiz pour auto-évaluation et suivi des progrès", "Contenus à débloquer pour maintenir la motivation", "Sessions courtes adaptées à l'attention des adolescents"],
          },
        },
        {
          number: "03", title: "Développement", accent: "orange",
          detail: {
            heading: "Application mobile multiplateforme",
            description: "Développement de l'application iOS et Android avec livraison continue et intégration des retours utilisateurs.",
            points: ["Application disponible sur iOS et Android", "Fiches de révision synthétiques intégrées", "Résumés audio 1 à 2 minutes par chapitre"],
          },
        },
        {
          number: "04", title: "Déploiement cloud", accent: "blue",
          detail: {
            heading: "Infrastructure et distribution",
            description: "Déploiement cloud et publication sur les stores App Store et Google Play en coordination avec la MAIF.",
            points: ["Hébergement cloud scalable", "Publication App Store et Google Play", "Application gratuite accessible à tous les collégiens"],
          },
        },
      ],
    },
  },

  // ─── AGENCE DU SERVICE CIVIQUE — REFONTE ────────────────────────────────────
  {
    slug: "asc-refonte-portail",
    client: "Agence du Service Civique",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Refonte, TMA et hébergement du portail de l'Agence du Service Civique — reprise en 2020, livraison 2021.",
      en: "Redesign, maintenance, and hosting of the Service Civique Agency portal — takeover 2020, delivery 2021.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/screenshot_asc_f0b0000283.png",
    expert: {
      imageSrc: "/images/team/charlotte.png",
      name: "Charlotte", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en refonte de portails institutionnels et Cloud Native sur GCP.",
    },
    quote: "La réduction de la dette technique et le lancement du nouveau site ont marqué cette collaboration fructueuse. Leur professionnalisme, flexibilité et adaptation permanente aux besoins changeants ont grandement contribué à l'amélioration continue.",
    quoteAttribution: "Delphine H. — Directrice des Systèmes d'Information, Agence du Service Civique",
    stats: [
      { value: "5M", label: "Visiteurs mensuels", highlight: true },
      { value: "430K", label: "Volontaires depuis 10 ans" },
      { value: "20K", label: "Missions proposées" },
    ],
    featureCard: {
      title: "Refonte Cloud Native",
      items: [
        { title: "Migration Kubernetes", description: "Architecture Cloud Native sur GCP avec haute disponibilité" },
        { title: "Deux équipes parallèles", description: "Équipe RUN (bugs KANBAN) et BUILD (évolutions SCRUM)" },
      ],
    },
    ethos: {
      title: "Notre approche",
      description: "Audit, reprise de code existant, migration cloud, organisation en deux équipes simultanées — une restructuration complète menée sans interruption de service.",
    },
    augmented: {
      eyebrow: "Refonte & Cloud Native",
      title: "Reprendre, migrer et relancer le portail de l'ASC",
      description: "Le portail avait connu des retards importants et une dette technique croissante. Steamulo a repris le marché en octobre 2020 pour livrer le nouveau site en 2021.",
      features: [
        { title: "Migration Kubernetes GCP", description: "Architecture Cloud Native sur Google Cloud Platform avec haute disponibilité" },
        { title: "Angular + Symfony + React", description: "Stack moderne unifiée pour le front et le back" },
        { title: "Organisation duale", description: "Équipe RUN en KANBAN pour les bugs, équipe BUILD en SCRUM pour les évolutions" },
      ],
      steps: [
        {
          number: "01", title: "Audit & reprise", accent: "orange",
          detail: {
            heading: "État des lieux et plan de redressement",
            description: "Steamulo a commencé par un audit complet du code existant et la constitution d'un backlog de correctifs prioritaires.",
            points: ["Audit exhaustif du code et de l'infrastructure", "Constitution du backlog de correctifs", "Identification des risques techniques critiques"],
          },
        },
        {
          number: "02", title: "Migration cloud", accent: "blue",
          detail: {
            heading: "Cloud Native sur GCP",
            description: "Migration vers une architecture Kubernetes managée sur Google Cloud Platform pour garantir disponibilité et scalabilité.",
            points: ["Migration vers Kubernetes managé sur GCP", "Architecture Cloud Native", "Environnement de haute disponibilité"],
          },
        },
        {
          number: "03", title: "Deux équipes", accent: "orange",
          detail: {
            heading: "RUN + BUILD en parallèle",
            description: "Organisation innovante avec deux équipes qui travaillent simultanément — l'une corrige, l'autre construit.",
            points: ["Équipe RUN : corrections bugs en KANBAN", "Équipe BUILD : évolutions fonctionnelles en SCRUM (sprints 3 semaines)", "Audit fonctionnel/UX des parcours utilisateurs"],
          },
        },
        {
          number: "04", title: "Résultats", accent: "blue",
          detail: {
            heading: "Impact mesurable",
            description: "Le nouveau portail a été livré en 2021 et continue d'évoluer, servant 5 millions de visiteurs mensuels.",
            points: ["5 millions de visiteurs mensuels absorbés", "430 000 volontaires accompagnés depuis 10 ans", "~20 000 missions proposées sur la plateforme"],
          },
        },
      ],
    },
  },

  // ─── MARKET PAY ─────────────────────────────────────────────────────────────
  {
    slug: "marketpay-plateforme-relation-client",
    client: "Market Pay",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Création, TMA et hébergement du Merchant Portal Market Pay — pilotage des flux bancaires et reporting transactionnel.",
      en: "Creation, maintenance, and hosting of Market Pay's Merchant Portal — banking flow management and transactional reporting.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/laptop_fly_noshadow_min_5b5c84461c.png",
    expert: {
      imageSrc: "/images/team/sylvain-gourio.png",
      name: "Sylvain", // TODO Drive
      role: "Chef de Projet",
      bio: "Expert en plateformes fintech et intégration de solutions de paiement à grande échelle.",
    },
    quote: "2,4 milliards de transactions, 160 000 terminaux, 30 milliards de flux financés — le Merchant Portal gère une infrastructure financière critique avec une fiabilité totale.",
    stats: [
      { value: "2,4Md", label: "Transactions gérées", highlight: true },
      { value: "160K", label: "Terminaux" },
      { value: "7", label: "Pays européens" },
    ],
    featureCard: {
      title: "Portail B2B fintech",
      items: [
        { title: "Reporting temps réel", description: "Rapprochement bancaire quotidien, filtres par période, magasin, pays" },
        { title: "Double profil utilisateur", description: "Basique (90% des besoins) et Expert DataViz avancé" },
      ],
    },
    ethos: {
      title: "Notre stack",
      description: "Google Cloud Storage, Data Flow, BigQuery et Tableau Software — une architecture data pensée pour le volume et la précision.",
    },
    augmented: {
      eyebrow: "Fintech & Data",
      title: "Le Merchant Portal qui pilote 2,4 milliards de transactions",
      description: "Market Pay avait besoin d'un portail B2B permettant à ses clients retailers de piloter leurs flux bancaires, administrer les commissions et accéder à un reporting transactionnel précis.",
      features: [
        { title: "Google BigQuery", description: "Traitement de 7 à 10 millions de données différentes par jour" },
        { title: "Tableau Software", description: "DataViz avancée pour les profils experts — rapports personnalisés et partageables" },
        { title: "Google Cloud Storage + Data Flow", description: "Pipeline de données robuste pour 2 à 3 milliards de données annuelles" },
      ],
      steps: [
        {
          number: "01", title: "Conception produit", accent: "orange",
          detail: {
            heading: "Deux niveaux d'expertise",
            description: "Définition de l'architecture produit autour de deux profils — basique pour 90% des besoins et expert pour les analyses avancées.",
            points: ["Profil basique : tableaux pré-formatés pour consultation standard", "Profil expert : outil DataViz pour rapports personnalisés", "Gestion des droits et permissions par utilisateur"],
          },
        },
        {
          number: "02", title: "Architecture data", accent: "blue",
          detail: {
            heading: "Stack Google Cloud",
            description: "Construction d'un pipeline de données fiable sur Google Cloud pour absorber des volumes critiques sans interruption.",
            points: ["Google Cloud Storage pour l'ingestion des données", "Google Data Flow pour le traitement en temps réel", "BigQuery pour l'analyse et Tableau pour la visualisation"],
          },
        },
        {
          number: "03", title: "Développement", accent: "orange",
          detail: {
            heading: "Portail B2B complet",
            description: "Développement du portail avec toutes les fonctionnalités de reporting, filtrage, export et gestion des accès.",
            points: ["Consultation de rapports financiers préformatés", "Export des reportings et recherche transactionnelle", "Comparaison de données et génération de rapports"],
          },
        },
        {
          number: "04", title: "Déploiement", accent: "blue",
          detail: {
            heading: "Présence dans 7 pays",
            description: "Déploiement progressif dans 7 pays européens avec adaptation aux spécificités locales.",
            points: ["160 000 terminaux gérés dans 7 pays", "30 milliards de flux financés annuellement", "2,4 milliards de transactions traitées"],
          },
        },
      ],
    },
  },

  // ─── CARREFOUR — LOCATION LIBERTÉ ───────────────────────────────────────────
  {
    slug: "carrefour-location-liberte",
    client: "Carrefour",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "MVP de l'application mobile Location Liberté pour Carrefour — service de location 24h/24 100% digitalisé.",
      en: "MVP of the Location Liberté mobile app for Carrefour — fully digitalized 24/7 vehicle rental service.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/Capture_d_ecran_2023_12_26_a_17_22_57_bf39e4a469.png",
    expert: {
      imageSrc: "/images/team/kaan-bouldoires.png",
      name: "Kaan", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en développement MVP mobile et intégration de partenaires SDK/API.",
    },
    quote: "Un MVP réussi ne se mesure pas seulement à son succès commercial — il se mesure à l'apprentissage qu'il génère et à l'innovation qu'il catalyse dans l'organisation.",
    featureCard: {
      title: "MVP location digitale",
      items: [
        { title: "Parcours 100% autonome", description: "Clé virtuelle, KYC, signature électronique, état des lieux dématérialisé" },
        { title: "Intégration multi-partenaires", description: "Mov'in Blue, AriadNext, Weproov, OKORO, Adyen" },
      ],
    },
    augmented: {
      eyebrow: "Innovation & Mobilité",
      title: "Le MVP qui a réinventé la location de véhicules Carrefour",
      description: "Steamulo a accompagné Carrefour Location dans la création d'un service de location 24h/24 entièrement digitalisé — sans passage en magasin, 100% autonome depuis le smartphone.",
      features: [
        { title: "Clé virtuelle", description: "SDK Mov'in Blue pour l'accès au véhicule via smartphone" },
        { title: "KYC & signature dématérialisée", description: "AriadNext pour l'authentification, signature électronique et OKORO pour la conservation documentaire" },
        { title: "Paiement & caution", description: "Intégration Adyen pour le paiement et la gestion des cautions" },
      ],
      steps: [
        {
          number: "01", title: "Design Thinking", accent: "orange",
          detail: {
            heading: "Ateliers itératifs Sprint Design",
            description: "Cycles de Design Thinking pour définir le parcours client 100% digital, identifier les partenaires et concevoir les briques fonctionnelles.",
            points: ["Définition du parcours client autonome", "Identification des partenaires SDK et API", "Conception de l'expérience sans friction"],
          },
        },
        {
          number: "02", title: "Intégration SDK", accent: "blue",
          detail: {
            heading: "Briques fonctionnelles via SDK",
            description: "Intégration des SDK partenaires directement dans l'application pour les fonctions critiques.",
            points: ["Mov'in Blue : clé virtuelle et télématrie", "AriadNext : authentification KYC des documents", "Signature électronique intégrée"],
          },
        },
        {
          number: "03", title: "Intégration API", accent: "orange",
          detail: {
            heading: "Back-office et partenaires API",
            description: "Connexion des API partenaires pour les fonctions back-office — états des lieux, archivage et paiement.",
            points: ["Weproov : états des lieux dématérialisés", "OKORO/DOCAPOST : conservation documentaire probante", "Adyen : paiement et gestion des cautions"],
          },
        },
        {
          number: "04", title: "Apprentissages", accent: "blue",
          detail: {
            heading: "Un MVP qui catalyse l'innovation",
            description: "Après six mois opérationnels, le service a été désactivé suite à des contraintes techniques imprévues. L'expérience a néanmoins catalysé l'innovation digitale interne chez Carrefour.",
            points: ["Service opérationnel pendant 6 mois", "Apprentissages sur les contraintes techniques de la télématrie", "Innovation interne catalysée par l'expérimentation"],
          },
        },
      ],
    },
  },

  // ─── CARREFOUR — ÉNERGIES ────────────────────────────────────────────────────
  {
    slug: "carrefour-portail-energies",
    client: "Carrefour",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Création du portail Carrefour Energies — accompagnement des particuliers dans leur transition énergétique.",
      en: "Creation of the Carrefour Energies portal — supporting households in their energy transition.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/th_a7b63cdd60.jpg",
    expert: {
      imageSrc: "/images/team/kaan-bouldoires.png",
      name: "Kaan", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en portails de services et MVP Agile pour grands comptes.",
    },
    quote: "Le portail Carrefour Energies centralise 4 domaines — fourniture, solaire, rénovation, mobilité électrique — pour rendre la transition énergétique accessible à chaque foyer.",
    featureCard: {
      title: "Portail transition énergétique",
      items: [
        { title: "4 domaines couverts", description: "Fourniture d'énergie, solaire, confort thermique, mobilité électrique" },
        { title: "MVP livré rapidement", description: "Approche Agile avec User Stories et sprints itératifs" },
      ],
    },
    augmented: {
      eyebrow: "Conseil & Développement",
      title: "Le portail qui accompagne Carrefour dans la transition énergétique",
      description: "Carrefour Energies propose aux particuliers des solutions pour réduire leur consommation et passer aux énergies renouvelables. Steamulo a créé le portail central qui unifie l'offre.",
      features: [
        { title: "4 domaines énergétiques", description: "Fourniture d'énergie, panneaux solaires, rénovation thermique, mobilité électrique" },
        { title: "Approche Agile", description: "Travail conjoint Steamulo-Carrefour avec MVP livré rapidement et itérations" },
        { title: "Stack orientée performance", description: "Architecture alignée sur performance, simplicité et sécurité" },
      ],
      steps: [
        {
          number: "01", title: "Conception fonctionnelle", accent: "orange",
          detail: {
            heading: "Structuration de l'offre énergétique",
            description: "Définition avec Carrefour de l'architecture de l'offre et des parcours utilisateurs pour chaque domaine énergétique.",
            points: ["Cartographie des 4 domaines — fourniture, solaire, rénovation, mobilité", "Définition des parcours par type d'offre", "Intégration des partenaires spécialisés"],
          },
        },
        {
          number: "02", title: "MVP Agile", accent: "blue",
          detail: {
            heading: "Livraison rapide du MVP",
            description: "Découpage en User Stories et développement itératif pour une mise en ligne rapide avec les fonctionnalités essentielles.",
            points: ["Découpage en User Stories priorisées", "Développement itératif en sprints courts", "Revues régulières avec Carrefour"],
          },
        },
        {
          number: "03", title: "Développement", accent: "orange",
          detail: {
            heading: "Portail complet",
            description: "Développement du portail avec toutes les offres, les aides financières disponibles et l'accompagnement personnalisé.",
            points: ["Offres solaires — panneaux certifiés RGE", "Rénovation — pompes à chaleur, isolation, bornes de recharge", "Électricité renouvelable jusqu'à 22% moins chère"],
          },
        },
        {
          number: "04", title: "Infrastructure cloud", accent: "blue",
          detail: {
            heading: "Hébergement et maintenance",
            description: "Déploiement sur cloud et maintenance continue du portail pour accompagner la croissance de l'offre.",
            points: ["Infrastructure cloud scalable", "Maintenance corrective et évolutive", "Intégration des nouvelles offres partenaires"],
          },
        },
      ],
    },
  },

  // ─── USH — PORTAIL PRINCIPAL ─────────────────────────────────────────────────
  {
    slug: "ush-portail-principal",
    client: "Union Sociale pour l'Habitat",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Refonte, TMA et infogérance du portail USH avec extranet dédié aux professionnels de l'immobilier.",
      en: "Redesign, maintenance, and managed services for the USH portal with a dedicated extranet for real estate professionals.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/logo_vignette_185a6ea022.jpg",
    expert: {
      imageSrc: "/images/team/liam.png",
      name: "Liam", // TODO Drive
      role: "Chef de Projet",
      bio: "Expert en portails institutionnels, Drupal CMS et solutions extranet pour professionnels.",
    },
    quote: "Avec 10 millions de personnes en logement HLM en France, le portail USH est une infrastructure numérique au service d'un droit fondamental.",
    stats: [
      { value: "10M", label: "Personnes en logement HLM", highlight: true },
      { value: "360", label: "Organismes membres" },
      { value: "2,33M", label: "Logements gérés" },
    ],
    featureCard: {
      title: "Portail institutionnel",
      items: [
        { title: "CMS Drupal avancé", description: "Workflows de validation, versioning, programmation de publication" },
        { title: "Moteur de recherche optimisé", description: "Pondération par âge, pertinence, nature et présence de mots-clés" },
      ],
    },
    augmented: {
      eyebrow: "Refonte & CMS",
      title: "Le portail numérique de 360 organismes HLM et 10 millions de locataires",
      description: "Le portail USH devait créer une expérience utilisateur puissante pour des profils très variés — collaborateurs USH, organismes, professionnels de l'immobilier et administrations publiques.",
      features: [
        { title: "CMS Drupal", description: "Gestion des contenus éditoriaux avec workflows de validation spécifiques par section" },
        { title: "Moteur de recherche avancé", description: "Pertinence pondérée par âge, mots-clés, nature du document et paramétrage administrateur" },
        { title: "Cloud français sécurisé", description: "Hébergement sur cloud provider français avec backup, chiffrement et SEO" },
      ],
      steps: [
        {
          number: "01", title: "Ateliers co-création", accent: "orange",
          detail: {
            heading: "Conception avec les équipes USH",
            description: "Ateliers de co-conception pour définir l'architecture de l'information et les parcours des différents profils utilisateurs.",
            points: ["Analyse des besoins de chaque type d'utilisateur", "Définition de l'architecture de l'information", "Conception fonctionnelle via ateliers de co-création"],
          },
        },
        {
          number: "02", title: "Développement Drupal", accent: "blue",
          detail: {
            heading: "CMS éditorial avancé",
            description: "Implémentation d'un CMS Drupal avec des fonctionnalités éditoriales avancées pour les équipes non-techniques de l'USH.",
            points: ["Interface de création simple pour contributeurs non-techniques", "Workflows de validation/publication par section", "Versioning avec historique et programmation de publication"],
          },
        },
        {
          number: "03", title: "Moteur de recherche", accent: "orange",
          detail: {
            heading: "Pertinence maximale",
            description: "Conception et implémentation d'un moteur de recherche avec des critères de pertinence adaptés aux contenus institutionnels.",
            points: ["Pondération par âge du document et présence de mots-clés", "Pondération par nature du document", "Paramétrage manuel par administrateur"],
          },
        },
        {
          number: "04", title: "Infogérance", accent: "blue",
          detail: {
            heading: "Maintenance et hébergement",
            description: "L'équipe assure l'infogérance continue du portail avec maintenance corrective et évolutive.",
            points: ["Hébergement sur cloud provider français souverain", "Backup automatique et chiffrement", "Maintenance corrective et évolutive continue"],
          },
        },
      ],
    },
  },

  // ─── FRANCE COMPÉTENCES ─────────────────────────────────────────────────────
  {
    slug: "france-competences-tma-si",
    client: "France compétences",
    category: ["Conseil & Design", "Développement"],
    description: {
      fr: "Reprise et refonte du SI Certif Pro pour France compétences — migration Spring Boot, ElasticSearch, authentification JWT.",
      en: "Takeover and redesign of the Certif Pro information system for France compétences — Spring Boot migration, JWT auth.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/dossier_1600x700_adafde89ea.jpg",
    expert: {
      imageSrc: "/images/team/thibault-buze.png",
      name: "Thibault", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en reprise de systèmes d'information critiques et migration d'architecture.",
    },
    quote: "Nous entrons désormais dans une nouvelle phase qui va permettre son enrichissement.",
    quoteAttribution: "Olivier B. — Directeur de Projets en Systèmes d'Information, France compétences",
    featureCard: {
      title: "Refonte SI Certif Pro",
      items: [
        { title: "Migration technologique", description: "Java 11, Spring Boot, Flyway, ElasticSearch 7, JWT" },
        { title: "Équipe Agile dédiée", description: "5 développeurs + équipe DevOps en Scrum" },
      ],
    },
    augmented: {
      eyebrow: "TMA & Modernisation SI",
      title: "Reprendre et moderniser le SI Certif Pro de France compétences",
      description: "France compétences a confié à Steamulo la reprise et la pérennisation du SI CertifPRO — la plateforme nationale de certification professionnelle utilisée par des milliers de professionnels.",
      features: [
        { title: "Spring Boot & Java 11", description: "Remplacement progressif du framework Agadir par Spring Boot, migration Java 11" },
        { title: "ElasticSearch 7", description: "Refonte complète du moteur de recherche pour des performances optimales" },
        { title: "Authentification JWT", description: "Refonte du système d'auth en mode stateless avec JWT et Spring Security" },
      ],
      steps: [
        {
          number: "01", title: "Audit technique", accent: "orange",
          detail: {
            heading: "État des lieux du SI existant",
            description: "Analyse exhaustive du code existant, identification des dépendances obsolètes et définition du plan de modernisation.",
            points: ["Audit du framework Agadir et ses limitations", "Identification des dépendances framework Vertigo", "Définition du plan de migration progressif"],
          },
        },
        {
          number: "02", title: "Migration stack", accent: "blue",
          detail: {
            heading: "Modernisation progressive",
            description: "Remplacement progressif des composants obsolètes par des technologies modernes sans interruption de service.",
            points: ["Remplacement Agadir → Spring Boot", "Intégration Flyway pour gestion des mises à jour BDD", "Migration Java vers version 11"],
          },
        },
        {
          number: "03", title: "Moteur & sécurité", accent: "orange",
          detail: {
            heading: "ElasticSearch & JWT",
            description: "Refonte du moteur de recherche et du système d'authentification pour une plateforme moderne et sécurisée.",
            points: ["Refonte moteur ElasticSearch version 7", "Authentification stateless avec JWT", "Gestion des droits via Spring Security"],
          },
        },
        {
          number: "04", title: "Enrichissement", accent: "blue",
          detail: {
            heading: "Nouvelles fonctionnalités",
            description: "Avec la dette technique résorbée, France compétences peut désormais enrichir la plateforme de nouvelles fonctionnalités.",
            points: ["5 développeurs + équipe DevOps en Scrum", "Ajout de nouvelles fonctionnalités sans friction", "Suppression progressive des dépendances legacy"],
          },
        },
      ],
    },
  },

  // ─── BPCE ───────────────────────────────────────────────────────────────────
  {
    slug: "bpce-mon-expert",
    client: "BPCE",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Création et TMA de Mon Expert, outil de gestion et génération de leads en agence pour les réseaux BP et CE.",
      en: "Creation and maintenance of Mon Expert, a lead management tool for BPCE's Banque Populaire and Caisse d'Épargne networks.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/14_8bbcd5e9c3.png",
    expert: {
      imageSrc: "/images/team/killian.png",
      name: "Killian", // TODO Drive
      role: "Chef de Projet",
      bio: "Expert en outils de gestion commerciale et digitalisation des réseaux bancaires.",
    },
    quote: "Mon Expert est désormais déployé dans toutes les agences BP et CE — 7 pôles métiers, des milliers de conseillers équipés pour mieux servir 36 millions de clients.",
    stats: [
      { value: "36M", label: "Clients BPCE", highlight: true },
      { value: "~8 000", label: "Agences bancaires" },
      { value: "7", label: "Pôles métiers couverts" },
    ],
    featureCard: {
      title: "Outil de gestion des leads",
      items: [
        { title: "Génération de devis", description: "Questionnaires dynamiques par pôle métier" },
        { title: "Workflow complet", description: "Capture, suivi, prise de RDV et reporting d'activité" },
      ],
    },
    augmented: {
      eyebrow: "Développement Bancaire",
      title: "Mon Expert — l'outil qui connecte 8 000 agences bancaires à leurs experts métiers",
      description: "BPCE avait besoin d'un outil pour aider les conseillers Pro et Entreprise à orienter leurs clients vers les bons experts métiers et centraliser la gestion des leads.",
      features: [
        { title: "7 pôles métiers", description: "Intertitrés, épargne salariale, affacturage, e-commerce, associations, paiement, leasing" },
        { title: "Génération dynamique de devis", description: "Questionnaires intelligents adaptés à chaque pôle métier" },
        { title: "Reporting d'activité", description: "Suivi par conseiller, agence et métier pour le pilotage commercial" },
      ],
      steps: [
        {
          number: "01", title: "Analyse des besoins", accent: "orange",
          detail: {
            heading: "Cartographie des 7 pôles métiers",
            description: "Analyse des besoins spécifiques de chaque pôle métier BPCE et conception de l'architecture de l'outil.",
            points: ["Identification des 7 pôles métiers à couvrir", "Analyse des parcours conseillers Pro et Entreprise", "Conception des questionnaires dynamiques par pôle"],
          },
        },
        {
          number: "02", title: "Développement", accent: "blue",
          detail: {
            heading: "Outil de génération de leads",
            description: "Développement de l'application avec toutes les fonctionnalités de présentation, devis, capture et suivi des leads.",
            points: ["Présentation des offres métiers", "Génération dynamique de devis via questionnaires", "Capture et gestion des leads"],
          },
        },
        {
          number: "03", title: "Workflow complet", accent: "orange",
          detail: {
            heading: "De la demande à la clôture",
            description: "Implémentation du workflow complet — de la prise de contact à la prise de rendez-vous avec l'expert.",
            points: ["Prise de rendez-vous avec experts métiers", "Suivi du workflow de traitement", "Reporting d'activité complet"],
          },
        },
        {
          number: "04", title: "Déploiement", accent: "blue",
          detail: {
            heading: "~8 000 agences équipées",
            description: "Déploiement progressif dans toutes les agences Banques Populaires et Caisses d'Épargne.",
            points: ["Déploiement dans toutes les agences BP et CE", "~8 000 agences équipées", "Service de 36 millions de clients BPCE"],
          },
        },
      ],
    },
  },

  // ─── LA POSTE — SI CRC ───────────────────────────────────────────────────────
  {
    slug: "laposte-si-crc",
    client: "La Poste",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Reprise TMA, infogérance et hébergement du SI CRC TA & FACTU pour La Poste SAP.",
      en: "Takeover, maintenance, and hosting of La Poste's CRC TA & FACTU information system.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/Capture_d_ecran_2023_12_04_a_12_13_33_dbda1f49f6.png",
    expert: {
      imageSrc: "/images/team/julien.png",
      name: "Julien", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en reprise de SI critiques et infogérance de systèmes à fort enjeu opérationnel.",
    },
    quote: "STEAMULO est notre partenaire depuis plus de 6 ans. Nous exprimons notre entière satisfaction à l'égard de leurs services, en développement comme en infogérance applicative.",
    quoteAttribution: "Laurence L. — Directrice du pilotage des projets stratégiques, La Poste SAP",
    featureCard: {
      title: "TMA & Infogérance SI",
      items: [
        { title: "Reprise en 3 phases", description: "Transfert de connaissance, migration hébergement, correctifs et évolutions" },
        { title: "Haute disponibilité", description: "Monitoring, audit et SLA garantis en production" },
      ],
    },
    augmented: {
      eyebrow: "TMA & Infogérance",
      title: "Reprise et infogérance du SI de facturation La Poste SAP",
      description: "La Poste SAP a confié à Steamulo la reprise de la maintenance et de l'infogérance de son SI de facturation CRC TA & FACTU — un système critique pour les offres services à la personne.",
      features: [
        { title: "Transfert de connaissance", description: "Reprise complète avec audit et documentation du système existant" },
        { title: "Infogérance production", description: "Monitoring, audit de performance et haute disponibilité garantis" },
        { title: "Équipes RUN & BUILD", description: "Gestion simultanée des corrections et des nouvelles évolutions" },
      ],
      steps: [
        {
          number: "01", title: "Reprise de l'existant", accent: "orange",
          detail: {
            heading: "Transfert de connaissance",
            description: "Audit complet du SI existant, documentation et transfert de compétences depuis l'équipe précédente.",
            points: ["État des lieux exhaustif du code et de l'infrastructure", "Documentation complète des flux et interfaces", "Migration vers le nouvel hébergement"],
          },
        },
        {
          number: "02", title: "Hébergement & infogérance", accent: "blue",
          detail: {
            heading: "Monitoring et haute disponibilité",
            description: "Mise en place de la supervision continue et garantie d'un niveau de service adapté aux enjeux critiques.",
            points: ["Monitoring continu de la production", "Audit de performance régulier", "Haute disponibilité par contrat"],
          },
        },
        {
          number: "03", title: "Maintenance corrective", accent: "orange",
          detail: {
            heading: "Traitement des incidents",
            description: "Prise en charge rapide des incidents avec une équipe dédiée et réactive.",
            points: ["Traitement des incidents en mode prioritaire", "Corrections des bugs et régressions", "Flux de données avec prestataires internes et externes"],
          },
        },
        {
          number: "04", title: "Évolutions", accent: "blue",
          detail: {
            heading: "Nouvelles fonctionnalités",
            description: "En parallèle de la maintenance courante, développement des nouvelles évolutions du moteur de valorisation et de facturation.",
            points: ["Moteur de valorisation et facturation VSMP", "Urbanisation du système d'information", "Évolutions fonctionnelles planifiées en mode projet"],
          },
        },
      ],
    },
  },

  // ─── LOUVRE HOTELS ──────────────────────────────────────────────────────────
  {
    slug: "louvre-hotels-machine-learning",
    client: "Louvre Hotels",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Machine Learning pour l'analyse prédictive du taux de réservation chez Louvre Hotels — 2e acteur européen de l'hôtellerie économique.",
      en: "Machine Learning for predictive booking rate analysis at Louvre Hotels — Europe's 2nd largest budget hotel operator.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/LHG_Home_groupe_desktop_b1365b05b2.jpg",
    expert: {
      imageSrc: "/images/team/andreas-le-tanter.png",
      name: "Andreas", // TODO Drive
      role: "Chef de Projet Data",
      bio: "Expert en Machine Learning appliqué à l'hospitalité et à l'analyse prédictive.",
    },
    quote: "Passer de tableurs Excel dispersés à un outil de Machine Learning gérant les prévisions de 1 700 hôtels dans 60 pays — c'est une transformation profonde de la prise de décision.",
    stats: [
      { value: "1 700", label: "Hôtels exploités", highlight: true },
      { value: "147K", label: "Chambres" },
      { value: "60", label: "Pays" },
    ],
    featureCard: {
      title: "Analyse prédictive ML",
      items: [
        { title: "Dashboard intelligent", description: "Visualisation des réservations et prévisions de CA en temps réel" },
        { title: "Apprentissage permanent", description: "Modèle ML qui s'améliore continuellement sur les données historiques" },
      ],
    },
    augmented: {
      eyebrow: "Data & Machine Learning",
      title: "Remplacer 1 000 fichiers Excel par un outil ML prédictif",
      description: "Louvre Hotels gérait ses prévisions de réservations via des fichiers Excel transmis entre interlocuteurs. Steamulo a conçu un outil de Machine Learning pour automatiser et préciser ces prévisions.",
      features: [
        { title: "Machine Learning", description: "Modèle à apprentissage permanent sur les données historiques et les tendances" },
        { title: "Dashboard web", description: "Interface intuitive de visualisation des réservations et prévisions de CA" },
        { title: "Scalabilité internationale", description: "Solution déployée sur 1 700 hôtels dans 60 pays" },
      ],
      steps: [
        {
          number: "01", title: "Diagnostic", accent: "orange",
          detail: {
            heading: "Audit du processus Excel",
            description: "Analyse de l'organisation existante — fichiers Excel multiples, échanges manuels, risques d'erreurs et délais de consolidation.",
            points: ["Cartographie des flux Excel inter-interlocuteurs", "Identification des sources d'erreurs et délais", "Définition des besoins de prédiction par marché"],
          },
        },
        {
          number: "02", title: "Modélisation ML", accent: "blue",
          detail: {
            heading: "Construction du modèle prédictif",
            description: "Conception et entraînement du modèle de Machine Learning sur les données historiques de Louvre Hotels.",
            points: ["Collecte et nettoyage des données historiques", "Entraînement du modèle sur les tendances de réservation", "Validation de la précision du modèle"],
          },
        },
        {
          number: "03", title: "Dashboard", accent: "orange",
          detail: {
            heading: "Interface de visualisation",
            description: "Développement d'un dashboard web intuitif permettant à chaque hôtel d'accéder à ses prévisions.",
            points: ["Visualisation des réservations en cours", "Prévisions de chiffre d'affaires", "Support à la prise de décision éclairée"],
          },
        },
        {
          number: "04", title: "Amélioration continue", accent: "blue",
          detail: {
            heading: "Modèle en apprentissage permanent",
            description: "Le modèle ML s'améliore continuellement avec les nouvelles données — plus il tourne, plus il est précis.",
            points: ["Apprentissage permanent sur les nouvelles données", "Amélioration de la fiabilité et scalabilité", "1 700 hôtels dans 60 pays couverts"],
          },
        },
      ],
    },
  },

  // ─── USH — BIENVEO ───────────────────────────────────────────────────────────
  {
    slug: "ush-bienveo",
    client: "Union Sociale pour l'Habitat",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Refonte et TMA du portail Bienveo — plateforme nationale des offres de logements sociaux en location et vente.",
      en: "Redesign and maintenance of the Bienveo portal — national social housing rental and sales platform.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/visuel_bienveo_1024x711_6260947a8a.jpg",
    expert: {
      imageSrc: "/images/team/liam.png",
      name: "Liam", // TODO Drive
      role: "Chef de Projet",
      bio: "Expert en portails de logement social, ReactJS et expérience utilisateur grand public.",
    },
    quote: "8 000 offres de logements sociaux accessibles en quelques clics pour 10 millions de personnes — Bienveo rend concret le parcours résidentiel pour les demandeurs HLM.",
    stats: [
      { value: "8 000", label: "Offres disponibles", highlight: true },
      { value: "360", label: "Organismes actifs" },
      { value: "10M", label: "Personnes concernées" },
    ],
    featureCard: {
      title: "Portail logement social",
      items: [
        { title: "Stack moderne", description: "ReactJS, PostgreSQL, Strapi CMS, conformité RGAA" },
        { title: "Co-conception", description: "Design Thinking, ateliers Sprint Design, Agile Scrum 2 semaines" },
      ],
    },
    augmented: {
      eyebrow: "Refonte & UX",
      title: "Refondre Bienveo pour connecter 360 bailleurs à leurs 10 millions de locataires potentiels",
      description: "Bienveo centralise les annonces de logements sociaux disponibles à la location et à la vente. La refonte devait valoriser l'accession sociale tout en simplifiant radicalement l'accès pour les demandeurs.",
      features: [
        { title: "ReactJS + Strapi", description: "Front-end ReactJS responsive avec CMS Strapi pour les éditeurs" },
        { title: "PostgreSQL + API REST", description: "Back-office PHP, base de données PostgreSQL et architecture REST" },
        { title: "100% RGAA", description: "Conformité accessibilité complète pour tous les utilisateurs" },
      ],
      steps: [
        {
          number: "01", title: "Design Thinking", accent: "orange",
          detail: {
            heading: "Co-création avec les utilisateurs",
            description: "Ateliers Sprint Design en co-création avec les équipes USH, mettant l'utilisateur final au centre de chaque décision.",
            points: ["Ateliers Sprint Design avec les équipes USH", "Définition des parcours locataires et bailleurs", "Priorisation des fonctionnalités par impact"],
          },
        },
        {
          number: "02", title: "Conception UX/UI", accent: "blue",
          detail: {
            heading: "Expérience utilisateur optimale",
            description: "Conception d'une interface moderne et accessible, optimisée pour la recherche de logements sur mobile et desktop.",
            points: ["Design responsive optimisé mobile", "Conformité RGAA pour l'accessibilité universelle", "Stratégie éditoriale et SEO intégrés"],
          },
        },
        {
          number: "03", title: "Développement", accent: "orange",
          detail: {
            heading: "Stack ReactJS + Strapi",
            description: "Développement en Agile Scrum avec sprints de 2 semaines et démonstrations régulières.",
            points: ["Front-office ReactJS + Responsive Design", "Back-office PHP + PostgreSQL + API REST", "CMS Strapi pour les équipes éditoriales"],
          },
        },
        {
          number: "04", title: "Maintenance", accent: "blue",
          detail: {
            heading: "Évolutions continues",
            description: "Après la refonte en 2021, Steamulo assure la maintenance et les évolutions planifiées en sprints itératifs.",
            points: ["Maintenance corrective et adaptative", "8 000 offres de logements gérées", "360 organismes bailleurs actifs"],
          },
        },
      ],
    },
  },

  // ─── ASC — AUDIT UX ─────────────────────────────────────────────────────────
  {
    slug: "asc-audit-ux",
    client: "Agence du Service Civique",
    category: ["Conseil & Design"],
    description: {
      fr: "Audit UX du parcours de candidature pour l'ASC — +104% de candidatures en un an après implémentation.",
      en: "UX audit of the application journey for the Service Civique Agency — +104% applications in one year post-implementation.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/audit_ux_asc_4_d65224ddca.png",
    expert: {
      imageSrc: "/images/team/charlotte.png",
      name: "Charlotte", // TODO Drive
      role: "Chef de Projet UX",
      bio: "Spécialiste en audit UX, optimisation de parcours utilisateur et mesure d'impact.",
    },
    quote: "Steamulo nous a accompagnés pendant trois ans avec des professionnels sérieux, compétents, très réactifs avec un esprit constructif.",
    quoteAttribution: "Delphine H. — Directrice des Systèmes d'Information, Agence du Service Civique",
    stats: [
      { value: "+105%", label: "Candidatures missions", highlight: true },
    ],
    featureCard: {
      title: "Audit UX en 3 phases",
      items: [
        { title: "Analyse terrain", description: "Personas, audit digital, critères ergonomiques mobile et desktop" },
        { title: "Impact mesurable", description: "Doublement des candidatures en 12 mois après implémentation" },
      ],
    },
    augmented: {
      eyebrow: "Conseil & UX",
      title: "Un audit UX qui a doublé les candidatures en 12 mois",
      description: "Suite à une refonte qui avait divisé par deux les candidatures, l'ASC a mandaté Steamulo pour identifier les blocages du parcours et proposer des solutions concrètes.",
      features: [
        { title: "Critères ergonomiques", description: "Évaluation UX/UI selon les standards d'accessibilité, vitesse, usabilité et lisibilité" },
        { title: "Google Analytics", description: "Analyse des données comportementales — segmentation, performances, parcours réels" },
        { title: "Prototypage", description: "Conception des nouveaux parcours avec workshops utilisateurs" },
      ],
      steps: [
        {
          number: "01", title: "Environnement projet", accent: "orange",
          detail: {
            heading: "Analyse des parties prenantes",
            description: "Analyse des personas, audit de la présence digitale et cartographie des points de friction dans le parcours de candidature.",
            points: ["Analyse des parties prenantes et personas", "Audit complet de la présence digitale", "Cartographie des points de friction"],
          },
        },
        {
          number: "02", title: "Analyse UX/UI", accent: "blue",
          detail: {
            heading: "Évaluation ergonomique complète",
            description: "Évaluation des critères ergonomiques sur mobile et desktop — accessibilité, vitesse, usabilité et lisibilité du contenu.",
            points: ["Évaluation des critères d'accessibilité et vitesse", "Analyse du comportement mobile spécifique", "Catégorisation des problèmes identifiés"],
          },
        },
        {
          number: "03", title: "Analytics", accent: "orange",
          detail: {
            heading: "Données Google Analytics",
            description: "Analyse approfondie des données Google Analytics pour comprendre les comportements réels des utilisateurs.",
            points: ["Analyse des données GA juillet 2022 vs juillet 2023", "Segmentation des utilisateurs", "Tests de performance et identification des pages critiques"],
          },
        },
        {
          number: "04", title: "Implémentation", accent: "blue",
          detail: {
            heading: "+104,76% de candidatures",
            description: "Mise en œuvre des recommandations avec prototypage, workshops et support au développement — résultat : doublement des candidatures.",
            points: ["Nouveau parcours conçu avec prototypage", "Workshops utilisateurs pour validation", "Support développement, tests et recette"],
          },
        },
      ],
    },
  },

  // ─── SNCF ───────────────────────────────────────────────────────────────────
  {
    slug: "sncf-guidage-malvoyants",
    client: "SNCF",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Prototype d'application de guidage des malvoyants en gare pour la SNCF — iBeacon, vocal et contraste élevé.",
      en: "Prototype navigation app for visually impaired passengers in SNCF train stations — iBeacon, voice and high-contrast interface.",
    },
    year: 2024,
    imageSrc: "https://www.steamulo.com/uploads/Capture_d_ecran_2024_01_30_a_09_53_40_bacd4b782d.png",
    expert: {
      imageSrc: "/images/team/alexandre-bodet.png",
      name: "Alexandre", // TODO Drive
      role: "Chef de Projet",
      bio: "Spécialiste en accessibilité numérique et développement d'applications d'assistance.",
    },
    quote: "Concevoir pour les personnes malvoyantes avec iBeacon, c'est repenser la navigation en gare depuis ses fondations — et livrer une expérience universellement plus intuitive.",
    stats: [
      { value: "10M", label: "Voyageurs / jour", highlight: true },
      { value: "3 000", label: "Gares en France" },
    ],
    featureCard: {
      title: "Application d'accessibilité",
      items: [
        { title: "Guidage iBeacon", description: "Localisation indoor précise sans GPS, compatible iPhone standard" },
        { title: "Testé avec des utilisateurs", description: "2 phases en gare d'Amiens avec des associations de malvoyants" },
      ],
    },
    augmented: {
      eyebrow: "Accessibilité & Innovation",
      title: "Un prototype de guidage malvoyants testé en conditions réelles à la gare d'Amiens",
      description: "La SNCF cherchait une alternative abordable aux systèmes de guidage existants (coûteux, matériel radio spécifique). Steamulo a conçu un prototype exploitant le réseau iBeacon déjà déployé.",
      features: [
        { title: "iBeacon", description: "Localisation indoor précise en exploitant les balises iBeacon déjà déployées par la SNCF" },
        { title: "iPhone standard", description: "Compatible avec les smartphones Apple standards — pas de matériel spécifique requis" },
        { title: "Audio + contraste élevé", description: "Guidage vocal et interface haute contraste pour les différents profils de malvoyants" },
      ],
      steps: [
        {
          number: "01", title: "Étude de faisabilité", accent: "orange",
          detail: {
            heading: "Analyse des contraintes techniques",
            description: "Étude des solutions existantes (bandes podotactiles, balises audio) et de leurs limites. Définition de l'approche iBeacon.",
            points: ["Analyse des systèmes de guidage existants et leurs coûts", "Étude de faisabilité du guidage par iBeacon", "Définition des exigences pour les personnes malvoyantes"],
          },
        },
        {
          number: "02", title: "Développement prototype", accent: "blue",
          detail: {
            heading: "Application mobile accessible",
            description: "Développement du prototype d'application avec guidage vocal et visuel haute contraste exploitant le réseau iBeacon.",
            points: ["Algorithmes de géofencing sur le réseau iBeacon", "Guidage vocal à chaque intersection", "Interface haute contraste pour les malvoyants partiels"],
          },
        },
        {
          number: "03", title: "Tests Phase 1", accent: "orange",
          detail: {
            heading: "Validation technique — Gare d'Amiens",
            description: "Tests avec les équipes SNCF et Steamulo pour valider les algorithmes et optimiser la configuration iBeacon.",
            points: ["Tests conjoints SNCF-Steamulo", "Validation des algorithmes de guidage", "Optimisation de la configuration des balises"],
          },
        },
        {
          number: "04", title: "Tests Phase 2", accent: "blue",
          detail: {
            heading: "Validation utilisateurs malvoyants",
            description: "Tests en conditions réelles avec des utilisateurs malvoyants d'une association SNCF — retours directs des personnes concernées.",
            points: ["Tests avec association de malvoyants SNCF", "Retours directs des utilisateurs finaux", "Ajustements finaux selon les retours terrain"],
          },
        },
      ],
    },
  },

  // ─── USH — ORFI ─────────────────────────────────────────────────────────────
  {
    slug: "ush-orfi",
    client: "Union Sociale pour l'Habitat",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Création et TMA d'ORFI, application web et mobile de recueil des faits d'incivilités pour l'USH.",
      en: "Creation and maintenance of ORFI, a web and mobile app for reporting anti-social behaviour for USH.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/orfi_f7ef59c2ef.jpeg",
    expert: {
      imageSrc: "/images/team/liam.png",
      name: "Liam", // TODO Drive
      role: "Chef de Projet",
      bio: "Expert en applications mobiles de terrain React Native et solutions de signalement.",
    },
    quote: "ORFI homogénéise la transmission des faits d'incivilités dans tous les parcs HLM — un outil livré en 3 mois qui renforce la réactivité et la traçabilité des organismes.",
    stats: [
      { value: "3", label: "Mois de développement" },
      { value: "4", label: "Profils opérationnels" },
    ],
    featureCard: {
      title: "Application de signalement",
      items: [
        { title: "Multi-plateforme", description: "React JS + React Native — web, iOS et Android unifiés" },
        { title: "Stack Node.js / API REST", description: "Express, API REST, architecture légère et performante" },
      ],
    },
    augmented: {
      eyebrow: "Développement Mobile",
      title: "ORFI — l'application de signalement des incivilités dans les parcs HLM",
      description: "L'USH avait besoin d'homogénéiser la remontée des faits d'incivilités et d'insécurité entre ses organismes. Steamulo a livré l'application web et mobile en 3 mois.",
      features: [
        { title: "React JS + React Native", description: "Single Page Application web et applications mobiles iOS/Android unifiées" },
        { title: "Node.js + Express", description: "API REST légère et performante pour le back-office" },
        { title: "Équipe de 4 profils", description: "Proxy PO/UX, Scrum Master/Lead tech, développeur Front, développeur Back" },
      ],
      steps: [
        {
          number: "01", title: "Conception fonctionnelle", accent: "orange",
          detail: {
            heading: "Définition des besoins USH",
            description: "Analyse des besoins des organismes HLM et définition des fonctionnalités pour alimenter l'observatoire des incivilités.",
            points: ["Cartographie des besoins des organismes HLM", "Définition des types de faits d'incivilités à recueillir", "Conception des parcours utilisateurs terrain"],
          },
        },
        {
          number: "02", title: "Architecture", accent: "blue",
          detail: {
            heading: "Stack React + Node.js",
            description: "Choix d'une architecture légère et multi-plateforme pour maximiser la couverture avec une équipe réduite.",
            points: ["React JS pour le front web (SPA)", "React Native pour iOS et Android", "Node.js + Express + API REST pour le back"],
          },
        },
        {
          number: "03", title: "Développement Agile", accent: "orange",
          detail: {
            heading: "Sprints de 2 semaines",
            description: "Développement itératif en mode agile avec une équipe de 4 profils complémentaires.",
            points: ["Sprints de 2 semaines avec démonstrations", "4 profils : PO/UX, Scrum Master/Lead, Front, Back", "Livraison en 3 mois"],
          },
        },
        {
          number: "04", title: "Déploiement & TMA", accent: "blue",
          detail: {
            heading: "Publication et infogérance",
            description: "Publication sur les stores et infogérance continue de la plateforme par Steamulo.",
            points: ["Application publiée sur App Store et Google Play", "Infogérance assurée par Steamulo", "Alimentation de l'observatoire USH des incivilités"],
          },
        },
      ],
    },
  },

  // ─── LES RÉSIDENCES YVELINES ESSONNE ────────────────────────────────────────
  {
    slug: "residences-yvelines-essonne-portail",
    client: "Les Résidences Yvelines Essonne",
    category: ["Conseil & Design", "Développement", "Cloud"],
    description: {
      fr: "Refonte et TMA du portail internet & extranet locataire pour Les Résidences Yvelines Essonne.",
      en: "Redesign and maintenance of the internet & tenant extranet portal for Les Résidences Yvelines Essonne.",
    },
    year: 2023,
    imageSrc: "https://www.steamulo.com/uploads/Capture_d_ecran_2023_12_03_a_18_37_43_dd3896f207.png",
    expert: {
      imageSrc: "/images/team/liam.png",
      name: "Liam", // TODO Drive
      role: "Chef de Projet",
      bio: "Expert en portails de logement social et interfaces locataires.",
    },
    quote: "La refonte du portail des Résidences Yvelines Essonne connecte 100 000 locataires à leurs services essentiels — loyer en ligne, catalogue immobilier, informations de compte.",
    stats: [
      { value: "100K", label: "Locataires hébergés", highlight: true },
      { value: "7", label: "Agences territoriales" },
    ],
    featureCard: {
      title: "Portail & extranet locataire",
      items: [
        { title: "Vitrine modernisée", description: "Catalogue immobilier, SEO, présentation des résidences et logements" },
        { title: "Extranet locataire", description: "Paiement en ligne, accès compte, ergonomie optimisée" },
      ],
    },
    augmented: {
      eyebrow: "Refonte & Digital",
      title: "Connecter 100 000 locataires à leurs services en ligne",
      description: "Les Résidences Yvelines Essonne avait un portail devenu obsolète. Steamulo a co-construit une nouvelle présence web avec vitrine institutionnelle et extranet locataire.",
      features: [
        { title: "Vitrine internet", description: "Catalogue immobilier, politique SEO et présentation de l'activité complète" },
        { title: "Extranet locataire", description: "Paiement en ligne, accès aux informations de compte, parcours optimisés" },
        { title: "Intégration SI", description: "Connexion avec le système d'information LRYE pour les données locataires" },
      ],
      steps: [
        {
          number: "01", title: "Co-conception", accent: "orange",
          detail: {
            heading: "Design Thinking en co-construction",
            description: "Ateliers de co-conception avec les équipes LRYE pour définir les objectifs et les parcours cibles.",
            points: ["Ateliers Design Thinking avec les équipes", "Alignement sur les objectifs de positionnement et notoriété", "Définition des parcours locataires et institutionnels"],
          },
        },
        {
          number: "02", title: "Vitrine internet", accent: "blue",
          detail: {
            heading: "Nouvelle présence web institutionnelle",
            description: "Refonte complète de la vitrine avec catalogue immobilier, SEO et présentation modernisée de l'activité.",
            points: ["Présentation modernisée de l'activité complète", "Catalogue immobilier — résidences et logements vacants", "Politique SEO adaptée pour la visibilité locale"],
          },
        },
        {
          number: "03", title: "Extranet locataire", accent: "orange",
          detail: {
            heading: "Services numériques pour les locataires",
            description: "Création de l'extranet locataire avec accès aux services essentiels — paiement, informations de compte, communication.",
            points: ["Paiement en ligne du loyer", "Accès simplifié aux informations de compte", "Collecte de données locataires pour services personnalisés"],
          },
        },
        {
          number: "04", title: "TMA continue", accent: "blue",
          detail: {
            heading: "Maintenance et évolutions",
            description: "Après la livraison, Steamulo assure la maintenance et les évolutions du portail pour les 100 000 locataires.",
            points: ["Maintenance corrective et évolutive", "100 000 locataires servis sur 2 départements", "7 agences territoriales connectées"],
          },
        },
      ],
    },
  },
];
