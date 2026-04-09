import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProductCard } from "./ProductCard";

// URLs Figma MCP — valides 7 jours
const COLLABS_BG =
  "https://www.figma.com/api/mcp/asset/ba0902f2-d2b0-4e2c-a52a-6165d4d29fc0";
const AUTOSCRIBE_BG =
  "https://www.figma.com/api/mcp/asset/655c1f98-58b8-4c7e-b957-7bc1c4bb12ea";

const meta: Meta<typeof ProductCard> = {
  title: "Blocks/ProductCard",
  component: ProductCard,
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
type Story = StoryObj<typeof ProductCard>;

export const Collabs: Story = {
  args: {
    name: "Collabs",
    description:
      "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
    stats: [
      { value: "-40%", label: "Temps de réponse" },
      { value: "24/7", label: "Disponibilité" },
    ],
    backgroundImage: COLLABS_BG,
    badge: "Le plus vendu",
    ctaLabel: "Lancer l'agent",
    ctaHref: "/produits/collabs",
  },
};

export const Autoscribe: Story = {
  args: {
    name: "Autoscribe",
    description:
      "Automatisation intelligente des supports de niveau 1 et 2. Capable de résoudre des requêtes complexes en s'appuyant sur votre base de connaissance interne de manière sécurisée.",
    stats: [
      { value: "-40%", label: "Temps de réponse" },
      { value: "24/7", label: "Disponibilité" },
    ],
    backgroundImage: AUTOSCRIBE_BG,
    badge: "Le plus vendu",
    ctaLabel: "Lancer l'agent",
    ctaHref: "/produits/autoscribe",
  },
};

export const SansBadge: Story = {
  args: {
    ...Collabs.args,
    badge: undefined,
  },
};
