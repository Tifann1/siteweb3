import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArticleCard } from "./ArticleCard";

const FEATURED_IMG =
  "https://www.figma.com/api/mcp/asset/29823858-edda-4752-a76c-973057a72672";

const meta: Meta<typeof ArticleCard> = {
  title: "Blocks/ArticleCard",
  component: ArticleCard,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Featured: Story = {
  args: {
    imageSrc: FEATURED_IMG,
    category: "Engineering",
    date: "12 Mai 2024",
    readingTime: 8,
    title:
      "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.",
    excerpt:
      "Comment Steamulo accompagne les leaders industriels dans l'intégration de LLMs sécurisés pour l'optimisation des chaînes de maintenance prédictive.",
    ctaHref: "/actualite/ia-generative-industrie",
  },
};

export const SansTempsLecture: Story = {
  args: {
    ...Featured.args,
    readingTime: undefined,
  },
};
