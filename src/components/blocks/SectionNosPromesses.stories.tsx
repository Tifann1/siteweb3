import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  SectionNosPromesses,
  type PromiseItem,
} from "./SectionNosPromesses";

const PROMISES_FR: PromiseItem[] = [
  {
    eyebrow: "Notre différence",
    title: "Des Ingénieurs Augmentés.",
    description:
      "Nos ingénieurs embarquent l'IA dans leurs processus quotidiens. Moins d'erreurs, plus de vélocité, des livrables plus solides — sans jamais sacrifier la qualité de l'architecture.",
    highlights: [
      "IA intégrée à chaque phase : cadrage, code, revue, doc",
      "Modèles de langage sur les flux de revue de code",
      "Documentation générée et maintenue en continu",
    ],
    accent: "orange",
  },
  {
    eyebrow: "Paris · France",
    title: "Ancrés en France, disponibles vite.",
    description:
      "Même fuseau horaire, même langue, mêmes contraintes réglementaires. Pas de frottement, pas de traduction perdue.",
    stat: { value: "< 2h", label: "Délai de réponse moyen" },
  },
  {
    eyebrow: "Suivi projet",
    title: "Un référent unique, de bout en bout.",
    description:
      "Du premier cadrage à la livraison finale, un ingénieur identifié suit votre projet. Pas de relais. Pas de perte de contexte.",
    stat: { value: "0", label: "Rotation d'équipe en cours de projet" },
  },
  {
    eyebrow: "Excellence",
    title: "Un niveau technique qui ne descend pas.",
    description:
      "Ingénieurs seniors certifiés, revues de code systématiques, formation continue. Nous ne faisons pas de compromis sur la qualité.",
    highlights: [
      "Profils seniors uniquement — 5 ans d'expérience minimum",
      "Revue de code obligatoire à chaque pull request",
      "Veille et certifications maintenues en continu",
    ],
    accent: "blue",
  },
  {
    eyebrow: "Livraison",
    title: "Sur-mesure, clé en main.",
    description:
      "Pas de template, pas de raccourci. Chaque solution est conçue pour votre contexte, vos contraintes, vos équipes. On livre quelque chose qui fonctionne — et qui dure.",
    highlights: [
      "Architecture alignée avec vos systèmes existants",
      "Documentation de prise en main incluse dans chaque livraison",
      "Formation de vos équipes à la solution livrée",
    ],
  },
  {
    eyebrow: "Méthode",
    title: "Transformer le flou en feuille de route.",
    description:
      "Notre valeur commence avant la première ligne de code : cadrer, prioriser, découper un besoin complexe en étapes claires et livrables concrets.",
  },
];

const meta: Meta<typeof SectionNosPromesses> = {
  title: "Blocks/Shared/SectionNosPromesses",
  component: SectionNosPromesses,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs", "global"],
};

export default meta;
type Story = StoryObj<typeof SectionNosPromesses>;

export const Default: Story = {
  args: {
    title: "Nos promesses.",
    description: "Ce qui nous différencie, concrètement.",
    items: PROMISES_FR,
  },
};

export const SansAccent: Story = {
  args: {
    ...Default.args,
    items: PROMISES_FR.map((p) => ({ ...p, accent: "default" as const })),
  },
};

export const SansStat: Story = {
  args: {
    ...Default.args,
    items: PROMISES_FR.map((p) => ({ ...p, stat: undefined })),
  },
};
