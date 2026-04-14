import type { Meta, StoryObj } from "@storybook/nextjs";
import { ContactForm } from "./ContactForm";

const meta: Meta<typeof ContactForm> = {
  title: "Blocks/Contact/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1f4e" }],
    },
  },
  tags: ["autodocs", "page-contact"],
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {
  args: {
    ctaLabel: "Envoyer ma demande",
  },
};

export const CustomOptions: Story = {
  args: {
    ctaLabel: "Démarrer le projet",
    besoinOptions: [
      { value: "site-web", label: "Site web" },
      { value: "app-mobile", label: "Application mobile" },
      { value: "api", label: "API / Back-end" },
      { value: "ia", label: "Intelligence artificielle" },
    ],
    budgetOptions: [
      { value: "lt10k", label: "Moins de 10 000 €" },
      { value: "10k-50k", label: "10 000 € – 50 000 €" },
      { value: "gt50k", label: "Plus de 50 000 €" },
    ],
  },
};

export const CustomReassurance: Story = {
  args: {
    ctaLabel: "Nous contacter",
    reassuranceText: (
      <>
        Aucun engagement. Réponse sous{" "}
        <span style={{ color: "var(--color-brand-orange-light)" }}>48 heures</span>.
      </>
    ),
  },
};
