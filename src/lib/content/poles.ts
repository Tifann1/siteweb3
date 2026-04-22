import type { Pole } from "@/types";

export const poles: Pole[] = [
  {
    slug: "conseil",
    name: { fr: "Conseil", en: "Consulting" },
    description: {
      fr: "Cadrage, accompagnement et pilotage de vos projets de transformation digitale.",
      en: "Scoping, coaching and steering your digital transformation projects.",
    },
    services: [],
  },
  {
    slug: "developpement",
    name: { fr: "Développement", en: "Development" },
    description: {
      fr: "Applications web et mobiles robustes, performantes et belles à utiliser.",
      en: "Robust, performant and beautiful web and mobile applications.",
    },
    services: [],
  },
  {
    slug: "devops-infrastructure",
    name: { fr: "DevOps & Infrastructure", en: "DevOps & Infrastructure" },
    description: {
      fr: "Déploiement, scalabilité et sécurité de vos systèmes cloud.",
      en: "Deployment, scalability and security of your cloud systems.",
    },
    services: [],
  },
];
