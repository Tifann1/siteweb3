"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  MotionConfig,
} from "framer-motion";

/**
 * Chaque mot est un composant séparé pour appeler useTransform au niveau
 * composant (les hooks React ne peuvent pas être dans des callbacks .map).
 */
function ScrollWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  // Blur décroissant : les mots passent de flou à net au fur et à mesure de la lecture
  const filter = useTransform(
    progress,
    [start, end],
    ["blur(5px)", "blur(0px)"]
  );
  return (
    <motion.span
      style={{ opacity, filter }}
      className="inline text-text-heading"
    >
      {word}{" "}
    </motion.span>
  );
}

// Manifeste de l'agence — court, fort, vrai
const WORDS =
  "Depuis 2005, nous croyons que la technologie n'a de valeur que si elle résout de vrais problèmes. Pas des démos. Pas des prototypes. Des systèmes qui tournent en production, qui évoluent avec les équipes, et qui durent.".split(
    " "
  );

const CONCLUSION = "C'est ce que nous appelons l'ingénierie durable.";

/**
 * ScrollStatement — section scroll-pincée (sticky) avec texte s'illuminant mot par mot.
 *
 * Structure :
 *   div[h-[200vh]] ← container scrollable, déclenche la progression
 *     div[sticky top-0 h-screen] ← écran ancré pendant le scroll
 *       ← halos parallax (T03) — 2 blobs à vitesses différentes
 *       ← grille de points (T11) — texture radial-gradient
 *       ← manifeste mot par mot — opacité liée à scrollYProgress
 *       ← conclusion gradient — apparaît en fin de progression
 *
 * Technique principale : T03 (scroll-driven) — jamais utilisé ailleurs dans le projet.
 * La page "vit" pendant le scroll, pas uniquement à l'entrée.
 */
export function ScrollStatement() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // T03 — Halos parallax (pixels — MotionValue<number>)
  const halo1Y = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const halo2Y = useTransform(scrollYProgress, [0, 1], [0, 130]);

  // Conclusion : apparaît quand les 3/4 du texte sont illuminés
  const conclusionOpacity = useTransform(
    scrollYProgress,
    [0.73, 0.93],
    [0, 1]
  );
  const conclusionY = useTransform(scrollYProgress, [0.73, 0.93], [20, 0]);

  // Calcul des plages d'opacité par mot
  const N = WORDS.length;
  const RANGE_START = 0.04;
  const RANGE_END = 0.73;
  const TOTAL = RANGE_END - RANGE_START;
  // Fenêtre d'illumination = 2× l'intervalle entre mots (transition progressive)
  const WINDOW = (TOTAL / N) * 2.0;

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "200vh" }}
        aria-label="Notre manifeste — ingénierie durable"
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-nav-bg flex items-center">
          {/* T11 — Grille de points en masque elliptique */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 65% 65% at 50% 50%, black 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 65% at 50% 50%, black 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* T03 — Halo bleu (parallax lent, haut-droite) */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              y: halo1Y,
              width: 700,
              height: 700,
              top: "-20%",
              right: "-8%",
              background:
                "radial-gradient(circle, rgba(71,70,233,0.13) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
            aria-hidden="true"
          />

          {/* T03 — Halo pêche (parallax rapide, bas-gauche) */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              y: halo2Y,
              width: 480,
              height: 480,
              bottom: "-12%",
              left: "3%",
              background:
                "radial-gradient(circle, rgba(255,182,146,0.11) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
            aria-hidden="true"
          />

          {/* Ligne de séparation haut */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
            }}
            aria-hidden="true"
          />

          {/* Contenu principal */}
          <div
            className="relative z-10 w-full flex flex-col gap-10"
            style={{
              paddingLeft: "var(--page-margin-x)",
              paddingRight: "var(--page-margin-x)",
            }}
          >
            {/* Eyebrow */}
            <span
              className="font-body font-semibold uppercase tracking-widest text-brand-orange"
              style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
            >
              Notre conviction
            </span>

            {/* Manifeste — chaque mot réagit au scroll */}
            <p
              className="font-sans font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 3.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                maxWidth: "900px",
              }}
            >
              {WORDS.map((word, i) => {
                const start = RANGE_START + (i / N) * TOTAL;
                const end = Math.min(start + WINDOW, RANGE_END + 0.04);
                return (
                  <ScrollWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </p>

            {/* Conclusion gradient — surgit à la fin */}
            <motion.p
              className="font-sans font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                opacity: conclusionOpacity,
                y: conclusionY,
              }}
            >
              {CONCLUSION}
            </motion.p>
          </div>

          {/* Ligne de séparation bas */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </MotionConfig>
  );
}
