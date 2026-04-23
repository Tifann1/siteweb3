'use client'

// ScrollRevealSection — transition background nav-bg → deep-navy
// La bulle deep-navy dépasse de 72px sur la section précédente (margin-top négatif)
// clip-path part d'un strip en haut de l'élément (= visible en bas de l'écran)
// puis s'agrandit jusqu'à plein écran au fur et à mesure du scroll

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionConfig } from 'framer-motion'

interface ScrollRevealSectionProps {
  children: React.ReactNode
  className?: string
}

const PEEK = 72 // px that peek below the previous section

export function ScrollRevealSection({ children, className = '' }: ScrollRevealSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null)

  // scrollYProgress:
  //   0 = top of element at bottom of viewport (pill just visible at bottom)
  //   1 = top of element at top of viewport (fully expanded, content scrolling normally)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start end', 'start start'],
  })

  // clip-path: strip at top (3% height = ~pill) → full reveal
  // All values in % so Framer Motion interpolates correctly
  // "97% bottom inset" = 3% visible at top = pill at bottom of screen
  const clipPath = useTransform(scrollYProgress, (p) => {
    const clamped = Math.max(0, Math.min(1, p))
    // ease-out curve so the pill opens quickly at the start
    const e = 1 - Math.pow(1 - clamped, 1.8)
    const rl = ((1 - e) * 8).toFixed(2)
    const b = ((1 - e) * 97).toFixed(2)
    const r = Math.round((1 - e) * 40)
    return `inset(0% ${rl}% ${b}% ${rl}% round ${r}px)`
  })

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={outerRef}
        style={{
          marginTop: `-${PEEK}px`,
          position: 'relative',
          zIndex: 10,
        }}
        className={className}
      >
        <motion.div
          style={{
            clipPath,
            backgroundColor: 'var(--color-deep-navy)',
          }}
        >
          {/* paddingTop compensates for the negative margin overlap */}
          <div style={{ paddingTop: `${PEEK}px` }}>
            {children}
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
