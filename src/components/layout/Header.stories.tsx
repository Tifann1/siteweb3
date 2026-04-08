import type { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "./Header";

// ⚠ Les URLs d'assets Figma expirent dans 7 jours.
// Remplacer logoSrc par le fichier local une fois disponible dans /public/images/.
const FIGMA_LOGO_URL =
  "https://www.figma.com/api/mcp/asset/f466c443-805d-4a1d-8e55-9e9731b90949";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0F172A" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logoSrc: FIGMA_LOGO_URL,
    logoAlt: "DevFun",
    ctaLabel: "Je lance mon projet",
    ctaHref: "/#contact",
  },
};

export const WithActiveLink: Story = {
  args: {
    ...Default.args,
    navItems: [
      { label: "Ingénieur augmenté", href: "/" },
      { label: "Nos pôles", href: "/poles" },
      { label: "Nos références", href: "/references" },
      { label: "Nos produits IA", href: "/produits" },
      { label: "Actualités", href: "/actualite" },
    ],
  },
};

export const CustomCTA: Story = {
  args: {
    ...Default.args,
    ctaLabel: "Nous contacter",
    ctaHref: "/contact",
  },
};
