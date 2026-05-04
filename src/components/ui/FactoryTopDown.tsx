"use client";

/**
 * FactoryTopDown.tsx
 * ------------------------------------------------------------------
 * R3F scene avec 4 pôles 3D uniques, caméra perspective, profondeur
 * de champ réelle, connexions courbes animées, post-processing Bloom.
 *
 * Stack : Next.js 15 / TS strict / @react-three/fiber / @react-three/drei
 *         / @react-three/postprocessing / framer-motion
 *
 * Le composant exporté est <FactoryTopDown />. Il occupe 100 % de la
 * largeur de son parent avec un aspect-ratio 1/1 ; le parent gère le
 * positionnement.
 * ------------------------------------------------------------------
 */

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Line,
  Html,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
// import { useRouter } from "@/navigation"; // décommenter dans le projet réel

/* ─────────────────────────────────────────────────────────────────
 *  Données pôles
 * ───────────────────────────────────────────────────────────────── */

export const POLES = {
  conseil: {
    title: "Conseil & Transformation",
    kicker: "Pôle 01 — Conseil",
    desc: "Cadrage stratégique, design produit et transformation des organisations. Du diagnostic à la mise en mouvement.",
    stats: [
      { v: "+40", k: "Projets/an" },
      { v: "12", k: "Experts" },
    ],
    color: "#ef8336",
    position: [-4.5, 0, 3] as [number, number, number],
    href: "/nos-poles/conseil",
  },
  dev: {
    title: "Développement",
    kicker: "Pôle 02 — Build",
    desc: "Ingénierie logicielle, plateformes web & mobile, architectures évolutives livrées en cycles courts.",
    stats: [
      { v: "120+", k: "Projets/an" },
      { v: "38", k: "Experts" },
    ],
    color: "#6a7dff",
    position: [0, 0, 0] as [number, number, number],
    href: "/nos-poles/developpement",
  },
  hebergement: {
    title: "DevOps & Infrastructure",
    kicker: "Pôle 03 — Run",
    desc: "Hébergement, SRE et automatisation : un socle production-ready, observable, sécurisé 24/7.",
    stats: [
      { v: "99.98%", k: "Uptime" },
      { v: "9", k: "Experts" },
    ],
    color: "#f5cb35",
    position: [4.5, 0, 3] as [number, number, number],
    href: "/nos-poles/hebergement",
  },
  ia: {
    title: "Nos Agents IA",
    kicker: "Pôle 04 — IA",
    desc: "Agents et copilotes sur-mesure, intégrés au cœur des opérations métier. Du POC à la production.",
    stats: [
      { v: "20+", k: "Agents livrés" },
      { v: "11", k: "Experts" },
    ],
    color: "#5cc996",
    position: [0, 3.5, -2] as [number, number, number],
    href: "/produits",
  },
} as const;

export type PoleId = keyof typeof POLES;

/* ─────────────────────────────────────────────────────────────────
 *  Helpers
 * ───────────────────────────────────────────────────────────────── */

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function lerpVec3(out: THREE.Vector3, a: THREE.Vector3, b: THREE.Vector3, t: number) {
  out.x = a.x + (b.x - a.x) * t;
  out.y = a.y + (b.y - a.y) * t;
  out.z = a.z + (b.z - a.z) * t;
  return out;
}

/* ─────────────────────────────────────────────────────────────────
 *  Pôle Conseil — empilement de plateaux décroissants
 * ───────────────────────────────────────────────────────────────── */

