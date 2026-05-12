"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "@/navigation";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  /** Préfixe de chemin utilisé pour la détection de l'état actif (sous-routes) */
  matchPrefix?: string;
  /** Sous-menus dropdown optionnels */
  children?: NavChild[];
}

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: "Nos pôles",
    href: "/nos-poles/conseil",
    matchPrefix: "/nos-poles",
    children: [
      { label: "Conseil", href: "/nos-poles/conseil" },
      { label: "Développement", href: "/nos-poles/developpement" },
      { label: "Hébergement", href: "/nos-poles/hebergement" },
    ],
  },
  { label: "Nos références", href: "/references", matchPrefix: "/references" },
  {
    label: "R&D",
    href: "/produits",
    matchPrefix: "",
    children: [
      { label: "Nos produits", href: "/produits" },
      { label: "Nos agents", href: "/agents" },
    ],
  },
  { label: "Actualités", href: "/actualite" },
];

export function Header({
  logoSrc = "/images/logos/logo-steamulo-blanc.png",
  logoAlt = "Steamulo",
  navItems = DEFAULT_NAV_ITEMS,
  ctaLabel = "Je lance mon projet",
  ctaHref = "/contact",
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenForOffers, setHiddenForOffers] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const offers = document.getElementById("offers-section");
    if (!offers) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHiddenForOffers(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(offers);
    return () => observer.disconnect();
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-[opacity,transform] duration-500"
        style={{
          opacity: hiddenForOffers ? 0 : 1,
          pointerEvents: hiddenForOffers ? "none" : undefined,
          transform: hiddenForOffers ? "translateY(-8px)" : "translateY(0)",
        }}
      >
        {/* Conteneur — pleine largeur en haut, max-width au scroll */}
        <div
          className="flex items-center justify-between mx-auto w-full pt-4 md:pt-6 lg:pt-8 pb-3 px-6 md:px-10 lg:px-16 transition-all duration-500"
          style={{ maxWidth: scrolled ? "1200px" : "100%" }}
        >

          {/* Logo */}
          <Link href="/accueil" className="relative h-[44px] w-[120px] shrink-0 block">
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Nav + CTA container — desktop uniquement */}
          <motion.div
            animate={scrolled
              ? { backdropFilter: "blur(5px)", backgroundColor: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.30)" }
              : { backdropFilter: "blur(0px)", backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0)" }
            }
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden md:flex items-center gap-[50px] h-[60px] px-[30px] border rounded-[var(--radius-nav)] shrink-0"
          >
            {/* Navigation links */}
            <nav className="flex items-center gap-[35px] pt-[5px]">
              {navItems.map((item) => {
                const activeBase = item.matchPrefix ?? item.href;
                const isActive = item.children
                  ? item.children.some(
                      (c) => pathname === c.href || pathname.startsWith(c.href + "/")
                    )
                  : pathname === activeBase || pathname.startsWith(activeBase + "/");

                if (item.children) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        className={[
                          "flex items-center gap-1.5 h-[26px] shrink-0 text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] font-sans whitespace-nowrap transition-colors",
                          isActive
                            ? "text-brand-orange-light border-b-2 border-brand-orange pb-[6px]"
                            : "text-text-light pb-[4px] hover:text-brand-orange-light",
                        ].join(" ")}
                      >
                        {item.label}
                        <motion.span
                          animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: "inline-flex", marginTop: "1px" }}
                        >
                          <ChevronTinyIcon />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            onMouseEnter={() => handleDropdownEnter(item.label)}
                            onMouseLeave={handleDropdownLeave}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 py-1.5 min-w-[160px] rounded-xl bg-deep-navy/95 backdrop-blur-md border border-white/10 shadow-lg"
                          >
                            {item.children.map((child) => {
                              const childActive =
                                pathname === child.href ||
                                pathname.startsWith(child.href + "/");
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={[
                                    "block px-4 py-2.5 font-sans transition-colors whitespace-nowrap",
                                    "text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)]",
                                    childActive
                                      ? "text-brand-orange-light"
                                      : "text-white/70 hover:text-white hover:bg-white/5",
                                  ].join(" ")}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

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
                className="flex items-center justify-center px-5 bg-gradient-to-b from-[var(--color-brand-orange-cta-from)] to-[var(--color-brand-orange-cta-to)] rounded-[var(--radius-cta)] shadow-[var(--shadow-cta)] text-white text-[length:var(--text-nav)] font-sans whitespace-nowrap shrink-0"
                style={{ height: "36px" }}
              >
                {ctaLabel}
              </Link>

              {/* Logo WTTJ */}
              <Image
                src="/images/logos/wttj-icon.png"
                alt="Welcome to the Jungle"
                width={40}
                height={40}
                className="shrink-0"
                style={{ width: 40, height: 40 }}
              />
            </div>
          </motion.div>

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
        </div>
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
              const isActive = item.children
                ? item.children.some(
                    (c) => pathname === c.href || pathname.startsWith(c.href + "/")
                  )
                : pathname === (item.matchPrefix ?? item.href) ||
                  pathname.startsWith((item.matchPrefix ?? item.href) + "/");

              if (item.children) {
                const expanded = mobileExpandedItem === item.label;
                return (
                  <div key={item.href} className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        setMobileExpandedItem((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      className={[
                        "flex items-center justify-between font-sans font-semibold text-[2rem] leading-tight transition-colors text-left",
                        isActive ? "text-brand-orange-light" : "text-white/70 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                      <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mr-2"
                      >
                        <ChevronTinyIcon size={20} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          style={{ overflow: "hidden" }}
                          className="flex flex-col gap-1 pl-4 border-l border-white/15"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="font-sans text-[1.25rem] text-white/60 hover:text-white transition-colors py-1"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

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

function ChevronTinyIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
