import { Link } from "@/navigation";

export interface OfferCardProps {
  /** Titre de l'offre */
  title: string;
  /** Couleur principale de la carte (bouton CTA + gradient image) */
  accentColor: string;
  /** Dégradé CSS pour le fond du header image */
  headerGradient: string;
  /** Label du bouton principal */
  ctaLabel: string;
  /** Href du bouton principal */
  ctaHref?: string;
  /** Features listées sous le CTA */
  features: string[];
  /** Label du bouton secondaire "Découvrir" */
  discoverLabel?: string;
  /** Href du bouton secondaire */
  discoverHref?: string;
  /** Badge optionnel en haut à droite du header (ex: "meilleure vente") */
  badge?: string;
}

export function OfferCard({
  title,
  accentColor,
  headerGradient,
  ctaLabel,
  ctaHref = "#",
  features,
  discoverLabel = "Découvrir le pôle",
  discoverHref = "#",
  badge,
}: OfferCardProps) {
  return (
    <div className="flex flex-col gap-8 h-[660px] items-start px-8 py-[33px] rounded-[var(--radius-offer-card)] bg-card-bg border border-white/10 shrink-0 w-[534px]">
      {/* Header image avec gradient */}
      <div
        className="flex flex-col h-[283px] items-start justify-between p-5 rounded-[var(--radius-offer-img)] w-full"
        style={{ background: headerGradient }}
      >
        {/* Badge optionnel */}
        <div className="flex items-center justify-end w-full h-7">
          {badge && (
            <div className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-[rgba(4,9,54,0.8)]">
              <span
                className="size-2 rounded-full bg-beige-badge shrink-0"
                style={{ boxShadow: "var(--shadow-badge-dot)" }}
              />
              <span className="font-body font-semibold text-beige-badge text-[length:var(--text-badge)] tracking-[1.8px] uppercase whitespace-nowrap">
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* Titre */}
        <h3
          className="font-sans font-bold text-white w-full"
          style={{
            fontSize: "var(--text-card-title)",
            lineHeight: "var(--text-card-title--line-height)",
          }}
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
        />
      </div>

      {/* Bouton CTA principal */}
      <Link
        href={ctaHref}
        className="flex items-center justify-center w-full py-[9px] rounded-[var(--radius-offer-btn)] font-sans text-[length:var(--text-tab)] text-white text-center transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {ctaLabel}
      </Link>

      {/* Features + footer */}
      <div className="flex flex-1 flex-col justify-between w-full min-h-0">
        {/* Liste de features */}
        <ul className="flex flex-col gap-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircleIcon />
              <span className="font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-white/90 whitespace-nowrap">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div
          className="w-full"
          style={{ height: "1px", backgroundColor: "var(--color-divider)", opacity: 0.3 }}
          role="separator"
        />

        {/* Bouton secondaire Découvrir */}
        <div className="flex items-center justify-end">
          <Link
            href={discoverHref}
            className="flex items-center gap-[10px] px-[17px] py-[5px] rounded-[var(--radius-pill-sm)] border border-white font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-white shadow-[var(--shadow-cta)] hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            {discoverLabel}
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
      <path
        d="M6.5 10L9 12.5L13.5 7.5"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
