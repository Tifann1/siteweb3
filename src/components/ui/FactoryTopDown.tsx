"use client";

/**
 * FactoryTopDown.tsx
 * ------------------------------------------------------------------
 * 4 bâtiments stylisés (low-poly / design), chacun teinté à la
 * couleur de son pôle, avec des silhouettes franchement
 * différentes. Pas de particules entre les pôles : juste des arcs
 * lumineux fins. Pas de fond, pas de sol. Caméra fixe au repos,
 * lerp + orbite des 3 autres pôles au clic.
 * ------------------------------------------------------------------
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";

/* ───────────── Data ───────────── */

export const POLES = {
  conseil: {
    title: "Conseil & Transformation",
    short: "Conseil",
    kicker: "Pôle 01",
    desc: "Cadrage stratégique, design produit et transformation des organisations.",
    color: "#ef8336", colorBright: "#ffb46a", colorDark: "#7a3818",
    basePosition: [-3.4, 0, 1.0] as [number, number, number],
    href: "/nos-poles/conseil",
  },
  dev: {
    title: "Développement",
    short: "Développement",
    kicker: "Pôle 02",
    desc: "Ingénierie logicielle, plateformes web & mobile, architectures évolutives.",
    color: "#6a7dff", colorBright: "#9fb0ff", colorDark: "#1d2a8f",
    basePosition: [0, 0, -1.6] as [number, number, number],
    href: "/nos-poles/developpement",
  },
  hebergement: {
    title: "DevOps & Infrastructure",
    short: "Hébergement",
    kicker: "Pôle 03",
    desc: "Hébergement, SRE et automatisation. Production-ready, observable, 24/7.",
    color: "#f5cb35", colorBright: "#ffe07a", colorDark: "#7a6a18",
    basePosition: [3.4, 0, 1.0] as [number, number, number],
    href: "/nos-poles/hebergement",
  },
  ia: {
    title: "Nos Agents IA",
    short: "Agents IA",
    kicker: "Pôle 04",
    desc: "Agents et copilotes sur-mesure intégrés au cœur des opérations.",
    color: "#5cc996", colorBright: "#a3f0c9", colorDark: "#1f5a40",
    basePosition: [0, 0, 2.8] as [number, number, number],
    href: "/produits",
  },
} as const;

export type PoleId = keyof typeof POLES;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const v3 = (a: [number, number, number]) => new THREE.Vector3(...a);

/* ───────────── Materials helper (par pôle) ───────────── */

function usePoleMaterials(id: PoleId) {
  return useMemo(() => {
    const p = POLES[id];
    const body = new THREE.MeshPhysicalMaterial({
      color: p.color, roughness: 0.45, metalness: 0.25,
      clearcoat: 0.6, clearcoatRoughness: 0.2,
      emissive: new THREE.Color(p.color), emissiveIntensity: 0.18,
    });
    const dark = new THREE.MeshPhysicalMaterial({
      color: p.colorDark, roughness: 0.55, metalness: 0.3,
    });
    const accent = new THREE.MeshPhysicalMaterial({
      color: p.colorBright, roughness: 0.25, metalness: 0.6,
      emissive: new THREE.Color(p.colorBright), emissiveIntensity: 0.5,
      clearcoat: 1,
    });
    const glow = new THREE.MeshBasicMaterial({
      color: p.colorBright,
    });
    return { body, dark, accent, glow };
  }, [id]);
}

/* ===== CONSEIL — toit pyramidal + cercles concentriques (boussole) ===== */

