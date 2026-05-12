import type { Meta, StoryObj } from "@storybook/nextjs";
import { SavoirFaireSection } from "./SavoirFaireSection";

const meta: Meta<typeof SavoirFaireSection> = {
  title: "Blocks/Poles/SavoirFaireSection",
  component: SavoirFaireSection,
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
type Story = StoryObj<typeof SavoirFaireSection>;

export const HebergementDevOps: Story = {
  name: "Le lien entre Dev et Ops",
  args: {
    eyebrow: "Savoir-faire",
    heading: "Le lien entre Dev et Ops.",
    items: [
      {
        label: "Usine logicielle CI/CD",
        title: "Déploiements automatisés, livraisons sans friction",
        description:
          "Nous mettons en place des chaînes CI/CD industrialisées avec GitLab CI, GitHub Actions ou Jenkins. Du commit au déploiement en production, chaque étape est automatisée, versionnée et réversible en quelques secondes.",
        accent: "var(--color-offer-yellow)",
        tags: ["GitLab CI", "GitHub Actions", "Jenkins", "ArgoCD"],
      },
      {
        label: "IaC, Migrations & Audits",
        title: "Infrastructure as Code et urbanisation du SI",
        description:
          "Ansible et Terraform pour un infrastructure as code reproductible. Migrations de A à Z, audit de compliance et haute disponibilité, livrables formalisés (DAT, DEX, PAS) et accompagnement de vos équipes dans la durée.",
        accent: "var(--color-bento-devops-border)",
        tags: ["Ansible", "Terraform", "DAT / DEX", "Audit compliance"],
      },
      {
        label: "Observabilité & SLA",
        title: "Grafana, Prometheus et alerting proactif 24/7",
        description:
          "Dashboards temps réel, alertes intelligentes, tracing distribué. Nous définissons et tenons des engagements de service contractuels (GTI, GTR, RTO, RPO) avec comités de pilotage technique, sécurité et opérationnel.",
        accent: "var(--color-offer-green)",
        tags: ["Grafana", "Prometheus", "Loki", "SLA 24/7"],
      },
    ],
  },
};
