"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/navigation";

type Focus = "orange" | "blue" | "yellow" | "green" | null;

const POLE_LABELS: Partial<Record<NonNullable<Focus>, { name: string; color: string }>> = {
  orange: { name: "Conseil",                  color: "#ef8336" },
  blue:   { name: "Développement",            color: "#3b4fde" },
  yellow: { name: "DevOps & Infrastructure",  color: "#f5cb35" },
  green:  { name: "Nos agents IA",            color: "#5cc996" },
};

export function FactoryAnimation() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rx = useRef(0);
  const ry = useRef(0);
  const tx = useRef(0);
  const ty = useRef(0);
  const rafId = useRef(0);
  const [focus, setFocus] = useState<Focus>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const router = useRouter();

  const POLE_ROUTES: Partial<Record<NonNullable<Focus>, string>> = {
    orange: "/nos-poles/conseil",
    blue:   "/nos-poles/developpement",
    yellow: "/nos-poles/hebergement",
    green:  "/produits",
  };

  function handleEnter(id: Focus) {
    setFocus(id);
    setHasInteracted(true);
  }

  function handleClick(id: NonNullable<Focus>) {
    const route = POLE_ROUTES[id];
    if (route) router.push(route);
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      tx.current = (e.clientX / window.innerWidth - 0.5) * 2;
      ty.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      rx.current += ((-ty.current * 2) - rx.current) * 0.06;
      ry.current += ((tx.current * 3) - ry.current) * 0.06;
      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `rotateX(${rx.current.toFixed(2)}deg) rotateY(${ry.current.toFixed(2)}deg)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const shedStyle = (id: Focus) => {
    const isActive = focus === id;
    const isDimmed = focus !== null && !isActive;
    return {
      transformBox: "fill-box" as const,
      transformOrigin: "50% 100%",
      transition: "transform .35s cubic-bezier(.2,.8,.2,1), filter .35s ease, opacity .35s ease",
      transform: isActive ? "translateY(-22px) scale(1.09)" : "none",
      filter: isActive
        ? "drop-shadow(0 22px 34px rgba(0,0,0,.55)) drop-shadow(0 0 36px rgba(255,255,255,.35))"
        : isDimmed ? "saturate(.55) brightness(.75)" : "none",
      opacity: isDimmed ? 0.35 : 1,
      cursor: "pointer",
    };
  };

  const grayStyle = () => ({
    transition: "opacity .35s ease, filter .35s ease",
    opacity: focus ? 0.38 : 1,
    filter: focus ? "saturate(.6) brightness(.8)" : "none",
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <style>{`
        @keyframes driftA { 0%{transform:translateX(-30px)} 50%{transform:translateX(40px)} 100%{transform:translateX(-30px)} }
        @keyframes driftB { 0%{transform:translateX(25px)}  50%{transform:translateX(-35px)} 100%{transform:translateX(25px)} }
        @keyframes driftC { 0%{transform:translateX(-45px)} 50%{transform:translateX(55px)} 100%{transform:translateX(-45px)} }
        @keyframes bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes puff   { 0%{transform:translate(0,0) scale(.5); opacity:0} 15%{opacity:.9} 70%{opacity:.5} 100%{transform:translate(var(--pdx,10px),-160px) scale(1.5); opacity:0} }
        @keyframes shedPulse { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.18) drop-shadow(0 0 18px rgba(255,255,255,.18))} }
        @keyframes labelBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .fa-cloud-a { animation: driftA 22s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .fa-cloud-b { animation: driftB 18s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .fa-cloud-c { animation: driftC 28s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .fa-bob-a   { animation: bob 6s ease-in-out infinite;      transform-box: fill-box; }
        .fa-bob-b   { animation: bob 7s ease-in-out infinite .5s;  transform-box: fill-box; }
        .fa-bob-c   { animation: bob 8s ease-in-out infinite 1s;   transform-box: fill-box; }
        .fa-puff    { transform-box: fill-box; transform-origin: center; animation: puff 4.5s ease-out infinite; }
        .fa-shed-idle { animation: shedPulse 3s ease-in-out infinite; }
        .fa-label   { animation: labelBob 3s ease-in-out infinite; }
      `}</style>

      {/* Étiquettes cliquables — toujours visibles, disparaissent après interaction */}
      {([
        { id: "orange", label: "Conseil",           color: "#ef8336", left: "26%", top: "26%" },
        { id: "blue",   label: "Développement",     color: "#6c7ff2", left: "38%", top: "21%" },
        { id: "yellow", label: "DevOps",            color: "#f5cb35", left: "50%", top: "17%" },
        { id: "green",  label: "Nos agents IA",     color: "#5cc996", left: "72%", top: "27%" },
      ] as const).map(({ id, label, color, left, top }) => (
        <div
          key={id}
          className="fa-label"
          onClick={() => handleClick(id)}
          style={{
            position: "absolute",
            left,
            top,
            transform: "translateX(-50%)",
            pointerEvents: "auto",
            cursor: "pointer",
            zIndex: 20,
            transition: "opacity .5s ease",
            opacity: hasInteracted ? 0 : 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 10px 4px 8px",
              borderRadius: "999px",
              background: "rgba(10,14,30,0.75)",
              border: `1px solid ${color}55`,
              backdropFilter: "blur(6px)",
              boxShadow: `0 0 12px ${color}33`,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
            <span style={{ fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.04em", color: "#fff" }}>
              {label}
            </span>
            {/* Icône curseur */}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.7 }}>
              <path d="M2 2l7 3.5-3.5 1L4 10 2 2z" fill={color} />
            </svg>
          </div>
          {/* Flèche vers le bas */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `5px solid ${color}99` }} />
          </div>
        </div>
      ))}

      {/* Label flottant au hover */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
          transition: "opacity .25s ease",
          opacity: focus && POLE_LABELS[focus] ? 1 : 0,
        }}
      >
        {focus && POLE_LABELS[focus] && (
          <span
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              letterSpacing: "-0.02em",
              color: POLE_LABELS[focus]!.color,
              textShadow: `0 0 32px ${POLE_LABELS[focus]!.color}99`,
              whiteSpace: "nowrap",
            }}
          >
            {POLE_LABELS[focus]!.name}
          </span>
        )}
      </div>

      {/* Hint "survol" — disparaît après la première interaction */}
      <div
        style={{
          position: "absolute",
          bottom: "14%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
          transition: "opacity .6s ease",
          opacity: hasInteracted ? 0 : 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontWeight: 500,
            fontSize: "clamp(.7rem, 1.2vw, .9rem)",
            letterSpacing: ".04em",
            color: "rgba(255,255,255,.5)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 3h6M12 3v4M5.5 7.5l1.5 1.5M18.5 7.5l-1.5 1.5M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 17v3m6-3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Survolez les bâtiments
        </span>
      </div>

      <div style={{ perspective: "2400px", width: "100%", height: "100%" }}>
        <div
          ref={sceneRef}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1448 / 1086",
            willChange: "transform",
            transition: "transform .5s cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <svg
            viewBox="0 0 1448 1086"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", overflow: "visible" }}
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="fa-groundShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000" stopOpacity=".35"/>
                <stop offset="100%" stopColor="#000" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="fa-gOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef8336"/><stop offset="100%" stopColor="#cc6420"/>
              </linearGradient>
              <linearGradient id="fa-gBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b4fde"/><stop offset="100%" stopColor="#2231a6"/>
              </linearGradient>
              <linearGradient id="fa-gYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5cb35"/><stop offset="100%" stopColor="#d4a018"/>
              </linearGradient>
              <linearGradient id="fa-gGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5cc996"/><stop offset="100%" stopColor="#2f8a63"/>
              </linearGradient>
              <linearGradient id="fa-gMetal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a8f97"/>
                <stop offset="40%" stopColor="#d0d4d9"/>
                <stop offset="60%" stopColor="#d0d4d9"/>
                <stop offset="100%" stopColor="#7a7f87"/>
              </linearGradient>
              <linearGradient id="fa-gStack" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#757a82"/>
                <stop offset="50%" stopColor="#a6abb2"/>
                <stop offset="100%" stopColor="#6e737b"/>
              </linearGradient>
              <linearGradient id="fa-gRoof" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ece6d7"/><stop offset="100%" stopColor="#b6ae9b"/>
              </linearGradient>
              <linearGradient id="fa-gHull" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a3858"/><stop offset="100%" stopColor="#121a30"/>
              </linearGradient>
              <linearGradient id="fa-gBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a476b"/><stop offset="100%" stopColor="#1a2240"/>
              </linearGradient>
              <linearGradient id="fa-gCloud" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#d7dce6"/>
              </linearGradient>
            </defs>

            {/* Ombre sol */}
            <ellipse cx="724" cy="970" rx="620" ry="60" fill="url(#fa-groundShadow)"/>

            {/* Nuages */}
            <g className="fa-cloud-a"><g className="fa-bob-a">
              <g fill="url(#fa-gCloud)">
                <ellipse cx="300" cy="195" rx="78" ry="42"/>
                <ellipse cx="240" cy="210" rx="55" ry="34"/>
                <ellipse cx="360" cy="210" rx="58" ry="32"/>
                <ellipse cx="300" cy="170" rx="48" ry="30"/>
              </g>
              <ellipse cx="280" cy="165" rx="40" ry="8" fill="#ffffff" opacity=".6"/>
            </g></g>
            <g className="fa-cloud-b"><g className="fa-bob-b">
              <g fill="url(#fa-gCloud)">
                <ellipse cx="520" cy="245" rx="52" ry="28"/>
                <ellipse cx="480" cy="255" rx="36" ry="22"/>
                <ellipse cx="560" cy="255" rx="40" ry="22"/>
                <ellipse cx="520" cy="225" rx="30" ry="20"/>
              </g>
              <ellipse cx="510" cy="222" rx="24" ry="5" fill="#ffffff" opacity=".55"/>
            </g></g>
            <g className="fa-cloud-c"><g className="fa-bob-c">
              <g fill="url(#fa-gCloud)">
                <ellipse cx="1120" cy="140" rx="44" ry="24"/>
                <ellipse cx="1088" cy="150" rx="30" ry="18"/>
                <ellipse cx="1152" cy="150" rx="32" ry="18"/>
                <ellipse cx="1120" cy="122" rx="26" ry="16"/>
              </g>
            </g></g>

            {/* Cheminées grises */}
            <g style={grayStyle()}>
              <g>
                <rect x="702" y="190" width="46" height="460" rx="6" fill="url(#fa-gStack)"/>
                <rect x="696" y="186" width="58" height="18" rx="4" fill="#8a9099"/>
                <rect x="696" y="300" width="58" height="10" rx="3" fill="#8a9099"/>
                <rect x="696" y="430" width="58" height="10" rx="3" fill="#8a9099"/>
                <rect x="712" y="210" width="6" height="420" fill="#ffffff" opacity=".15"/>
              </g>
              <g>
                <rect x="790" y="220" width="46" height="430" rx="6" fill="url(#fa-gStack)"/>
                <rect x="784" y="216" width="58" height="18" rx="4" fill="#8a9099"/>
                <rect x="784" y="330" width="58" height="10" rx="3" fill="#8a9099"/>
                <rect x="784" y="460" width="58" height="10" rx="3" fill="#8a9099"/>
                <rect x="800" y="240" width="6" height="390" fill="#ffffff" opacity=".15"/>
              </g>
              <g>
                <circle className="fa-puff" cx="725" cy="190" r="12" fill="#d7dbe3" opacity=".85" style={{"--pdx":"8px", animationDelay:".4s", animationDuration:"5s"} as React.CSSProperties}/>
                <circle className="fa-puff" cx="720" cy="190" r="10" fill="#d7dbe3" opacity=".85" style={{"--pdx":"16px", animationDelay:"2.1s", animationDuration:"5s"} as React.CSSProperties}/>
                <circle className="fa-puff" cx="813" cy="220" r="12" fill="#d7dbe3" opacity=".85" style={{"--pdx":"-6px", animationDelay:"1.3s", animationDuration:"5.5s"} as React.CSSProperties}/>
                <circle className="fa-puff" cx="818" cy="220" r="10" fill="#d7dbe3" opacity=".85" style={{"--pdx":"4px", animationDelay:"3.0s", animationDuration:"5.5s"} as React.CSSProperties}/>
              </g>
            </g>

            {/* Silos */}
            <g style={grayStyle()}>
              <g>
                <rect x="134" y="460" width="96" height="420" fill="url(#fa-gMetal)"/>
                <ellipse cx="182" cy="460" rx="48" ry="22" fill="url(#fa-gMetal)"/>
                <ellipse cx="182" cy="456" rx="48" ry="16" fill="#e3e6ea"/>
                <rect x="130" y="540" width="104" height="6" fill="#8a9099"/>
                <rect x="130" y="660" width="104" height="6" fill="#8a9099"/>
                <rect x="130" y="780" width="104" height="6" fill="#8a9099"/>
                <rect x="152" y="480" width="10" height="380" rx="4" fill="#ffffff" opacity=".5"/>
                <rect x="176" y="428" width="12" height="36" rx="3" fill="#8a9099"/>
                <circle cx="182" cy="426" r="6" fill="#8a9099"/>
              </g>
              <g>
                <rect x="240" y="520" width="90" height="360" fill="url(#fa-gMetal)"/>
                <ellipse cx="285" cy="520" rx="45" ry="20" fill="url(#fa-gMetal)"/>
                <ellipse cx="285" cy="517" rx="45" ry="14" fill="#e3e6ea"/>
                <rect x="236" y="600" width="98" height="6" fill="#8a9099"/>
                <rect x="236" y="720" width="98" height="6" fill="#8a9099"/>
                <rect x="236" y="840" width="98" height="6" fill="#8a9099"/>
                <rect x="256" y="540" width="10" height="320" rx="4" fill="#ffffff" opacity=".5"/>
                <path d="M 182,460 C 215,430 250,430 285,460" fill="none" stroke="#9aa0a8" strokeWidth="10" strokeLinecap="round"/>
              </g>
              <g stroke="#6e737b" strokeWidth="3" fill="none">
                <line x1="128" y1="470" x2="128" y2="870"/>
                <line x1="136" y1="470" x2="136" y2="870"/>
                <g strokeWidth="2">
                  {[500,540,580,620,660,700,740,780,820].map(y => (
                    <line key={y} x1="128" y1={y} x2="136" y2={y}/>
                  ))}
                </g>
              </g>
            </g>

            {/* Sheds colorés */}
            <g style={shedStyle("orange")} className={!hasInteracted && !focus ? "fa-shed-idle" : ""} onMouseEnter={() => handleEnter("orange")} onMouseLeave={() => setFocus(null)} onClick={() => handleClick("orange")}>
              <path d="M 318,860 L 318,400 L 470,300 L 470,860 Z" fill="url(#fa-gOrange)"/>
              <path d="M 470,300 L 484,312 L 484,872 L 470,860 Z" fill="#b7541a"/>
              <path d="M 318,400 L 470,300 L 486,318 L 334,418 Z" fill="url(#fa-gRoof)"/>
              <path d="M 486,318 L 486,328 L 334,428 L 334,418 Z" fill="#b6ae9b"/>
              <path d="M 340,412 L 472,326 L 472,360 L 340,446 Z" fill="#0c1226"/>
              <path d="M 340,412 L 472,326 L 472,332 L 340,418 Z" fill="#2a355c" opacity=".9"/>
              <rect x="388" y="500" width="38" height="130" rx="4" fill="#0c1226"/>
              <rect x="388" y="500" width="38" height="8" fill="#1b2444"/>
              <path d="M 318,400 L 470,300 L 470,310 L 318,410 Z" fill="#ffffff" opacity=".12"/>
            </g>

            <g style={shedStyle("blue")} className={!hasInteracted && !focus ? "fa-shed-idle" : ""} onMouseEnter={() => handleEnter("blue")} onMouseLeave={() => setFocus(null)} onClick={() => handleClick("blue")}>
              <path d="M 486,860 L 486,360 L 638,260 L 638,860 Z" fill="url(#fa-gBlue)"/>
              <path d="M 638,260 L 652,272 L 652,872 L 638,860 Z" fill="#1d2a8f"/>
              <path d="M 486,360 L 638,260 L 654,278 L 502,378 Z" fill="url(#fa-gRoof)"/>
              <path d="M 654,278 L 654,288 L 502,388 L 502,378 Z" fill="#b6ae9b"/>
              <path d="M 508,372 L 640,286 L 640,320 L 508,406 Z" fill="#0c1226"/>
              <path d="M 508,372 L 640,286 L 640,292 L 508,378 Z" fill="#2a355c" opacity=".9"/>
              <rect x="556" y="470" width="40" height="140" rx="4" fill="#0c1226"/>
              <rect x="556" y="470" width="40" height="8" fill="#1b2444"/>
              <path d="M 486,360 L 638,260 L 638,270 L 486,370 Z" fill="#ffffff" opacity=".12"/>
            </g>

            <g style={shedStyle("yellow")} className={!hasInteracted && !focus ? "fa-shed-idle" : ""} onMouseEnter={() => handleEnter("yellow")} onMouseLeave={() => setFocus(null)} onClick={() => handleClick("yellow")}>
              <path d="M 654,860 L 654,320 L 806,220 L 806,860 Z" fill="url(#fa-gYellow)"/>
              <path d="M 806,220 L 820,232 L 820,872 L 806,860 Z" fill="#c3971a"/>
              <path d="M 654,320 L 806,220 L 822,238 L 670,338 Z" fill="url(#fa-gRoof)"/>
              <path d="M 822,238 L 822,248 L 670,348 L 670,338 Z" fill="#b6ae9b"/>
              <path d="M 676,332 L 808,246 L 808,280 L 676,366 Z" fill="#0c1226"/>
              <path d="M 676,332 L 808,246 L 808,252 L 676,338 Z" fill="#2a355c" opacity=".9"/>
              <rect x="724" y="430" width="42" height="150" rx="4" fill="#0c1226"/>
              <rect x="724" y="430" width="42" height="8" fill="#1b2444"/>
              <path d="M 654,320 L 806,220 L 806,230 L 654,330 Z" fill="#ffffff" opacity=".12"/>
            </g>

            {/* Grange centrale */}
            <g style={grayStyle()} transform="translate(720 880) scale(0.78) translate(-720 -880)">
              <path d="M 340,880 L 340,600 L 720,470 L 1100,600 L 1100,880 Z" fill="url(#fa-gHull)"/>
              <path d="M 340,600 L 720,470 L 1100,600 L 1078,616 L 720,490 L 362,616 Z" fill="#b6ae9b"/>
              <path d="M 362,616 L 720,490 L 1078,616 L 1078,648 L 720,522 L 362,648 Z" fill="url(#fa-gRoof)"/>
              <g stroke="#a89f8a" strokeWidth="2" opacity=".7">
                <line x1="390" y1="636" x2="720" y2="506"/>
                <line x1="450" y1="632" x2="720" y2="516"/>
                <line x1="520" y1="626" x2="720" y2="526"/>
                <line x1="590" y1="620" x2="720" y2="536"/>
                <line x1="720" y1="506" x2="1050" y2="636"/>
                <line x1="720" y1="516" x2="990" y2="632"/>
                <line x1="720" y1="526" x2="930" y2="626"/>
                <line x1="720" y1="536" x2="870" y2="620"/>
              </g>
              <g>
                <rect x="380" y="660" width="300" height="210" rx="6" fill="#efe8d4"/>
                <g fill="#0c1226">
                  {[672,722,772].map(y =>
                    [392,440,488,536,584,632].map(x => (
                      <rect key={`${x}-${y}`} x={x} y={y} width="40" height={y===772?44:44} rx="2"/>
                    ))
                  )}
                  {[392,440,488,536,584,632].map(x => (
                    <rect key={`bot-${x}`} x={x} y={822} width="40" height="36" rx="2"/>
                  ))}
                </g>
              </g>
              <g>
                <circle cx="830" cy="720" r="48" fill="#efe8d4"/>
                <circle cx="830" cy="720" r="36" fill="#0c1226"/>
                <rect x="792" y="716" width="76" height="8" fill="#efe8d4"/>
                <rect x="826" y="682" width="8" height="76" fill="#efe8d4"/>
                <circle cx="830" cy="720" r="6" fill="#efe8d4"/>
              </g>
              <g>
                <rect x="900" y="710" width="90" height="160" rx="4" fill="#c9c3b2"/>
                <g stroke="#8c8673" strokeWidth="1">
                  {[730,750,770,790,810,830,850].map(y => (
                    <line key={y} x1="904" y1={y} x2="986" y2={y}/>
                  ))}
                </g>
              </g>
              <g>
                <rect x="1010" y="710" width="68" height="160" rx="4" fill="#efe8d4"/>
                <g fill="#0c1226">
                  <rect x="1016" y="716" width="26" height="72" rx="2"/>
                  <rect x="1046" y="716" width="26" height="72" rx="2"/>
                  <rect x="1016" y="794" width="26" height="72" rx="2"/>
                  <rect x="1046" y="794" width="26" height="72" rx="2"/>
                </g>
              </g>
            </g>

            {/* Cheminée verte */}
            <g style={shedStyle("green")} className={!hasInteracted && !focus ? "fa-shed-idle" : ""} onMouseEnter={() => handleEnter("green")} onMouseLeave={() => setFocus(null)} onClick={() => handleClick("green")}>
              <path d="M 966,870 L 1000,470 L 1110,470 L 1144,870 Z" fill="url(#fa-gGreen)"/>
              <path d="M 1110,470 L 1144,870 L 1118,870 L 1092,470 Z" fill="#2f8a63" opacity=".7"/>
              <rect x="996" y="440" width="118" height="34" fill="url(#fa-gStack)"/>
              <path d="M 990,440 L 1120,440 L 1114,430 L 996,430 Z" fill="#8a9099"/>
              <path d="M 1006,440 L 1104,440 L 1092,340 L 1018,340 Z" fill="url(#fa-gStack)"/>
              <ellipse cx="1055" cy="340" rx="37" ry="8" fill="#6e737b"/>
              <ellipse cx="1055" cy="340" rx="37" ry="6" fill="#a6abb2"/>
              <rect x="1015" y="490" width="12" height="370" fill="#ffffff" opacity=".18"/>
              <circle className="fa-puff" cx="1060" cy="340" r="36" fill="#ffffff" style={{"--pdx":"14px"} as React.CSSProperties}/>
              <circle className="fa-puff" cx="1050" cy="340" r="30" fill="#eef1f7" style={{"--pdx":"24px", animationDelay:".9s"} as React.CSSProperties}/>
              <circle className="fa-puff" cx="1072" cy="340" r="38" fill="#f8f9fc" style={{"--pdx":"4px", animationDelay:"1.8s"} as React.CSSProperties}/>
              <circle className="fa-puff" cx="1055" cy="340" r="32" fill="#e8ebf1" style={{"--pdx":"22px", animationDelay:"2.7s"} as React.CSSProperties}/>
              <circle className="fa-puff" cx="1068" cy="340" r="40" fill="#ffffff" style={{"--pdx":"-4px", animationDelay:"3.5s"} as React.CSSProperties}/>
            </g>

            {/* Socle */}
            <g>
              <path d="M 120,880 L 1180,880 L 1220,920 L 80,920 Z" fill="url(#fa-gBase)"/>
              <path d="M 80,920 L 1220,920 L 1220,945 L 80,945 Z" fill="#1a2240"/>
              <path d="M 120,880 L 1180,880 L 1180,886 L 120,886 Z" fill="#ffffff" opacity=".12"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
