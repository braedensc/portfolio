/**
 * SVG art for decor, signposts, furnished set-pieces (lake, grove, camera),
 * and project stations (planner desk, campfire, cook pot). Pure presentational
 * components — positioning/scaling is done by the engine on the wrapping .item.
 */

import type { DecorKind, SetPieceKind, StationKind } from "@/content/site";

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

export function DecorArt({ kind }: { kind: DecorKind }) {
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

function GroveArt() {
  return (
    <svg width="132" height="96" viewBox="0 0 132 96" aria-hidden="true">
      <path d="M8 34Q4 12 26 8Q44 2 50 20Q54 34 40 38Q16 44 8 34Z" fill="#14261a" />
      <path d="M48 26Q46 4 70 2Q94 2 94 22Q94 38 76 38Q52 40 48 26Z" fill="#182c1e" />
      <path d="M86 36Q84 16 104 12Q124 10 126 28Q128 42 112 44Q90 46 86 36Z" fill="#14261a" />
      <rect x="22" y="32" width="14" height="58" rx="2" fill="#6b3a24" />
      <rect x="22" y="32" width="5" height="58" fill="#57301e" />
      <rect x="62" y="30" width="17" height="62" rx="2" fill="#7a4529" />
      <rect x="62" y="30" width="6" height="62" fill="#61351f" />
      <rect x="100" y="38" width="13" height="54" rx="2" fill="#6b3a24" />
      <rect x="100" y="38" width="5" height="54" fill="#57301e" />
      <path d="M18 90L24 78L34 78L40 90Z" fill="#57301e" />
      <path d="M58 92L64 80L77 80L83 92Z" fill="#61351f" />
      <path d="M96 92L101 82L112 82L117 92Z" fill="#57301e" />
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

export function SetPieceArt({ kind }: { kind: SetPieceKind }) {
  switch (kind) {
    case "lake":
      return <LakeArt />;
    case "grove":
      return <GroveArt />;
    case "photo":
      return <PhotoArt />;
  }
}

/* ---------- project stations ---------- */

function DeskArt() {
  return (
    <div className="tcWrap" aria-hidden="true">
      <svg className="tcTable" width="96" height="62" viewBox="0 0 96 62">
        <rect x="6" y="18" width="84" height="8" rx="2" fill="#7d5a36" />
        <rect x="10" y="26" width="76" height="5" fill="#6a4a2b" />
        <rect x="14" y="31" width="6" height="29" fill="#5c4126" />
        <rect x="76" y="31" width="6" height="29" fill="#5c4126" />
        <rect x="66" y="4" width="13" height="14" rx="2" fill="#3a3230" />
        <rect x="70" y="1" width="5" height="4" rx="1.5" fill="#3a3230" />
        <circle className="lglow" cx="72.5" cy="11" r="4" fill="#ffd685" />
      </svg>
      <div className="tcBoardWrap">
        <svg width="54" height="56" viewBox="0 0 54 56">
          <rect x="2" y="5" width="50" height="48" rx="3" fill="#efe5d0" stroke="#8a6a44" strokeWidth="2" />
          <line x1="27" y1="9" x2="27" y2="49" stroke="#b3a184" strokeWidth="2" />
          <line x1="6" y1="29" x2="48" y2="29" stroke="#b3a184" strokeWidth="2" />
          <circle cx="16" cy="18" r="3.4" fill="#e05548" />
          <circle cx="38" cy="21" r="3.4" fill="#3f7fd1" />
          <circle cx="15" cy="40" r="3.4" fill="#5f9e4e" />
          <circle cx="39" cy="39" r="3.4" fill="#e0a63f" />
          <circle cx="27" cy="5" r="2.8" fill="#c9524a" />
        </svg>
      </div>
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

function PotArt() {
  return (
    <svg width="88" height="98" viewBox="0 0 88 98" aria-hidden="true">
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
