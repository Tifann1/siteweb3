interface SavoirFaireItem {
  label: string;
  title: string;
  description: string;
  accent: string;
  tags: string[];
}

interface SavoirFaireSectionProps {
  eyebrow?: string;
  heading?: string;
  items: SavoirFaireItem[];
}

export function SavoirFaireSection({
  eyebrow = "Savoir-faire",
  heading = "Le lien entre Dev et Ops.",
  items,
}: SavoirFaireSectionProps) {
  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "var(--page-margin-x)",
        paddingRight: "var(--page-margin-x)",
      }}
    >
      <div className="flex flex-col gap-4 mb-14">
        <span
          className="font-body font-semibold text-brand-orange uppercase tracking-widest"
          style={{ fontSize: "var(--text-badge)", letterSpacing: "0.12em" }}
        >
          {eyebrow}
        </span>
        <h2
          className="font-sans font-bold text-text-heading"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          {heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-6 px-0 py-8 md:py-0 md:px-10 first:pl-0 last:pr-0">
            <div className="w-8 h-[3px] rounded-full" style={{ backgroundColor: item.accent }} />
            <span
              className="font-body font-semibold uppercase tracking-widest"
              style={{ fontSize: "var(--text-badge)", letterSpacing: "0.1em", color: item.accent }}
            >
              {item.label}
            </span>
            <h3
              className="font-sans font-bold text-text-heading"
              style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", lineHeight: 1.25, letterSpacing: "-0.01em" }}
            >
              {item.title}
            </h3>
            <p
              className="font-body text-text-light/55 flex-1"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--text-body-lg--line-height)" }}
            >
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${item.accent}14`,
                    color: item.accent,
                    border: `1px solid ${item.accent}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
