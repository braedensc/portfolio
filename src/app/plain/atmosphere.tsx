"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed night-sky atmosphere for the simple view: a twinkling star field and
 * generated topographic contour lines behind the content, plus the vignette
 * gradient. Everything is decorative (aria-hidden).
 *
 * The star + contour geometry is produced by a seeded RNG at module load, so
 * the server and client render byte-identical markup (no hydration mismatch)
 * and the sky is stable across reloads. The contour draw-in animation is a
 * client-only effect, skipped under reduced-motion.
 */

function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

interface Star {
  left: number;
  top: number;
  s2: boolean;
  delay: number;
  dur: number;
}

interface Contour {
  d: string;
  strong: boolean;
}

const TW = 1440;
const TH = 900;

function buildStars(rnd: () => number): Star[] {
  const out: Star[] = [];
  for (let i = 0; i < 110; i++) {
    out.push({
      left: rnd() * 100,
      top: rnd() * 46,
      s2: rnd() > 0.5,
      delay: rnd() * 4,
      dur: 2.6 + rnd() * 4,
    });
  }
  return out;
}

function buildContours(rnd: () => number): Contour[] {
  const summits = [
    { x: 1090, y: 260, base: 40, rings: 9, amp: 22 },
    { x: 260, y: 640, base: 34, rings: 7, amp: 18 },
    { x: 700, y: 890, base: 46, rings: 8, amp: 26 },
  ];
  const out: Contour[] = [];
  summits.forEach((su) => {
    const ph = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28];
    for (let k = 1; k <= su.rings; k++) {
      const r = su.base * k * 1.18;
      let d = "";
      const steps = 64;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const wob =
          Math.sin(a * 3 + ph[0] + k * 0.35) * su.amp * 0.45 +
          Math.sin(a * 5 + ph[1] - k * 0.2) * su.amp * 0.3 +
          Math.sin(a * 2 + ph[2]) * su.amp * 0.55;
        const rr = r + wob * (1 + k * 0.12);
        const x = su.x + Math.cos(a) * rr * 1.12;
        const y = su.y + Math.sin(a) * rr * 0.82;
        d += (i ? "L" : "M") + x.toFixed(1) + "," + y.toFixed(1);
      }
      d += "Z";
      out.push({ d, strong: k % 4 === 0 });
    }
  });
  return out;
}

// One shared deterministic stream (stars first, then contours) — mirrors the
// original mock so the sky looks the same.
const rng = makeRng(20260710);
const STARS = buildStars(rng);
const CONTOURS = buildContours(rng);

export default function Atmosphere() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const paths = svgRef.current?.querySelectorAll("path");
    paths?.forEach((p, i) => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = String(L);
      p.style.strokeDashoffset = String(L);
      p.style.transition = `stroke-dashoffset 2.2s ease ${
        (i % 9) * 0.14 + Math.floor(i / 9) * 0.3
      }s`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          p.style.strokeDashoffset = "0";
        }),
      );
    });
  }, []);

  return (
    <>
      <div id="sky" aria-hidden="true">
        <svg ref={svgRef} viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="xMidYMid slice">
          {CONTOURS.map((c, i) => (
            <path
              key={i}
              d={c.d}
              fill="none"
              stroke={c.strong ? "rgba(120,158,193,.34)" : "rgba(84,118,150,.20)"}
              strokeWidth={c.strong ? 1.3 : 1}
            />
          ))}
        </svg>
        {STARS.map((s, i) => (
          <div
            key={i}
            className={"star" + (s.s2 ? " s2" : "")}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay.toFixed(2)}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>
      <div id="grad" aria-hidden="true" />
    </>
  );
}
