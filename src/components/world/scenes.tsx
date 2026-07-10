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

/** Wildflower cluster — three color variants (lupine / poppy / paintbrush). */
function FlowersArt({ v = 0 }: { v?: number }) {
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
 * The running track (round 3): sized up into a proper wide oval. Every
 * boundary and lane line is generated from ONE set of ellipse parameters —
 * same center, decreasing radii, same dash pattern — so the lanes are
 * concentric with the band and can never drift off it.
 */
function TrackArt() {
  const CX = 260;
  const CY = 84;
  const RX = 252; // outer boundary
  const RY = 76;
  const LANES = 3;
  const W = 16; // lane width, constant across the band
  const ring = (rx: number, ry: number) =>
    `M ${CX - rx} ${CY} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0 Z`;
  const inRx = RX - LANES * W;
  const inRy = RY - LANES * W;
  return (
    <svg width="520" height="168" viewBox="0 0 520 168" aria-hidden="true">
      {/* the band: outer ring minus inner ring, both from the same center */}
      <path d={`${ring(RX, RY)} ${ring(inRx, inRy)}`} fill="#9c5e33" fillRule="evenodd" />
      <path d={ring(RX, RY)} fill="none" stroke="#6e3f1f" strokeWidth="2.5" />
      <path d={ring(inRx, inRy)} fill="none" stroke="#6e3f1f" strokeWidth="2" />
      {/* lane separators: the same oval at decreasing radii */}
      {[1, 2].map((i) => (
        <path
          key={i}
          d={ring(RX - W * i, RY - W * i)}
          fill="none"
          stroke="rgba(240,230,208,0.5)"
          strokeWidth="1.6"
          strokeDasharray="12 8"
        />
      ))}
      {/* start line across the near straight */}
      <path
        d={`M ${CX - 4} ${CY + inRy} L ${CX - 4} ${CY + RY}`}
        stroke="rgba(240,230,208,0.65)"
        strokeWidth="2.5"
      />
      {/* worn, scuffed patches */}
      <ellipse cx={CX - 132} cy={CY + 56} rx="20" ry="5" fill="rgba(94,60,32,0.5)" />
      <ellipse cx={CX + 120} cy={CY - 58} rx="16" ry="4.5" fill="rgba(94,60,32,0.45)" />
      <ellipse cx={CX + 152} cy={CY + 50} rx="18" ry="4" fill="rgba(240,230,208,0.1)" />
    </svg>
  );
}

/**
 * The alpine lake (round 3: the meadow pond, grown 3–4× into a mountain
 * lake). Irregular shoreline, a drawn inverted-peak reflection in darker
 * wavier tones, reflected glints, drifting shimmer lines, reeds and shore
 * rocks. Flat ground art — the hiker walks the shore around it.
 */
function MountainLakeArt() {
  const glints = [
    [150, 38, 0],
    [205, 30, 0.8],
    [258, 44, 1.6],
    [118, 52, 2.3],
    [305, 36, 3.0],
    [240, 62, 3.7],
  ] as const;
  return (
    <svg width="420" height="96" viewBox="0 0 420 96" aria-hidden="true">
      {/* water body — irregular alpine shoreline */}
      <path
        d="M18 52Q10 34 52 24Q100 8 178 10Q268 6 330 18Q404 28 408 52Q412 74 340 84Q250 96 150 92Q60 90 30 76Q14 68 18 52Z"
        fill="#28444d"
        stroke="#3d5f63"
        strokeWidth="2.5"
      />
      <ellipse cx="210" cy="50" rx="150" ry="26" fill="#31555c" opacity="0.65" />
      {/* inverted mountain reflection — darker, wavy-edged */}
      <g opacity="0.55">
        <path
          d="M112 15L168 60Q172 64 177 59L190 48L202 60Q206 64 211 59L262 15Q238 20 208 18Q156 16 112 15Z"
          fill="#1c333c"
        />
        <path d="M250 17L294 52Q298 56 303 51L342 20Q308 14 250 17Z" fill="#22404a" />
      </g>
      {/* drifting shimmer lines */}
      <g stroke="#bcd9dc" strokeLinecap="round" fill="none">
        <path className="shimmer" d="M96 46L156 46" strokeWidth="1.6" />
        <path className="shimmer sh2" d="M212 64L286 64" strokeWidth="1.4" />
        <path className="shimmer sh3" d="M256 32L314 32" strokeWidth="1.2" />
      </g>
      {/* reflected glints */}
      {glints.map(([x, y, delay]) => (
        <circle
          key={`${x}-${y}`}
          className="lakeStar"
          cx={x}
          cy={y}
          r="1.5"
          fill="#e6f2f4"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* fish jump, kept from the pond days */}
      <g className="fishJump">
        <path d="M0 0Q4 -3 8 0Q5 2 2 3Q0 2 0 0Z" fill="#9fb7ba" />
        <path d="M7.4 -0.6L10 -2.4L9 0.8Z" fill="#9fb7ba" />
      </g>
      <ellipse
        className="fishRip"
        cx="330"
        cy="58"
        rx="7"
        ry="2.2"
        fill="none"
        stroke="#bcd4d6"
        strokeWidth="1.2"
      />
      {/* shore rocks */}
      <path d="M26 70L22 60Q28 52 40 54Q52 52 55 62L51 71Z" fill="#5e5a4e" />
      <path d="M370 76L366 66Q372 58 384 60Q396 58 399 68L395 77Z" fill="#6e6a5e" />
      <path d="M336 88L334 82Q338 77 345 78Q352 77 354 83L352 88Z" fill="#565449" />
      {/* reeds + cattails on the near shore */}
      <path
        d="M60 92C60 78 59 70 57 62M68 94C68 80 69 72 71 63M77 91C77 80 76 74 75 68"
        stroke="#4a6a35"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="57" cy="60" rx="2.2" ry="5" fill="#6b4a2a" />
      <ellipse cx="71" cy="61" rx="2.2" ry="5" fill="#6b4a2a" />
      <path
        d="M392 90C392 78 393 72 395 66M400 92C400 82 399 76 398 70"
        stroke="#47663a"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
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

/** Small stone cluster. */
function StonesArt() {
  return (
    <svg width="30" height="12" viewBox="0 0 30 12" aria-hidden="true">
      <ellipse cx="7" cy="8" rx="5" ry="3.4" fill="#55504a" />
      <ellipse cx="16" cy="9" rx="3.6" ry="2.6" fill="#625c54" />
      <ellipse cx="24" cy="7.5" rx="4" ry="3" fill="#4c4640" />
      <path d="M4 6.5Q7 4.5 10 6" stroke="#6e685f" strokeWidth="1" fill="none" />
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

/** Wooden dock on the lake with a propped fishing rod; the bobber ripples. */
function DockArt() {
  return (
    <svg width="110" height="64" viewBox="0 0 110 64" aria-hidden="true">
      {/* deck, receding up-left into the water */}
      <path d="M38 60L104 60L84 38L30 38Z" fill="#6b4a2a" />
      <path d="M38 60L104 60L104 63L38 63Z" fill="#4a3220" />
      <path d="M46 59L36 39M62 59.5L50 38.5M78 59.5L64 38.5M92 60L76 38" stroke="#553a20" strokeWidth="1.4" />
      <rect x="28" y="30" width="4" height="12" fill="#4a3a2c" />
      <rect x="52" y="30" width="4" height="10" fill="#4a3a2c" />
      {/* rod propped on the end post, line down to the bobber */}
      <path d="M56 42L18 12" stroke="#4a3a2c" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 12L16 30" stroke="#d8cfc0" strokeWidth="0.9" />
      <circle cx="16" cy="31" r="1.8" fill="#c9524a" />
      <ellipse className="bobRip" cx="16" cy="33" rx="5" ry="1.8" fill="none" stroke="#cfe2e4" strokeWidth="1" />
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
    case "lake":
      return <MountainLakeArt />;
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
    case "dock":
      return <DockArt />;
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
      return <StonesArt />;
    case "lightpool":
      return <LightPoolArt v={v} />;
    case "daisies":
      return <DaisiesArt />;
    case "clover":
      return <CloverArt />;
    case "worn":
      return <WornArt v={v} />;
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

function LakeArt() {
  const lakeStars = [
    [52, 26, 0],
    [78, 22, 0.9],
    [96, 30, 1.7],
    [64, 36, 2.4],
    [112, 25, 3.1],
  ] as const;
  return (
    <svg width="160" height="62" viewBox="0 0 160 62" aria-hidden="true">
      <path
        d="M16 32Q10 20 34 15Q64 6 104 11Q148 15 150 31Q152 47 114 53Q62 59 30 51Q12 45 16 32Z"
        fill="#0d1c29"
        stroke="#1e3648"
        strokeWidth="2"
      />
      <ellipse cx="66" cy="30" rx="36" ry="10" fill="#152b3d" opacity="0.75" />
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
      <path d="M6 56L4 50Q8 44 15 45Q23 44 25 51L23 56Z" fill="#38312c" />
      <path d="M138 58L136 53Q139 48 145 49Q152 48 153 54L151 58Z" fill="#443b34" />
    </svg>
  );
}

/**
 * The sequoia grove, rebuilt for round 3: trunks ~20% skinnier and ~40%
 * taller than round 2, each with a full tapered top and a layered dark-green
 * crown that lives entirely INSIDE the viewBox — nothing clips at the frame.
 * The fire-scar hollow and fibrous cinnamon bark carry over.
 */
function GroveArt() {
  return (
    <svg width="300" height="330" viewBox="0 0 300 330" aria-hidden="true">
      {/* left giant — crown */}
      <g fill="#16281c">
        <ellipse cx="52" cy="30" rx="15" ry="9" />
        <ellipse cx="44" cy="46" rx="22" ry="12" />
        <ellipse cx="62" cy="52" rx="20" ry="11" />
        <ellipse cx="38" cy="68" rx="24" ry="12" />
        <ellipse cx="66" cy="74" rx="22" ry="11" />
        <ellipse cx="52" cy="88" rx="29" ry="12" />
      </g>
      <g fill="#1f3826">
        <ellipse cx="46" cy="56" rx="14" ry="7" />
        <ellipse cx="60" cy="80" rx="15" ry="7" />
        <ellipse cx="52" cy="36" rx="9" ry="5" />
      </g>
      {/* left giant — tapered trunk */}
      <path d="M44 88Q42 210 34 300L22 328L84 328L72 300Q62 210 60 88Q52 78 44 88Z" fill="#7d4226" />
      <path
        d="M48 96Q46 210 40 310M54 94Q53 220 52 314M58 100Q59 220 64 308M51 150Q50 190 49 240"
        stroke="#5e2f18"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M46 120Q45 220 39 306M57 116Q57 230 60 306"
        stroke="#96552e"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* middle giant (tallest) — crown */}
      <g fill="#182c1e">
        <ellipse cx="150" cy="16" rx="16" ry="9" />
        <ellipse cx="140" cy="32" rx="24" ry="13" />
        <ellipse cx="162" cy="38" rx="22" ry="12" />
        <ellipse cx="134" cy="56" rx="26" ry="13" />
        <ellipse cx="168" cy="60" rx="24" ry="12" />
        <ellipse cx="150" cy="76" rx="32" ry="13" />
      </g>
      <g fill="#22402a">
        <ellipse cx="144" cy="42" rx="15" ry="7" />
        <ellipse cx="160" cy="68" rx="16" ry="7" />
        <ellipse cx="150" cy="22" rx="10" ry="5" />
      </g>
      {/* middle giant — tapered trunk with the fire-scar hollow */}
      <path
        d="M136 76Q134 210 126 296L108 330L192 330L176 296Q166 210 164 76Q150 66 136 76Z"
        fill="#8a4a2a"
      />
      <path
        d="M142 84Q140 210 132 312M150 82Q149 230 147 318M157 86Q158 220 162 314M146 150Q145 200 143 250M153 130Q153 180 153 230"
        stroke="#66341a"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M139 110Q138 220 130 310M155 104Q155 230 158 312"
        stroke="#a55f36"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* fire scar: charred rim around a dark hollow */}
      <path d="M134 330Q130 292 142 276Q156 268 164 286Q170 306 166 330Z" fill="#2a160c" />
      <path d="M139 330Q137 298 146 286Q155 280 160 292Q164 310 161 330Z" fill="#120a06" />

      {/* right giant — crown */}
      <g fill="#16281c">
        <ellipse cx="246" cy="52" rx="14" ry="8" />
        <ellipse cx="238" cy="66" rx="21" ry="11" />
        <ellipse cx="256" cy="72" rx="19" ry="10" />
        <ellipse cx="234" cy="86" rx="22" ry="11" />
        <ellipse cx="258" cy="92" rx="20" ry="10" />
        <ellipse cx="246" cy="104" rx="27" ry="11" />
      </g>
      <g fill="#1f3826">
        <ellipse cx="240" cy="74" rx="13" ry="6" />
        <ellipse cx="254" cy="96" rx="14" ry="6" />
      </g>
      {/* right giant — tapered trunk */}
      <path
        d="M238 104Q236 220 230 302L218 330L286 330L274 302Q266 220 264 104Q251 95 238 104Z"
        fill="#7d4226"
      />
      <path
        d="M242 112Q240 220 236 314M250 110Q249 230 248 318M256 114Q256 224 260 312M252 180Q252 220 253 260"
        stroke="#5e2f18"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M240 136Q239 230 233 310M258 130Q258 240 262 310"
        stroke="#96552e"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* ferns and shade plants at the feet */}
      <path
        d="M96 326C94 318 90 314 85 311M96 326C96 317 97 313 99 308M96 326C99 319 103 316 107 314"
        stroke="#3d5a33"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M204 328C202 321 198 317 194 315M204 328C205 320 207 316 210 312M204 328C207 322 211 319 215 318"
        stroke="#47663a"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhotoArt() {
  return (
    <svg width="66" height="70" viewBox="0 0 66 70" aria-hidden="true">
      <path d="M30 30L14 66" stroke="#4a3a2c" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 30L46 66" stroke="#4a3a2c" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 30L30 64" stroke="#3d3024" strokeWidth="3" strokeLinecap="round" />
      <rect x="17" y="12" width="26" height="17" rx="2" fill="#38312c" />
      <rect x="21" y="8" width="10" height="5" rx="1.5" fill="#38312c" />
      <circle cx="30" cy="20.5" r="5.5" fill="#1d1a17" stroke="#6e6b5e" strokeWidth="1.5" />
      <circle cx="41" cy="16" r="1.5" fill="#c9524a" />
      <g transform="rotate(-8 55 58)">
        <rect x="48" y="46" width="15" height="12" fill="#8a6a42" />
        <rect x="50" y="48" width="11" height="8" fill="#d8cfc0" />
      </g>
    </svg>
  );
}

/**
 * Georgia Tech sign beside the track — navy board, gold GT, an "NCAA D1"
 * plank — with three yellow jackets buzzing looped paths around it.
 */
function GtSignArt() {
  return (
    <div className="gtWrap" aria-hidden="true">
      <svg width="84" height="104" viewBox="0 0 84 104">
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
      {/* three yellow jackets on looping curved paths */}
      {[0, 1, 2].map((i) => (
        <div key={i} className={`bee bee${i}`}>
          <svg width="8" height="7" viewBox="0 0 8 7">
            <ellipse cx="4" cy="4" rx="3" ry="2.2" fill="#e8b93d" />
            <path d="M2.7 2.2L2.7 5.8M4.4 2L4.4 6" stroke="#26201c" strokeWidth="1" />
            <circle cx="6.6" cy="3.6" r="1.1" fill="#26201c" />
            <ellipse className="beeWing" cx="3.2" cy="1.4" rx="1.7" ry="1" fill="#f0eee6" opacity="0.85" />
          </svg>
        </div>
      ))}
    </div>
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
 * Climbing vignette on the slot canyon wall: rope, three anchor bolts, and a
 * chalk bag — the SKILLS point of interest.
 */
function ClimbArt() {
  return (
    <svg width="72" height="160" viewBox="0 0 72 160" aria-hidden="true">
      {/* rope from out of frame, gently wavy */}
      <path
        d="M38 0Q33 24 38 46Q43 68 37 92Q32 116 38 138L38 152"
        stroke="#d8cfc0"
        strokeWidth="2.2"
        fill="none"
      />
      <path
        d="M38 0Q33 24 38 46Q43 68 37 92"
        stroke="#b8ab94"
        strokeWidth="0.8"
        fill="none"
        strokeDasharray="3 4"
      />
      {/* three anchor bolts, clipped to the rope */}
      {[
        [43, 34],
        [32, 78],
        [43, 118],
      ].map(([x, y]) => (
        <g key={y}>
          <circle cx={x} cy={y} r="3.2" fill="#8a8a92" stroke="#4c4c52" strokeWidth="1.2" />
          <circle cx={x} cy={y} r="1.1" fill="#3a3a40" />
          <path d={`M${x} ${y + 3}Q${x + 3} ${y + 7} ${x} ${y + 10}Q${x - 3} ${y + 7} ${x} ${y + 3}`} fill="none" stroke="#9a9aa2" strokeWidth="1.6" />
        </g>
      ))}
      {/* chalk bag on a loop near the base, with a dust smudge */}
      <path d="M38 138L50 144" stroke="#4a3a2c" strokeWidth="1.4" />
      <path d="M46 143L58 143Q59 156 52 158Q45 156 46 143Z" fill="#c97a4a" />
      <path d="M46 143L58 143L57.4 147L46.6 147Z" fill="#a55f36" />
      <ellipse cx="52" cy="144" rx="4.5" ry="1.6" fill="#e8e4da" />
      <ellipse cx="59" cy="152" rx="3.5" ry="1.2" fill="#e8e4da" opacity="0.45" />
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
    case "climb":
      return <ClimbArt />;
  }
}

/* ---------- project stations ---------- */

/**
 * Todoclaw's planner desk. The billboard shows a faithful mini-mock of the
 * real app: warm-paper canvas, graph-paper lines, the four quadrant tints,
 * center axes with URGENCY/IMPORTANCE labels, white task cards whose top
 * border carries the quadrant color (sides terracotta), one two-card cluster
 * — colors verbatim from todoclaw/src/features/grid/grid-constants.ts and
 * tailwind.config.js. The real TodoClawPeek pup hangs over the board's top
 * edge exactly as he does on the app's grid.
 */
function DeskArt() {
  // [left%, top%, quadrant top-border color] — mirrors the app's quadrants:
  // schedule green TL, do-now terracotta TR, someday grey BL, errands olive BR.
  const cards: ReadonlyArray<readonly [number, number, string]> = [
    [10, 14, "#3d7a5f"],
    [30, 30, "#3d7a5f"],
    [62, 10, "#bf5e2a"],
    [80, 26, "#bf5e2a"],
    [14, 66, "#857c6e"],
    [66, 62, "#7d6b1e"],
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
            {cards.map(([l, t, c]) => (
              <div key={`${l}-${t}`} className="tcCard" style={{ left: `${l}%`, top: `${t}%`, borderTopColor: c }} />
            ))}
            {/* the two-card cluster */}
            <div className="tcCard" style={{ left: "38%", top: "58%", borderTopColor: "#857c6e" }} />
            <div className="tcCard" style={{ left: "42%", top: "64%", borderTopColor: "#7d6b1e" }} />
          </div>
        </div>
        <svg className="tcLegs" width="150" height="26" viewBox="0 0 150 26">
          <path d="M30 0L16 24M120 0L134 24M75 0L75 22" stroke="#5c4126" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
      <svg className="tcTable" width="126" height="74" viewBox="0 0 126 74">
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

function FireArt() {
  return (
    <svg width="110" height="92" viewBox="0 0 110 92" aria-hidden="true">
      <ellipse cx="55" cy="62" rx="42" ry="15" fill="rgba(255,150,60,.22)" />
      <path
        className="flame"
        d="M55 8Q72 30 66 52Q62 66 55 68Q48 66 44 52Q38 30 55 8"
        fill="#ff8c2e"
      />
      <path
        className="flame fl2"
        d="M55 24Q64 36 61 52Q58 61 55 62Q52 61 49 52Q46 36 55 24"
        fill="#ffc94d"
      />
      <path
        className="flame fl3"
        d="M55 38Q59 45 58 53Q56 58 55 58Q54 58 52 53Q51 45 55 38"
        fill="#fff3c4"
      />
      <rect x="24" y="62" width="34" height="7" rx="3" fill="#4a3423" transform="rotate(8 41 65)" />
      <rect x="52" y="62" width="34" height="7" rx="3" fill="#40301f" transform="rotate(-9 69 65)" />
      <ellipse cx="16" cy="72" rx="7" ry="4.5" fill="#55504a" />
      <ellipse cx="34" cy="78" rx="8" ry="5" fill="#625c54" />
      <ellipse cx="55" cy="81" rx="8" ry="5" fill="#55504a" />
      <ellipse cx="76" cy="78" rx="8" ry="5" fill="#625c54" />
      <ellipse cx="94" cy="72" rx="7" ry="4.5" fill="#55504a" />
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
 * ChefClaw's camp kitchen: the cook pot (kept, with its lid-pop reveal) plus
 * a big prep table carrying a standing screen in the app's real neon
 * night-market style — near-black panel, hairline border, chili/cyan halos,
 * a grid of recipe cards wearing the app's actual dish sprites, and the real
 * app icon mounted on the frame (palette from chefclaw/frontend/src/index.css).
 */
function PotArt() {
  return (
    <div className="ccWrap" aria-hidden="true">
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
        <svg className="ccTable" width="170" height="46" viewBox="0 0 170 46">
          <rect x="2" y="2" width="166" height="9" rx="2" fill="#3a2a20" />
          <rect x="8" y="11" width="154" height="5" fill="#241a12" />
          <rect x="16" y="16" width="7" height="30" fill="#241a12" />
          <rect x="147" y="16" width="7" height="30" fill="#241a12" />
        </svg>
      </div>
      <svg className="ccPot" width="88" height="98" viewBox="0 0 88 98">
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
