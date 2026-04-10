import type { Meta, StoryObj } from "@storybook/nextjs";
import { PodcastPlayerCard } from "./PodcastPlayerCard";

const meta: Meta<typeof PodcastPlayerCard> = {
  title: "UI/Actualite/PodcastPlayerCard",
  component: PodcastPlayerCard,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs", "page-actualite"],
};

export default meta;
type Story = StoryObj<typeof PodcastPlayerCard>;

export const Default: Story = {
  args: {
    episodeTitle: "EP.3 : L'Usine Cognitive",
    guests: "Avec Thibault & Baptiste @devops",
    duration: "12:01",
    progress: 33,
    listenHref: "#",
  },
};

export const DebutEpisode: Story = {
  args: {
    ...Default.args,
    progress: 5,
  },
};

export const FinEpisode: Story = {
  args: {
    ...Default.args,
    progress: 85,
  },
};
