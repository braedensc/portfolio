/**
 * SVG art for decor, signposts, furnished set-pieces, and project stations.
 * Pure presentational components — positioning/scaling is done by the engine
 * on the wrapping .item. Ambient motion is CSS-only (world.css), so the
 * reduced-motion block neutralizes all of it in one place.
 */

import type { DecorKind, SetPieceKind, StationKind } from "@/content/site";
import { BEAR } from "./sprites";
import { TodoClawIcon, TodoClawPeek, SleepingPuppy, PawPrint } from "./todoclaw-art";

/* ---------- decor ---------- */

function GrassArt() {
  return (
    <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
      <path
        d="M13 16C12 8 10 5 7 2M13 16C13 7 13 4 13 1M13 16C14 8 17 5 20 2M13 16C11 10 8 8 4 7M13 16C15 10 18 8 22 7"
        stroke="#3d5a33"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RockArt({ fill, ridge }: { fill: string; ridge: string }) {
  return (
    <svg width="30" height="18" viewBox="0 0 30 18" aria-hidden="true">
      <path d="M4 17L2 10Q6 2 14 3Q26 2 28 11L26 17Z" fill={fill} />
      <path d="M7 8Q13 4 21 6" stroke={ridge} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PineArt() {
  return (
    <svg width="36" height="54" viewBox="0 0 36 54" aria-hidden="true">
      <path
        d="M18 1L29 19L23 18L32 34L25 33L34 49L2 49L11 33L4 34L13 18L7 19Z"
        fill="#1b3122"
      />
      <path d="M16 48L20 48L20 53L16 53Z" fill="#3a2f22" />
    </svg>
  );
}

function LogArt() {
  return (
    <svg width="44" height="16" viewBox="0 0 44 16" aria-hidden="true">
      <rect x="2" y="4" width="38" height="9" rx="4.5" fill="#4a3423" />
      <ellipse cx="40" cy="8.5" rx="3" ry="4.5" fill="#6b5236" />
    </svg>
  );
}

/**
 * Wildflower cluster — four variants: lupine / poppy / paintbrush, plus
 * v3 = purple statice (round 4B, from the client's photo): branched stems
 * ending in papery clustered sprays of small purple heads.
 */
function FlowersArt({ v = 0 }: { v?: number }) {
  if (v % 4 === 3) {
    const sprays = [
      [6, 9],
      [14, 5],
      [22, 8],
      [30, 6],
    ] as const;
    return (
      <svg width="38" height="28" viewBox="0 0 38 28" aria-hidden="true">
        <path
          d="M8 28C8 20 6 15 6 11M15 28C15 18 14 11 14 7M23 28C23 19 22 13 22 10M29 28C29 20 30 12 30 8M15 20C12 18 10 17 8 17M23 21C26 19 28 18 30 18"
          stroke="#5a7048"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {sprays.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x - 2.2} cy={y + 1} r="1.8" fill="#8a6fd0" />
            <circle cx={x + 2.2} cy={y + 1} r="1.8" fill="#7a5fb5" />
            <circle cx={x} cy={y - 1.6} r="1.8" fill="#a68fe0" />
            <circle cx={x + 0.6} cy={y + 2.6} r="1.5" fill="#8a6fd0" />
            <circle cx={x - 0.8} cy={y} r="0.7" fill="#f0eee6" opacity="0.8" />
          </g>
        ))}
      </svg>
    );
  }
  const heads = [
    ["#8a7fd6", "#b9b1ef", "#f0eee6"], // lupine purples + white
    ["#e8a33d", "#f2c063", "#e8a33d"], // golden poppy
    ["#d1543e", "#e8734f", "#d1543e"], // indian paintbrush
  ][v % 3];
  return (
    <svg width="36" height="26" viewBox="0 0 36 26" aria-hidden="true">
      <path
        d="M7 26C7 18 6 14 5 10M14 26C14 17 15 13 16 8M22 26C22 18 21 14 20 9M29 26C29 19 30 15 31 11"
        stroke="#47663a"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="5" cy="9" r="3" fill={heads[0]} />
      <circle cx="16" cy="7" r="3.4" fill={heads[1]} />
      <circle cx="20" cy="8" r="2.6" fill={heads[2]} />
      <circle cx="31" cy="10" r="3" fill={heads[0]} />
      <circle cx="16" cy="7" r="1.2" fill="#5c4426" opacity="0.55" />
      <circle cx="5" cy="9" r="1" fill="#5c4426" opacity="0.45" />
      <circle cx="31" cy="10" r="1" fill="#5c4426" opacity="0.45" />
    </svg>
  );
}

/** Granite boulder wearing a cap of moss. */
function MossRockArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="46"
      height="26"
      viewBox="0 0 46 26"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 25L3 14Q8 3 22 4Q40 3 43 16L40 25Z" fill="#5e5a4e" />
      <path d="M10 11Q20 5 33 8" stroke="#75705f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 10Q14 3 24 5Q20 8 14 9Z" fill="#5a7a42" />
      <path d="M26 5Q34 4 38 9Q33 10 28 8Z" fill="#4c6b38" />
      <ellipse cx="34" cy="20" rx="4" ry="2" fill="#4c6b38" opacity="0.6" />
    </svg>
  );
}

/**
 * The running track, rebuilt round 4B: a classic red tartan STADIUM oval —
 * two straights joined by squashed semicircle ends — with SIX lanes behind
 * crisp solid white lines. Every boundary and lane line is generated from
 * ONE `stadium(radius)` function (same center, same straight length, radius
 * shrinking one lane width per lane), so the lanes are concentric with the
 * band and can never drift off it. A white start/finish line crosses the
 * home straight with small lane numbers beside it.
 */
function TrackArt() {
  const CX = 330;
  const CY = 85;
  const L = 115; // straight half-length
  const R0 = 195; // outer end radius
  const W = 14; // lane width
  const LANES = 6;
  const F = 0.4; // vertical squash (fake ground perspective)
  const RI = R0 - LANES * W; // inner boundary radius (111)
  const stadium = (r: number) => {
    const ry = r * F;
    return [
      `M ${CX - L} ${CY - ry}`,
      `L ${CX + L} ${CY - ry}`,
      `A ${r} ${ry} 0 0 1 ${CX + L} ${CY + ry}`,
      `L ${CX - L} ${CY + ry}`,
      `A ${r} ${ry} 0 0 1 ${CX - L} ${CY - ry}`,
      "Z",
    ].join(" ");
  };
  const white = "rgba(245, 240, 228, 0.92)";
  return (
    <svg width="660" height="172" viewBox="0 0 660 172" aria-hidden="true">
      {/* the tartan band: outer stadium minus inner stadium */}
      <path d={`${stadium(R0)} ${stadium(RI)}`} fill="#a8402e" fillRule="evenodd" />
      {/* worn patches + water stain, inside the band */}
      <ellipse cx={CX - 150} cy={CY + 58} rx="26" ry="6" fill="rgba(122,42,28,0.55)" />
      <ellipse cx={CX + 140} cy={CY - 62} rx="20" ry="5" fill="rgba(122,42,28,0.5)" />
      <ellipse cx={CX + 180} cy={CY + 52} rx="22" ry="5" fill="rgba(240,230,208,0.08)" />
      {/* lane separators — solid white, one lane width apart */}
      {[1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={stadium(R0 - W * i)} fill="none" stroke={white} strokeWidth="1.7" />
      ))}
      {/* outer + inner boundaries (the white curbs) */}
      <path d={stadium(R0)} fill="none" stroke={white} strokeWidth="2.6" />
      <path d={stadium(RI)} fill="none" stroke={white} strokeWidth="2.2" />
      {/* start/finish line across the home straight */}
      <path
        d={`M ${CX - L} ${CY + RI * F} L ${CX - L} ${CY + R0 * F}`}
        stroke={white}
        strokeWidth="3.4"
      />
      {/* subtle lane numbers beside the start line (1 = inside lane) */}
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <text
          key={n}
          x={CX - L + 11}
          y={CY + (RI + W * (n - 0.5)) * F + 1.8}
          textAnchor="middle"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="4.6"
          fill="rgba(245,240,228,0.85)"
        >
          {n}
        </text>
      ))}
      {/* infield: a faint mowed tint so the oval reads against the meadow */}
      <path d={stadium(RI - 4)} fill="rgba(214,232,164,0.1)" />
    </svg>
  );
}

/**
 * Small ground bird, redrawn on the same 3px logical-pixel grid the canvas
 * sprites use (round-3 consistency pass). The wrapper class hops it along.
 */
function BirdArt({ v = 0 }: { v?: number }) {
  const P = 3; // logical pixel — matches the hiker/chef/bear canvas scale
  const px: ReadonlyArray<readonly [number, number, string]> = [
    [4, 0, "#8a7660"], // head
    [5, 0, "#26201c"], // eye
    [6, 1, "#d9a441"], // beak
    [0, 1, "#6e5c48"], // tail
    [1, 1, "#8a7660"],
    [2, 1, "#8a7660"],
    [3, 1, "#8a7660"],
    [4, 1, "#8a7660"],
    [5, 1, "#8a7660"],
    [1, 2, "#6e5c48"], // wing shade
    [2, 2, "#8a7660"],
    [3, 2, "#8a7660"],
    [4, 2, "#8a7660"],
    [2, 3, "#6b5236"], // legs
    [4, 3, "#6b5236"],
  ];
  return (
    <div className={`birdHop ${v ? "birdB" : ""}`} aria-hidden="true">
      <svg width={7 * P} height={4 * P} viewBox={`0 0 ${7 * P} ${4 * P}`} shapeRendering="crispEdges">
        {px.map(([x, y, c]) => (
          <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={c} />
        ))}
      </svg>
    </div>
  );
}

/**
 * Butterfly on the same 3px logical-pixel grid — wing flap + lazy drift,
 * two color variants.
 */
function ButterflyArt({ v = 0 }: { v?: number }) {
  const P = 3;
  const wing = v ? "#b8c4e8" : "#d98f3d";
  const wingPx: ReadonlyArray<readonly [number, number]> = [
    [0, 0],
    [1, 0],
    [3, 0],
    [4, 0],
    [0, 1],
    [1, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [3, 2],
  ];
  return (
    <div className={`bflyDrift ${v ? "bflyB" : ""}`} aria-hidden="true">
      <svg width={5 * P} height={4 * P} viewBox={`0 0 ${5 * P} ${4 * P}`} shapeRendering="crispEdges">
        <g className="bflyWings">
          {wingPx.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={wing} />
          ))}
        </g>
        <rect x={2 * P} y={0} width={P} height={4 * P} fill="#33291f" />
      </svg>
    </div>
  );
}

/** String of lantern lights between two poles, with circling moths. */
function LanternsArt() {
  const drops: ReadonlyArray<readonly [number, number]> = [
    [32, 20],
    [61, 26],
    [85, 28],
    [109, 26],
    [138, 20],
  ];
  return (
    <div className="lanternWrap" aria-hidden="true">
      <svg width="170" height="72" viewBox="0 0 170 72">
        <rect x="5" y="10" width="3.5" height="60" rx="1.5" fill="#4a3a2c" />
        <rect x="161" y="10" width="3.5" height="60" rx="1.5" fill="#4a3a2c" />
        <g className="lanternString">
          <path d="M7 13Q85 34 163 13" stroke="#2b2320" strokeWidth="1.4" fill="none" />
          {drops.map(([x, y], i) => (
            <g key={x}>
              <path d={`M${x} ${y}L${x} ${y + 5}`} stroke="#2b2320" strokeWidth="1" />
              <circle
                className="lanternGlow"
                cx={x}
                cy={y + 8}
                r="2.6"
                fill="#ffd685"
                style={{ animationDelay: `${i * 0.7}s` }}
              />
            </g>
          ))}
        </g>
      </svg>
      <div className="moth mothA" />
      <div className="moth mothB" />
    </div>
  );
}

