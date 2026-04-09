"use client";

export interface PoleTab {
  label: string;
  value: string;
}

interface PoleTabsNavProps {
  tabs?: PoleTab[];
  activeValue: string;
  onChange: (value: string) => void;
  /** Couleur de fond du tab actif. Défaut : --color-tab-active (orange Conseil) */
  activeColor?: string;
}

const DEFAULT_TABS: PoleTab[] = [
  { label: "Conseil & Transformation", value: "conseil" },
  { label: "Développement Full-stack", value: "dev" },
  { label: "DevOps & Infrastructure", value: "devops" },
];

export function PoleTabsNav({
  tabs = DEFAULT_TABS,
  activeValue,
  onChange,
  activeColor,
}: PoleTabsNavProps) {
  return (
    <nav
      aria-label="Navigation des pôles"
      className="flex items-start gap-2 p-[6px] rounded-[16px] bg-[color:var(--color-nav-bg)]"
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeValue;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            aria-current={isActive ? "true" : undefined}
            className={[
              "flex flex-col items-center justify-center px-6 py-3 rounded-[12px] font-ui font-bold text-sm leading-5 text-center whitespace-nowrap transition-colors duration-200",
              "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",
              isActive && !activeColor
                ? "bg-[color:var(--color-tab-active)] text-text-heading"
                : !isActive
                ? "text-text-light hover:text-white"
                : "text-text-heading",
            ].join(" ")}
            style={isActive && activeColor ? { backgroundColor: activeColor } : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
