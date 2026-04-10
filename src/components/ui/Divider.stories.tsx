import type { Meta, StoryObj } from "@storybook/nextjs";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "UI/Shared/Divider",
  component: Divider,
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
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const LargeWidth: Story = {
  render: () => (
    <div className="w-[600px]">
      <Divider />
    </div>
  ),
};
