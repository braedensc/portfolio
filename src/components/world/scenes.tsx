/**
 * SVG art for decor, signposts, furnished set-pieces, and project stations.
 * Pure presentational components — positioning/scaling is done by the engine
 * on the wrapping .item. Ambient motion is CSS-only (world.css), so the
 * reduced-motion block neutralizes all of it in one place.
 */

import type { DecorKind, SetPieceKind, StationKind } from "@/content/site";
import { BEAR, DEER } from "./sprites";
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

/**
 * Spruce wearing snow, rescaled round 5B (client: the old trees were far
 * too small) — now clearly taller than the hiker: five tiers of drooping
 * boughs, each carrying a snow ledge, snowpack drifted at the foot.
 */
function SnowPineArt() {
  return (
    <svg width="92" height="152" viewBox="0 0 92 152" aria-hidden="true">
      <path
        d="M46 2L64 32L55 30L74 60L63 58L84 92L71 90L92 126L76 122L88 142L4 142L16 122L0 126L21 90L8 92L29 58L18 60L37 30L28 32Z"
        fill="#16281e"
      />
      {/* inner shade so the boughs read as depth, not a flat cone */}
      <path d="M46 12L58 32L46 28L34 32Z" fill="#0f1d16" opacity="0.7" />
      <path d="M46 40L66 60L46 54L26 60Z" fill="#0f1d16" opacity="0.6" />
      <path d="M46 70L74 92L46 84L18 92Z" fill="#0f1d16" opacity="0.55" />
      {/* snow ledges riding each tier */}
      <path d="M46 2L57 20L46 16L35 20Z" fill="#e8f0f8" />
      <path d="M29 58L18 60L28 46L38 54Z" fill="#dbe6f2" opacity="0.9" />
      <path d="M55 30L64 32L58 42L48 34Z" fill="#e8f0f8" opacity="0.9" />
      <path d="M8 92L21 90L34 92L20 82Z" fill="#dbe6f2" opacity="0.85" />
      <path d="M71 90L84 92L74 78Z" fill="#cdd9e8" opacity="0.85" />
      <path d="M0 126L16 122L30 126L14 114Z" fill="#dbe6f2" opacity="0.85" />
      <path d="M76 122L92 126L80 112Z" fill="#cdd9e8" opacity="0.8" />
      <path d="M4 142L26 137L52 139L88 142L74 133L20 133Z" fill="#e8f0f8" opacity="0.9" />
      {/* trunk + drifted foot */}
      <path d="M41 141L51 141L51 150L41 150Z" fill="#3a2f22" />
      <ellipse cx="46" cy="147" rx="26" ry="5" fill="#e8f0f8" opacity="0.75" />
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
 * The frozen teal river, rebuilt round 5B from the client's photo as TWO
 * drawn-perspective pieces (the old stacked oval segments read as nothing).
 * The BACK reach recedes toward the ranges — a winding open-water lead
 * narrowing with distance, white ice shelves fingering in from snowy
 * banks, a snow-capped midstream boulder. It ends flat at the footbridge
 * lane; the FRONT reach picks up below the bridge and widens off the
 * bottom of the scene.
 */
function FrozenRiverBackArt() {
  return (
    <svg width="170" height="132" viewBox="0 0 170 132" aria-hidden="true">
      {/* snowy banks, blue-shadowed at the waterline */}
      <path d="M52 132L60 96Q66 62 58 34Q54 16 62 4L108 4Q100 22 106 44Q114 74 108 100L116 132Z" fill="#dbe6f2" />
      {/* the open lead, narrowing upstream */}
      <path d="M58 132L66 98Q72 64 64 36Q60 18 68 6L98 6Q92 24 98 46Q106 76 100 102L106 132Z" fill="#14515c" />
      <path d="M66 132L72 100Q78 66 70 38Q66 20 73 8L91 8Q86 26 92 48Q99 76 93 102L98 132Z" fill="#1d6b74" />
      {/* ice shelves creeping in from both banks */}
      <path d="M58 118Q70 112 80 118Q74 126 62 126Z" fill="#e8f0f8" />
      <path d="M100 96Q90 90 82 96Q88 104 100 104Z" fill="#dbe6f2" />
      <path d="M62 72Q72 66 80 72Q74 78 64 80Z" fill="#e8f0f8" opacity="0.9" />
      <path d="M96 52Q88 47 82 52Q87 58 96 58Z" fill="#dbe6f2" opacity="0.9" />
      <path d="M66 24Q74 20 80 24Q75 29 68 30Z" fill="#e8f0f8" opacity="0.85" />
      {/* the snow-capped midstream boulder */}
      <path d="M76 90Q74 82 82 80Q90 79 92 87Q92 93 84 94Q77 94 76 90Z" fill="#4c5561" />
      <path d="M75 84Q82 77 92 84Q86 81 81 82Z" fill="#e8f0f8" />
      {/* drifting open-water glint */}
      <path className="riverGlint" d="M74 110Q84 106 94 110" stroke="#8fd4d4" strokeWidth="1.4" fill="none" />
      <path className="riverGlint rg2" d="M70 56Q78 52 88 56" stroke="#8fd4d4" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/** The river's front reach: below the bridge, widening toward the viewer. */
function FrozenRiverFrontArt() {
  return (
    <svg width="232" height="92" viewBox="0 0 232 92" aria-hidden="true">
      <path d="M22 92L48 54Q58 30 52 4L172 4Q168 32 180 58L206 92Z" fill="#dbe6f2" />
      <path d="M34 92L58 56Q68 32 62 6L162 6Q158 34 170 60L194 92Z" fill="#14515c" />
      <path d="M48 92L70 58Q80 34 74 8L150 8Q146 36 158 62L178 92Z" fill="#1d6b74" />
      {/* shelves + refrozen pans */}
      <path d="M62 78Q80 70 96 78Q84 88 66 88Z" fill="#e8f0f8" />
      <path d="M168 70Q152 62 138 70Q148 80 166 82Z" fill="#dbe6f2" />
      <path d="M74 36Q88 30 100 36Q90 44 76 44Z" fill="#e8f0f8" opacity="0.9" />
      <path d="M150 28Q138 23 128 28Q136 36 150 36Z" fill="#dbe6f2" opacity="0.9" />
      <ellipse cx="116" cy="56" rx="16" ry="5" fill="#e8f0f8" opacity="0.7" />
      <path className="riverGlint" d="M92 62Q114 56 138 62" stroke="#8fd4d4" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/**
 * The wooden footbridge over the river. The art rides at the TOP of a
 * taller transparent canvas: the item anchors at the river-front's own
 * gy (same flat z, listed after it in the decor, so the deck always draws
 * over the water) while the transparent skirt drops the visible deck
 * exactly onto the walkable lane (gy ≈ 58–68). Plank deck on stringers, a
 * far-side railing, snow dusting the boards; the hiker draws over it.
 */
function BridgeArt() {
  return (
    <svg width="190" height="113" viewBox="0 0 190 113" aria-hidden="true">
      {/* far-side railing: posts + top rail */}
      <path d="M18 30L18 8M60 28L60 6M112 28L112 6M158 30L158 8" stroke="#4a3220" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 12L170 10" stroke="#5c4426" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 12L170 10" stroke="#e8f0f8" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 21L166 19" stroke="#553a20" strokeWidth="2.5" strokeLinecap="round" />
      {/* deck: planks spanning bank to bank, deep enough to walk on */}
      <path d="M4 32L184 28L188 44L8 50Z" fill="#6b4a2a" />
      <path d="M8 50L188 44L186 52L10 58Z" fill="#553a20" />
      <path d="M28 31L30 55M56 30L58 54M88 29.5L90 53M120 29L122 52M150 28.5L152 51" stroke="#3d2a16" strokeWidth="1.2" />
      <path d="M4 32L184 28" stroke="#8a6a44" strokeWidth="1.4" />
      {/* snow on the boards + rail caps */}
      <ellipse cx="44" cy="34" rx="13" ry="2.2" fill="#e8f0f8" opacity="0.8" />
      <ellipse cx="128" cy="32" rx="11" ry="2" fill="#e8f0f8" opacity="0.75" />
      <ellipse cx="90" cy="46" rx="12" ry="2" fill="#e8f0f8" opacity="0.6" />
      <ellipse cx="18" cy="7" rx="3" ry="1.4" fill="#e8f0f8" />
      <ellipse cx="112" cy="5" rx="3" ry="1.4" fill="#e8f0f8" />
      {/* (transparent skirt below — keeps the deck up at the lane) */}
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

/**
 * The Narrows-style stream (round 5B, flat): a shallow jade channel winding
 * the length of the slot floor between wet-sand banks — midstream stones
 * with white riffles, drifting glints, and an occasional fish rise. Never
 * walkable (the scene blocks the whole band).
 */
function StreamArt() {
  return (
    <svg width="520" height="54" viewBox="0 0 520 54" aria-hidden="true">
      {/* wet sand banks */}
      <path
        d="M6 30Q40 12 100 16Q160 20 220 14Q280 8 340 16Q400 24 460 18Q500 15 514 26Q516 34 490 40Q430 48 370 42Q310 36 250 42Q190 48 130 42Q70 36 30 42Q8 40 6 30Z"
        fill="#4f2f18"
      />
      {/* the water: dark jade channel with a lighter mid-band */}
      <path
        d="M18 29Q50 17 104 20Q162 24 222 18Q280 13 338 20Q398 27 458 22Q494 20 504 27Q504 32 484 36Q428 43 368 38Q310 32 252 38Q192 43 134 38Q76 32 36 38Q18 36 18 29Z"
        fill="#2c4f3e"
      />
      <path
        d="M30 28Q60 20 106 23Q164 27 224 21Q280 17 336 23Q396 30 456 25Q486 23 494 28Q486 32 464 34Q426 39 370 35Q310 29 254 35Q194 39 138 35Q80 30 42 34Q30 32 30 28Z"
        fill="#3f6b52"
      />
      <path d="M52 30Q120 24 200 27Q300 22 380 29Q430 31 470 28" stroke="#5a8a6a" strokeWidth="1.6" fill="none" opacity="0.8" />
      {/* midstream stones + white riffles curling downstream of them */}
      <ellipse cx="150" cy="30" rx="7" ry="3.4" fill="#6b5a44" />
      <path d="M144 27Q150 24 156 27" stroke="#8a7a60" strokeWidth="1.2" fill="none" />
      <path d="M158 32Q166 34 174 32" stroke="#dfe8e2" strokeWidth="1.3" fill="none" opacity="0.85" />
      <ellipse cx="332" cy="26" rx="6" ry="3" fill="#55504a" />
      <path d="M339 29Q347 31 355 29" stroke="#dfe8e2" strokeWidth="1.2" fill="none" opacity="0.8" />
      <ellipse cx="428" cy="30" rx="5" ry="2.6" fill="#6b5a44" />
      <path d="M434 32Q441 34 448 32" stroke="#dfe8e2" strokeWidth="1.1" fill="none" opacity="0.8" />
      {/* drifting glints */}
      <path className="streamGlint" d="M80 30L128 29" stroke="#bfe0c8" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path className="streamGlint sg2" d="M250 30L300 29" stroke="#bfe0c8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* an occasional fish rise mid-pool */}
      <path className="fishFin" d="M208 26q3 -5 6 0q-3 2.4 -6 0" fill="#1c3328" />
      <ellipse className="fishRing" cx="211" cy="29" rx="6" ry="2" fill="none" stroke="#bfe0c8" strokeWidth="1.1" />
    </svg>
  );
}

/** Bleached flash-flood driftwood wedged on the slot floor. */
function DriftwoodArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="66"
      height="22"
      viewBox="0 0 66 22"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M4 16Q22 8 36 12Q50 16 62 9" stroke="#c9b89a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M30 13Q40 4 50 4" stroke="#b3a284" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M8 15Q22 9 34 12M40 13Q50 15 58 10" stroke="#8a7a60" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <ellipse cx="5" cy="16" rx="2.4" ry="2.8" fill="#a8977a" />
      <ellipse cx="5" cy="16" rx="1.1" ry="1.4" fill="#7d6e54" />
    </svg>
  );
}

/** Lizard basking on the slot floor — head push-ups, a slow tail sway. */
function LizardArt() {
  return (
    <div className="lizBob" aria-hidden="true">
      <svg width="30" height="14" viewBox="0 0 30 14">
        <g className="lizTail">
          <path d="M9 9Q2 9 3 3" stroke="#8a7a52" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
        <ellipse cx="15" cy="9" rx="7" ry="3.2" fill="#8a7a52" />
        <path d="M9 9Q15 6.5 21 9" stroke="#6b5c3c" strokeWidth="1.4" fill="none" />
        <circle cx="24" cy="8" r="2.6" fill="#8a7a52" />
        <circle cx="25" cy="7.2" r="0.8" fill="#26201c" />
        <path d="M11 11.5L9 13.5M18 11.5L20 13.5M12 6.5L10.5 5M18 6.5L20 5" stroke="#6b5c3c" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** A pair of worn leather hiking boots by the kiosk (interests vignette). */
function BootsArt() {
  return (
    <svg width="36" height="26" viewBox="0 0 36 26" aria-hidden="true">
      <path d="M3 22Q3 10 7 8L13 8Q15 12 19 14Q22 15 22 19L22 22Q13 24 3 22Z" fill="#8a5a34" />
      <path d="M3 21L22 21L22 24Q12 26 3 23Z" fill="#3a2f22" />
      <path d="M7 12L12 11M7 15L13 14" stroke="#d8cfc0" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7 8L13 8L12 5L8 5Z" fill="#6b4a2a" />
      <g transform="rotate(8 28 16)">
        <path d="M20 22Q20 12 24 10L29 10Q31 14 34 15.5Q36 16.5 36 20L36 22Q28 24 20 22Z" fill="#7d5230" />
        <path d="M20 21L36 21L36 24Q27 25 20 23Z" fill="#332a1e" />
        <path d="M24 13L28 12.5M24 16L29 15.5" stroke="#d8cfc0" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Giant cedar flanking the snow gate (round 5B, from the Togakushi photo):
 * a straight fibrous cinnamon trunk with feathery dark sprays high up,
 * snow dusting the pads.
 */
function CedarArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="80"
      height="210"
      viewBox="0 0 80 210"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* feathery sprays */}
      <ellipse cx="40" cy="22" rx="20" ry="14" fill="#1c2f22" />
      <ellipse cx="22" cy="44" rx="18" ry="11" fill="#16281e" />
      <ellipse cx="56" cy="50" rx="19" ry="12" fill="#1c2f22" />
      <ellipse cx="30" cy="74" rx="21" ry="12" fill="#16281e" />
      <ellipse cx="54" cy="92" rx="18" ry="11" fill="#1c2f22" />
      <ellipse cx="34" cy="16" rx="10" ry="6" fill="#26452a" />
      <ellipse cx="26" cy="40" rx="9" ry="5" fill="#22402a" />
      <ellipse cx="52" cy="46" rx="9" ry="5" fill="#26452a" />
      {/* snow dust on the pads */}
      <path d="M24 12Q40 4 56 12Q40 10 24 12Z" fill="#dbe6f2" opacity="0.9" />
      <path d="M8 40Q22 34 36 40Q22 38 8 40Z" fill="#dbe6f2" opacity="0.8" />
      <path d="M40 46Q56 40 72 46Q56 44 40 46Z" fill="#cdd9e8" opacity="0.8" />
      <path d="M14 70Q30 64 48 70Q30 68 14 70Z" fill="#dbe6f2" opacity="0.75" />
      {/* the trunk: straight, tapered, fibrous */}
      <path d="M32 60Q31 130 28 196L24 208L58 208L54 196Q51 130 50 60Q41 52 32 60Z" fill="#7a4526" />
      <path d="M36 70Q35 140 32 200M46 72Q46 142 48 200M41 66Q40 140 40 202" stroke="#5c3018" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M38 90Q37 150 35 196M44 96Q44 152 45 198" stroke="#9a5c34" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="41" cy="206" rx="20" ry="4" fill="#e8f0f8" opacity="0.8" />
    </svg>
  );
}

/**
 * The red timber gate over the snow trail (round 5B, from the Togakushi
 * photo): vermilion posts and side walls under a massive snow-loaded
 * thatch roof — the trail passes through the opening.
 */
function GateArt() {
  return (
    <svg width="180" height="150" viewBox="0 0 180 150" aria-hidden="true">
      {/* posts + side walls */}
      <rect x="30" y="62" width="12" height="84" fill="#7d2f1f" />
      <rect x="138" y="62" width="12" height="84" fill="#7d2f1f" />
      <rect x="33" y="62" width="3" height="84" fill="#a03a28" />
      <rect x="141" y="62" width="3" height="84" fill="#a03a28" />
      <path d="M8 84L30 84L30 146L8 146Z" fill="#8f3225" />
      <path d="M150 84L172 84L172 146L150 146Z" fill="#8f3225" />
      <path d="M8 84L30 84M8 104L30 104M8 124L30 124M150 84L172 84M150 104L172 104M150 124L172 124" stroke="#6b2416" strokeWidth="2" />
      {/* beams over the opening */}
      <rect x="24" y="62" width="132" height="9" fill="#6b2416" />
      <rect x="24" y="62" width="132" height="3.5" fill="#a03a28" />
      <rect x="36" y="78" width="108" height="6" fill="#7d2f1f" />
      {/* the thatch roof, deep eaves */}
      <path d="M2 62L28 26L152 26L178 62L146 56L90 52L34 56Z" fill="#6b5a3c" />
      <path d="M10 58L32 32L148 32L170 58" stroke="#57482c" strokeWidth="2" fill="none" />
      <path d="M22 52L40 34M50 50L60 33M158 52L140 34M130 50L120 33" stroke="#57482c" strokeWidth="1.4" opacity="0.8" />
      {/* the snow slab riding the whole roof */}
      <path d="M4 58Q10 40 30 24Q44 12 90 12Q136 12 150 24Q170 40 176 58Q150 46 90 44Q30 46 4 58Z" fill="#eef3f8" />
      <path d="M14 50Q40 30 90 28Q140 30 166 50" stroke="#dbe6f2" strokeWidth="3" fill="none" opacity="0.9" />
      <path d="M40 24Q90 16 140 24" stroke="#ffffff" strokeWidth="2.4" fill="none" opacity="0.85" />
      {/* snow at the feet */}
      <ellipse cx="36" cy="146" rx="18" ry="4" fill="#e8f0f8" opacity="0.85" />
      <ellipse cx="144" cy="146" rx="18" ry="4" fill="#e8f0f8" opacity="0.85" />
    </svg>
  );
}

/** Pruned Japanese pine on the castle grounds — layered cloud pads. */
function JPineArt() {
  return (
    <svg width="66" height="92" viewBox="0 0 66 92" aria-hidden="true">
      <path d="M30 88Q32 62 28 44Q26 30 34 20" stroke="#3d2a16" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M29 58Q18 52 14 42M30 44Q42 40 48 32" stroke="#3d2a16" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="16" rx="17" ry="9" fill="#1d3322" />
      <ellipse cx="12" cy="38" rx="12" ry="7" fill="#16281e" />
      <ellipse cx="50" cy="28" rx="13" ry="7.5" fill="#1d3322" />
      <ellipse cx="32" cy="12" rx="9" ry="4.5" fill="#28472c" />
      <ellipse cx="47" cy="24" rx="7" ry="3.5" fill="#26452a" />
      <path d="M22 12Q36 6 50 12Q36 10 22 12Z" fill="#dbe6f2" opacity="0.85" />
      <path d="M2 36Q12 31 22 36Q12 34 2 36Z" fill="#dbe6f2" opacity="0.75" />
      <path d="M40 24Q50 20 60 25Q50 23 40 24Z" fill="#cdd9e8" opacity="0.75" />
      <ellipse cx="31" cy="89" rx="12" ry="2.6" fill="#e8f0f8" opacity="0.7" />
    </svg>
  );
}

/** Skis crossed in a snowbank with both poles planted beside them. */
function SkisArt() {
  return (
    <svg width="52" height="82" viewBox="0 0 52 82" aria-hidden="true">
      <g transform="rotate(-13 20 44)">
        <rect x="16" y="6" width="7" height="68" rx="3.5" fill="#b3402e" />
        <rect x="16" y="6" width="7" height="10" rx="3.5" fill="#e8e4da" />
        <path d="M19.5 20L19.5 66" stroke="#8f3225" strokeWidth="1.6" />
        <rect x="16.5" y="40" width="6" height="7" rx="1.5" fill="#26262c" />
      </g>
      <g transform="rotate(13 32 44)">
        <rect x="29" y="6" width="7" height="68" rx="3.5" fill="#3f7a8a" />
        <rect x="29" y="6" width="7" height="10" rx="3.5" fill="#e8e4da" />
        <path d="M32.5 20L32.5 66" stroke="#2c5a66" strokeWidth="1.6" />
        <rect x="29.5" y="40" width="6" height="7" rx="1.5" fill="#26262c" />
      </g>
      <path d="M8 22L11 74" stroke="#9aa1a9" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M44 22L41 74" stroke="#9aa1a9" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="8" cy="21" r="2.2" fill="#3a3a40" />
      <circle cx="44" cy="21" r="2.2" fill="#3a3a40" />
      <path d="M7 68L15 68M37 68L45 68" stroke="#3a3a40" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 78Q14 70 28 74Q42 70 50 78Q38 82 26 80Q12 82 2 78Z" fill="#eef3f8" />
    </svg>
  );
}

/** Small wooden ski rack holding three pairs. */
function SkiRackArt() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" aria-hidden="true">
      <rect x="10" y="26" width="6" height="44" fill="#5c4426" />
      <rect x="84" y="26" width="6" height="44" fill="#5c4426" />
      <rect x="6" y="24" width="88" height="6" rx="3" fill="#6b4a2a" />
      <path d="M6 24L94 24" stroke="#e8f0f8" strokeWidth="2" strokeLinecap="round" />
      {[
        [26, "#b3402e", "#8f3225"],
        [48, "#c9971f", "#a3791a"],
        [68, "#3f7a8a", "#2c5a66"],
      ].map(([x, c, d]) => (
        <g key={String(x)} transform={`rotate(-6 ${Number(x) + 4} 46)`}>
          <rect x={Number(x)} y={8} width="5.5" height="58" rx="2.75" fill={String(c)} />
          <rect x={Number(x)} y={8} width="5.5" height="8" rx="2.75" fill="#e8e4da" />
          <rect x={Number(x) + 7} y={12} width="5.5" height="58" rx="2.75" fill={String(d)} />
          <rect x={Number(x) + 7} y={12} width="5.5" height="8" rx="2.75" fill="#d8d2c4" />
        </g>
      ))}
      <ellipse cx="50" cy="69" rx="42" ry="3.5" fill="#e8f0f8" opacity="0.75" />
    </svg>
  );
}

/**
 * Hogan-shaped earthen structure (round 5B, Navajo-inspired and kept
 * generic/respectful): a low earth-covered dome with visible log courses,
 * its doorway facing east, a faint wisp at the smoke hole.
 */
function HoganArt() {
  return (
    <svg width="134" height="96" viewBox="0 0 134 96" aria-hidden="true">
      <path className="hoganSmoke" d="M62 22Q58 14 64 8Q70 3 68 -2" stroke="#c9b89a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* the earthen dome */}
      <path d="M6 92Q4 46 36 28Q66 12 98 28Q130 46 128 92Z" fill="#8a5a34" />
      <path d="M14 92Q14 52 42 34Q56 26 67 25Q50 44 46 92Z" fill="#a3714a" opacity="0.75" />
      <path d="M120 92Q120 54 96 36Q108 56 110 92Z" fill="#6b4426" opacity="0.85" />
      {/* log courses wrapping the dome */}
      <g stroke="#5c4126" strokeWidth="1.8" fill="none" opacity="0.8">
        <path d="M10 78Q66 62 124 78M16 62Q66 46 118 62M28 46Q66 32 106 46M44 33Q66 24 90 33" />
      </g>
      {/* smoke hole */}
      <ellipse cx="64" cy="24" rx="7" ry="3" fill="#4a3220" />
      {/* east-facing doorway with a striped hanging */}
      <path d="M96 92L96 56Q106 48 116 56L116 92Z" fill="#3a2414" />
      <path d="M96 56Q106 48 116 56L118 62Q106 54 94 62Z" fill="#5c4126" />
      <path d="M100 92L100 62Q106 58 112 62L112 92Z" fill="#8f3225" />
      <path d="M100 70L112 70M100 78L112 78" stroke="#e8ddc4" strokeWidth="2" />
      <path d="M100 74L112 74M100 82L112 82" stroke="#26201c" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Woven rug airing on a wooden rack (generic geometric bands — terracotta,
 * black and cream; no sacred figures).
 */
function BlanketRackArt() {
  return (
    <svg width="80" height="68" viewBox="0 0 80 68" aria-hidden="true">
      {/* A-frame ends + rail */}
      <path d="M8 66L18 12M28 66L18 12" stroke="#5c4426" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M52 66L62 12M72 66L62 12" stroke="#5c4426" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M14 14L66 14" stroke="#6b4a2a" strokeWidth="4" strokeLinecap="round" />
      {/* the rug over the rail */}
      <path d="M22 14L58 14L58 52L22 52Z" fill="#e8ddc4" />
      <path d="M22 18L58 18M22 48L58 48" stroke="#b3502e" strokeWidth="4" />
      <path d="M22 24L58 24M22 42L58 42" stroke="#26201c" strokeWidth="2.2" />
      {[28, 36, 44, 52].map((x) => (
        <path key={x} d={`M${x} 30L${x + 3.5} 33.5L${x} 37L${x - 3.5} 33.5Z`} fill="#8f3225" />
      ))}
      <path d="M22 52L58 52" stroke="#c9b89a" strokeWidth="1.6" />
      <path d="M24 52L24 56M30 52L30 56M36 52L36 56M42 52L42 56M48 52L48 56M54 52L54 56" stroke="#c9b89a" strokeWidth="1.2" />
    </svg>
  );
}

/** Striped hoodoo spire (Zion/Bryce-inspired). v1 is shorter. */
function HoodooArt({ v = 0 }: { v?: number }) {
  const h = v ? 118 : 160;
  const s = v ? 0.78 : 1;
  return (
    <svg width={78 * s + 2} height={h} viewBox={`0 0 ${78 * s + 2} ${h}`} aria-hidden="true">
      <g transform={`scale(${s})`}>
        {/* stacked strata, waisted like a totem */}
        <path d="M14 158Q8 140 16 126Q24 114 18 100Q12 86 22 74Q30 62 24 48Q20 36 30 26L52 26Q60 36 56 48Q50 62 58 74Q66 86 62 100Q56 114 64 126Q70 140 66 158Z" fill="#a55d30" />
        <path d="M18 152Q14 138 20 126Q26 114 21 100Q16 88 25 74Q32 62 27 48Q24 38 32 30L40 30Q40 90 40 156Z" fill="#c97a42" opacity="0.85" />
        <g stroke="#7c3f1e" strokeWidth="2" fill="none" opacity="0.8">
          <path d="M15 140Q40 132 65 140M19 112Q40 104 61 112M20 88Q40 80 60 88M24 60Q40 54 56 60M28 38Q40 33 54 38" />
        </g>
        <g stroke="#e0b276" strokeWidth="1.2" fill="none" opacity="0.7">
          <path d="M16 134Q40 126 64 134M20 106Q40 98 60 106M22 82Q40 74 58 82M26 54Q40 48 55 54" />
        </g>
        {/* the caprock */}
        <path d="M22 28Q20 14 40 12Q60 14 58 28Q48 32 40 32Q32 32 22 28Z" fill="#8a5230" />
        <path d="M24 22Q40 14 56 22" stroke="#b3714a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * The rounded granite arch over the desert path (round 5B, drawn from the
 * client's Mobius Arch photograph) — the trail passes under its window.
 */
function ArchArt() {
  return (
    <svg width="310" height="150" viewBox="0 0 310 150" aria-hidden="true">
      {/* left shoulder mass */}
      <path d="M2 148L0 108Q4 78 30 70Q52 66 62 84L64 148Z" fill="#8a7560" />
      <path d="M8 96Q22 78 44 80" stroke="#b39b7d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* the sweeping arch band */}
      <path d="M30 92Q34 44 96 24Q170 4 236 30Q284 48 288 96L288 148L236 148L238 106Q232 70 178 58Q120 48 84 74Q64 88 66 118L64 148L12 148L14 118Q18 100 30 92Z" fill="#a08a70" />
      {/* lit crown + under-shadow of the window */}
      <path d="M40 74Q66 34 128 22Q196 12 248 40Q222 26 168 28Q104 32 68 60Q50 70 40 74Z" fill="#c4ac8a" />
      <path d="M84 74Q140 46 200 62Q240 74 238 106Q226 76 178 66Q124 58 84 74Z" fill="#5f5040" />
      {/* right foot boulder */}
      <path d="M242 148L240 116Q246 92 274 94Q300 94 306 118L304 148Z" fill="#8a7560" />
      <path d="M250 106Q266 96 288 102" stroke="#b39b7d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* granite speckle + cracks */}
      <g fill="#7d6a54" opacity="0.7">
        <circle cx="110" cy="44" r="1.6" />
        <circle cx="160" cy="36" r="1.4" />
        <circle cx="210" cy="48" r="1.7" />
        <circle cx="70" cy="96" r="1.4" />
        <circle cx="252" cy="116" r="1.5" />
      </g>
      <path d="M132 30Q136 44 130 56M196 32Q200 44 208 56" stroke="#7d6a54" strokeWidth="1.4" fill="none" opacity="0.7" />
    </svg>
  );
}

/**
 * Roadrunner on the shared 3px logical-pixel grid — sprints across the open
 * flat in quick dashes (CSS .roadRun), crest up, tail long.
 */
function RoadrunnerArt() {
  const P = 3;
  const px: ReadonlyArray<readonly [number, number, string]> = [
    [9, 0, "#4a3a2c"], // crest
    [0, 1, "#4a3a2c"], // tail tip, angled up
    [1, 1, "#4a3a2c"],
    [9, 1, "#6b5a44"], // head
    [10, 1, "#26201c"], // eye
    [11, 1, "#4a3a2c"], // beak
    [12, 1, "#4a3a2c"], // beak tip
    [1, 2, "#6b5a44"], // tail base
    [2, 2, "#6b5a44"],
    [8, 2, "#8a7660"], // neck
    [9, 2, "#8a7660"],
    [3, 3, "#6b5a44"], // back, streaked
    [4, 3, "#8a7660"],
    [5, 3, "#6b5a44"],
    [6, 3, "#8a7660"],
    [7, 3, "#8a7660"],
    [3, 4, "#8a7660"], // body
    [4, 4, "#d8d2c4"], // pale belly
    [5, 4, "#8a7660"],
    [6, 4, "#d8d2c4"],
    [7, 4, "#8a7660"],
    [4, 5, "#6b5236"], // legs
    [6, 5, "#6b5236"],
    [3, 6, "#6b5236"], // feet mid-stride
    [7, 6, "#6b5236"],
  ];
  return (
    <div className="roadRun" aria-hidden="true">
      <svg width={13 * P} height={7 * P} viewBox={`0 0 ${13 * P} ${7 * P}`} shapeRendering="crispEdges">
        {px.map(([x, y, c]) => (
          <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={c} />
        ))}
      </svg>
    </div>
  );
}

/**
 * Coyote on the pixel grid — patrols the back line at a slow trot, pausing
 * to look around (CSS .coyoteTrot).
 */
function CoyoteArt() {
  const P = 3;
  const px: ReadonlyArray<readonly [number, number, string]> = [
    [11, 0, "#6e5c48"], // ears
    [13, 0, "#6e5c48"],
    [11, 1, "#9a8a70"], // head
    [12, 1, "#9a8a70"],
    [13, 1, "#9a8a70"],
    [12, 2, "#26201c"], // eye row + muzzle
    [11, 2, "#9a8a70"],
    [13, 2, "#8a7a60"],
    [14, 2, "#6e5c48"], // muzzle tip
    [10, 3, "#9a8a70"], // neck
    [3, 3, "#6e5c48"], // back line
    [4, 3, "#6e5c48"],
    [5, 3, "#6e5c48"],
    [6, 3, "#6e5c48"],
    [7, 3, "#6e5c48"],
    [8, 3, "#6e5c48"],
    [9, 3, "#6e5c48"],
    [0, 4, "#8a7a60"], // tail, drooping
    [1, 4, "#8a7a60"],
    [2, 4, "#8a7a60"],
    [3, 4, "#9a8a70"], // body
    [4, 4, "#9a8a70"],
    [5, 4, "#9a8a70"],
    [6, 4, "#9a8a70"],
    [7, 4, "#9a8a70"],
    [8, 4, "#9a8a70"],
    [9, 4, "#9a8a70"],
    [10, 4, "#9a8a70"],
    [0, 5, "#4a3a2c"], // dark tail tip
    [3, 5, "#9a8a70"],
    [4, 5, "#d8ccb4"], // pale chest/belly
    [5, 5, "#d8ccb4"],
    [6, 5, "#9a8a70"],
    [7, 5, "#d8ccb4"],
    [8, 5, "#9a8a70"],
    [9, 5, "#d8ccb4"],
    [10, 5, "#9a8a70"],
    [3, 6, "#6e5c48"], // legs
    [5, 6, "#6e5c48"],
    [8, 6, "#6e5c48"],
    [10, 6, "#6e5c48"],
    [3, 7, "#6e5c48"],
    [5, 7, "#6e5c48"],
    [8, 7, "#6e5c48"],
    [10, 7, "#6e5c48"],
  ];
  return (
    <div className="coyoteTrot" aria-hidden="true">
      <svg width={15 * P} height={8 * P} viewBox={`0 0 ${15 * P} ${8 * P}`} shapeRendering="crispEdges">
        {px.map(([x, y, c]) => (
          <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={c} />
        ))}
      </svg>
    </div>
  );
}

/**
 * Snake that slips between the bushes now and then — hidden most of its
 * loop, then a brief slither (CSS .snakeSlither; base opacity 0 so reduced
 * motion never shows it frozen mid-air).
 */
function SnakeArt() {
  return (
    <div className="snakeSlither" aria-hidden="true">
      <svg width="52" height="14" viewBox="0 0 52 14">
        <path
          d="M4 10Q11 3 19 8Q27 13 35 8Q41 4 46 8"
          stroke="#8a6a3a"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M9 6.5L11 8.5M19 7L21 9M29 9.5L31 7.5M38 6L40 8" stroke="#5c4426" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="47" cy="8" r="2.6" fill="#8a6a3a" />
        <circle cx="48" cy="7.2" r="0.7" fill="#26201c" />
        <path d="M49.5 8.5L52 10" stroke="#b3402e" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * Ground squirrel on the pixel grid — quick dashes between cover with a
 * tail flick at each pause (CSS .sqDash).
 */
function SquirrelArt() {
  const P = 3;
  const px: ReadonlyArray<readonly [number, number, string]> = [
    [1, 0, "#a3714a"], // tail curl
    [2, 0, "#a3714a"],
    [0, 1, "#a3714a"],
    [1, 1, "#c9955e"],
    [2, 1, "#a3714a"],
    [0, 2, "#a3714a"],
    [1, 2, "#c9955e"],
    [6, 2, "#8a5230"], // ear
    [0, 3, "#a3714a"],
    [1, 3, "#a3714a"],
    [5, 3, "#8a5230"], // head
    [6, 3, "#8a5230"],
    [7, 3, "#26201c"], // eye
    [2, 4, "#8a5230"], // body
    [3, 4, "#8a5230"],
    [4, 4, "#8a5230"],
    [5, 4, "#8a5230"],
    [6, 4, "#8a5230"],
    [2, 5, "#8a5230"],
    [3, 5, "#c9955e"], // belly
    [4, 5, "#c9955e"],
    [5, 5, "#8a5230"],
    [3, 6, "#5c3a1e"], // paws
    [5, 6, "#5c3a1e"],
  ];
  return (
    <div className="sqDash" aria-hidden="true">
      <svg width={8 * P} height={7 * P} viewBox={`0 0 ${8 * P} ${7 * P}`} shapeRendering="crispEdges">
        {px.map(([x, y, c]) => (
          <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={c} />
        ))}
      </svg>
    </div>
  );
}

/**
 * Snowshoe hare on the pixel grid — white winter coat, black ear tips,
 * short hops between the drifts (CSS .hareHop).
 */
function HareArt() {
  const P = 3;
  const px: ReadonlyArray<readonly [number, number, string]> = [
    [6, 0, "#eef2f6"], // ears
    [7, 0, "#26201c"], // black ear tip
    [6, 1, "#cfd9e2"],
    [7, 1, "#eef2f6"],
    [6, 2, "#eef2f6"], // head
    [7, 2, "#eef2f6"],
    [8, 2, "#26201c"], // eye
    [1, 3, "#eef2f6"], // back
    [2, 3, "#eef2f6"],
    [3, 3, "#eef2f6"],
    [4, 3, "#eef2f6"],
    [5, 3, "#eef2f6"],
    [6, 3, "#eef2f6"],
    [7, 3, "#eef2f6"],
    [0, 4, "#ffffff"], // tail puff
    [1, 4, "#cfd9e2"],
    [2, 4, "#eef2f6"],
    [3, 4, "#eef2f6"],
    [4, 4, "#eef2f6"],
    [5, 4, "#eef2f6"],
    [6, 4, "#cfd9e2"],
    [1, 5, "#cfd9e2"], // haunch + legs
    [2, 5, "#cfd9e2"],
    [5, 5, "#cfd9e2"],
    [2, 6, "#b8c8d4"],
    [5, 6, "#b8c8d4"],
  ];
  return (
    <div className="hareHop" aria-hidden="true">
      <svg width={9 * P} height={7 * P} viewBox={`0 0 ${9 * P} ${7 * P}`} shapeRendering="crispEdges">
        {px.map(([x, y, c]) => (
          <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={c} />
        ))}
      </svg>
    </div>
  );
}

/**
 * Doe at the meadow treeline — pixel-art canvas painted by the engine
 * (data-npc="deer": grazes head-down, lifts its head to check the meadow
 * every few seconds). v1 mirrors the second animal.
 */
function DeerArt({ v = 0 }: { v?: number }) {
  return (
    <div
      className="deerWrap"
      style={v ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <canvas data-npc="deer" width={DEER.w} height={DEER.h} className="deerCv" />
    </div>
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
    case "slotfin":
      return <SlotFinArt />;
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
    case "riverback":
      return <FrozenRiverBackArt />;
    case "riverfront":
      return <FrozenRiverFrontArt />;
    case "bridge":
      return <BridgeArt />;
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
    case "boots":
      return <BootsArt />;
    case "stream":
      return <StreamArt />;
    case "driftwood":
      return <DriftwoodArt v={v} />;
    case "lizard":
      return <LizardArt />;
    case "cedar":
      return <CedarArt v={v} />;
    case "gate":
      return <GateArt />;
    case "jpine":
      return <JPineArt />;
    case "skis":
      return <SkisArt />;
    case "skirack":
      return <SkiRackArt />;
    case "hogan":
      return <HoganArt />;
    case "blanketrack":
      return <BlanketRackArt />;
    case "hoodoo":
      return <HoodooArt v={v} />;
    case "arch":
      return <ArchArt />;
    case "roadrunner":
      return <RoadrunnerArt />;
    case "coyote":
      return <CoyoteArt />;
    case "snake":
      return <SnakeArt />;
    case "squirrel":
      return <SquirrelArt />;
    case "hare":
      return <HareArt />;
    case "deer":
      return <DeerArt v={v} />;
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
      {/* fish rising off the far shore (round 5B): a fin breaks, a ring
          spreads — both rest at opacity 0 so reduced motion hides them */}
      <path className="fishFin" d="M60 121q3.5 -5.5 7 0q-3.5 2.6 -7 0" fill="#0a1420" />
      <ellipse className="fishRing" cx="63" cy="124" rx="6" ry="2.1" fill="none" stroke="#a9c4d4" strokeWidth="1" />
      <path className="fishFin ffB" d="M148 133q3.5 -5.5 7 0q-3.5 2.6 -7 0" fill="#0a1420" />
      <ellipse className="fishRing frB" cx="151" cy="136" rx="6" ry="2.1" fill="none" stroke="#a9c4d4" strokeWidth="1" />
    </svg>
  );
}

/**
 * The sequoia grove, regrown round 5B per the client's photo: taller,
 * bigger, DARKER cinnamon-red trunks, and denser — three foreground giants
 * plus three mid-ground sequoias packed behind them. Crowns are layered
 * foliage clumps starting high up the trunk (the photo's bare-columned
 * look); the middle giant keeps its black fire-scar hollow.
 */
function GroveArt() {
  /** One distinct foliage clump: under-shadow, body, lit top. */
  const clump = (x: number, y: number, rx: number, ry: number, tone: 0 | 1) => (
    <g key={`${x}-${y}`}>
      <ellipse cx={x} cy={y + ry * 0.55} rx={rx * 0.94} ry={ry * 0.8} fill="#0a130d" opacity="0.45" />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={tone ? "#1b3121" : "#122117"} />
      <ellipse cx={x - rx * 0.15} cy={y - ry * 0.4} rx={rx * 0.62} ry={ry * 0.5} fill={tone ? "#26452a" : "#1e3a25"} />
    </g>
  );
  /** Fibrous vertical bark texture, top→bottom, darker + redder (5B). */
  const fibers = (cx: number, w: number, yTop: number, yBot: number, seed: number) => {
    const lines: string[] = [];
    const fine: string[] = [];
    for (let i = 0; i < 8; i++) {
      const t = (i + 0.5) / 8;
      const x = cx - w / 2 + w * t;
      const sway = Math.sin(seed + i * 2.1) * 3.5;
      const y1 = yTop + ((seed * 7 + i * 13) % 26);
      const y2 = yBot - ((seed * 5 + i * 17) % 34);
      (i % 2 ? fine : lines).push(`M${x} ${y1}Q${x + sway} ${(y1 + y2) / 2} ${x + sway * 0.4} ${y2}`);
    }
    return (
      <g key={`f${cx}-${yTop}`}>
        <path d={lines.join("")} stroke="#38130a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d={fine.join("")} stroke="#7d3a18" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  };
  return (
    <svg width="500" height="560" viewBox="0 0 500 560" aria-hidden="true">
      {/* three mid-ground sequoias, hazier, packed between the giants */}
      <g opacity="0.86">
        <path d="M146 190Q145 340 141 512L134 530L176 530L169 512Q165 340 164 190Q156 181 146 190Z" fill="#4c1f0e" />
        {fibers(155, 16, 200, 516, 3)}
        {clump(155, 142, 24, 12, 0)}
        {clump(146, 166, 19, 10, 0)}
        {clump(166, 170, 17, 9, 1)}
        {clump(155, 120, 14, 8, 1)}
      </g>
      <g opacity="0.86">
        <path d="M338 206Q337 352 333 514L326 532L370 532L363 514Q359 352 358 206Q349 197 338 206Z" fill="#511f0d" />
        {fibers(348, 16, 216, 518, 8)}
        {clump(348, 158, 23, 11, 0)}
        {clump(339, 180, 18, 10, 1)}
        {clump(360, 184, 16, 9, 0)}
        {clump(349, 136, 13, 8, 1)}
      </g>
      <g opacity="0.8">
        <path d="M18 226Q17 366 14 516L8 532L48 532L42 516Q38 366 37 226Q28 218 18 226Z" fill="#48200f" />
        {fibers(27, 14, 236, 520, 12)}
        {clump(27, 180, 21, 11, 0)}
        {clump(18, 202, 16, 9, 1)}
        {clump(38, 206, 14, 8, 0)}
      </g>

      {/* left giant — crown high, long bare column */}
      {clump(92, 42, 18, 10, 0)}
      {clump(80, 62, 26, 13, 0)}
      {clump(106, 68, 24, 12, 1)}
      {clump(74, 88, 28, 13, 0)}
      {clump(110, 94, 26, 12, 1)}
      {clump(92, 112, 34, 13, 0)}
      <path d="M82 112Q79 300 68 462L52 544L134 544L119 462Q108 300 104 112Q93 100 82 112Z" fill="#5e2410" />
      {fibers(93, 36, 124, 534, 1)}

      {/* middle giant (tallest) — keeps the black fire-scar hollow */}
      {clump(252, 20, 19, 10, 0)}
      {clump(238, 42, 28, 14, 0)}
      {clump(268, 48, 26, 13, 1)}
      {clump(230, 70, 30, 14, 0)}
      {clump(274, 76, 28, 13, 1)}
      {clump(252, 96, 38, 15, 0)}
      <path d="M238 96Q235 300 224 452L202 552L302 552L282 452Q270 300 266 96Q252 84 238 96Z" fill="#6b2d13" />
      {fibers(252, 42, 110, 542, 5)}
      <path d="M232 552Q227 494 242 470Q259 460 269 482Q277 516 272 552Z" fill="#20100a" />
      <path d="M238 552Q235 506 246 488Q257 481 263 496Q268 526 264 552Z" fill="#0c0604" />

      {/* right giant */}
      {clump(442, 66, 17, 9, 0)}
      {clump(432, 86, 25, 12, 0)}
      {clump(454, 92, 23, 11, 1)}
      {clump(426, 112, 26, 13, 0)}
      {clump(456, 118, 24, 11, 1)}
      {clump(442, 136, 32, 13, 0)}
      <path d="M432 136Q429 312 420 470L406 548L482 548L468 470Q458 312 454 136Q444 125 432 136Z" fill="#5e2410" />
      {fibers(443, 34, 148, 538, 11)}

      {/* ferns and shade plants at the feet */}
      <path
        d="M180 540C178 530 173 525 167 521M180 540C180 529 181 524 184 518M180 540C184 531 189 528 194 525"
        stroke="#3d5a33"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M330 544C328 535 323 530 318 527M330 544C331 534 334 529 338 524M330 544C334 537 339 533 344 532"
        stroke="#47663a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M66 550C64 541 59 536 54 533M66 550C67 540 70 535 74 530"
        stroke="#3d5a33"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M414 548C412 540 408 536 403 533M414 548C415 539 417 535 420 530"
        stroke="#3d5a33"
        strokeWidth="1.8"
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
 * The climbing wall, rebuilt round 5B from the client's El Capitan photo:
 * a towering pale-granite monolith with a rounded crown, sheer lit face,
 * shadowed prow, long vertical crack systems and the dark "heart" patch.
 * A fixed rope runs the face past clipped quickdraws and chalked holds;
 * climbing gear is staged at the base (crash pad, coiled rope, shoes,
 * harness, draw rack, chalk bag). The Taft Point crow keeps the summit.
 */
function ElCapWallArt() {
  return (
    <svg width="480" height="470" viewBox="0 0 480 470" aria-hidden="true">
      {/* the wall: runs off the west edge like the valley side itself — a
          long, near-level summit line climbing to the Nose, then the prow
          dropping sheer to the talus */}
      <path d="M0 470L0 96Q70 82 150 62Q250 38 330 34Q372 32 398 58Q432 92 438 168L442 470Z" fill="#a29a8a" />
      {/* sunlit southwest face */}
      <path d="M0 470L0 104Q80 88 164 66Q252 44 314 42Q292 140 296 260Q300 380 308 470Z" fill="#bcb29e" />
      {/* shadowed east prow */}
      <path d="M344 38Q382 42 404 66Q430 96 436 172L438 470L348 470Q362 320 356 200Q352 100 344 38Z" fill="#7c7466" />
      <path d="M344 38Q382 42 404 66Q430 96 436 172L438 470" stroke="#68604f" strokeWidth="2.4" fill="none" />
      {/* summit slope catching the sun */}
      <path d="M0 96Q70 82 150 62Q250 38 330 34L344 38Q250 50 156 72Q70 90 0 106Z" fill="#cfc5ae" />
      {/* the "heart" — the big shadowed recess on the lit face */}
      <path d="M124 158Q148 138 168 156Q184 172 174 210Q166 246 146 260Q128 248 120 214Q112 180 124 158Z" fill="#8a8172" opacity="0.9" />
      <path d="M134 172Q150 158 162 172Q170 186 164 212Q158 236 146 242Q136 230 130 204Q126 186 134 172Z" fill="#736a5b" opacity="0.75" />
      <path d="M144 166Q141 202 148 240" stroke="#68604f" strokeWidth="1.6" fill="none" opacity="0.7" />
      {/* long vertical crack systems + water streaks */}
      <g stroke="#6e675a" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M212 52Q206 170 212 310Q215 400 210 470" />
        <path d="M262 44Q270 180 262 330Q258 410 264 470" />
        <path d="M366 60Q376 190 370 344" />
        <path d="M84 82Q78 210 84 360Q86 420 82 470" />
      </g>
      <g stroke="#8a8273" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M156 68Q152 190 158 340M238 46Q234 160 240 310Q242 390 238 470M318 44Q324 170 318 320" />
        <path d="M36 100Q32 250 38 420M404 96Q414 240 408 420" />
      </g>
      {/* ledges catching light */}
      <g stroke="#cfc5ae" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M108 240Q140 232 170 238M204 330Q236 322 268 328M140 400Q170 394 198 398M296 180Q322 174 348 180" />
      </g>
      {/* the crow on the summit (occasional wing ruffle, CSS .crowWing) */}
      <g className="crowWing" transform="translate(318 12)">
        <ellipse cx="10" cy="12" rx="8" ry="5.2" fill="#17171d" />
        <path d="M16 10Q22 12 20 16L12 16Z" fill="#101014" />
        <circle cx="3.5" cy="6.5" r="3.6" fill="#17171d" />
        <path d="M0.2 6.5L-4.5 8L0.5 8.6Z" fill="#494950" />
        <circle cx="2.4" cy="5.6" r="0.7" fill="#8d8d96" />
        <path d="M6 14Q13 10 17 14Q13 18 8 17Z" fill="#26262e" />
      </g>
      {/* the fixed line: red rope from the summit anchor down the face */}
      <path d="M290 44Q284 130 292 230Q298 330 288 410Q284 440 290 466" stroke="#d1543e" strokeWidth="2.8" fill="none" />
      <path d="M290 44Q284 130 292 230Q298 330 288 410" stroke="#e8734f" strokeWidth="1" fill="none" strokeDasharray="4 5" />
      {/* clipped quickdraws along the line */}
      {[
        [288, 106, "#4a90d9"],
        [291, 186, "#e8b93d"],
        [294, 266, "#5a7a42"],
        [290, 346, "#8a8a92"],
      ].map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y}L${Number(x) + 6} ${Number(y) + 7}`} stroke="#8a8a92" strokeWidth="1.6" />
          <ellipse cx={Number(x) + 8} cy={Number(y) + 11} rx="3" ry="4" fill="none" stroke={String(c)} strokeWidth="2" />
        </g>
      ))}
      {/* the summit anchor: two bolts + sling */}
      <path d="M282 42L290 36L298 42" stroke="#8a8a92" strokeWidth="2" fill="none" />
      <circle cx="282" cy="42" r="2" fill="#494950" />
      <circle cx="298" cy="42" r="2" fill="#494950" />
      {/* chalk marks at the holds near the line */}
      <g fill="#f0ede0">
        <ellipse cx="274" cy="150" rx="5.5" ry="2.8" opacity="0.6" />
        <ellipse cx="306" cy="218" rx="5" ry="2.5" opacity="0.55" />
        <ellipse cx="272" cy="298" rx="5.2" ry="2.6" opacity="0.55" />
        <ellipse cx="302" cy="376" rx="4.6" ry="2.3" opacity="0.5" />
        <ellipse cx="278" cy="430" rx="4.4" ry="2.2" opacity="0.5" />
      </g>
      {/* talus + tiny pines at the foot for scale */}
      <path d="M410 466L406 452Q412 442 428 444Q442 442 445 454L443 466Z" fill="#5f5a50" />
      <path d="M398 452L405 432L412 452Z" fill="#20331f" />
      <path d="M418 456L426 432L434 456Z" fill="#182a1a" />
      <path d="M40 466L36 450Q42 438 58 440Q72 438 74 452L72 466Z" fill="#6e6960" />
      {/* staged gear: crash pad, coiled rope, shoes, harness, rack, chalk */}
      <g>
        <path d="M170 470L170 456Q170 450 178 450L254 450Q262 450 262 456L262 470Z" fill="#2c3e5f" />
        <path d="M170 458L262 458" stroke="#1e2c46" strokeWidth="2" />
        <path d="M188 450L188 470M240 450L240 470" stroke="#1e2c46" strokeWidth="2.4" />
        <path d="M172 452Q216 446 260 452" stroke="#40598a" strokeWidth="2" fill="none" />
      </g>
      <g fill="none" stroke="#d1543e" strokeWidth="2.4">
        <ellipse cx="294" cy="456" rx="12" ry="6" />
        <ellipse cx="294" cy="453" rx="12" ry="6" stroke="#e8734f" />
        <ellipse cx="294" cy="450" rx="12" ry="6" />
      </g>
      {/* climbing shoes, heel to heel */}
      <path d="M318 462Q318 456 324 456L334 456Q338 458 336 463Q328 466 318 466Z" fill="#b3402e" />
      <path d="M358 462Q358 456 352 456L342 456Q338 458 340 463Q348 466 358 466Z" fill="#8f3225" />
      <path d="M321 458L332 458M344 458L355 458" stroke="#26201c" strokeWidth="1.2" />
      {/* harness hung on a spike of rock */}
      <path d="M376 438L376 426" stroke="#6e675a" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="376" cy="442" rx="10" ry="4.5" fill="none" stroke="#e8b93d" strokeWidth="2.4" />
      <path d="M368 444Q370 452 374 454M384 444Q382 452 378 454" stroke="#c9971f" strokeWidth="2.2" fill="none" />
      {/* rack of draws on a sling + chalk bag */}
      <path d="M120 452Q132 448 144 452" stroke="#4a3a2c" strokeWidth="1.6" fill="none" />
      {[
        [124, 453, "#4a90d9"],
        [132, 451, "#8a8a92"],
        [140, 453, "#5a7a42"],
      ].map(([x, y, c]) => (
        <g key={`d${x}`}>
          <path d={`M${x} ${y}L${x} ${Number(y) + 5}`} stroke="#8a8a92" strokeWidth="1.2" />
          <ellipse cx={x} cy={Number(y) + 8} rx="2.4" ry="3.2" fill="none" stroke={String(c)} strokeWidth="1.8" />
        </g>
      ))}
      <path d="M96 456L106 456Q107 466 101 468Q94 466 96 456Z" fill="#c97a4a" />
      <ellipse cx="101" cy="457" rx="3.6" ry="1.4" fill="#e8e4da" />
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
 * Sculpted sandstone wave wall, reworked round 5B (client: the old forms
 * were unreadable). Now it reads literally: a stack of five flowing strata
 * shelves — each a smooth rounded tongue with a shadowed face and a
 * beam-lit lip — topped by an overhanging wave curl with a dark under-
 * cave, the way the slot's walls actually flow. v1 mirrors it for the
 * opposite wall.
 */
function WaveLedgeArt({ v = 0 }: { v?: number }) {
  return (
    <svg
      width="210"
      height="230"
      viewBox="0 0 210 230"
      aria-hidden="true"
      style={v ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* five stacked strata tongues, bottom → top, each lipped with light */}
      <path d="M6 230Q2 204 26 194Q90 182 152 190Q198 196 202 230Z" fill="#5e2c14" />
      <path d="M8 222Q6 204 28 196Q90 185 150 192Q192 198 198 222" fill="none" stroke="#96522a" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 196Q8 168 40 158Q102 146 156 156Q192 164 194 196Q120 186 40 192Z" fill="#743a1c" />
      <path d="M16 190Q12 170 42 160Q102 149 154 158Q186 166 190 188" fill="none" stroke="#a55d30" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M22 158Q14 128 52 118Q108 108 152 118Q184 126 186 158Q112 148 46 154Z" fill="#7c3f1e" />
      <path d="M24 152Q18 130 54 120Q108 111 150 120Q178 128 182 152" fill="none" stroke="#b86a38" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M32 118Q24 88 60 78Q110 68 148 80Q174 88 176 118Q108 108 52 114Z" fill="#8a4a24" />
      <path d="M34 112Q28 90 62 80Q110 71 146 82Q170 90 172 112" fill="none" stroke="#c97a42" strokeWidth="2.6" strokeLinecap="round" />
      {/* the wave curl: overhanging hook with a shadowed under-cave */}
      <path d="M48 78Q38 34 88 20Q140 8 162 38Q174 56 154 66Q140 44 108 44Q74 46 64 78Z" fill="#8a4a24" />
      <path d="M50 70Q46 40 90 26Q136 14 156 40" fill="none" stroke="#d98f57" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 78Q74 50 108 46Q138 44 152 64Q136 58 112 60Q84 62 72 78Z" fill="#3d1a0a" />
      {/* strata flow-lines wrapping the tongues */}
      <g stroke="#451f0d" strokeWidth="1.3" fill="none" opacity="0.7">
        <path d="M30 176Q100 164 176 174M38 138Q104 126 172 136M46 100Q106 90 164 98M60 56Q104 40 148 48" />
      </g>
      <g stroke="#d98f57" strokeWidth="1" fill="none" opacity="0.45">
        <path d="M32 170Q100 158 172 168M42 132Q106 120 168 130M52 94Q108 84 160 92" />
      </g>
      {/* sand skirting the foot */}
      <path d="M2 230Q30 218 70 222Q130 214 170 222Q196 220 208 230Z" fill="#a5663a" opacity="0.7" />
    </svg>
  );
}

/**
 * Freestanding sandstone fin (round 5B slot density): a narrow rounded
 * blade with strata bands wrapping its waist and a beam-lit west rim.
 */
function SlotFinArt() {
  return (
    <svg width="110" height="190" viewBox="0 0 110 190" aria-hidden="true">
      <path d="M18 190Q8 130 20 84Q30 36 58 22Q84 14 94 48Q102 86 92 132Q86 168 78 190Z" fill="#6b3418" />
      {/* shadowed east face */}
      <path d="M62 26Q86 22 92 52Q100 90 90 134Q84 168 78 190L58 190Q70 130 72 84Q73 48 62 26Z" fill="#4f2410" />
      {/* lit west rim */}
      <path d="M22 86Q32 40 58 24" fill="none" stroke="#d98f57" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 130Q14 108 22 86" fill="none" stroke="#b86a38" strokeWidth="2.5" strokeLinecap="round" />
      {/* strata bands wrapping the blade */}
      <g stroke="#451f0d" strokeWidth="1.4" fill="none" opacity="0.75">
        <path d="M16 148Q50 138 84 146M14 116Q50 106 90 114M20 82Q52 72 94 80M32 48Q58 38 90 50" />
      </g>
      <g stroke="#c97a42" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M17 142Q50 132 86 140M16 110Q52 100 89 108M23 76Q54 66 92 74" />
      </g>
      <path d="M10 190Q30 180 56 184Q80 180 96 190Z" fill="#a5663a" opacity="0.7" />
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
 * Yosemite Falls (round 5B, from the client's photo): a dark granite
 * amphitheater at the back treeline with the white ribbon dropping between
 * its walls — upper fall, a mid-ledge splash, lower fall — into a foaming
 * plunge pool over talus. Falling water is dashed strokes cycling downward
 * (CSS .fallsFlow); the mist puffs breathe (CSS .fallsMist).
 */
function FallsArt() {
  return (
    <svg width="250" height="340" viewBox="0 0 250 340" aria-hidden="true">
      {/* the amphitheater: two dark granite walls meeting at the notch */}
      <path d="M4 336L2 130Q10 44 96 26L114 24L110 84Q104 190 112 336Z" fill="#46525f" />
      <path d="M246 336L248 120Q238 40 152 24L134 22L140 84Q148 190 138 336Z" fill="#39434e" />
      {/* wall shading + ledge lines */}
      <path d="M10 330L8 140Q14 70 78 40Q60 110 64 200Q66 280 72 330Z" fill="#3a4550" />
      <path d="M240 330L242 130Q236 62 176 38Q192 110 188 204Q186 284 180 330Z" fill="#2c343d" />
      <g stroke="#57646f" strokeWidth="1.6" fill="none" opacity="0.8">
        <path d="M20 120Q50 108 78 116M16 210Q44 200 70 208M172 130Q202 122 230 132M178 226Q206 218 234 228" />
      </g>
      <g stroke="#242c34" strokeWidth="1.8" fill="none" opacity="0.7">
        <path d="M34 86Q58 76 82 84M166 90Q192 82 218 92M26 268Q52 260 76 266M180 272Q206 264 230 272" />
      </g>
      {/* the upper fall: white ribbon from the notch */}
      <path d="M114 26L134 26L132 148Q128 160 122 160Q118 160 116 148Z" fill="#dfe9f2" />
      <path d="M119 26L129 26L128 146Q126 152 123 152Q121 152 120 146Z" fill="#f2f7fb" />
      {/* mid-ledge: a small shelf the water breaks over */}
      <path d="M108 162L140 162L136 172L112 172Z" fill="#4e5a66" />
      <ellipse cx="124" cy="163" rx="16" ry="4" fill="#e8f0f6" opacity="0.9" />
      {/* the lower fall, slightly wider */}
      <path d="M112 170L136 170L138 288Q132 298 124 298Q116 298 112 288Z" fill="#dfe9f2" />
      <path d="M118 170L130 170L131 286Q128 292 124 292Q121 292 119 286Z" fill="#f6fafc" />
      {/* falling-water texture: dashed strokes cycling downward */}
      <path className="fallsFlow" d="M121 30L121 150M124 172L124 292" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path className="fallsFlow ff2" d="M128 34L127 148M130 176L131 288" stroke="#c9dcea" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* plunge pool + foam */}
      <path d="M62 322Q64 300 96 296Q124 292 154 296Q186 300 190 322Q186 334 124 336Q66 334 62 322Z" fill="#3c5a66" />
      <ellipse cx="124" cy="308" rx="34" ry="9" fill="#5d8794" opacity="0.85" />
      <ellipse cx="124" cy="300" rx="18" ry="5" fill="#e8f2f6" opacity="0.9" />
      <path d="M92 312Q108 306 124 310Q142 314 156 310" stroke="#cfe4ea" strokeWidth="1.6" fill="none" opacity="0.8" />
      {/* mist puffs breathing at the base */}
      <g fill="#eef5f9">
        <ellipse className="fallsMist" cx="102" cy="290" rx="16" ry="9" />
        <ellipse className="fallsMist fm2" cx="146" cy="286" rx="13" ry="8" />
        <ellipse className="fallsMist fm3" cx="124" cy="276" rx="11" ry="7" />
      </g>
      {/* talus boulders shouldering the pool */}
      <path d="M40 336L36 318Q44 304 66 307Q82 306 84 320L82 336Z" fill="#4c463e" />
      <path d="M166 336L164 322Q170 310 188 312Q202 311 205 324L203 336Z" fill="#55504a" />
      <path d="M44 316Q56 309 70 312M170 318Q182 312 196 315" stroke="#6e685f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* dark pines flanking the base, dwarfed by the walls */}
      <path d="M18 336L30 300L42 336Z" fill="#1b2e1d" />
      <path d="M28 322L30 292L32 322Z" fill="#233a24" />
      <path d="M216 336L228 296L240 336Z" fill="#182a1a" />
      <path d="M204 336L212 310L220 336Z" fill="#20331f" />
    </svg>
  );
}

/**
 * The About anchor, rebuilt round 5B: a big about-this-website kiosk at the
 * very start of the trail (the hiker spawns beside it). Carved title, a
 * route map of all five scenes with a you-are-here dot, a pinned photo,
 * and a note card.
 */
function KioskArt() {
  // The five stops on the route map, west→east, in scene ground tones.
  const stops: ReadonlyArray<readonly [number, number, string]> = [
    [28, 94, "#5a7a42"], // meadow
    [46, 85, "#b3502e"], // slot
    [66, 91, "#dfe8f2"], // snow
    [86, 85, "#c97a42"], // desert
    [108, 91, "#46608c"], // camp
  ];
  return (
    <svg width="150" height="162" viewBox="0 0 150 162" aria-hidden="true">
      {/* posts */}
      <rect x="18" y="44" width="8" height="116" fill="#5c4426" />
      <rect x="124" y="44" width="8" height="116" fill="#5c4426" />
      <path d="M18 152L26 152M124 152L132 152" stroke="#4a3423" strokeWidth="3" />
      {/* shingle roof */}
      <path d="M2 38L75 6L148 38L141 44L75 16L9 44Z" fill="#4a3423" />
      <path d="M9 44L75 16L141 44L134 49L75 23L16 49Z" fill="#6b4a2a" />
      <path d="M30 38L75 19L120 38" stroke="#7d5a36" strokeWidth="1.6" fill="none" />
      {/* the board */}
      <rect x="14" y="48" width="122" height="76" rx="3" fill="#8a6a42" stroke="#5c4426" strokeWidth="2.5" />
      {/* carved title plank */}
      <rect x="24" y="55" width="102" height="16" rx="2" fill="#6b4a2a" />
      <text
        x="75"
        y="66.5"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="9.5"
        letterSpacing="1.6"
        fill="#f0e6cc"
      >
        ABOUT THIS SITE
      </text>
      {/* the route map: five scene stops joined by a dashed trail */}
      <rect x="20" y="76" width="110" height="26" fill="#e8e0cc" />
      <path
        d="M28 94Q37 86 46 85Q57 84 66 91Q76 97 86 85Q97 74 108 91"
        stroke="#8a6a44"
        strokeWidth="1.6"
        strokeDasharray="3 3"
        fill="none"
      />
      {stops.map(([x, y, c]) => (
        <circle key={x} cx={x} cy={y} r="3.6" fill={c} stroke="#5c4426" strokeWidth="1.2" />
      ))}
      {/* you-are-here at the meadow stop */}
      <circle cx="28" cy="94" r="6" fill="none" stroke="#c9524a" strokeWidth="1.8" />
      {/* pinned photo + note card on the lower rail */}
      <g transform="rotate(4 36 113)">
        <rect x="24" y="106" width="24" height="15" fill="#f2eee2" />
        <rect x="26" y="108" width="20" height="8.5" fill="#46608c" />
        <rect x="26" y="115" width="20" height="4" fill="#5a7a42" />
        <circle cx="36" cy="107" r="1.4" fill="#c9524a" />
      </g>
      <rect x="94" y="106" width="28" height="14" rx="1.5" fill="#d8cfc0" transform="rotate(-3 108 113)" />
      <path d="M99 110.5L117 109.5M99 114.5L112 114M99 118L114 117" stroke="#8a7a5e" strokeWidth="1.2" />
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

/**
 * Matsumoto Castle (round 5B, from the client's photo): the black-and-white
 * tiered keep — dark weatherboard bands under white plaster, tiled roofs
 * carrying snow, gold shachi finials on the top ridge — rising off a
 * battered stone base with snow drifted against it.
 */
function CastleArt() {
  // Lower four tiers, bottom→top: [wall left, wall top, wall width, wall
  // height, eave overhang]. The top tier + ridge are drawn by hand.
  const tiers: ReadonlyArray<readonly [number, number, number, number, number]> = [
    [42, 262, 216, 38, 14],
    [60, 216, 180, 30, 13],
    [76, 172, 148, 28, 12],
    [92, 130, 116, 26, 11],
  ];
  return (
    <svg width="300" height="360" viewBox="0 0 300 360" aria-hidden="true">
      {/* battered stone base */}
      <path d="M56 348L80 298L220 298L244 348Z" fill="#55504a" />
      <path d="M64 336L86 302M84 344L102 306M120 348L128 304M172 348L170 304M214 344L200 304M232 340L216 304" stroke="#3f3b36" strokeWidth="1.6" />
      <path d="M74 314Q150 306 226 314M66 330Q150 322 234 330" stroke="#3f3b36" strokeWidth="1.4" fill="none" />
      <path d="M80 298L220 298L224 306L76 306Z" fill="#6a655d" />
      {/* snow drifted against the base */}
      <path d="M48 352Q70 338 96 344Q130 336 168 344Q206 336 234 344Q252 342 256 352Z" fill="#eef3f8" />
      {tiers.map(([x, y, w, h, ov], i) => {
        const cx = x + w / 2;
        const roofY = y - 16;
        return (
          <g key={i}>
            {/* wall: white plaster over a black weatherboard skirt */}
            <rect x={x} y={y} width={w} height={h * 0.52} fill="#e8e6de" />
            <rect x={x} y={y + h * 0.52} width={w} height={h * 0.48} fill="#1d1d22" />
            <path d={`M${x} ${y + h * 0.52}L${x + w} ${y + h * 0.52}`} stroke="#2e2e34" strokeWidth="1.6" />
            {/* window slits in the plaster band */}
            {Array.from({ length: 3 + (3 - i) }, (_, j) => {
              const n = 3 + (3 - i);
              const wx = x + (w / (n + 1)) * (j + 1);
              return <rect key={j} x={wx - 3} y={y + 4} width="6" height={h * 0.36} fill="#26262c" />;
            })}
            {/* tiled roof with upturned eaves + snow slab */}
            <path
              d={`M${x - ov} ${y} Q${x + 22} ${roofY + 3} ${cx - 12} ${roofY} L${cx + 12} ${roofY} Q${x + w - 22} ${roofY + 3} ${x + w + ov} ${y} Q${cx} ${y + 7} ${x - ov} ${y} Z`}
              fill="#26262c"
            />
            <path
              d={`M${x - ov + 2} ${y - 2} Q${x + 22} ${roofY} ${cx - 12} ${roofY - 2.5} L${cx + 12} ${roofY - 2.5} Q${x + w - 22} ${roofY} ${x + w + ov - 2} ${y - 2}`}
              stroke="#eef3f8"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}
      {/* the vermilion rail of the moon-viewing wing, tier one */}
      <path d="M46 258L254 258" stroke="#a03a28" strokeWidth="3" />
      <path d="M58 258L58 264M92 258L92 264M126 258L126 264M174 258L174 264M208 258L208 264M242 258L242 264" stroke="#a03a28" strokeWidth="2" />
      {/* top tier + hip-gable roof, gold shachi at the ridge ends */}
      <rect x="107" y="92" width="86" height="12" fill="#e8e6de" />
      <rect x="107" y="104" width="86" height="12" fill="#1d1d22" />
      <rect x="128" y="94" width="7" height="9" fill="#26262c" />
      <rect x="146" y="94" width="7" height="9" fill="#26262c" />
      <rect x="164" y="94" width="7" height="9" fill="#26262c" />
      <path d="M96 92Q118 70 138 66L162 66Q182 70 204 92Q150 100 96 92Z" fill="#26262c" />
      <path d="M100 88Q120 70 140 66.5L160 66.5Q180 70 200 88" stroke="#eef3f8" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M136 66L164 66" stroke="#1d1d22" strokeWidth="6" strokeLinecap="round" />
      <path d="M137 63Q133 54 139 52Q143 56 141 63Z" fill="#c9a23d" />
      <path d="M163 63Q167 54 161 52Q157 56 159 63Z" fill="#c9a23d" />
      <path d="M136 62L164 62" stroke="#eef3f8" strokeWidth="3" strokeLinecap="round" />
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
      return <ElCapWallArt />;
    case "falls":
      return <FallsArt />;
    case "castle":
      return <CastleArt />;
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
