"use client";

import { useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Taille du coin coupé en px — doit rester > padding horizontal
const CHAMFER = 72;

interface Conviction {
  num: string;
  label: string;
  title: string[];
  detail: string;
  accent: string;
  /** Côté d'alignement de la carte + direction du coin coupé */
  side: "left" | "right";
}

const CONVICTIONS: Conviction[] = [
  {
    num: "01",
    label: "Notre engagement",
    title: ["Senior", "à chaque sprint"],
    detail:
      "Aucun profil junior caché en milieu de projet. Chaque mission est conduite par des ingénieurs avec au minimum 8 ans de pratique réelle.",
    accent: "var(--color-offer-blue)",
    side: "left",
  },
  {
    num: "02",
    label: "Notre livrable",
    title: ["Livré en", "production"],
    detail:
      "Pas de POC qui finit dans un tiroir. Le premier sprint cible un système qui tourne, monitoré, et qui évolue avec vos équipes.",
    accent: "var(--color-offer-green)",
    side: "right",
  },
  {
    num: "03",
    label: "Notre ADN",
    title: ["Amplifié", "par l'IA"],
    detail:
      "L'intelligence artificielle est dans nos pratiques — pas dans nos slides. Chaque ingénieur augmente sa capacité avec des agents en production.",
    accent: "var(--color-brand-orange-light)",
    side: "left",
  },
];

function ConvictionCard({
  conviction,
  index,
}: {
  conviction: Conviction;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // margin: "0px" → la carte se déclenche dès qu'elle entre dans le viewport
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const isRight = conviction.side === "right";

  // Coin coupé : à droite pour side=left, à gauche pour side=right
  const clipPath = isRight
    ? `polygon(${CHAMFER}px 0, 100% 0, 100% 100%, 0 100%, 0 ${CHAMFER}px)`
    : `polygon(0 0, calc(100% - ${CHAMFER}px) 0, 100% ${CHAMFER}px, 100% 100%, 0 100%)`;

  // Ligne d'accent diagonale tracée sur le bord coupé
  // Positionnée dans le coin via un SVG minimal
  const accentLine = isRight ? (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: CHAMFER + 4,
        height: CHAMFER + 4,
        pointerEvents: "none",
      }}
    >
      <motion.line
        x1={CHAMFER}
        y1={0}
        x2={0}
        y2={CHAMFER}
        stroke={conviction.accent}
        strokeWidth={1.2}
        strokeOpacity={0.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
      />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: CHAMFER + 4,
        height: CHAMFER + 4,
        pointerEvents: "none",
      }}
    >
      <motion.line
        x1={0}
        y1={0}
        x2={CHAMFER}
        y2={CHAMFER}
        stroke={conviction.accent}
        strokeWidth={1.2}
        strokeOpacity={0.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
      />
    </svg>
  );

  return (
    <motion.div
      ref={ref}
      // Atterrissage : part de -90px au-dessus, légèrement réduit → spring avec rebond
      initial={{ opacity: 0, y: -90, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 1.1,
        delay: index * 0.15,
        opacity: { duration: 0.3, ease: "easeOut" },
      }}
      style={{
        position: "relative",
        clipPath,
        background: `linear-gradient(${isRight ? "135deg" : "225deg"}, ${conviction.accent}0E 0%, rgba(255,255,255,0.03) 100%)`,
        border: "1px solid rgba(255,255,255,0.09)",
        marginLeft: isRight ? "auto" : 0,
        marginRight: isRight ? 0 : "auto",
        maxWidth: "76%",
        overflow: "hidden",
      }}
    >
      {/* Ligne SVG sur le coin coupé */}
      {accentLine}

      {/* T08 — Numéro géant en texture de fond, saignant hors du coin opposé */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          [isRight ? "right" : "left"]: "-2%",
          transform: "translateY(-54%)",
          fontSize: "clamp(7rem, 18vw, 24rem)",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          lineHeight: 1,
          color: "transparent",
          // WebkitTextStroke avec opacité très faible : texture sans distraction
          WebkitTextStroke: `1px ${conviction.accent}1E`,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {conviction.num}
      </span>

      {/* Contenu — z-index pour passer au-dessus du numéro */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          // Padding augmenté — cartes plus épaisses
          paddingTop: isRight ? `calc(4.5rem + ${CHAMFER * 0.55}px)` : "4.5rem",
          paddingBottom: "4.5rem",
          paddingLeft: isRight ? `calc(4rem + ${CHAMFER * 0.5}px)` : "4rem",
          paddingRight: isRight ? "4rem" : `calc(4rem + ${CHAMFER * 0.5}px)`,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: isRight ? "flex-end" : "flex-start",
          textAlign: isRight ? "right" : "left",
          minHeight: "260px",
          justifyContent: "center",
        }}
      >
        {/* Label badge */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 + 0.08 * index }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "var(--text-badge)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: conviction.accent,
          }}
        >
          {conviction.label}
        </motion.span>

        {/* T04 — Titre split ligne par ligne (curtain reveal) */}
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            color: "var(--color-text-heading)",
            margin: 0,
          }}
        >
          {conviction.title.map((line, i) => (
            <span
              key={i}
              style={{ display: "block", overflow: "hidden" }}
            >
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.75,
                  ease: EASE,
                  delay: 0.2 + 0.08 * index + i * 0.1,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.55, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 + 0.08 * index }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body-lg)",
            lineHeight: "var(--text-body-lg--line-height)",
            color: "var(--color-text-light)",
            maxWidth: 480,
          }}
        >
          {conviction.detail}
        </motion.p>
      </div>
    </motion.div>
  );
}

/**
 * SectionDiagonale — "Nos engagements"
 *
 * Technique principale : clip-path chamfré sur chaque carte (coin coupé).
 * Les coupes alternent gauche/droite → zigzag diagonal qui rompt le rythme
 * purement rectangulaire de la page. Aucun bloc standard, aucune grille.
 *
 * Techniques de détail :
 *   T08 — Oversized number en fond, opacité stroke ~12%, saigne hors du coin opposé
 *   T04 — Split text curtain reveal ligne par ligne
 *
 * Signature motion : cubic-bezier(0.16, 1, 0.3, 1)
 */
export function SectionDiagonale() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Nos engagements"
        style={{
          backgroundColor: "var(--color-nav-bg)",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
      >
        {/* En-tête de section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "4rem",
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "var(--text-badge)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
            }}
          >
            Nos engagements
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-heading)",
              margin: 0,
            }}
          >
            Trois raisons de{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              nous faire confiance.
            </span>
          </motion.h2>
        </div>

        {/* Cartes chamfrées — zigzag gauche/droite */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {CONVICTIONS.map((conviction, i) => (
            <ConvictionCard
              key={conviction.num}
              conviction={conviction}
              index={i}
            />
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
