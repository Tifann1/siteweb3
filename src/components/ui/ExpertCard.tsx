// ExpertCard — node I533:5500;597:4072;597:3915
// Figma: w 175px, overflow hidden, rounded-6px, portrait photo 1080/1350
// Gradient overlay + name below

interface ExpertCardProps {
  /** URL de la photo portrait */
  imageSrc: string;
  imageAlt?: string;
  /** Prénom Nom */
  name: string;
  /** Poste ou titre (optionnel) */
  role?: string;
}

export function ExpertCard({ imageSrc, imageAlt, name, role }: ExpertCardProps) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center overflow-hidden rounded-[6px] w-[175px] relative">
      {/* Photo portrait — ratio 1080/1350 ≈ 4:5 */}
      <div className="aspect-[4/5] relative rounded-[6px] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt ?? name}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[6px]"
        />
        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[6px]"
          style={{
            background:
              "linear-gradient(180.88deg, rgba(33,41,193,0.04) 21.86%, rgba(16,19,91,0.4) 99.39%)",
          }}
        />
      </div>

      {/* Nom */}
      <div className="flex flex-col items-center justify-center">
        <p
          className="font-sans text-white whitespace-nowrap"
          style={{
            fontSize: "var(--text-nav)",
            lineHeight: "var(--text-nav--line-height)",
          }}
        >
          {name}
        </p>
        {role && (
          <p
            className="font-sans text-text-light text-center"
            style={{
              fontSize: "var(--text-label)",
              lineHeight: "var(--text-label--line-height)",
            }}
          >
            {role}
          </p>
        )}
      </div>
    </div>
  );
}
