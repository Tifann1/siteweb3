import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionCopilote } from "./SectionCopilote";

const meta: Meta<typeof SectionCopilote> = {
  title: "Blocks/IngenieurAugmente/SectionCopilote",
  component: SectionCopilote,
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
type Story = StoryObj<typeof SectionCopilote>;

/** Bento grid 12 colonnes — featured card + 6 capability cards avec hover glow */
export const Default: Story = {};
