import type { Meta, StoryObj } from "@storybook/nextjs";
import { FeatureBento } from "./FeatureBento";

const meta: Meta<typeof FeatureBento> = {
  title: "Blocks/Poles/SpecialConseil",
  component: FeatureBento,
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
type Story = StoryObj<typeof FeatureBento>;

export const Default: Story = {};
