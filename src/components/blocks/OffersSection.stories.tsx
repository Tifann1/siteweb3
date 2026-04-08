import type { Meta, StoryObj } from "@storybook/nextjs";
import { OffersSection } from "./OffersSection";

const meta: Meta<typeof OffersSection> = {
  title: "Blocks/OffersSection",
  component: OffersSection,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#040936" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OffersSection>;

export const Default: Story = {
  args: {
    title: "Nos offres adaptables.",
  },
};
