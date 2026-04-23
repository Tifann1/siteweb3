import type { Meta, StoryObj } from "@storybook/nextjs";
import { AugmentedSection } from "./AugmentedSection";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/icons/*.svg
const ICON_COPILOT =
  "https://www.figma.com/api/mcp/asset/859fe79d-941e-41f9-b7c3-981f10330814";
const ICON_TEST =
  "https://www.figma.com/api/mcp/asset/b112401d-e8fd-48d1-8db3-f42f655fe0cf";
const ICON_SPEED =
  "https://www.figma.com/api/mcp/asset/384f6f7b-ecd7-40b8-b87e-dd6faba449c4";

const meta: Meta<typeof AugmentedSection> = {
  title: "Blocks/References/AugmentedSection",
  component: AugmentedSection,
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
type Story = StoryObj<typeof AugmentedSection>;

export const Default: Story = {
  args: {
    eyebrow: "Innovation IA",
    title: "L'Ingénieur Augmenté au service d'Armatis",
    description:
      "Chez Steamulo, nos développeurs ne codent plus seuls. Ils sont propulsés par l'Intelligence Artificielle pour transcender les limites de la productivité et de la fiabilité.",
    features: [
      {
        iconSrc: ICON_COPILOT,
        iconAlt: "Copilot",
        title: "Pair-Programming avec Copilot",
        description:
          "Génération de boilerplate et suggestion d'algorithmes complexes en temps réel.",
      },
      {
        iconSrc: ICON_TEST,
        iconAlt: "Tests",
        title: "Tests Automatisés par IA",
        description:
          "Identification prédictive des cas limites et génération de suites de tests exhaustives.",
      },
      {
        iconSrc: ICON_SPEED,
        iconAlt: "Vitesse",
        title: "Vitesse de Livraison ×3",
        description:
          "Réduction drastique du time-to-market sans compromis sur la dette technique.",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Cadre & conception",
        accent: "orange",
        detail: {
          heading: "Cadrage du besoin métier",
          description:
            "Avant d'écrire une ligne de code, nous avons audité les workflows existants. Chaque friction opérationnelle a été cartographiée, chaque cas d'usage priorisé selon son impact réel.",
          points: [
            "Analyse des workflows de traitement d'appels",
            "Identification des cas d'usage IA à fort ROI",
            "Définition des critères de succès mesurables",
          ],
        },
      },
      {
        number: "02",
        title: "Predictive QA",
        accent: "blue",
        detail: {
          heading: "Assurance qualité prédictive",
          description:
            "Système de QA piloté par IA qui anticipe les régressions avant production. Les cas limites sont générés automatiquement à chaque pull request.",
          points: [
            "Génération automatique de suites de tests sur chaque PR",
            "Réduction de 68% des régressions en production",
            "Couverture de test passée de 42% à 91%",
          ],
        },
      },
      {
        number: "03",
        title: "Code Generation",
        accent: "orange",
        detail: {
          heading: "Accélération par génération de code",
          description:
            "Chaque ingénieur travaille en binôme avec un assistant IA. Le boilerplate et les algorithmes répétitifs sont générés en temps réel.",
          points: [
            "Pair-programming IA sur 100% des sprints",
            "Vélocité de livraison multipliée par 3",
            "Zéro dette technique introduite",
          ],
        },
      },
      {
        number: "04",
        title: "Auto-Doc",
        accent: "blue",
        detail: {
          heading: "Documentation générée en continu",
          description:
            "Documentation technique et fonctionnelle produite automatiquement à chaque livraison. Transfert de compétences sans formation longue.",
          points: [
            "Documentation API générée à chaque déploiement",
            "Guides utilisateur mis à jour en continu",
            "Transfert de compétences en 2 semaines",
          ],
        },
      },
    ],
  },
};

export const SansEyebrow: Story = {
  args: {
    ...Default.args,
    eyebrow: undefined,
  },
};
