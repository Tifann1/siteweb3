import Image from "next/image";
import Link from "next/link";

export interface ReferenceCardProps {
  /** Image de couverture du projet */
  imageSrc: string;
  imageAlt?: string;
  /** Logo client affiché en overlay sur l'image */
  logoSrc?: string;
  logoAlt?: string;
  /** Catégorie affichée en badge (ex: "IA & Intelligence Artificielle") */
  category: string;
  /** Titre du projet */
  title: string;
  /** Valeur de la stat mise en avant (ex: "+24%") */
  statValue: string;
  /** Label de la stat (ex: "Productivité logistique globale") */
  statLabel: string;
  /** Label du CTA (défaut : "Découvrir") */
  ctaLabel?: string;
  /** Href du CTA */
  ctaHref?: string;
}

export function ReferenceCard({
  imageSrc,
  imageAlt = "",
  logoSrc,
  logoAlt = "",
  category,
  title,
  statValue,
  statLabel,
  ctaLabel = "Découvrir",
  ctaHref = "#",
}: ReferenceCardProps) {
  return (
    <div className="relative flex flex-col isolate items-start overflow-hidden rounded-[var(--radius-input)] bg-deep-navy w-[384px]">
      {/* Logo client — overlay sur l'image */}
      {logoSrc && (
        <div className="absolute top-[216px] left-[25px] z-10 h-[40px] w-[132px]">
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Image de couverture */}
      <div className="relative h-[256px] w-full shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
        {/* Gradient de fondu vers le bas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #040936 0.2%, rgba(4,9,54,0.2) 50%, rgba(4,9,54,0.2) 100%)",
          }}
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-5 items-start p-8 w-full">
        {/* Badge catégorie */}
        <div className="flex items-center gap-2 pb-4">
          <span className="size-2 rounded-full bg-[#ec8305] shrink-0" />
          <span
            className="font-body font-semibold bg-clip-text text-transparent uppercase whitespace-nowrap"
            style={{
              fontSize: "13px",
              backgroundImage:
                "linear-gradient(to right, #ffb692, #ff7e33)",
            }}
          >
            {category}
          </span>
        </div>

        {/* Titre */}
        <p
          className="font-sans text-white pb-4 w-full"
          style={{ fontSize: "22px", lineHeight: "normal" }}
        >
          {title}
        </p>

        {/* Stat card */}
        <div className="flex flex-col items-start p-[17px] bg-card-bg border border-white/5 rounded-[8px] w-full">
          <span
            className="font-sans font-bold text-white"
            style={{ fontSize: "32px", lineHeight: "32px" }}
          >
            {statValue}
          </span>
          <span
            className="font-body font-normal text-text-light mt-1"
            style={{ fontSize: "13px" }}
          >
            {statLabel}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="flex items-center gap-2 group"
        >
          <span
            className="font-body font-semibold bg-clip-text text-transparent uppercase tracking-[1.4px]"
            style={{
              fontSize: "14px",
              backgroundImage: "linear-gradient(to right, #ffb692, #ff7e33)",
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
