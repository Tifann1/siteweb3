// SectionNosSucces — node 517:3197
// Figma: bg #040936, padding 32px horizontal / 130px top
// Cards: 2 colonnes, gap 30px — image 256px h, radius 24px
// Stat cards: gradient from #433d7a, border rgba(255,255,255,0.05)

interface Stat {
  value: string;
  label: string;
}

export interface ReferenceSuccesCard {
  image: string;
  imageAlt: string;
  logo?: string;
  logoAlt?: string;
  sector: string;
  title: string;
  stats: [Stat, Stat];
}

interface SectionNosSuccesProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  cards: ReferenceSuccesCard[];
}

export function SectionNosSucces({
  title = "Nos Succès",
  subtitle = "L'IA concrète au service de nos partenaires.",
  ctaLabel = "Voir tous les cas clients",
  onCtaClick,
  cards,
}: SectionNosSuccesProps) {
  return (
    <section className="bg-deep-navy w-full px-8 pt-[130px] pb-16">
      {/* Header row */}
      <div className="flex items-end justify-between mb-10">
        <div className="flex flex-col gap-4 max-w-[332px]">
          <h2
            className="font-sans font-bold text-white"
            style={{
              fontSize: "var(--text-card-title)",
              lineHeight: "var(--text-card-title--line-height)",
            }}
          >
            {title}
          </h2>
          <p
            className="font-sans text-text-muted"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {subtitle}
          </p>
        </div>

        {ctaLabel && (
          <button
            type="button"
            onClick={onCtaClick}
            className="flex items-center gap-2 text-brand-orange-light font-sans transition-opacity hover:opacity-80"
            style={{ fontSize: "var(--text-tab)" }}
          >
            {ctaLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Cards grid */}
      <div className="flex gap-[30px]">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col flex-1 min-w-0">
            {/* Image card — h 256px, radius 24px */}
            <div
              className="relative h-64 overflow-hidden shrink-0"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <img
                src={card.image}
                alt={card.imageAlt}
                className="h-full w-full object-cover"
              />

              {/* Gradient overlay — opacity 80% */}
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(9,15,66,0.4), var(--color-nav-bg))",
                }}
              />

              {/* Client logo */}
              {card.logo && (
                <div className="absolute top-6 left-6 h-10 w-[132px]">
                  <img
                    src={card.logo}
                    alt={card.logoAlt ?? "Logo client"}
                    className="h-full w-full object-contain object-left"
                  />
                </div>
              )}

              {/* Sector badge + title */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <span
                  className="self-start rounded-full bg-brand-orange px-3 py-1 font-body font-semibold uppercase text-cta-text-dark"
                  style={{
                    fontSize: "var(--text-sector-badge)",
                    letterSpacing: "var(--text-sector-badge--letter-spacing)",
                    lineHeight: 1.5,
                  }}
                >
                  {card.sector}
                </span>
                <p
                  className="font-sans text-white"
                  style={{ fontSize: "var(--text-tab)" }}
                >
                  {card.title}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-[10px]">
              {card.stats.map((stat, j) => (
                <div
                  key={j}
                  className="flex-1 flex flex-col rounded-lg border border-white/5 px-[17px] pt-[31px] pb-[17px]"
                  style={{
                    background:
                      "linear-gradient(to top, var(--color-stat-card-purple), rgba(12,16,39,0.1) 73.558%, rgba(15,18,34,0))",
                  }}
                >
                  <p
                    className="font-sans font-bold text-white"
                    style={{
                      fontSize: "var(--text-stat-value)",
                      lineHeight: "var(--text-stat-value--line-height)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-sans text-text-light mt-1"
                    style={{
                      fontSize: "var(--text-label)",
                      lineHeight: "var(--text-label--line-height)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
