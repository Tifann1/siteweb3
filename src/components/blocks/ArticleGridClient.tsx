"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Article } from "./Article";

const ARTICLES_PER_PAGE = 4;

export interface ArticleGridItem {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  date: string;
  readingTime?: number;
  imageSrc?: string;
  videoSrc?: string;
  ctaLabel?: string;
}

interface ArticleGridClientProps {
  articles: ArticleGridItem[];
  locale: string;
}

export function ArticleGridClient({ articles, locale }: ArticleGridClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [articles]);

  const filtered = useMemo(() => {
    if (!selectedTag) return articles;
    return articles.filter((a) => a.tags?.includes(selectedTag));
  }, [articles, selectedTag]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  function handleTagClick(tag: string) {
    setSelectedTag(selectedTag === tag ? null : tag);
    setPage(1);
  }

  function handlePageChange(p: number) {
    setPage(p);
    // scroll to top of grid
    document.getElementById("article-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex flex-col gap-10" id="article-grid">
      {/* Section heading */}
      <div className="flex items-end justify-between gap-4 border-b border-white/5 pb-6">
        <h2
          className="font-sans font-bold text-white"
          style={{
            fontSize: "var(--text-card-title)",
            lineHeight: "var(--text-card-title--line-height)",
          }}
        >
          Toutes nos actualités
        </h2>
        {selectedTag && (
          <button
            onClick={() => { setSelectedTag(null); setPage(1); }}
            className="flex items-center gap-1.5 font-body text-text-muted hover:text-text-heading transition-colors"
            style={{ fontSize: "12px" }}
          >
            <span>Effacer le filtre</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2">
        <TagButton
          label="Tous"
          active={selectedTag === null}
          onClick={() => { setSelectedTag(null); setPage(1); }}
        />
        {allTags.map((tag) => (
          <TagButton
            key={tag}
            label={tag}
            active={selectedTag === tag}
            onClick={() => handleTagClick(tag)}
          />
        ))}
      </div>

      {/* Articles grid — 2×2 */}
      {paged.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {paged.map((article) => (
            <Article
              key={article.slug}
              imageSrc={article.imageSrc}
              videoSrc={article.videoSrc}
              category={article.category}
              tags={article.tags}
              date={article.date}
              readingTime={article.readingTime}
              title={article.title}
              excerpt={article.excerpt}
              ctaLabel={article.ctaLabel ?? (locale === "fr" ? "Lire l'article" : "Read article")}
              ctaHref={`/${locale}/actualite/${article.slug}`}
            />
          ))}
        </div>
      ) : (
        <p className="font-body text-text-muted py-12 text-center" style={{ fontSize: "16px" }}>
          Aucun article pour ce tag.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <PaginationArrow
            direction="prev"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationPage
              key={p}
              pageNum={p}
              active={p === page}
              onClick={() => handlePageChange(p)}
            />
          ))}
          <PaginationArrow
            direction="next"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          />
        </div>
      )}

      {/* Results count */}
      <p
        className="font-body text-text-muted text-center"
        style={{ fontSize: "12px", lineHeight: "16px" }}
      >
        {filtered.length} article{filtered.length > 1 ? "s" : ""}
        {selectedTag ? ` pour "${selectedTag}"` : ""}
        {" · "}page {page}/{totalPages}
      </p>
    </div>
  );
}

function TagButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={[
        "flex items-center gap-2 px-4 py-[6px] rounded-full transition-colors duration-200 cursor-pointer",
        active
          ? "bg-meta-secondary"
          : "bg-badge-blue-bg hover:bg-badge-blue-bg/80",
      ].join(" ")}
    >
      <span
        className={[
          "size-2 rounded-full shrink-0",
          active
            ? "bg-deep-navy"
            : "bg-badge-blue shadow-[0_0_8px_0_#b8c3ff]",
        ].join(" ")}
      />
      <span
        className={[
          "font-body font-semibold text-[length:var(--text-badge)] tracking-[var(--text-badge--letter-spacing)] uppercase whitespace-nowrap",
          active ? "text-deep-navy" : "text-badge-blue",
        ].join(" ")}
      >
        {label}
      </span>
    </motion.button>
  );
}

function PaginationPage({
  pageNum,
  active,
  onClick,
}: {
  pageNum: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "size-9 rounded-full font-ui font-bold transition-all duration-200 flex items-center justify-center",
        active
          ? "bg-gradient-to-br from-brand-orange-cta-from to-brand-orange-cta-to text-cta-text-dark shadow-[0_0_16px_rgba(255,126,51,0.35)]"
          : "text-text-muted hover:text-text-heading border border-white/10 hover:border-brand-orange/40 bg-dropdown-open/40",
      ].join(" ")}
      style={{ fontSize: "14px" }}
    >
      {pageNum}
    </button>
  );
}

function PaginationArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Page précédente" : "Page suivante"}
      className={[
        "size-9 rounded-full flex items-center justify-center transition-all duration-200 border",
        disabled
          ? "opacity-25 cursor-not-allowed border-white/5 text-text-muted"
          : "border-white/10 text-brand-orange-light hover:border-brand-orange/40 hover:bg-dropdown-open/60",
      ].join(" ")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {direction === "prev" ? (
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
