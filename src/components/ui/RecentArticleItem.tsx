// RecentArticleItem — Item article sidebar "Récents"
// Figma node I517:3693;427:2475
// Thumbnail 96×96 N&B + catégorie (badge-blue) + titre (Manrope Bold 14px)

import Image from "next/image";

export interface RecentArticleItemProps {
  /** URL de la miniature */
  imageSrc?: string;
  imageAlt?: string;
  /** Catégorie courte (ex: "IoT", "Data", "Produit") */
  category: string;
  /** Titre de l'article */
  title: string;
  /** Lien vers l'article */
  href?: string;
  target?: string;
}

export function RecentArticleItem({
  imageSrc,
  imageAlt = "",
  category,
  title,
  href = "#",
  target,
}: RecentArticleItemProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="flex gap-4 items-start w-full group transition-opacity hover:opacity-80"
    >
      {/* Miniature N&B */}
      <div className="relative bg-thumbnail-bg rounded-[8px] size-24 shrink-0 overflow-hidden">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Textes */}
      <div className="flex flex-col gap-1 items-start">
        <span
          className="font-body font-semibold text-badge-blue uppercase tracking-[0.5px]"
          style={{ fontSize: "10px", lineHeight: "15px" }}
        >
          {category}
        </span>
        <p
          className="font-ui font-bold text-text-heading"
          style={{ fontSize: "14px", lineHeight: "19.25px" }}
        >
          {title}
        </p>
      </div>
    </a>
  );
}
