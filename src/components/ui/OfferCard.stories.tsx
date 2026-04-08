import type { Meta, StoryObj } from "@storybook/nextjs";
import { OfferCard } from "./OfferCard";
import { OFFER_GRADIENTS } from "@/components/blocks/OffersSection";

const meta: Meta<typeof OfferCard> = {
  title: "UI/OfferCard",
  component: OfferCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#040936" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OfferCard>;

export const Orange: Story = {
  args: {
    title: "Etudes UX\n& Maquettes",
    accentColor: "#FF6D1E",
    headerGradient: OFFER_GRADIENTS.orange,
    ctaLabel: "Accéder à l'offre",
    features: [
      "Compréhension de votre besoin",
      "Atelier Design Thinking",
      "Propositions UX",
      "Maquettes UX - UI",
    ],
    discoverLabel: "Découvrir le pôle",
  },
};

export const BlueBestSeller: Story = {
  args: {
    title: "Agent analyse\n& décision",
    accentColor: "#4746E9",
    headerGradient: OFFER_GRADIENTS.blue,
    ctaLabel: "Accéder à l'offre",
    features: [
      "Analyse de documents",
      "Extraction d'informations clés",
      "Aide à la priorisation",
      "Restitution structurée",
    ],
    discoverLabel: "Découvrir le pôle",
    badge: "meilleure vente",
  },
};

export const Yellow: Story = {
  args: {
    title: "Infrastructure\n& Cloud",
    accentColor: "#E6B002",
    headerGradient: OFFER_GRADIENTS.yellow,
    ctaLabel: "Pôle conseil",
    features: [
      "Compréhension de votre besoin",
      "Atelier Design Thinking",
      "Propositions UX",
      "Maquettes UX - UI",
    ],
    discoverLabel: "Découvrir",
  },
};

export const Teal: Story = {
  args: {
    title: "Agents IA\nsur mesure",
    accentColor: "#46BA87",
    headerGradient: OFFER_GRADIENTS.teal,
    ctaLabel: "Pôle IA",
    features: [
      "Conception d'agents IA",
      "Fine-tuning de modèles",
      "RAG & bases vectorielles",
      "Intégration métier",
    ],
    discoverLabel: "Découvrir",
  },
};
