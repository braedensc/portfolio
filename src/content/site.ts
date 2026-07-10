/**
 * Single source of truth for all site content: copy, links, scene layout,
 * points of interest, and the auto-mode route. Shared by the world (/) and
 * the simple view (/plain).
 */

export type SceneId = "camp" | "meadow" | "slot";
export type CardId =
  | "about"
  | "experience"
  | "athletics"
  | "bear"
  | "skills"
  | "photography"
  | "todoclaw"
  | "chefclaw"
  | "contact";
export type SetPieceKind = "lake" | "grove" | "photo" | "gtsign" | "bear" | "climb";
export type StationKind = "desk" | "fire" | "pot";
export type DecorKind =
  | "grass"
  | "rock"
  | "slotRock"
  | "campRock"
  | "pine"
  | "log"
  | "flowers"
  | "mossRock"
  | "track"
  | "pond"
  | "bird"
  | "butterfly"
  | "lanterns"
  | "dryline"
  | "backpack"
  | "canister"
  | "stump"
  | "owltree"
  | "dock"
  | "sandline"
  | "slab"
  | "raven";
export type NpcKind = "chef";
export type StationAnim = "opening" | "popping";

export interface Vec {
  gx: number;
  gy: number;
}

/** Furnished waypoint — proximity or click opens its card. */
export interface SetPiece {
  id: CardId;
  kind: SetPieceKind;
  label: string;
  gx: number;
  gy: number;
  approach: Vec;
}

/** Click-to-open station (projects, campfire contact). */
export interface Station {
  id: CardId;
  kind: StationKind;
  label: string;
  gx: number;
  gy: number;
  approach: Vec;
  anim?: StationAnim;
  animMs: number;
}

export interface Decor {
  kind: DecorKind;
  gx: number;
  gy: number;
  /** Optional variant index (e.g. wildflower color, bird timing offset). */
  v?: number;
  /**
   * Ground-flat art (track oval, pond, sand ripples, dock…): rendered UNDER
   * every standing billboard so the hiker can walk "over" it.
   */
  flat?: boolean;
}

export interface Signpost {
  text: string;
  gx: number;
  gy: number;
}

export interface Npc {
  kind: NpcKind;
  gx: number;
  gy: number;
}

export interface Scene {
  id: SceneId;
  name: string;
  /** Content theme shown in the scene indicator, e.g. "PROJECTS". */
  theme: string;
  cls: string;
  img: string;
  bgPos: string;
  aria: string;
  gxClamp: number;
  camClamp: number;
  exits: { left?: number; right?: number };
  alwaysNight?: boolean;
  decor: Decor[];
  signs: Signpost[];
  setPieces: SetPiece[];
  stations: Station[];
  npcs: Npc[];
}

/* ---------- identity + copy (verbatim; no puns) ---------- */

export const identity = {
  name: "Braeden Collins",
  role: "Full-stack software engineer — Atlanta, GA",
  email: "braedenscollins@gmail.com",
  github: "https://github.com/braedensc",
} as const;

export const aboutText =
  "Four-plus years building customer-facing systems at scale: React microfrontends used by 1,000+ people, C#/.NET APIs serving millions of requests a day, 40+ Kubernetes deployments. Georgia Tech CS. Former NCAA distance runner — 4:03 mile, 14:17 5k, 31:07 10k.";

export const stats = [
  "4:03 MILE",
  "14:17 5K",
  "31:07 10K",
  "10⁶+ REQ/DAY",
  "1,000+ USERS",
  "40+ K8S",
] as const;

export interface Project {
  id: "todoclaw" | "chefclaw";
  name: string;
  description: string;
  stack: string;
  status: string;
  url?: string;
}

export const todoclawUrl = "https://todoclaw-psi.vercel.app";

export const projects: Project[] = [
  {
    id: "todoclaw",
    name: "Todoclaw",
    description:
      "Task planner built on a draggable 2D priority grid, with an optional AI assistant for planning and reminders.",
    stack: "React · TypeScript · Supabase · Anthropic",
    status: "Live, invite-only beta.",
    url: todoclawUrl,
  },
  {
    id: "chefclaw",
    name: "ChefClaw",
    description:
      "Turns cooking videos into structured bilingual recipes with a multimodal model.",
    stack: "Python · FastAPI · PostgreSQL · React 19 · Gemini",
    status: "In development — opens here when it ships.",
  },
];

