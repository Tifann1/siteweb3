// ProductCard — Carte produit IA mise en avant (Large Featured Agent)
// Extraite de Figma node 519:4284 / 681:6527
// Figma: border 0.5px white, radius 16px, bg image + gradient overlay gauche→droite
// Content max-width 448px (gauche), image couvre toute la carte (droite)

import Image from "next/image";
import { Link } from "@/navigation";
import { StatTile } from "@/components/ui/StatTile";

export interface ProductStat {
  value: string;
  label: string;
}

export interface ProductCardProps {
  /** Nom du produit (ex: "Collabs") */
  name: string;
  /** Description courte */
  description: string;
  /** Métriques clés (max 3 recommandé) */
  stats: ProductStat[];
  /** URL de l'image de fond (pleine carte, visible côté droit) */
  backgroundImage: string;
  backgroundImageAlt?: string;
  /** Badge optionnel (ex: "Le plus vendu") */
  badge?: string;
  /** Libellé du CTA (défaut : "Lancer l'agent") */
  ctaLabel?: string;
  /** Href du CTA */
  ctaHref?: string;
  /** URL de l'icône produit (64×64, fond card-bg) */
  iconSrc?: string;
}

export function ProductCard({
  name,
  description,
  stats,
  backgroundImage,
  backgroundImageAlt = "",
  badge,
  ctaLabel = "Lancer l'agent",
  ctaHref = "#",
  iconSrc,
}: ProductCardProps) {
  return (
    <div className="relative border border-white/20 rounded-[var(--radius-offer-img)] overflow-hidden p-8 w-full">
      {/* Fond : image + dégradé gauche-droite */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className="object-cover object-right transform-gpu"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
        {/* Dégradé : nav-bg opaque gauche → transparent droite */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(89.88deg, var(--color-nav-bg) 0%, rgba(9,15,66,0.92) 30%, rgba(9,15,66,0.65) 55%, rgba(9,15,66,0.05) 100%)",
          }}
        />
      </div>

      {/* Badge positionné en absolu top-right de la carte entière */}
      {badge && (
        <div className="absolute top-8 right-8 z-10 flex items-center gap-2 px-4 py-[6px] rounded-full bg-nav-bg shrink-0">
          <span
            className="size-2 rounded-full bg-badge-blue shrink-0"
            style={{ boxShadow: "var(--shadow-badge-dot)" }}
          />
          <span
            className="font-body font-semibold text-badge-blue tracking-[1.8px] whitespace-nowrap"
            style={{
              fontSize: "var(--text-badge)",
              lineHeight: "var(--text-badge--letter-spacing)",
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Contenu (relatif, sur le dégradé) */}
      <div className="relative flex flex-col items-start w-full max-w-[448px]">
        {/* Nom du produit */}
        <h3
          className="font-sans font-bold text-white mt-2"
          style={{
            fontSize: "var(--text-card-title)",
            lineHeight: "var(--text-card-title--line-height)",
          }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className="font-sans text-text-body-warm mt-[13px]"
          style={{
            fontSize: "var(--text-nav)",
            lineHeight: "var(--text-nav--line-height)",
          }}
        >
          {description}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mt-12">
          {stats.map((stat) => (
            <StatTile key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="flex items-center gap-3 mt-8 group transition-opacity hover:opacity-80"
        >
          <span
            className="font-sans text-brand-orange-light uppercase"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {ctaLabel}
          </span>
          <ArrowIcon />
        </Link>
      </div>
    </div>
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

function DefaultProductIcon() {
  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 2L2 8l12 6 12-6-12-6zM2 16l12 6 12-6M2 12l12 6 12-6"
        stroke="#FFB692"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
