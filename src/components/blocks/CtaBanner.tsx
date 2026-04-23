import { Link } from "@/navigation";
import { RevealTitle } from "@/components/ui/RevealTitle";

interface CtaBannerProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaBanner({
  title = "Prêt à augmenter\nvos projets ?",
  description = "Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA.",
  primaryLabel = "Parlons de votre projet",
  primaryHref = "/contact",
  secondaryLabel = "Voir nos offres",
  secondaryHref = "/contact",
}: CtaBannerProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between overflow-hidden px-8 py-10 md:px-16 md:py-14 rounded-[24px] md:rounded-[40px] bg-deep-navy shadow-[var(--shadow-cta)] w-full gap-8 md:gap-0">
      {/* Texte */}
      <div className="flex flex-col gap-4 items-start max-w-[580px] shrink">
        <RevealTitle
          text={title}
          className="font-sans font-semibold text-text-heading"
          style={{
            fontSize: "var(--text-card-title)",
            lineHeight: "var(--text-card-title--line-height)",
          }}
        />
        <p
          className="font-sans text-text-light"
          style={{
            fontSize: "var(--text-nav)",
            lineHeight: "var(--text-nav--line-height)",
          }}
        >
          {description}
        </p>
      </div>

      {/* Boutons droite — toujours à droite des labels */}
      <div className="flex flex-col gap-4 items-stretch md:items-end justify-center shrink-0 md:ml-10 w-full md:w-[240px]">
        {/* CTA primaire — gradient orange */}
        <Link
          href={primaryHref}
          className="relative flex items-center justify-center w-full px-8 py-4 rounded-[var(--radius-input)] bg-gradient-to-r from-brand-orange-light to-brand-orange font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-center text-cta-text-dark transition-opacity hover:opacity-90 whitespace-nowrap"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[var(--radius-input)]"
            style={{
              boxShadow:
                "0px 20px 25px -5px rgba(255,182,146,0.2), 0px 8px 10px -6px rgba(255,182,146,0.2)",
            }}
          />
          {primaryLabel}
        </Link>

        {/* CTA secondaire — card-bg */}
        <Link
          href={secondaryHref}
          className="flex items-center justify-center w-full px-8 py-4 rounded-[var(--radius-input)] bg-card-bg font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-text-heading text-center transition-opacity hover:opacity-80 whitespace-nowrap"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
