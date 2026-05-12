"use client";

/**
 * FactoryTopDown.tsx
 * ------------------------------------------------------------------
 * 4 bâtiments industriels métaphoriques, organisés autour d'un centre.
 *  - Conseil       : « La salle des plans » (verrière + tables)
 *  - Développement : « L'atelier de forge » (cheminée + étincelles)
 *  - Hébergement   : « La salle des machines » (nef + tuyaux + vapeur)
 *  - IA            : « La centrale abandonnée reconvertie » (turbine + écrans)
 *
 * - Pas de fond, pas de sol
 * - Connexions = flux de particules très subtils
 * - Au clic : caméra zoome ET les 3 autres pôles orbitent autour
 *   du pôle actif (rotation visible, lente)
 * - Au hover : grand label + bouton "Découvrir →" cliquable
 * ------------------------------------------------------------------
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
// import { useRouter } from "@/navigation";

/* ───────────── Data ───────────── */

export const POLES = {
  conseil: {
    title: "Conseil & Transformation",
    label: "La Salle des Plans",
    kicker: "Pôle 01 — Conseil",
    desc:
      "Cadrage stratégique, design produit et transformation des organisations. " +
      "Du diagnostic à la mise en mouvement.",
    stats: [
      { v: "+40", k: "Projets/an" },
      { v: "12", k: "Experts" },
    ],
    color: "#ef8336",
    colorBright: "#ffb46a",
    basePosition: [-5.5, 0, 1.5] as [number, number, number],
    href: "/nos-poles/conseil",
  },
  dev: {
    title: "Développement",
    label: "L'Atelier de Forge",
    kicker: "Pôle 02 — Build",
    desc:
      "Ingénierie logicielle, plateformes web & mobile, architectures évolutives " +
      "livrées en cycles courts.",
    stats: [
      { v: "120+", k: "Projets/an" },
      { v: "38", k: "Experts" },
    ],
    color: "#6a7dff",
    colorBright: "#9fb0ff",
    basePosition: [0, 0, -2.5] as [number, number, number],
    href: "/nos-poles/developpement",
  },
  hebergement: {
    title: "DevOps & Infrastructure",
    label: "La Salle des Machines",
    kicker: "Pôle 03 — Run",
    desc:
      "Hébergement, SRE et automatisation : un socle production-ready, " +
      "observable, sécurisé 24/7.",
    stats: [
      { v: "99.98%", k: "Uptime" },
      { v: "9", k: "Experts" },
    ],
    color: "#f5cb35",
    colorBright: "#ffe07a",
    basePosition: [5.5, 0, 1.5] as [number, number, number],
    href: "/nos-poles/hebergement",
  },
  ia: {
    title: "Nos Agents IA",
    label: "La Centrale Reconvertie",
    kicker: "Pôle 04 — IA",
    desc:
      "Agents et copilotes sur-mesure, intégrés au cœur des opérations métier. " +
      "Du POC à la production.",
    stats: [
      { v: "20+", k: "Agents livrés" },
      { v: "11", k: "Experts" },
    ],
    color: "#5cc996",
    colorBright: "#a3f0c9",
    basePosition: [0, 0, 4.5] as [number, number, number],
    href: "/produits",
  },
} as const;

export type PoleId = keyof typeof POLES;

/* ───────────── Helpers ───────────── */

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const v3 = (a: [number, number, number]) => new THREE.Vector3(...a);

/* =================================================================
 *  CONSEIL — La Salle des Plans
 *  Halle rectangulaire, toit en verrière à doubles pentes (croix),
 *  briques chaudes, intérieur lumineux (lumière naturelle diffuse).
 * ================================================================= */

