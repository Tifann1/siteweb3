// PodcastSection — Section podcast "Entre les lignes"
// Figma node I517:3693;427:2495
// bg deep-navy, grille 2 colonnes : texte gauche + PlayerCard droite

import { PodcastPlayerCard, type PodcastPlayerCardProps } from "@/components/ui/PodcastPlayerCard";

export interface PodcastSectionProps {
  /** Nom du podcast (ex: "entre les lignes") */
  podcastName?: string;
  /** Accroche principale */
  title?: string;
  /** Description courte */
  description?: string;
  /** Props du lecteur d'épisode */
  episode: PodcastPlayerCardProps;
}

export function PodcastSection({
  podcastName = "entre les lignes",
  title = "Écoutez le futur de\nl'ingénierie.",
  description = "Chaque mois, nous invitons des experts du digital et des pionniers de l'industrie pour discuter des ruptures technologiques.",
  episode,
}: PodcastSectionProps) {
  return (
    <section className="bg-deep-navy w-full py-32">
      <div
        className="grid grid-cols-2 gap-16 items-center"
        style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
      >
        {/* Colonne gauche — texte */}
        <div className="flex flex-col gap-6 items-start pb-8">
          {/* Label podcast */}
          <div className="flex items-center gap-2">
            <MicIcon />
            <span
              className="font-body font-semibold text-text-heading uppercase tracking-[1.2px]"
              style={{ fontSize: "12px", lineHeight: "16px" }}
            >
              {podcastName}
            </span>
          </div>

          {/* Titre */}
          <h2
            className="font-body font-extrabold text-text-heading"
            style={{
              fontSize: "var(--text-podcast-heading)",
              lineHeight: "var(--text-podcast-heading--line-height)",
              letterSpacing: "var(--text-podcast-heading--letter-spacing)",
            }}
          >
            {title.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>

          {/* Description */}
          <p
            className="font-body font-normal text-text-body-warm pt-2"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
            }}
          >
            {description}
          </p>
        </div>

        {/* Colonne droite — lecteur */}
        <PodcastPlayerCard {...episode} />
      </div>
    </section>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
      <rect x="6" y="1" width="6" height="10" rx="3" stroke="#DFE1F8" strokeWidth="1.5" />
      <path d="M1 10c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 18v2" stroke="#DFE1F8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
