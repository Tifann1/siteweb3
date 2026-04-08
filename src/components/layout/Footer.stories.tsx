import type { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
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
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    copyright: "©2025 Steamulo",
    address: "14 rue Auber - 75009 Paris",
  },
};

export const WithSocials: Story = {
  args: {
    copyright: "©2025 Steamulo",
    address: "14 rue Auber - 75009 Paris",
    socials: {
      github: "https://github.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
};
