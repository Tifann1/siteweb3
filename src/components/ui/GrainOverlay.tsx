/**
 * GrainOverlay — texture bruit SVG fixe sur toute la page.
 * Aucune dépendance externe, aucun impact sur le layout.
 */
export function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
