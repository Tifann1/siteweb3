"use client";

import { motion, MotionConfig } from "framer-motion";

const TESTIMONIAL = {
  quote:
    "DevFun ne nous a pas livré un projet — ils ont transformé la façon dont nos équipes travaillent. L'agent IA déployé en trois semaines gère aujourd'hui 40% des demandes de support sans intervention humaine.",
  author: "Marie Lefebvre",
  role: "CTO, Fintech Scale-up",
  initials: "ML",
};

export function TestimonialBlock() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative overflow-hidden bg-deep-navy"
        style={{
          paddingTop: "7rem",
          paddingBottom: "7rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
        aria-label="Témoignage client"
      >
        {/* Halo décoratif */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,126,51,0.5) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 flex flex-col gap-10 items-start max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Guillemet décoratif */}
          <span
            className="font-sans font-bold text-brand-orange select-none"
            style={{ fontSize: "6rem", lineHeight: 0.7, opacity: 0.35 }}
            aria-hidden="true"
          >
            "
          </span>

          {/* Citation */}
          <blockquote
            className="font-sans font-semibold text-text-heading"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
            }}
          >
            {TESTIMONIAL.quote}
          </blockquote>

          {/* Auteur */}
          <div className="flex items-center gap-4">
            {/* Avatar initiales */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full font-sans font-bold text-cta-text-dark text-sm shrink-0"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-brand-orange-cta-from) 0%, var(--color-brand-orange-cta-to) 100%)",
              }}
              aria-hidden="true"
            >
              {TESTIMONIAL.initials}
            </div>

            <div className="flex flex-col gap-0.5">
              <span
                className="font-sans font-semibold text-text-heading"
                style={{ fontSize: "var(--text-nav)" }}
              >
                {TESTIMONIAL.author}
              </span>
              <span
                className="font-body text-text-light/50"
                style={{ fontSize: "var(--text-badge)" }}
              >
                {TESTIMONIAL.role}
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
