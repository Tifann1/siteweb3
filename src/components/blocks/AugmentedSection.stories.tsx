import type { Meta, StoryObj } from "@storybook/nextjs";
import { AugmentedSection } from "./AugmentedSection";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/icons/*.svg
const ICON_COPILOT =
  "https://www.figma.com/api/mcp/asset/859fe79d-941e-41f9-b7c3-981f10330814";
const ICON_TEST =
  "https://www.figma.com/api/mcp/asset/b112401d-e8fd-48d1-8db3-f42f655fe0cf";
const ICON_SPEED =
  "https://www.figma.com/api/mcp/asset/384f6f7b-ecd7-40b8-b87e-dd6faba449c4";

const meta: Meta<typeof AugmentedSection> = {
  title: "Blocks/References/AugmentedSection",
  component: AugmentedSection,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090f42" }],
    },
  },
  tags: ["autodocs", "page-references"],
};

export default meta;
type Story = StoryObj<typeof AugmentedSection>;

export const Default: Story = {
  args: {
    eyebrow: "Innovation IA",
    title: "L'Ingénieur Augmenté au service d'Armatis",
    description:
      "Chez Steamulo, nos développeurs ne codent plus seuls. Ils sont propulsés par l'Intelligence Artificielle pour transcender les limites de la productivité et de la fiabilité.",
    features: [
      {
        iconSrc: ICON_COPILOT,
        iconAlt: "Copilot",
        title: "Pair-Programming avec Copilot",
        description:
          "Génération de boilerplate et suggestion d'algorithmes complexes en temps réel.",
      },
      {
        iconSrc: ICON_TEST,
        iconAlt: "Tests",
        title: "Tests Automatisés par IA",
        description:
          "Identification prédictive des cas limites et génération de suites de tests exhaustives.",
      },
      {
        iconSrc: ICON_SPEED,
        iconAlt: "Vitesse",
        title: "Vitesse de Livraison ×3",
        description:
          "Réduction drastique du time-to-market sans compromis sur la dette technique.",
      },
    ],
    steps: [
      { number: "01", title: "Cadre & conception", accent: "orange" },
      { number: "02", title: "Predictive QA", accent: "blue" },
      { number: "03", title: "Code Generation", accent: "orange" },
      { number: "04", title: "Auto-Doc", accent: "blue" },
    ],
  },
};

export const SansEyebrow: Story = {
  args: {
    ...Default.args,
    eyebrow: undefined,
  },
};
