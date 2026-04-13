// SectionDirecteurPole — Présentation éditoriale du directeur de pôle
// Layout : photo portrait pleine hauteur (gauche) + bloc identité/vision/stats (droite)
// L'accentColor pilote toutes les teintes du composant — un token CSS par pôle.

import { Link } from "@/navigation";

export interface DirectorStat {
  /** Valeur mise en avant (ex: "12 ans", "+200", "98%") */
  value: string;
  /** Description courte en majuscules (ex: "Expérience", "Projets livrés") */
  label: string;
}

export interface SectionDirecteurPoleProps {
  /** Prénom Nom */
  name: string;
  /** Intitulé du poste (ex: "Directeur du Pôle Conseil") */
  role: string;
  /** URL de la photo portrait — ratio 3/4 recommandé */
  imageSrc: string;
  imageAlt?: string;
  /** Libellé court du pôle pour le badge (ex: "Conseil") */
  poleLabel: string;
  /**
   * Couleur CSS de l'accent — doit provenir d'un token pôle.
   * Conseil  → "var(--color-tab-active)"      (#D35E19)
   * Dev      → "var(--color-tab-active-dev)"   (#2827B2)
   * DevOps   → "var(--color-tab-active-devops)" (#C9AA3A)
   */
  accentColor: string;
  /** Citation / vision — 1 à 3 phrases percutantes */
  vision: string;
  /** Métriques clés — 2 items affichés (les suivants sont ignorés) */
  stats: DirectorStat[];
  /** Label CTA optionnel (ex: "Discuter avec l'équipe") */
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function SectionDirecteurPole({
  name,
  role,
  imageSrc,
  imageAlt,
  poleLabel,
  accentColor,
  vision,
  stats,
  ctaLabel,
  ctaHref = "#",
  className,
}: SectionDirecteurPoleProps) {
  return (
    <section
      className={[
        "relative flex w-full overflow-hidden bg-deep-navy",
        className ?? "",
      ].join(" ")}
    >
      {/* ── Colonne photo ─────────────────────────────────── */}
      <div className="relative hidden w-[42%] shrink-0 md:block">
        <img
          src={imageSrc}
          alt={imageAlt ?? name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* Dégradé bas — fondu vers la couleur du pôle */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent 35%,
              color-mix(in srgb, ${accentColor} 10%, transparent) 70%,
              color-mix(in srgb, ${accentColor} 22%, var(--color-deep-navy)) 100%
            )`,
          }}
        />

        {/* Fondu latéral droit — raccord avec le fond */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, transparent 55%, var(--color-deep-navy) 100%)",
          }}
        />

        {/* Badge pôle */}
        <div className="absolute left-6 top-6">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: `1px solid color-mix(in srgb, ${accentColor} 50%, transparent)`,
            }}
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 8px 0 ${accentColor}`,
              }}
            />
            <span
              className="font-ui font-bold uppercase"
              style={{
                color: accentColor,
                fontSize: "var(--text-badge)",
                letterSpacing: "var(--text-badge--letter-spacing)",
              }}
            >
              Pôle {poleLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Colonne contenu ───────────────────────────────── */}
      <div className="relative flex flex-1 flex-col justify-center gap-10 px-12 py-16 lg:px-16 lg:py-20">
        {/* Ligne décorative verticale */}
        <div
          aria-hidden="true"
          className="absolute bottom-16 left-0 top-16 w-px"
          style={{ backgroundColor: accentColor, opacity: 0.18 }}
        />

        {/* Identité */}
        <div className="flex flex-col gap-1">
          {/* Badge pôle mobile uniquement */}
          <div className="mb-3 flex items-center gap-2 md:hidden">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="font-ui font-bold uppercase"
              style={{
                color: accentColor,
                fontSize: "var(--text-badge)",
                letterSpacing: "var(--text-badge--letter-spacing)",
              }}
            >
              Pôle {poleLabel}
            </span>
          </div>

          <h2
            className="font-sans font-bold text-text-heading"
            style={{
              fontSize: "var(--text-card-title)",
              lineHeight: "var(--text-card-title--line-height)",
            }}
          >
            {name}
          </h2>
          <p
            className="font-sans text-text-light"
            style={{
              fontSize: "var(--text-nav)",
              lineHeight: "var(--text-nav--line-height)",
            }}
          >
            {role}
          </p>
        </div>

        {/* Citation / vision */}
        <blockquote className="flex flex-col gap-3">
          <span
            aria-hidden="true"
            className="select-none font-sans font-bold leading-none"
            style={{ color: accentColor, fontSize: "4.5rem", lineHeight: "0.5", opacity: 0.4 }}
          >
            &ldquo;
          </span>
          <p
            className="font-body italic text-text-body-warm"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
              maxWidth: "52ch",
            }}
          >
            {vision}
          </p>
        </blockquote>

        {/* Grille de métriques */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))" }}
        >
          {stats.slice(0, 2).map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-[var(--radius-input)] px-5 py-4"
              style={{
                backgroundColor: "rgba(67, 70, 116, 0.25)",
                border: `1px solid color-mix(in srgb, ${accentColor} 10%, transparent)`,
              }}
            >
              <span
                className="font-body font-bold"
                style={{
                  color: "var(--color-text-heading)",
                  fontSize: "var(--text-stat-value)",
                  lineHeight: "var(--text-stat-value--line-height)",
                }}
              >
                {stat.value}
              </span>
              <span
                className="font-ui font-semibold uppercase text-text-light"
                style={{
                  fontSize: "var(--text-label)",
                  lineHeight: "var(--text-label--line-height)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA optionnel */}
        {ctaLabel && (
          <div>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-3 rounded-[var(--radius-pill-sm)] border px-[17px] py-[9px] font-sans text-white shadow-[var(--shadow-cta)] transition-opacity hover:opacity-80"
              style={{
                borderColor: accentColor,
                fontSize: "var(--text-nav)",
                lineHeight: "var(--text-nav--line-height)",
              }}
            >
              {ctaLabel}
              <ArrowRightIcon />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