function ConseilBuilding({ position, hovered, dimmed, ...handlers }: BuildingProps) {
  const g = useRef<THREE.Group>(null);
  const ringG = useRef<THREE.Group>(null);
  const needle = useRef<THREE.Group>(null);
  const m = usePoleMaterials("conseil");

  useEffect(() => () => { m.body.dispose(); m.dark.dispose(); m.accent.dispose(); m.glow.dispose(); }, [m]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g.current) {
      const ty = Math.sin(t * 0.5) * 0.025 + (hovered ? 0.12 : 0);
      g.current.position.y += (ty - g.current.position.y) * 0.1;
      const sc = hovered ? 1.07 : 1;
      g.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }
    if (ringG.current) ringG.current.rotation.y = -t * 0.15;
    if (needle.current) needle.current.rotation.y = t * 0.5;
    m.body.emissiveIntensity = hovered ? 0.4 : 0.18;
    m.accent.emissiveIntensity = hovered ? 0.9 : 0.5;
    const op = dimmed ? 0.45 : 1;
    m.body.opacity += (op - m.body.opacity) * 0.1; m.body.transparent = m.body.opacity < 0.99;
  });

  return (
    <group ref={g} position={position}>
      <mesh {...handlers} position={[0, 0.4, 0]}>
        <sphereGeometry args={[1.05, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Hexagone-base */}
      <mesh material={m.body} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.18, 6]} />
      </mesh>
      {/* Bandeau */}
      <mesh material={m.dark} position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 0.04, 6]} />
      </mesh>
      {/* Toit pyramidal hexagonal */}
      <mesh material={m.body} position={[0, 0.55, 0]}>
        <coneGeometry args={[0.85, 0.55, 6]} />
      </mesh>
      {/* Lanterneau au sommet */}
      <mesh material={m.accent} position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.18, 8]} />
      </mesh>
      <mesh material={m.glow} position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
      </mesh>
      {/* Cercles concentriques (cibles) flottants */}
      <group ref={ringG} position={[0, 0.21, 0]}>
        {[0.55, 0.7].map((r, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} material={m.accent}>
            <torusGeometry args={[r, 0.012, 8, 48]} />
          </mesh>
        ))}
      </group>
      {/* Aiguille de boussole */}
      <group ref={needle} position={[0, 0.24, 0]}>
        <mesh material={m.accent}>
          <coneGeometry args={[0.045, 0.5, 4]} />
        </mesh>
      </group>
    </group>
  );
}

/* ===== DEV — cube pivoté + barres orbitales (forge stylisée) ===== */

function DevBuilding({ position, hovered, dimmed, ...handlers }: BuildingProps) {
  const g = useRef<THREE.Group>(null);
  const cube = useRef<THREE.Mesh>(null);
  const orbA = useRef<THREE.Mesh>(null);
  const orbB = useRef<THREE.Mesh>(null);
  const m = usePoleMaterials("dev");

  useEffect(() => () => { m.body.dispose(); m.dark.dispose(); m.accent.dispose(); m.glow.dispose(); }, [m]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g.current) {
      const ty = Math.sin(t * 0.55 + 1) * 0.025 + (hovered ? 0.12 : 0);
      g.current.position.y += (ty - g.current.position.y) * 0.1;
      const sc = hovered ? 1.07 : 1;
      g.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }
    if (cube.current) {
      cube.current.rotation.y = t * 0.25;
    }
    if (orbA.current) { orbA.current.rotation.x = t * 0.6; orbA.current.rotation.y = t * 0.4; }
    if (orbB.current) { orbB.current.rotation.x = -t * 0.5; orbB.current.rotation.z = t * 0.3; }
    m.body.emissiveIntensity = hovered ? 0.5 : 0.25;
    m.accent.emissiveIntensity = hovered ? 1 : 0.6;
    const op = dimmed ? 0.45 : 1;
    m.body.opacity += (op - m.body.opacity) * 0.1; m.body.transparent = m.body.opacity < 0.99;
  });

  return (
    <group ref={g} position={position}>
      <mesh {...handlers} position={[0, 0.4, 0]}>
        <sphereGeometry args={[1.0, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Socle carré */}
      <mesh material={m.dark} position={[0, 0.06, 0]}>
        <boxGeometry args={[1.1, 0.12, 1.1]} />
      </mesh>
      {/* Cube principal pivoté à 45° */}
      <mesh ref={cube} material={m.body} position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.85, 0.85, 0.85]} />
      </mesh>
      {/* Petit cube décoratif au sommet */}
      <mesh material={m.accent} position={[0, 1.08, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
      </mesh>
      {/* Anneaux orbitaux (axes différents → silhouette dynamique) */}
      <mesh ref={orbA} material={m.accent} position={[0, 0.55, 0]}>
        <torusGeometry args={[0.7, 0.018, 8, 48]} />
      </mesh>
      <mesh ref={orbB} material={m.accent} position={[0, 0.55, 0]}>
        <torusGeometry args={[0.85, 0.014, 8, 48]} />
      </mesh>
    </group>
  );
}

