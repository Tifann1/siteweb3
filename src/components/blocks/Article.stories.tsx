import type { Meta, StoryObj } from "@storybook/nextjs";
import { Article } from "./Article";

const IMG_ENGINEERING =
  "https://www.figma.com/api/mcp/asset/29823858-edda-4752-a76c-973057a72672";
const IMG_IOT =
  "https://www.figma.com/api/mcp/asset/4ab6dbd5-d6bb-4486-9984-2d2105f18bd0";
const IMG_PRODUIT =
  "https://www.figma.com/api/mcp/asset/0c6124af-8011-4d96-a107-6882a9c5ae8b";
const IMG_DATA =
  "https://www.figma.com/api/mcp/asset/564613a7-5804-454a-be7b-0fe41ed01644";

const meta: Meta<typeof Article> = {
  title: "Blocks/Actualite/Article",
  component: Article,
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
type Story = StoryObj<typeof Article>;

export const Default: Story = {
  args: {
    imageSrc: IMG_ENGINEERING,
    category: "Engineering",
    date: "12 Mai 2024",
    readingTime: 8,
    title:
      "L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle.",
    excerpt:
      "Comment Steamulo accompagne les leaders industriels dans l'intégration de LLMs sécurisés pour l'optimisation des chaînes de maintenance prédictive.",
    ctaHref: "/actualite/ia-generative-industrie",
  },
};

export const SansExtrait: Story = {
  args: {
    ...Default.args,
    excerpt: undefined,
  },
};

export const SansTempsLecture: Story = {
  args: {
    ...Default.args,
    readingTime: undefined,
  },
};

export const GrilleJournal: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="bg-nav-bg px-12 py-16">
      <div className="grid grid-cols-3 gap-8 max-w-[1280px] mx-auto">
        <Article
          imageSrc={IMG_ENGINEERING}
          category="Engineering"
          date="12 Mai 2024"
          readingTime={8}
          title="L'IA Générative dans l'industrie : Du prototype à la mise en production à l'échelle."
          excerpt="Comment Steamulo accompagne les leaders industriels dans l'intégration de LLMs sécurisés pour l'optimisation des chaînes de maintenance prédictive."
          ctaHref="/actualite/ia-generative-industrie"
        />
        <Article
          imageSrc={IMG_IOT}
          category="IoT"
          date="08 Avr. 2024"
          readingTime={5}
          title="Edge Computing : Réduire la latence dans les usines connectées."
          excerpt="Les enjeux du traitement local des données pour les usines 4.0 et comment réduire la dépendance au cloud."
          ctaHref="/actualite/edge-computing"
        />
        <Article
          imageSrc={IMG_PRODUIT}
          category="Produit"
          date="21 Mar. 2024"
          readingTime={4}
          title="Lancement de SteamPulse : Le tableau de bord IA nouvelle génération."
          excerpt="SteamPulse centralise vos KPIs métier et vos alertes intelligentes dans une interface unifiée pilotée par l'IA."
          ctaHref="/actualite/steampulse"
        />
        <Article
          imageSrc={IMG_DATA}
          category="Data"
          date="14 Fév. 2024"
          readingTime={6}
          title="Gouvernance des données en 2024 : Les enjeux du secteur public."
          excerpt="Souveraineté numérique, interopérabilité et RGPD : tour d'horizon des défis auxquels font face les administrations françaises."
          ctaHref="/actualite/gouvernance-donnees"
        />
        <Article
          imageSrc={IMG_ENGINEERING}
          category="Engineering"
          date="05 Jan. 2024"
          readingTime={7}
          title="Microservices vs Monolithe : Choisir la bonne architecture en 2024."
          excerpt="Retour d'expérience sur la migration d'une plateforme SaaS de 200k utilisateurs vers une architecture microservices."
          ctaHref="/actualite/microservices-monolithe"
        />
        <Article
          imageSrc={IMG_IOT}
          category="IoT"
          date="18 Déc. 2023"
          readingTime={5}
          title="MQTT vs WebSocket : Le bon protocole pour vos objets connectés."
          excerpt="Analyse comparative des protocoles de communication temps-réel pour l'IoT industriel et les contraintes réseau faible débit."
          ctaHref="/actualite/mqtt-websocket-iot"
        />
      </div>
    </div>
  ),
};
