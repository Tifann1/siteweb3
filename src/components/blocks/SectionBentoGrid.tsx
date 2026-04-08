// SectionBentoGrid — node 448:4201
// Figma: bg #040936, px 32px, pt 120px
// Grid: 4 cols × 2 rows, gap 24px, h 600px
// Feature card (col 1-2, row 1-2) + wide card (col 3-4, row 1) + 2 bottom cards

interface FeatureCardData {
  image: string;
  imageAlt?: string;
  title: string;
  description: string;
}

export interface BentoCardData {
  title: string;
  description: string;
  /** "highlight" = gradient orange + border brand-orange-light */
  variant?: "default" | "highlight";
}

interface SectionBentoGridProps {
  title?: string;
  featureCard: FeatureCardData;
  wideCard: BentoCardData;
  bottomCards: [BentoCardData, BentoCardData];
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export function SectionBentoGrid({
  title = "Agents IA & aide à la décision",
  featureCard,
  wideCard,
  bottomCards,
  ctaLabel = "Je réserve un rendez-vous avec un expert.",
  onCtaClick,
}: SectionBentoGridProps) {
  return (
    <section className="bg-deep-navy w-full px-8 pt-[120px] pb-16 flex flex-col gap-[48px] items-center">
      {/* Section title */}
      <h2
        className="font-sans font-bold text-white text-center"
        style={{
          fontSize: "var(--text-card-title)",
          lineHeight: "var(--text-card-title--line-height)",
        }}
      >
        {title}
      </h2>

      {/* Bento grid — 4 cols, 2 rows, explicit placement */}
      <div className="grid grid-cols-4 grid-rows-2 gap-6 h-[600px] w-full">
        {/* Feature card — col 1-2, row 1-2 */}
        <div
          className="col-start-1 col-span-2 row-start-1 row-span-2 relative rounded-[var(--radius-card)] overflow-hidden bg-card-bg flex flex-col"
        >
          {/* Background image — 40% opacity */}
          <img
            src={featureCard.image}
            alt={featureCard.imageAlt ?? ""}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          {/* Gradient overlay — dark orange bottom → transparent top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--color-conseil-orange), rgba(15,18,34,0) 50%)",
            }}
          />
          {/* Content */}
          <div className="relative mt-auto p-10 flex flex-col gap-0">
            <h3
              className="font-sans font-bold text-white pb-4"
              style={{
                fontSize: "var(--text-stat-value)",
                lineHeight: "var(--text-card-title--line-height)",
              }}
            >
              {featureCard.title}
            </h3>
            <p
              className="font-sans text-text-heading max-w-[448px]"
              style={{
                fontSize: "var(--text-nav)",
                lineHeight: "var(--text-nav--line-height)",
              }}
            >
              {featureCard.description}
            </p>
          </div>
        </div>

        {/* Wide card — col 3-4, row 1 */}
        <div className="col-start-3 col-span-2 row-start-1 rounded-[var(--radius-card)] bg-card-bg border border-[rgba(88,66,56,0.1)] p-[41px] flex flex-col justify-center gap-[30px]">
          <h3
            className="font-sans text-text-heading"
            style={{ fontSize: "var(--text-tab)" }}
          >
            {wideCard.title}
          </h3>
          <p
            className="font-sans text-text-heading"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {wideCard.description}
          </p>
        </div>

        {/* Bottom cards — col 3 and col 4, row 2 */}
        {bottomCards.map((card, i) => (
          <BentoCard key={i} {...card} />
        ))}
      </div>

      {/* CTA button */}
      {ctaLabel && (
        <button
          onClick={onCtaClick}
          className="flex items-center gap-3 h-10 w-[559px] rounded-[var(--radius-input)] border-[0.5px] border-secondary-400 px-[14px] mt-[50px]"
          style={{
            background:
              "linear-gradient(to right, rgba(255,182,146,0.17), var(--color-cta-orange-deep))",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M5 12h14M15 8l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            />
          </svg>
          <span
            className="font-body font-semibold text-white"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            {ctaLabel}
          </span>
        </button>
      )}
    </section>
  );
}

function BentoCard({ title, description, variant = "default" }: BentoCardData) {
  if (variant === "highlight") {
    return (
      <div
        className="rounded-[var(--radius-card)] border border-brand-orange-light flex flex-col gap-[50px] px-[33px] py-[51px]"
        style={{
          background:
            "linear-gradient(132.86deg, rgba(255,126,62,0.1) 0%, #1c1f2f 100%)",
        }}
      >
        <h3
          className="font-sans text-white"
          style={{ fontSize: "var(--text-tab)" }}
        >
          {title}
        </h3>
        <p
          className="font-sans text-text-heading"
          style={{
            fontSize: "var(--text-nav)",
            lineHeight: "var(--text-nav--line-height)",
          }}
        >
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-card-bg border border-[rgba(88,66,56,0.1)] flex flex-col justify-between px-[33px] py-[51px]">
      <h3
        className="font-sans text-white"
        style={{ fontSize: "var(--text-tab)" }}
      >
        {title}
      </h3>
      <p
        className="font-sans text-text-heading"
        style={{
          fontSize: "var(--text-nav)",
          lineHeight: "var(--text-nav--line-height)",
        }}
      >
        {description}
      </p>
    </div>
  );
}