/* ===== HEBERGEMENT — nef longue + 3 cheminées + cadran (machines) ===== */

function HebergementBuilding({ position, hovered, dimmed, ...handlers }: BuildingProps) {
  const g = useRef<THREE.Group>(null);
  const dial = useRef<THREE.Mesh>(null);
  const m = usePoleMaterials("hebergement");

  useEffect(() => () => { m.body.dispose(); m.dark.dispose(); m.accent.dispose(); m.glow.dispose(); }, [m]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g.current) {
      const ty = Math.sin(t * 0.45 + 2) * 0.025 + (hovered ? 0.12 : 0);
      g.current.position.y += (ty - g.current.position.y) * 0.1;
      const sc = hovered ? 1.07 : 1;
      g.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }
    if (dial.current) dial.current.rotation.z = -t * 0.6;
    m.body.emissiveIntensity = hovered ? 0.4 : 0.18;
    m.accent.emissiveIntensity = hovered ? 1.1 : 0.6;
    const op = dimmed ? 0.45 : 1;
    m.body.opacity += (op - m.body.opacity) * 0.1; m.body.transparent = m.body.opacity < 0.99;
  });

  return (
    <group ref={g} position={position}>
      <mesh {...handlers} position={[0, 0.45, 0]}>
        <boxGeometry args={[1.5, 1.0, 0.9]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Socle */}
      <mesh material={m.dark} position={[0, 0.06, 0]}>
        <boxGeometry args={[1.4, 0.12, 0.85]} />
      </mesh>
      {/* Corps long et bas */}
      <mesh material={m.body} position={[0, 0.32, 0]}>
        <boxGeometry args={[1.3, 0.42, 0.75]} />
      </mesh>
      {/* Toit demi-cylindre (silhouette unique) */}
      <mesh material={m.body} position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.32, 16, 1, true, 0, Math.PI]} />
      </mesh>
      {/* Faîtière brillante */}
      <mesh material={m.accent} position={[0, 1.0, 0]}>
        <boxGeometry args={[1.32, 0.04, 0.04]} />
      </mesh>
      {/* 3 cheminées rondes en ligne */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <group key={i} position={[x, 1.05, -0.2]}>
          <mesh material={m.dark}>
            <cylinderGeometry args={[0.08, 0.09, 0.32, 12]} />
          </mesh>
          <mesh material={m.accent} position={[0, 0.18, 0]}>
            <torusGeometry args={[0.09, 0.018, 8, 16]} />
          </mesh>
        </group>
      ))}
      {/* Cadran rotatif sur la façade */}
      <group position={[0.45, 0.42, 0.39]}>
        <mesh material={m.accent}>
          <cylinderGeometry args={[0.13, 0.13, 0.03, 20]} rotation={[Math.PI/2,0,0] as any}/>
        </mesh>
        <mesh ref={dial} position={[0, 0, 0.02]}>
          <boxGeometry args={[0.1, 0.012, 0.012]} />
          <meshBasicMaterial color="#3a2418" />
        </mesh>
      </group>
      {/* Bandes de fenêtres latérales */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <mesh key={"w"+i} material={m.glow} position={[x, 0.32, 0.39]}>
          <boxGeometry args={[0.18, 0.18, 0.01]} />
        </mesh>
      ))}
    </group>
  );
}

/* ===== IA — tour cylindrique + halo + cristal (centrale stylisée) ===== */

