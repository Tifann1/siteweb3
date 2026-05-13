import type { Meta, StoryObj } from "@storybook/nextjs";
import { QuoteBlock } from "./QuoteBlock";

const meta: Meta<typeof QuoteBlock> = {
  title: "Blocks/References/QuoteBlock",
  component: QuoteBlock,
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
type Story = StoryObj<typeof QuoteBlock>;

export const Default: Story = {
  args: {
    quote:
      "L'intégration d'une intelligence artificielle au cœur des process ouvre des perspectives fortes en matière de performance, de qualité de service et d'accompagnement des conseillers",
    attribution: "Strategic Vision 2025",
  },
};

export const SansAttribution: Story = {
  args: {
    quote:
      "L'IA n'est pas un outil de remplacement, c'est un levier d'amplification humaine.",
  },
};

export const SteveJobs: Story = {
  args: {
    quote:
      "Parfois, quand vous innovez, vous faites des erreurs. Celui qui n'a jamais commis d'erreurs, n'a jamais tenté d'innover.",
    attribution: "Steve Jobs",
  },
};