function ConseilBuilding({
  position, hovered, dimmed,
  onPointerOver, onPointerOut, onClick,
}: {
  position: THREE.Vector3;
  hovered: boolean; dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerLight = useRef<THREE.PointLight>(null);

  const brickMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#b15a2a", roughness: 0.85, metalness: 0.05,
    emissive: new THREE.Color("#3a1408"), emissiveIntensity: 0.3,
  }), []);
  const trimMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#7a3818", roughness: 0.7, metalness: 0.1,
  }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffe8cc", metalness: 0.2, roughness: 0.05,
    transmission: 0.85, thickness: 0.6, ior: 1.4,
    emissive: new THREE.Color("#ffd9a8"), emissiveIntensity: 0.6,
    transparent: true, opacity: 0.85,
  }), []);
  const frameMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#3a2418", roughness: 0.6, metalness: 0.3,
  }), []);

  useEffect(() => () => {
    brickMat.dispose(); trimMat.dispose(); glassMat.dispose(); frameMat.dispose();
  }, [brickMat, trimMat, glassMat, frameMat]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (groupRef.current) {
      const tgt = hovered ? 0.25 : 0;
      groupRef.current.position.y += (tgt + Math.sin(t * 0.5) * 0.04 - groupRef.current.position.y) * 0.08;
      const sc = hovered ? 1.06 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }
    if (innerLight.current) innerLight.current.intensity = (hovered ? 4 : 2) + Math.sin(t * 1.2) * 0.2;
    glassMat.emissiveIntensity = hovered ? 1.1 : 0.6;
    const op = dimmed ? 0.5 : 1;
    brickMat.opacity += (op - brickMat.opacity) * 0.1; brickMat.transparent = brickMat.opacity < 0.99;
    trimMat.opacity += (op - trimMat.opacity) * 0.1; trimMat.transparent = trimMat.opacity < 0.99;
    glassMat.opacity += ((dimmed ? 0.4 : 0.85) - glassMat.opacity) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* hit-box */}
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick} position={[0, 0.5, 0]}>
        <boxGeometry args={[2.6, 1.8, 1.8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Soubassement */}
      <mesh material={trimMat} position={[0, 0.05, 0]}>
        <boxGeometry args={[2.5, 0.1, 1.7]} />
      </mesh>
      {/* Murs en briques */}
      <mesh material={brickMat} position={[0, 0.45, 0]}>
        <boxGeometry args={[2.4, 0.7, 1.6]} />
      </mesh>
      {/* Bandeau supérieur */}
      <mesh material={trimMat} position={[0, 0.83, 0]}>
        <boxGeometry args={[2.45, 0.06, 1.65]} />
      </mesh>

      {/* Verrière en croix : 2 pans inclinés sur axe long */}
      <group position={[0, 0.86, 0]}>
        {/* pan gauche */}
        <mesh material={glassMat} position={[0, 0.18, -0.4]} rotation={[Math.PI / 4.5, 0, 0]}>
          <boxGeometry args={[2.4, 0.04, 0.7]} />
        </mesh>
        <mesh material={glassMat} position={[0, 0.18, 0.4]} rotation={[-Math.PI / 4.5, 0, 0]}>
          <boxGeometry args={[2.4, 0.04, 0.7]} />
        </mesh>
        {/* faîtière */}
        <mesh material={frameMat} position={[0, 0.42, 0]}>
          <boxGeometry args={[2.4, 0.05, 0.05]} />
        </mesh>
        {/* meneaux verticaux */}
        {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => (
          <mesh key={i} material={frameMat} position={[x, 0.18, 0]}>
            <boxGeometry args={[0.025, 0.5, 1.4]} />
          </mesh>
        ))}
      </group>

      {/* Cheminée discrète (pour l'échelle) */}
      <mesh material={trimMat} position={[1.0, 0.95, 0.6]}>
        <boxGeometry args={[0.18, 0.35, 0.18]} />
      </mesh>

      {/* Tables de travail en bois (intérieur visible à travers la verrière) */}
      <mesh material={frameMat} position={[-0.6, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.7]} />
      </mesh>
      <mesh material={frameMat} position={[0.6, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.7]} />
      </mesh>
      {/* Lumière intérieure chaude */}
      <pointLight ref={innerLight} position={[0, 0.6, 0]} color="#ffd6a8" intensity={2} distance={3.5} decay={2} />

      {/* Petits volets d'aération sur les murs (gimmicks) */}
      {[-0.8, -0.3, 0.3, 0.8].map((x, i) => (
        <mesh key={i} material={trimMat} position={[x, 0.55, 0.81]}>
          <boxGeometry args={[0.18, 0.18, 0.02]} />
        </mesh>
      ))}
    </group>
  );
}

/* =================================================================
 *  DEV — L'Atelier de Forge
 *  Bâtiment bas, dense, briques noires, cheminée fumante,
 *  étincelles oranges en jaillissement.
 * ================================================================= */

