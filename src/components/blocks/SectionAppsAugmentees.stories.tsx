import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionAppsAugmentees } from "./SectionAppsAugmentees";

const meta: Meta<typeof SectionAppsAugmentees> = {
  title: "Blocks/IngenieurAugmente/SectionAppsAugmentees",
  component: SectionAppsAugmentees,
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
type Story = StoryObj<typeof SectionAppsAugmentees>;

/** Layout 2 colonnes — 3 piliers d'intégration IA + illustration architecture en couches */
export const Default: Story = {};