function ConseilPole({
  position,
  hovered,
  dimmed,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  position: [number, number, number];
  hovered: boolean;
  dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const plates = useRef<THREE.Mesh[]>([]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ef8336",
        metalness: 0.3,
        roughness: 0.5,
        emissive: new THREE.Color("#ef8336"),
        emissiveIntensity: 0.15,
        clearcoat: 0.4,
      }),
    [],
  );

  const wireGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    return new THREE.WireframeGeometry(box);
  }, []);

  const wireMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#ffd1a8", transparent: true, opacity: 0.85 }),
    [],
  );

  useEffect(() => () => {
    material.dispose();
    wireGeo.dispose();
    wireMat.dispose();
  }, [material, wireGeo, wireMat]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const targetY = hovered ? 0.4 : dimmed ? -0.1 : 0;
    if (groupRef.current) {
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
    }
    plates.current.forEach((p, i) => {
      if (!p) return;
      const base = i * 0.45;
      p.position.y = base + Math.sin(t * 1.4 - i * 0.3) * 0.04;
    });
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.6;
      wireRef.current.position.y = 1.55 + Math.sin(t * 1.2) * 0.05;
    }
    const targetOpacity = dimmed ? 0.55 : 1;
    material.opacity += (targetOpacity - material.opacity) * 0.1;
    material.transparent = material.opacity < 0.99;
    material.emissiveIntensity = hovered ? 0.45 : 0.15;
  });

  const plateRadii = [1.05, 0.85, 0.65];

  return (
    <group ref={groupRef} position={position}>
      <mesh
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        {/* Hit-box generous */}
        <cylinderGeometry args={[1.2, 1.2, 2, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {plateRadii.map((r, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) plates.current[i] = el;
          }}
          material={material}
          castShadow
          receiveShadow
          position={[0, i * 0.45, 0]}
        >
          <cylinderGeometry args={[r, r * 0.95, 0.18, 48]} />
        </mesh>
      ))}
      {/* Petite tour centrale */}
      <mesh material={material} position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.5, 16]} />
      </mesh>
      {/* Wireframe cube qui flotte */}
      <lineSegments ref={wireRef} geometry={wireGeo} material={wireMat} />
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Pôle Développement — rack/serveur (anneaux + piliers)
 * ───────────────────────────────────────────────────────────────── */

function DevPole({
  position,
  hovered,
  dimmed,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  position: [number, number, number];
  hovered: boolean;
  dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const RING_COUNT = 6;

  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1a2360",
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 1,
        emissive: new THREE.Color("#6a7dff"),
        emissiveIntensity: 0.25,
      }),
    [],
  );

  const pillarMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0e1542",
        metalness: 0.6,
        roughness: 0.3,
      }),
    [],
  );

  useEffect(
    () => () => {
      mat.dispose();
      pillarMat.dispose();
    },
    [mat, pillarMat],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const targetY = hovered ? 0.4 : dimmed ? -0.1 : 0;
    if (groupRef.current) {
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
    }
    ringsRef.current.forEach((r, i) => {
      if (!r) return;
      const sign = i % 2 === 0 ? 1 : -1;
      r.rotation.z += 0.003 * sign;
    });
    const pulse = 0.25 + (Math.sin(t * 2) * 0.5 + 0.5) * 0.2;
    mat.emissiveIntensity = hovered ? 0.6 : pulse;
    const targetOpacity = dimmed ? 0.55 : 1;
    mat.opacity += (targetOpacity - mat.opacity) * 0.1;
    mat.transparent = mat.opacity < 0.99;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <cylinderGeometry args={[1, 1, 3, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Axe central */}
      <mesh material={mat} position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.6, 24]} />
      </mesh>

      {/* Anneaux empilés */}
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) ringsRef.current[i] = el;
          }}
          material={mat}
          position={[0, 0.2 + i * 0.42, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.7, 0.05, 12, 48]} />
        </mesh>
      ))}

      {/* 4 piliers fins */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        const x = Math.cos(a) * 0.7;
        const z = Math.sin(a) * 0.7;
        return (
          <mesh key={i} material={pillarMat} position={[x, 1.25, z]}>
            <boxGeometry args={[0.06, 2.4, 0.06]} />
          </mesh>
        );
      })}

      {/* Socle */}
      <mesh material={mat} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.85, 0.95, 0.1, 32]} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Pôle Hébergement — silo + antenne + particules ascendantes
 * ───────────────────────────────────────────────────────────────── */

