import Image from "next/image";

export interface StatItem {
  value: string;
  label: string;
  /** Si true, la valeur s'affiche en orange */
  highlight?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ReferenceBentoProps {
  /** Portrait de l'expert */
  expertImageSrc: string;
  expertImageAlt?: string;
  expertName: string;
  expertRole: string;
  expertBio: string;
  /** Carte "Une plateforme métier augmentée" */
  featureCardTitle: string;
  featureItems: FeatureItem[];
  /** Carte "Professional Ethos" */
  ethosTitle: string;
  ethosDescription: string;
  /** 3 stats en ligne */
  stats: StatItem[];
  /** Ligne brand */
  brandLogoSrc?: string;
  brandLogoAlt?: string;
  brandName: string;
  brandSubtitle: string;
  brandCtaLabel?: string;
  brandCtaHref?: string;
}

export function ReferenceBento({
  expertImageSrc,
  expertImageAlt = "",
  expertName,
  expertRole,
  expertBio,
  featureCardTitle,
  featureItems,
  ethosTitle,
  ethosDescription,
  stats,
  brandLogoSrc,
  brandLogoAlt = "",
  brandName,
  brandSubtitle,
  brandCtaLabel = "Voir le portfolio",
  brandCtaHref,
}: ReferenceBentoProps) {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {/* ── Col 1 : Expert portrait (spans 3 rows) ── */}
      <div className="col-start-1 row-start-1 row-span-3 flex flex-col gap-3 items-center justify-center">
        <div className="relative w-full h-[337px] rounded-[6px] overflow-hidden">
          <Image
            src={expertImageSrc}
            alt={expertImageAlt}
            fill
            className="object-cover"
          />
        </div>
        <p
          className="font-sans text-text-heading text-center"
          style={{ fontSize: "22px" }}
        >
          {expertName}
        </p>
        <p
          className="font-sans font-semibold text-brand-orange-light uppercase text-center tracking-wider"
          style={{ fontSize: "13px" }}
        >
          {expertRole}
        </p>
        <p
          className="font-body font-normal text-[#94a3b8] text-center px-4"
          style={{ fontSize: "16px", lineHeight: "20px" }}
        >
          {expertBio}
        </p>
      </div>

      {/* ── Col 2 : Feature card ── */}
      <div className="col-start-2 row-start-1 flex flex-col gap-[30px] items-start justify-center p-[34px] bg-deep-navy border border-white/5 rounded-[var(--radius-input)]">
        <h3
          className="font-sans text-white"
          style={{ fontSize: "22px" }}
        >
          {featureCardTitle}
        </h3>
        <div className="flex flex-col gap-4 w-full">
          {featureItems.map((item, i) => (
            <div key={i} className="flex flex-col items-start">
              <span
                className="font-sans text-brand-orange-light"
                style={{ fontSize: "16px", lineHeight: "20px" }}
              >
                {item.title}
              </span>
              <span
                className="font-body font-normal text-text-light"
                style={{ fontSize: "13px" }}
              >
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Col 3 : Ethos card ── */}
      <div className="col-start-3 row-start-1 flex flex-col gap-4 items-start p-8 bg-deep-navy border border-white/5 rounded-[var(--radius-input)]">
        {/* Icône placeholder */}
        <div className="flex items-center justify-center size-12 rounded-[8px] bg-[rgba(255,182,146,0.1)]">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="18" height="16" rx="2" stroke="#FFB692" strokeWidth="1.5" />
            <path d="M5 6h10M5 10h6" stroke="#FFB692" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="font-sans text-white" style={{ fontSize: "22px" }}>
          {ethosTitle}
        </h3>
        <p
          className="font-body font-normal text-[#94a3b8]"
          style={{ fontSize: "14px", lineHeight: "22.75px" }}
        >
          {ethosDescription}
        </p>
      </div>

      {/* ── Stats row : cols 2-3 ── */}
      <div className="col-start-2 col-span-2 row-start-2 grid grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 items-center p-[25px] bg-card-bg border border-white/5 rounded-[var(--radius-input)]"
          >
            <span
              className={[
                "font-sans text-center",
                stat.highlight ? "text-brand-orange-light" : "text-white",
              ].join(" ")}
              style={{ fontSize: "30px", lineHeight: "36px" }}
            >
              {stat.value}
            </span>
            <span
              className="font-body font-normal text-[#64748b] uppercase tracking-[1px] text-center"
              style={{ fontSize: "10px" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Brand row : cols 2-3 ── */}
      <div className="col-start-2 col-span-2 row-start-3 flex items-center justify-between px-8 py-[33px] bg-deep-navy border-t border-white/10 rounded-[var(--radius-input)]">
        <div className="flex items-center gap-6">
          {brandLogoSrc && (
            <div className="relative size-12 shrink-0">
              <Image src={brandLogoSrc} alt={brandLogoAlt} fill className="object-contain" />
            </div>
          )}
          <div className="flex flex-col">
            <span
              className="font-sans font-bold text-white"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              {brandName}
            </span>
            <span
              className="font-body font-normal text-[#64748b]"
              style={{ fontSize: "12px" }}
            >
              {brandSubtitle}
            </span>
          </div>
        </div>
        {brandCtaLabel && (
          <a
            href={brandCtaHref ?? "#"}
            className="font-body font-semibold text-brand-orange-light uppercase tracking-[1.2px] text-[12px] hover:opacity-80 transition-opacity"
          >
            {brandCtaLabel} ↗
          </a>
        )}
      </div>
    </div>
  );
}
