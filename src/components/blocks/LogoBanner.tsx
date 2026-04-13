"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface LogoItem {
  src: string;
  alt: string;
  /** Largeur en px pour le rendu — maintient le ratio original */
  width: number;
  /** Hauteur en px (référence : 30px pour tous les logos) */
  height: number;
}

interface LogoBannerProps {
  logos: LogoItem[];
  /** Durée d'un cycle complet en secondes (défaut : 25) */
  duration?: number;
}

/**
 * Bandeau de logos clients en défilement continu.
 * Utilise Framer Motion pour l'animation (règle projet : pas de CSS animation ad hoc).
 *
 * Technique : duplication du tableau de logos pour un loop sans saut.
 * x: "-50%" → "0%" = déplacement d'une largeur de lot, boucle invisible.
 *
 * Structure :
 *  - outer div : contrainte aux marges de la page (var(--page-margin-x))
 *  - inner div : overflow-hidden + mask-image → fondu aux bords du conteneur
 */
export function LogoBanner({ logos, duration = 25 }: LogoBannerProps) {
  const duplicated = [...logos, ...logos];

  return (
    <div
      aria-label="Nos clients"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      {/* overflow-hidden + fondu aux bords du conteneur contraint */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        }}
      >
        <motion.div
          className="flex items-center gap-[30px]"
          style={{ width: "max-content" }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicated.map((logo, i) => (
            <div
              key={i}
              className="relative shrink-0 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              style={{ width: logo.width, height: logo.height }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes={`${logo.width}px`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
