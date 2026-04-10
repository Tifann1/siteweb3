import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionExpertTeam } from "./SectionExpertTeam";

const meta: Meta<typeof SectionExpertTeam> = {
  title: "Blocks/Poles/SectionExpertTeam",
  component: SectionExpertTeam,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs", "page-poles"],
};

export default meta;
type Story = StoryObj<typeof SectionExpertTeam>;

const POLE_DEV_EXPERTS = [
  {
    name: "Sylvain Gourio",
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Sylvain",
  },
  {
    name: "Alexandre Bodet",
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Alexandre",
  },
  {
    name: "Raphael Kalinowski",
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Raphael",
  },
  {
    name: "Adrien Trancoso",
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Adrien",
  },
];

/** Pôle Développement — Les Visages du Pôle (node 533:5500) */
export const Default: Story = {
  args: {
    heading: "Les Visages du Pôle",
    experts: POLE_DEV_EXPERTS,
  },
};

export const TwoExperts: Story = {
  args: {
    heading: "L'équipe DevOps",
    experts: POLE_DEV_EXPERTS.slice(0, 2),
  },
};
