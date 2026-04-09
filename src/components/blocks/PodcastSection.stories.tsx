import type { Meta, StoryObj } from "@storybook/nextjs";
import { PodcastSection } from "./PodcastSection";

const meta: Meta<typeof PodcastSection> = {
  title: "Blocks/PodcastSection",
  component: PodcastSection,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PodcastSection>;

export const Default: Story = {
  args: {
    podcastName: "entre les lignes",
    title: "Écoutez le futur de\nl'ingénierie.",
    description:
      "Chaque mois, nous invitons des experts du digital et des pionniers de l'industrie pour discuter des ruptures technologiques.",
    episode: {
      episodeTitle: "EP.3 : L'Usine Cognitive",
      guests: "Avec Thibault & Baptiste @devops",
      duration: "12:01",
      progress: 33,
      listenHref: "#",
    },
  },
};

export const AutreEpisode: Story = {
  args: {
    ...Default.args,
    episode: {
      episodeTitle: "EP.4 : L'IA au service du DevOps",
      guests: "Avec Marie & Karim @steamulo",
      duration: "38:22",
      progress: 0,
    },
  },
};
