// ProductShowcase — Carte image produit avec contenu aligné à droite
// Figma node 635:3967 (References card)
// Image pleine carte à gauche, gradient nav-bg sur la droite, contenu texte + CTA à droite

import Image from "next/image";

export interface ProductShowcaseProps {
  /** URL de l'image de fond (visible côté gauche) */
  imageSrc: string;
  imageAlt?: string;
  /** Question ou titre affiché dans la carte (ex: "A quoi ça sert ?") */
  title: string;
  /** Corps de texte descriptif */
  description: string;
  /** Libellé du bouton CTA */
  ctaLabel?: string;
  /** Href du bouton CTA */
  ctaHref?: string;
}

export function ProductShowcase({
  imageSrc,
  imageAlt = "",
  title,
  description,
  ctaLabel = "Je suis intéressé(e)",
  ctaHref = "#",
}: ProductShowcaseProps) {
  return (
    <div className="relative border-[0.5px] border-white rounded-[18px] overflow-hidden h-[394px] w-full flex items-center justify-end px-20">
      {/* Fond : image + dégradé droite vers gauche */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-left"
          />
        </div>
        {/* Gradient : transparent à gauche (image visible) → nav-bg à droite (contenu lisible) */}
        <div
          className="absolute inset-0 rounded-[18px]"
          style={{
            background:
              "linear-gradient(to left, var(--color-nav-bg) 12.859%, rgba(9,15,66,0.7) 45.72%, rgba(9,15,66,0.05) 99.061%)",
          }}
        />
      </div>

      {/* Contenu (colonne droite) */}
      <div className="relative flex flex-col gap-4 items-end justify-center px-10 w-[480px] shrink-0">
        {/* Titre */}
        <div className="flex items-center justify-end w-full">
          <h3
            className="font-sans font-semibold text-white text-right whitespace-nowrap"
            style={{
              fontSize: "var(--text-card-title)",
              lineHeight: "var(--text-card-title--line-height)",
            }}
          >
            {title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="font-sans text-white/90 text-right w-full"
          style={{
            fontSize: "var(--text-nav)",
            lineHeight: "var(--text-nav--line-height)",
          }}
        >
          {description}
        </p>

        {/* CTA */}
        <a
          href={ctaHref}
          className="flex items-center gap-[10px] px-[17px] py-[5px] border border-white rounded-[var(--radius-pill-sm)] shadow-[var(--shadow-cta)] transition-opacity hover:opacity-80 shrink-0"
        >
          <span
            className="font-sans text-white"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {ctaLabel}
          </span>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10h12M13 7l3 3-3 3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
