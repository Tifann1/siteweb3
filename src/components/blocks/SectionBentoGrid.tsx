// SectionBentoGrid — node 448:4201
// Figma: bg deep-navy, px 32px, pt 120px
// Grid: 4 cols × 2 rows, gap 24px, h 600px
// Feature card (col 1-2, row 1-2) + wide card (col 3-4, row 1) + 2 bottom cards

interface FeatureCardData {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface BentoCardData {
  title: string;
  description: string;
  /**
   * "highlight" = gradient orange + border orange (Conseil)
   * "highlight-blue" = gradient bleu + border blue (Développement, node 533:5378)
   * "highlight-yellow" = gradient jaune + border yellow (DevOps, node 533:5649)
   */
  variant?: "default" | "highlight" | "highlight-blue" | "highlight-yellow";
}

interface SectionBentoGridProps {
  title?: string;
  featureCard: FeatureCardData;
  wideCard: BentoCardData;
  bottomCards: [BentoCardData, BentoCardData];
  ctaLabel?: string;
  onCtaClick?: () => void;
  /**
   * Couleur "from" du gradient overlay de la feature card.
   * Défaut : --color-conseil-orange (orange foncé, Conseil)
   * Ex: "--color-feature-devops-from" pour DevOps
   */
  featureCardGradientFrom?: string;
  /**
   * Variante de couleur du bouton CTA.
   * - "default" : gradient orange (Conseil)
   * - "blue" : gradient bleu (Développement)
   * - "yellow" : gradient jaune (DevOps)
   */
  ctaVariant?: "default" | "blue" | "yellow";
}

export function SectionBentoGrid({
  title = "Agents IA & aide à la décision",
  featureCard,
  wideCard,
  bottomCards,
  ctaLabel = "Je réserve un rendez-vous avec un expert.",
  onCtaClick,
  featureCardGradientFrom = "var(--color-conseil-orange)",
  ctaVariant = "default",
}: SectionBentoGridProps) {
  return (
    <section className="bg-deep-navy w-full px-8 py-16 md:py-24 flex flex-col gap-[48px] items-center">
      <h2
        className="font-sans font-bold text-white text-center"
        style={{
          fontSize: "var(--text-card-title)",
          lineHeight: "var(--text-card-title--line-height)",
        }}
      >
        {title}
      </h2>

      <div className="grid grid-cols-4 grid-rows-2 gap-6 h-[600px] w-full">
        {/* Feature card — col 1-2, row 1-2 */}
        <div className="col-start-1 col-span-2 row-start-1 row-span-2 relative rounded-[var(--radius-card)] overflow-hidden bg-card-bg flex flex-col">
          <img
            src={featureCard.image}
            alt={featureCard.imageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${featureCardGradientFrom}, rgba(15,18,34,0) 50%)`,
            }}
          />
          <div className="relative mt-auto p-10 flex flex-col">
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
        <div className="col-start-3 col-span-2 row-start-1 rounded-[var(--radius-card)] bg-card-bg border border-card-border p-[41px] flex flex-col justify-center gap-[30px]">
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

      {ctaLabel && (
        <button
          type="button"
          onClick={onCtaClick}
          className="flex items-center gap-3 h-10 w-[559px] rounded-[var(--radius-input)] border-[0.5px] px-[14px] mt-[50px] text-white"
          style={
            ctaVariant === "yellow"
              ? {
                  background: "linear-gradient(to right, var(--color-cta-devops-from), var(--color-cta-devops-to))",
                  borderColor: "var(--color-bento-devops-border)",
                }
              : ctaVariant === "blue"
              ? {
                  background: "linear-gradient(to right, var(--color-cta-gradient-start), var(--color-tab-active-dev))",
                  borderColor: "var(--color-bento-dev-border)",
                }
              : {
                  background: "linear-gradient(to right, var(--color-cta-gradient-start), var(--color-cta-orange-deep))",
                  borderColor: "var(--color-secondary-400)",
                }
          }
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
            />
          </svg>
          <span
            className="font-body font-semibold"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
              textShadow: "var(--shadow-cta)",
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
  const isHighlight = variant === "highlight";
  const isHighlightBlue = variant === "highlight-blue";
  const isHighlightYellow = variant === "highlight-yellow";
  const isAccent = isHighlight || isHighlightBlue || isHighlightYellow;

  const borderClass = isHighlight
    ? "border-brand-orange-light"
    : isHighlightBlue
    ? "border-[color:var(--color-bento-dev-border)]"
    : isHighlightYellow
    ? "border-[color:var(--color-bento-devops-border)]"
    : "border-card-border";

  const bgStyle = isHighlight
    ? { background: "linear-gradient(132.86deg, rgba(255,126,62,0.1) 0%, var(--color-bento-highlight-end) 100%)" }
    : isHighlightBlue
    ? { background: "linear-gradient(132.86deg, var(--color-bento-dev-gradient-start) 0%, var(--color-bento-dev-end) 100%)" }
    : isHighlightYellow
    ? { background: "linear-gradient(132.86deg, var(--color-bento-devops-gradient-start) 0%, var(--color-bento-dev-end) 100%)" }
    : undefined;

  return (
    <div
      className={[
        "rounded-[var(--radius-card)] border flex flex-col gap-[50px] px-[33px] py-[51px]",
        !isAccent && "bg-card-bg",
        borderClass,
      ].filter(Boolean).join(" ")}
      style={bgStyle}
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
