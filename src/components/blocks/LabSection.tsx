"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LabStatus = "done" | "active" | "soon";

interface LabItem {
  cat: "cyber" | "infra" | "devops";
  fmt: "projet" | "rex" | "veille";
  status: LabStatus;
  title: string;
  description: string;
  tags: string[];
}

const LAB_ITEMS: LabItem[] = [
  {
    cat: "cyber",
    fmt: "rex",
    status: "done",
    title: "EDR dual-layer sur Kubernetes : HarfangLab + Falco",
    description:
      "Architecture de détection à deux niveaux complémentaires — HarfangLab pour la couche OS/système et Falco pour le runtime Kubernetes. Retour sur l'intégration, la gestion des faux positifs et le whitelisting automatisé via Falco-Talon.",
    tags: ["HarfangLab", "Falco", "K8s"],
  },
  {
    cat: "cyber",
    fmt: "projet",
    status: "active",
    title: "DMZ Kubernetes : isolation réseau avancée par namespace",
    description:
      "Mise en place d'une zone démilitarisée dans un cluster Kubernetes via Network Policies Calico, politique deny-all par défaut et exposition contrôlée par namespace. Architecture applicable aux environnements mutualisés multi-clients.",
    tags: ["Calico", "NetworkPolicy", "RBAC"],
  },
  {
    cat: "cyber",
    fmt: "rex",
    status: "done",
    title: "Supply chain sécurité : Cosign + Harbor en production",
    description:
      "Signature cryptographique systématique des images Docker via Cosign dans la CI/CD, stockage et scan Trivy dans Harbor. Politique de refus de déploiement des images non signées ou contenant des vulnérabilités critiques.",
    tags: ["Cosign", "Harbor", "Trivy"],
  },
  {
    cat: "cyber",
    fmt: "rex",
    status: "done",
    title: "ClamAV natif en CI/CD et volumes Kubernetes",
    description:
      "Déploiement de ClamAV en service centralisé clamd dans K8s avec scan on-access, scans planifiés par PVC via CronJobs et mode incrémental automatique. Intégration dans la chaîne CI pour bloquer les artefacts infectés dès le build.",
    tags: ["ClamAV", "CronJob", "CI/CD"],
  },
  {
    cat: "infra",
    fmt: "projet",
    status: "active",
    title: "Kubernetes HA multi-zoning : architecture et opérations",
    description:
      "Conception et opération de clusters Kubernetes haute disponibilité répartis sur plusieurs zones géographiques. Gestion des bascules, synchronisation des états et continuité de service lors de pannes de zone, sans interruption applicative.",
    tags: ["K8s", "HA", "multi-zone"],
  },
  {
    cat: "infra",
    fmt: "projet",
    status: "active",
    title: "Proxmox multi-zone mutualisé : gestion et isolation",
    description:
      "Opération de clusters Proxmox bare-metal répartis sur plusieurs zones depuis un point de gestion centralisé. Isolation stricte entre tenants, gestion des VLANs, stockage SAN ZFS partagé (TrueNAS) et procédures de résilience multi-site.",
    tags: ["Proxmox", "TrueNAS", "VLAN"],
  },
  {
    cat: "infra",
    fmt: "veille",
    status: "active",
    title: "Benchmark des projets certifiés CNCF en 2025",
    description:
      "Évaluation et tests pratiques des projets graduated et incubating de la CNCF (Cilium, Kyverno, OpenTelemetry, Argo, Crossplane…). Évaluation de leur maturité, interopérabilité et pertinence pour nos architectures de production.",
    tags: ["CNCF", "Cilium", "Kyverno"],
  },
  {
    cat: "infra",
    fmt: "projet",
    status: "soon",
    title: "HPC & GPU cloud pour inférence LLM souveraine",
    description:
      "Expérimentation de clusters GPU sur cloud souverain (Scaleway, OVH) pour l'inférence de modèles LLM open source. Benchmarks de performance, coûts, et évaluation des solutions de serving (vLLM, Ollama) dans un contexte RGPD-compliant.",
    tags: ["GPU", "LLM", "vLLM"],
  },
  {
    cat: "devops",
    fmt: "projet",
    status: "active",
    title: "Monitoring multi-cluster : performance et scalabilité",
    description:
      "Amélioration continue de l'observabilité sur des architectures multi-clusters : agrégation Thanos, dashboards Grafana unifiés, rétention long terme sur S3 et optimisation des requêtes PromQL pour réduire la charge en production.",
    tags: ["Thanos", "Prometheus", "Grafana"],
  },
  {
    cat: "devops",
    fmt: "rex",
    status: "done",
    title: "Self-healing IA : auto-remédiation des incidents avec N8N",
    description:
      "Agent IA connecté au monitoring Prometheus/Grafana via des pipelines N8N. Détection automatique des anomalies, remédiation sans intervention humaine sur les cas courants et escalade intelligente pour les incidents complexes.",
    tags: ["N8N", "IA", "Prometheus"],
  },
  {
    cat: "devops",
    fmt: "veille",
    status: "soon",
    title: "FinOps multi-cloud souverain : méthodes et outils",
    description:
      "Analyse des pratiques FinOps appliquées aux environnements cloud souverains (OVH, Scaleway). Comparatif des outils d'optimisation des coûts, rightsizing Kubernetes et stratégies de réduction de l'empreinte financière et carbone.",
    tags: ["FinOps", "OVH", "Scaleway"],
  },
];

