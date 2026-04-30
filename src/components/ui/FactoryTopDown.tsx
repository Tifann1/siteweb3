"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "@/navigation";

const POLES = {
  orange: {
    title: "Conseil & Transformation",
    kicker: "Pôle 01 — Conseil",
    desc: "Cadrage stratégique, design produit et transformation des organisations. Du diagnostic à la mise en mouvement.",
    stats: [{ v: "+40", k: "Projets/an" }, { v: "12", k: "Experts" }],
    color: "#ef8336",
    href: "/nos-poles/conseil",
  },
  blue: {
    title: "Développement",
    kicker: "Pôle 02 — Build",
    desc: "Ingénierie logicielle, plateformes web & mobile, architectures évolutives livrées en cycles courts.",
    stats: [{ v: "120+", k: "Projets/an" }, { v: "38", k: "Experts" }],
    color: "#6a7dff",
    href: "/nos-poles/developpement",
  },
  yellow: {
    title: "DevOps & Infrastructure",
    kicker: "Pôle 03 — Run",
    desc: "Hébergement, SRE et automatisation : un socle production-ready, observable, sécurisé 24/7.",
    stats: [{ v: "99.98%", k: "Uptime" }, { v: "9", k: "Experts" }],
    color: "#f5cb35",
    href: "/nos-poles/hebergement",
  },
  green: {
    title: "Nos agents IA",
    kicker: "Pôle 04 — IA",
    desc: "Agents et copilotes sur-mesure, intégrés au cœur des opérations métier. Du POC à la production.",
    stats: [{ v: "20+", k: "Agents livrés" }, { v: "11", k: "Experts" }],
    color: "#5cc996",
    href: "/produits",
  },
} as const;

type PoleId = keyof typeof POLES;

const PIN_LABELS: Record<PoleId, { name: string; sub: string }> = {
  orange: { name: "Conseil",        sub: "Stratégie & transformation" },
  blue:   { name: "Développement",  sub: "Build & livraison"           },
  yellow: { name: "DevOps & Infra", sub: "Hébergement & SRE"           },
  green:  { name: "Nos agents IA",  sub: "Produits & automation"        },
};

const PIN_POS: Record<PoleId, { left: string; top: string }> = {
  orange: { left: "22%", top: "52%" },
  blue:   { left: "50%", top: "8%"  },
  yellow: { left: "78%", top: "52%" },
  green:  { left: "50%", top: "94%" },
};

