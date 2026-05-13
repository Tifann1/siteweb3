import type { Meta, StoryObj } from "@storybook/nextjs";
import { PoleIdentityBanner } from "./PoleIdentityBanner";

const meta: Meta<typeof PoleIdentityBanner> = {
  title: "Blocks/Poles/PoleIdentityBanner",
  component: PoleIdentityBanner,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs", "page-poles"],
};

export default meta;
type Story = StoryObj<typeof PoleIdentityBanner>;

/** Pôle Conseil — accent orange */
export const Conseil: Story = {
  args: {
    poleLabel: "Conseil",
    accentColor: "var(--color-tab-active)",
    accentColorLight: "var(--color-highlight-pole)",
    tagline: "Stratégie. Transformation. Impact durable.",
    stats: [
      { value: "+200", label: "Projets livrés" },
      { value: "12 ans", label: "Expertise métier" },
      { value: "98%", label: "Satisfaction client" },
    ],
    keywords: ["Transformation digitale", "Conduite du changement", "Architecture SI", "Agilité"],
  },
};

/** Pôle Développement — accent bleu */
export const Developpement: Story = {
  args: {
    poleLabel: "Développement",
    accentColor: "var(--color-tab-active-dev)",
    accentColorLight: "var(--color-bento-dev-accent)",
    tagline: "Architecture IA. Performance réelle.",
    stats: [
      { value: "+150", label: "Applis livrées" },
      { value: "99,9%", label: "Uptime moyen" },
      { value: "22", label: "Développeurs seniors" },
    ],
    keywords: ["Full-Stack", "IA générative", "Cloud-native", "API-first", "TypeScript"],
  },
};

/** Pôle DevOps & Infrastructure — accent jaune */
export const DevOps: Story = {
  args: {
    poleLabel: "DevOps",
    accentColor: "var(--color-tab-active-devops)",
    accentColorLight: "var(--color-offer-yellow)",
    tagline: "Infrastructure invisible. Disponibilité totale.",
    stats: [
      { value: "+80", label: "Infras pilotées" },
      { value: "< 5 min", label: "MTTR moyen" },
      { value: "18", label: "Ingénieurs certifiés" },
    ],
    keywords: ["Kubernetes", "CI/CD", "Observabilité", "FinOps", "SRE"],
  },
};

/** Pôle IA — accent vert */
export const IA: Story = {
  args: {
    poleLabel: "Intelligence Artificielle",
    accentColor: "var(--color-offer-green)",
    accentColorLight: "var(--color-offer-green)",
    tagline: "IA augmentée. Résultats mesurables.",
    stats: [
      { value: "×3", label: "Productivité moyenne" },
      { value: "+40", label: "Modèles déployés" },
      { value: "< 4 sem", label: "Time-to-value" },
    ],
    keywords: ["LLM", "RAG", "MLOps", "Computer Vision", "Data engineering"],
  },
};

/** Pôle R&D — accent vert IA (--color-offer-green) */
export const RD: Story = {
  args: {
    poleLabel: "R&D",
    accentColor: "var(--color-offer-green)",
    accentColorLight: "var(--color-offer-green)",
    tagline: "Partenaire de vos innovations.",
    description:
      "Nous souhaitons dans notre démarche être force de proposition et d'accompagnement technique auprès de nos clients afin de pouvoir les accompagner au quotidien sur leurs projets d'innovations.",
    stats: [
      { value: "10 ans", label: "Agréments CIR & CII" },
      { value: "2", label: "Domaines d'action R&D" },
      { value: "3", label: "Produits internes en production" },
    ],
    keywords: [
      "Labs d'innovation clients",
      "Projets R&D internes",
      "IA factory",
      "Pôle produit",
    ],
  },
};
