interface Step {
  /** URL de l'icône (SVG ou image) */
  iconSrc: string;
  iconAlt?: string;
  title: string;
  description: string;
}

interface MiniCard {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  subtitle: string;
}

interface IntegrationSchemaProps {
  title?: string;
  description?: string;
  steps?: Step[];
  miniCards?: MiniCard[];
}

/**
 * Section "Des agents IA de l'idée à l'impact" (node 620:4916).
 * 3 étapes en grille + flèches décoratives + 3 mini-cartes en bas.
 *
 * ⚠ Les icônes Figma (imgContainer, imgConnectingArrows…) expirent dans 7 jours.
 * Passer les props `iconSrc` avec les chemins définitifs depuis /public/.
 */
export function IntegrationSchema({
  title = "Des agents IA de l'idée à l'impact",
  description = "Nous cadrons, concevons et déployons des agents IA utiles, pensés pour vos métiers, vos équipes et vos résultats.",
  steps = [],
  miniCards = [],
}: IntegrationSchemaProps) {
  return (
    <section
      className="flex flex-col items-center py-20 md:py-28 w-full"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      <div className="flex flex-col gap-16 items-start max-w-[1280px] mx-auto w-full">
        {/* En-tête */}
        <div className="flex flex-col gap-4 items-center w-full">
          <h2
            className="font-sans font-bold text-white text-center whitespace-nowrap"
            style={{
              fontSize: "var(--text-card-title)",
              lineHeight: "var(--text-card-title--line-height)",
            }}
          >
            {title}
          </h2>
          <p
            className="font-sans text-text-body-warm text-center max-w-[672px]"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {description}
          </p>
        </div>

        {/* Bloc principal */}
        <div className="bg-card-bg border border-white/5 flex flex-col gap-16 items-start overflow-hidden p-[49px] rounded-[var(--radius-card)] w-full">
          {/* Grille 3 étapes */}
          {steps.length > 0 && (
            <div className="relative grid grid-cols-3 gap-12 w-full">
              {steps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Icône */}
                  <div className="mb-6">
                    <div className="bg-deep-navy border border-white/10 flex items-center justify-center p-px rounded-[16px] size-20">
                      <img
                        src={step.iconSrc}
                        alt={step.iconAlt ?? ""}
                        className="size-7 object-contain"
                      />
                    </div>
                  </div>

                  {/* Flèches décoratives entre étapes */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-10 -right-8 text-text-body-warm opacity-60 text-lg"
                    >
                      →
                    </span>
                  )}

                  {/* Titre étape */}
                  <h3
                    className="font-sans text-text-heading text-center mb-2 whitespace-nowrap"
                    style={{ fontSize: "var(--text-tab)", lineHeight: "normal" }}
                  >
                    {step.title}
                  </h3>

                  {/* Description étape */}
                  <p
                    className="font-sans text-text-body-warm text-center"
                    style={{
                      fontSize: "var(--text-nav)",
                      lineHeight: "var(--text-nav--line-height)",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Mini-cartes */}
          {miniCards.length > 0 && (
            <div className="flex gap-5 items-center w-full">
              {miniCards.map((card, i) => (
                <div
                  key={i}
                  className="flex flex-1 items-center gap-5 justify-center px-[41px] py-[25px] rounded-[var(--radius-card)] bg-deep-navy border border-white/5"
                >
                  <img
                    src={card.iconSrc}
                    alt={card.iconAlt ?? ""}
                    className="size-6 object-contain shrink-0"
                  />
                  <div className="flex flex-col items-start min-w-0">
                    <span
                      className="font-sans text-text-heading"
                      style={{
                        fontSize: "var(--text-nav)",
                        lineHeight: "var(--text-nav--line-height)",
                      }}
                    >
                      {card.title}
                    </span>
                    <span
                      className="font-sans text-[color:var(--color-text-muted)]"
                      style={{
                        fontSize: "var(--text-label)",
                        lineHeight: "var(--text-label--line-height)",
                      }}
                    >
                      {card.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