export function FactoryTopDown() {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const mouseRef = useRef({ tx: 0, ty: 0 });

  const [activeId,   setActiveId]   = useState<PoleId | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    let rx = 0, rz = 0;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      const { tx, ty } = mouseRef.current;
      rx += ((-ty * 6) - rx) * 0.05;
      rz += ((tx * 2)  - rz) * 0.05;
      stageRef.current?.style.setProperty("--rx", rx.toFixed(2) + "deg");
      stageRef.current?.style.setProperty("--rz", rz.toFixed(2) + "deg");
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  function focus(id: PoleId)  { setActiveId(id); }
  function blur()              { if (!detailOpen) setActiveId(null); }
  function clearAll()          { setActiveId(null); setDetailOpen(false); }
  function clickPole(id: PoleId) { setActiveId(id); setDetailOpen(true); }

  const pole = activeId ? POLES[activeId] : null;

  return (
    <>
      <style>{`
        .fty-stage {
          position: relative;
          width: min(100%, 720px);
          aspect-ratio: 1/1;
          transform-style: preserve-3d;
          transform: rotateX(var(--rx,0deg)) rotateZ(var(--rz,0deg));
          transition: transform .55s cubic-bezier(.2,.8,.2,1);
          will-change: transform;
        }
        .fty-building {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          transition: transform .4s cubic-bezier(.2,.8,.2,1), filter .4s ease, opacity .4s ease;
          cursor: pointer;
        }
        .fty-stage[data-focus] .fty-building:not(.fty-is-focus) {
          opacity: .28;
          filter: saturate(.45) brightness(.7);
        }
        .fty-stage[data-focus] .fty-conveyors {
          opacity: .28;
        }
        .fty-stage[data-focus] .fty-building.fty-is-focus {
          transform: translateY(-10px) scale(1.06);
          filter: drop-shadow(0 24px 28px rgba(0,0,0,.6)) drop-shadow(0 0 32px rgba(255,255,255,.15));
          opacity: 1 !important;
        }
        @keyframes fty-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .fty-blink circle { animation: fty-blink 1.6s ease-in-out infinite; }
        .fty-blink circle:nth-child(2n) { animation-delay:.3s; }
        .fty-blink circle:nth-child(3n) { animation-delay:.7s; }
        @keyframes fty-drift {
          0%   { transform:translate(0,0) scale(.6); opacity:0; }
          20%  { opacity:.8; }
          100% { transform:translate(8px,-22px) scale(1.2); opacity:0; }
        }
        .fty-smoke circle { animation:fty-drift 4s ease-out infinite; transform-box:fill-box; transform-origin:center; }
        .fty-smoke circle:nth-child(2) { animation-delay:1.3s; }
        .fty-smoke circle:nth-child(3) { animation-delay:2.6s; }
        @keyframes fty-flow   { 0%{transform:translate(0,0);opacity:0} 20%{opacity:1} 100%{transform:translate(60px,0);opacity:0} }
        @keyframes fty-flow-v { 0%{transform:translate(0,0);opacity:0} 20%{opacity:1} 100%{transform:translate(0,60px);opacity:0} }
        .fty-cdash   circle { animation:fty-flow   2.4s linear infinite;         transform-box:fill-box; }
        .fty-cdash-b circle { animation:fty-flow-v 2.4s linear infinite;         transform-box:fill-box; }
        .fty-cdash-c circle { animation:fty-flow   2.4s linear infinite reverse; transform-box:fill-box; }
        .fty-cdash-d circle { animation:fty-flow-v 2.4s linear infinite;         transform-box:fill-box; }
      `}</style>

      <div style={{ position: "relative", width: "100%", perspective: "2200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          ref={stageRef}
          className="fty-stage"
          data-focus={activeId ?? undefined}
          onClick={(e) => { if ((e.target as Element).classList.contains("fty-stage")) clearAll(); }}
        >
          <svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="fty-gOrange" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff9a4d"/><stop offset="100%" stopColor="#cc6420"/>
              </linearGradient>
              <linearGradient id="fty-gBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6a7dff"/><stop offset="100%" stopColor="#2231a6"/>
              </linearGradient>
              <linearGradient id="fty-gYellow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd953"/><stop offset="100%" stopColor="#c3971a"/>
              </linearGradient>
              <linearGradient id="fty-gGreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7fe0b1"/><stop offset="100%" stopColor="#2f8a63"/>
              </linearGradient>
              <linearGradient id="fty-gMetal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cfd4dc"/><stop offset="100%" stopColor="#7a808c"/>
              </linearGradient>
              <filter id="fty-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5"/>
              </filter>
              <pattern id="fty-conveyor" x="0" y="0" width="14" height="6" patternUnits="userSpaceOnUse">
                <rect width="14" height="6" fill="rgba(255,255,255,.06)"/>
                <rect x="0" y="0" width="7" height="6" fill="rgba(255,255,255,.1)"/>
              </pattern>
            </defs>

            {/* Central plaza dot */}
            <circle cx="500" cy="500" r="8" fill="rgba(255,255,255,.15)"/>
            <circle cx="500" cy="500" r="18" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>

            {/* Conveyors */}
            <g className="fty-conveyors">
              <rect x="225" y="495" width="155" height="10" fill="url(#fty-conveyor)" rx="2"/>
              <rect x="620" y="495" width="155" height="10" fill="url(#fty-conveyor)" rx="2"/>
              <rect x="495" y="225" width="10" height="155" fill="url(#fty-conveyor)" rx="2" transform="rotate(-90 500 300)"/>
              <rect x="495" y="620" width="10" height="155" fill="url(#fty-conveyor)" rx="2" transform="rotate(-90 500 700)"/>
              {/* Animated dots */}
              <g className="fty-cdash">
                <circle cx="240" cy="500" r="3" fill="#ffb777" opacity=".9"/>
                <circle cx="280" cy="500" r="3" fill="#ffb777" opacity=".7"/>
                <circle cx="320" cy="500" r="3" fill="#ffb777" opacity=".5"/>
              </g>
              <g className="fty-cdash-b">
                <circle cx="500" cy="380" r="3" fill="#8a9bff" opacity=".9"/>
                <circle cx="500" cy="340" r="3" fill="#8a9bff" opacity=".7"/>
                <circle cx="500" cy="300" r="3" fill="#8a9bff" opacity=".5"/>
              </g>
              <g className="fty-cdash-c">
                <circle cx="640" cy="500" r="3" fill="#ffe187" opacity=".9"/>
                <circle cx="680" cy="500" r="3" fill="#ffe187" opacity=".7"/>
                <circle cx="720" cy="500" r="3" fill="#ffe187" opacity=".5"/>
              </g>
              <g className="fty-cdash-d">
                <circle cx="500" cy="640" r="3" fill="#95efc1" opacity=".9"/>
                <circle cx="500" cy="680" r="3" fill="#95efc1" opacity=".7"/>
                <circle cx="500" cy="720" r="3" fill="#95efc1" opacity=".5"/>
              </g>
            </g>

            {/* ── ORANGE — Conseil (W) ── */}
            <g className={`fty-building${activeId === "orange" ? " fty-is-focus" : ""}`}
               onMouseEnter={() => focus("orange")} onMouseLeave={blur} onClick={() => clickPole("orange")}>
              <ellipse cx="220" cy="548" rx="115" ry="16" fill="#000" opacity=".35" filter="url(#fty-shadow)"/>
              <g transform="translate(220 510)">
                {/* Tall block */}
                <path d="M 0 -10 L 30 5 L 30 55 L 0 40 Z"   fill="#b7541a"/>
                <path d="M 0 -10 L -32 5 L -32 55 L 0 40 Z"  fill="#cc6420"/>
                <path d="M 0 -42 L 30 -27 L 0 -10 L -32 -27 Z" fill="url(#fty-gOrange)"/>
                <path d="M -32 -27 L -32 -52 L 0 -68 L 0 -42 Z" fill="#cc6420"/>
                <path d="M 0 -68 L 30 -52 L 30 -27 L 0 -42 Z"   fill="#b7541a" opacity=".85"/>
                <path d="M -32 -52 L 0 -68 L 30 -52 L 0 -36 Z"  fill="url(#fty-gOrange)"/>
                <g fill="#fff" opacity=".4">
                  <path d="M -22 -12 L -10 -18 L -10 -8 L -22 -2 Z"/>
                  <path d="M -22 6 L -10 0 L -10 10 L -22 16 Z"/>
                  <path d="M -22 24 L -10 18 L -10 28 L -22 34 Z"/>
                </g>
                <g fill="#fff" opacity=".55">
                  <path d="M 8 -16 L 22 -9 L 22 -1 L 8 -8 Z"/>
                  <path d="M 8 2 L 22 9 L 22 17 L 8 10 Z"/>
                  <path d="M 8 20 L 22 27 L 22 35 L 8 28 Z"/>
                </g>
                {/* Warehouse */}
                <g transform="translate(46 12)">
                  <path d="M 0 0 L 40 20 L 40 50 L 0 30 Z"    fill="#cc6420"/>
                  <path d="M 40 20 L 76 2 L 76 32 L 40 50 Z"   fill="#b7541a"/>
                  <path d="M 0 0 L 40 -20 L 76 -2 L 40 20 Z"   fill="url(#fty-gOrange)"/>
                  <g stroke="#b7541a" strokeWidth="1" opacity=".55" fill="none">
                    <path d="M 8 -2 L 44 -20"/><path d="M 18 2 L 54 -16"/>
                    <path d="M 28 6 L 64 -12"/><path d="M 36 12 L 72 -6"/>
                  </g>
                  <path d="M 44 28 L 72 14 L 72 22 L 44 36 Z" fill="#fff" opacity=".3"/>
                </g>
                {/* Chimney + smoke */}
                <g transform="translate(-2 -76)">
                  <ellipse cx="0" cy="0" rx="6" ry="3" fill="#cfd4dc"/>
                  <path d="M -6 0 L -6 12 L 0 15 L 0 3 Z" fill="#a6abb2"/>
                  <path d="M 6 0 L 6 12 L 0 15 L 0 3 Z"  fill="#7a808c"/>
                </g>
                <g className="fty-smoke">
                  <circle cx="-4" cy="-92" r="6" fill="#fff" opacity=".6"/>
                  <circle cx="2"  cy="-100" r="5" fill="#fff" opacity=".45"/>
                  <circle cx="-1" cy="-108" r="4" fill="#fff" opacity=".3"/>
                </g>
                {/* Trees */}
                <circle cx="-58" cy="55" r="6" fill="#5cc996" opacity=".5"/>
                <circle cx="62"  cy="59" r="5" fill="#5cc996" opacity=".45"/>
              </g>
            </g>

            {/* ── BLUE — Développement (N) ── */}
            <g className={`fty-building${activeId === "blue" ? " fty-is-focus" : ""}`}
               onMouseEnter={() => focus("blue")} onMouseLeave={blur} onClick={() => clickPole("blue")}>
              <ellipse cx="500" cy="256" rx="115" ry="16" fill="#000" opacity=".35" filter="url(#fty-shadow)"/>
              <g transform="translate(500 220)">
                {/* Main hall */}
                <path d="M -50 0 L -50 38 L 0 62 L 0 24 Z"  fill="#2231a6"/>
                <path d="M 0 24 L 50 0 L 50 38 L 0 62 Z"    fill="#1d2a8f"/>
                <path d="M -50 0 L 0 -24 L 50 0 L 0 24 Z"   fill="url(#fty-gBlue)"/>
                <g stroke="rgba(255,255,255,.35)" strokeWidth="1" fill="none">
                  <path d="M -34 -8 L 16 -32"/><path d="M -18 0 L 32 -24"/>
                  <path d="M -2 8 L 48 -16"/> <path d="M -34 -8 L -2 8"/>
                  <path d="M -18 -16 L 14 0"/><path d="M 0 -24 L 32 -8"/>
                </g>
                <g fill="#8a9bff" opacity=".7">
                  <path d="M -44 8 L -32 14 L -32 22 L -44 16 Z"/>
                  <path d="M -28 16 L -16 22 L -16 30 L -28 24 Z"/>
                  <path d="M -12 24 L 0 30 L 0 38 L -12 32 Z"/>
                </g>
                <g fill="#fff" opacity=".4">
                  <path d="M 44 8 L 32 14 L 32 22 L 44 16 Z"/>
                  <path d="M 28 16 L 16 22 L 16 30 L 28 24 Z"/>
                  <path d="M 12 24 L 0 30 L 0 38 L 12 32 Z"/>
                </g>
                {/* Tower */}
                <g transform="translate(28 -22)">
                  <path d="M -16 0 L -16 -10 L 0 -18 L 0 -8 Z"   fill="url(#fty-gBlue)"/>
                  <path d="M 0 -18 L 16 -10 L 16 0 L 0 -8 Z"     fill="url(#fty-gBlue)"/>
                  <path d="M -16 -10 L 0 -18 L 16 -10 L 0 -2 Z"  fill="#8a9bff"/>
                  <path d="M -12 -8 L -12 -2 L -2 -6 L -2 -12 Z" fill="#fff" opacity=".55"/>
                  <path d="M 2 -12 L 2 -6 L 12 -2 L 12 -8 Z"    fill="#fff" opacity=".35"/>
                </g>
                {/* Annex */}
                <g transform="translate(-66 22)">
                  <path d="M -22 0 L -22 16 L 0 28 L 0 12 Z"  fill="#1d2a8f"/>
                  <path d="M 0 12 L 22 0 L 22 16 L 0 28 Z"    fill="#16236f"/>
                  <path d="M -22 0 L 0 -12 L 22 0 L 0 12 Z"   fill="#3b4fde"/>
                  <path d="M -16 4 L 0 -4 L 16 4 L 0 12 Z"    fill="#fff" opacity=".15"/>
                </g>
                {/* Trees */}
                <circle cx="-78" cy="57" r="6" fill="#5cc996" opacity=".5"/>
                <circle cx="78"  cy="53" r="5" fill="#5cc996" opacity=".5"/>
              </g>
            </g>

            {/* ── YELLOW — DevOps & Infra (E) ── */}
            <g className={`fty-building${activeId === "yellow" ? " fty-is-focus" : ""}`}
               onMouseEnter={() => focus("yellow")} onMouseLeave={blur} onClick={() => clickPole("yellow")}>
              <ellipse cx="780" cy="548" rx="115" ry="16" fill="#000" opacity=".35" filter="url(#fty-shadow)"/>
              <g transform="translate(780 510)">
                {/* Hall 1 */}
                <g transform="translate(-20 6)">
                  <path d="M -36 -2 L -36 28 L 0 46 L 0 16 Z"  fill="#c3971a"/>
                  <path d="M 0 16 L 28 0 L 28 30 L 0 46 Z"      fill="#a6810f"/>
                  <path d="M -36 -2 L 0 -22 L 28 0 L 0 16 Z"   fill="url(#fty-gYellow)"/>
                  <g stroke="#a6810f" strokeWidth="1.2" opacity=".7" fill="none">
                    <path d="M -28 -2 L -2 -16"/><path d="M -16 4 L 10 -10"/><path d="M -4 10 L 22 -4"/>
                  </g>
                  <path d="M -22 -8 L -16 -11 L -10 -8 L -16 -5 Z" fill="#ffd953"/>
                  <path d="M -10 -2 L -4 -5 L 2 -2 L -4 1 Z"       fill="#ffd953"/>
                  <path d="M 2 4 L 8 1 L 14 4 L 8 7 Z"              fill="#ffd953"/>
                </g>
                {/* Hall 2 */}
                <g transform="translate(20 -8)">
                  <path d="M -36 -2 L -36 28 L 0 46 L 0 16 Z"  fill="#c3971a"/>
                  <path d="M 0 16 L 28 0 L 28 30 L 0 46 Z"      fill="#a6810f"/>
                  <path d="M -36 -2 L 0 -22 L 28 0 L 0 16 Z"   fill="url(#fty-gYellow)"/>
                  <g stroke="#a6810f" strokeWidth="1.2" opacity=".7" fill="none">
                    <path d="M -28 -2 L -2 -16"/><path d="M -16 4 L 10 -10"/><path d="M -4 10 L 22 -4"/>
                  </g>
                  <path d="M -22 -8 L -16 -11 L -10 -8 L -16 -5 Z" fill="#ffd953"/>
                  <path d="M -10 -2 L -4 -5 L 2 -2 L -4 1 Z"       fill="#ffd953"/>
                  <path d="M 2 4 L 8 1 L 14 4 L 8 7 Z"              fill="#ffd953"/>
                </g>
                {/* Status lights */}
                <g className="fty-blink">
                  <circle cx="-30" cy="40" r="1.6" fill="#fff"/>
                  <circle cx="-22" cy="44" r="1.6" fill="#fff" opacity=".6"/>
                  <circle cx="-14" cy="48" r="1.6" fill="#fff"/>
                  <circle cx="14"  cy="36" r="1.6" fill="#fff" opacity=".6"/>
                  <circle cx="22"  cy="32" r="1.6" fill="#fff"/>
                  <circle cx="30"  cy="28" r="1.6" fill="#fff" opacity=".6"/>
                </g>
                {/* Cooling tower */}
                <g transform="translate(-58 -16)">
                  <ellipse cx="0" cy="0" rx="10" ry="5" fill="#cfd4dc"/>
                  <path d="M -10 0 L -10 22 L 0 27 L 0 5 Z" fill="#7a808c"/>
                  <path d="M 10 0 L 10 22 L 0 27 L 0 5 Z"  fill="#a6abb2"/>
                  <circle cx="0" cy="-1" r="3" fill="#f5cb35" opacity=".7"/>
                </g>
                {/* Trees */}
                <circle cx="58"  cy="55" r="6" fill="#5cc996" opacity=".5"/>
                <circle cx="-72" cy="53" r="5" fill="#5cc996" opacity=".5"/>
              </g>
            </g>

            {/* ── GREEN — Agents IA (S) ── */}
            <g className={`fty-building${activeId === "green" ? " fty-is-focus" : ""}`}
               onMouseEnter={() => focus("green")} onMouseLeave={blur} onClick={() => clickPole("green")}>
              <ellipse cx="500" cy="828" rx="115" ry="16" fill="#000" opacity=".35" filter="url(#fty-shadow)"/>
              <g transform="translate(500 800)">
                {/* Hex pavilion */}
                <path d="M -44 0 L -44 22 L -22 38 L -22 16 Z"            fill="#2f8a63"/>
                <path d="M -22 16 L -22 38 L 22 38 L 22 16 Z"             fill="#287655"/>
                <path d="M 22 16 L 22 38 L 44 22 L 44 0 Z"                fill="#2f8a63"/>
                <path d="M -44 0 L -22 -16 L 22 -16 L 44 0 L 22 16 L -22 16 Z" fill="url(#fty-gGreen)"/>
                <path d="M -28 0 L -14 -10 L 14 -10 L 28 0 L 14 10 L -14 10 Z"
                      fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1"/>
                <path d="M -16 0 L -8 -6 L 8 -6 L 16 0 L 8 6 L -8 6 Z"
                      fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1"/>
                <circle cx="0" cy="0" r="4" fill="#fff"/>
                <circle cx="0" cy="0" r="9" fill="none" stroke="#fff" strokeWidth="1" opacity=".4"/>
                {/* Satellite nodes */}
                <g transform="translate(-62 22)">
                  <path d="M -8 0 L -8 8 L 0 12 L 0 4 Z" fill="#287655"/>
                  <path d="M 0 4 L 8 0 L 8 8 L 0 12 Z"   fill="#1f5a40"/>
                  <path d="M -8 0 L 0 -4 L 8 0 L 0 4 Z"  fill="#5cc996"/>
                </g>
                <g transform="translate(62 22)">
                  <path d="M -8 0 L -8 8 L 0 12 L 0 4 Z" fill="#287655"/>
                  <path d="M 0 4 L 8 0 L 8 8 L 0 12 Z"   fill="#1f5a40"/>
                  <path d="M -8 0 L 0 -4 L 8 0 L 0 4 Z"  fill="#5cc996"/>
                </g>
                <g transform="translate(0 -38)">
                  <path d="M -8 0 L -8 8 L 0 12 L 0 4 Z" fill="#287655"/>
                  <path d="M 0 4 L 8 0 L 8 8 L 0 12 Z"   fill="#1f5a40"/>
                  <path d="M -8 0 L 0 -4 L 8 0 L 0 4 Z"  fill="#5cc996"/>
                </g>
                {/* Connection lines */}
                <g stroke="rgba(149,239,193,.55)" strokeWidth="1" strokeDasharray="2 3" fill="none">
                  <path d="M -54 22 L -28 12"/>
                  <path d="M 54 22 L 28 12"/>
                  <path d="M 0 -34 L 0 -10"/>
                </g>
                {/* Data blink */}
                <g className="fty-blink" fill="#95efc1">
                  <circle cx="-30" cy="-22" r="1.5"/>
                  <circle cx="32"  cy="-26" r="1.5"/>
                  <circle cx="-40" cy="0"   r="1.5" opacity=".7"/>
                  <circle cx="40"  cy="-2"  r="1.5" opacity=".7"/>
                </g>
                {/* Trees */}
                <circle cx="-78" cy="45" r="5" fill="#5cc996" opacity=".5"/>
                <circle cx="78"  cy="43" r="5" fill="#5cc996" opacity=".5"/>
              </g>
            </g>
          </svg>

          {/* Pin labels */}
          {(["orange","blue","yellow","green"] as const).map((id) => {
            const p    = POLES[id];
            const lbl  = PIN_LABELS[id];
            const pos  = PIN_POS[id];
            const isActive = activeId === id;
            return (
              <div
                key={id}
                style={{
                  position: "absolute", left: pos.left, top: pos.top,
                  transform: "translate(-50%,-50%)",
                  color: p.color, cursor: "pointer", userSelect: "none", zIndex: 10,
                }}
                onMouseEnter={() => focus(id)}
                onMouseLeave={blur}
                onClick={(e) => { e.stopPropagation(); clickPole(id); }}
              >
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "7px 13px 7px 9px",
                  background: "rgba(8,14,36,.72)",
                  border: `1px solid ${isActive ? p.color : "rgba(255,255,255,.1)"}`,
                  borderRadius: 999, backdropFilter: "blur(12px)",
                  boxShadow: isActive
                    ? `0 14px 36px rgba(0,0,0,.55),0 0 0 1px ${p.color},0 0 24px ${p.color}55`
                    : "0 8px 24px rgba(0,0,0,.4)",
                  whiteSpace: "nowrap",
                  transform: isActive ? "translateY(-2px)" : "none",
                  transition: "all .3s cubic-bezier(.2,.8,.2,1)",
                }}>
                  <span style={{
                    position: "relative", width: 20, height: 20, borderRadius: "50%",
                    display: "grid", placeItems: "center", flexShrink: 0,
                    background: "rgba(255,255,255,.05)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.1)",
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor", boxShadow: "0 0 10px currentColor" }}/>
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".02em", color: "#fff" }}>
                    {lbl.name}
                    <small style={{ display: "block", fontSize: 9, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginTop: 1 }}>
                      {lbl.sub}
                    </small>
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                       style={{ marginLeft: 2, color: isActive ? "currentColor" : "rgba(255,255,255,.35)", transition: "all .3s" }}>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            );
          })}

          {/* Detail panel */}
          {pole && (
            <div style={{
              position: "absolute", top: "50%", right: 0,
              transform: `translateY(-50%) translateX(${detailOpen ? "0" : "20px"})`,
              width: 260,
              background: "rgba(8,12,32,.85)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,.08)", borderRadius: 16,
              padding: 18, color: "#fff",
              opacity: detailOpen ? 1 : 0,
              visibility: detailOpen ? "visible" : "hidden",
              transition: `opacity .35s ease,transform .45s cubic-bezier(.2,.8,.2,1),visibility 0s linear ${detailOpen ? "0s" : ".35s"}`,
              boxShadow: "0 24px 50px rgba(0,0,0,.55)", zIndex: 20,
            }}>
              <button onClick={clearAll} aria-label="Fermer" style={{
                position: "absolute", top: 10, right: 10,
                width: 26, height: 26, background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.08)", borderRadius: 7,
                cursor: "pointer", display: "grid", placeItems: "center", color: "rgba(255,255,255,.55)",
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: pole.color, boxShadow: `0 0 20px ${pole.color}88,inset 0 0 0 1px rgba(255,255,255,.18)`, flexShrink: 0 }}/>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>{pole.kicker}</div>
                  <h3 style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 700, letterSpacing: "-.01em" }}>{pole.title}</h3>
                </div>
              </div>

              <p style={{ margin: "0 0 14px", fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,.7)" }}>{pole.desc}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
                {pole.stats.map((s) => (
                  <div key={s.k} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: "8px 10px" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-.02em", color: pole.color }}>{s.v}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginTop: 2 }}>{s.k}</div>
                  </div>
                ))}
              </div>

              <button onClick={() => router.push(pole.href)} style={{
                appearance: "none", border: 0, cursor: "pointer", width: "100%",
                background: pole.color, color: "#0a1432",
                fontFamily: "inherit", fontSize: 12, fontWeight: 700,
                padding: "10px 12px", borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              }}>
                Découvrir le pôle
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
