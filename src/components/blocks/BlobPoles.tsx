"use client";

import { useState, useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BLOBS = [
  {
    id: "conseil",
    label: "Conseil",
    sub: "Architecture & Stratégie",
    description:
      "Audit, roadmap digitale et accompagnement stratégique pour aligner technologie et ambition métier.",
    gradient: "linear-gradient(135deg, #FF7E33 0%, #FFB692 100%)",
    color: "#FF7E33",
    morphName: "blobM1",
    morphDuration: "12s",
    morphDelay: "0s",
    w: 210,
    h: 192,
    top: 18,
    left: 8,
    z: 3,
  },
  {
    id: "dev",
    label: "Développement",
    sub: "Full-stack & Mobile",
    description:
      "Applications web, mobile et API sur mesure — livrées avec la précision d'une équipe senior.",
    gradient: "linear-gradient(135deg, #4746E9 0%, #7474FF 100%)",
    color: "#7474FF",
    morphName: "blobM2",
    morphDuration: "15s",
    morphDelay: "-5s",
    w: 228,
    h: 210,
    top: 8,
    left: 192,
    z: 2,
  },
  {
    id: "devops",
    label: "DevOps",
    sub: "Cloud & Infra",
    description:
      "CI/CD, cloud, infra as code — votre plateforme maintenue à 99,9 % de disponibilité.",
    gradient: "linear-gradient(135deg, #E6B002 0%, #FFCA4A 100%)",
    color: "#E6B002",
    morphName: "blobM3",
    morphDuration: "17s",
    morphDelay: "-9s",
    w: 198,
    h: 182,
    top: 222,
    left: 18,
    z: 2,
  },
  {
    id: "ia",
    label: "IA & Data",
    sub: "LLM, RAG, Agents",
    description:
      "LLM, RAG et agents autonomes — l'intelligence artificielle au cœur de vos processus métiers.",
    gradient: "linear-gradient(135deg, #46BA87 0%, #3DD9B3 100%)",
    color: "#46BA87",
    morphName: "blobM4",
    morphDuration: "13s",
    morphDelay: "-3s",
    w: 185,
    h: 165,
    top: 228,
    left: 224,
    z: 3,
  },
] as const;

const BLOB_CSS = `
@keyframes blobM1 {
  0%,100% { border-radius: 42% 58% 68% 32% / 38% 52% 48% 62%; }
  33%     { border-radius: 68% 32% 44% 56% / 56% 38% 62% 44%; }
  66%     { border-radius: 52% 48% 32% 68% / 42% 68% 38% 52%; }
}
@keyframes blobM2 {
  0%,100% { border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%; }
  40%     { border-radius: 38% 62% 60% 40% / 40% 55% 45% 60%; }
  70%     { border-radius: 50% 50% 45% 55% / 65% 35% 50% 50%; }
}
@keyframes blobM3 {
  0%,100% { border-radius: 35% 65% 55% 45% / 60% 44% 56% 40%; }
  35%     { border-radius: 58% 42% 38% 62% / 42% 58% 36% 64%; }
  70%     { border-radius: 48% 52% 62% 38% / 50% 62% 48% 52%; }
}
@keyframes blobM4 {
  0%,100% { border-radius: 55% 45% 40% 60% / 45% 60% 40% 55%; }
  40%     { border-radius: 40% 60% 55% 45% / 62% 38% 55% 45%; }
  80%     { border-radius: 62% 38% 48% 52% / 38% 52% 62% 48%; }
}
@media (prefers-reduced-motion: reduce) {
  .blob-m { animation: none !important; border-radius: 50% !important; }
}
`;

function BlobItem({
  blob,
  index,
  isInView,
}: {
  blob: (typeof BLOBS)[number];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.55 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.15 + index * 0.13 }}
      whileHover={{
        scale: 1.06,
        transition: { type: "spring", damping: 22, stiffness: 260 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "absolute",
        top: blob.top,
        left: blob.left,
        width: blob.w,
        height: blob.h,
        zIndex: hovered ? 10 : blob.z,
        cursor: "default",
      }}
    >
      {/* Glow halo derrière */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          inset: -18,
          background: blob.gradient,
          filter: "blur(24px)",
          opacity: 0.3,
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      {/* Corps du blob — morphing CSS */}
      <div
        className="blob-m"
        style={{
          width: "100%",
          height: "100%",
          background: blob.gradient,
          animation: `${blob.morphName} ${blob.morphDuration} ease-in-out ${blob.morphDelay} infinite`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 10px 38px ${blob.color}28`,
        }}
      >
        {/* Reflet interne */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.22) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        {/* État par défaut : nom + sous-titre */}
        <motion.div
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? -8 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "0 1.25rem",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "white",
              textShadow: "0 1px 4px rgba(0,0,0,0.22)",
              marginBottom: "0.3rem",
            }}
          >
            {blob.label}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.78)",
              textShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          >
            {blob.sub}
          </span>
        </motion.div>

        {/* État hover : description */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem 1.25rem",
            background: "rgba(0,0,0,0.1)",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              lineHeight: 1.58,
              color: "white",
              textAlign: "center",
              textShadow: "0 1px 4px rgba(0,0,0,0.25)",
              margin: 0,
            }}
          >
            {blob.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function BlobPoles() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <MotionConfig reducedMotion="user">
      {/* eslint-disable-next-line react/no-danger */}
      <style>{BLOB_CSS}</style>
      <section
        ref={sectionRef}
        aria-label="Nos pôles d'expertise"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "var(--color-nav-bg)",
          paddingTop: "7rem",
          paddingBottom: "7rem",
          paddingLeft: "var(--page-margin-x)",
          paddingRight: "var(--page-margin-x)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4rem",
            flexWrap: "wrap",
          }}
        >
          {/* Cluster de blobs */}
          <div
            style={{
              position: "relative",
              width: "452px",
              height: "430px",
              flexShrink: 0,
            }}
          >
            {BLOBS.map((blob, i) => (
              <BlobItem
                key={blob.id}
                blob={blob}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Texte accompagnateur */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "var(--text-badge)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
                marginBottom: "0.75rem",
              }}
            >
              Nos expertises
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "var(--color-text-heading)",
                margin: "0 0 1.25rem",
              }}
            >
              Quatre pôles.{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Un seul engagement.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-lg)",
                lineHeight: "var(--text-body-lg--line-height)",
                color: "rgba(223, 192, 179, 0.8)",
                margin: 0,
              }}
            >
              Survolez chaque forme pour explorer l&apos;étendue de nos
              savoir-faire.
            </motion.p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
