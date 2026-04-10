import type { Meta, StoryObj } from "@storybook/nextjs";
import { ReferenceFilterBar } from "./ReferenceFilterBar";

const ROWS = [
  [
    { label: "Conseil", value: "conseil" },
    { label: "Développement", value: "dev" },
    { label: "DevOps", value: "devops" },
    { label: "IA & Data", value: "ia-data" },
  ],
  [
    { label: "Forfait", value: "forfait" },
    { label: "Régie", value: "regie" },
  ],
];

const meta: Meta<typeof ReferenceFilterBar> = {
  title: "Blocks/References/ReferenceFilterBar",
  component: ReferenceFilterBar,
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
type Story = StoryObj<typeof ReferenceFilterBar>;

export const Default: Story = {
  args: {
    rows: ROWS,
    defaultActive: ["dev", "ia-data"],
  },
};

export const TousInactifs: Story = {
  args: {
    rows: ROWS,
    defaultActive: [],
  },
};

export const TousActifs: Story = {
  args: {
    rows: ROWS,
    defaultActive: ["conseil", "dev", "devops", "ia-data", "forfait", "regie"],
  },
};
