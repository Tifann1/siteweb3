import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArticlesFeaturedSection } from "./ArticlesFeaturedSection";

const FEATURED_IMG =
  "https://www.figma.com/api/mcp/asset/29823858-edda-4752-a76c-973057a72672";
const IMG_IOT =
  "https://www.figma.com/api/mcp/asset/4ab6dbd5-d6bb-4486-9984-2d2105f18bd0";
const IMG_PRODUCT =
  "https://www.figma.com/api/mcp/asset/0c6124af-8011-4d96-a107-6882a9c5ae8b";
const IMG_DATA =
  "https://www.figma.com/api/mcp/asset/564613a7-5804-454a-be7b-0fe41ed01644";

const meta: Meta<typeof ArticlesFeaturedSection> = {
  title: "Blocks/ArticlesFeaturedSection",
  component: ArticlesFeaturedSection,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ArticlesFeaturedSection>;

export const Default: Story = {
  args: {
    featured: {
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
    recentArticles: [
      {
        imageSrc: IMG_IOT,
        category: "IoT",
        title: "Edge Computing : Réduire la latence dans les usines connectées.",
        href: "/actualite/edge-computing",
      },
      {
        imageSrc: IMG_PRODUCT,
        category: "Produit",
        title:
          "Lancement de SteamPulse : Le tableau de bord IA nouvelle génération.",
        href: "/actualite/steampulse",
      },
      {
        imageSrc: IMG_DATA,
        category: "Data",
        title: "Gouvernance des données en 2024 : Les enjeux du secteur public.",
        href: "/actualite/gouvernance-donnees",
      },
    ],
  },
};