function IABuilding({ position, hovered, dimmed, ...handlers }: BuildingProps) {
  const g = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const ico = useRef<THREE.Mesh>(null);
  const ringR = useRef<THREE.Mesh>(null);
  const m = usePoleMaterials("ia");

  useEffect(() => () => { m.body.dispose(); m.dark.dispose(); m.accent.dispose(); m.glow.dispose(); }, [m]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g.current) {
      const ty = Math.sin(t * 0.7) * 0.04 + (hovered ? 0.12 : 0);
      g.current.position.y += (ty - g.current.position.y) * 0.1;
      const sc = hovered ? 1.07 : 1;
      g.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }
    if (halo.current) {
      const pulse = 1 + (Math.sin(t * 2.2) * 0.5 + 0.5) * 0.2;
      halo.current.scale.setScalar(pulse);
    }
    if (ico.current) { ico.current.rotation.y = t * 0.4; ico.current.rotation.x = t * 0.25; }
    if (ringR.current) ringR.current.rotation.z = t * 0.6;
    m.body.emissiveIntensity = hovered ? 0.55 : 0.25;
    m.accent.emissiveIntensity = hovered ? 1.2 : 0.7;
    const op = dimmed ? 0.45 : 1;
    m.body.opacity += (op - m.body.opacity) * 0.1; m.body.transparent = m.body.opacity < 0.99;
  });

  return (
    <group ref={g} position={position}>
      <mesh {...handlers} position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.0, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Socle circulaire */}
      <mesh material={m.dark} position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.7, 0.75, 0.12, 24]} />
      </mesh>
      {/* Tour cylindrique trapue */}
      <mesh material={m.body} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.4, 24]} />
      </mesh>
      {/* Anneau brillant */}
      <mesh material={m.accent} position={[0, 0.52, 0]}>
        <torusGeometry args={[0.55, 0.025, 10, 32]} />
      </mesh>
      {/* Cristal-icosaèdre flottant (cœur IA) */}
      <mesh ref={ico} material={m.accent} position={[0, 0.85, 0]}>
        <icosahedronGeometry args={[0.3, 0]} />
      </mesh>
      {/* Halo */}
      <mesh ref={halo} position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color={POLES.ia.colorBright} transparent opacity={0.18} side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Anneau d'énergie incliné */}
      <mesh ref={ringR} material={m.accent} position={[0, 0.85, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.55, 0.012, 8, 48]} />
      </mesh>
    </group>
  );
}

/* ───────────── Building props ───────────── */

type BuildingProps = {
  position: THREE.Vector3;
  hovered: boolean;
  dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
};

function PoleBuilding({ id, ...rest }: BuildingProps & { id: PoleId }) {
  if (id === "conseil") return <ConseilBuilding {...rest} />;
  if (id === "dev") return <DevBuilding {...rest} />;
  if (id === "hebergement") return <HebergementBuilding {...rest} />;
  return <IABuilding {...rest} />;
}

/* ───────────── Connexion = arc lumineux fin (pas de particules) ───────────── */

function PoleArc({ from, to, color, highlighted }: {
  from: [number, number, number]; to: [number, number, number];
  color: string; highlighted: boolean;
}) {
  const lineRef = useRef<any>(null);
  const points = useMemo(() => {
    const a = v3(from); const b = v3(to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y += 0.6;
    const dir = b.clone().sub(a).normalize();
    const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
    mid.add(perp.multiplyScalar(0.25));
    return new THREE.CatmullRomCurve3([a, mid, b]).getPoints(40);
  }, [from, to]);

  useFrame(() => {
    if (lineRef.current?.material) {
      const mat = lineRef.current.material;
      const tgt = highlighted ? 0.9 : 0.25;
      mat.opacity += (tgt - mat.opacity) * 0.1;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={highlighted ? 1.8 : 1}
      transparent
      opacity={0.25}
      dashed={false}
    />
  );
}

/* ───────────── Camera Rig ───────────── */

const HOME_POS = new THREE.Vector3(0, 4, 8);
const HOME_TARGET = new THREE.Vector3(0, 0.4, 0);

function CameraRig({ activeId, controlsRef }: { activeId: PoleId | null; controlsRef: React.MutableRefObject<any>; }) {
  const { camera } = useThree();
  const animRef = useRef({
    fromPos: new THREE.Vector3(), toPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(), toTarget: new THREE.Vector3(),
    start: 0, duration: 1.3, active: false,
  });
  useEffect(() => {
    const a = animRef.current;
    a.fromPos.copy(camera.position);
    a.fromTarget.copy(controlsRef.current?.target ?? HOME_TARGET);
    if (activeId) {
      a.toPos.set(0, 2.6, 5.2);
      a.toTarget.set(0, 0.5, 0);
    } else {
      a.toPos.copy(HOME_POS);
      a.toTarget.copy(HOME_TARGET);
    }
    a.start = performance.now() / 1000;
    a.active = true;
  }, [activeId, camera, controlsRef]);
  useFrame((state) => {
    const a = animRef.current;
    if (!a.active) return;
    const t = (state.clock.elapsedTime - a.start) / a.duration;
    if (t >= 1) {
      camera.position.copy(a.toPos);
      if (controlsRef.current) controlsRef.current.target.copy(a.toTarget);
      a.active = false; return;
    }
    const e = easeOutQuart(Math.min(Math.max(t, 0), 1));
    camera.position.lerpVectors(a.fromPos, a.toPos, e);
    if (controlsRef.current) {
      (controlsRef.current.target as THREE.Vector3).lerpVectors(a.fromTarget, a.toTarget, e);
      controlsRef.current.update();
    }
  });
  return null;
}

/* ───────────── Lights ───────────── */

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} color="#dde3ff" />
      <directionalLight position={[5, 8, 4]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, 5, -3]} intensity={0.3} color="#a0b4ff" />
    </>
  );
}

