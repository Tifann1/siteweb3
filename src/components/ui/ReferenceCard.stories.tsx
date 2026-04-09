import type { Meta, StoryObj } from "@storybook/nextjs";
import { ReferenceCard } from "./ReferenceCard";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/images/references/*.jpg
const IMG_ARMATIS =
  "https://www.figma.com/api/mcp/asset/94c97a9d-b97a-492b-ad54-3e2933f7afcb";
const IMG_ARMATIS_2 =
  "https://www.figma.com/api/mcp/asset/9be197ac-f669-4021-97e4-5da29d992b54";
const IMG_ARMATIS_3 =
  "https://www.figma.com/api/mcp/asset/dd421d27-52a2-4f71-8db6-bd18d6efa734";
const LOGO_ARMATIS =
  "https://www.figma.com/api/mcp/asset/4a95adec-0269-469c-aca1-6d505a75c0ce";

const meta: Meta<typeof ReferenceCard> = {
  title: "UI/ReferenceCard",
  component: ReferenceCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090f42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReferenceCard>;

export const Default: Story = {
  args: {
    imageSrc: IMG_ARMATIS,
    imageAlt: "Optimisation supply chain",
    logoSrc: LOGO_ARMATIS,
    logoAlt: "Armatis Technology",
    category: "IA & Intelligence Artificielle",
    title: "Optimisation IA de la Supply Chain",
    statValue: "+24%",
    statLabel: "Productivité logistique globale",
    ctaLabel: "Découvrir",
    ctaHref: "/references/armatis",
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    imageSrc: IMG_ARMATIS_2,
    title: "Application métier augmentée de suivi de qualité",
  },
};

export const SansLogo: Story = {
  args: {
    ...Default.args,
    imageSrc: IMG_ARMATIS_3,
    logoSrc: undefined,
    category: "Développement",
    title: "Refonte du SI documentaire",
    statValue: "×3",
    statLabel: "Vitesse de traitement des dossiers",
  },
};