function DevBuilding({
  position, hovered, dimmed,
  onPointerOver, onPointerOut, onClick,
}: {
  position: THREE.Vector3;
  hovered: boolean; dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sparksRef = useRef<THREE.Points>(null);
  const sparksData = useRef<Float32Array>(new Float32Array(0));
  const innerGlow = useRef<THREE.PointLight>(null);
  const smokeRef = useRef<THREE.Points>(null);

  const SPARK_COUNT = 70;
  const SMOKE_COUNT = 18;

  const blackBrickMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#1a1416", roughness: 0.92, metalness: 0.1,
  }), []);
  const sootMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#0d0a0b", roughness: 0.95, metalness: 0.05,
  }), []);
  const ironMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#2a2628", roughness: 0.4, metalness: 0.85,
  }), []);
  const emberMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff7a2a", transparent: true, opacity: 0.9,
  }), []);

  // Fenêtres rougeoyantes
  const windowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff8a3c",
  }), []);

  const sparksGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(SPARK_COUNT * 3);
    const data = new Float32Array(SPARK_COUNT * 3); // vx, vy, life
    for (let i = 0; i < SPARK_COUNT; i++) {
      pos[i*3] = (Math.random() - 0.5) * 0.4;
      pos[i*3+1] = 0.6 + Math.random() * 0.3;
      pos[i*3+2] = (Math.random() - 0.5) * 0.4;
      data[i*3] = (Math.random() - 0.5) * 0.8;
      data[i*3+1] = 1.0 + Math.random() * 1.2;
      data[i*3+2] = Math.random();
    }
    sparksData.current = data;
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const sparksMat = useMemo(() => new THREE.PointsMaterial({
    color: "#ffb060", size: 0.05, transparent: true, opacity: 0.95,
    sizeAttenuation: true, depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  const smokeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(SMOKE_COUNT * 3);
    for (let i = 0; i < SMOKE_COUNT; i++) {
      pos[i*3] = -0.6 + (Math.random() - 0.5) * 0.15;
      pos[i*3+1] = 1.4 + Math.random() * 1.2;
      pos[i*3+2] = -0.4 + (Math.random() - 0.5) * 0.15;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const smokeMat = useMemo(() => new THREE.PointsMaterial({
    color: "#5a4a48", size: 0.22, transparent: true, opacity: 0.45,
    sizeAttenuation: true, depthWrite: false,
  }), []);

  useEffect(() => () => {
    blackBrickMat.dispose(); sootMat.dispose(); ironMat.dispose();
    emberMat.dispose(); windowMat.dispose();
    sparksGeo.dispose(); sparksMat.dispose(); smokeGeo.dispose(); smokeMat.dispose();
  }, [blackBrickMat, sootMat, ironMat, emberMat, windowMat, sparksGeo, sparksMat, smokeGeo, smokeMat]);

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    if (groupRef.current) {
      const tgt = hovered ? 0.25 : 0;
      groupRef.current.position.y += (tgt + Math.sin(t * 0.55 + 1) * 0.03 - groupRef.current.position.y) * 0.08;
      const sc = hovered ? 1.06 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }

    // Étincelles : trajectoire balistique
    if (sparksRef.current) {
      const arr = (sparksRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const data = sparksData.current;
      for (let i = 0; i < SPARK_COUNT; i++) {
        data[i*3+2] += dt * 0.9;
        arr[i*3]   += data[i*3] * dt * 0.8;
        arr[i*3+1] += data[i*3+1] * dt - 0.5 * 1.5 * dt * dt; // gravité
        if (arr[i*3+1] < 0.55 || data[i*3+2] > 1) {
          arr[i*3] = (Math.random() - 0.5) * 0.4;
          arr[i*3+1] = 0.6 + Math.random() * 0.2;
          arr[i*3+2] = (Math.random() - 0.5) * 0.4;
          data[i*3] = (Math.random() - 0.5) * 0.8;
          data[i*3+1] = (hovered ? 2.0 : 1.4) + Math.random() * 1.2;
          data[i*3+2] = 0;
        }
      }
      (sparksRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    // Fumée : montée lente
    if (smokeRef.current) {
      const arr = (smokeRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < SMOKE_COUNT; i++) {
        arr[i*3+1] += dt * 0.25;
        arr[i*3] += Math.sin(t + i) * dt * 0.05;
        if (arr[i*3+1] > 3) {
          arr[i*3] = -0.6 + (Math.random() - 0.5) * 0.15;
          arr[i*3+1] = 1.4;
          arr[i*3+2] = -0.4 + (Math.random() - 0.5) * 0.15;
        }
      }
      (smokeRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    if (innerGlow.current) innerGlow.current.intensity = (hovered ? 5 : 2.5) + Math.sin(t * 6) * 0.4;
    sparksMat.opacity = (dimmed ? 0.35 : 1) * (hovered ? 1 : 0.9);
    smokeMat.opacity = dimmed ? 0.2 : 0.45;
    const op = dimmed ? 0.55 : 1;
    blackBrickMat.opacity += (op - blackBrickMat.opacity) * 0.1;
    blackBrickMat.transparent = blackBrickMat.opacity < 0.99;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick} position={[0, 0.7, 0]}>
        <boxGeometry args={[2.4, 2.2, 2.0]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Soubassement */}
      <mesh material={sootMat} position={[0, 0.06, 0]}>
        <boxGeometry args={[2.2, 0.12, 1.8]} />
      </mesh>
      {/* Corps principal trapu */}
      <mesh material={blackBrickMat} position={[0, 0.55, 0]}>
        <boxGeometry args={[2.0, 0.85, 1.6]} />
      </mesh>
      {/* Toit à un pan */}
      <mesh material={sootMat} position={[0, 1.05, 0]} rotation={[0, 0, Math.PI / 14]}>
        <boxGeometry args={[2.05, 0.1, 1.65]} />
      </mesh>

      {/* Cheminée principale (haute, à gauche) */}
      <mesh material={sootMat} position={[-0.6, 1.4, -0.4]}>
        <boxGeometry args={[0.32, 1.4, 0.32]} />
      </mesh>
      <mesh material={ironMat} position={[-0.6, 2.12, -0.4]}>
        <boxGeometry args={[0.42, 0.06, 0.42]} />
      </mesh>

      {/* Fenêtres rougeoyantes (4) */}
      {[-0.7, -0.2, 0.3, 0.8].map((x, i) => (
        <mesh key={i} material={windowMat} position={[x, 0.55, 0.81]}>
          <boxGeometry args={[0.22, 0.32, 0.02]} />
        </mesh>
      ))}
      {/* Côté arrière */}
      {[-0.5, 0.0, 0.5].map((x, i) => (
        <mesh key={i} material={windowMat} position={[x, 0.55, -0.81]}>
          <boxGeometry args={[0.22, 0.32, 0.02]} />
        </mesh>
      ))}

      {/* Porte de forge ouverte (rougeoie) */}
      <mesh material={windowMat} position={[0.95, 0.45, 0]}>
        <boxGeometry args={[0.02, 0.5, 0.4]} />
      </mesh>

      {/* Renforts métalliques */}
      {[-0.95, -0.5, 0, 0.5, 0.95].map((x, i) => (
        <mesh key={i} material={ironMat} position={[x, 0.55, 0.81]}>
          <boxGeometry args={[0.04, 0.85, 0.02]} />
        </mesh>
      ))}

      {/* Petite enclume devant */}
      <mesh material={ironMat} position={[0.6, 0.18, 1.05]}>
        <boxGeometry args={[0.25, 0.12, 0.08]} />
      </mesh>
      <mesh material={ironMat} position={[0.6, 0.07, 1.05]}>
        <boxGeometry args={[0.18, 0.1, 0.18]} />
      </mesh>

      {/* Lueur interne */}
      <pointLight ref={innerGlow} position={[0, 0.5, 0]} color="#ff7a2a" intensity={2.5} distance={3.5} decay={2} />
      <pointLight position={[0.95, 0.45, 0]} color="#ff5a18" intensity={1.2} distance={2} decay={2} />

      {/* Étincelles & Fumée */}
      <points ref={sparksRef} geometry={sparksGeo} material={sparksMat} />
      <points ref={smokeRef} geometry={smokeGeo} material={smokeMat} />
    </group>
  );
}

/* =================================================================
 *  HEBERGEMENT — La Salle des Machines
 *  Nef haute à toit en arc, colonnes de fonte, tuyaux apparents,
 *  cadrans, vapeur fine montant en continu.
 * ================================================================= */

function HebergementBuilding({
  position, hovered, dimmed,
  onPointerOver, onPointerOut, onClick,
}: {
  position: THREE.Vector3;
  hovered: boolean; dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);
  const dialA = useRef<THREE.Mesh>(null);
  const dialB = useRef<THREE.Mesh>(null);
  const innerGlow = useRef<THREE.PointLight>(null);
  const STEAM_COUNT = 32;

  const wallMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#7a6b3e", roughness: 0.85, metalness: 0.1,
  }), []);
  const ironMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#3a3026", roughness: 0.45, metalness: 0.85,
    clearcoat: 0.4,
  }), []);
  const brassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#f5cb35", roughness: 0.25, metalness: 0.95,
    emissive: new THREE.Color("#f5cb35"), emissiveIntensity: 0.4,
    clearcoat: 1,
  }), []);
  const dialMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#fff2b0",
  }), []);
  const windowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ffe8a0",
  }), []);

  const steamGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(STEAM_COUNT * 3);
    for (let i = 0; i < STEAM_COUNT; i++) {
      const which = Math.floor(Math.random() * 3);
      const xs = [-0.7, 0.0, 0.7];
      pos[i*3] = xs[which] + (Math.random() - 0.5) * 0.12;
      pos[i*3+1] = 1.3 + Math.random() * 1.5;
      pos[i*3+2] = -0.3 + (Math.random() - 0.5) * 0.2;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const steamMat = useMemo(() => new THREE.PointsMaterial({
    color: "#fff8e0", size: 0.18, transparent: true, opacity: 0.45,
    sizeAttenuation: true, depthWrite: false,
  }), []);

  useEffect(() => () => {
    wallMat.dispose(); ironMat.dispose(); brassMat.dispose();
    dialMat.dispose(); windowMat.dispose();
    steamGeo.dispose(); steamMat.dispose();
  }, [wallMat, ironMat, brassMat, dialMat, windowMat, steamGeo, steamMat]);

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    if (groupRef.current) {
      const tgt = hovered ? 0.25 : 0;
      groupRef.current.position.y += (tgt + Math.sin(t * 0.45 + 2) * 0.03 - groupRef.current.position.y) * 0.08;
      const sc = hovered ? 1.06 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }
    if (dialA.current) dialA.current.rotation.z = -t * 0.6;
    if (dialB.current) dialB.current.rotation.z = t * 0.4;
    if (innerGlow.current) innerGlow.current.intensity = hovered ? 4 : 2;

    if (steamRef.current) {
      const arr = (steamRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < STEAM_COUNT; i++) {
        arr[i*3+1] += dt * 0.4;
        arr[i*3] += Math.sin(t * 0.8 + i) * dt * 0.06;
        if (arr[i*3+1] > 3.5) {
          const which = Math.floor(Math.random() * 3);
          const xs = [-0.7, 0.0, 0.7];
          arr[i*3] = xs[which] + (Math.random() - 0.5) * 0.12;
          arr[i*3+1] = 1.3;
          arr[i*3+2] = -0.3 + (Math.random() - 0.5) * 0.2;
        }
      }
      (steamRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    brassMat.emissiveIntensity = hovered ? 0.9 : 0.4;
    const op = dimmed ? 0.55 : 1;
    wallMat.opacity += (op - wallMat.opacity) * 0.1; wallMat.transparent = wallMat.opacity < 0.99;
    steamMat.opacity += ((dimmed ? 0.2 : 0.45) - steamMat.opacity) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick} position={[0, 1, 0]}>
        <boxGeometry args={[2.6, 2.6, 2.0]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Soubassement */}
      <mesh material={ironMat} position={[0, 0.06, 0]}>
        <boxGeometry args={[2.4, 0.12, 1.8]} />
      </mesh>

      {/* Murs hauts */}
      <mesh material={wallMat} position={[0, 0.85, 0]}>
        <boxGeometry args={[2.2, 1.45, 1.6]} />
      </mesh>

      {/* Toit en arc (cylindre demi) */}
      <mesh material={ironMat} position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 1.65, 24, 1, true, 0, Math.PI]} />
      </mesh>
      {/* Faîtière */}
      <mesh material={brassMat} position={[0, 2.07, 0]}>
        <boxGeometry args={[2.3, 0.06, 0.06]} />
      </mesh>

      {/* Colonnes de fonte (4 visibles aux angles) */}
      {[[-1.05, 0.81], [1.05, 0.81], [-1.05, -0.81], [1.05, -0.81]].map(([x, z], i) => (
        <mesh key={i} material={ironMat} position={[x, 0.85, z]}>
          <cylinderGeometry args={[0.08, 0.1, 1.6, 12]} />
        </mesh>
      ))}

      {/* Tuyaux extérieurs (laiton) */}
      <mesh material={brassMat} position={[1.15, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 12]} />
      </mesh>
      <mesh material={brassMat} position={[1.15, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 12]} />
      </mesh>
      {/* Coudes */}
      <mesh material={brassMat} position={[1.35, 0.7, 0]}>
        <torusGeometry args={[0.2, 0.05, 8, 16, Math.PI / 2]} />
      </mesh>
      <mesh material={brassMat} position={[-1.15, 0.85, 0.81]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4, 12]} />
      </mesh>

      {/* Cheminées (3 petites) */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <group key={i} position={[x, 1.95, -0.3]}>
          <mesh material={ironMat}>
            <cylinderGeometry args={[0.12, 0.14, 0.4, 16]} />
          </mesh>
          <mesh material={brassMat} position={[0, 0.22, 0]}>
            <torusGeometry args={[0.14, 0.025, 8, 24]} />
          </mesh>
        </group>
      ))}

      {/* Cadrans (gauges) */}
      <group position={[-0.85, 0.85, 0.81]}>
        <mesh material={brassMat}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
        </mesh>
        <mesh material={dialMat} position={[0, 0.025, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 0.005, 24]} />
        </mesh>
        <mesh ref={dialA} position={[0, 0.04, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.012, 0.01]} />
          <meshBasicMaterial color="#3a2418" />
        </mesh>
      </group>
      <group position={[0.55, 1.15, 0.81]}>
        <mesh material={brassMat}>
          <cylinderGeometry args={[0.13, 0.13, 0.04, 20]} />
        </mesh>
        <mesh material={dialMat} position={[0, 0.025, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.005, 20]} />
        </mesh>
        <mesh ref={dialB} position={[0, 0.04, 0]}>
          <boxGeometry args={[0.1, 0.01, 0.01]} />
          <meshBasicMaterial color="#3a2418" />
        </mesh>
      </group>

      {/* Fenêtres latérales chaudes */}
      {[-0.7, -0.2, 0.3, 0.8].map((x, i) => (
        <mesh key={i} material={windowMat} position={[x, 0.7, 0.81]}>
          <boxGeometry args={[0.18, 0.45, 0.02]} />
        </mesh>
      ))}

      <pointLight ref={innerGlow} position={[0, 1, 0]} color="#ffd87a" intensity={2} distance={3.5} decay={2} />

      {/* Vapeur */}
      <points ref={steamRef} geometry={steamGeo} material={steamMat} />
    </group>
  );
}

