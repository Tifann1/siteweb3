'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface PoleConfig {
  name: string;
  tagline: string;
  description: string;
  color: string;
  slug: string;
  // Position dans le repère local du mainGroup
  position: [number, number, number];
  // Rotation initiale du cristal
  baseEuler: [number, number, number];
  rotDir: number;
}

const POLES: PoleConfig[] = [
  {
    name: 'Conseil',
    tagline: 'Stratégie & Transformation',
    description: 'Cadrage, accompagnement et pilotage de vos projets de transformation digitale.',
    color: '#FF7E33',
    slug: 'conseil',
    position: [-1.8, 0.5, 0.0],
    baseEuler: [0.2, 0.4, 0.3],
    rotDir: 1,
  },
  {
    name: 'Développement',
    tagline: 'Engineering & Code',
    description: 'Applications web et mobiles robustes, performantes et belles à utiliser.',
    color: '#7474FF',
    slug: 'developpement',
    position: [1.8, -0.2, 0.0],
    baseEuler: [0.6, 0.9, 0.1],
    rotDir: -1,
  },
  {
    name: 'DevOps & Infrastructure',
    tagline: 'Cloud & Automation',
    description: 'Déploiement, scalabilité et sécurité de vos systèmes cloud.',
    color: '#E6AD00',
    slug: 'devops-infrastructure',
    position: [0.0, -1.1, -0.5],
    baseEuler: [0.1, 0.3, 0.7],
    rotDir: 1,
  },
];

// Gradient très progressif pour un halo qui fusionne avec le fond
function buildGlowTexture(hexColor: string): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  // Opacités très basses pour un fondu naturel sans bords visibles
  grad.addColorStop(0,    hexColor + '28'); // centre : 16%
  grad.addColorStop(0.2,  hexColor + '18'); // 10%
  grad.addColorStop(0.45, hexColor + '0c'); // 5%
  grad.addColorStop(0.7,  hexColor + '05'); // 2%
  grad.addColorStop(1,    hexColor + '00'); // bord : transparent
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

interface CrystalEntry {
  object: THREE.Object3D;
  pivot: THREE.Group;
  materials: THREE.MeshPhysicalMaterial[];
  light: THREE.PointLight;
  glow: THREE.Sprite;
  origPos: THREE.Vector3;
}

interface SceneData {
  renderer: THREE.WebGLRenderer;
  composer: EffectComposer;
  bloomPass: UnrealBloomPass;
  camera: THREE.PerspectiveCamera;
  mainGroup: THREE.Group;
  crystals: CrystalEntry[];
  particles: THREE.Points;
}

