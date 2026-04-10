import type { Meta, StoryObj } from "@storybook/nextjs";
import { IntegrationSchema } from "./IntegrationSchema";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/icons/*.svg
const ICON_DB = "https://www.figma.com/api/mcp/asset/79c512e1-d72d-48b9-b52c-70f9bf38285a";
const ICON_CODE = "https://www.figma.com/api/mcp/asset/0fe6056c-bf6c-4617-bf71-3dc25cf7d53d";
const ICON_ROCKET = "https://www.figma.com/api/mcp/asset/20c9c12b-f68e-4f90-ba08-23c9f0528724";
const ICON_INSIGHTS = "https://www.figma.com/api/mcp/asset/2f5746b2-34cd-461b-b820-c74cc60711ec";
const ICON_ROADMAP = "https://www.figma.com/api/mcp/asset/ef9070e1-3967-4c80-8768-7e5cdb4ca883";
const ICON_ROI = "https://www.figma.com/api/mcp/asset/3d795a81-80b2-4aa3-8466-237e0fbdbbba";

const meta: Meta<typeof IntegrationSchema> = {
  title: "Blocks/Accueil/IntegrationSchema",
  component: IntegrationSchema,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1f4e" }],
    },
  },
  tags: ["autodocs", "page-accueil"],
};

export default meta;
type Story = StoryObj<typeof IntegrationSchema>;

export const Default: Story = {
  args: {
    title: "Des agents IA de l'idée à l'impact",
    description:
      "Nous cadrons, concevons et déployons des agents IA utiles, pensés pour vos métiers, vos équipes et vos résultats.",
    steps: [
      {
        iconSrc: ICON_DB,
        iconAlt: "Base de données",
        title: "Analyse des usages",
        description:
          "Nous identifions vos cas d'usage prioritaires et les opportunités d'automatisation à plus forte valeur.",
      },
      {
        iconSrc: ICON_CODE,
        iconAlt: "Code",
        title: "Conception de l'agent IA",
        description:
          "Nous cadrons le besoin, définissons les flux, les données et les interactions pour concevoir un agent IA activable.",
      },
      {
        iconSrc: ICON_ROCKET,
        iconAlt: "Fusée",
        title: "Pilotage de la valeur",
        description:
          "Nous mesurons l'impact réel de vos agents IA sur vos opérations, vos délais et votre performance métier.",
      },
    ],
    miniCards: [
      {
        iconSrc: ICON_INSIGHTS,
        title: "Insights rapides",
        subtitle: "Analyse métier assistée",
      },
      {
        iconSrc: ICON_ROADMAP,
        title: "Roadmap IA",
        subtitle: "Priorisation des usages",
      },
      {
        iconSrc: ICON_ROI,
        title: "ROI suivi",
        subtitle: "Décision pilotée par la donnée",
      },
    ],
  },
};
