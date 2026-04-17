"use client";

import { ReactLenis } from "lenis/react";

/**
 * LenisProvider — Smooth scroll avec inertie sur toute la page.
 *
 * Options :
 *   lerp: 0.08        — Force de l'inertie (0.1 = fluide, 0.05 = très lent)
 *   duration: 1.2     — Durée de l'easing de momentum en secondes
 *   smoothWheel: true — Lissage de la molette souris
 *   orientation: 'vertical'
 *
 * Compatible Framer Motion useScroll — Lenis met à jour la position scroll native,
 * donc useScroll/useTransform fonctionnent sans configuration supplémentaire.
 *
 * prefers-reduced-motion : ReactLenis désactive automatiquement le smooth scroll
 * si l'utilisateur a activé la préférence système.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        orientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}
