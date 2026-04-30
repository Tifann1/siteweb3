
export interface OfferLabItem {
  title: string;
  tags: string[];
  status: "done" | "active" | "soon";
  cat: "cyber" | "infra" | "devops";
}

export interface OfferArticleItem {
  title: string;
  category: string;
  href: string;
}

export interface OfferCardProps {
  /** Titre de l'offre */
  title: string;
  /** Si true, la carte prend toute la largeur de son conteneur (mode grille) */
  fluid?: boolean;
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
  /** Tags de profils qui font ces missions */
  profiles?: string[];
  /** Badge optionnel en haut à droite du header (ex: "meilleure vente") */
  badge?: string;
  /** Items Lab liés à cette offre */
  labItems?: OfferLabItem[];
  /** Actualités liées à cette offre */
  articles?: OfferArticleItem[];
  /** Références clients */
  clientRefs?: string[];
}

export function OfferCard({
  title,
  accentColor,
  headerGradient,
  features,
  profiles,
  badge,
  fluid = false,
}: OfferCardProps) {
  return (
    <div className={[
      "flex flex-col gap-6 lg:gap-8 items-start px-6 lg:px-8 py-6 lg:py-[33px] rounded-[var(--radius-offer-card)] bg-card-bg border border-white/10",
      fluid
        ? "w-full h-auto"
        : "h-[500px] lg:h-[570px] xl:h-[620px] 2xl:h-[660px] shrink-0 w-[340px] lg:w-[420px] xl:w-[480px] 2xl:w-[534px]",
    ].join(" ")}>
      {/* Header image avec gradient */}
      <div
        className="flex flex-col h-[190px] lg:h-[240px] xl:h-[260px] 2xl:h-[283px] items-start justify-between p-5 rounded-[var(--radius-offer-img)] w-full"
        style={{ background: headerGradient }}
      >
        {/* Badge optionnel */}
        <div className="flex items-center justify-end w-full h-7">
          {badge && (
            <div className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-deep-navy/80">
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

      {/* Features + footer */}
      <div className="flex flex-1 flex-col justify-between w-full min-h-0">
        {/* Liste de features */}
        <ul className="flex flex-col gap-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircleIcon accentColor={accentColor} />
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

        {/* Tags profils */}
        {profiles && profiles.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-body text-white/30 uppercase tracking-widest" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
              Profils
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profiles.map((p) => (
                <span
                  key={p}
                  className="font-body px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: 11,
                    color: accentColor,
                    background: `${accentColor}14`,
                    border: `1px solid ${accentColor}35`,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckCircleIcon({ accentColor }: { accentColor: string }) {
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
      <circle cx="10" cy="10" r="9" stroke={accentColor} strokeOpacity="0.5" strokeWidth="1.2" />
      <path
        d="M6.5 10L9 12.5L13.5 7.5"
        stroke={accentColor}
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
