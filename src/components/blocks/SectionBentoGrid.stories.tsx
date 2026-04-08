import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionBentoGrid } from "./SectionBentoGrid";

// Asset temporaire issu du MCP Figma (expiration 7 jours)
const TEAM_IMAGE =
  "https://www.figma.com/api/mcp/asset/c8c8e959-880b-4b70-8d17-473bc6a353ac";

const meta: Meta<typeof SectionBentoGrid> = {
  title: "Blocks/SectionBentoGrid",
  component: SectionBentoGrid,
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
type Story = StoryObj<typeof SectionBentoGrid>;

export const Default: Story = {
  args: {
    title: "Agents IA & aide à la décision",
    featureCard: {
      image: TEAM_IMAGE,
      imageAlt: "Équipe du pôle conseil",
      title: "L'équipe du pôle conseil",
      description:
        "Nos ingénieurs, spécialistes IA et experts produit conçoivent des agents IA utiles, robustes et pensés pour vos usages métier.",
    },
    wideCard: {
      title: "Stratégie augmentée par l'IA",
      description:
        "Nos experts n'analysent pas seulement vos enjeux : ils les modélisent. Grâce à nos outils exploitant LLMs et agents IA, nous accélérons la capacité de diagnostic et de projection.",
    },
    bottomCards: [
      {
        title: "Audits automatisés",
        description:
          "Analyse rapide de vos stacks techniques, de vos flux et de vos dettes opérationnelles via nos moteurs IA.",
        variant: "highlight",
      },
      {
        title: "Copilote de décision",
        description:
          "Simulation de scénarios métier pour évaluer les options, anticiper les risques et éclairer l'investissement.",
        variant: "default",
      },
    ],
    ctaLabel: "Je réserve un rendez-vous avec un expert.",
  },
};

export const SansCTA: Story = {
  args: {
    ...Default.args,
    ctaLabel: undefined,
  },
};

export const TitrePersonnalise: Story = {
  args: {
    ...Default.args,
    title: "Développement & expertise technique",
    featureCard: {
      ...Default.args.featureCard!,
      title: "L'équipe du pôle développement",
      description:
        "Des développeurs full-stack et experts cloud qui conçoivent vos applications de demain.",
    },
    wideCard: {
      title: "Architecture moderne & scalable",
      description:
        "Nous concevons des architectures cloud-native pensées pour la performance, la résilience et l'évolution.",
    },
    bottomCards: [
      {
        title: "Tests automatisés",
        description:
          "Couverture complète avec CI/CD intégrée pour garantir la qualité de chaque déploiement.",
        variant: "highlight",
      },
      {
        title: "APIs & intégrations",
        description:
          "Conception et exposition d'APIs REST, GraphQL ou event-driven connectées à vos systèmes.",
        variant: "default",
      },
    ],
  },
};
