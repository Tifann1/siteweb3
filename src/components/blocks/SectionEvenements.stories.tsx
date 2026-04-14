import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionEvenements } from "./SectionEvenements";

const ITEMS_FULL = [
  {
    id: "evt-1",
    title: "Tech Leaders Summit — IA & Automatisation 2025",
    description:
      "Rejoignez les décideurs tech de l'industrie pour explorer les architectures agents, les LLMs en production et les patterns d'intégration métier qui changent la donne.",
    date: { day: "14", month: "MAI", year: "2025" },
    location: "Paris, Station F",
    tags: ["IA Générative", "Agents", "Architecture"],
    ctaLabel: "Réserver ma place",
    ctaHref: "#",
  },
  {
    id: "evt-2",
    title: "Workshop RAG & Bases Vectorielles",
    description: "Hands-on : construire un pipeline RAG de A à Z.",
    date: { day: "22", month: "MAI", year: "2025" },
    location: "Remote",
    tags: ["RAG", "LLM"],
    ctaLabel: "S'inscrire",
    ctaHref: "#",
  },
  {
    id: "evt-3",
    title: "DevFun Open Day — Rencontrez nos pôles",
    description: "Portes ouvertes : démonstrations, échanges et networking.",
    date: { day: "05", month: "JUN", year: "2025" },
    location: "Paris, 75009",
    tags: ["Networking", "DevOps"],
    ctaLabel: "S'inscrire",
    ctaHref: "#",
  },
  {
    id: "evt-4",
    title: "Conférence Cloud Native & Infrastructure as Code",
    description: "Kubernetes, Terraform et GitOps : retours d'expérience terrain.",
    date: { day: "19", month: "JUN", year: "2025" },
    location: "Lyon, Centre des Congrès",
    tags: ["Cloud", "Infrastructure"],
    ctaLabel: "S'inscrire",
    ctaHref: "#",
  },
];

const meta: Meta<typeof SectionEvenements> = {
  title: "Blocks/Evenements/SectionEvenements",
  component: SectionEvenements,
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
type Story = StoryObj<typeof SectionEvenements>;

export const Complet: Story = {
  args: {
    title: "Événements.",
    subtitle: "Rencontrez nos experts, participez aux échanges.",
    ctaAllLabel: "Voir tous les événements",
    ctaAllHref: "#",
    items: ITEMS_FULL,
  },
};

export const FeaturedSeul: Story = {
  args: {
    ...Complet.args,
    items: ITEMS_FULL.slice(0, 1),
  },
};

export const DeuxEvenements: Story = {
  args: {
    ...Complet.args,
    items: ITEMS_FULL.slice(0, 2),
  },
};

export const SansCTA: Story = {
  args: {
    ...Complet.args,
    ctaAllLabel: undefined,
    items: ITEMS_FULL,
  },
};
