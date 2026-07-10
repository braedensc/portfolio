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
 * The running track: a flat dirt/tartan oval drawn into the meadow ground
 * (rendered under the hiker via the `flat` decor flag). Two lane lines,
 * slightly worn — dashed, with a couple of bare patches.
 */
function TrackArt() {
  return (
    <svg width="360" height="96" viewBox="0 0 360 96" aria-hidden="true">
      <path
        d="M180 2C282 2 356 22 356 48C356 74 282 94 180 94C78 94 4 74 4 48C4 22 78 2 180 2Z
           M180 26C247 26 298 36 298 48C298 60 247 70 180 70C113 70 62 60 62 48C62 36 113 26 180 26Z"
        fill="#9c5e33"
        fillRule="evenodd"
        stroke="#6e3f1f"
        strokeWidth="2"
      />
      {/* two lane lines, worn (uneven dashes) */}
      <ellipse
        cx="180"
        cy="48"
        rx="137"
        ry="35"
        fill="none"
        stroke="rgba(240,230,208,0.55)"
        strokeWidth="1.6"
        strokeDasharray="14 7 9 11 16 6"
      />
      <ellipse
        cx="180"
        cy="48"
        rx="98"
        ry="27"
        fill="none"
        stroke="rgba(240,230,208,0.45)"
        strokeWidth="1.4"
        strokeDasharray="10 9 15 7 8 12"
      />
      {/* bare, scuffed patches */}
      <ellipse cx="96" cy="66" rx="16" ry="4.5" fill="rgba(94,60,32,0.55)" />
      <ellipse cx="262" cy="30" rx="13" ry="4" fill="rgba(94,60,32,0.5)" />
      <ellipse cx="180" cy="83" rx="18" ry="3.5" fill="rgba(240,230,208,0.12)" />
    </svg>
  );
}

/** Small pond with reeds and an occasional fish jump (arc + ripple, CSS timed). */
function PondArt() {
  return (
    <svg width="132" height="52" viewBox="0 0 132 52" aria-hidden="true">
      <path
        d="M14 30Q10 18 34 15Q62 8 96 13Q124 17 126 30Q128 42 96 47Q52 52 26 46Q10 42 14 30Z"
        fill="#274449"
        stroke="#3a5c5f"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="30" rx="30" ry="8" fill="#335c60" opacity="0.7" />
      {/* fish jump: crescent leaps an arc every ~7s, then the ripple blooms */}
      <g className="fishJump">
        <path d="M0 0Q4 -3 8 0Q5 2 2 3Q0 2 0 0Z" fill="#9fb7ba" />
        <path d="M7.4 -0.6L10 -2.4L9 0.8Z" fill="#9fb7ba" />
      </g>
      <ellipse className="fishRip" cx="78" cy="30" rx="6" ry="2" fill="none" stroke="#bcd4d6" strokeWidth="1.2" />
      {/* reeds + cattails on the right bank */}
      <path
        d="M108 44C108 32 107 26 106 20M114 46C114 34 115 28 116 21M121 43C121 34 120 30 119 25"
        stroke="#4a6a35"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="106" cy="18" rx="2" ry="4.5" fill="#6b4a2a" />
      <ellipse cx="116" cy="19" rx="2" ry="4.5" fill="#6b4a2a" />
    </svg>
  );
}

