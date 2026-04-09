import Image from "next/image";

export interface AugmentedFeature {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  description: string;
}

export interface AugmentedStep {
  number: string;
  title: string;
  /** "orange" pour les étapes principales, "blue" pour les secondaires */
  accent?: "orange" | "blue";
}

export interface AugmentedSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  features: AugmentedFeature[];
  /** 4 étapes affichées dans une grille 2×2 décalée */
  steps: AugmentedStep[];
}

export function AugmentedSection({
  eyebrow = "Innovation IA",
  title,
  description,
  features,
  steps,
}: AugmentedSectionProps) {
  const leftSteps = steps.filter((_, i) => i % 2 === 0);
  const rightSteps = steps.filter((_, i) => i % 2 === 1);

  return (
    <section className="flex gap-[50px] items-start w-full">
      {/* ── Colonne gauche : eyebrow + titre + description + features ── */}
      <div className="flex flex-1 flex-col gap-[50px] items-start">
        {/* Eyebrow badge */}
        {eyebrow && (
          <div className="flex items-center gap-2 px-[17px] py-[9px] rounded-full bg-[rgba(148,160,221,0.1)] border border-[rgba(148,160,221,0.2)] w-fit">
            <span className="size-2 rounded-full bg-badge-blue shrink-0" />
            <span className="font-body font-normal text-badge-blue tracking-[1px] text-[10px] uppercase whitespace-nowrap">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Titre */}
        <h2
          className="font-sans font-bold text-white w-full"
          style={{ fontSize: "40px", lineHeight: "40px" }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="font-sans text-[#94a3b8] max-w-[519px]"
          style={{ fontSize: "22px" }}
        >
          {description}
        </p>

        {/* Feature list */}
        <div className="flex flex-col gap-6 w-full">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex items-center justify-center size-12 rounded-full bg-[#313445] shrink-0">
                {feature.iconSrc ? (
                  <div className="relative size-5">
                    <Image
                      src={feature.iconSrc}
                      alt={feature.iconAlt ?? ""}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <DefaultFeatureIcon />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className="font-sans text-white whitespace-nowrap"
                  style={{ fontSize: "22px" }}
                >
                  {feature.title}
                </span>
                <span
                  className="font-body font-normal text-[#64748b]"
                  style={{ fontSize: "16px", lineHeight: "20px" }}
                >
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colonne droite : grille 2×2 décalée ── */}
      <div className="flex gap-5 items-center self-stretch w-[549px] shrink-0">
        {/* Sous-colonne gauche : steps 1, 3 */}
        <div className="flex flex-1 flex-col gap-[50px] items-start">
          {leftSteps.map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>
        {/* Sous-colonne droite : steps 2, 4 — décalée vers le bas */}
        <div className="flex flex-1 flex-col gap-[50px] items-start pt-[80px]">
          {rightSteps.map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: AugmentedStep }) {
  const numberColor =
    step.accent === "blue" ? "text-badge-blue" : "text-brand-orange-light";

  return (
    <div className="flex flex-col items-start justify-between p-[33px] bg-card-bg border border-white/5 rounded-[16px] w-full gap-4">
      <span
        className={["font-body font-semibold", numberColor].join(" ")}
        style={{ fontSize: "48px", lineHeight: "48px" }}
      >
        {step.number}
      </span>
      <span
        className="font-body font-semibold text-white"
        style={{ fontSize: "16px", lineHeight: "24px" }}
      >
        {step.title}
      </span>
    </div>
  );
}

function DefaultFeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="#FFB692" strokeWidth="1.5" />
      <path d="M10 7v3l2 2" stroke="#FFB692" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
