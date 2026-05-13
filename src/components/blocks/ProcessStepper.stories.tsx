import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProcessStepper, type Step } from "./ProcessStepper";

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

const RD_STEPS: Step[] = [
  {
    id: "identification",
    num: "01",
    title: "Identification",
    description:
      "Analyser le marché, les tendances et les besoins utilisateurs pour détecter et structurer les opportunités d'innovation.",
    highlights: [],
    accent: "var(--color-offer-green)",
    pipeline: [
      {
        label: "Identification des opportunités d'innovation",
        description: "Analyser marché, tendances et besoins utilisateurs.",
      },
      {
        label: "Définition des objectifs",
        description: "Clarifier parties prenantes, accomplissements et bénéfices attendus.",
      },
      {
        label: "Recherche et veille technologique",
        description: "Approfondir la technologie existante, surveiller les innovations.",
      },
      {
        label: "Évaluation des ressources",
        description: "Compétences humaines et infrastructures.",
      },
      {
        label: "Génération d'idées",
        description: "Sessions brainstorming favorisant la diversité.",
      },
    ],
  },
  {
    id: "poc",
    num: "02",
    title: "Construction POC / MVP",
    description:
      "Sélectionner les concepts les plus prometteurs, puis construire, tester et valider en itérations courtes.",
    highlights: [],
    accent: "var(--color-offer-green)",
    pipeline: [
      {
        label: "Sélection des concepts",
        description: "Évaluer faisabilité technique et viabilité économique.",
      },
      {
        label: "Prototypage",
        description:
          "Co-Conception et réalisation. Validation. Développement. Tests et validation continue.",
      },
    ],
  },
];

export const RD: Story = {
  args: {
    steps: RD_STEPS,
    sectionLabel: "Notre démarche",
    titleText: "Une démarche itérative numérotée.",
    highlightWord: "itérative",
    labelColor: "var(--color-offer-green)",
  },
};
