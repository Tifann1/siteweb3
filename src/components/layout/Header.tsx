"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "@/navigation";
import { Link } from "@/navigation";

interface NavItem {
  label: string;
  href: string;
  /** Préfixe de chemin utilisé pour la détection de l'état actif (sous-routes) */
  matchPrefix?: string;
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
  { label: "Nos pôles", href: "/nos-poles/conseil", matchPrefix: "/nos-poles" },
  { label: "Nos références", href: "/references", matchPrefix: "/references" },
  { label: "Nos produits IA", href: "/produits", matchPrefix: "/produits" },
  { label: "Actualités", href: "/actualite" },
];

export function Header({
  logoSrc = "/images/logos/LogoSteamulo.png",
  logoAlt = "Steamulo",
  navItems = DEFAULT_NAV_ITEMS,
  ctaLabel = "Je lance mon projet",
  ctaHref = "/contact",
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent pt-4 md:pt-8 lg:pt-10 pb-3 px-4 md:px-[var(--page-margin-x)]"
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

        {/* Nav + CTA container — desktop uniquement */}
        <div className="hidden md:flex items-center gap-[50px] h-[60px] px-[30px] backdrop-blur-[5px] bg-white/10 border border-white/30 rounded-[var(--radius-nav)] shrink-0">
          {/* Navigation links */}
          <nav className="flex items-center gap-[35px] pt-[5px]">
            {navItems.map((item) => {
              const activeBase = item.matchPrefix ?? item.href;
              const isActive =
                pathname === activeBase || pathname.startsWith(activeBase + "/");
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
            <Link
              href={ctaHref}
              className="flex items-center justify-center px-[17px] py-[5px] bg-gradient-to-b from-[var(--color-brand-orange-cta-from)] to-[var(--color-brand-orange-cta-to)] rounded-[var(--radius-cta)] shadow-[var(--shadow-cta)] text-white text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] font-sans whitespace-nowrap"
            >
              {ctaLabel}
            </Link>

            {/* Logo WTTJ */}
            <div
              className="relative h-[30px] w-[80px] shrink-0 rounded-[var(--radius-cta)] overflow-hidden"
            >
              <Image
                src="/images/logos/logoWTTJ.png"
                alt="Welcome to the Jungle"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Hamburger — mobile uniquement */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <span className="block w-6 h-0.5 bg-white rounded-full" />
          <span className="block w-6 h-0.5 bg-white rounded-full" />
          <span className="block w-4 h-0.5 bg-white rounded-full" />
        </button>
      </header>

      {/* Menu mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-deep-navy/98 backdrop-blur-md flex flex-col px-6 pt-6 pb-10">
          {/* Barre haute : logo + fermeture */}
          <div className="flex items-center justify-between mb-12">
            <div className="relative h-[50px] w-[106px] shrink-0">
              <Image src={logoSrc} alt={logoAlt} fill className="object-contain" priority />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Fermer le menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Liens nav */}
          <nav className="flex flex-col gap-6 flex-1">
            {navItems.map((item) => {
              const activeBase = item.matchPrefix ?? item.href;
              const isActive =
                pathname === activeBase || pathname.startsWith(activeBase + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "font-sans font-semibold text-[2rem] leading-tight transition-colors",
                    isActive ? "text-brand-orange-light" : "text-white/70 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center px-[17px] py-4 bg-gradient-to-b from-[var(--color-brand-orange-cta-from)] to-[var(--color-brand-orange-cta-to)] rounded-[var(--radius-cta)] shadow-[var(--shadow-cta)] text-white font-sans text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] whitespace-nowrap"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </>
  );
}
