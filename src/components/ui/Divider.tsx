// Divider — Séparateur horizontal
// Figma node 57:1863 — couleur #C0CCDA (greyscale/smoke/extra-dark)
// Usage : séparation entre items de liste ou sections de contenu

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <hr
      className={`border-0 border-t border-divider w-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
