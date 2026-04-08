interface HeroSectionProps {
  /** Texte du badge en haut */
  eyebrow?: string;
  /**
   * Titre principal. Utiliser \n pour les sauts de ligne.
   */
  title: string;
  /**
   * Mot(s) du titre à mettre en évidence.
   * La correspondance est insensible à la casse.
   */
  highlightWord?: string;
  /**
   * Style du mot en évidence.
   * - "gradient" : dégradé orange (défaut, page home)
   * - "solid"    : couleur unie via highlightColor
   */
  highlightStyle?: "gradient" | "solid";
  /** Couleur unie pour highlightStyle="solid" */
  highlightColor?: string;
  /** Texte de description sous le titre */
  description?: string;
  /** Alignement du contenu (défaut : "left") */
  align?: "left" | "right";
}

export function HeroSection({
  eyebrow = "VOS AGENTS IA, CONÇUS POUR LE TERRAIN",
  title = "L'ingénieur\naugmenté au service\nde vos ambitions.",
  highlightWord = "augmenté",
  highlightStyle = "gradient",
  highlightColor = "#FBA275",
  description = "Nous imaginons et déployons des agents IA sur mesure, connectés à vos usages, pour accélérer vos opérations et renforcer votre impact.",
  align = "left",
}: HeroSectionProps) {
  const isRight = align === "right";

  return (
    <section className="relative flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Blobs décoratifs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute size-96 rounded-full bg-[rgba(255,182,146,0.1)] blur-[60px] left-1/2 -translate-x-1/2 top-1/3" />
        <div className="absolute size-[500px] rounded-full bg-[rgba(184,195,255,0.05)] blur-[75px] right-1/4 bottom-1/4" />
      </div>

      {/* Contenu */}
      <div
        className={[
          "relative flex flex-col gap-[70px] pb-[48.5px] px-[120px] w-full",
          isRight ? "items-end" : "items-start",
        ].join(" ")}
      >
        {/* Badge eyebrow */}
        {eyebrow && (
          <div className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-[color:var(--color-badge-blue-bg)] w-fit">
            <span
              className="size-2 rounded-full bg-badge-blue shrink-0"
              style={{ boxShadow: "var(--shadow-badge-dot)" }}
            />
            <span className="font-body font-semibold text-badge-blue tracking-[1.8px] text-[length:var(--text-badge)] leading-4 uppercase whitespace-nowrap">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Titre */}
        <h1
          className={[
            "font-sans font-bold text-text-heading whitespace-pre-line",
            isRight ? "text-right" : "text-left",
          ].join(" ")}
          style={{
            fontSize: "var(--text-hero-title)",
            lineHeight: "var(--text-hero-title--line-height)",
            letterSpacing: "var(--text-hero-title--letter-spacing)",
          }}
        >
          {renderTitleWithHighlight(title, highlightWord, highlightStyle, highlightColor)}
        </h1>

        {/* Description */}
        {description && (
          <p
            className={[
              "font-body font-normal text-text-body-warm opacity-80 max-w-[671px]",
              isRight ? "text-right" : "text-left",
            ].join(" ")}
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

function renderTitleWithHighlight(
  title: string,
  highlightWord?: string,
  highlightStyle: "gradient" | "solid" = "gradient",
  highlightColor = "#FBA275"
): React.ReactNode {
  if (!highlightWord) return title;

  const regex = new RegExp(`(${highlightWord})`, "gi");
  const parts = title.split(regex);

  return parts.map((part, i) => {
    if (part.toLowerCase() === highlightWord.toLowerCase()) {
      if (highlightStyle === "solid") {
        return (
          <span key={i} style={{ color: highlightColor }}>
            {part}
          </span>
        );
      }
      return (
        <span
          key={i}
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
          }}
        >
          {part}
        </span>
      );
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}
