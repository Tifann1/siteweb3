"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/navigation";
import { motion } from "framer-motion";

export interface ReferenceCardProps {
  imageSrc: string;
  imageAlt?: string;
  logoSrc?: string;
  logoAlt?: string;
  category: string;
  title: string;
  statValue?: string;
  statLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const imageTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

export function ReferenceCard({
  imageSrc,
  imageAlt = "",
  logoSrc,
  logoAlt = "",
  category,
  title,
  statValue,
  statLabel,
  ctaLabel = "Découvrir",
  ctaHref = "#",
}: ReferenceCardProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (clicked) return;
    setClicked(true);
    setTimeout(() => router.push(ctaHref), 220);
  };

  return (
    <Link
      href={ctaHref}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-start overflow-hidden rounded-[var(--radius-input)] bg-deep-navy border border-white/10 w-[384px] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1"
    >
      {/* Logo client — superposé à la jonction image / contenu, z-10 pour passer au-dessus */}
      {logoSrc && (
        <div className="absolute top-[216px] left-[25px] z-10 h-[40px] w-[132px]">
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
      )}

      {/* Image de couverture
          clip-path + scale sur le même élément → même couche GPU → pas d'artefact sub-pixel */}
      <motion.div
        className="relative h-[256px] w-full shrink-0"
        style={{ clipPath: "inset(0)" }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={imageTransition}
      >
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #040936 5%, rgba(4,9,54,0.2) 50%, rgba(4,9,54,0.2) 100%)",
          }}
        />
      </motion.div>

      {/* Contenu */}
      <div className="flex flex-col gap-5 items-start p-8 w-full">
        {/* Badge catégorie */}
        <div className="flex items-center gap-2 pb-4">
          <span className="size-2 rounded-full bg-brand-orange shrink-0" />
          <span
            className="font-body font-semibold bg-clip-text text-transparent uppercase whitespace-nowrap"
            style={{
              fontSize: "13px",
              backgroundImage: "linear-gradient(to right, #ffb692, #ff7e33)",
            }}
          >
            {category}
          </span>
        </div>

        {/* Titre */}
        <p
          className="font-sans text-white pb-4 w-full"
          style={{ fontSize: "22px", lineHeight: "normal" }}
        >
          {title}
        </p>

        {/* Stat card */}
        {statValue && (
          <div className="flex flex-col items-start p-[17px] bg-card-bg border border-white/5 rounded-[8px] w-full">
            <span
              className="font-sans font-bold text-white"
              style={{ fontSize: "32px", lineHeight: "32px" }}
            >
              {statValue}
            </span>
            {statLabel && (
              <span
                className="font-body font-normal text-text-light mt-1"
                style={{ fontSize: "13px" }}
              >
                {statLabel}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span
            className="font-body font-semibold bg-clip-text text-transparent uppercase tracking-[1.4px]"
            style={{
              fontSize: "14px",
              backgroundImage: "linear-gradient(to right, #ffb692, #ff7e33)",
            }}
          >
            {ctaLabel}
          </span>
          <motion.span
            animate={clicked ? { x: 28, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowIcon />
          </motion.span>
        </div>
      </div>
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M10 5l3 3-3 3"
        stroke="#FFB692"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