export interface ExperienceRow {
  period: string;
  org: string;
  detail: string;
}

export const experienceRows: ExperienceRow[] = [
  {
    period: "2021–present",
    org: "OnSolve, Atlanta",
    detail:
      "full-stack. React microfrontend platform, high-traffic .NET APIs, ML data-ingestion pipeline, human-in-the-loop moderation platform, −50% third-party geolocation costs.",
  },
  {
    period: "2017–2021",
    org: "Georgia Tech",
    detail: "B.S. Computer Science. NCAA track & cross country.",
  },
];

/** Athletics ("Records") card — the PR stats on the meadow's track sign. */
export const recordsStats = "4:03 mile · 14:17 5k · 31:07 10k";
export const recordsNote = "NCAA Division I track & cross country — Georgia Tech.";

/** Skills card — plain, grouped. Shown at the slot canyon climbing vignette. */
export const skillGroups = [
  "TypeScript · React · Next.js",
  "C# · .NET",
  "Python · FastAPI",
  "PostgreSQL · Supabase",
  "Kubernetes · Docker · AWS · GCP",
  "RabbitMQ · Redis",
] as const;

/** The bear card — one plain factual line, no jokes. */
export const bearNote =
  "Glacier National Park. It was on the trail. Photo from a respectful distance.";

export const photographyNote =
  "Every image here is one of my photographs, restyled by the same pipeline that draws this site.";
export const morePlacesNote =
  "The full site adds more places — snow, desert, granite.";
export const photoCaption = "Built from my photograph.";
export const finePrint =
  "The world is drawn from my photographs — simple view available anytime.";

/** Images shown at the top of in-world content cards. */
export const cardMedia: Partial<
  Record<CardId, { src: string; alt: string; caption?: string }>
> = {
  about: {
    src: "/world/lake.jpg",
    alt: "Mirror-still mountain lake photograph, stylized",
    caption: photoCaption,
  },
  experience: {
    src: "/world/grove.jpg",
    alt: "Sequoia grove photograph, stylized",
    caption: photoCaption,
  },
  bear: {
    src: "/world/bear.jpg",
    alt: "A brown bear resting on a rock among pines, Glacier National Park",
  },
  photography: {
    src: "/world/tunnel-original.jpg",
    alt: "Original Tunnel View photograph",
  },
};

/**
 * Per-section photo galleries. A card that declares a gallery shows a PHOTOS
 * row of thumbnails; clicking one opens the fullscreen lightbox.
 *
 * Convention: drop JPEGs into `public/gallery/<section>/` and list them here
 * (see public/gallery/README.md). Currently seeded with the existing world
 * images so the feature is visible before the real photo sets arrive.
 */
export const galleries: Partial<Record<CardId, string[]>> = {
  about: ["/world/lake.jpg", "/world/camp.jpg"],
  athletics: ["/world/meadow.jpg"],
  experience: ["/world/grove.jpg", "/world/meadow.jpg"],
  photography: ["/world/slot.jpg", "/world/meadow.jpg"],
};

/** Stylized photo strip for the simple view. */
export const worldPhotos = [
  { src: "/world/camp.jpg", alt: "Night campsite photograph, stylized" },
  { src: "/world/meadow.jpg", alt: "Yosemite Tunnel View meadow photograph, stylized" },
  { src: "/world/slot.jpg", alt: "Antelope Canyon slot photograph, stylized" },
  { src: "/world/lake.jpg", alt: "Mirror-still mountain lake photograph, stylized" },
  { src: "/world/grove.jpg", alt: "Sequoia grove photograph, stylized" },
  {
    src: "/world/bear.jpg",
    alt: "A brown bear resting on a rock, Glacier National Park, stylized",
  },
] as const;

/* ---------- scenes (order: camp → meadow → slot) ---------- */