/** Small ground bird — the wrapper class hops it along on a slow CSS loop. */
function BirdArt({ v = 0 }: { v?: number }) {
  return (
    <div className={`birdHop ${v ? "birdB" : ""}`} aria-hidden="true">
      <svg width="15" height="13" viewBox="0 0 15 13">
        <ellipse cx="7" cy="7.5" rx="4.6" ry="3.4" fill="#8a7660" />
        <path d="M2.5 7L-0.5 5.5L2.8 8.6Z" fill="#6e5c48" />
        <circle cx="11" cy="4.6" r="2.5" fill="#8a7660" />
        <circle cx="11.9" cy="4" r="0.7" fill="#26201c" />
        <path d="M13.2 4.6L15 5.2L13.2 5.9Z" fill="#d9a441" />
        <path d="M6 10.8L6 12.6M8.4 10.8L8.4 12.6" stroke="#6b5236" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Butterfly — wing flap + lazy drift, two color variants. */
function ButterflyArt({ v = 0 }: { v?: number }) {
  const wing = v ? "#b8c4e8" : "#d98f3d";
  return (
    <div className={`bflyDrift ${v ? "bflyB" : ""}`} aria-hidden="true">
      <svg width="12" height="10" viewBox="0 0 12 10">
        <g className="bflyWings">
          <ellipse cx="3.4" cy="4" rx="3" ry="2.6" fill={wing} />
          <ellipse cx="8.6" cy="4" rx="3" ry="2.6" fill={wing} />
          <ellipse cx="3.6" cy="6.6" rx="2" ry="1.6" fill={wing} opacity="0.8" />
          <ellipse cx="8.4" cy="6.6" rx="2" ry="1.6" fill={wing} opacity="0.8" />
        </g>
        <rect x="5.4" y="1.8" width="1.2" height="6" rx="0.6" fill="#33291f" />
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

/** Drying line with a towel between two poles. */
function DrylineArt() {
  return (
    <svg width="112" height="48" viewBox="0 0 112 48" aria-hidden="true">
      <rect x="4" y="8" width="3" height="40" rx="1.5" fill="#4a3a2c" />
      <rect x="105" y="8" width="3" height="40" rx="1.5" fill="#4a3a2c" />
      <path d="M6 11Q56 17 106 11" stroke="#2b2320" strokeWidth="1.3" fill="none" />
      <g className="towelSway">
        <path d="M42 14L66 14L65 34Q54 37 43 34Z" fill="#b8683f" />
        <path d="M42 14L66 14L65.7 19L42.3 19Z" fill="#a05531" />
        <path d="M47 19L47.4 33M59 19L58.6 33" stroke="#8f4a2a" strokeWidth="1" opacity="0.7" />
      </g>
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
    case "pond":
      return <PondArt />;
    case "bird":
      return <BirdArt v={v} />;
    case "butterfly":
      return <ButterflyArt v={v} />;
    case "lanterns":
      return <LanternsArt />;
    case "dryline":
      return <DrylineArt />;
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
  }
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
 * The sequoia grove, redrawn to read as Sequoia National Park: trunks 3–4×
 * the hiker's height, thick cinnamon-red fibrous bark (vertical strokes),
 * a fire-scar hollow at the base of the middle giant, canopies out of frame.
 */
function GroveArt() {
  return (
    <svg width="300" height="232" viewBox="0 0 300 232" aria-hidden="true">
      {/* canopy hints at the very top edge — the crowns live out of frame */}
      <path d="M-4 10Q30 -8 74 6L74 0L-4 0Z" fill="#14261a" />
      <path d="M96 4Q150 -14 208 2L208 0L96 0Z" fill="#182c1e" />
      <path d="M220 12Q262 -6 304 8L304 0L220 0Z" fill="#14261a" />

      {/* left giant */}
      <path d="M32 22Q30 120 26 200L12 230L88 230L72 200Q66 120 66 22Q49 14 32 22Z" fill="#7d4226" />
      <path
        d="M40 26Q38 120 34 210M50 24Q49 130 48 214M60 26Q60 128 63 210M46 60Q45 90 44 130M55 100Q55 150 56 190"
        stroke="#5e2f18"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M36 40Q35 130 31 206M56 34Q56 140 58 206M65 70Q66 140 68 200"
        stroke="#96552e"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* middle giant — with the fire-scar hollow at its base */}
      <path d="M122 12Q120 130 114 202L98 232L206 232L188 202Q180 130 180 12Q151 2 122 12Z" fill="#8a4a2a" />
      <path
        d="M132 16Q130 130 124 214M146 12Q145 140 143 220M160 13Q160 140 164 218M172 20Q172 120 176 208M138 80Q137 130 135 170M154 60Q154 110 154 160"
        stroke="#66341a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M127 30Q126 140 120 212M152 14Q151 150 150 218M168 40Q168 150 172 214"
        stroke="#a55f36"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* fire scar: charred rim around a dark hollow */}
      <path d="M136 232Q132 196 144 182Q158 174 166 190Q172 208 168 232Z" fill="#2a160c" />
      <path d="M141 232Q139 202 148 190Q157 184 162 196Q166 212 163 232Z" fill="#120a06" />

      {/* right giant */}
      <path d="M228 30Q227 130 223 204L210 232L282 232L268 204Q262 130 262 30Q245 22 228 30Z" fill="#7d4226" />
      <path
        d="M236 34Q234 130 230 214M246 31Q245 140 244 218M256 33Q256 136 259 214M251 90Q251 140 252 180"
        stroke="#5e2f18"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M232 50Q231 140 227 210M252 36Q252 150 254 212"
        stroke="#96552e"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* ferns and shade plants at the feet */}
      <path
        d="M92 228C90 220 86 216 81 213M92 228C92 219 93 215 95 210M92 228C95 221 99 218 103 216"
        stroke="#3d5a33"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M206 230C204 223 200 219 196 217M206 230C207 222 209 218 212 214M206 230C209 224 213 221 217 220"
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
