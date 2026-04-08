import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  SectionNosSucces,
  type ReferenceSuccesCard,
} from "./SectionNosSucces";

// Assets temporaires issus du MCP Figma (expiration 7 jours)
const ARMATIS_LOGO =
  "https://www.figma.com/api/mcp/asset/a3b504c6-71c9-453d-b358-b6823a610c08";
const REFERENCE_IMAGE =
  "https://www.figma.com/api/mcp/asset/08c6ed9d-cb09-4ff2-b716-24c29d0d3722";

const ARMATIS_CARD: ReferenceSuccesCard = {
  image: REFERENCE_IMAGE,
  imageAlt: "Équipe Armatis en opération",
  logo: ARMATIS_LOGO,
  logoAlt: "Armatis Technology",
  sector: "Secteur Privé",
  title: "Application métier augmentée de suivi de qualité",
  stats: [
    { value: "+24%", label: "Productivité logistique globale" },
    { value: "-18%", label: "Taux d'erreurs de saisie" },
  ],
};

const SECOND_CARD: ReferenceSuccesCard = {
  image: REFERENCE_IMAGE,
  imageAlt: "Projet secteur public",
  sector: "Secteur Public",
  title: "Plateforme IA de traitement documentaire automatisé",
  stats: [
    { value: "×3", label: "Vitesse de traitement des dossiers" },
    { value: "95%", label: "Taux de satisfaction utilisateurs" },
  ],
};

const meta: Meta<typeof SectionNosSucces> = {
  title: "Blocks/SectionNosSucces",
  component: SectionNosSucces,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#040936" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionNosSucces>;

export const Default: Story = {
  args: {
    title: "Nos Succès",
    subtitle: "L'IA concrète au service de nos partenaires.",
    ctaLabel: "Voir tous les cas clients",
    cards: [ARMATIS_CARD, SECOND_CARD],
  },
};

export const UneSeuleCard: Story = {
  args: {
    ...Default.args,
    cards: [ARMATIS_CARD],
  },
};

export const SansCTA: Story = {
  args: {
    ...Default.args,
    ctaLabel: undefined,
    onCtaClick: undefined,
  },
};

export const SansLogo: Story = {
  args: {
    ...Default.args,
    cards: [
      { ...ARMATIS_CARD, logo: undefined },
      { ...SECOND_CARD, logo: undefined },
    ],
  },
};
