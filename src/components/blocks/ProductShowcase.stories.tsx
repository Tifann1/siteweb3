import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProductShowcase } from "./ProductShowcase";

// URL Figma MCP — valide 7 jours
const COLLABS_IMG =
  "https://www.figma.com/api/mcp/asset/9124500b-8dfd-47e9-87e0-220dba8d3e39";

const meta: Meta<typeof ProductShowcase> = {
  title: "Blocks/ProductShowcase",
  component: ProductShowcase,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductShowcase>;

export const Collabs: Story = {
  args: {
    imageSrc: COLLABS_IMG,
    title: "A quoi ça sert ?",
    description:
      "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
    ctaLabel: "Je suis intéressé(e)",
    ctaHref: "/#contact",
  },
};

export const CtaPersonnalise: Story = {
  args: {
    ...Collabs.args,
    title: "Comment ça marche ?",
    description:
      "L'agent analyse vos tickets entrants, les classe et répond automatiquement selon votre base de connaissance.",
    ctaLabel: "Voir une démo",
  },
};