export const scenes: Scene[] = [
  {
    id: "camp",
    name: "THE CAMP",
    theme: "PROJECTS",
    cls: "sc-camp",
    img: "/world/camp.jpg",
    bgPos: "center 76%",
    aria: "Stylized night campsite with a fire, project stations, lantern lights, a small lake with a dock, and a walkable hiker character",
    gxClamp: 500,
    camClamp: 251,
    exits: { right: 1 },
    alwaysNight: true,
    decor: [
      { kind: "campRock", gx: -150, gy: 80 },
      { kind: "campRock", gx: 340, gy: 32 },
      { kind: "campRock", gx: 120, gy: 24 },
      { kind: "log", gx: 110, gy: 74 },
      { kind: "log", gx: -360, gy: 30 },
      { kind: "lanterns", gx: -85, gy: 40 },
      { kind: "dryline", gx: 175, gy: 36 },
      { kind: "backpack", gx: -320, gy: 66 },
      { kind: "canister", gx: 62, gy: 78 },
      { kind: "stump", gx: -45, gy: 66 },
      { kind: "stump", gx: 92, gy: 60, v: 1 },
      { kind: "owltree", gx: 432, gy: 26 },
      { kind: "dock", gx: -452, gy: 66, flat: true },
    ],
    signs: [{ text: "THE MEADOW →", gx: 440, gy: 52 }],
    setPieces: [
      {
        id: "about",
        kind: "lake",
        label: "ABOUT",
        gx: -420,
        gy: 55,
        approach: { gx: -420, gy: 72 },
      },
    ],
    stations: [
      {
        id: "todoclaw",
        kind: "desk",
        label: "TODOCLAW",
        gx: -250,
        gy: 48,
        approach: { gx: -250, gy: 62 },
        anim: "opening",
        animMs: 350,
      },
      {
        id: "contact",
        kind: "fire",
        label: "CONTACT",
        gx: 20,
        gy: 58,
        approach: { gx: 20, gy: 72 },
        animMs: 0,
      },
      {
        id: "chefclaw",
        kind: "pot",
        label: "CHEFCLAW",
        gx: 260,
        gy: 46,
        approach: { gx: 260, gy: 60 },
        anim: "popping",
        animMs: 400,
      },
    ],
    npcs: [{ kind: "chef", gx: 322, gy: 50 }],
  },
  {
    id: "meadow",
    name: "THE MEADOW",
    theme: "ABOUT & ATHLETICS",
    cls: "sc-meadow",
    img: "/world/meadow.jpg",
    bgPos: "center 82%",
    aria: "Stylized Yosemite meadow with giant sequoias, a running track with a Georgia Tech sign, a bear on a rock, a pond, and a walkable hiker character",
    gxClamp: 560,
    camClamp: 311,
    exits: { left: 0, right: 2 },
    decor: [
      { kind: "grass", gx: -520, gy: 30 },
      { kind: "grass", gx: -300, gy: 72 },
      { kind: "grass", gx: -150, gy: 25 },
      { kind: "grass", gx: -60, gy: 62 },
      { kind: "grass", gx: 80, gy: 42 },
      { kind: "grass", gx: 380, gy: 28 },
      { kind: "grass", gx: 480, gy: 62 },
      { kind: "rock", gx: -120, gy: 52 },
      { kind: "rock", gx: 160, gy: 18 },
      { kind: "pine", gx: -545, gy: 16 },
      { kind: "pine", gx: 300, gy: 14 },
      { kind: "pine", gx: 530, gy: 20 },
      { kind: "log", gx: -180, gy: 86 },
      { kind: "mossRock", gx: -480, gy: 72 },
      { kind: "mossRock", gx: 400, gy: 68, v: 1 },
      { kind: "flowers", gx: -340, gy: 26, v: 0 },
      { kind: "flowers", gx: -195, gy: 66, v: 1 },
      { kind: "flowers", gx: 60, gy: 28, v: 2 },
      { kind: "flowers", gx: 255, gy: 24, v: 0 },
      { kind: "flowers", gx: 445, gy: 80, v: 1 },
      { kind: "track", gx: 150, gy: 80, flat: true },
      { kind: "pond", gx: -70, gy: 86, flat: true },
      { kind: "bird", gx: 60, gy: 66, v: 0 },
      { kind: "bird", gx: 415, gy: 44, v: 1 },
      { kind: "butterfly", gx: -190, gy: 62, v: 0 },
      { kind: "butterfly", gx: 250, gy: 28, v: 1 },
    ],
    signs: [
      { text: "← THE CAMP", gx: -498, gy: 52 },
      { text: "THE SLOT →", gx: 498, gy: 52 },
    ],
    setPieces: [
      {
        id: "experience",
        kind: "grove",
        label: "EXPERIENCE",
        gx: -270,
        gy: 42,
        approach: { gx: -270, gy: 58 },
      },
      {
        id: "bear",
        kind: "bear",
        label: "THE BEAR",
        gx: -430,
        gy: 55,
        approach: { gx: -430, gy: 70 },
      },
      {
        id: "athletics",
        kind: "gtsign",
        label: "RECORDS",
        gx: 330,
        gy: 54,
        approach: { gx: 330, gy: 68 },
      },
    ],
    stations: [],
    npcs: [],
  },
  {
    id: "slot",
    name: "THE SLOT",
    theme: "SKILLS & PHOTOGRAPHY",
    cls: "sc-slot",
    img: "/world/slot.jpg",
    bgPos: "center 30%",
    aria: "Stylized slot canyon with a light beam, drifting dust, a climbing rope on the wall, a raven, and a walkable hiker character",
    gxClamp: 336,
    camClamp: 92,
    exits: { left: 1 },
    decor: [
      { kind: "slotRock", gx: -180, gy: 30 },
      { kind: "slotRock", gx: 120, gy: 76 },
      { kind: "slotRock", gx: -70, gy: 84 },
      { kind: "slotRock", gx: -140, gy: 62 },
      { kind: "sandline", gx: -210, gy: 74, flat: true },
      { kind: "sandline", gx: 110, gy: 84, v: 1, flat: true },
      { kind: "sandline", gx: -30, gy: 90, v: 2, flat: true },
      { kind: "sandline", gx: 235, gy: 70, v: 1, flat: true },
      { kind: "slab", gx: -115, gy: 72, flat: true },
      { kind: "raven", gx: -255, gy: 22 },
    ],
    signs: [{ text: "← THE MEADOW", gx: -282, gy: 52 }],
    setPieces: [
      {
        id: "photography",
        kind: "photo",
        label: "PHOTOGRAPHY",
        gx: 50,
        gy: 56,
        approach: { gx: 50, gy: 70 },
      },
      {
        id: "skills",
        kind: "climb",
        label: "SKILLS",
        gx: 235,
        gy: 42,
        approach: { gx: 235, gy: 60 },
      },
    ],
    stations: [],
    npcs: [],
  },
];

