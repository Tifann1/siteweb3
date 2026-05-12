import type { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "securiser-clusters-kubernetes-on-premise",
    title: {
      fr: "Sécuriser nos clusters Kubernetes on-premise",
      en: "Securing Our On-Premise Kubernetes Clusters",
    },
    excerpt: {
      fr: "Mise en place de règles réseau strictes, permissions minimales pour les pods et audits de sécurité sur nos clusters Kubernetes on-premise. Retour d'expérience DevSecOps en production — série « Sous le capot du cloud » #6.",
      en: "Implementing strict network policies, minimal pod permissions and security audits on our on-premise Kubernetes clusters. A hands-on DevSecOps retrospective in production — 'Under the Cloud Hood' series #6.",
    },
    category: "Kubernetes",
    tags: ["Kubernetes", "Infrastructure"],
    date: "2026-01-18",
    readingTime: 10,
    imageSrc: "/images/actualite/Securiser-nos-clusters.png",
    externalUrl:
      "https://blog.steamulo.com/s%C3%A9curiser-nos-clusters-kubernetes-on-premise-8418e1940388",
  },
  {
    slug: "optimiser-stockage-kubernetes-on-premise-nfs-iscsi-truenas",
    title: {
      fr: "Optimiser le stockage Kubernetes on-premise : de NFS à iSCSI sur SAN TrueNAS",
      en: "Optimising On-Premise Kubernetes Storage: From NFS to iSCSI on TrueNAS SAN",
    },
    excerpt: {
      fr: "En production, la configuration du stockage fait la différence entre un cluster qui tient ses SLAs et un cluster qui rame. Passage de NFS à iSCSI sur TrueNAS SAN pour fiabiliser notre infrastructure Kubernetes — série « Sous le capot du cloud » #5.",
      en: "In production, storage configuration is the difference between a cluster that holds its SLAs and one that struggles. Moving from NFS to iSCSI on TrueNAS SAN to harden our Kubernetes infrastructure — 'Under the Cloud Hood' series #5.",
    },
    category: "Infrastructure",
    tags: ["Kubernetes", "Infrastructure"],
    date: "2026-01-12",
    readingTime: 9,
    imageSrc: "/images/actualite/Optimiser-le-stockage.png",
    externalUrl:
      "https://blog.steamulo.com/optimiser-le-stockage-kubernetes-on-premise-de-nfs-%C3%A0-iscsi-sur-san-truenas-6705bb7cb87b",
  },
  {
    slug: "stack-monitoring-ha-kubernetes-prometheus-thanos",
    title: {
      fr: "Stack de monitoring HA pour Kubernetes : de Prometheus à Thanos",
      en: "HA Monitoring Stack for Kubernetes: From Prometheus to Thanos",
    },
    excerpt: {
      fr: "Architecture de monitoring haute disponibilité pour Kubernetes utilisant Prometheus, Loki, Grafana et Thanos pour l'agrégation multi-clusters et le stockage long terme sur S3.",
      en: "A highly available monitoring architecture for Kubernetes using Prometheus, Loki, Grafana and Thanos for multi-cluster aggregation and long-term S3 storage.",
    },
    category: "Cloud Infrastructure",
    tags: ["Kubernetes", "Infrastructure"],
    date: "2025-11-16",
    readingTime: 10,
    imageSrc: "/images/actualite/stack-monitoring-ha.png",
    externalUrl:
      "https://blog.steamulo.com/stack-de-monitoring-ha-pour-kubernetes-de-prometheus-%C3%A0-thanos-acf6a95d2a0c",
  },
  {
    slug: "choix-infra-hyperviseur-proxmox",
    title: {
      fr: "Choix de l'infra et hyperviseur — Pourquoi Proxmox ?",
      en: "Infrastructure & Hypervisor Choice — Why Proxmox?",
    },
    excerpt: {
      fr: "Analyse du choix de Proxmox VE comme hyperviseur pour notre cloud interne, avec design de référence haute disponibilité et Infrastructure as Code via Terraform.",
      en: "A deep dive into choosing Proxmox VE as the hypervisor for our internal cloud, with a reference HA design and Infrastructure as Code via Terraform.",
    },
    category: "Infrastructure",
    tags: ["Infrastructure"],
    date: "2025-09-28",
    readingTime: 8,
    imageSrc: "/images/actualite/choix-infra-proxmox.png",
    externalUrl:
      "https://blog.steamulo.com/choix-de-linfra-et-hyperviseur-pourquoi-proxmox-choix-de-l-hyperviseur-pour-notre-cloud-interne-4442fa9d191d",
  },
  {
    slug: "architectures-cluster-standalone-vs-ha",
    title: {
      fr: "Architectures de cluster : Standalone vs Haute Disponibilité",
      en: "Cluster Architectures: Standalone vs High Availability",
    },
    excerpt: {
      fr: "Comment concevoir et opérer un cluster Kubernetes haute disponibilité on-premise : VIP API, stockage répliqué via Longhorn et mises à jour sans interruption de service.",
      en: "How to design and operate a high-availability on-premise Kubernetes cluster: API VIP, replicated storage via Longhorn, and zero-downtime upgrades.",
    },
    category: "Kubernetes",
    tags: ["Kubernetes"],
    date: "2025-09-08",
    readingTime: 9,
    imageSrc: "/images/actualite/architectures-cluster-ha.png",
    externalUrl:
      "https://blog.steamulo.com/architectures-de-cluster-standalone-vs-ha-comment-concevoir-et-op%C3%A9rer-une-ha-kubernetes-63e640864077",
  },
  {
    slug: "kubernetes-incontournable-hebergeurs",
    title: {
      fr: "Pourquoi Kubernetes est devenu incontournable pour les hébergeurs",
      en: "Why Kubernetes Has Become Essential for Hosting Providers",
    },
    excerpt: {
      fr: "Migration vers Kubernetes pour standardiser le delivery, améliorer la disponibilité et réduire les coûts. ROI atteint en 4 à 6 mois avec 50 % de réduction du MCO.",
      en: "Migrating to Kubernetes to standardise delivery, improve uptime and cut costs. ROI achieved in 4–6 months with a 50% reduction in operational overhead.",
    },
    category: "Cloud Native",
    tags: ["Kubernetes"],
    date: "2025-08-24",
    readingTime: 7,
    imageSrc: "/images/actualite/kubernetes-incontournable.png",
    externalUrl:
      "https://blog.steamulo.com/pourquoi-kubernetes-est-devenu-incontournable-pour-les-h%C3%A9bergeurs-2025-ha-scalabilit%C3%A9-42fe2030345c",
  },
  {
    slug: "modeles-ia-kubernetes-change-donne",
    title: {
      fr: "Vos modèles IA méritent mieux : pourquoi Kubernetes change la donne",
      en: "Your AI Models Deserve Better: Why Kubernetes Changes the Game",
    },
    excerpt: {
      fr: "Hébergement de LLM et modèles spécialisés sur Kubernetes avec les nouvelles ressources InferencePool et InferenceModel pour le routage intelligent et l'optimisation GPU.",
      en: "Hosting LLMs and specialised models on Kubernetes using new InferencePool and InferenceModel resources for intelligent routing and GPU optimisation.",
    },
    category: "IA/ML",
    tags: ["Kubernetes", "IA"],
    date: "2025-07-25",
    readingTime: 8,
    imageSrc: "/images/actualite/modeles-ia-kubernetes.png",
    externalUrl:
      "https://blog.steamulo.com/vos-mod%C3%A8les-ia-m%C3%A9ritent-mieux-pourquoi-kubernetes-change-la-donne-60801e7723b8",
  },
  {
    slug: "autoscribe-reunions-automatisees-securisees",
    title: {
      fr: "Vos réunions automatisées et vos données sécurisées avec Autoscribe",
      en: "Automated Meetings and Secure Data with Autoscribe",
    },
    excerpt: {
      fr: "Solution d'auto-hébergement IA pour la transcription audio et la génération de comptes-rendus. Benchmarks Insanely Fast Whisper vs propriétaires, LLaMA 3.2 vs modèles payants.",
      en: "A self-hosted AI solution for audio transcription and meeting notes generation. Benchmarks: Insanely Fast Whisper vs proprietary, LLaMA 3.2 vs paid models.",
    },
    category: "Produit",
    tags: ["IA", "Produit"],
    date: "2025-05-27",
    readingTime: 7,
    imageSrc: "/images/actualite/autoscribe-reunions.png",
    externalUrl:
      "https://blog.steamulo.com/vos-r%C3%A9unions-automatis%C3%A9es-et-vos-donn%C3%A9es-s%C3%A9curis%C3%A9es-avec-autoscribe-05b898426b7c",
  },
  {
    slug: "utilisation-scaleway-mvp-ia",
    title: {
      fr: "Utilisation de Scaleway pour un MVP d'IA",
      en: "Using Scaleway for an AI MVP",
    },
    excerpt: {
      fr: "Comment nous avons utilisé les instances Scaleway pour héberger nos modèles IA open-source (Whisper, FLAN-T5) dans le cadre d'Autoscribe — notre solution souveraine de transcription et résumé de réunions.",
      en: "How we used Scaleway instances to host our open-source AI models (Whisper, FLAN-T5) for Autoscribe — our sovereign meeting transcription and summarisation solution.",
    },
    category: "IA/ML",
    tags: ["IA", "Infrastructure"],
    date: "2023-12-22",
    readingTime: 7,
    imageSrc: "/images/actualite/UtilisationDeScaleway.png",
    externalUrl:
      "https://blog.steamulo.com/utilisation-de-scaleway-pour-un-mvp-dia-b66353a9b81a",
  },
];
