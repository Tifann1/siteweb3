// PodcastPlayerCard — Carte lecteur podcast
// Figma node I517:3693;427:2507
// bg card-bg, épisode + barre de progression + contrôles + bouton "Écouter"

export interface PodcastPlayerCardProps {
  /** Numéro et titre de l'épisode (ex: "EP.3 : L'Usine Cognitive") */
  episodeTitle: string;
  /** Ligne invités / contexte (ex: "Avec Thibault & Baptiste @devops") */
  guests: string;
  /** Durée affichée (ex: "12:01") */
  duration: string;
  /** Progression 0–100 */
  progress?: number;
  /** Lien Écouter */
  listenHref?: string;
}

export function PodcastPlayerCard({
  episodeTitle,
  guests,
  duration,
  progress = 33,
  listenHref = "#",
}: PodcastPlayerCardProps) {
  const progressPct = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative bg-card-bg border border-white/5 rounded-[var(--radius-offer-img)] p-[33px] overflow-hidden shadow-[var(--shadow-card)]">
      {/* Déco coin bas-droit (SVG abstrait) */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-40px] right-[-40px] size-[133px] opacity-30 pointer-events-none"
      >
        <svg viewBox="0 0 133 167" fill="none" className="size-full">
          <circle cx="66" cy="100" r="65" stroke="#FFB692" strokeWidth="2" />
          <circle cx="66" cy="100" r="40" stroke="#FFB692" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex flex-col gap-8 relative">
        {/* En-tête : icône play + info épisode + durée */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Bouton lecture rapide */}
            <div className="bg-brand-orange-light/20 flex items-center justify-center rounded-[8px] size-16 shrink-0">
              <PlayIcon />
            </div>
            {/* Info épisode */}
            <div className="flex flex-col items-start">
              <h4
                className="font-ui font-bold text-text-heading"
                style={{ fontSize: "18px", lineHeight: "28px" }}
              >
                {episodeTitle}
              </h4>
              <span
                className="font-body font-normal text-meta-secondary"
                style={{ fontSize: "14px", lineHeight: "20px" }}
              >
                {guests}
              </span>
            </div>
          </div>
          {/* Badge durée */}
          <div className="bg-white/5 rounded-[4px] px-2 py-1 shrink-0">
            <span
              className="font-body font-semibold text-meta-secondary"
              style={{ fontSize: "10px", lineHeight: "15px" }}
            >
              {duration}
            </span>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="relative bg-white/10 h-1 rounded-full w-full">
          <div
            className="absolute inset-y-0 left-0 bg-brand-orange-light rounded-full"
            style={{ width: `${progressPct}%` }}
          />
          {/* Curseur */}
          <div
            className="absolute top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow-[0px_10px_15px_-3px_#FFB692,0px_4px_6px_-4px_#FFB692]"
            style={{ left: `calc(${progressPct}% - 6px)` }}
          />
        </div>

        {/* Contrôles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button aria-label="Précédent" className="text-text-heading opacity-70 hover:opacity-100 transition-opacity">
              <SkipBackIcon />
            </button>
            <button
              aria-label="Lecture / Pause"
              className="bg-brand-orange-light flex items-center justify-center rounded-full size-12 hover:opacity-90 transition-opacity"
            >
              <PlayFillIcon />
            </button>
            <button aria-label="Suivant" className="text-text-heading opacity-70 hover:opacity-100 transition-opacity">
              <SkipForwardIcon />
            </button>
          </div>
          {/* Bouton Écouter */}
          <a
            href={listenHref}
            className="flex items-center gap-2 bg-white/5 rounded-[8px] px-4 py-2 transition-opacity hover:opacity-80"
          >
            <span
              className="font-body font-semibold text-text-heading uppercase tracking-[0.6px]"
              style={{ fontSize: "12px", lineHeight: "16px" }}
            >
              Écouter
            </span>
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path d="M2 1.5l10 7.5-10 7.5V1.5z" fill="#FFB692" />
    </svg>
  );
}

function PlayFillIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <path d="M1.5 1l9 6-9 6V1z" fill="#040936" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg width="19" height="12" viewBox="0 0 19 12" fill="none" aria-hidden="true">
      <path d="M2 1v10M17 1L8 6l9 5V1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg width="19" height="12" viewBox="0 0 19 12" fill="none" aria-hidden="true">
      <path d="M17 1v10M2 1l9 5-9 5V1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <path d="M1 7L7 1M7 1H3M7 1v4" stroke="#DFE1F8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
