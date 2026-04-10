import { Link } from "@/navigation";

interface FooterProps {
  contactLabel?: string;
  contactHref?: string;
  copyright?: string;
  legalLabel?: string;
  legalHref?: string;
  address?: string;
  socials?: {
    github?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export function Footer({
  contactLabel = "Contactez-nous",
  contactHref = "/#contact",
  copyright = "©2025 Steamulo",
  legalLabel = "Mentions légales",
  legalHref = "/mentions-legales",
  address = "14 rue Auber - 75009 Paris",
  socials = {},
}: FooterProps) {
  return (
    <footer
      className="flex flex-col items-start pt-20 pb-12 w-full"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Gauche : contact + copyright */}
        <div className="flex flex-col gap-5 items-start justify-center">
          <Link
            href={contactHref}
            className="flex items-center gap-[10px] px-[17px] py-[5px] rounded-[var(--radius-pill-sm)] border border-white font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-white shadow-[var(--shadow-cta)] hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            {contactLabel}
            <ArrowRightIcon />
          </Link>

          <div className="flex items-center gap-6">
            <span
              className="font-sans text-white/60 whitespace-nowrap"
              style={{
                fontSize: "var(--text-label)",
                lineHeight: "var(--text-label--line-height)",
              }}
            >
              {copyright}
            </span>
            <Link
              href={legalHref}
              className="font-sans text-white/60 hover:text-white/90 transition-colors whitespace-nowrap"
              style={{
                fontSize: "var(--text-label)",
                lineHeight: "var(--text-label--line-height)",
              }}
            >
              {legalLabel}
            </Link>
          </div>
        </div>

        {/* Droite : réseaux + adresse */}
        <div className="flex flex-col gap-5 items-end justify-center">
          <div className="flex items-center gap-4">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
            )}
            {/* Icônes par défaut si aucun social fourni */}
            {!socials.github && !socials.instagram && !socials.linkedin && (
              <>
                <span className="text-white/70"><GithubIcon /></span>
                <span className="text-white/70"><InstagramIcon /></span>
                <span className="text-white/70"><LinkedinIcon /></span>
              </>
            )}
          </div>

          <span
            className="font-sans text-white/60 whitespace-nowrap"
            style={{
              fontSize: "var(--text-label)",
              lineHeight: "var(--text-label--line-height)",
            }}
          >
            {address}
          </span>
        </div>
      </div>
    </footer>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.667A8.333 8.333 0 0 0 1.667 10c0 3.682 2.387 6.807 5.7 7.912.417.077.57-.18.57-.4v-1.4c-2.317.504-2.8-1.117-2.8-1.117-.378-.96-.922-1.215-.922-1.215-.754-.516.057-.505.057-.505.834.059 1.272.856 1.272.856.741 1.27 1.944.903 2.418.69.075-.537.29-.903.527-1.11-1.85-.21-3.795-.924-3.795-4.116 0-.909.325-1.652.856-2.234-.086-.21-.371-1.057.08-2.203 0 0 .698-.223 2.286.852A7.957 7.957 0 0 1 10 5.84c.707.003 1.418.095 2.083.28 1.587-1.075 2.284-.852 2.284-.852.452 1.146.167 1.993.082 2.203.533.582.854 1.325.854 2.234 0 3.2-1.948 3.904-3.802 4.11.299.257.565.765.565 1.541v2.284c0 .222.15.481.574.4A8.336 8.336 0 0 0 18.333 10 8.333 8.333 0 0 0 10 1.667Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2.5" y="2.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.5" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.5 7h3v10.5h-3V7ZM4 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM7.5 7H10v1.4s.8-1.4 2.8-1.4c2 0 3.2 1.35 3.2 4v6.5H13v-6c0-1.2-.5-2-1.6-2-1.4 0-1.9 1.1-1.9 2.3v5.7H7.5V7Z" fill="currentColor" />
    </svg>
  );
}
