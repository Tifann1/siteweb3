import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProcessStepper } from "./ProcessStepper";

const meta: Meta<typeof ProcessStepper> = {
  title: "Blocks/accueil/NosExpertises",
  component: ProcessStepper,
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
type Story = StoryObj<typeof ProcessStepper>;

export const Default: Story = {};