const CAT_COLORS: Record<string, string> = {
  cyber: "#a78bfa",
  infra: "#60a5fa",
  devops: "#fbbf24",
};

const FMT_COLORS: Record<string, string> = {
  projet: "#86efac",
  rex: "#34d399",
  veille: "#94a3b8",
};

const STATUS_CONFIG: Record<LabStatus, { label: string; color: string; glow: boolean }> = {
  done:   { label: "Publié",   color: "#34d399", glow: false },
  active: { label: "En cours", color: "#86efac", glow: true  },
  soon:   { label: "À venir",  color: "#fbbf24", glow: false },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PER_PAGE = 3;

export function LabSection() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? LAB_ITEMS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : LAB_ITEMS;

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentPage = Math.min(page, Math.max(0, totalPages - 1));
  const visible = filtered.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);

  function goTo(p: number) {
    setDir(p > currentPage ? 1 : -1);
    setPage(p);
  }

  function handleSearch(q: string) {
    setQuery(q);
    setPage(0);
  }

  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "var(--page-margin-x)",
        paddingRight: "var(--page-margin-x)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between mb-10">
        <div className="flex flex-col gap-4">
          <span
            className="font-body font-semibold uppercase tracking-widest text-brand-orange"
            style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
          >
            Steamulo Lab
          </span>
          <h2
            className="font-sans font-bold text-text-heading"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Recherches &amp; expérimentations
          </h2>
          <p
            className="font-body text-text-light/50 max-w-xl"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
          >
            Notre BU Infrastructure &amp; Sécurité explore en continu les sujets émergents de l&apos;écosystème cloud-native. Projets internes, retours d&apos;expérience terrain et veille technologique structurée.
          </p>

          {/* Champ de recherche */}
          <div className="relative flex items-center mt-1 max-w-xs">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="absolute left-3 text-white/30 pointer-events-none"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher…"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 font-body text-white/70 placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
              style={{ fontSize: "var(--text-nav)" }}
            />
            {query && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-2.5 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Effacer la recherche"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation slider */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-body text-white/30" style={{ fontSize: 13 }}>
            {filtered.length === 0
              ? "Aucun résultat"
              : `${currentPage * PER_PAGE + 1}–${Math.min((currentPage + 1) * PER_PAGE, filtered.length)} / ${filtered.length}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage === 0}
              className="flex items-center justify-center size-9 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              aria-label="Précédent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage === totalPages - 1 || totalPages === 0}
              className="flex items-center justify-center size-9 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              aria-label="Suivant"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={`${currentPage}-${query}`}
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0 },
            exit:  (d: number) => ({ opacity: 0, x: d * -40 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {visible.map((item, i) => {
            const catColor = CAT_COLORS[item.cat];
            const fmtColor = FMT_COLORS[item.fmt];
            const status = STATUS_CONFIG[item.status];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE, delay: i * 0.05 }}
                className="flex flex-col gap-3 p-5 rounded-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: 1, background: catColor, opacity: 0.4 }}
                />

                {/* Top row: badges + status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className="font-mono px-2.5 py-[3px] rounded-full text-[10px]"
                      style={{
                        background: `${catColor}14`,
                        color: catColor,
                        border: `1px solid ${catColor}40`,
                      }}
                    >
                      {item.cat === "cyber" ? "Cyber & Sécurité" : item.cat === "infra" ? "Infrastructure" : "DevOps"}
                    </span>
                    <span
                      className="font-mono px-2.5 py-[3px] rounded-full text-[10px]"
                      style={{
                        background: `${fmtColor}12`,
                        color: fmtColor,
                        border: `1px solid ${fmtColor}38`,
                      }}
                    >
                      {item.fmt === "rex" ? "REX" : item.fmt.charAt(0).toUpperCase() + item.fmt.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="size-[7px] rounded-full shrink-0"
                      style={{
                        backgroundColor: status.color,
                        boxShadow: status.glow ? `0 0 5px ${status.color}` : "none",
                      }}
                    />
                    <span className="font-mono text-white/30 uppercase tracking-wide" style={{ fontSize: 10 }}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <p
                  className="font-sans font-medium text-white/90 leading-snug"
                  style={{ fontSize: "var(--text-body-lg)" }}
                >
                  {item.title}
                </p>

                {/* Description */}
                <p
                  className="font-body text-white/40 flex-1"
                  style={{ fontSize: "var(--text-nav)", lineHeight: 1.65 }}
                >
                  {item.description}
                </p>

                {/* Footer tags */}
                <div className="flex gap-2 flex-wrap pt-2 border-t border-white/[0.08]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-white/55 bg-white/[0.07] border border-white/[0.14] px-2 py-0.5 rounded"
                      style={{ fontSize: 10 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {filtered.length === 0 ? (
        <p className="text-center font-body text-white/30 mt-8" style={{ fontSize: "var(--text-nav)" }}>
          Aucun résultat pour « {query} »
        </p>
      ) : (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === currentPage ? 24 : 6,
                height: 6,
                background: i === currentPage ? "var(--color-brand-orange, #ef8336)" : "rgba(255,255,255,0.15)",
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
