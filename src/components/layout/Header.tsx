"use client";

import Image from "next/image";
import { usePathname } from "@/navigation";
import { Link } from "@/navigation";

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent pt-6 pb-3"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
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

        {/* Right section : CTA + WTTJ */}
        <div className="flex items-center gap-[13px] shrink-0">
          {/* CTA button — sans icône flèche */}
          <Link
            href={ctaHref}
            className="flex items-center justify-center px-[17px] py-[5px] bg-gradient-to-b from-[var(--color-brand-orange-cta-from)] to-[var(--color-brand-orange-cta-to)] rounded-[var(--radius-cta)] shadow-[var(--shadow-cta)] text-white text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] font-sans whitespace-nowrap"
          >
            {ctaLabel}
          </Link>

          {/* Logo WTTJ — remplace le switcher EN/FR */}
          <div className="relative h-[30px] w-[80px] shrink-0 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/images/logos/logoWTTJ.png"
              alt="Welcome to the Jungle"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