export function CrystalsScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneData | null>(null);
  const selectedRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [activePole, setActivePole] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // ── Scène ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090F42');
    scene.fog = new THREE.FogExp2('#090F42', 0.04);

    // ── Caméra — plus proche pour des cristaux bien visibles ──
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // ── Renderer ──────────────────────────────────────────────
    // Pas de toneMapping sur le renderer : l'OutputPass s'en charge
    // Cela évite le double tone-mapping qui cause le clignottement noir
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Post-processing — bloom modéré ─────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    // strength réduit, threshold plus haut → seules les zones très émissives brillent
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.65, 0.6, 0.35);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // ── Éclairage ambiant ──────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x111144, 1.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    // ── Groupe principal ───────────────────────────────────────
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const crystals: CrystalEntry[] = [];

    // ── Chargement du GLB ──────────────────────────────────────
    const loader = new GLTFLoader();
    loader.load('/models/crystals.glb', (gltf) => {
      const gltfScene = gltf.scene;

      // Meshy AI exporte chaque cristal comme enfant direct de la scène.
      // On prend les 3 premiers enfants, ou on fallback sur les meshes traversés.
      const topChildren = [...gltfScene.children];
      let crystalObjects: THREE.Object3D[];

      if (topChildren.length >= 3) {
        // Cas nominal : 3 objets séparés dans le GLB
        crystalObjects = topChildren.slice(0, 3).map((c) => c.clone(true));
      } else {
        // Fallback : traversal et séparation par mesh
        const foundMeshes: THREE.Mesh[] = [];
        gltfScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) foundMeshes.push(child as THREE.Mesh);
        });
        if (foundMeshes.length >= 3) {
          crystalObjects = foundMeshes.slice(0, 3).map((m) => m.clone(true));
        } else {
          // Dernier recours : cloner l'objet disponible 3 fois
          const base = topChildren[0] ?? gltfScene;
          crystalObjects = [base.clone(true), base.clone(true), base.clone(true)];
        }
      }

      crystalObjects.forEach((obj, i) => {
        const pole = POLES[i];
        const color = new THREE.Color(pole.color);

        // Remplacer tous les matériaux par le matériau néon du pôle
        const mats: THREE.MeshPhysicalMaterial[] = [];
        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mat = new THREE.MeshPhysicalMaterial({
              color,
              emissive: color,
              emissiveIntensity: 0.3,   // réduit — le bloom fait le reste
              roughness: 0.05,
              metalness: 0.0,
              transmission: 0.55,
              thickness: 0.5,
              transparent: true,
              opacity: 0.9,
            });
            (child as THREE.Mesh).material = mat;
            mats.push(mat);
          }
        });

        // Normaliser la taille à ~2.5 unités et centrer dans le pivot
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = 2.5 / Math.max(size.x, size.y, size.z);
        obj.scale.setScalar(scale);
        // Centrer l'objet à l'origine du pivot
        obj.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

        // Pivot positionné et orienté selon la config du pôle
        const pivot = new THREE.Group();
        pivot.position.set(...pole.position);
        pivot.rotation.set(...pole.baseEuler);
        pivot.add(obj);
        mainGroup.add(pivot);

        // Lumière ponctuelle néon — intensité douce
        const light = new THREE.PointLight(color.getHex(), 1.2, 5.5);
        light.position.set(0, 0.4, 0.5);
        pivot.add(light);

        // Sprite de halo — très grand, très doux, fondu avec le fond
        const glow = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: buildGlowTexture(pole.color),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
          }),
        );
        glow.scale.set(11, 11, 1);
        pivot.add(glow);

        crystals.push({
          object: obj,
          pivot,
          materials: mats,
          light,
          glow,
          origPos: new THREE.Vector3(...pole.position),
        });
      });

      setIsLoaded(true);
    });

    // ── Particules ─────────────────────────────────────────────
    const N = 600;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 4.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0x8888bb,
        size: 0.04,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    // ── Raycaster ──────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();

    // ── Événements ────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / innerHeight - 0.5) * 2;
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);

      const allMeshes: THREE.Mesh[] = [];
      crystals.forEach((c) => {
        c.object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) allMeshes.push(child as THREE.Mesh);
        });
      });

      const hits = raycaster.intersectObjects(allMeshes, false);
      if (hits.length === 0) {
        setActivePole(null);
        return;
      }
      const hitObj = hits[0].object;
      let foundIdx = -1;
      crystals.forEach((c, i) => {
        c.object.traverse((child) => {
          if (child === hitObj) foundIdx = i;
        });
      });
      if (foundIdx >= 0) {
        setActivePole((prev) => (prev === foundIdx ? null : foundIdx));
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('click', onCanvasClick);

    // ── Boucle de rendu via setAnimationLoop ───────────────────
    // Utilisation de renderer.setAnimationLoop au lieu de gsap.ticker
    // → exactement 1 render par frame, élimine le clignottement noir
    renderer.setAnimationLoop((time) => {
      const t = (time ?? 0) * 0.001;

      // Rotation lente individuelle des cristaux
      crystals.forEach((crystal, i) => {
        if (selectedRef.current === i) return; // GSAP gère la rotation du cristal sélectionné
        crystal.object.rotation.y += 0.004 * POLES[i].rotDir;
        crystal.object.rotation.x += 0.002 * (i === 1 ? -1 : 1);
      });

      // Orbite lente du groupe — pause quand un cristal est sélectionné
      if (selectedRef.current === null) {
        mainGroup.rotation.y += 0.0008;
      }

      // Dérive des particules
      particles.rotation.y += 0.0003;
      particles.rotation.x = Math.sin(t * 0.12) * 0.04;

      // Parallax caméra
      camera.position.x += (mouseRef.current.x * 0.7 - camera.position.x) * 0.04;
      camera.position.y += (-mouseRef.current.y * 0.35 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      composer.render();
    });

    // ── Resize ─────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      composer.setSize(nw, nh);
      bloomPass.resolution.set(nw, nh);
    });
    ro.observe(mount);

    sceneRef.current = { renderer, composer, bloomPass, camera, mainGroup, crystals, particles };

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('click', onCanvasClick);
      ro.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, []);

  // ── Animation sur sélection ────────────────────────────────
  useEffect(() => {
    selectedRef.current = activePole;
    const data = sceneRef.current;
    if (!data || data.crystals.length === 0) return;

    data.crystals.forEach((crystal, i) => {
      const isActive = activePole === i;

      // Annuler les tweens en cours
      gsap.killTweensOf(crystal.pivot.position);
      gsap.killTweensOf(crystal.pivot.scale);
      gsap.killTweensOf(crystal.object.rotation);
      gsap.killTweensOf(crystal.light);
      gsap.killTweensOf(crystal.glow.scale);
      crystal.materials.forEach((m) => gsap.killTweensOf(m));

      if (isActive) {
        // Amener au premier plan
        gsap.to(crystal.pivot.position, { x: 0, y: 0, z: 2.8, duration: 1.1, ease: 'power2.out' });
        gsap.to(crystal.pivot.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 1.1, ease: 'power2.out' });
        // Spin révélateur
        gsap.to(crystal.object.rotation, {
          y: crystal.object.rotation.y + Math.PI * 1.5,
          duration: 1.8,
          ease: 'power2.inOut',
        });
        // Intensifier l'émission et la lumière
        crystal.materials.forEach((m) => gsap.to(m, { emissiveIntensity: 1.1, duration: 0.7 }));
        gsap.to(crystal.light, { intensity: 3.5, duration: 0.7 });
        gsap.to(crystal.glow.scale, { x: 16, y: 16, duration: 0.8, ease: 'power2.out' });
      } else {
        // Renvoyer en arrière
        const op = crystal.origPos;
        gsap.to(crystal.pivot.position, {
          x: op.x,
          y: op.y,
          z: activePole !== null ? op.z - 1.0 : op.z,
          duration: 1.1,
          ease: 'power2.out',
        });
        gsap.to(crystal.pivot.scale, { x: 1, y: 1, z: 1, duration: 1.1, ease: 'power2.out' });
        crystal.materials.forEach((m) =>
          gsap.to(m, { emissiveIntensity: activePole !== null ? 0.12 : 0.3, duration: 0.7 }),
        );
        gsap.to(crystal.light, {
          intensity: activePole !== null ? 0.2 : 1.2,
          duration: 0.7,
        });
        gsap.to(crystal.glow.scale, { x: 11, y: 11, duration: 0.7 });
      }
    });
  }, [activePole]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '680px' }}>
      {/* Canvas Three.js */}
      <div ref={mountRef} className="absolute inset-0 cursor-pointer" />

      {/* Labels des pôles */}
      {isLoaded && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-8 z-10 pointer-events-auto">
          {POLES.map((pole, i) => (
            <button
              key={pole.slug}
              onClick={() => setActivePole((prev) => (prev === i ? null : i))}
              className="flex items-center gap-2 text-sm font-medium transition-colors duration-300 select-none"
              style={{ color: activePole === i ? pole.color : '#CBD5E1' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: pole.color, boxShadow: `0 0 8px ${pole.color}` }}
              />
              {pole.name}
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      {isLoaded && activePole === null && (
        <p
          className="absolute top-6 left-1/2 -translate-x-1/2 text-xs pointer-events-none select-none"
          style={{ color: '#64748B' }}
        >
          Cliquez sur un cristal pour explorer
        </p>
      )}

      {/* Panneau d'info */}
      <AnimatePresence>
        {activePole !== null && isLoaded && (
          <motion.div
            key={activePole}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-2xl p-6 relative"
              style={{
                background: 'rgba(4, 9, 54, 0.9)',
                border: `1px solid ${POLES[activePole].color}50`,
                backdropFilter: 'blur(16px)',
                boxShadow: `0 0 48px ${POLES[activePole].color}18, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              <button
                onClick={() => setActivePole(null)}
                className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-lg leading-none opacity-40 hover:opacity-90 transition-opacity"
                style={{ color: '#CBD5E1' }}
              >
                ×
              </button>

              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: POLES[activePole].color }}
              >
                {POLES[activePole].tagline}
              </p>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#DFE1F8' }}>
                {POLES[activePole].name}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: '#DFC0B3', opacity: 0.85 }}
              >
                {POLES[activePole].description}
              </p>

              <Link
                href={`/${locale}/poles/${POLES[activePole].slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all hover:brightness-110"
                style={{
                  background: `${POLES[activePole].color}18`,
                  border: `1px solid ${POLES[activePole].color}`,
                  color: POLES[activePole].color,
                }}
              >
                Découvrir le pôle
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
