import type { Meta, StoryObj } from "@storybook/nextjs";
import { FeatureAccordion } from "./FeatureAccordion";

const FEATURES_COLLABS = [
  {
    title: "Gestion des présences",
    description:
      "Suivi automatique des présences et absences de vos collaborateurs, avec alertes configurables.",
  },
  {
    title: "Equipe & Collaboration",
    description:
      "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
  },
  {
    title: "Gestion de carrière",
    description:
      "Suivi des évolutions de carrière, entretiens annuels automatisés et recommandations de formation.",
  },
  {
    title: "Inventaire",
    description:
      "Gestion intelligente de votre inventaire avec prédiction des besoins et alertes de stock.",
  },
];

const meta: Meta<typeof FeatureAccordion> = {
  title: "Blocks/Produits/FeatureAccordion",
  component: FeatureAccordion,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs", "page-produits"],
};

export default meta;
type Story = StoryObj<typeof FeatureAccordion>;

export const Default: Story = {
  args: {
    features: FEATURES_COLLABS,
    defaultOpen: -1,
  },
};

export const DeuxiemeOuvert: Story = {
  args: {
    features: FEATURES_COLLABS,
    defaultOpen: 1,
  },
};

export const SansDescriptions: Story = {
  args: {
    features: FEATURES_COLLABS.map(({ title }) => ({ title })),
    defaultOpen: -1,
  },
};
