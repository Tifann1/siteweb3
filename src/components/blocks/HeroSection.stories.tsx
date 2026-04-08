import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroSection } from "./HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Blocks/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1f4e" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    eyebrow: "VOS AGENTS IA, CONÇUS POUR LE TERRAIN",
    title: "L'ingénieur\naugmenté au service\nde vos ambitions.",
    highlightWord: "augmenté",
    description:
      "Nous imaginons et déployons des agents IA sur mesure, connectés à vos usages, pour accélérer vos opérations et renforcer votre impact.",
  },
};

export const NoEyebrow: Story = {
  args: {
    ...Default.args,
    eyebrow: undefined,
  },
};

export const CustomHighlight: Story = {
  args: {
    ...Default.args,
    title: "Construire\nl'avenir avec\nl'intelligence artificielle.",
    highlightWord: "l'avenir",
  },
};

/** Variante page pôle — alignement droite, highlight couleur unie (node 448:3508) */
export const RightAligned: Story = {
  args: {
    eyebrow: "Pôle Conseil & Transformation",
    title: "Imaginer des agents IA,\nautomatiser vos\nprocessus métier.",
    highlightWord: "agents IA",
    highlightStyle: "solid",
    highlightColor: "#FBA275",
    description:
      "Nous accompagnons les organisations dans la conception, l'intégration et le déploiement d'agents IA utiles, robustes et pensés pour le terrain.",
    align: "right",
  },
};
