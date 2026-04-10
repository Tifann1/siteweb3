import type { Meta, StoryObj } from "@storybook/nextjs";
import { ExpertCard } from "./ExpertCard";

const meta: Meta<typeof ExpertCard> = {
  title: "UI/ExpertCard",
  component: ExpertCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExpertCard>;

export const Default: Story = {
  args: {
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Photo",
    imageAlt: "Sylvain Gourio",
    name: "Sylvain Gourio",
  },
};

export const WithRole: Story = {
  args: {
    imageSrc: "https://placehold.co/175x219/434674/DFE1F8?text=Photo",
    imageAlt: "Alexandre Bodet",
    name: "Alexandre Bodet",
    role: "Lead Développeur",
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex gap-20 items-center bg-nav-bg p-10">
      {[
        { name: "Sylvain Gourio" },
        { name: "Alexandre Bodet" },
        { name: "Raphael Kalinowski" },
        { name: "Adrien Trancoso" },
      ].map((expert) => (
        <ExpertCard
          key={expert.name}
          imageSrc={`https://placehold.co/175x219/434674/DFE1F8?text=${expert.name.split(" ")[0]}`}
          name={expert.name}
        />
      ))}
    </div>
  ),
};
