import type { Meta, StoryObj } from "@storybook/nextjs";
import { CtaBanner } from "./CtaBanner";

const meta: Meta<typeof CtaBanner> = {
  title: "Blocks/CtaBanner",
  component: CtaBanner,
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
type Story = StoryObj<typeof CtaBanner>;

export const Default: Story = {
  args: {
    title: "Prêt à augmenter\nvos projets ?",
    description:
      "Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA.",
    primaryLabel: "Parlons de votre projet",
    secondaryLabel: "Voir nos offres",
  },
};

export const CustomText: Story = {
  args: {
    title: "Une question ?\nParlons-en.",
    description: "Notre équipe répond sous 24h.",
    primaryLabel: "Nous contacter",
    secondaryLabel: "Nos références",
  },
};
