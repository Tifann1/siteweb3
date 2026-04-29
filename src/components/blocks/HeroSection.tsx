import React from "react";
import { HeroHalos } from "./HeroHalos";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { FactoryAnimation } from "@/components/ui/FactoryAnimation";

interface HeroSectionProps {
  /** Texte du badge en haut */
  eyebrow?: string;
  /**
   * Titre principal. Utiliser \n pour les sauts de ligne.
   */
  title?: string;
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
  /**
   * Taille du titre.
   * - "default" : 72px (page home)
   * - "compact" : 60px (pages produits/pôles)
   * Figma node 519:3938 → Display Large 60px/75px/-3px
   */
  titleSize?: "default" | "compact";
  /**
   * Mode de hauteur de la section.
   * - "fill" (défaut) : min-h-screen — la section remplit tout l'écran
   * - "flex"          : flex-1 — la section s'étend dans un conteneur parent flexible
   *   → à utiliser avec un wrapper min-h-screen flex flex-col pour combiner hero + tabs
   */
  sizeMode?: "fill" | "flex";
}

export function HeroSection({
  eyebrow = "VOS PRODUITS AUGMENTÉS PAR L'IA, CONÇUS POUR LE TERRAIN",
  title = "Vos projets sur mesure,\naugmentés à l'IA, au service\nde vos ambitions.",
  highlightWord = "augmentés à l'IA",
  highlightStyle = "gradient",
  highlightColor = "#FBA275",
  description = "Nous concevons et déployons des produits sur mesure, augmentés par des agents IA, intégrés à vos usages métiers, pour accélérer vos opérations et maximiser votre impact.",
  align = "left",
  titleSize = "default",
  sizeMode = "fill",
}: HeroSectionProps) {
  const isRight = align === "right";
  const isCompact = titleSize === "compact";
  const heightClass = sizeMode === "flex" ? "flex-1" : "min-h-screen";

  return (
    <section className={`relative flex flex-col items-center justify-center overflow-hidden ${heightClass}`}>
      {/* Halos lumineux flottants (Client Component — framer-motion) */}
      <HeroHalos />

      {/* Contenu — z-10 au-dessus des halos */}
      <div
        className="relative z-10 w-full"
        style={{
          paddingTop: "calc(var(--header-height) + 3rem)",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
          paddingBottom: "6rem",
        }}
      >
        {/* Colonne texte — contrainte à ~52% sur lg+ pour laisser place à l'animation */}
        <div
          className={[
            "flex flex-col gap-8 md:gap-[70px] w-full lg:max-w-[58%]",
            isRight ? "items-end ml-auto" : "items-start",
          ].join(" ")}
        >
          {/* Badge + Titre groupés */}
          <div className={["flex flex-col gap-5", isRight ? "items-end" : "items-start"].join(" ")}>
            {/* Badge eyebrow */}
            {eyebrow && (
              <div className="flex items-center gap-2 px-4 py-[6px] rounded-full bg-[color:var(--color-badge-blue-bg)] w-fit">
                <span
                  className="size-2 rounded-full bg-badge-blue shrink-0"
                  style={{ boxShadow: "var(--shadow-badge-dot)" }}
                />
                <span className="font-body font-semibold text-badge-blue tracking-[1.8px] text-[length:var(--text-badge)] leading-4 uppercase sm:whitespace-nowrap">
                  {eyebrow}
                </span>
              </div>
            )}

          {/* Titre */}
          <RevealTitle
            as="h1"
            text={title}
            highlightWord={highlightStyle === "gradient" ? highlightWord : undefined}
            className={[
              "font-sans font-bold text-text-heading",
              isRight ? "text-right" : "text-left",
            ].join(" ")}
            style={
              isCompact
                ? {
                    fontSize: "var(--text-product-hero)",
                    lineHeight: "var(--text-product-hero--line-height)",
                    letterSpacing: "var(--text-product-hero--letter-spacing)",
                  }
                : {
                    fontSize: "var(--text-hero-title)",
                    lineHeight: "var(--text-hero-title--line-height)",
                    letterSpacing: "var(--text-hero-title--letter-spacing)",
                  }
            }
          />
          </div>

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
      </div>

      {/* Animation flottante — positionnée en absolu sur la droite, visible dès lg */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[48%] xl:w-[44%]">
        <FactoryAnimation />
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

  const escaped = highlightWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = title.split(regex);

  return parts.map((part, i) => {
    if (part.toLowerCase() === highlightWord.toLowerCase()) {
      // Découper sur \n pour insérer des <br /> explicites dans le span coloré
      const lines = part.split("\n");
      if (highlightStyle === "solid") {
        return lines.map((line, j) => (
          <React.Fragment key={`${i}-${j}`}>
            <span style={{ color: highlightColor }}>{line}</span>
            {j < lines.length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return lines.map((line, j) => (
        <React.Fragment key={`${i}-${j}`}>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
            }}
          >
            {line}
          </span>
          {j < lines.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}
