"use client";

import Image from "next/image";
import { usePathname } from "@/navigation";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Ingénieur augmenté", href: "/accueil" },
  { label: "Nos pôles", href: "/nos-poles/developpement" },
  { label: "Nos références", href: "/all-references" },
  { label: "Nos produits IA", href: "/produits" },
  { label: "Actualités", href: "/actualite" },
];

export function Header({
  logoSrc = "/images/logo.svg",
  logoAlt = "DevFun",
  navItems = DEFAULT_NAV_ITEMS,
  ctaLabel = "Je lance mon projet",
  ctaHref = "/#contact",
}: HeaderProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="flex items-center gap-10 w-full px-6 py-4">
      {/* Logo */}
      <div className="relative h-[50px] w-[106px] shrink-0">
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Nav + CTA container — glassmorphism */}
      <div className="flex items-center gap-[50px] h-[60px] px-[30px] backdrop-blur-[5px] bg-white/10 border border-white/30 rounded-[var(--radius-nav)] shrink-0">
        {/* Navigation links */}
        <nav className="flex items-center gap-[35px] pt-[5px]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex flex-col h-[26px] items-start shrink-0 text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] font-sans whitespace-nowrap transition-colors",
                  isActive
                    ? "text-brand-orange-light border-b-2 border-brand-orange pb-[6px]"
                    : "text-text-light pb-[4px] hover:text-brand-orange-light",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right section : CTA + locale switcher */}
        <div className="flex items-center gap-[13px] shrink-0">
          {/* CTA button */}
          <Link
            href={ctaHref}
            className="flex items-center gap-[10px] px-[17px] py-[5px] bg-gradient-to-b from-[var(--color-brand-orange-cta-from)] to-[var(--color-brand-orange-cta-to)] rounded-[var(--radius-cta)] shadow-[var(--shadow-cta)] text-white text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] font-sans whitespace-nowrap"
          >
            {ctaLabel}
            <ArrowRightIcon />
          </Link>

          {/* Locale switcher */}
          <Link
            href="/"
            locale={otherLocale}
            className="flex items-center justify-center size-[36px] rounded-[var(--radius-badge)] shadow-[var(--shadow-cta)] bg-white/10 border border-white/20 text-text-light text-sm font-sans uppercase shrink-0"
          >
            {otherLocale}
          </Link>
        </div>
      </div>
    </header>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
