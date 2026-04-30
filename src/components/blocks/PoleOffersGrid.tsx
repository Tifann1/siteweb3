"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import { OfferCard, type OfferCardProps } from "@/components/ui/OfferCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PoleOfferTab {
  label: string;
  description?: string;
  cards: OfferCardProps[];
}

export interface PoleOffersGridProps {
  title?: string;
  tabs: PoleOfferTab[];
  cardsPerPage?: number;
  variant?: "grid" | "list";
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PoleOffersGrid({
  title = "Nos offres.",
  tabs,
  cardsPerPage,
  variant = "grid",
}: PoleOffersGridProps) {
  const defaultPerPage = variant === "list" ? 5 : 4;
  const perPage = cardsPerPage ?? defaultPerPage;

  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(6% 4% 6% 4% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 20%",
            scrub: 0.8,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const cards = tabs[activeTab]?.cards ?? [];
  const totalPages = Math.ceil(cards.length / perPage);
  const visible = cards.slice(page * perPage, (page + 1) * perPage);

  function handleTabChange(i: number) {
    setActiveTab(i);
    setPage(0);
    setExpandedKey(null);
  }

  function handlePageChange(p: number) {
    setPage(p);
    setExpandedKey(null);
  }

  return (
    <section
      ref={sectionRef}
      className="bg-deep-navy py-20 md:py-28 flex flex-col gap-12"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      {/* Titre */}
      <h2
        className="font-sans font-bold text-white text-center"
        style={{
          fontSize: "var(--text-card-title)",
          lineHeight: "var(--text-card-title--line-height)",
        }}
      >
        {title}
      </h2>

      {/* Filtres */}
      <nav className="flex items-center gap-8 justify-center" aria-label="Catégories d'offres">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(i)}
            className={[
              "font-sans text-center transition-colors duration-200 pb-1 border-b-2",
              "text-[length:var(--text-tab)]",
              i === activeTab
                ? "text-white border-brand-orange"
                : "text-white/40 border-transparent hover:text-white/70",
            ].join(" ")}
            aria-current={i === activeTab ? "true" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Description du tab actif */}
      <AnimatePresence mode="wait">
        {tabs[activeTab]?.description && (
          <motion.p
            key={`desc-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="font-body text-center text-white/40 max-w-2xl mx-auto -mt-4"
            style={{ fontSize: "var(--text-nav)", lineHeight: 1.65 }}
          >
            {tabs[activeTab].description}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Contenu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${page}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {variant === "list" ? (
            <ListLayout
              cards={visible}
              expandedKey={expandedKey}
              setExpandedKey={setExpandedKey}
              activeTab={activeTab}
              pageIndex={page}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visible.map((card, i) => (
                <OfferCard key={i} {...card} fluid />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {variant === "list" ? (
        <ListPagination
          page={page}
          totalPages={totalPages}
          total={cards.length}
          perPage={perPage}
          onPrev={() => handlePageChange(page - 1)}
          onNext={() => handlePageChange(page + 1)}
        />
      ) : (
        totalPages > 1 && (
          <GridPagination page={page} totalPages={totalPages} onPage={handlePageChange} />
        )
      )}
    </section>
  );
}

/* ─── Layout liste ──────────────────────────────────────────────── */

interface ListLayoutProps {
  cards: OfferCardProps[];
  expandedKey: string | null;
  setExpandedKey: (key: string | null) => void;
  activeTab: number;
  pageIndex: number;
}

function ListLayout({ cards, expandedKey, setExpandedKey, activeTab, pageIndex }: ListLayoutProps) {
  return (
    <div className="flex flex-col divide-y divide-white/8">
      {cards.map((card, i) => {
        const key = `${activeTab}-${pageIndex}-${i}`;
        const isOpen = expandedKey === key;

        return (
          <div key={i}>
            <motion.div
              className="group flex items-center gap-6 py-6 px-4 rounded-[var(--radius-card)] hover:bg-white/3 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: i * 0.06 }}
              onClick={() => setExpandedKey(isOpen ? null : key)}
              role="button"
              aria-expanded={isOpen}
            >
              {/* Barre colorée gauche */}
              <div
                className="w-1 self-stretch rounded-full shrink-0 transition-all duration-300 group-hover:w-[5px]"
                style={{ backgroundColor: card.accentColor }}
              />

              {/* Gradient décoratif miniature */}
              <div
                className="hidden md:block w-12 h-12 rounded-xl shrink-0"
                style={{ background: card.headerGradient, opacity: 0.85 }}
              />

              {/* Titre + features */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h3
                  className="font-sans font-bold text-white"
                  style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.25 }}
                  dangerouslySetInnerHTML={{ __html: card.title.replace(/\n/g, " ") }}
                />
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {card.features.slice(0, 3).map((f, j) => (
                    <span
                      key={j}
                      className="flex items-center gap-1.5 font-body text-white/45"
                      style={{ fontSize: "var(--text-nav)" }}
                    >
                      <span className="size-1 rounded-full shrink-0" style={{ backgroundColor: card.accentColor }} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chevron */}
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-white/40"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>

            {/* Panneau expansible */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <ExpandedPanel card={card} accentColor={card.accentColor} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Pagination liste — barre de progression ───────────────────── */

function ListPagination({
  page,
  totalPages,
  total,
  perPage,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (totalPages <= 1) return null;

  const from = page * perPage + 1;
  const to = Math.min((page + 1) * perPage, total);
  const progress = ((page + 1) / totalPages) * 100;

  return (
    <div className="flex flex-col gap-4">
      {/* Barre de progression */}
      <div className="relative h-px w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-brand-orange"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      {/* Contrôles */}
      <div className="flex items-center justify-between">
        <span
          className="font-body text-white/40"
          style={{ fontSize: "var(--text-nav)" }}
        >
          {from}–{to} sur {total} offres
        </span>

        <div className="flex items-center gap-6">
          <button
            onClick={onPrev}
            disabled={page === 0}
            className="flex items-center gap-2 font-sans font-medium text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            style={{ fontSize: "var(--text-nav)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Précédent
          </button>
          <button
            onClick={onNext}
            disabled={page === totalPages - 1}
            className="flex items-center gap-2 font-sans font-medium text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            style={{ fontSize: "var(--text-nav)" }}
          >
            Suivant
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Pagination grille — boutons numérotés ─────────────────────── */

function GridPagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 0}
        className="flex items-center justify-center size-9 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        aria-label="Page précédente"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPage(i)}
          className={[
            "size-9 rounded-full font-sans text-sm transition-colors",
            i === page
              ? "bg-brand-orange text-white"
              : "border border-white/20 text-white/60 hover:text-white hover:border-white/50",
          ].join(" ")}
          aria-current={i === page ? "page" : undefined}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages - 1}
        className="flex items-center justify-center size-9 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        aria-label="Page suivante"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Panneau déplié ─────────────────────────────────────────────── */

const STATUS_CONFIG = {
  done:   { label: "Publié",   color: "#34d399", glow: false },
  active: { label: "En cours", color: "#86efac", glow: true  },
  soon:   { label: "À venir",  color: "#fbbf24", glow: false },
} as const;

const CAT_COLORS: Record<string, string> = {
  cyber: "#a78bfa",
  infra: "#60a5fa",
  devops: "#fbbf24",
};

const CAT_LABELS: Record<string, string> = {
  cyber: "Cyber & Sécurité",
  infra: "Infrastructure",
  devops: "DevOps",
};

function ExpandedPanel({ card, accentColor }: { card: OfferCardProps; accentColor: string }) {
  const hasLab = card.labItems && card.labItems.length > 0;
  const hasArticles = card.articles && card.articles.length > 0;
  const hasRefs = card.clientRefs && card.clientRefs.length > 0;

  return (
    <div
      className="rounded-2xl p-5 mt-2 mb-4 flex flex-col gap-6"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Carte + formulaire */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Carte offre */}
        <div className="shrink-0">
          <OfferCard {...card} />
        </div>

        {/* Formulaire de contact */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          <h4
            className="font-sans font-bold text-white"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.3 }}
          >
            Votre demande pour {card.title.replace(/\n/g, " ")}
          </h4>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-body text-white/60 text-sm">Prénom</label>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-body text-white/60 text-sm">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-body text-white/60 text-sm">Adresse email</label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-body text-white/60 text-sm">Message (optionnel)</label>
              <textarea
                placeholder="Décrivez votre besoin…"
                rows={3}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>
            <div className="flex justify-start pt-1">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-cta)] font-sans text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Envoyer ma demande
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Lab + articles */}
      {(hasLab || hasArticles) && (
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {hasLab && (
            <div className="flex flex-col gap-3">
              <span className="font-body font-semibold uppercase tracking-widest text-white/30" style={{ fontSize: 10, letterSpacing: "0.12em" }}>
                Steamulo Lab
              </span>
              <div className="flex flex-col gap-2">
                {card.labItems!.map((item) => {
                  const catColor = CAT_COLORS[item.cat] ?? "#fff";
                  const status = STATUS_CONFIG[item.status];
                  return (
                    <div
                      key={item.title}
                      className="flex flex-col gap-2 p-3 rounded-xl relative overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="absolute top-0 left-0 right-0" style={{ height: 1, background: catColor, opacity: 0.5 }} />
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono px-2 py-0.5 rounded-full" style={{ fontSize: 9, background: `${catColor}14`, color: catColor, border: `1px solid ${catColor}35` }}>
                          {CAT_LABELS[item.cat]}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="size-[6px] rounded-full shrink-0" style={{ backgroundColor: status.color, boxShadow: status.glow ? `0 0 5px ${status.color}` : "none" }} />
                          <span className="font-mono text-white/25 uppercase" style={{ fontSize: 9 }}>{status.label}</span>
                        </div>
                      </div>
                      <p className="font-sans text-white/80 leading-snug" style={{ fontSize: "var(--text-nav)" }}>{item.title}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {item.tags.map((tag) => (
                          <span key={tag} className="font-mono text-white/20 bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded" style={{ fontSize: 9 }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {hasArticles && (
            <div className="flex flex-col gap-3">
              <span className="font-body font-semibold uppercase tracking-widest text-white/30" style={{ fontSize: 10, letterSpacing: "0.12em" }}>
                Actualités liées
              </span>
              <div className="flex flex-col gap-2">
                {card.articles!.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group flex flex-col gap-1.5 p-3 rounded-xl transition-colors"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="font-mono uppercase tracking-wider" style={{ fontSize: 9, color: accentColor, opacity: 0.8 }}>{article.category}</span>
                    <p className="font-sans text-white/75 group-hover:text-white transition-colors leading-snug" style={{ fontSize: "var(--text-nav)" }}>{article.title}</p>
                    <span className="flex items-center gap-1 text-white/25 group-hover:text-white/50 transition-colors" style={{ fontSize: 10 }}>
                      Lire l&apos;article
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Références clients */}
      {hasRefs && (
        <div className="flex flex-col gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="font-body font-semibold uppercase tracking-widest text-white/25" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
            Références clients
          </span>
          <div className="flex flex-wrap gap-2">
            {card.clientRefs!.map((ref) => (
              <Link
                key={ref}
                href="/references"
                className="font-body text-white/45 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] px-3 py-1 rounded-full transition-colors"
                style={{ fontSize: 12 }}
              >
                {ref}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
