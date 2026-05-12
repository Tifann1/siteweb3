// ArticleCard — Article mis en avant (Large Article)
// Figma node I517:3693;427:2451
// Image en N&B (mix-blend-saturation) + badge catégorie + métadonnées + titre + extrait + CTA

import Image from "next/image";

export interface ArticleCardProps {
  /** URL image de couverture */
  imageSrc?: string;
  /** URL vidéo de couverture (prioritaire sur imageSrc) */
  videoSrc?: string;
  imageAlt?: string;
  /** Catégorie (ex: "Engineering") */
  category: string;
  /** Date formatée (ex: "12 Mai 2024") */
  date: string;
  /** Temps de lecture en minutes */
  readingTime?: number;
  /** Titre de l'article */
  title: string;
  /** Extrait / sous-titre */
  excerpt: string;
  /** Libellé CTA (défaut: "Lire plus") */
  ctaLabel?: string;
  ctaHref?: string;
  ctaTarget?: string;
}

export function ArticleCard({
  imageSrc,
  videoSrc,
  imageAlt = "",
  category,
  date,
  readingTime,
  title,
  excerpt,
  ctaLabel = "Lire plus",
  ctaHref = "#",
  ctaTarget,
}: ArticleCardProps) {
  return (
    <article className="flex flex-col gap-6 items-start">
      {/* Media + badge catégorie */}
      <div className="relative bg-article-img-bg rounded-[12px] overflow-hidden w-full h-[450px] shrink-0">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        ) : null}
        {/* Badge catégorie */}
        <div className="absolute top-[21px] left-6 flex items-center gap-2 px-4 py-[6px] rounded-full bg-meta-secondary">
          <span className="size-2 rounded-full shrink-0 bg-deep-navy" />
          <span className="font-body font-semibold text-[length:var(--text-badge)] tracking-[var(--text-badge--letter-spacing)] uppercase whitespace-nowrap text-deep-navy">
            {category}
          </span>
        </div>
      </div>

      {/* Métadonnées + titre + extrait + CTA */}
      <div className="flex flex-col gap-4 items-start w-full">
        {/* Date + séparateur + temps de lecture */}
        <div className="flex items-center gap-4">
          <span
            className="font-body font-normal text-text-muted uppercase tracking-[1.2px]"
            style={{ fontSize: "12px", lineHeight: "16px" }}
          >
            {date}
          </span>
          {readingTime && (
            <>
              <span className="size-1 rounded-full bg-dropdown-open shrink-0" />
              <span
                className="font-body font-normal text-text-muted uppercase tracking-[1.2px]"
                style={{ fontSize: "12px", lineHeight: "16px" }}
              >
                {readingTime} min de lecture
              </span>
            </>
          )}
        </div>

        {/* Titre */}
        <h2
          className="font-ui font-bold text-text-heading w-full"
          style={{
            fontSize: "var(--text-article-title)",
            lineHeight: "var(--text-article-title--line-height)",
          }}
        >
          {title}
        </h2>

        {/* Extrait */}
        <p
          className="font-body font-normal text-text-body-warm max-w-[672px]"
          style={{
            fontSize: "var(--text-body-lg)",
            lineHeight: "var(--text-body-lg--line-height)",
          }}
        >
          {excerpt}
        </p>

        {/* CTA */}
        <a
          href={ctaHref}
          target={ctaTarget}
          rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
          className="flex items-center gap-2 pt-2 group transition-opacity hover:opacity-80"
        >
          <span
            className="font-ui font-bold text-brand-orange-light uppercase"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            {ctaLabel}
          </span>
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
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