function HebergementPole({
  position,
  hovered,
  dimmed,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  position: [number, number, number];
  hovered: boolean;
  dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const PARTICLE_COUNT = 24;

  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f5cb35",
        metalness: 0.8,
        roughness: 0.15,
        emissive: new THREE.Color("#f5cb35"),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f5cb35",
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      }),
    [],
  );

  const particleGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 1] = Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const particleMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#ffe187",
        size: 0.07,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      mat.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    },
    [mat, wireMat, particleGeo, particleMat],
  );

  useFrame(() => {
    const targetY = hovered ? 0.4 : dimmed ? -0.1 : 0;
    if (groupRef.current) {
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
    }
    if (outerRef.current) outerRef.current.rotation.y += 0.005;

    // Particles
    if (particlesRef.current) {
      const arr = (particlesRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const speed = hovered ? 0.05 : 0.018;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3 + 1] += speed;
        if (arr[i * 3 + 1] > 2.4) {
          arr[i * 3 + 1] = 1.6;
          arr[i * 3 + 0] = (Math.random() - 0.5) * 0.05;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
        }
      }
      (particlesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    mat.emissiveIntensity = hovered ? 0.5 : 0.2;
    const targetOpacity = dimmed ? 0.55 : 1;
    mat.opacity += (targetOpacity - mat.opacity) * 0.1;
    mat.transparent = mat.opacity < 0.99;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <cylinderGeometry args={[1, 1, 2.8, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Cylindre intérieur plein */}
      <mesh material={mat} position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 1.4, 32]} />
      </mesh>

      {/* Cylindre extérieur en wireframe */}
      <mesh ref={outerRef} material={wireMat} position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.85, 0.9, 1.55, 24, 4, true]} />
      </mesh>

      {/* Couronnes haut/bas */}
      <mesh material={mat} position={[0, 1.5, 0]}>
        <torusGeometry args={[0.85, 0.06, 12, 36]} />
      </mesh>
      <mesh material={mat} position={[0, 0, 0]}>
        <torusGeometry args={[0.9, 0.06, 12, 36]} />
      </mesh>

      {/* Antenne */}
      <mesh material={mat} position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 12]} />
      </mesh>
      <mesh material={mat} position={[0, 2.15, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Particules */}
      <points ref={particlesRef} geometry={particleGeo} material={particleMat} />
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Pôle IA — icosaèdre cristallin + 3 anneaux orbitaux
 * ───────────────────────────────────────────────────────────────── */

function IAPole({
  position,
  hovered,
  dimmed,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  position: [number, number, number];
  hovered: boolean;
  dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringX = useRef<THREE.Mesh>(null);
  const ringY = useRef<THREE.Mesh>(null);
  const ringZ = useRef<THREE.Mesh>(null);

  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#5cc996",
        metalness: 0.1,
        roughness: 0.0,
        transmission: 0.4,
        thickness: 0.6,
        emissive: new THREE.Color("#5cc996"),
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.9,
      }),
    [],
  );

  const coreMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#c8ffe2",
      }),
    [],
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#5cc996",
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      }),
    [],
  );

  useEffect(
    () => () => {
      mat.dispose();
      coreMat.dispose();
      ringMat.dispose();
    },
    [mat, coreMat, ringMat],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const targetY = hovered ? 0.4 : dimmed ? -0.1 : 0;
    if (groupRef.current) {
      const target = position[1] + targetY + Math.sin(t * 0.8) * 0.08;
      groupRef.current.position.y += (target - groupRef.current.position.y) * 0.08;
    }
    if (icoRef.current) icoRef.current.rotation.y += 0.004;
    if (coreRef.current) {
      const s = 1 + (Math.sin(t * 3) * 0.5 + 0.5) * 0.6;
      coreRef.current.scale.setScalar(s);
    }
    if (ringX.current) ringX.current.rotation.x += 0.006;
    if (ringY.current) ringY.current.rotation.y += 0.0045;
    if (ringZ.current) ringZ.current.rotation.z += 0.005;
    mat.emissiveIntensity = hovered ? 0.7 : 0.4;
    const targetOpacity = dimmed ? 0.45 : 0.9;
    mat.opacity += (targetOpacity - mat.opacity) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <sphereGeometry args={[1.4, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={icoRef} material={mat}>
        <icosahedronGeometry args={[0.7, 1]} />
      </mesh>

      <mesh ref={coreRef} material={coreMat}>
        <sphereGeometry args={[0.18, 16, 16]} />
      </mesh>

      <mesh ref={ringX} material={ringMat} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[1.0, 0.012, 8, 80]} />
      </mesh>
      <mesh ref={ringY} material={ringMat} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.15, 0.012, 8, 80]} />
      </mesh>
      <mesh ref={ringZ} material={ringMat} rotation={[Math.PI / 2, 0, Math.PI / 3]}>
        <torusGeometry args={[1.3, 0.012, 8, 80]} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Connexion principale (tube courbe + particules le long de la courbe)
 * ───────────────────────────────────────────────────────────────── */

