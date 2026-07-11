/**
 * Canvas pixel-art painters for the hiker and the meadow bear. All sprites
 * share one logical-pixel style; canvases are displayed at 3x with
 * image-rendering: pixelated.
 *
 * (The old generic pixel dog is gone — Todoclaw's desk now uses the app's own
 * mascot art, see todoclaw-art.tsx. The chef NPC retired round 4B: the
 * ChefClaw station's anchor is the ingredient prep table.)
 */

type Palette = Record<string, string>;

function paint(
  ctx: CanvasRenderingContext2D,
  rows: readonly string[],
  palette: Palette,
  w: number,
  h: number,
): void {
  ctx.clearRect(0, 0, w, h);
  for (let y = 0; y < rows.length; y++) {
    const r = rows[y];
    for (let x = 0; x < r.length; x++) {
      const c = palette[r.charAt(x)];
      if (c) {
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

/* ---------- hiker (15×22, 3 frames) ---------- */

export type HikerFrame = "idle" | "a" | "b";
export const HIKER = { w: 15, h: 22 } as const;

const HIKER_PAL: Palette = {
  H: "#2b2320",
  S: "#e6b48d",
  E: "#26201c",
  J: "#31497f",
  D: "#243766",
  B: "#b3854f",
  P: "#232a3d",
  K: "#4a3a2c",
};

const HIKER_TORSO = [
  ".....HHHH......",
  "....HHHHHH.....",
  "....HHHHHH.....",
  "....HSSSSH.....",
  "....SSSESS.....",
  ".....SSSS......",
  "......SS.......",
  "...BJJJJJJ.....",
  "..BBJJJJJJJ....",
  ".BBBJJJJJJJS...",
  ".BBBJJJJJJJS...",
  ".BBBJJJJJJJ....",
  ".BBBDJJJJD.....",
  "..BBDJJJJD.....",
  "....DJJJJD.....",
  "....PPPPPP.....",
  "....PPPPPP.....",
];

const HIKER_LEGS: Record<HikerFrame, string[]> = {
  idle: [
    "....PP..PP.....",
    "....PP..PP.....",
    "....PP..PP.....",
    "...KKK..KKK....",
    "...............",
  ],
  a: [
    "....PP...PP....",
    "...PP.....PP...",
    "...PP.....PP...",
    "..KKK.....KKK..",
    "...............",
  ],
  b: [
    ".....PPPP......",
    ".....PPPP......",
    ".....P..P......",
    "....KK..KK.....",
    "...............",
  ],
};

export function paintHiker(ctx: CanvasRenderingContext2D, frame: HikerFrame): void {
  paint(ctx, [...HIKER_TORSO, ...HIKER_LEGS[frame]], HIKER_PAL, HIKER.w, HIKER.h);
}

/* ---------- bear (20×12, 2-frame idle: head turns every few seconds) ----------
   Standing four-legged on its boulder in the meadow (the Glacier NP bear POI).
   Frame 0 looks ahead (right); frame 1 turns its head back toward the trail. */

export const BEAR = { w: 20, h: 12 } as const;

const BEAR_PAL: Palette = {
  b: "#7a5230", // coat
  d: "#5a3a1e", // shading / legs
  h: "#8f6238", // hump + head highlight
  n: "#241708", // nose / eye
};

const BEAR_FRAMES: readonly [readonly string[], readonly string[]] = [
  [
    "....................",
    ".....hh.............",
    "....hhhhbbbb..hh....",
    "...bbbbbbbbbbhhhh...",
    "...bbbbbbbbbbhhnh...",
    "..dbbbbbbbbbbbhh.n..",
    "..dbbbbbbbbbbbdd....",
    "..dbbbbbbbbbbbd.....",
    "..dbb.dbbd..bbd.....",
    "..db..db.d..bd......",
    "..dd..dd.d..dd......",
    "....................",
  ],
  [
    "....................",
    ".....hh......hh.....",
    "....hhhhbbbhhhh.....",
    "...bbbbbbbbbhhhh....",
    "...bbbbbbbbbnhhh....",
    "..dbbbbbbbbbbhhn....",
    "..dbbbbbbbbbbbdd....",
    "..dbbbbbbbbbbbd.....",
    "..dbb.dbbd..bbd.....",
    "..db..db.d..bd......",
    "..dd..dd.d..dd......",
    "....................",
  ],
];

export function paintBear(ctx: CanvasRenderingContext2D, frame: 0 | 1): void {
  paint(ctx, BEAR_FRAMES[frame], BEAR_PAL, BEAR.w, BEAR.h);
}