/** Trodden-earth patch (flat): bare dirt worn smooth, a few pebbles. */
function EarthArt({ v = 0 }: { v?: number }) {
  const w = [96, 68][v % 2];
  return (
    <svg width={w} height="26" viewBox={`0 0 ${w} 26`} aria-hidden="true">
      <ellipse cx={w / 2} cy="13" rx={w / 2 - 2} ry="10" fill="rgba(88,62,36,0.5)" />
      <ellipse cx={w / 2 - 8} cy="12" rx={w / 3} ry="6" fill="rgba(114,82,48,0.4)" />
      <circle cx={w * 0.3} cy="16" r="1.6" fill="#6e5940" />
      <circle cx={w * 0.7} cy="9" r="1.3" fill="#5c4a34" />
      <circle cx={w * 0.55} cy="18" r="1.1" fill="#6e5940" />
    </svg>
  );
}

/** Pine-needle duff scatter (flat). */
function NeedlesArt() {
  return (
    <svg width="64" height="18" viewBox="0 0 64 18" aria-hidden="true">
      <g stroke="rgba(146,98,52,0.6)" strokeWidth="1.1" strokeLinecap="round" fill="none">
        <path d="M6 12l7 -3M18 8l8 2M30 14l7 -4M44 9l8 3M12 16l6 -2M52 15l7 -3M36 6l6 1" />
      </g>
      <g stroke="rgba(94,60,32,0.5)" strokeWidth="1" strokeLinecap="round" fill="none">
        <path d="M10 7l6 2M26 11l6 -2M40 15l7 -2M50 8l6 -2" />
      </g>
    </svg>
  );
}

/** Small stone cluster. v1 = smooth sand-polished sandstone (slot canyon). */
function StonesArt({ v = 0 }: { v?: number }) {
  const [a, b, c, ridge] = v
    ? ["#a4713f", "#b98450", "#8a5c33", "#c9955e"]
    : ["#55504a", "#625c54", "#4c4640", "#6e685f"];
  return (
    <svg width="30" height="12" viewBox="0 0 30 12" aria-hidden="true">
      <ellipse cx="7" cy="8" rx="5" ry="3.4" fill={a} />
      <ellipse cx="16" cy="9" rx="3.6" ry="2.6" fill={b} />
      <ellipse cx="24" cy="7.5" rx="4" ry="3" fill={c} />
      <path d="M4 6.5Q7 4.5 10 6" stroke={ridge} strokeWidth="1" fill="none" />
    </svg>
  );
}

/** Warm light pooling on the ground under a light source (flat). v1 = neon. */
function LightPoolArt({ v = 0 }: { v?: number }) {
  const background =
    v === 1
      ? "radial-gradient(ellipse at 40% 50%, rgba(255,45,85,0.16), rgba(255,45,85,0) 70%), radial-gradient(ellipse at 65% 50%, rgba(53,224,255,0.12), rgba(53,224,255,0) 70%)"
      : "radial-gradient(ellipse at center, rgba(255,190,90,0.28), rgba(255,170,70,0.1) 55%, rgba(255,170,70,0) 78%)";
  return <div className="lightPool" style={{ background }} aria-hidden="true" />;
}

/** Tiny daisy scatter (flat ground cover). */
function DaisiesArt() {
  const dots = [
    [6, 10],
    [16, 5],
    [27, 12],
    [38, 7],
    [48, 13],
    [58, 6],
    [22, 16],
    [44, 17],
  ] as const;
  return (
    <svg width="66" height="22" viewBox="0 0 66 22" aria-hidden="true">
      {dots.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x - 1.3} cy={y} r="1.2" fill="#f0eee6" />
          <circle cx={x + 1.3} cy={y} r="1.2" fill="#f0eee6" />
          <circle cx={x} cy={y - 1.3} r="1.2" fill="#f0eee6" />
          <circle cx={x} cy={y + 1.3} r="1.2" fill="#f0eee6" />
          <circle cx={x} cy={y} r="1" fill="#e8c33d" />
        </g>
      ))}
    </svg>
  );
}

/** Clover patch (flat ground cover). */
function CloverArt() {
  const leaves = [
    [8, 8],
    [18, 5],
    [28, 9],
    [38, 6],
    [15, 13],
    [33, 14],
    [45, 10],
  ] as const;
  return (
    <svg width="54" height="20" viewBox="0 0 54 20" aria-hidden="true">
      {leaves.map(([x, y]) => (
        <g key={`${x}-${y}`} fill="#3f6031">
          <circle cx={x - 1.6} cy={y + 0.9} r="1.7" />
          <circle cx={x + 1.6} cy={y + 0.9} r="1.7" />
          <circle cx={x} cy={y - 1.4} r="1.7" />
        </g>
      ))}
    </svg>
  );
}

/** Worn dirt spot along a walking desire-line (flat). */
function WornArt({ v = 0 }: { v?: number }) {
  const w = [70, 50, 90][v % 3];
  return (
    <svg width={w} height="16" viewBox={`0 0 ${w} 16`} aria-hidden="true">
      <ellipse cx={w / 2} cy="8" rx={w / 2 - 2} ry="6" fill="rgba(140,118,74,0.32)" />
      <ellipse cx={w / 2} cy="8" rx={w / 3} ry="4" fill="rgba(158,134,86,0.28)" />
    </svg>
  );
}