function MainConnection({
  from,
  to,
  color,
  highlighted,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  highlighted: boolean;
}) {
  const PARTICLE_COUNT = 8;
  const tubeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const tRef = useRef<number[]>([]);

  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const dist = a.distanceTo(b);
    // Arc ascendant + courbure latérale légère
    mid.y += Math.min(dist * 0.35, 1.6);
    // léger biais perpendiculaire pour éviter les tubes plats
    const dir = b.clone().sub(a).normalize();
    const perp = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(0.4);
    mid.add(perp);
    return new THREE.CatmullRomCurve3([a, mid, b], false, "catmullrom", 0.5);
  }, [from, to]);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.04, 12, false), [curve]);

  const tubeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.25,
      }),
    [color],
  );

  const particleGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const ts: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = i / PARTICLE_COUNT;
      ts.push(t);
      const p = curve.getPointAt(t);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }
    tRef.current = ts;
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [curve]);

  const particleMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color,
        size: 0.08,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    [color],
  );

  useEffect(
    () => () => {
      tubeGeo.dispose();
      tubeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    },
    [tubeGeo, tubeMat, particleGeo, particleMat],
  );

  useFrame(() => {
    const targetOpacity = highlighted ? 1.0 : 0.25;
    tubeMat.opacity += (targetOpacity - tubeMat.opacity) * 0.1;
    particleMat.size = highlighted ? 0.12 : 0.08;

    const speed = highlighted ? 0.009 : 0.003;
    if (particlesRef.current) {
      const arr = (particlesRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        tRef.current[i] = (tRef.current[i] + speed) % 1;
        const p = curve.getPointAt(tRef.current[i]);
        arr[i * 3] = p.x;
        arr[i * 3 + 1] = p.y;
        arr[i * 3 + 2] = p.z;
      }
      (particlesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <>
      <mesh ref={tubeRef} geometry={tubeGeo} material={tubeMat} />
      <points ref={particlesRef} geometry={particleGeo} material={particleMat} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Connexion IA — ligne pointillée animée
 * ───────────────────────────────────────────────────────────────── */

function IAConnection({
  from,
  to,
  color,
  pulse,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  pulse: boolean;
}) {
  const lineRef = useRef<any>(null);
  const points = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y += 0.6;
    const curve = new THREE.CatmullRomCurve3([a, mid, b]);
    return curve.getPoints(40);
  }, [from, to]);

  const tRef = useRef(0);

  useFrame((_, dt) => {
    tRef.current += dt;
    if (lineRef.current && lineRef.current.material) {
      const m = lineRef.current.material;
      m.dashOffset = -tRef.current * (pulse ? 1.2 : 0.4);
      const targetOpacity = pulse ? 0.95 : 0.4;
      m.opacity += (targetOpacity - m.opacity) * 0.1;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={1.5}
      dashed
      dashSize={0.18}
      gapSize={0.12}
      transparent
      opacity={0.4}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Caméra animée (lerp vers les pôles)
 * ───────────────────────────────────────────────────────────────── */

const HOME_POS = new THREE.Vector3(0, 4, 14);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);

function CameraRig({
  activeId,
  controlsRef,
}: {
  activeId: PoleId | null;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  const animRef = useRef<{
    fromPos: THREE.Vector3;
    toPos: THREE.Vector3;
    fromTarget: THREE.Vector3;
    toTarget: THREE.Vector3;
    start: number;
    duration: number;
    active: boolean;
  }>({
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(),
    toTarget: new THREE.Vector3(),
    start: 0,
    duration: 1.8,
    active: false,
  });

  useEffect(() => {
    const a = animRef.current;
    a.fromPos.copy(camera.position);
    a.fromTarget.copy(controlsRef.current?.target ?? HOME_TARGET);
    if (activeId) {
      const p = POLES[activeId].position;
      a.toPos.set(p[0] * 0.6, p[1] + 2, p[2] + 5);
      a.toTarget.set(p[0], p[1], p[2]);
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
      a.active = false;
      return;
    }
    const e = easeOutQuart(Math.min(Math.max(t, 0), 1));
    lerpVec3(camera.position, a.fromPos, a.toPos, e);
    if (controlsRef.current) {
      const tgt = controlsRef.current.target as THREE.Vector3;
      lerpVec3(tgt, a.fromTarget, a.toTarget, e);
      controlsRef.current.update();
    }
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────────
 *  Lights animées (intensité hover)
 * ───────────────────────────────────────────────────────────────── */

function PoleLights({ hoveredId }: { hoveredId: PoleId | null }) {
  const orange = useRef<THREE.PointLight>(null);
  const blue = useRef<THREE.PointLight>(null);
  const yellow = useRef<THREE.PointLight>(null);
  const green = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const lerp = (cur: number, target: number) => cur + (target - cur) * 0.1;
    if (orange.current) orange.current.intensity = lerp(orange.current.intensity, hoveredId === "conseil" ? 2.0 : 0.0);
    if (blue.current) blue.current.intensity = lerp(blue.current.intensity, hoveredId === "dev" ? 2.0 : 0.4);
    if (yellow.current) yellow.current.intensity = lerp(yellow.current.intensity, hoveredId === "hebergement" ? 2.0 : 0.0);
    if (green.current) green.current.intensity = lerp(green.current.intensity, hoveredId === "ia" ? 2.0 : 0.8);
  });

  return (
    <>
      <ambientLight intensity={0.3} color="#1a2040" />
      <directionalLight position={[8, 12, 6]} intensity={1.2} castShadow color="#ffffff" />
      <pointLight ref={orange} position={POLES.conseil.position} color="#ef8336" intensity={0} distance={10} decay={2} />
      <pointLight ref={blue} position={[0, 2, 0]} color="#6a7dff" intensity={0.4} distance={10} decay={2} />
      <pointLight ref={yellow} position={POLES.hebergement.position} color="#f5cb35" intensity={0} distance={10} decay={2} />
      <pointLight ref={green} position={POLES.ia.position} color="#5cc996" intensity={0.8} distance={12} decay={2} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Scene
 * ───────────────────────────────────────────────────────────────── */

function Scene({
  hoveredId,
  activeId,
  setHoveredId,
  setActiveId,
  setDetailOpen,
}: {
  hoveredId: PoleId | null;
  activeId: PoleId | null;
  setHoveredId: (id: PoleId | null) => void;
  setActiveId: (id: PoleId | null) => void;
  setDetailOpen: (b: boolean) => void;
}) {
  const controlsRef = useRef<any>(null);

  // En mode focus, les 2 autres pôles principaux orbitent autour de l'actif
  const orbitRef = useRef(0);
  useFrame((_, dt) => {
    orbitRef.current += dt * 0.3;
  });

  const polePos = (id: PoleId): [number, number, number] => {
    const p = POLES[id].position;
    if (!activeId || activeId === "ia" || id === "ia" || id === activeId) return p;
    // orbit autour du pôle actif (uniquement entre conseil/dev/hebergement)
    const center = POLES[activeId].position;
    const order: PoleId[] = (["conseil", "dev", "hebergement"] as PoleId[]).filter((x) => x !== activeId);
    const idx = order.indexOf(id);
    if (idx < 0) return p;
    const angle = orbitRef.current + (idx * Math.PI * 2) / order.length;
    return [center[0] + Math.cos(angle) * 5, center[1], center[2] + Math.sin(angle) * 5];
  };

  const conseilPos = polePos("conseil");
  const devPos = polePos("dev");
  const hebPos = polePos("hebergement");
  const iaPos = POLES.ia.position;

  const handleOver = (id: PoleId) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredId(id);
    document.body.style.cursor = "pointer";
  };
  const handleOut = (id: PoleId) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (hoveredId === id) setHoveredId(null);
    document.body.style.cursor = "";
  };
  const handleClick = (id: PoleId) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActiveId(id);
    setDetailOpen(true);
  };

  const isFocused = (id: PoleId) => hoveredId === id || activeId === id;
  const isDimmed = (id: PoleId) => {
    const focal = activeId ?? hoveredId;
    return focal !== null && focal !== id;
  };

  // Connexions IA pulsent toutes quand IA est cliqué
  const iaActive = activeId === "ia";

  return (
    <>
      <PerspectiveCamera makeDefault fov={55} position={[0, 4, 14]} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        autoRotate={!activeId}
        autoRotateSpeed={0.25}
        minPolarAngle={(30 * Math.PI) / 180}
        maxPolarAngle={(75 * Math.PI) / 180}
        minAzimuthAngle={(-60 * Math.PI) / 180}
        maxAzimuthAngle={(60 * Math.PI) / 180}
        minDistance={6}
        maxDistance={22}
      />

      <CameraRig activeId={activeId} controlsRef={controlsRef} />
      <PoleLights hoveredId={hoveredId} />

      {/* Sol subtle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color="#0a1024" roughness={1} metalness={0} />
      </mesh>
      {/* Anneaux décoratifs au sol */}
      {[3, 6, 9, 12].map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.39, 0]}>
          <ringGeometry args={[r - 0.01, r, 96]} />
          <meshBasicMaterial color="#1a2350" transparent opacity={0.35} />
        </mesh>
      ))}

      {/* Pôles */}
      <ConseilPole
        position={conseilPos}
        hovered={isFocused("conseil")}
        dimmed={isDimmed("conseil")}
        onPointerOver={handleOver("conseil")}
        onPointerOut={handleOut("conseil")}
        onClick={handleClick("conseil")}
      />
      <DevPole
        position={devPos}
        hovered={isFocused("dev")}
        dimmed={isDimmed("dev")}
        onPointerOver={handleOver("dev")}
        onPointerOut={handleOut("dev")}
        onClick={handleClick("dev")}
      />
      <HebergementPole
        position={hebPos}
        hovered={isFocused("hebergement")}
        dimmed={isDimmed("hebergement")}
        onPointerOver={handleOver("hebergement")}
        onPointerOut={handleOut("hebergement")}
        onClick={handleClick("hebergement")}
      />
      <IAPole
        position={iaPos}
        hovered={isFocused("ia")}
        dimmed={isDimmed("ia")}
        onPointerOver={handleOver("ia")}
        onPointerOut={handleOut("ia")}
        onClick={handleClick("ia")}
      />

      {/* Connexions principales (tubes courbes) */}
      <MainConnection
        from={conseilPos}
        to={devPos}
        color={POLES.conseil.color}
        highlighted={isFocused("conseil") || isFocused("dev") || iaActive}
      />
      <MainConnection
        from={devPos}
        to={hebPos}
        color={POLES.hebergement.color}
        highlighted={isFocused("dev") || isFocused("hebergement") || iaActive}
      />
      <MainConnection
        from={conseilPos}
        to={hebPos}
        color={POLES.dev.color}
        highlighted={isFocused("conseil") || isFocused("hebergement") || iaActive}
      />

      {/* Connexions IA (lignes pointillées) */}
      <IAConnection from={iaPos} to={conseilPos} color={POLES.ia.color} pulse={isFocused("ia") || iaActive} />
      <IAConnection from={iaPos} to={devPos} color={POLES.ia.color} pulse={isFocused("ia") || iaActive} />
      <IAConnection from={iaPos} to={hebPos} color={POLES.ia.color} pulse={isFocused("ia") || iaActive} />

      {/* Tooltip 3D-anchored */}
      {hoveredId && !activeId && (
        <Html
          position={[
            POLES[hoveredId].position[0],
            POLES[hoveredId].position[1] + 2.4,
            POLES[hoveredId].position[2],
          ]}
          center
          distanceFactor={10}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: "none" }}
        >
          <PoleTooltip id={hoveredId} />
        </Html>
      )}

      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.6} radius={0.6} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Tooltip & Panel HTML overlay
 * ───────────────────────────────────────────────────────────────── */

function PoleTooltip({ id }: { id: PoleId }) {
  const p = POLES[id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        width: 200,
        padding: "10px 12px",
        background: "rgba(8,14,36,.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1px solid ${p.color}55`,
        borderRadius: 12,
        color: "#fff",
        boxShadow: `0 8px 28px rgba(0,0,0,.55), 0 0 0 1px ${p.color}22`,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: p.color,
          marginBottom: 4,
        }}
      >
        {p.kicker}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.01em" }}>
        {p.title}
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.45, color: "rgba(255,255,255,.7)" }}>
        {p.desc.length > 90 ? p.desc.slice(0, 88) + "…" : p.desc}
      </div>
    </motion.div>
  );
}

