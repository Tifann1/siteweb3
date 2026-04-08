import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { PoleTabsNav } from "./PoleTabsNav";

const meta: Meta<typeof PoleTabsNav> = {
  title: "UI/PoleTabsNav",
  component: PoleTabsNav,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#040936" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PoleTabsNav>;

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState("conseil");
    return <PoleTabsNav {...args} activeValue={active} onChange={setActive} />;
  },
  args: {
    tabs: [
      { label: "Conseil & Transformation", value: "conseil" },
      { label: "Développement Full-stack", value: "dev" },
      { label: "DevOps & Infrastructure", value: "devops" },
    ],
  },
};
