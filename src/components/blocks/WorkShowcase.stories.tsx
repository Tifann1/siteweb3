import type { Meta, StoryObj } from "@storybook/nextjs";
import { WorkShowcase, type Project } from "./WorkShowcase";

const meta: Meta<typeof WorkShowcase> = {
  title: "Blocks/Poles/SpecialHebergement",
  component: WorkShowcase,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090F42" }],
    },
  },
  tags: ["autodocs", "page-accueil"],
};

export default meta;
type Story = StoryObj<typeof WorkShowcase>;

export const Default: Story = {};

const RD_PROJECTS: Project[] = [
  {
    id: "carrefour-rd",
    client: "Carrefour",
    title: "Application mobile location voiture autonome",
    description:
      "Application mobile permettant la location de véhicules autonomes en magasin — gestion de flotte en temps réel et IA embarquée.",
    tags: ["Mobile", "IoT", "Véhicule autonome"],
    accent: "var(--color-offer-green)",
    wide: true,
  },
  {
    id: "louvre-hotels",
    client: "Louvre Hotels",
    title: "Machine Learning analyse prédictive",
    description:
      "Modèles prédictifs appliqués à la gestion hôtelière — anticipation de la demande, optimisation tarifaire et analyse comportementale.",
    tags: ["Machine Learning", "Prédictif", "Data"],
    accent: "var(--color-offer-blue)",
  },
  {
    id: "sncf",
    client: "SNCF",
    title: "Application mobile orientation malvoyants en gare",
    description:
      "Aide à la navigation en gare pour les voyageurs malvoyants — reconnaissance d'environnement par IA et guidage vocal.",
    tags: ["Mobile", "Accessibilité", "IA"],
    accent: "var(--color-offer-green)",
    wide: true,
  },
];

export const RD: Story = {
  render: () => (
    <WorkShowcase
      projects={RD_PROJECTS}
      sectionLabel="Projets clients"
      labelColor="var(--color-offer-green)"
      titleNode={
        <>
          La preuve{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(162.47deg, #8effc6 0%, #46BA87 100%)",
            }}
          >
            par l&apos;exemple.
          </span>
        </>
      }
    />
  ),
};
