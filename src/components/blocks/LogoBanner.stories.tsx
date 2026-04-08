import type { Meta, StoryObj } from "@storybook/nextjs";
import { LogoBanner } from "./LogoBanner";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/logos/*.svg.
const LOGOS = [
  { src: "https://www.figma.com/api/mcp/asset/24e2455e-489d-4fa2-bbe2-1ff91ee19b20", alt: "BPCE", width: 80, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/1cf0efe2-eb8c-4f35-97da-e22462a905e7", alt: "FDJ", width: 56, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/03946619-d9eb-4264-a86e-618863ddd099", alt: "La Poste", width: 45, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/10e6d578-bc22-4df0-823d-f5e1690fe0d1", alt: "Bienveo", width: 67, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/e6240734-86be-44a1-a1d8-8f936a159a90", alt: "Marketpay", width: 26, height: 30 },
];

const meta: Meta<typeof LogoBanner> = {
  title: "Blocks/LogoBanner",
  component: LogoBanner,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1f4e" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LogoBanner>;

export const Default: Story = {
  args: {
    logos: LOGOS,
    duration: 20,
  },
};

export const Slow: Story = {
  args: {
    logos: LOGOS,
    duration: 40,
  },
};
