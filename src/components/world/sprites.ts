/**
 * Canvas pixel-art painters for the hiker and the mascot NPCs (dog, chef).
 * All sprites share one logical-pixel style; canvases are displayed at 3x
 * with image-rendering: pixelated.
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

/* ---------- dog (12×10, 2-frame idle: ear flick / tail wag) ---------- */

export const DOG = { w: 12, h: 10 } as const;

const DOG_PAL: Palette = {
  b: "#8a5a33",
  d: "#5f3d22",
  c: "#b6402e",
  n: "#1d1512",
};

const DOG_FRAMES: readonly [readonly string[], readonly string[]] = [
  [
    "...b........",
    "..bbb.......",
    ".bbbbb......",
    "nbnbbb......",
    ".bbbb....dd.",
    "..ccc...bdd.",
    "..bbbbbbbb..",
    "..bbbbbbbbb.",
    "..bb..bb.bb.",
    "..dd..dd.dd.",
  ],
  [
    "............",
    "..bbbb......",
    ".bbbbb......",
    "nbnbbb......",
    ".bbbb.......",
    "..ccc...b...",
    "..bbbbbbbbd.",
    "..bbbbbbbbbd",
    "..bb..bb.bb.",
    "..dd..dd.dd.",
  ],
];

export function paintDog(ctx: CanvasRenderingContext2D, frame: 0 | 1): void {
  paint(ctx, DOG_FRAMES[frame], DOG_PAL, DOG.w, DOG.h);
}

/* ---------- chef (15×22, 2-frame stirring loop) ---------- */

export const CHEF = { w: 15, h: 22 } as const;

const CHEF_PAL: Palette = {
  W: "#f2ede2",
  S: "#e6b48d",
  E: "#26201c",
  R: "#7a3d34",
  A: "#e6e0d2",
  P: "#232a3d",
  K: "#3a2f22",
  M: "#8a6a44",
};

const CHEF_BODY = [
  "...AAAAAAAA....",
  "...AAAAAAAA....",
  "...AAAAAAAA....",
  "...AAAAAAAA....",
  "....AAAAAA.....",
  "....PPPPPP.....",
  "....PPPPPP.....",
  "....PP..PP.....",
  "....PP..PP.....",
  "....PP..PP.....",
  "...KKK..KKK....",
  "...............",
];

const CHEF_FRAMES: readonly [readonly string[], readonly string[]] = [
  [
    "....WWWWWW.....",
    "...WWWWWWWW....",
    "....WWWWWW.....",
    "....SSSSSS.....",
    "....SESSSS.....",
    ".....SSSS......",
    "......SS.......",
    "M...RRRRRR.....",
    ".MSSRRRRRRR....",
    "...AAAAAAAA....",
    ...CHEF_BODY,
  ],
  [
    "....WWWWWW.....",
    "...WWWWWWWW....",
    "....WWWWWW.....",
    "....SSSSSS.....",
    "....SESSSS.....",
    ".....SSSS......",
    "......SS.......",
    "....RRRRRR.....",
    "..SSRRRRRRR....",
    ".M.AAAAAAAA....",
    ...CHEF_BODY,
  ],
];

export function paintChef(ctx: CanvasRenderingContext2D, frame: 0 | 1): void {
  paint(ctx, CHEF_FRAMES[frame], CHEF_PAL, CHEF.w, CHEF.h);
}