function DetailPanel({
  pole,
  open,
  onClose,
  onCta,
}: {
  pole: (typeof POLES)[PoleId] | null;
  open: boolean;
  onClose: () => void;
  onCta: () => void;
}) {
  return (
    <AnimatePresence>
      {open && pole && (
        <motion.div
          key="panel"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 60, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            right: "3%",
            transform: "translateY(-50%)",
            width: 320,
            background: "rgba(8,14,36,.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 18,
            padding: 22,
            color: "#fff",
            boxShadow: "0 30px 80px rgba(0,0,0,.6)",
            zIndex: 30,
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 30,
              height: 30,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 8,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              color: "rgba(255,255,255,.7)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: pole.color,
                boxShadow: `0 0 24px ${pole.color}aa, inset 0 0 0 1px rgba(255,255,255,.18)`,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.5)",
                }}
              >
                {pole.kicker}
              </div>
              <h3 style={{ margin: "3px 0 0", fontSize: 17, fontWeight: 700, letterSpacing: "-.01em" }}>
                {pole.title}
              </h3>
            </div>
          </div>

          <p style={{ margin: "0 0 16px", fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,.72)" }}>
            {pole.desc}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {pole.stats.map((s) => (
              <div
                key={s.k}
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: 11,
                  padding: "9px 11px",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.02em", color: pole.color }}>
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.5)",
                    marginTop: 2,
                  }}
                >
                  {s.k}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onCta}
            style={{
              appearance: "none",
              border: 0,
              cursor: "pointer",
              width: "100%",
              background: pole.color,
              color: "#0a1432",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 700,
              padding: "12px 14px",
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Découvrir le pôle
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Skeleton fallback
 * ───────────────────────────────────────────────────────────────── */

function FactorySkeleton() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(60% 50% at 50% 55%, #131c47 0%, #0a1024 60%, #06091a 100%)",
        display: "grid",
        placeItems: "center",
        color: "rgba(255,255,255,.35)",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontSize: 12,
        letterSpacing: ".18em",
        textTransform: "uppercase",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#6a7dff",
            boxShadow: "0 0 12px #6a7dff",
            animation: "ftd-pulse 1.4s ease-in-out infinite",
          }}
        />
        Initialisation
      </div>
      <style>{`@keyframes ftd-pulse{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Composant exporté
 * ───────────────────────────────────────────────────────────────── */

export function FactoryTopDown() {
  // const router = useRouter();
  const [hoveredId, setHoveredId] = useState<PoleId | null>(null);
  const [activeId, setActiveId] = useState<PoleId | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const closeAll = () => {
    setActiveId(null);
    setDetailOpen(false);
  };

  const onCta = () => {
    if (!activeId) return;
    // router.push(POLES[activeId].href);
    if (typeof window !== "undefined") window.location.assign(POLES[activeId].href);
  };

  const pole = activeId ? POLES[activeId] : null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        background:
          "radial-gradient(60% 50% at 50% 55%, #131c47 0%, #0a1024 60%, #06091a 100%)",
        borderRadius: 18,
        overflow: "hidden",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
      onClick={(e) => {
        // clic sur le fond -> reset
        if (e.target === e.currentTarget) closeAll();
      }}
    >
      <Suspense fallback={<FactorySkeleton />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Scene
            hoveredId={hoveredId}
            activeId={activeId}
            setHoveredId={setHoveredId}
            setActiveId={setActiveId}
            setDetailOpen={setDetailOpen}
          />
        </Canvas>
      </Suspense>

      <DetailPanel pole={pole} open={detailOpen} onClose={closeAll} onCta={onCta} />
    </div>
  );
}

export default FactoryTopDown;
