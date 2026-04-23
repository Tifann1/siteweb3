"use client";

import { motion, useMotionValue, animate, AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface LogoItem {
  src: string;
  alt: string;
  /** Largeur en px pour le rendu — maintient le ratio original */
  width: number;
  /** Hauteur en px (référence : 30px pour tous les logos) */
  height: number;
  /** Slug optionnel — si présent, le logo devient un lien vers /references/[slug] */
  slug?: string;
}

interface LogoBannerProps {
  logos: LogoItem[];
  /** Durée d'un cycle complet en secondes (défaut : 25) */
  duration?: number;
}

const logoVariants = {
  initial: { scale: 1 },
};

const hoverTransition = { type: "spring", stiffness: 300, damping: 20 } as const;

/**
 * Bandeau de logos clients en défilement continu, sans saut.
 *
 * Technique : duplication des logos + animate() sur MotionValue en pixels.
 * Contrairement à l'animate prop avec keyframes, animate() gère le reset
 * en interne sans frame intermédiaire → boucle vraiment transparente.
 *
 * Structure :
 *  - outer div : contenu dans les marges de la page (var(--page-margin-x))
 *  - inner div : overflow-hidden + mask-image → fondu aux bords du conteneur
 */
export function LogoBanner({ logos, duration = 25 }: LogoBannerProps) {
  const duplicated = [...logos, ...logos];
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : "fr";

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Largeur pixel d'un seul lot de logos (la moitié du track dupliqué)
    const oneSetWidth = el.scrollWidth / 2;

    // Réinitialiser avant de lancer pour garantir le bon point de départ
    x.set(0);

    const controls = animate(x, -oneSetWidth, {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    controlsRef.current = controls;

    return () => controls.stop();
  }, [duration, x, logos.length]);

  const handleMouseEnter = () => {
    controlsRef.current?.pause();
  };

  const handleMouseLeave = () => {
    controlsRef.current?.play();
  };

  return (
    <div
      aria-label="Nos clients"
      style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
    >
      {/* overflow-hidden + fondu aux bords du conteneur contraint */}
      <div
        className="overflow-hidden py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        }}
      >
        <motion.div
          ref={trackRef}
          className="flex items-center gap-[30px]"
          style={{ width: "max-content", x }}
        >
          {duplicated.map((logo, i) => {
            const logoContent = (
              <motion.div
                className="relative shrink-0 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-300"
                style={{ width: logo.width, height: logo.height }}
                variants={logoVariants}
                whileHover={{ scale: 1.15 }}
                transition={hoverTransition}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes={`${logo.width}px`}
                />
              </motion.div>
            );

            return logo.slug ? (
              <Link
                key={i}
                href={`/${locale}/references/${logo.slug}`}
                className="shrink-0"
                tabIndex={0}
              >
                {logoContent}
              </Link>
            ) : (
              <div key={i} className="shrink-0">
                {logoContent}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
