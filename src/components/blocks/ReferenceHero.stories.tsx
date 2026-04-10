import type { Meta, StoryObj } from "@storybook/nextjs";
import { ReferenceHero } from "./ReferenceHero";

// ⚠ URL Figma — expire dans 7 jours. Remplacer par /public/images/references/*.jpg
const BG_IMAGE =
  "https://www.figma.com/api/mcp/asset/bfb491ec-d36f-42fe-aceb-87b786d49500";

const meta: Meta<typeof ReferenceHero> = {
  title: "Blocks/References/ReferenceHero",
  component: ReferenceHero,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090f42" }],
    },
  },
  tags: ["autodocs", "page-references"],
};

export default meta;
type Story = StoryObj<typeof ReferenceHero>;

export const Default: Story = {
  args: {
    eyebrow: "ÉTUDE DE CAS : ARMATIS",
    title: "Armatis, le déploiement de l'IA à grande échelle",
    highlightPhrase: "déploiement de l'IA",
    description:
      "Nous fusionnons expertise technique industrielle et innovation numérique pour bâtir des solutions robustes, agiles et performantes.",
    backgroundImageSrc: BG_IMAGE,
    backgroundImageAlt: "Équipe Armatis en opération",
  },
};

export const SansImage: Story = {
  args: {
    ...Default.args,
    backgroundImageSrc: undefined,
  },
};

export const AutreReference: Story = {
  args: {
    eyebrow: "ÉTUDE DE CAS : LA POSTE",
    title: "La Poste, la transformation IA des flux documentaires",
    highlightPhrase: "transformation IA",
    description:
      "Automatisation intelligente du traitement de milliers de documents quotidiens pour améliorer la qualité de service.",
  },
};
