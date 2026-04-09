import Image from "next/image";

export interface ReferenceHeroProps {
  /** Badge eyebrow : "ÉTUDE DE CAS : Armatis" */
  eyebrow?: string;
  /** Titre complet de la référence */
  title: string;
  /** Sous-chaîne du titre à mettre en évidence avec le dégradé orange */
  highlightPhrase?: string;
  /** Description courte en dégradé orange */
  description?: string;
  /** URL de l'image de fond */
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
}

export function ReferenceHero({
  eyebrow = "ÉTUDE DE CAS : ARMATIS",
  title = "Armatis, le déploiement de l'IA à grande échelle",
  highlightPhrase = "déploiement de l'IA",
  description = "Nous fusionnons expertise technique industrielle et innovation numérique pour bâtir des solutions robustes, agiles et performantes.",
  backgroundImageSrc,
  backgroundImageAlt = "",
}: ReferenceHeroProps) {
  const renderTitle = () => {
    if (!highlightPhrase) return title;
    const idx = title.toLowerCase().indexOf(highlightPhrase.toLowerCase());
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
          }}
        >
          {title.slice(idx, idx + highlightPhrase.length)}
        </span>
        {title.slice(idx + highlightPhrase.length)}
      </>
    );
  };

  return (
    <section className="relative flex flex-col items-start justify-end min-h-[524px] px-[120px] pb-[80px] overflow-hidden">
      {/* Image de fond */}
      {backgroundImageSrc && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(9,15,66,0.1) 0%, rgba(9,15,66,0.95) 100%)",
            }}
          />
        </div>
      )}

      {/* Blobs décoratifs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute size-96 rounded-full bg-[rgba(255,182,146,0.1)] blur-[60px] left-1/3 top-1/3" />
        <div className="absolute size-[500px] rounded-full bg-[rgba(184,195,255,0.05)] blur-[75px] right-1/3 bottom-1/4" />
      </div>

      <div className="relative flex flex-col gap-[30px] max-w-[720px]">
        {/* Eyebrow */}
        {eyebrow && (
          <div className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-[rgba(148,160,221,0.1)] border border-[rgba(148,160,221,0.2)] w-fit">
            <span
              className="size-2 rounded-full bg-badge-blue shrink-0"
              style={{ boxShadow: "0 0 8px 0 #b8c3ff" }}
            />
            <span className="font-body font-semibold text-badge-blue tracking-[1.8px] text-[12px] leading-4 uppercase whitespace-nowrap">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Titre */}
        <h1
          className="font-body font-extrabold text-text-heading"
          style={{
            fontSize: "60px",
            lineHeight: "75px",
            letterSpacing: "-3px",
          }}
        >
          {renderTitle()}
        </h1>

        {/* Description dégradé orange */}
        {description && (
          <p
            className="font-body font-normal bg-clip-text text-transparent"
            style={{
              fontSize: "18px",
              lineHeight: "29.25px",
              backgroundImage:
                "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
