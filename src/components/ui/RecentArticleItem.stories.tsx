import type { Meta, StoryObj } from "@storybook/nextjs";
import { RecentArticleItem } from "./RecentArticleItem";

const IMG_IOT =
  "https://www.figma.com/api/mcp/asset/4ab6dbd5-d6bb-4486-9984-2d2105f18bd0";
const IMG_PRODUCT =
  "https://www.figma.com/api/mcp/asset/0c6124af-8011-4d96-a107-6882a9c5ae8b";
const IMG_DATA =
  "https://www.figma.com/api/mcp/asset/564613a7-5804-454a-be7b-0fe41ed01644";

const meta: Meta<typeof RecentArticleItem> = {
  title: "UI/RecentArticleItem",
  component: RecentArticleItem,
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
type Story = StoryObj<typeof RecentArticleItem>;

export const IoT: Story = {
  args: {
    imageSrc: IMG_IOT,
    category: "IoT",
    title: "Edge Computing : Réduire la latence dans les usines connectées.",
    href: "/actualite/edge-computing",
  },
};

export const Produit: Story = {
  args: {
    imageSrc: IMG_PRODUCT,
    category: "Produit",
    title: "Lancement de SteamPulse : Le tableau de bord IA nouvelle génération.",
    href: "/actualite/steampulse",
  },
};

export const Data: Story = {
  args: {
    imageSrc: IMG_DATA,
    category: "Data",
    title: "Gouvernance des données en 2024 : Les enjeux du secteur public.",
    href: "/actualite/gouvernance-donnees",
  },
};
