import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";
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

function PoleTabsNavControlled(args: React.ComponentProps<typeof PoleTabsNav>) {
  const [active, setActive] = useState("conseil");
  return <PoleTabsNav {...args} activeValue={active} onChange={setActive} />;
}

export const Default: Story = {
  render: (args) => <PoleTabsNavControlled {...args} />,
  args: {
    tabs: [
      { label: "Conseil & Transformation", value: "conseil" },
      { label: "Développement Full-stack", value: "dev" },
      { label: "DevOps & Infrastructure", value: "devops" },
    ],
  },
};