/* ---------- POI index, chips, auto route ---------- */

export interface PoiLocation {
  scene: number;
  gx: number;
  gy: number;
  approach: Vec;
  type: "setpiece" | "station";
  anim?: StationAnim;
  animMs?: number;
}

function buildPoiLocations(): Record<CardId, PoiLocation> {
  const out = {} as Record<CardId, PoiLocation>;
  scenes.forEach((sc, i) => {
    sc.setPieces.forEach((p) => {
      out[p.id] = { scene: i, gx: p.gx, gy: p.gy, approach: p.approach, type: "setpiece" };
    });
    sc.stations.forEach((s) => {
      out[s.id] = {
        scene: i,
        gx: s.gx,
        gy: s.gy,
        approach: s.approach,
        type: "station",
        anim: s.anim,
        animMs: s.animMs,
      };
    });
  });
  return out;
}

export const poiLocations: Record<CardId, PoiLocation> = buildPoiLocations();

export interface Chip {
  label: string;
  poi: CardId;
}

export const chips: Chip[] = [
  { label: "ABOUT", poi: "about" },
  { label: "PROJECTS", poi: "todoclaw" },
  { label: "EXPERIENCE", poi: "experience" },
  { label: "ATHLETICS", poi: "athletics" },
  { label: "SKILLS", poi: "skills" },
  { label: "PHOTOGRAPHY", poi: "photography" },
  { label: "CONTACT", poi: "contact" },
];

/**
 * Route stop order across all scenes — shared by the manual tour (▶) and the
 * ambient attract mode (which ping-pongs back through it forever).
 */
export const autoRoute: CardId[] = [
  "about",
  "todoclaw",
  "chefclaw",
  "contact",
  "experience",
  "bear",
  "athletics",
  "photography",
  "skills",
];