/* ───────────── Hover Label ───────────── */

function PoleLabel({ id, onCta }: { id: PoleId; onCta: () => void }) {
  const p = POLES[id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        pointerEvents: "auto",
      }}
    >
      <div style={{
        padding: "9px 16px",
        background: "rgba(8,12,30,.88)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        border: `1.5px solid ${p.color}`,
        borderRadius: 12,
        boxShadow: `0 12px 32px rgba(0,0,0,.55), 0 0 26px ${p.color}55`,
        color: "#fff",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        textAlign: "center", whiteSpace: "nowrap",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: p.color, marginBottom: 2 }}>
          {p.kicker}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          {p.title}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onCta(); }}
        style={{
          appearance: "none", border: 0, cursor: "pointer",
          padding: "10px 18px",
          background: p.color, color: "#0a1432",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          fontSize: 13, fontWeight: 700,
          borderRadius: 999,
          display: "inline-flex", alignItems: "center", gap: 7,
          boxShadow: `0 8px 22px ${p.color}66, 0 0 0 1px rgba(255,255,255,.18) inset`,
        }}
      >
        Découvrir le pôle
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </motion.div>
  );
}

/* ───────────── Scene ───────────── */

function Scene({
  hoveredId, activeId, setHoveredId, setActiveId, onCta,
}: {
  hoveredId: PoleId | null; activeId: PoleId | null;
  setHoveredId: (id: PoleId | null) => void;
  setActiveId: (id: PoleId | null) => void;
  onCta: (id: PoleId) => void;
}) {
  const controlsRef = useRef<any>(null);
  const orbitRef = useRef(0);

  useFrame((_, dt) => { if (activeId) orbitRef.current += dt * 0.32; });

  const computePos = (id: PoleId): THREE.Vector3 => {
    const base = v3(POLES[id].basePosition);
    if (!activeId) return base;
    if (id === activeId) return new THREE.Vector3(0, 0.4, 0);
    const others: PoleId[] = (Object.keys(POLES) as PoleId[]).filter((x) => x !== activeId);
    const idx = others.indexOf(id);
    const total = others.length;
    const radius = 3.6;
    const angle = orbitRef.current + (idx * Math.PI * 2) / total;
    return new THREE.Vector3(Math.cos(angle) * radius, 0.25 + Math.sin(orbitRef.current + idx) * 0.08, Math.sin(angle) * radius);
  };

  const positionsRef = useRef<Record<PoleId, THREE.Vector3>>({
    conseil: v3(POLES.conseil.basePosition),
    dev: v3(POLES.dev.basePosition),
    hebergement: v3(POLES.hebergement.basePosition),
    ia: v3(POLES.ia.basePosition),
  });

  useFrame(() => {
    (Object.keys(POLES) as PoleId[]).forEach((id) => {
      positionsRef.current[id].lerp(computePos(id), 0.07);
    });
  });

  // positions arrays for arcs (refreshed periodically)
  const [positions, setPositions] = useState<Record<PoleId, [number, number, number]>>(() => ({
    conseil: POLES.conseil.basePosition, dev: POLES.dev.basePosition,
    hebergement: POLES.hebergement.basePosition, ia: POLES.ia.basePosition,
  }));
  const posTimer = useRef(0);
  useFrame((_, dt) => {
    posTimer.current += dt;
    if (posTimer.current > 0.1) {
      posTimer.current = 0;
      setPositions({
        conseil: positionsRef.current.conseil.toArray() as [number, number, number],
        dev: positionsRef.current.dev.toArray() as [number, number, number],
        hebergement: positionsRef.current.hebergement.toArray() as [number, number, number],
        ia: positionsRef.current.ia.toArray() as [number, number, number],
      });
    }
  });

  const handleOver = (id: PoleId) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation(); setHoveredId(id); document.body.style.cursor = "pointer";
  };
  const handleOut = (id: PoleId) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation(); setHoveredId(null); document.body.style.cursor = "";
  };
  const handleClick = (id: PoleId) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (activeId === id) setActiveId(null); else setActiveId(id);
  };

  const isFocus = (id: PoleId) => hoveredId === id || activeId === id;
  const isDimmed = (id: PoleId) => {
    const focal = activeId ?? hoveredId;
    return focal !== null && focal !== id;
  };

  const hoverPos = hoveredId ? positionsRef.current[hoveredId] : null;

  return (
    <>
      <PerspectiveCamera makeDefault fov={45} position={HOME_POS.toArray()} />
      <OrbitControls
        ref={controlsRef}
        enableDamping dampingFactor={0.1}
        enablePan={false} autoRotate={false}
        minPolarAngle={(35 * Math.PI) / 180}
        maxPolarAngle={(80 * Math.PI) / 180}
        minDistance={5} maxDistance={12}
        target={HOME_TARGET.toArray()}
      />
      <CameraRig activeId={activeId} controlsRef={controlsRef} />
      <SceneLights />

      {(Object.keys(POLES) as PoleId[]).map((id) => (
        <PoleBuilding
          key={id} id={id}
          position={positionsRef.current[id]}
          hovered={isFocus(id)}
          dimmed={isDimmed(id)}
          onPointerOver={handleOver(id)}
          onPointerOut={handleOut(id)}
          onClick={handleClick(id)}
        />
      ))}

      {/* Arcs entre les pôles */}
      <PoleArc from={positions.conseil} to={positions.dev} color={POLES.conseil.colorBright} highlighted={isFocus("conseil") || isFocus("dev")} />
      <PoleArc from={positions.dev} to={positions.hebergement} color={POLES.dev.colorBright} highlighted={isFocus("dev") || isFocus("hebergement")} />
      <PoleArc from={positions.hebergement} to={positions.conseil} color={POLES.hebergement.colorBright} highlighted={isFocus("hebergement") || isFocus("conseil")} />
      <PoleArc from={positions.ia} to={positions.conseil} color={POLES.ia.colorBright} highlighted={isFocus("ia")} />
      <PoleArc from={positions.ia} to={positions.dev} color={POLES.ia.colorBright} highlighted={isFocus("ia")} />
      <PoleArc from={positions.ia} to={positions.hebergement} color={POLES.ia.colorBright} highlighted={isFocus("ia")} />

      {hoveredId && hoverPos && (
        <Html
          position={[hoverPos.x, hoverPos.y + 1.7, hoverPos.z]}
          center distanceFactor={6}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <PoleLabel id={hoveredId} onCta={() => onCta(hoveredId)} />
        </Html>
      )}

      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.45} luminanceSmoothing={0.7} radius={0.55} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/* ───────────── Skeleton ───────────── */

function FactorySkeleton() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "grid", placeItems: "center",
      color: "rgba(255,255,255,.35)",
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#6a7dff", boxShadow: "0 0 12px #6a7dff",
          animation: "ftd-pulse 1.4s ease-in-out infinite",
        }}/>
        Initialisation
      </div>
      <style>{`@keyframes ftd-pulse{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
    </div>
  );
}

/* ───────────── Composant exporté ───────────── */

export function FactoryTopDown() {
  const [hoveredId, setHoveredId] = useState<PoleId | null>(null);
  const [activeId, setActiveId] = useState<PoleId | null>(null);

  const onCta = (id: PoleId) => {
    if (typeof window !== "undefined") window.location.assign(POLES[id].href);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        background: "transparent",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setActiveId(null); }}
    >
      <Suspense fallback={<FactorySkeleton />}>
        <Canvas
          shadows={false}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ position: "absolute", inset: 0, background: "transparent" }}
        >
          <Scene
            hoveredId={hoveredId}
            activeId={activeId}
            setHoveredId={setHoveredId}
            setActiveId={setActiveId}
            onCta={onCta}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default FactoryTopDown;
