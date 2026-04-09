// StatTile — Tuile de métrique produit
// Extraite de Figma node 519:4298 / 519:4303
// Figma: bg #040936 (deep-navy), value #FFB692 20px bold, label #434674 13px uppercase

interface StatTileProps {
  /** Valeur affichée en grand (ex: "-40%", "24/7") */
  value: string;
  /** Label descriptif en majuscules (ex: "Temps de réponse") */
  label: string;
  className?: string;
}

export function StatTile({ value, label, className }: StatTileProps) {
  return (
    <div
      className={`flex flex-col items-start p-4 rounded-[var(--radius-input)] bg-deep-navy ${className ?? ""}`}
    >
      <span
        className="font-body font-bold text-brand-orange-light"
        style={{ fontSize: "20px", lineHeight: "28px" }}
      >
        {value}
      </span>
      <span
        className="font-sans font-semibold text-card-bg uppercase"
        style={{ fontSize: "var(--text-label)", lineHeight: "var(--text-label--line-height)" }}
      >
        {label}
      </span>
    </div>
  );
}
