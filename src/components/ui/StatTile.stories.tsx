import type { Meta, StoryObj } from "@storybook/nextjs";
import { StatTile } from "./StatTile";

const meta: Meta<typeof StatTile> = {
  title: "UI/StatTile",
  component: StatTile,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatTile>;

export const ReductionTemps: Story = {
  args: {
    value: "-40%",
    label: "Temps de réponse",
  },
};

export const Disponibilite: Story = {
  args: {
    value: "24/7",
    label: "Disponibilité",
  },
};

export const ChiffrePositif: Story = {
  args: {
    value: "+85%",
    label: "Satisfaction utilisateur",
  },
};