/* =================================================================
 *  IA — La Centrale reconvertie
 *  Bâtiment industriel ancien (briques pâles), 2 turbines/cheminées
 *  silencieuses, écrans incandescents verts plaqués sur la façade,
 *  câbles modernes courant sur les volumes.
 * ================================================================= */

function IABuilding({
  position, hovered, dimmed,
  onPointerOver, onPointerOut, onClick,
}: {
  position: THREE.Vector3;
  hovered: boolean; dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const screen1 = useRef<THREE.Mesh>(null);
  const screen2 = useRef<THREE.Mesh>(null);
  const innerGlow = useRef<THREE.PointLight>(null);

  const oldBrickMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#9a8c7a", roughness: 0.95, metalness: 0.05,
  }), []);
  const rustMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#5e4030", roughness: 0.8, metalness: 0.4,
  }), []);
  const cableMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#1a1a22", roughness: 0.6, metalness: 0.1,
  }), []);
  const screenMat1 = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#5cc996",
  }), []);
  const screenMat2 = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#a3f0c9",
  }), []);
  const turbineMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#4a3a30", roughness: 0.7, metalness: 0.6,
  }), []);

  useEffect(() => () => {
    oldBrickMat.dispose(); rustMat.dispose(); cableMat.dispose();
    screenMat1.dispose(); screenMat2.dispose(); turbineMat.dispose();
  }, [oldBrickMat, rustMat, cableMat, screenMat1, screenMat2, turbineMat]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (groupRef.current) {
      const tgt = hovered ? 0.25 : 0;
      groupRef.current.position.y += (tgt + Math.sin(t * 0.4 + 3) * 0.03 - groupRef.current.position.y) * 0.08;
      const sc = hovered ? 1.06 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
    }
    // écrans qui pulsent
    const pulseA = 0.7 + (Math.sin(t * 2.2) * 0.5 + 0.5) * 0.6;
    const pulseB = 0.7 + (Math.sin(t * 1.7 + 1) * 0.5 + 0.5) * 0.6;
    if (screen1.current) (screen1.current.material as THREE.MeshBasicMaterial).color.setRGB(0.36 * pulseA, 0.79 * pulseA, 0.59 * pulseA);
    if (screen2.current) (screen2.current.material as THREE.MeshBasicMaterial).color.setRGB(0.64 * pulseB, 0.94 * pulseB, 0.79 * pulseB);
    if (innerGlow.current) innerGlow.current.intensity = (hovered ? 5 : 2.5) + Math.sin(t * 2) * 0.3;

    const op = dimmed ? 0.55 : 1;
    oldBrickMat.opacity += (op - oldBrickMat.opacity) * 0.1; oldBrickMat.transparent = oldBrickMat.opacity < 0.99;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick} position={[0, 0.9, 0]}>
        <boxGeometry args={[3.0, 2.4, 2.0]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Soubassement */}
      <mesh material={rustMat} position={[0, 0.06, 0]}>
        <boxGeometry args={[2.8, 0.12, 1.8]} />
      </mesh>
      {/* Corps principal long */}
      <mesh material={oldBrickMat} position={[0, 0.7, 0]}>
        <boxGeometry args={[2.7, 1.2, 1.6]} />
      </mesh>
      {/* Toit plat */}
      <mesh material={rustMat} position={[0, 1.34, 0]}>
        <boxGeometry args={[2.75, 0.06, 1.65]} />
      </mesh>

      {/* 2 turbines / cheminées silencieuses */}
      <group position={[-0.7, 1.95, -0.2]}>
        <mesh material={oldBrickMat}>
          <cylinderGeometry args={[0.28, 0.32, 1.2, 24]} />
        </mesh>
        <mesh material={rustMat} position={[0, 0.65, 0]}>
          <torusGeometry args={[0.3, 0.04, 8, 24]} />
        </mesh>
        <mesh material={rustMat} position={[0, -0.6, 0]}>
          <torusGeometry args={[0.32, 0.05, 8, 24]} />
        </mesh>
      </group>
      <group position={[0.7, 1.95, -0.2]}>
        <mesh material={oldBrickMat}>
          <cylinderGeometry args={[0.28, 0.32, 1.2, 24]} />
        </mesh>
        <mesh material={rustMat} position={[0, 0.65, 0]}>
          <torusGeometry args={[0.3, 0.04, 8, 24]} />
        </mesh>
        <mesh material={rustMat} position={[0, -0.6, 0]}>
          <torusGeometry args={[0.32, 0.05, 8, 24]} />
        </mesh>
      </group>

      {/* Façade : grandes verrières d'usine */}
      <mesh material={turbineMat} position={[0, 0.7, 0.81]}>
        <boxGeometry args={[2.4, 1.0, 0.02]} />
      </mesh>
      {/* Grille de fenêtres divisée (meneaux) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={"v"+i} material={rustMat} position={[-1.1 + i * 0.44, 0.7, 0.815]}>
          <boxGeometry args={[0.02, 1.0, 0.02]} />
        </mesh>
      ))}
      {[0.4, 0.7, 1.0].map((y, i) => (
        <mesh key={"h"+i} material={rustMat} position={[0, y, 0.815]}>
          <boxGeometry args={[2.4, 0.02, 0.02]} />
        </mesh>
      ))}

      {/* Écrans incandescents verts (plaqués sur la façade, modernes) */}
      <mesh ref={screen1} position={[-0.7, 0.7, 0.83]}>
        <boxGeometry args={[0.7, 0.4, 0.02]} />
        <meshBasicMaterial attach="material" color="#5cc996" />
      </mesh>
      <mesh ref={screen2} position={[0.7, 0.85, 0.83]}>
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshBasicMaterial attach="material" color="#a3f0c9" />
      </mesh>

      {/* Câbles modernes courant sur les rails (segments) */}
      {[-0.4, 0, 0.4].map((z, i) => (
        <mesh key={"c"+i} material={cableMat} position={[0, 1.38, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 2.6, 8]} />
        </mesh>
      ))}
      {/* descente vers la cheminée gauche */}
      <mesh material={cableMat} position={[-0.7, 1.5, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
      </mesh>

      {/* Petits voyants verts sur le toit */}
      {[-1.0, -0.3, 0.3, 1.0].map((x, i) => (
        <mesh key={"l"+i} position={[x, 1.39, 0.5]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#a3f0c9" />
        </mesh>
      ))}

      <pointLight ref={innerGlow} position={[0, 0.7, 0.5]} color="#5cc996" intensity={2.5} distance={4} decay={2} />
    </group>
  );
}

/* =================================================================
 *  Pôle Wrapper : choisit le bon bâtiment selon l'id, applique
 *  la position cible (qui peut bouger en mode focus).
 * ================================================================= */

function PoleBuilding({
  id, position, hovered, dimmed,
  onPointerOver, onPointerOut, onClick,
}: {
  id: PoleId;
  position: THREE.Vector3;
  hovered: boolean; dimmed: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const props = { position, hovered, dimmed, onPointerOver, onPointerOut, onClick };
  if (id === "conseil") return <ConseilBuilding {...props} />;
  if (id === "dev") return <DevBuilding {...props} />;
  if (id === "hebergement") return <HebergementBuilding {...props} />;
  return <IABuilding {...props} />;
}

/* =================================================================
 *  Particle Flow — discret, lent, non linéaire
 *  Petites poussières lumineuses qui dérivent le long d'une courbe
 *  avec jitter + variation de taille + cycle d'opacité.
 * ================================================================= */

function ParticleFlow({
  from, to, color, count = 14, speed = 0.04, size = 0.06,
  arcZ = 0.6, highlighted,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string; count?: number; speed?: number; size?: number;
  arcZ?: number; highlighted: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const tRef = useRef<Float32Array>(new Float32Array(0));
  const jitter = useRef<Float32Array>(new Float32Array(0));

  const curve = useMemo(() => {
    const a = v3(from); const b = v3(to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y += arcZ * 0.6;
    // léger biais perpendiculaire dans le plan XZ
    const dir = b.clone().sub(a).normalize();
    const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
    mid.add(perp.multiplyScalar(arcZ * 0.5));
    return new THREE.CatmullRomCurve3([a, mid, b], false, "catmullrom", 0.5);
  }, [from, to, arcZ]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const ts = new Float32Array(count);
    const j = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      ts[i] = Math.random();
      j[i*3] = (Math.random() - 0.5) * 0.18;
      j[i*3+1] = (Math.random() - 0.5) * 0.18;
      j[i*3+2] = (Math.random() - 0.5) * 0.18;
      const p = curve.getPointAt(ts[i]);
      pos[i*3] = p.x + j[i*3]; pos[i*3+1] = p.y + j[i*3+1]; pos[i*3+2] = p.z + j[i*3+2];
    }
    tRef.current = ts; jitter.current = j;
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count, curve]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color, size, transparent: true, opacity: 0.35,
    sizeAttenuation: true, depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [color, size]);

  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);

  useFrame((s, dt) => {
    const arr = (geo.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const sp = (highlighted ? speed * 1.8 : speed);
    const t = s.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      tRef.current[i] = (tRef.current[i] + sp * dt) % 1;
      const tt = tRef.current[i];
      const p = curve.getPointAt(tt);
      // jitter qui respire doucement
      const jx = jitter.current[i*3] + Math.sin(t * 0.5 + i) * 0.05;
      const jy = jitter.current[i*3+1] + Math.cos(t * 0.4 + i * 1.3) * 0.05;
      const jz = jitter.current[i*3+2] + Math.sin(t * 0.6 + i * 0.7) * 0.05;
      arr[i*3] = p.x + jx; arr[i*3+1] = p.y + jy; arr[i*3+2] = p.z + jz;
    }
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    const tgtOp = highlighted ? 0.7 : 0.3;
    mat.opacity += (tgtOp - mat.opacity) * 0.08;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

/* ───────────── Camera Rig ─────────────
 *  Au repos : caméra fixe, légère respiration via OrbitControls user.
 *  Au clic : lerp vers le pôle actif.
 *  Pas d'autoRotate continue.
 */

const HOME_POS = new THREE.Vector3(0, 5, 12);
const HOME_TARGET = new THREE.Vector3(0, 0.6, 0);

function CameraRig({
  activeId, controlsRef,
}: {
  activeId: PoleId | null;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  const animRef = useRef({
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(),
    toTarget: new THREE.Vector3(),
    start: 0, duration: 1.4, active: false,
  });

  useEffect(() => {
    const a = animRef.current;
    a.fromPos.copy(camera.position);
    a.fromTarget.copy(controlsRef.current?.target ?? HOME_TARGET);
    if (activeId) {
      const p = POLES[activeId].basePosition;
      // se rapprocher en gardant un angle plongeant
      a.toPos.set(p[0] * 0.5, 3.2, p[2] * 0.5 + 6.5);
      a.toTarget.set(p[0] * 0.6, 0.8, p[2] * 0.6);
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
      <ambientLight intensity={0.55} color="#dde3ff" />
      <directionalLight position={[6, 9, 5]} intensity={0.7} color="#ffffff" />
      <directionalLight position={[-6, 6, -4]} intensity={0.35} color="#a0b4ff" />
    </>
  );
}

/* ───────────── Hover Label (HTML 3D-anchored) ───────────── */

function PoleLabel({
  id, onCta,
}: { id: PoleId; onCta: () => void }) {
  const p = POLES[id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        pointerEvents: "auto",
      }}
    >
      <div style={{
        padding: "10px 18px",
        background: "rgba(8,12,30,.88)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        border: `1.5px solid ${p.color}`,
        borderRadius: 14,
        boxShadow: `0 14px 40px rgba(0,0,0,.55), 0 0 32px ${p.color}55`,
        color: "#fff",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".18em",
          textTransform: "uppercase", color: p.color, marginBottom: 4,
        }}>{p.kicker}</div>
        <div style={{
          fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1,
        }}>{p.label}</div>
        <div style={{
          fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.65)",
          marginTop: 3,
        }}>{p.title}</div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onCta(); }}
        style={{
          appearance: "none", border: 0, cursor: "pointer",
          padding: "12px 22px",
          background: p.color, color: "#0a1432",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          fontSize: 14, fontWeight: 700, letterSpacing: ".01em",
          borderRadius: 999,
          display: "inline-flex", alignItems: "center", gap: 8,
          boxShadow: `0 10px 30px ${p.color}66, 0 0 0 1px rgba(255,255,255,.18) inset`,
          transition: "transform .15s ease",
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(.97)"; }}
        onMouseUp={(e)   => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        Découvrir le pôle
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
  hoveredId: PoleId | null;
  activeId: PoleId | null;
  setHoveredId: (id: PoleId | null) => void;
  setActiveId: (id: PoleId | null) => void;
  onCta: (id: PoleId) => void;
}) {
  const controlsRef = useRef<any>(null);
  const orbitRef = useRef(0);

  // Orbit angle qui avance UNIQUEMENT en mode focus
  useFrame((_, dt) => {
    if (activeId) orbitRef.current += dt * 0.35;
  });

  // Calcule la position courante d'un pôle :
  // - mode normal : basePosition
  // - mode focus  : pôle actif au centre, les 3 autres orbitent autour
  const computePos = (id: PoleId): THREE.Vector3 => {
    const base = v3(POLES[id].basePosition);
    if (!activeId) return base;
    if (id === activeId) {
      // pousse légèrement vers la caméra (centre scène)
      return new THREE.Vector3(0, 0.6, 0);
    }
    const others: PoleId[] = (Object.keys(POLES) as PoleId[]).filter((x) => x !== activeId);
    const idx = others.indexOf(id);
    const total = others.length;
    const radius = 6.5;
    const angle = orbitRef.current + (idx * Math.PI * 2) / total;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0.4 + Math.sin(orbitRef.current + idx) * 0.1,
      Math.sin(angle) * radius - 0.5,
    );
  };

  // Refs lerp pour positions animées
  const positionsRef = useRef<Record<PoleId, THREE.Vector3>>({
    conseil: v3(POLES.conseil.basePosition),
    dev: v3(POLES.dev.basePosition),
    hebergement: v3(POLES.hebergement.basePosition),
    ia: v3(POLES.ia.basePosition),
  });

  useFrame(() => {
    (Object.keys(POLES) as PoleId[]).forEach((id) => {
      const target = computePos(id);
      positionsRef.current[id].lerp(target, 0.06);
    });
  });

  const handleOver = (id: PoleId) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation(); setHoveredId(id);
    document.body.style.cursor = "pointer";
  };
  const handleOut = (id: PoleId) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation(); setHoveredId(null);
    document.body.style.cursor = "";
  };
  const handleClick = (id: PoleId) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const isFocus = (id: PoleId) => hoveredId === id || activeId === id;
  const isDimmed = (id: PoleId) => {
    const focal = activeId ?? hoveredId;
    return focal !== null && focal !== id;
  };

  // Pour les ParticleFlow on lit la position courante (animée)
  const [positions, setPositions] = useState<Record<PoleId, [number, number, number]>>(() => ({
    conseil: POLES.conseil.basePosition,
    dev: POLES.dev.basePosition,
    hebergement: POLES.hebergement.basePosition,
    ia: POLES.ia.basePosition,
  }));
  // Met à jour à 10 fps suffit pour les flux
  useFrame((_, dt) => {
    posTimer.current += dt;
    if (posTimer.current > 0.1) {
      posTimer.current = 0;
      setPositions({
        conseil:     positionsRef.current.conseil.toArray() as [number, number, number],
        dev:         positionsRef.current.dev.toArray() as [number, number, number],
        hebergement: positionsRef.current.hebergement.toArray() as [number, number, number],
        ia:          positionsRef.current.ia.toArray() as [number, number, number],
      });
    }
  });
  const posTimer = useRef(0);

  // Hover label position : au-dessus du pôle, ancrée sur la position animée
  const hoverPos = hoveredId ? positionsRef.current[hoveredId] : null;

  return (
    <>
      <PerspectiveCamera makeDefault fov={45} position={[0, 5, 12]} />
      <OrbitControls
        ref={controlsRef}
        enableDamping dampingFactor={0.1}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={(35 * Math.PI) / 180}
        maxPolarAngle={(80 * Math.PI) / 180}
        minDistance={7}
        maxDistance={18}
        target={[0, 0.6, 0]}
      />
      <CameraRig activeId={activeId} controlsRef={controlsRef} />
      <SceneLights />

      {/* Pôles */}
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

      {/* Connexions discrètes — particules subtiles */}
      <ParticleFlow from={positions.conseil} to={positions.dev}     color={POLES.conseil.colorBright} count={14} speed={0.04} size={0.05} arcZ={0.7} highlighted={isFocus("conseil") || isFocus("dev")} />
      <ParticleFlow from={positions.dev}     to={positions.hebergement} color={POLES.dev.colorBright}     count={14} speed={0.04} size={0.05} arcZ={0.7} highlighted={isFocus("dev") || isFocus("hebergement")} />
      <ParticleFlow from={positions.hebergement} to={positions.conseil} color={POLES.hebergement.colorBright} count={14} speed={0.04} size={0.05} arcZ={0.9} highlighted={isFocus("hebergement") || isFocus("conseil")} />
      <ParticleFlow from={positions.ia} to={positions.conseil}     color={POLES.ia.colorBright} count={12} speed={0.05} size={0.05} arcZ={0.5} highlighted={isFocus("ia")} />
      <ParticleFlow from={positions.ia} to={positions.dev}         color={POLES.ia.colorBright} count={12} speed={0.05} size={0.05} arcZ={0.5} highlighted={isFocus("ia")} />
      <ParticleFlow from={positions.ia} to={positions.hebergement} color={POLES.ia.colorBright} count={12} speed={0.05} size={0.05} arcZ={0.5} highlighted={isFocus("ia")} />

      {/* Hover label */}
      {hoveredId && hoverPos && (
        <Html
          position={[hoverPos.x, hoverPos.y + 3.0, hoverPos.z]}
          center
          distanceFactor={8}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <PoleLabel id={hoveredId} onCta={() => onCta(hoveredId)} />
        </Html>
      )}

      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.4} luminanceSmoothing={0.7} radius={0.6} mipmapBlur />
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
  // const router = useRouter();
  const [hoveredId, setHoveredId] = useState<PoleId | null>(null);
  const [activeId, setActiveId] = useState<PoleId | null>(null);

  const onCta = (id: PoleId) => {
    // router.push(POLES[id].href);
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
