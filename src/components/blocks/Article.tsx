// Article — Carte article pour grille listing actualités
// Image N&B (16/9) + badge catégorie + date + titre + extrait + CTA arrow

import Image from "next/image";

export interface ArticleProps {
  imageSrc: string;
  imageAlt?: string;
  /** Catégorie (ex: "Engineering", "IoT") */
  category: string;
  /** Date formatée (ex: "12 Mai 2024") */
  date: string;
  /** Temps de lecture en minutes */
  readingTime?: number;
  /** Titre de l'article */
  title: string;
  /** Résumé court, affiché sur 2 lignes max */
  excerpt?: string;
  /** Libellé du lien CTA */
  ctaLabel?: string;
  ctaHref?: string;
}

export function Article({
  imageSrc,
  imageAlt = "",
  category,
  date,
  readingTime,
  title,
  excerpt,
  ctaLabel = "Lire l'article",
  ctaHref = "#",
}: ArticleProps) {
  return (
    <article className="flex flex-col gap-4 items-start group">
      {/* Image + badge catégorie */}
      <div className="relative bg-article-img-bg rounded-[12px] overflow-hidden w-full aspect-video">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover [filter:grayscale(1)] transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay mix-blend-saturation (renforce le N&B) */}
        <div className="absolute inset-0 bg-white mix-blend-saturation pointer-events-none" />
        {/* Badge catégorie */}
        <div className="absolute top-4 left-4 px-3 py-[2.5px] rounded-full bg-brand-orange">
          <span
            className="font-body font-semibold text-cta-text-dark uppercase tracking-[0.5px]"
            style={{ fontSize: "10px", lineHeight: "15px" }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Date + temps de lecture */}
      <div className="flex items-center gap-3">
        <span
          className="font-body font-normal text-text-muted uppercase tracking-[1.2px]"
          style={{ fontSize: "11px", lineHeight: "16px" }}
        >
          {date}
        </span>
        {readingTime && (
          <>
            <span className="size-1 rounded-full bg-dropdown-open shrink-0" />
            <span
              className="font-body font-normal text-text-muted uppercase tracking-[1.2px]"
              style={{ fontSize: "11px", lineHeight: "16px" }}
            >
              {readingTime} min
            </span>
          </>
        )}
      </div>

      {/* Titre */}
      <h3
        className="font-ui font-bold text-text-heading"
        style={{ fontSize: "20px", lineHeight: "27.5px" }}
      >
        {title}
      </h3>

      {/* Extrait */}
      {excerpt && (
        <p
          className="font-body font-normal text-text-body-warm line-clamp-2"
          style={{
            fontSize: "var(--text-body-lg)",
            lineHeight: "var(--text-body-lg--line-height)",
          }}
        >
          {excerpt}
        </p>
      )}

      {/* CTA */}
      <a
        href={ctaHref}
        className="flex items-center gap-2 pt-1 transition-opacity hover:opacity-80"
      >
        <span
          className="font-ui font-bold text-brand-orange-light uppercase"
          style={{ fontSize: "13px", lineHeight: "18px" }}
        >
          {ctaLabel}
        </span>
        <ArticleArrowIcon />
      </a>
    </article>
  );
}

function ArticleArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M10 5l3 3-3 3"
        stroke="#FFB692"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