/** Backpack leaning on a low stump. */
function BackpackArt() {
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" aria-hidden="true">
      <rect x="22" y="20" width="14" height="12" rx="2" fill="#5c4126" />
      <ellipse cx="29" cy="20" rx="7" ry="2.6" fill="#8a6a44" />
      <g transform="rotate(-9 14 22)">
        <rect x="5" y="8" width="18" height="24" rx="6" fill="#46608c" />
        <rect x="5" y="8" width="18" height="8" rx="4" fill="#38507a" />
        <rect x="9" y="20" width="10" height="8" rx="2" fill="#38507a" />
        <path d="M9 10L9 30M19 10L19 30" stroke="#2c405f" strokeWidth="1.6" />
        <circle cx="14" cy="7" r="2.4" fill="none" stroke="#2c405f" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

/** Bear canister — the tell of a camper who knows the rules. */
function CanisterArt() {
  return (
    <svg width="18" height="17" viewBox="0 0 18 17" aria-hidden="true">
      <rect x="2" y="4" width="14" height="12" rx="3" fill="#26262c" />
      <ellipse cx="9" cy="4.5" rx="7" ry="2.4" fill="#3a3a42" />
      <path d="M4 9L14 9" stroke="#3a3a42" strokeWidth="1.2" />
      <circle cx="6" cy="6" r="0.9" fill="#5d5d68" />
    </svg>
  );
}

/** Stump seat by the fire. Variant 1 is a touch taller. */
function StumpArt({ v = 0 }: { v?: number }) {
  const h = v ? 20 : 16;
  return (
    <svg width="30" height={h + 10} viewBox={`0 0 30 ${h + 10}`} aria-hidden="true">
      <rect x="4" y="7" width="22" height={h} fill="#5c4126" />
      <path d={`M4 ${h + 5}Q15 ${h + 10} 26 ${h + 5}`} fill="#4a3423" />
      <ellipse cx="15" cy="7" rx="11" ry="4.5" fill="#c8a878" />
      <ellipse cx="15" cy="7" rx="7" ry="2.8" fill="none" stroke="#a3805a" strokeWidth="1" />
      <ellipse cx="15" cy="7" rx="3.4" ry="1.4" fill="none" stroke="#a3805a" strokeWidth="0.8" />
    </svg>
  );
}

/** Dark pine with a pair of owl eyes that blink every few seconds. */
function OwlTreeArt() {
  return (
    <svg width="52" height="84" viewBox="0 0 52 84" aria-hidden="true">
      <path
        d="M26 2L41 28L33 27L46 52L36 50L49 76L3 76L16 50L6 52L19 27L11 28Z"
        fill="#101d15"
      />
      <rect x="23" y="75" width="6" height="8" fill="#2b2118" />
      <g className="owlEyes">
        <circle cx="21.5" cy="42" r="2.1" fill="#ffb84d" />
        <circle cx="29.5" cy="42" r="2.1" fill="#ffb84d" />
        <circle cx="21.5" cy="42" r="0.8" fill="#1d1207" />
        <circle cx="29.5" cy="42" r="0.8" fill="#1d1207" />
      </g>
    </svg>
  );
}

/** Wind-rippled sand lines for the slot canyon floor. */
function SandlineArt({ v = 0 }: { v?: number }) {
  const w = [96, 74, 118][v % 3];
  return (
    <svg width={w} height="14" viewBox={`0 0 ${w} 14`} aria-hidden="true">
      <path
        d={`M2 5Q${w * 0.25} 1 ${w * 0.5} 5T${w - 2} 5`}
        stroke="rgba(88,34,12,0.55)"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M6 11Q${w * 0.3} 7 ${w * 0.55} 11T${w - 6} 10`}
        stroke="rgba(120,58,24,0.5)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Fallen slab bridging a low spot in the canyon floor. */
function SlabArt() {
  return (
    <svg width="96" height="26" viewBox="0 0 96 26" aria-hidden="true">
      <path d="M4 14L18 4L92 8L84 18Z" fill="#9a6234" />
      <path d="M4 14L84 18L83 24L5 20Z" fill="#6b3d1e" />
      <path d="M30 7L34 15M58 7.5L54 16" stroke="#7c4a24" strokeWidth="1.2" opacity="0.8" />
      <path d="M18 4L92 8" stroke="#b0733d" strokeWidth="1.4" />
    </svg>
  );
}

/** Raven perched on a wall ledge; a wing ruffle now and then. */
function RavenArt() {
  return (
    <svg width="52" height="42" viewBox="0 0 52 42" aria-hidden="true">
      <path d="M2 32L50 32L44 40L8 40Z" fill="#3d1d0c" />
      <path d="M2 32L50 32L46 28L7 28Z" fill="#552a12" />
      <g>
        <ellipse cx="26" cy="22" rx="9" ry="6" fill="#17171d" />
        <path d="M33 20Q39 22 37 27L28 27Z" fill="#101014" />
        <circle cx="18.5" cy="15.5" r="4.2" fill="#17171d" />
        <path d="M14.6 15.5L9.5 17L14.9 17.8Z" fill="#494950" />
        <circle cx="17.3" cy="14.5" r="0.8" fill="#8d8d96" />
        <g className="ravWing">
          <path d="M22 18Q31 14 35 19Q31 24 24 23Z" fill="#26262e" />
        </g>
      </g>
    </svg>
  );
}

/* ---------- round-4 decor: the drawn path, snow, desert ---------- */

/**
 * One trodden stamp of a scene's drawn path (flat). Stamps are interpolated
 * along the scene's waypoint polyline (site.ts pathStamps) so the visible
 * trail is exactly the line auto/attract travel walks. `v` picks the ground
 * tone: 0 meadow dirt, 1 slot sand, 2 trodden snow, 3 desert dust, 4 camp earth.
 */
const PATH_TONES: ReadonlyArray<readonly [string, string]> = [
  ["rgba(140, 118, 74, 0.4)", "rgba(158, 134, 86, 0.34)"],
  ["rgba(112, 52, 20, 0.4)", "rgba(146, 76, 36, 0.32)"],
  ["rgba(168, 186, 210, 0.6)", "rgba(140, 162, 194, 0.42)"],
  ["rgba(120, 54, 24, 0.38)", "rgba(154, 86, 44, 0.3)"],
  ["rgba(88, 62, 36, 0.5)", "rgba(114, 82, 48, 0.38)"],
];
function PathStampArt({ v = 0 }: { v?: number }) {
  const [outer, inner] = PATH_TONES[v % PATH_TONES.length];
  return (
    <svg width="56" height="15" viewBox="0 0 56 15" aria-hidden="true">
      <ellipse cx="28" cy="7.5" rx="26" ry="5.6" fill={outer} />
      <ellipse cx="28" cy="7.5" rx="17" ry="3.6" fill={inner} />
      {v === 2 && (
        <g fill="rgba(96, 122, 158, 0.55)">
          <ellipse cx="18" cy="6" rx="2" ry="1.2" />
          <ellipse cx="24" cy="9" rx="2" ry="1.2" />
          <ellipse cx="31" cy="6.5" rx="2" ry="1.2" />
          <ellipse cx="37" cy="9.5" rx="2" ry="1.2" />
        </g>
      )}
    </svg>
  );
}

/** Spruce wearing snow: dark tiers with white ledges, snow at the foot. */
function SnowPineArt() {
  return (
    <svg width="36" height="54" viewBox="0 0 36 54" aria-hidden="true">
      <path
        d="M18 1L29 19L23 18L32 34L25 33L34 49L2 49L11 33L4 34L13 18L7 19Z"
        fill="#1c2f26"
      />
      <path d="M13 18L7 19L12 12Z" fill="#dbe6f2" opacity="0.9" />
      <path d="M18 1L24 11L18 9L12 11Z" fill="#e8f0f8" />
      <path d="M4 34L13 33L20 34L11 30Z" fill="#dbe6f2" opacity="0.85" />
      <path d="M25 33L32 34L27 28Z" fill="#cdd9e8" opacity="0.8" />
      <path d="M2 49L12 47L24 48L34 49L28 45L8 45Z" fill="#e8f0f8" opacity="0.9" />
      <path d="M16 48L20 48L20 53L16 53Z" fill="#3a2f22" />
      <ellipse cx="18" cy="51" rx="10" ry="2.4" fill="#e8f0f8" opacity="0.7" />
    </svg>
  );
}

/** Wind-packed snow mound, blue-shadowed on its lee side. */
function SnowMoundArt({ v = 0 }: { v?: number }) {
  const w = v ? 46 : 62;
  return (
    <svg width={w} height="20" viewBox={`0 0 ${w} 20`} aria-hidden="true">
      <path d={`M2 18Q${w * 0.3} 2 ${w * 0.6} 8Q${w - 4} 12 ${w - 2} 18Z`} fill="#eef3f8" />
      <path
        d={`M${w * 0.5} 10Q${w * 0.75} 10 ${w - 2} 18L${w * 0.4} 18Z`}
        fill="#c3d2e4"
        opacity="0.8"
      />
      <path d={`M6 14Q${w * 0.3} 6 ${w * 0.55} 9`} stroke="#fff" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

/** Rock mostly buried in snowpack, wearing a snow cap. */
function BurRockArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 17L3 10Q8 3 17 4Q29 3 31 11L29 17Z" fill="#4c5561" />
      <path d="M4 9Q10 2 18 3Q28 3 30 9Q22 5 16 6Q9 6 4 9Z" fill="#e8f0f8" />
      <ellipse cx="17" cy="16.5" rx="15" ry="2.4" fill="#dbe6f2" />
    </svg>
  );
}

/** A stray trail of bootprints in the snow (flat). */
function FootprintsArt({ v = 0 }: { v?: number }) {
  const steps = [
    [4, 12],
    [16, 8],
    [28, 11],
    [40, 6],
    [52, 9],
  ] as const;
  return (
    <svg
      width="60"
      height="16"
      viewBox="0 0 60 16"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      {steps.map(([x, y], i) => (
        <ellipse
          key={x}
          cx={x}
          cy={y}
          rx="2.4"
          ry="1.4"
          fill="rgba(110, 134, 168, 0.5)"
          transform={`rotate(${i % 2 ? 18 : -14} ${x} ${y})`}
        />
      ))}
    </svg>
  );
}

/**
 * One reach of the frozen teal river (flat): open water down the middle,
 * white ice shelves creeping in from both banks. Segments stack along gy to
 * form the band; the plank crossing bridges the walkable gap.
 */
function RiverArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="132"
      height="42"
      viewBox="0 0 132 42"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      <ellipse cx="66" cy="21" rx="63" ry="19" fill="#14515c" />
      <ellipse cx="66" cy="21" rx="46" ry="13" fill="#1d6b74" />
      <path className="riverGlint" d="M40 18Q66 14 94 19" stroke="#8fd4d4" strokeWidth="1.4" fill="none" />
      {/* ice shelves along both edges */}
      <path d="M3 21Q10 8 30 6Q40 12 30 18Q18 24 14 32Q5 30 3 21Z" fill="#e8f0f8" />
      <path d="M129 21Q124 10 104 7Q94 13 105 19Q118 24 120 33Q126 30 129 21Z" fill="#dbe6f2" />
      <path d="M52 34Q66 30 82 34Q74 39 60 38Z" fill="#e8f0f8" opacity="0.85" />
      <ellipse cx="58" cy="12" rx="7" ry="2.6" fill="#e8f0f8" opacity="0.75" />
    </svg>
  );
}

/** The plank crossing: two weathered boards over the ice (flat). */
function PlankArt() {
  return (
    <svg width="118" height="24" viewBox="0 0 118 24" aria-hidden="true">
      <path d="M4 8L114 6L115 12L5 15Z" fill="#6b4a2a" />
      <path d="M5 15L115 12L114 18L6 21Z" fill="#553a20" />
      <path d="M24 7.6L25 20M52 6.9L53 19.4M82 6.4L83 18.6M102 6.2L103 18" stroke="#3d2a16" strokeWidth="1.1" />
      <path d="M4 8L114 6" stroke="#8a6a44" strokeWidth="1.3" />
      <ellipse cx="30" cy="8" rx="8" ry="1.6" fill="#e8f0f8" opacity="0.7" />
      <ellipse cx="88" cy="7.5" rx="6" ry="1.4" fill="#e8f0f8" opacity="0.6" />
    </svg>
  );
}

/** Dry desert scrub tuft with rust seed heads. */
function ScrubArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="30"
      height="18"
      viewBox="0 0 30 18"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M15 18C13 10 10 7 6 4M15 18C15 9 15 6 15 2M15 18C17 10 20 7 24 4M15 18C12 12 9 11 4 10M15 18C18 12 21 11 26 10"
        stroke="#7a7040"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="6" cy="4" r="1.4" fill="#a55f36" />
      <circle cx="24" cy="4" r="1.4" fill="#a55f36" />
      <circle cx="15" cy="2" r="1.2" fill="#8a5c33" />
    </svg>
  );
}

/** Cracked-earth patch (flat): sun-baked polygon fractures. */
function CrackedArt({ v = 0 }: { v?: number }) {
  const w = v ? 58 : 76;
  return (
    <svg width={w} height="22" viewBox={`0 0 ${w} 22`} aria-hidden="true">
      <ellipse cx={w / 2} cy="11" rx={w / 2 - 2} ry="9" fill="rgba(94, 38, 14, 0.22)" />
      <g stroke="rgba(74, 28, 8, 0.55)" strokeWidth="1.1" fill="none" strokeLinecap="round">
        <path d={`M${w * 0.2} 5L${w * 0.4} 10L${w * 0.32} 17M${w * 0.4} 10L${w * 0.6} 7L${w * 0.78} 12M${w * 0.6} 7L${w * 0.55} 15L${w * 0.7} 19M${w * 0.4} 10L${w * 0.55} 15`} />
      </g>
    </svg>
  );
}

/** Stacked trail cairn. */
function CairnArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="26"
      height="32"
      viewBox="0 0 26 32"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      <ellipse cx="13" cy="27" rx="11" ry="4.6" fill="#6b3d1e" />
      <ellipse cx="13" cy="20.5" rx="8.5" ry="3.8" fill="#8a5230" />
      <ellipse cx="12.5" cy="14.5" rx="6.4" ry="3.2" fill="#7c4a24" />
      <ellipse cx="13.5" cy="9" rx="4.6" ry="2.6" fill="#9a6234" />
      <ellipse cx="13" cy="4.5" rx="3" ry="2" fill="#8a5230" />
      <path d="M6 19Q13 16 20 19" stroke="#a3714a" strokeWidth="1" fill="none" opacity="0.7" />
    </svg>
  );
}

/**
 * Jackrabbit on the shared 3px logical-pixel grid — hops between bushes on a
 * long CSS loop (world.css .jackHop), flipping to hop back.
 */
function JackrabbitArt() {
  const P = 3;
  const px: ReadonlyArray<readonly [number, number, string]> = [
    [6, 0, "#a38760"], // ears
    [7, 0, "#a38760"],
    [6, 1, "#8a6a4a"],
    [7, 1, "#c9a37a"],
    [6, 2, "#b39066"], // head
    [7, 2, "#b39066"],
    [8, 2, "#26201c"], // eye
    [1, 3, "#b39066"], // back + tail
    [2, 3, "#b39066"],
    [3, 3, "#b39066"],
    [4, 3, "#b39066"],
    [5, 3, "#b39066"],
    [6, 3, "#b39066"],
    [7, 3, "#c9a37a"],
    [0, 4, "#e8e4da"], // tail tuft
    [1, 4, "#8a6a4a"],
    [2, 4, "#b39066"],
    [3, 4, "#b39066"],
    [4, 4, "#b39066"],
    [5, 4, "#c9a37a"],
    [6, 4, "#c9a37a"],
    [2, 5, "#8a6a4a"], // legs
    [5, 5, "#8a6a4a"],
  ];
  return (
    <div className="jackHop" aria-hidden="true">
      <svg width={9 * P} height={6 * P} viewBox={`0 0 ${9 * P} ${6 * P}`} shapeRendering="crispEdges">
        {px.map(([x, y, c]) => (
          <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={c} />
        ))}
      </svg>
    </div>
  );
}

/** Dry seed heads — tall arcing stems with tan oat-like heads (meadow). */
function SeedheadsArt() {
  const stems = [
    [6, 26, -4, 6],
    [13, 26, -1, 3],
    [20, 26, 2, 4],
    [27, 26, 5, 7],
    [34, 26, 7, 9],
  ] as const;
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" aria-hidden="true">
      {stems.map(([x, y, dx, ty]) => (
        <g key={x}>
          <path
            d={`M${x} ${y}Q${x + dx * 0.4} ${y - 12} ${x + dx} ${ty + 4}`}
            stroke="#9a8a58"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx={x + dx}
            cy={ty + 2}
            rx="1.7"
            ry="3.2"
            fill="#b3a169"
            transform={`rotate(${dx * 3} ${x + dx} ${ty + 2})`}
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * The blue dome tent by the campfire (round 4B, from the client's real
 * campfire photo): dome body under a blue fly, crossed pole seams, a warm
 * glow spilling from the part-open door, and guy-lines staked out on
 * both sides.
 */
function TentArt() {
  return (
    <svg width="184" height="130" viewBox="0 0 170 120" aria-hidden="true">
      {/* guy-lines + stakes */}
      <path d="M38 62L10 108M132 62L160 108M85 20L85 8" stroke="#8a8272" strokeWidth="1.4" fill="none" />
      <path d="M8 106L14 112M158 106L164 112" stroke="#5c4426" strokeWidth="3" strokeLinecap="round" />
      {/* dome body — blue fly over a darker inner wall */}
      <path d="M18 110Q18 34 85 30Q152 34 152 110Z" fill="#24496e" />
      <path d="M22 108Q26 42 85 36Q144 42 148 108L128 110L42 110Z" fill="#2e5e8e" />
      {/* pole seams crossing the dome */}
      <path d="M48 108Q52 42 100 34M122 108Q118 42 70 34" stroke="#4a7cab" strokeWidth="2.2" fill="none" />
      <path d="M18 110Q60 100 85 100Q110 100 152 110" fill="none" stroke="#1c3a58" strokeWidth="2.5" />
      {/* fly ridge highlight */}
      <path d="M34 74Q50 42 85 38Q120 42 136 74" stroke="#6fa0cc" strokeWidth="1.8" fill="none" opacity="0.8" />
      {/* door: unzipped flap folded aside, warm interior */}
      <path d="M66 110Q64 58 85 54Q106 58 104 110Z" fill="#173049" />
      <path className="tentGlow" d="M70 110Q69 62 85 58Q101 62 100 110Z" fill="#ffce7e" />
      <path d="M85 58Q66 62 66 96Q56 88 60 68Q66 56 85 54Z" fill="#254e77" />
      <path d="M70 110Q69 62 85 58" stroke="#8a6a3a" strokeWidth="1.2" fill="none" strokeDasharray="2.5 2.5" />
      {/* a sliver of sleeping bag inside */}
      <path d="M76 104Q86 98 98 103L98 108L76 108Z" fill="#8f3a34" />
      <ellipse cx="85" cy="112" rx="60" ry="6" fill="rgba(0,0,0,0.3)" />
    </svg>
  );
}

/**
 * Weathered wooden bench overlooking the mirror lake (round 4B, from the
 * client's Two Medicine photo) — side-on, facing the water.
 */
function BenchArt() {
  return (
    <svg width="88" height="52" viewBox="0 0 88 52" aria-hidden="true">
      {/* backrest planks */}
      <rect x="10" y="4" width="70" height="6.5" rx="2" fill="#6b5a44" />
      <rect x="10" y="13" width="70" height="6.5" rx="2" fill="#5f4f3b" />
      {/* seat */}
      <rect x="6" y="24" width="78" height="8" rx="2.5" fill="#77644c" />
      <path d="M8 26L82 26" stroke="#8a765a" strokeWidth="1.3" />
      {/* frame + legs */}
      <path d="M16 4L16 44M74 4L74 44" stroke="#4a3c2c" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 44L22 44M70 44L80 44" stroke="#3a2f22" strokeWidth="4" strokeLinecap="round" />
      {/* wood grain nicks */}
      <path d="M28 7.5L40 7.5M52 16L64 16M30 28.5L44 28.5" stroke="#57483a" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/** Two trekking poles leaning by the tent, straps up, baskets at the tips. */
function PolesArt() {
  return (
    <svg width="36" height="66" viewBox="0 0 36 66" aria-hidden="true">
      <path d="M12 8L22 62" stroke="#b0b6bd" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M26 6L14 62" stroke="#9aa1a9" strokeWidth="2.4" strokeLinecap="round" />
      {/* cork grips + straps */}
      <path d="M11 6L13 15" stroke="#a37a4e" strokeWidth="5" strokeLinecap="round" />
      <path d="M27 4L25 13" stroke="#a37a4e" strokeWidth="5" strokeLinecap="round" />
      <path d="M10 5q-4 -3 -1 -5q3 -1 4 3M28 3q4 -3 1 -5q-3 -1 -4 3" stroke="#6b5236" strokeWidth="1.4" fill="none" />
      {/* baskets near the tips */}
      <path d="M17 54L27 54M10 54L20 54" stroke="#3a3a40" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="62" r="1.6" fill="#3a3a40" />
      <circle cx="14" cy="62" r="1.6" fill="#3a3a40" />
    </svg>
  );
}

/** Circling hawk silhouette for the desert sky (positioned by world.css). */
export function HawkArt() {
  return (
    <svg width="46" height="16" viewBox="0 0 46 16" aria-hidden="true">
      <path
        d="M1 8Q10 1 20 6L23 8L26 6Q36 1 45 8Q35 6 27 10L23 12L19 10Q11 6 1 8Z"
        fill="#241d18"
        opacity="0.85"
      />
    </svg>
  );
}

export function DecorArt({ kind, v }: { kind: DecorKind; v?: number }) {
  switch (kind) {
    case "grass":
      return <GrassArt />;
    case "rock":
      return <RockArt fill="#565449" ridge="#6e6b5e" />;
    case "slotRock":
      return <RockArt fill="#6b3d1e" ridge="#8a5c33" />;
    case "campRock":
      return <RockArt fill="#38312c" ridge="#4c423c" />;
    case "pine":
      return <PineArt />;
    case "log":
      return <LogArt />;
    case "flowers":
      return <FlowersArt v={v} />;
    case "mossRock":
      return <MossRockArt v={v} />;
    case "track":
      return <TrackArt />;
    case "bird":
      return <BirdArt v={v} />;
    case "butterfly":
      return <ButterflyArt v={v} />;
    case "lanterns":
      return <LanternsArt />;
    case "backpack":
      return <BackpackArt />;
    case "canister":
      return <CanisterArt />;
    case "stump":
      return <StumpArt v={v} />;
    case "owltree":
      return <OwlTreeArt />;
    case "sandline":
      return <SandlineArt v={v} />;
    case "slab":
      return <SlabArt />;
    case "raven":
      return <RavenArt />;
    case "earth":
      return <EarthArt v={v} />;
    case "needles":
      return <NeedlesArt />;
    case "stones":
      return <StonesArt v={v} />;
    case "lightpool":
      return <LightPoolArt v={v} />;
    case "daisies":
      return <DaisiesArt />;
    case "clover":
      return <CloverArt />;
    case "worn":
      return <WornArt v={v} />;
    case "waveledge":
      return <WaveLedgeArt v={v} />;
    case "sandfall":
      return <SandfallArt />;
    case "puddle":
      return <PuddleArt />;
    case "pathstamp":
      return <PathStampArt v={v} />;
    case "snowpine":
      return <SnowPineArt />;
    case "snowmound":
      return <SnowMoundArt v={v} />;
    case "burrock":
      return <BurRockArt v={v} />;
    case "footprints":
      return <FootprintsArt v={v} />;
    case "river":
      return <RiverArt v={v} />;
    case "plank":
      return <PlankArt />;
    case "scrub":
      return <ScrubArt v={v} />;
    case "cracked":
      return <CrackedArt v={v} />;
    case "cairn":
      return <CairnArt v={v} />;
    case "jackrabbit":
      return <JackrabbitArt />;
    case "tent":
      return <TentArt />;
    case "bench":
      return <BenchArt />;
    case "poles":
      return <PolesArt />;
    case "seedheads":
      return <SeedheadsArt />;
  }
}

/**
 * Vector sky accent — the ONE extra backdrop layer besides the photo plane
 * (crispness rig, round 3). Soft cloud wisps drawn as blurred vector shapes:
 * they drift slowly and parallax a touch more than the photo, and because
 * they are not a masked copy of the photo they can never ghost against it.
 */
export function SkyDriftArt() {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="skyblur" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <g className="skyInner" filter="url(#skyblur)">
        <g fill="rgba(238,244,252,0.14)">
          <ellipse cx="180" cy="88" rx="130" ry="17" />
          <ellipse cx="280" cy="70" rx="80" ry="13" />
          <ellipse cx="620" cy="140" rx="170" ry="15" />
          <ellipse cx="730" cy="122" rx="90" ry="11" />
          <ellipse cx="1020" cy="72" rx="140" ry="16" />
        </g>
        <g fill="rgba(238,244,252,0.09)">
          <ellipse cx="420" cy="52" rx="150" ry="12" />
          <ellipse cx="900" cy="180" rx="180" ry="13" />
          <ellipse cx="80" cy="190" rx="110" ry="11" />
        </g>
      </g>
    </svg>
  );
}

export function SignArt() {
  return (
    <svg width="36" height="46" viewBox="0 0 36 46" aria-hidden="true">
      <rect x="16" y="10" width="4" height="34" fill="#6d5233" />
      <rect x="4" y="6" width="28" height="13" rx="2" fill="#8a6a42" stroke="#5c4426" strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- furnished set-pieces ---------- */

/**
 * The About anchor (round-4 client correction): the camp's mountain-lake
 * vignette owns the left side of the scene. A drawn night mountain — dark
 * silhouette with snow patches, clearly in front of the photo backdrop —
 * rises over a big still lake that mirrors it: inverted wavy silhouette,
 * star glints, gentle drifting shimmer. The old camp dock and its fishing
 * rod fold into the near shore.
 */
function LakeArt() {
  const lakeStars = [
    [66, 118, 0],
    [96, 112, 0.9],
    [128, 122, 1.7],
    [158, 114, 2.4],
    [102, 132, 3.1],
  ] as const;
  return (
    // Rendered ~1.18× its viewBox — the vignette owns the camp's left side.
    <svg width="272" height="201" viewBox="0 0 230 170" aria-hidden="true">
      {/* night mountain — snow patches on the high ridges */}
      <path d="M4 104L52 26L76 58L104 12L140 62L170 40L224 104Z" fill="#141d2b" />
      <path d="M96 24L104 12L114 26L108 38L100 34Z" fill="#d7e2ef" opacity="0.8" />
      <path d="M46 36L52 26L58 36L52 44Z" fill="#c9d6e6" opacity="0.7" />
      <path d="M164 48L170 40L177 50L170 56Z" fill="#c9d6e6" opacity="0.6" />
      <path
        d="M104 12L88 52M104 12L116 44M52 26L44 58M170 40L182 66"
        stroke="#1f2c40"
        strokeWidth="1.4"
        fill="none"
      />
      {/* the lake — big and still */}
      <path
        d="M8 130Q6 114 40 108Q92 98 146 102Q216 106 224 128Q228 148 162 158Q84 168 34 158Q10 152 8 130Z"
        fill="#0d1c29"
        stroke="#1e3648"
        strokeWidth="2"
      />
      <ellipse cx="112" cy="130" rx="86" ry="16" fill="#152b3d" opacity="0.75" />
      {/* inverted mountain reflection, wavy-edged */}
      <g opacity="0.45">
        <path
          d="M52 106L84 148Q88 152 93 147L104 136L118 150Q122 154 127 149L160 108Q120 100 52 106Z"
          fill="#0a1420"
        />
      </g>
      {/* drifting shimmer + reflected stars */}
      <g stroke="#a9c4d4" strokeLinecap="round" fill="none">
        <path className="shimmer" d="M52 124L100 124" strokeWidth="1.3" />
        <path className="shimmer sh2" d="M120 142L168 142" strokeWidth="1.2" />
      </g>
      {lakeStars.map(([x, y, delay]) => (
        <circle
          key={`${x}-${y}`}
          className="lakeStar"
          cx={x}
          cy={y}
          r="1.4"
          fill="#dfe8ff"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* shore rocks */}
      <path d="M6 162L4 154Q9 147 18 148Q27 147 29 156L27 162Z" fill="#38312c" />
      <path d="M196 164L194 158Q198 152 205 153Q212 152 214 159L212 164Z" fill="#443b34" />
      {/* the dock, folded in: deck receding into the water, rod, bobber */}
      <path d="M118 167L188 167L166 144L110 144Z" fill="#6b4a2a" />
      <path d="M118 167L188 167L188 170L118 170Z" fill="#4a3220" />
      <path
        d="M128 166L116 146M146 166L132 145M164 166L148 145M178 166L162 144"
        stroke="#553a20"
        strokeWidth="1.4"
      />
      <rect x="108" y="135" width="4" height="12" fill="#4a3a2c" />
      <rect x="132" y="136" width="4" height="10" fill="#4a3a2c" />
      <path d="M136 148L98 118" stroke="#4a3a2c" strokeWidth="2" strokeLinecap="round" />
      <path d="M98 118L96 136" stroke="#d8cfc0" strokeWidth="0.9" />
      <circle cx="96" cy="137" r="1.8" fill="#c9524a" />
      <ellipse
        className="bobRip"
        cx="96"
        cy="139"
        rx="5"
        ry="1.8"
        fill="none"
        stroke="#cfe2e4"
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * The sequoia grove, rebuilt round 4B so it reads as Sequoia NP: FIVE trees
 * (three foreground giants + two younger mid-ground sequoias behind them),
 * bark a darker cinnamon-brown with dense fibrous vertical texture, and
 * crowns built from distinct layered foliage clumps — each clump shadowed
 * underneath and lit on top, not a generic cone. The middle giant keeps its
 * fire-scar hollow.
 */
function GroveArt() {
  /** One distinct foliage clump: under-shadow, body, lit top. */
  const clump = (x: number, y: number, rx: number, ry: number, tone: 0 | 1) => (
    <g key={`${x}-${y}`}>
      <ellipse cx={x} cy={y + ry * 0.55} rx={rx * 0.94} ry={ry * 0.8} fill="#0c1710" opacity="0.42" />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={tone ? "#1d3322" : "#16281c"} />
      <ellipse cx={x - rx * 0.15} cy={y - ry * 0.4} rx={rx * 0.62} ry={ry * 0.5} fill={tone ? "#28472c" : "#22402a"} />
    </g>
  );
  /** Fibrous vertical bark texture between x0 and x1, top→bottom. */
  const fibers = (cx: number, w: number, yTop: number, yBot: number, seed: number) => {
    const lines: string[] = [];
    const fine: string[] = [];
    for (let i = 0; i < 7; i++) {
      const t = (i + 0.5) / 7;
      const x = cx - w / 2 + w * t;
      const sway = Math.sin(seed + i * 2.1) * 3;
      const y1 = yTop + ((seed * 7 + i * 13) % 20);
      const y2 = yBot - ((seed * 5 + i * 17) % 26);
      (i % 2 ? fine : lines).push(`M${x} ${y1}Q${x + sway} ${(y1 + y2) / 2} ${x + sway * 0.4} ${y2}`);
    }
    return (
      <g key={`f${cx}`}>
        <path d={lines.join("")} stroke="#451d0c" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d={fine.join("")} stroke="#8a4a24" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  };
  return (
    <svg width="420" height="340" viewBox="0 0 420 340" aria-hidden="true">
      {/* two younger mid-ground sequoias, hazier and behind */}
      <g opacity="0.88">
        <path d="M118 120Q117 240 113 306L106 322L146 322L139 306Q135 240 134 120Q126 112 118 120Z" fill="#582813" />
        {fibers(126, 14, 130, 310, 3)}
        {clump(126, 78, 22, 11, 0)}
        {clump(118, 100, 18, 9, 0)}
        {clump(136, 104, 16, 8, 1)}
        {clump(126, 60, 13, 7, 1)}
      </g>
      <g opacity="0.88">
        <path d="M320 132Q319 244 315 308L308 324L350 324L343 308Q339 244 338 132Q330 124 320 132Z" fill="#5e2c15" />
        {fibers(329, 14, 142, 312, 8)}
        {clump(329, 92, 21, 10, 0)}
        {clump(320, 112, 17, 9, 1)}
        {clump(340, 116, 15, 8, 0)}
        {clump(330, 74, 12, 7, 1)}
      </g>

      {/* left giant */}
      {clump(72, 30, 16, 9, 0)}
      {clump(62, 48, 23, 12, 0)}
      {clump(84, 54, 21, 11, 1)}
      {clump(56, 70, 25, 12, 0)}
      {clump(88, 76, 23, 11, 1)}
      {clump(72, 90, 30, 12, 0)}
      <path d="M64 90Q62 212 54 302L42 330L104 330L92 302Q82 212 80 90Q72 80 64 90Z" fill="#66311a" />
      {fibers(72, 30, 100, 322, 1)}

      {/* middle giant (tallest) — keeps the fire-scar hollow */}
      {clump(210, 16, 17, 9, 0)}
      {clump(198, 34, 25, 13, 0)}
      {clump(224, 40, 23, 12, 1)}
      {clump(192, 58, 27, 13, 0)}
      {clump(230, 62, 25, 12, 1)}
      {clump(210, 78, 33, 13, 0)}
      <path d="M196 78Q194 212 186 296L168 336L252 336L236 296Q226 212 224 78Q210 68 196 78Z" fill="#723c1e" />
      {fibers(210, 36, 90, 326, 5)}
      <path d="M194 336Q190 296 202 280Q216 272 224 290Q230 310 226 336Z" fill="#26130a" />
      <path d="M199 336Q197 302 206 290Q215 284 220 296Q224 314 221 336Z" fill="#0f0805" />

      {/* right giant */}
      {clump(376, 54, 15, 8, 0)}
      {clump(368, 68, 22, 11, 0)}
      {clump(386, 74, 20, 10, 1)}
      {clump(364, 88, 23, 11, 0)}
      {clump(388, 94, 21, 10, 1)}
      {clump(376, 106, 28, 11, 0)}
      <path d="M368 106Q366 222 360 304L348 332L416 332L404 304Q396 222 394 106Q381 97 368 106Z" fill="#66311a" />
      {fibers(382, 28, 116, 324, 11)}

      {/* ferns and shade plants at the feet */}
      <path
        d="M136 328C134 320 130 316 125 313M136 328C136 319 137 315 139 310M136 328C139 321 143 318 147 316"
        stroke="#3d5a33"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M284 330C282 323 278 319 274 317M284 330C285 322 287 318 290 314M284 330C287 324 291 321 295 320"
        stroke="#47663a"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M52 334C50 327 46 323 42 321M52 334C53 326 55 322 58 318"
        stroke="#3d5a33"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The photographer's setup (upgraded round 4B): tripod + camera, an open
 * camera bag with a spare lens, and a print laid out on a ground cloth.
 */
function PhotoArt() {
  return (
    <svg width="118" height="86" viewBox="0 0 118 86" aria-hidden="true">
      {/* tripod + camera */}
      <path d="M36 38L18 82" stroke="#4a3a2c" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M36 38L54 82" stroke="#4a3a2c" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M36 38L36 78" stroke="#3d3024" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M27 60L45 60" stroke="#3d3024" strokeWidth="1.6" />
      <rect x="21" y="17" width="30" height="20" rx="2.5" fill="#38312c" />
      <rect x="26" y="12" width="12" height="6" rx="2" fill="#38312c" />
      <circle cx="36" cy="27" r="6.5" fill="#1d1a17" stroke="#6e6b5e" strokeWidth="1.8" />
      <circle cx="36" cy="27" r="2.4" fill="#3a4a5f" />
      <circle cx="48" cy="21" r="1.7" fill="#c9524a" />
      {/* open camera bag with a spare lens */}
      <g>
        <path d="M66 62Q66 50 78 50L92 50Q100 50 100 60L100 74L66 74Z" fill="#4a3a2c" />
        <path d="M66 62L100 60" stroke="#38291c" strokeWidth="1.6" />
        <path d="M64 52Q76 40 96 46L92 52Q78 46 68 56Z" fill="#5c4936" />
        <circle cx="83" cy="60" r="6" fill="#1d1a17" stroke="#6e6b5e" strokeWidth="1.4" />
        <circle cx="83" cy="60" r="2.2" fill="#3a4a5f" />
        <path d="M70 74L70 66M96 74L96 66" stroke="#38291c" strokeWidth="1.4" />
      </g>
      {/* print laid out on a ground cloth */}
      <g transform="rotate(-5 96 80)">
        <rect x="80" y="76" width="34" height="10" rx="1.5" fill="#8a7a5e" opacity="0.6" />
        <rect x="84" y="74" width="24" height="12" fill="#f2eee2" />
        <rect x="86" y="76" width="20" height="5" fill="#46608c" />
        <rect x="86" y="81" width="20" height="3" fill="#a55f36" />
      </g>
    </svg>
  );
}

/**
 * Georgia Tech sign at the track's edge — navy board, gold GT, an "NCAA D1"
 * plank. (The yellow jackets left the sign round 4B: bigger now, they roam
 * the whole meadow — see MeadowBees in World.tsx.)
 */
function GtSignArt() {
  return (
    <svg width="96" height="118" viewBox="0 0 84 104" aria-hidden="true">
      <rect x="39" y="26" width="5" height="76" fill="#6d5233" />
      <rect x="12" y="8" width="60" height="34" rx="3" fill="#003057" stroke="#5c4426" strokeWidth="2" />
      <text
        x="42"
        y="33"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="bold"
        fontSize="22"
        fill="#b3a369"
      >
        GT
      </text>
      <rect x="20" y="46" width="44" height="13" rx="2" fill="#b3a369" stroke="#5c4426" strokeWidth="1.5" />
      <text
        x="42"
        y="56"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#003057"
      >
        NCAA D1
      </text>
    </svg>
  );
}

/**
 * The climbing boulder (round 4B, meadow west wall): a Yosemite-toned
 * granite cluster with a rope over the lip, chalk marks at the holds, a
 * crash pad at the base, and the Taft Point crow perched on top (an
 * occasional wing ruffle, CSS .crowWing).
 */
function BoulderArt() {
  return (
    <svg width="190" height="168" viewBox="0 0 190 168" aria-hidden="true">
      {/* the crow, perched on the highline of the main boulder */}
      <g className="crowWing" transform="translate(96 10)">
        <ellipse cx="10" cy="12" rx="8" ry="5.2" fill="#17171d" />
        <path d="M16 10Q22 12 20 16L12 16Z" fill="#101014" />
        <circle cx="3.5" cy="6.5" r="3.6" fill="#17171d" />
        <path d="M0.2 6.5L-4.5 8L0.5 8.6Z" fill="#494950" />
        <circle cx="2.4" cy="5.6" r="0.7" fill="#8d8d96" />
        <path d="M6 14Q13 10 17 14Q13 18 8 17Z" fill="#26262e" />
      </g>
      {/* smaller companion boulder, left */}
      <path d="M8 152L4 118Q10 96 40 98Q58 100 60 122L56 152Z" fill="#6e6960" />
      <path d="M12 112Q28 102 48 108" stroke="#8a857a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* main granite boulder */}
      <path d="M42 152L36 66Q44 28 96 24Q152 26 160 70Q166 116 152 152Z" fill="#8f897b" />
      {/* lit top face + shadow flank */}
      <path d="M44 60Q54 32 96 28Q142 30 152 58Q120 46 88 48Q60 50 44 60Z" fill="#a7a191" />
      <path d="M148 62Q158 100 148 152L118 152Q136 110 132 64Z" fill="#6e6960" opacity="0.85" />
      {/* crack lines */}
      <path d="M78 50Q74 90 80 128M112 46Q118 84 112 126Q110 140 114 152" stroke="#5f5a50" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M60 76Q70 80 78 78M112 92Q124 96 136 92" stroke="#5f5a50" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* the rope: anchored over the lip, hanging down the face */}
      <path d="M100 24Q98 40 103 62Q108 88 101 112Q97 134 102 152" stroke="#d1543e" strokeWidth="2.6" fill="none" />
      <path d="M100 24Q98 40 103 62Q108 88 101 112" stroke="#e8734f" strokeWidth="0.9" fill="none" strokeDasharray="3 4" />
      {/* chalk marks at the holds */}
      <g fill="#eceada">
        <ellipse cx="86" cy="72" rx="5" ry="2.6" opacity="0.55" />
        <ellipse cx="118" cy="96" rx="4.4" ry="2.2" opacity="0.5" />
        <ellipse cx="74" cy="110" rx="4.8" ry="2.4" opacity="0.5" />
        <ellipse cx="98" cy="130" rx="4" ry="2" opacity="0.45" />
      </g>
      {/* crash pad at the base */}
      <g>
        <path d="M58 168L58 156Q58 150 66 150L138 150Q146 150 146 156L146 168Z" fill="#2c3e5f" />
        <path d="M58 158L146 158" stroke="#1e2c46" strokeWidth="2" />
        <path d="M74 150L74 168M126 150L126 168" stroke="#1e2c46" strokeWidth="2.4" />
        <path d="M60 152Q102 146 144 152" stroke="#40598a" strokeWidth="2" fill="none" />
      </g>
      {/* chalk bag dropped beside the pad */}
      <path d="M154 152L164 152Q165 162 159 164Q152 162 154 152Z" fill="#c97a4a" />
      <ellipse cx="159" cy="153" rx="3.6" ry="1.4" fill="#e8e4da" />
    </svg>
  );
}

/**
 * The bear on its rock — pixel-art canvas (painted/animated by the engine,
 * data-npc="bear": a slow two-frame head turn) standing on a mossy boulder.
 */
function BearRockArt() {
  return (
    <div className="bearWrap" aria-hidden="true">
      <svg className="bearRock" width="88" height="42" viewBox="0 0 88 42">
        <path d="M8 41L4 22Q12 4 44 6Q78 4 84 26L78 41Z" fill="#6e6a5e" />
        <path d="M16 16Q34 6 60 10" stroke="#84806f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M10 24Q18 18 30 20" stroke="#5a564c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M58 8Q68 7 74 13Q67 15 61 12Z" fill="#5a7a42" opacity="0.8" />
      </svg>
      <canvas data-npc="bear" width={BEAR.w} height={BEAR.h} className="bearCv" />
    </div>
  );
}

/**
 * Sculpted wave-ledge (round 4B slot redress): a stack of stepped, curved
 * sandstone shelves hugging the canyon wall, echoing the backdrop's flow —
 * each shelf has a lit top edge, a shadowed face, and strata lines. v1
 * mirrors it for the opposite wall.
 */
function WaveLedgeArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="200"
      height="216"
      viewBox="0 0 200 216"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* the fin's core mass: an S-curved sandstone blade, wide at the foot,
          leaning with the flow — no straight edges anywhere */}
      <path
        d="M28 216Q10 168 30 128Q52 86 34 56Q24 34 52 18Q86 4 116 22Q142 38 128 66Q112 96 134 124Q158 154 144 184Q134 208 108 214Q64 220 28 216Z"
        fill="#6b3418"
      />
      {/* shadowed under-curves of the wave */}
      <path d="M36 62Q60 92 46 128Q34 160 48 196Q80 206 108 200Q84 178 92 142Q100 110 82 84Q60 58 36 62Z" fill="#4f2410" />
      {/* shelf lips: stepped curved ledges catching the beam light */}
      <path d="M46 34Q84 16 112 32Q132 44 122 62Q94 48 62 52Q46 44 46 34Z" fill="#8a4a24" />
      <path d="M46 34Q84 16 112 32Q132 44 122 62" fill="none" stroke="#c97a42" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 84Q76 70 104 84Q126 96 116 116Q88 100 58 102Q40 96 42 84Z" fill="#7c3f1e" />
      <path d="M42 84Q76 70 104 84Q126 96 116 116" fill="none" stroke="#b86a38" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M48 136Q84 124 116 138Q142 150 130 170Q98 154 66 156Q46 148 48 136Z" fill="#743a1c" />
      <path d="M48 136Q84 124 116 138Q142 150 130 170" fill="none" stroke="#a55d30" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 186Q76 176 110 188Q128 196 120 210Q90 200 60 202Q42 196 40 186Z" fill="#5e2c14" />
      <path d="M40 186Q76 176 110 188Q128 196 120 210" fill="none" stroke="#96522a" strokeWidth="2.2" strokeLinecap="round" />
      {/* strata lines following the flow */}
      <g stroke="#451f0d" strokeWidth="1.3" fill="none" opacity="0.75">
        <path d="M44 48Q82 34 116 46M42 100Q76 88 110 100M46 152Q84 140 122 154M44 198Q76 190 108 200" />
      </g>
      <g stroke="#d98f57" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M48 42Q84 28 116 40M46 94Q78 82 110 94M50 146Q86 134 120 148" />
      </g>
    </svg>
  );
}

/**
 * A slow sand-trickle off a wave-ledge lip (round 4B): animated falling
 * grains (dashed strokes cycling downward, CSS .sandTrickle) landing on a
 * small piled mound.
 */
function SandfallArt() {
  return (
    <svg width="30" height="108" viewBox="0 0 30 108" aria-hidden="true">
      {/* the lip it spills from */}
      <path d="M2 8Q14 2 27 9L24 15Q14 10 5 14Z" fill="#8a4a24" />
      <path d="M2 8Q14 2 27 9" fill="none" stroke="#c97a42" strokeWidth="1.8" strokeLinecap="round" />
      {/* falling grains */}
      <path className="sandTrickle" d="M14.5 13L14.5 92" stroke="#e8c48a" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path className="sandTrickle st2" d="M17 14L16.5 90" stroke="#d8ac6e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* the pile */}
      <path d="M3 105Q6 90 15 89Q24 90 27 105Z" fill="#c98a4e" />
      <path d="M8 96Q15 91 22 96" stroke="#e0b276" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <ellipse cx="15" cy="105" rx="13" ry="2.6" fill="#a5663a" />
    </svg>
  );
}

/**
 * Shallow reflective puddle on the slot floor (flat), catching the light
 * beam: dark water, a warm mirrored streak, and a drifting glint.
 */
function PuddleArt() {
  return (
    <svg width="118" height="30" viewBox="0 0 118 30" aria-hidden="true">
      {/* irregular wet-sand ring, then the water */}
      <path
        d="M8 16Q14 7 36 5Q66 2 92 7Q112 11 110 17Q106 25 76 27Q34 29 14 24Q6 21 8 16Z"
        fill="#4f2f18"
      />
      <path
        d="M14 16Q20 9 40 8Q66 5 88 9Q104 12 103 17Q99 23 74 24Q38 26 20 22Q13 20 14 16Z"
        fill="#67401f"
      />
      {/* the beam's warm reflection — a soft vertical-ish streak, not a disc */}
      <path d="M44 9Q56 8 66 9L74 22Q58 24 40 22Z" fill="#ffe9c9" opacity="0.5" />
      <path d="M52 9Q58 8.5 62 9L66 22Q56 23 48 22Z" fill="#fff6e4" opacity="0.7" />
      <path className="puddleGlint" d="M30 18Q58 15 86 18" stroke="#ffd9a0" strokeWidth="1.2" fill="none" />
      {/* damp rim highlight */}
      <path d="M16 13Q34 6 62 6" stroke="#8a5c33" strokeWidth="1.2" fill="none" opacity="0.8" />
    </svg>
  );
}

/**
 * The About anchor (round 4): a trailhead information kiosk at the meadow's
 * west end — two posts, a shingle roof, a pinned map with a "you are here"
 * dot, and a small photo tacked beside it. 4B dresses it further.
 */
function KioskArt() {
  return (
    <svg width="86" height="92" viewBox="0 0 86 92" aria-hidden="true">
      {/* posts */}
      <rect x="12" y="26" width="5" height="64" fill="#5c4426" />
      <rect x="69" y="26" width="5" height="64" fill="#5c4426" />
      {/* shingle roof */}
      <path d="M2 22L43 4L84 22L80 26L43 10L6 26Z" fill="#4a3423" />
      <path d="M6 26L43 10L80 26L76 29L43 15L10 29Z" fill="#6b4a2a" />
      {/* board */}
      <rect x="10" y="28" width="66" height="44" rx="2" fill="#8a6a42" stroke="#5c4426" strokeWidth="2" />
      <rect x="15" y="33" width="38" height="34" rx="1.5" fill="#e8e0cc" />
      {/* the map: valley, trail dots, you-are-here */}
      <path d="M18 58Q26 44 34 50Q44 56 50 40" stroke="#47663a" strokeWidth="2.2" fill="none" />
      <path d="M19 40Q28 36 36 40Q44 44 49 60" stroke="#8a6a44" strokeWidth="1.4" strokeDasharray="2.5 2.5" fill="none" />
      <circle cx="24" cy="52" r="2.4" fill="#c9524a" />
      <path d="M18 36L50 36" stroke="#a59c88" strokeWidth="1" />
      {/* pinned photo */}
      <g transform="rotate(6 64 46)">
        <rect x="57" y="38" width="15" height="12" fill="#f2eee2" />
        <rect x="58.5" y="39.5" width="12" height="7" fill="#46608c" />
        <rect x="58.5" y="45" width="12" height="3.5" fill="#5a7a42" />
        <circle cx="64.5" cy="38.5" r="1.1" fill="#c9524a" />
      </g>
      {/* a second note card */}
      <rect x="57" y="54" width="14" height="10" rx="1" fill="#d8cfc0" />
      <path d="M59 57L69 57M59 60L66 60" stroke="#8a7a5e" strokeWidth="1" />
    </svg>
  );
}

/**
 * The Experience anchor (round 4, snow scene): a carved national-park
 * distance-sign cluster — each plank is a career stop. Snow rides the post
 * cap and plank tops.
 */
function TrailSignsArt() {
  const plank = (y: number, flip: boolean, org: string, dates: string) => (
    <g transform={`rotate(${flip ? -2.5 : 2.5} 60 ${y + 12})`}>
      <path
        d={
          flip
            ? `M14 ${y}L98 ${y}L106 ${y + 12}L98 ${y + 24}L14 ${y + 24}Z`
            : `M22 ${y}L106 ${y}L106 ${y + 24}L22 ${y + 24}L14 ${y + 12}Z`
        }
        fill="#6b4a2a"
        stroke="#4a3423"
        strokeWidth="2"
      />
      <text
        x="60"
        y={y + 11}
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="8.5"
        letterSpacing="1"
        fill="#f0e6cc"
      >
        {org}
      </text>
      <text
        x="60"
        y={y + 20}
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="6"
        letterSpacing="0.8"
        fill="#d8c49a"
      >
        {dates}
      </text>
      <path d={`M20 ${y + 1}L100 ${y + 1}`} stroke="#e8f0f8" strokeWidth="2.4" opacity="0.9" />
    </g>
  );
  return (
    <svg width="120" height="118" viewBox="0 0 120 118" aria-hidden="true">
      <rect x="56" y="8" width="8" height="106" fill="#5c4426" />
      <rect x="55" y="4" width="10" height="6" rx="2" fill="#4a3423" />
      <ellipse cx="60" cy="5" rx="6" ry="2.4" fill="#e8f0f8" />
      {plank(16, false, "ONSOLVE", "2021 – PRESENT")}
      {plank(52, true, "GEORGIA TECH", "2017 – 2021")}
      <ellipse cx="60" cy="114" rx="18" ry="4" fill="#dbe6f2" />
    </svg>
  );
}

/**
 * The Skills anchor (round 4, desert scene): a climbing gear cache laid out
 * on a boulder — coiled rope, a rack of draws, helmet, chalk bag.
 */
function GearCacheArt() {
  return (
    <svg width="112" height="74" viewBox="0 0 112 74" aria-hidden="true">
      {/* the boulder */}
      <path d="M8 72L4 44Q14 22 54 24Q98 22 106 48L100 72Z" fill="#8a5230" />
      <path d="M16 38Q42 24 76 30" stroke="#a3714a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M10 52Q22 44 38 47" stroke="#6b3d1e" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* coiled rope */}
      <g fill="none" stroke="#d1543e" strokeWidth="2.6">
        <ellipse cx="34" cy="30" rx="13" ry="6.5" />
        <ellipse cx="34" cy="27" rx="13" ry="6.5" stroke="#e8734f" />
        <ellipse cx="34" cy="24" rx="13" ry="6.5" />
      </g>
      <path d="M46 28Q54 32 52 40" stroke="#d1543e" strokeWidth="2.2" fill="none" />
      {/* rack of quickdraws on a sling */}
      <path d="M58 24Q72 20 86 26" stroke="#4a3a2c" strokeWidth="1.6" fill="none" />
      {[
        [62, 26, "#4a90d9"],
        [70, 24, "#e8b93d"],
        [78, 24, "#8a8a92"],
        [86, 27, "#5a7a42"],
      ].map(([x, y, c]) => (
        <g key={`${x}`}>
          <path d={`M${x} ${y}L${x} ${Number(y) + 6}`} stroke="#8a8a92" strokeWidth="1.2" />
          <ellipse cx={x} cy={Number(y) + 9} rx="2.6" ry="3.4" fill="none" stroke={String(c)} strokeWidth="1.8" />
        </g>
      ))}
      {/* helmet */}
      <path d="M92 36Q92 28 100 28Q108 28 108 36L107 39L93 39Z" fill="#e8e4da" />
      <path d="M93 33Q100 30 107 33" stroke="#b8b2a4" strokeWidth="1.2" fill="none" />
      {/* chalk bag */}
      <path d="M12 30L24 30Q25 42 18 44Q11 42 12 30Z" fill="#c97a4a" />
      <path d="M12 30L24 30L23.5 33.5L12.5 33.5Z" fill="#a55f36" />
      <ellipse cx="18" cy="31" rx="4.5" ry="1.6" fill="#e8e4da" />
      <ellipse cx="10" cy="46" rx="4" ry="1.3" fill="#e8e4da" opacity="0.5" />
    </svg>
  );
}

export function SetPieceArt({ kind }: { kind: SetPieceKind }) {
  switch (kind) {
    case "lake":
      return <LakeArt />;
    case "grove":
      return <GroveArt />;
    case "photo":
      return <PhotoArt />;
    case "gtsign":
      return <GtSignArt />;
    case "bear":
      return <BearRockArt />;
    case "kiosk":
      return <KioskArt />;
    case "trailsigns":
      return <TrailSignsArt />;
    case "gearcache":
      return <GearCacheArt />;
    case "boulder":
      return <BoulderArt />;
  }
}

/* ---------- project stations ---------- */

/**
 * Todoclaw's planner desk — resized round 4B to a billboard the client can
 * actually read ("much bigger, like maybe 3 times"). The board is a faithful
 * mini-mock of the real app: warm-paper canvas, graph-paper lines, the four
 * quadrant tints with their names, center axes with URGENCY/IMPORTANCE
 * labels, white task cards whose top border carries the quadrant color
 * (sides terracotta), and a three-card cluster with its count chip — colors
 * verbatim from todoclaw/src/features/grid/grid-constants.ts and
 * tailwind.config.js. The real TodoClawPeek pup hangs over the board's top
 * edge exactly as he does on the app's grid, sized to the bigger board.
 */
function DeskArt() {
  // [left%, top%, quadrant top-border color] — mirrors the app's quadrants:
  // schedule green TL, do-now terracotta TR, someday grey BL, errands olive BR.
  const cards: ReadonlyArray<readonly [number, number, string]> = [
    [7, 16, "#3d7a5f"],
    [20, 30, "#3d7a5f"],
    [32, 12, "#3d7a5f"],
    [57, 9, "#bf5e2a"],
    [72, 20, "#bf5e2a"],
    [86, 10, "#bf5e2a"],
    [63, 33, "#bf5e2a"],
    [8, 62, "#857c6e"],
    [22, 78, "#857c6e"],
    [82, 64, "#7d6b1e"],
    [68, 80, "#7d6b1e"],
  ];
  return (
    <div className="tcWrap" aria-hidden="true">
      <div className="tcBoardWrap">
        <div className="tcBoard">
          <TodoClawPeek ledge={false} className="tcPeek" />
          <TodoClawIcon className="tcBadge" />
          <div className="tcGrid">
            <span className="tcAxisX">URGENCY →</span>
            <span className="tcAxisY">IMPORTANCE →</span>
            <span className="tcQ" style={{ left: "3%", top: "3%" }}>
              SCHEDULE
            </span>
            <span className="tcQ" style={{ right: "3%", top: "3%" }}>
              DO NOW
            </span>
            <span className="tcQ" style={{ left: "3%", bottom: "14%" }}>
              SOMEDAY
            </span>
            <span className="tcQ" style={{ right: "3%", bottom: "14%" }}>
              ERRANDS
            </span>
            {cards.map(([l, t, c]) => (
              <div key={`${l}-${t}`} className="tcCard" style={{ left: `${l}%`, top: `${t}%`, borderTopColor: c }} />
            ))}
            {/* the three-card cluster with its count chip */}
            <div className="tcCard" style={{ left: "38%", top: "56%", borderTopColor: "#857c6e" }} />
            <div className="tcCard" style={{ left: "42%", top: "63%", borderTopColor: "#7d6b1e" }} />
            <div className="tcCard" style={{ left: "46%", top: "70%", borderTopColor: "#3d7a5f" }} />
            <div className="tcCount">3</div>
          </div>
        </div>
        <svg className="tcLegs" width="400" height="48" viewBox="0 0 400 48">
          <path
            d="M84 0L48 44M316 0L352 44M200 0L200 40"
            stroke="#5c4126"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <svg className="tcTable" width="176" height="104" viewBox="0 0 126 74">
        <rect x="6" y="22" width="114" height="9" rx="2" fill="#7d5a36" />
        <rect x="11" y="31" width="104" height="6" fill="#6a4a2b" />
        <rect x="17" y="37" width="7" height="36" fill="#5c4126" />
        <rect x="100" y="37" width="7" height="36" fill="#5c4126" />
        <rect x="88" y="6" width="15" height="16" rx="2" fill="#3a3230" />
        <rect x="93" y="2" width="5" height="5" rx="1.5" fill="#3a3230" />
        <circle className="lglow" cx="95.5" cy="13" r="4.5" fill="#ffd685" />
        {/* mug + notebook on the desk */}
        <rect x="34" y="14" width="9" height="8" rx="1.5" fill="#8a4a2a" />
        <path d="M43 16Q47 17 43 20" stroke="#8a4a2a" strokeWidth="1.6" fill="none" />
        <rect x="54" y="16" width="18" height="6" rx="1" fill="#e8e4da" />
        <path d="M57 18.5L69 18.5" stroke="#b3a184" strokeWidth="1" />
      </svg>
      <SleepingPuppy className="tcPuppy" />
      <PawPrint className="tcPaw tcPaw1" />
      <PawPrint className="tcPaw tcPaw2" />
      <PawPrint className="tcPaw tcPaw3" />
    </div>
  );
}

/**
 * The campfire, detailed round 4B: a stone ring whose near faces catch the
 * firelight, split logs with pale open faces, three flame depths over a
 * white-hot core, an occasional extra flame lick, rising sparks that fade,
 * and a softly pulsing pool of ground glow. All motion is CSS (world.css)
 * so reduced-motion neutralizes it in one place.
 */
function FireArt() {
  const sparks: ReadonlyArray<readonly [number, number, number, number]> = [
    // [x, y, drift-x, delay]
    [66, 52, 10, 0],
    [72, 46, -8, 0.9],
    [78, 55, 14, 1.7],
    [70, 40, -12, 2.6],
    [64, 48, 6, 3.4],
    [76, 44, -5, 4.2],
  ];
  return (
    <svg width="144" height="118" viewBox="0 0 144 118" aria-hidden="true">
      {/* pulsing ground glow */}
      <ellipse className="fireGlow" cx="72" cy="86" rx="58" ry="19" fill="rgba(255,150,60,.24)" />
      <ellipse className="fireGlow fg2" cx="72" cy="86" rx="34" ry="11" fill="rgba(255,190,90,.2)" />
      {/* back stones — night faces, only a rim of light on top */}
      <g>
        <ellipse cx="34" cy="76" rx="9" ry="5.5" fill="#3a342e" />
        <path d="M26 74Q34 70 42 74" stroke="#6e5236" strokeWidth="1.4" fill="none" />
        <ellipse cx="56" cy="72" rx="8" ry="5" fill="#332e29" />
        <path d="M49 70Q56 66.5 63 70" stroke="#7a5c3a" strokeWidth="1.4" fill="none" />
        <ellipse cx="88" cy="72" rx="8" ry="5" fill="#332e29" />
        <path d="M81 70Q88 66.5 95 70" stroke="#7a5c3a" strokeWidth="1.4" fill="none" />
        <ellipse cx="110" cy="76" rx="9" ry="5.5" fill="#3a342e" />
        <path d="M102 74Q110 70 118 74" stroke="#6e5236" strokeWidth="1.4" fill="none" />
      </g>
      {/* split logs: bark barrels with pale split faces */}
      <g>
        <rect x="30" y="80" width="46" height="9" rx="4.5" fill="#4a3423" transform="rotate(7 53 84)" />
        <path d="M34 82L72 87" stroke="#c8a878" strokeWidth="3" strokeLinecap="round" transform="rotate(7 53 84)" />
        <rect x="66" y="80" width="46" height="9" rx="4.5" fill="#40301f" transform="rotate(-8 89 84)" />
        <path d="M70 83L108 86" stroke="#b3906a" strokeWidth="3" strokeLinecap="round" transform="rotate(-8 89 84)" />
        <rect x="56" y="87" width="34" height="8" rx="4" fill="#3a2a18" />
        <ellipse cx="90" cy="91" rx="3" ry="4" fill="#8a5230" />
      </g>
      {/* flames: three depths + white-hot core + an occasional lick */}
      <path
        className="flame"
        d="M72 14Q92 40 85 64Q80 80 72 82Q64 80 59 64Q52 40 72 14"
        fill="#ff8c2e"
      />
      <path
        className="flame flLick"
        d="M56 42Q50 52 54 66Q57 75 62 78Q60 66 61 56Q62 48 56 42"
        fill="#ff9c3a"
      />
      <path
        className="flame fl2"
        d="M72 32Q83 46 79 64Q76 74 72 76Q68 74 65 64Q61 46 72 32"
        fill="#ffc94d"
      />
      <path
        className="flame fl3"
        d="M72 48Q77 56 76 66Q74 73 72 73Q70 73 68 66Q67 56 72 48"
        fill="#fff3c4"
      />
      <path
        className="flame fl4"
        d="M72 58Q74.5 62 74 68Q73 71.5 72 71.5Q71 71.5 70 68Q69.5 62 72 58"
        fill="#fffdf2"
      />
      {/* rising sparks */}
      {sparks.map(([x, y, dx, delay]) => (
        <circle
          key={`${x}-${y}`}
          className="spark"
          cx={x}
          cy={y}
          r="1.6"
          fill="#ffd27a"
          style={{ "--sdx": `${dx}px`, animationDelay: `${delay}s` } as React.CSSProperties}
        />
      ))}
      {/* front stones — firelit faces toward the flames */}
      <g>
        <ellipse cx="30" cy="92" rx="10" ry="6" fill="#5a4a3c" />
        <path d="M22 89Q30 84.5 38 89" stroke="#a3805a" strokeWidth="1.6" fill="none" />
        <ellipse cx="50" cy="98" rx="10.5" ry="6.5" fill="#6e5a44" />
        <path d="M41 95Q50 90 59 95" stroke="#c89a66" strokeWidth="1.8" fill="none" />
        <ellipse cx="72" cy="101" rx="11" ry="6.5" fill="#77624a" />
        <path d="M62 98Q72 92.5 82 98" stroke="#d8a870" strokeWidth="1.8" fill="none" />
        <ellipse cx="94" cy="98" rx="10.5" ry="6.5" fill="#6e5a44" />
        <path d="M85 95Q94 90 103 95" stroke="#c89a66" strokeWidth="1.8" fill="none" />
        <ellipse cx="114" cy="92" rx="10" ry="6" fill="#5a4a3c" />
        <path d="M106 89Q114 84.5 122 89" stroke="#a3805a" strokeWidth="1.6" fill="none" />
      </g>
    </svg>
  );
}

/** ChefClaw's recipe-library screen: 8 real dish sprites from the app. */
const CC_SPRITES = [
  "shakshuka",
  "takoyaki",
  "croissant",
  "tteokbokki",
  "steak-frites",
  "braised-eggplant",
  "ramen-bowl",
  "sushi-platter",
] as const;

/**
 * ChefClaw's camp kitchen, rebuilt round 4B: the standing screen scaled to a
 * readable billboard in the app's real neon night-market style — near-black
 * panel, hairline border, chili/cyan halos, a grid of recipe cards wearing
 * the app's actual dish sprites, the real app icon on the frame (palette
 * from chefclaw/frontend/src/index.css) — with a detailed ingredient PREP
 * TABLE as the station's visual anchor (the chef NPC is gone): cutting
 * board with chopped vegetables, knife, mixing bowls, spice tins, a stack
 * of plates, a hanging pan rack above, and an open produce crate beside.
 * The tripod cook pot stays, smaller, tucked at the left (its lid-pop
 * reveal is the station's click animation).
 */
function PotArt() {
  return (
    <div className="ccWrap" aria-hidden="true">
      <svg className="ccPot" width="74" height="86" viewBox="0 0 88 98">
        <path d="M44 6L14 90" stroke="#4a3a2c" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 6L74 90" stroke="#4a3a2c" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 6L44 16" stroke="#4a3a2c" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 14L44 30" stroke="#787882" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M28 42Q28 62 34 64L54 64Q60 62 60 42Z" fill="#26262c" />
        <ellipse cx="44" cy="42" rx="17" ry="4.5" fill="#34343c" />
        <g className="ckLid">
          <ellipse cx="44" cy="40" rx="13" ry="3.6" fill="#484852" />
          <circle cx="44" cy="36.5" r="2.6" fill="#5d5d68" />
        </g>
        <circle className="stm" cx="44" cy="32" r="4.2" fill="#e8e4da" />
        <circle className="stm stm2" cx="50" cy="34" r="3.4" fill="#e8e4da" />
        <g className="bp">
          <circle cx="44" cy="30" r="5" fill="#f2ede2" />
          <circle cx="35" cy="34" r="4" fill="#f2ede2" />
          <circle cx="53" cy="34" r="4" fill="#f2ede2" />
        </g>
        <rect x="32" y="88" width="24" height="4" rx="2" fill="#4a3423" />
        <rect x="36" y="84" width="16" height="4" rx="2" fill="#5a4028" />
        <path className="flame" d="M44 66Q51 75 48 84Q44 89 40 84Q37 75 44 66" fill="#ff8c2e" />
        <path className="flame fl2" d="M44 72Q48 77 46 83Q44 86 42 83Q40 77 44 72" fill="#ffd23d" />
      </svg>
      <div className="ccStand">
        <img className="ccIcon" src="/apps/chefclaw/app-icon.svg" alt="" />
        <div className="ccScreen">
          <div className="ccHead">CHEFCLAW</div>
          <div className="ccGrid">
            {CC_SPRITES.map((name, i) => (
              <div key={name} className={`ccCard ${i % 2 ? "ccCyan" : "ccChili"}`}>
                <img src={`/apps/chefclaw/sprites/${name}.svg`} alt="" />
              </div>
            ))}
          </div>
        </div>
        {/* the ingredient prep table — the station's visual anchor */}
        <svg className="ccPrep" width="400" height="150" viewBox="0 0 400 150">
          {/* pan-rack posts + rail */}
          <rect x="28" y="8" width="6" height="80" fill="#2e1f12" />
          <rect x="330" y="8" width="6" height="80" fill="#2e1f12" />
          <rect x="24" y="4" width="316" height="6" rx="3" fill="#3d2a16" />
          {/* hanging pans + ladle */}
          <g>
            <path d="M92 10L92 22" stroke="#55504a" strokeWidth="1.6" />
            <ellipse cx="92" cy="34" rx="15" ry="12" fill="#2b2b31" />
            <ellipse cx="92" cy="30" rx="12" ry="8.5" fill="#3a3a42" />
            <path d="M92 22q6 0 6 4" stroke="#55504a" strokeWidth="2" fill="none" />
          </g>
          <g>
            <path d="M168 10L168 20" stroke="#55504a" strokeWidth="1.6" />
            <ellipse cx="168" cy="36" rx="18" ry="14" fill="#26262c" />
            <ellipse cx="168" cy="31" rx="14" ry="9.5" fill="#34343c" />
            <path d="M155 24Q150 20 146 21" stroke="#3a3a42" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
          <g>
            <path d="M244 10L244 24" stroke="#55504a" strokeWidth="1.6" />
            <ellipse cx="244" cy="36" rx="13" ry="10" fill="#8a5230" />
            <ellipse cx="244" cy="32.5" rx="10" ry="6.5" fill="#a3714a" />
          </g>
          <g>
            <path d="M300 10L300 26" stroke="#55504a" strokeWidth="1.6" />
            <circle cx="300" cy="32" r="6" fill="#3a3a42" />
            <path d="M300 26L300 14" stroke="#787882" strokeWidth="2" />
          </g>
          {/* tabletop */}
          <rect x="12" y="84" width="344" height="13" rx="3" fill="#5a3c22" />
          <rect x="18" y="97" width="332" height="7" fill="#3d2814" />
          <rect x="30" y="104" width="9" height="44" fill="#2e1f12" />
          <rect x="326" y="104" width="9" height="44" fill="#2e1f12" />
          <path d="M39 140L326 112M39 112L326 140" stroke="#241a12" strokeWidth="3" />
          {/* cutting board + chopped vegetables + knife */}
          <rect x="34" y="72" width="86" height="12" rx="4" fill="#c8a06a" />
          <rect x="34" y="72" width="86" height="4" rx="2" fill="#dab57e" />
          <circle cx="52" cy="70" r="3.4" fill="#e8933d" />
          <circle cx="61" cy="68" r="3" fill="#e8933d" />
          <circle cx="70" cy="70.5" r="3.2" fill="#e8933d" />
          <path d="M80 67l6 2m-4-4l6 3m-2-5l5 4" stroke="#5a8a3f" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M128 78L166 74L166 79L128 82Z" fill="#cfd6dd" />
          <path d="M128 78L166 74" stroke="#eef2f6" strokeWidth="1.2" />
          <rect x="164" y="72.5" width="16" height="6" rx="2.5" fill="#3a2a1a" transform="rotate(-6 172 75.5)" />
          {/* mixing bowls */}
          <path d="M192 70Q192 84 206 84Q220 84 220 70Z" fill="#8a9bb0" />
          <ellipse cx="206" cy="70" rx="14" ry="4.4" fill="#5f7189" />
          <ellipse cx="206" cy="70.5" rx="10" ry="2.8" fill="#e8e4da" />
          <path d="M228 74Q228 84 238 84Q248 84 248 74Z" fill="#c9524a" />
          <ellipse cx="238" cy="74" rx="10" ry="3.4" fill="#8f3a34" />
          {/* spice tins */}
          <rect x="258" y="68" width="12" height="16" rx="2" fill="#b3a169" />
          <rect x="258" y="68" width="12" height="4" rx="2" fill="#8a7a4a" />
          <rect x="273" y="71" width="11" height="13" rx="2" fill="#8a5230" />
          <rect x="273" y="71" width="11" height="3.5" rx="1.75" fill="#66391e" />
          <rect x="287" y="69" width="12" height="15" rx="2" fill="#6b7a52" />
          <rect x="287" y="69" width="12" height="4" rx="2" fill="#4c5a3a" />
          {/* stack of plates */}
          <g>
            <ellipse cx="322" cy="82" rx="17" ry="4.4" fill="#e8e4da" />
            <ellipse cx="322" cy="78.5" rx="16" ry="4.2" fill="#d8d2c4" />
            <ellipse cx="322" cy="75" rx="16.5" ry="4.3" fill="#e8e4da" />
            <ellipse cx="322" cy="71.5" rx="15.5" ry="4" fill="#d8d2c4" />
            <ellipse cx="322" cy="71" rx="10" ry="2.4" fill="#f2ede2" />
          </g>
          {/* open produce crate beside the table */}
          <g>
            <rect x="296" y="112" width="76" height="36" rx="2" fill="#6b4a2a" />
            <path d="M296 122L372 122M296 134L372 134" stroke="#4a3220" strokeWidth="3" />
            <rect x="296" y="112" width="6" height="36" fill="#8a6a44" />
            <rect x="366" y="112" width="6" height="36" fill="#8a6a44" />
            <circle cx="314" cy="110" r="6.5" fill="#c94f3d" />
            <circle cx="328" cy="107" r="7" fill="#c94f3d" />
            <circle cx="342" cy="110" r="6.5" fill="#d95f47" />
            <path d="M352 108q6-8 12-4q-4 8-12 4" fill="#5a8a3f" />
            <path d="M306 106q-6-7 0-11q6 5 0 11" fill="#4c7a35" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function StationArt({ kind }: { kind: StationKind }) {
  switch (kind) {
    case "desk":
      return <DeskArt />;
    case "fire":
      return <FireArt />;
    case "pot":
      return <PotArt />;
  }
}
