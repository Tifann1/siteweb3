import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionAgentsFlow } from "./SectionAgentsFlow";

const meta: Meta<typeof SectionAgentsFlow> = {
  title: "Blocks/IngenieurAugmente/SectionAgentsFlow",
  component: SectionAgentsFlow,
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
type Story = StoryObj<typeof SectionAgentsFlow>;

/** Pipeline en 3 étapes — du besoin réel client à l'agent IA packagé */
export const Default: Story = {};
