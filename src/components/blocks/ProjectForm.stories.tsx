import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProjectForm } from "./ProjectForm";

const meta: Meta<typeof ProjectForm> = {
  title: "Blocks/Shared/ProjectForm",
  component: ProjectForm,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1f4e" }],
    },
  },
  tags: ["autodocs", "global"],
};

export default meta;
type Story = StoryObj<typeof ProjectForm>;

export const Default: Story = {
  args: {
    ctaLabel: "Partager mon projet !",
  },
};

export const CustomOptions: Story = {
  args: {
    ctaLabel: "Lancer mon projet",
    besoinOptions: [
      { value: "site-web", label: "Site web" },
      { value: "app-mobile", label: "Application mobile" },
      { value: "api", label: "API / Back-end" },
    ],
    budgetOptions: [
      { value: "lt10k", label: "Moins de 10 000 €" },
      { value: "gt10k", label: "Plus de 10 000 €" },
    ],
  },
};
