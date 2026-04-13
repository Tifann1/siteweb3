// SectionExpertTeam — node 533:5500 "Nos Experts Section"
// Figma: "Les Visages du Pôle" — heading + row of 4 expert cards, gap-80px
// Wrapper: px-[50px], gap-[64px], items-center

import { ExpertCard } from "@/components/ui/ExpertCard";

export interface Expert {
  name: string;
  imageSrc: string;
  imageAlt?: string;
  role?: string;
}

interface SectionExpertTeamProps {
  heading?: string;
  experts: Expert[];
}

export function SectionExpertTeam({
  heading = "Les Visages du Pôle",
  experts,
}: SectionExpertTeamProps) {
  return (
    <section
      className="flex flex-col gap-16 items-center justify-center py-16 md:py-24 w-full"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      <h2
        className="font-sans font-bold text-text-heading text-center"
        style={{
          fontSize: "var(--text-card-title)",
          lineHeight: "var(--text-card-title--line-height)",
        }}
      >
        {heading}
      </h2>

      <div className="flex gap-20 items-center">
        {experts.map((expert) => (
          <ExpertCard
            key={expert.name}
            imageSrc={expert.imageSrc}
            imageAlt={expert.imageAlt}
            name={expert.name}
            role={expert.role}
          />
        ))}
      </div>
    </section>
  );
}
