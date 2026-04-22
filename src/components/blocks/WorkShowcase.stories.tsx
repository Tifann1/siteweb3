import type { Meta, StoryObj } from "@storybook/nextjs";
import { WorkShowcase } from "./WorkShowcase";

const meta: Meta<typeof WorkShowcase> = {
  title: "Blocks/Poles/SpecialHebergement",
  component: WorkShowcase,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs", "page-accueil"],
};

export default meta;
type Story = StoryObj<typeof WorkShowcase>;

export const Default: Story = {};
