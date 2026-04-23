"use client";

import { useEffect, useRef } from "react";

export function StarCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef  = useRef<SVGSVGElement>(null);

  const pos = useRef({ x: -300, y: -300 });
  const cur = useRef({ x: -300, y: -300 });
  const rafId = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const wrap = wrapRef.current;
    const svg  = svgRef.current;
    if (!wrap || !svg) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const isCta = !!(e.target as Element)?.closest("a, button");
      svg.style.color = isCta ? "#FF7E33" : "white";
    };

    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.13;
      cur.current.y += (pos.current.y - cur.current.y) * 0.13;
      wrap.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`;
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    rafId.current = requestAnimationFrame(loop);
    wrap.style.opacity = "1";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
        .cloud-svg {
          display: block;
          transform: translate(-50%, -50%);
          transition: color 0.25s ease;
        }
      `}</style>

      <div
        ref={wrapRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          willChange: "transform",
          opacity: 0,
        }}
      >
        {/* Nuage fait de formes superposées — fill="currentColor" pour changer la couleur d'un coup */}
        <svg
          ref={svgRef}
          width="44"
          height="30"
          viewBox="0 0 50 34"
          className="cloud-svg"
          style={{ color: "white" }}
        >
          <circle cx="13" cy="22" r="9"  fill="currentColor" />
          <circle cx="25" cy="15" r="12" fill="currentColor" />
          <circle cx="37" cy="22" r="8"  fill="currentColor" />
          <rect   x="8"  y="21"  width="34" height="11" rx="0" fill="currentColor" />
        </svg>
      </div>
    </>
  );
}
