"use client";

// SectionBentoGrid — node 448:4201
import { Link } from "@/navigation";
import { motion, MotionConfig } from "framer-motion";
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
  ctaHref?: string;
  onCtaClick?: () => void;
  /**
   * Couleur "from" du gradient overlay de la feature card.
   * Défaut : --color-conseil-orange (orange foncé, Conseil)
   * Ex: "--color-tab-active-dev" pour Développement (bleu)
   * Ex: "--color-feature-devops-from" pour DevOps (jaune-olive)
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

const cardTransition = { type: "spring" as const, stiffness: 300, damping: 25 };
const cardHover = { scale: 1.03, zIndex: 10 };

export function SectionBentoGrid({
  title = "Agents IA & aide à la décision",
  featureCard,
  wideCard,
  bottomCards,
  ctaLabel = "Réserver un rendez-vous avec un expert",
  ctaHref = "/contact",
  onCtaClick,
  featureCardGradientFrom = "var(--color-conseil-orange)",
  ctaVariant = "default",
}: SectionBentoGridProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="bg-deep-navy w-full py-16 md:py-24 flex flex-col gap-[48px] items-center"
        style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
      >
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
          <motion.div
            className="col-start-1 col-span-2 row-start-1 row-span-2 relative rounded-[var(--radius-card)] overflow-hidden bg-card-bg flex flex-col cursor-default"
            style={{
              zIndex: 1,
              boxShadow: "0 12px 40px rgba(0,0,0,0.55), 0 3px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            whileHover={cardHover}
            transition={cardTransition}
          >
            <img
              src={featureCard.image}
              alt={featureCard.imageAlt}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            {/* Gradient photo couleur du pôle */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${featureCardGradientFrom} 0%, rgba(15,18,34,0.3) 60%, rgba(15,18,34,0) 100%)`,
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
          </motion.div>

          {/* Wide card — col 3-4, row 1 */}
          <motion.div
            className="col-start-3 col-span-2 row-start-1 relative rounded-[var(--radius-card)] bg-card-bg border border-card-border p-[41px] flex flex-col justify-center gap-[30px] cursor-default"
            style={{
              zIndex: 1,
              boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            whileHover={cardHover}
            transition={cardTransition}
          >
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
          </motion.div>

          {/* Bottom cards — col 3 and col 4, row 2 */}
          {bottomCards.map((card, i) => (
            <BentoCard key={i} {...card} />
          ))}
        </div>

        {ctaLabel && (
          <Link
            href={ctaHref}
            className="group relative flex items-center justify-center h-10 w-[480px] rounded-[var(--radius-pill-sm)] border px-6 mt-[50px] text-white shadow-[var(--shadow-cta)] transition-all"
            style={
              ctaVariant === "yellow"
                ? { borderColor: "var(--color-bento-devops-border)" }
                : ctaVariant === "blue"
                ? { borderColor: "var(--color-bento-dev-border)" }
                : { borderColor: "var(--color-secondary-400)" }
            }
          >
            {/* Gradient overlay — visible au hover uniquement */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={
                ctaVariant === "yellow"
                  ? { background: "linear-gradient(135deg, var(--color-cta-devops-from), var(--color-cta-devops-to))" }
                  : ctaVariant === "blue"
                  ? { background: "linear-gradient(135deg, var(--color-cta-gradient-start), var(--color-tab-active-dev))" }
                  : { background: "linear-gradient(135deg, var(--color-cta-gradient-start), var(--color-cta-orange-deep))" }
              }
            />
            <span
              className="relative z-10 font-body font-semibold"
              style={{
                fontSize: "var(--text-nav)",
                lineHeight: "var(--text-nav--line-height)",
              }}
            >
              {ctaLabel}
            </span>
          </Link>
        )}
      </section>
    </MotionConfig>
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

  // Gradient radial — forme distincte et couleur pôle plus sombre
  const bgStyle = isHighlight
    ? {
        background:
          "radial-gradient(ellipse at top left, rgba(255,109,30,0.18) 0%, rgba(28,31,47,0.98) 65%)",
      }
    : isHighlightBlue
    ? {
        background:
          "radial-gradient(ellipse at top left, rgba(61,60,232,0.22) 0%, rgba(28,31,47,0.98) 65%)",
      }
    : isHighlightYellow
    ? {
        background:
          "radial-gradient(ellipse at top left, rgba(230,173,0,0.2) 0%, rgba(28,31,47,0.98) 65%)",
      }
    : undefined;

  return (
    <motion.div
      className={[
        "rounded-[var(--radius-card)] border flex flex-col gap-[50px] px-[33px] py-[51px] relative cursor-default",
        !isAccent && "bg-card-bg",
        borderClass,
      ].filter(Boolean).join(" ")}
      style={{
        ...bgStyle,
        zIndex: 1,
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      whileHover={cardHover}
      transition={cardTransition}
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
    </motion.div>
  );
}
