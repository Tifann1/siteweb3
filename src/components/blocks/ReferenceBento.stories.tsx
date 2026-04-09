import type { Meta, StoryObj } from "@storybook/nextjs";
import { ReferenceBento } from "./ReferenceBento";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/images/*.
const EXPERT_IMAGE =
  "https://www.figma.com/api/mcp/asset/fb12da95-1cb3-4dbc-961d-554222d3714e";
const BRAND_LOGO =
  "https://www.figma.com/api/mcp/asset/100e224e-88ce-4d3c-a831-b974ea920cb7";

const meta: Meta<typeof ReferenceBento> = {
  title: "Blocks/ReferenceBento",
  component: ReferenceBento,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090f42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReferenceBento>;

export const Default: Story = {
  args: {
    expertImageSrc: EXPERT_IMAGE,
    expertImageAlt: "Sophie Vasseur, Head of Strategy",
    expertName: "Sophie Vasseur",
    expertRole: "Head of Strategy",
    expertBio:
      "Spécialiste en prospective technologique et pilotage de roadmaps IA complexes.",
    featureCardTitle: "Une plateforme métier augmentée",
    featureItems: [
      {
        title: "Simplification des workflow",
        description: "Monitoring & Suivi des appels",
      },
      {
        title: "Modules intelligents",
        description: "Analyse prédictive et alertes automatisées",
      },
    ],
    ethosTitle: "Professional Ethos",
    ethosDescription:
      "With over 15 years at the intersection of heavy industry and software engineering, Alexandre has scaled STEAMULO from a niche consultancy to a global reliability partner.",
    stats: [
      { value: "12+", label: "Global Markets" },
      { value: "$500M+", label: "Impact Delivered", highlight: true },
      { value: "250+", label: "Specialists Led" },
    ],
    brandLogoSrc: BRAND_LOGO,
    brandLogoAlt: "Steamulo",
    brandName: "The Steamulo Standard",
    brandSubtitle: "Uncompromising Reliability by Design",
    brandCtaLabel: "Download Portfolio",
  },
};
