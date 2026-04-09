import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionAugmentedDev } from "./SectionAugmentedDev";

const meta: Meta<typeof SectionAugmentedDev> = {
  title: "Blocks/SectionAugmentedDev",
  component: SectionAugmentedDev,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionAugmentedDev>;

/** Variante par défaut — Pôle Développement Full-stack (node 533:5404) */
export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    heading: "IA augmentée au cœur du code",
    subheading:
      "Nos ingénieurs utilisent l'intelligence artificielle pour gagner en vitesse et en fiabilité sur chaque projet.",
  },
};
