import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionDirecteurPole } from "./SectionDirecteurPole";

const meta: Meta<typeof SectionDirecteurPole> = {
  title: "Blocks/Poles/SectionDirecteurPole",
  component: SectionDirecteurPole,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#040936" }],
    },
  },
  tags: ["autodocs", "page-poles"],
};

export default meta;
type Story = StoryObj<typeof SectionDirecteurPole>;

const STATS_CONSEIL = [
  { value: "12 ans", label: "Expérience" },
  { value: "+200", label: "Projets livrés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "35", label: "Experts mobilisés" },
];

const STATS_DEV = [
  { value: "8 ans", label: "Expérience" },
  { value: "+150", label: "Applis livrées" },
  { value: "99.9%", label: "Uptime moyen" },
  { value: "22", label: "Développeurs" },
];

const STATS_DEVOPS = [
  { value: "10 ans", label: "Expérience" },
  { value: "+80", label: "Infras pilotées" },
  { value: "< 5 min", label: "MTTR moyen" },
  { value: "18", label: "Ingénieurs" },
];

/** Pôle Conseil — accent orange */
export const Conseil: Story = {
  args: {
    name: "Virginie",
    role: "Directrice du Pôle Conseil",
    imageSrc: "/images/team/virginie.png",
    poleLabel: "Conseil",
    accentColor: "var(--color-tab-active)",
    vision:
      "Notre rôle n'est pas de délivrer des slides — c'est de transformer durablement la façon dont nos clients opèrent. Chaque mission commence par comprendre l'humain derrière le problème.",
    stats: STATS_CONSEIL,
    ctaLabel: "Discuter avec l'équipe",
    ctaHref: "#contact",
  },
};

/** Pôle Développement — accent bleu */
export const Developpement: Story = {
  args: {
    name: "Sylvain Gourio",
    role: "Directeur du Pôle Développement",
    imageSrc: "/images/team/sylvain-gourio.png",
    poleLabel: "Développement",
    accentColor: "var(--color-tab-active-dev)",
    vision:
      "Coder vite c'est bien. Coder juste, c'est mieux. Nous livrons des architectures qui tiennent dans le temps parce que nous refusons la dette technique dès le premier sprint.",
    stats: STATS_DEV,
    ctaLabel: "Voir nos réalisations",
    ctaHref: "#references",
  },
};

/** Pôle Hébergement — accent jaune */
export const Hebergement: Story = {
  args: {
    name: "Thibault Buze",
    role: "Directeur du Pôle Hébergement",
    imageSrc: "/images/team/thibault-buze.png",
    poleLabel: "Hébergement",
    accentColor: "var(--color-tab-active-devops)",
    vision:
      "Une infrastructure invisible est une infrastructure réussie. Mon équipe s'assure que vos produits tournent, s'adaptent et évoluent — sans que vous ayez jamais à y penser.",
    stats: STATS_DEVOPS,
    ctaLabel: "Auditer mon infra",
    ctaHref: "#contact",
  },
};

/** Sans CTA */
export const SansCTA: Story = {
  args: {
    ...Conseil.args,
    ctaLabel: undefined,
  },
};
