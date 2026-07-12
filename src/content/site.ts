/**
 * Single source of truth for all site content: copy, links, scene layout,
 * points of interest, walkability (paths + blockers), and the auto-mode
 * route. Shared by the world (/) and the simple view (/plain).
 */

export type SceneId = "meadow" | "slot" | "snow" | "desert" | "camp";
export type CardId =
  | "about"
  | "experience"
  | "athletics"
  | "bear"
  | "grove"
  | "lake"
  | "climbing"
  | "skills"
  | "photography"
  | "todoclaw"
  | "chefclaw"
  | "contact";
export type SetPieceKind =
  | "lake"
  | "grove"
  | "photo"
  | "gtsign"
  | "bear"
  | "kiosk"
  | "trailsigns"
  | "gearcache"
  | "boulder";
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
  | "bird"
  | "butterfly"
  | "lanterns"
  | "backpack"
  | "canister"
  | "stump"
  | "owltree"
  | "sandline"
  | "slab"
  | "raven"
  | "earth"
  | "needles"
  | "stones"
  | "lightpool"
  | "daisies"
  | "clover"
  | "worn"
  | "pathstamp"
  | "snowpine"
  | "snowmound"
  | "burrock"
  | "footprints"
  | "river"
  | "plank"
  | "scrub"
  | "cracked"
  | "cairn"
  | "jackrabbit"
  | "tent"
  | "bench"
  | "poles"
  | "seedheads"
  | "waveledge"
  | "sandfall"
  | "puddle";
export type StationAnim = "opening" | "popping";

export interface Vec {
  gx: number;
  gy: number;
}

/**
 * Unwalkable region (round 4): water bodies and large solid set-pieces.
 * Half-extents are in world units (hw along gx, hh along gy). Billboard
 * set-pieces use a thin band at their ground line so the hiker can still
 * pass in front of / behind them.
 */
export interface Blocker {
  shape: "rect" | "ellipse";
  gx: number;
  gy: number;
  hw: number;
  hh: number;
}

/** Furnished waypoint — proximity or click opens its card. */
export interface SetPiece {
  id: CardId;
  kind: SetPieceKind;
  label: string;
  gx: number;
  gy: number;
  approach: Vec;
  /** Discovery-only piece: no floating label (the bear, the mirror lake…). */
  discovery?: boolean;
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

export interface Scene {
  id: SceneId;
  name: string;
  /** Content theme shown in the scene indicator, e.g. "PROJECTS & CONTACT". */
  theme: string;
  cls: string;
  img: string;
  bgPos: string;
  aria: string;
  gxClamp: number;
  camClamp: number;
  exits: { left?: number; right?: number };
  alwaysNight?: boolean;
  /**
   * The scene's drawn walking path (round 4): waypoint polyline the trodden
   * trail is stamped along, and the line auto/attract travel follows between
   * points of interest.
   */
  path: Vec[];
  /** Unwalkable regions — see Blocker. */
  blockers: Blocker[];
  decor: Decor[];
  signs: Signpost[];
  setPieces: SetPiece[];
  stations: Station[];
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
  /**
   * Simple-view ("Topo") presentation — optional so the world (which only
   * needs name/description/stack/status/url) is unaffected.
   */
  peakLabel?: string;
  badge?: { text: string; kind: "live" | "gated" | "dev" };
  pitch?: string;
  stackChips?: string[];
  standout?: string;
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
    peakLabel: "PEAK 01 · FIRST ASCENT 2026",
    badge: { text: "Live · invite-only", kind: "gated" },
    pitch:
      "An Eisenhower-matrix task planner on a free-drag 2D grid — urgency × importance — with an optional AI assistant that plans your day and nudges you at the right hour.",
    stackChips: [
      "React",
      "TypeScript",
      "Supabase",
      "TanStack Query",
      "Anthropic API",
      "Web Push",
      "Playwright",
    ],
    standout:
      "Realtime multi-client conflict resolution, seed-based spatial clustering, server-side AI budget guardrails, and an MCP tool layer.",
  },
  {
    id: "chefclaw",
    name: "ChefClaw",
    description:
      "Turns cooking videos into structured bilingual recipes with a multimodal model.",
    stack: "Python · FastAPI · PostgreSQL · React 19 · Gemini",
    status: "In development — opens here when it ships.",
    peakLabel: "PEAK 02 · EXPEDITION IN PROGRESS",
    badge: { text: "In development", kind: "dev" },
    pitch:
      "Paste a cooking video; a multimodal pipeline extracts a structured, bilingual recipe — ingredients verbatim, steps, and visual cues — into a browsable library.",
    stackChips: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React 19",
      "Gemini",
      "yt-dlp",
      "OpenAPI",
    ],
    standout:
      "A never-fabricate-food-data invariant, a broker-less async job queue (FOR UPDATE SKIP LOCKED), and fail-closed LLM cost controls.",
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

/** Skills card — plain, grouped. Shown at the desert gear cache. */
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

/** Flavor cards for discovery-only set-pieces (round 4). */
export const groveNote =
  "Giant sequoias in Sequoia National Park — some of the largest living trees on Earth.";
export const lakeNote =
  "A mirror-still mountain lake at dusk. The camp's vignette is drawn from this photograph.";
export const climbingNote =
  "Climbing days between trail days. The crow on top is from Taft Point, Yosemite.";

export const photographyNote =
  "Every image here is one of my photographs, restyled by the same pipeline that draws this site.";
export const morePlacesNote =
  "More scenes are added as I photograph new places.";
export const photoCaption = "Built from my photograph.";
export const finePrint =
  "The world is drawn from my photographs — simple view available anytime.";

/** Images shown at the top of in-world content cards. */
export const cardMedia: Partial<
  Record<CardId, { src: string; alt: string; caption?: string }>
> = {
  about: {
    src: "/gallery/about/taft-point-sunset.jpg",
    alt: "Standing at Taft Point above Yosemite Valley at sunset",
  },
  experience: {
    src: "/world/snow.jpg",
    alt: "Snow-covered Banff trail photograph, stylized",
    caption: photoCaption,
  },
  grove: {
    src: "/world/grove.jpg",
    alt: "Sequoia grove photograph, stylized",
    caption: photoCaption,
  },
  lake: {
    src: "/world/lake.jpg",
    alt: "Mirror-still mountain lake photograph, stylized",
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
  climbing: {
    src: "/gallery/photography/taft-point-crow.jpg",
    alt: "A crow perched at Taft Point above Yosemite Valley",
  },
};

/**
 * Per-section photo galleries. A card that declares a gallery shows a PHOTOS
 * row of thumbnails; clicking one opens the fullscreen lightbox. The simple
 * view shows each section's first three as a static strip.
 *
 * Convention: drop JPEGs into `public/gallery/<section>/` and list them here
 * (see public/gallery/README.md).
 */
const g = (dir: string, names: string[]) => names.map((n) => `/gallery/${dir}/${n}.jpg`);

export const galleries: Partial<Record<CardId, string[]>> = {
  about: g("about", [
    "taft-point-sunset",
    "backpacking-meadow",
    "pass-ascent",
    "blue-ridge-overlook",
    "two-medicine-bench",
    "valley-of-fire-standing",
  ]),
  // The camp set is shared by Contact and the camp's mirror-lake vignette.
  contact: g("camp", ["campfire-night", "mirror-lake-dusk", "tent-alpenglow"]),
  lake: g("camp", ["mirror-lake-dusk", "campfire-night", "tent-alpenglow"]),
  experience: g("snow", [
    "sulphur-mountain-trail",
    "frozen-river",
    "matsumoto-castle",
    "matsumoto-pines",
    "togakushi-gate",
    "snowy-cemetery",
  ]),
  skills: g("desert", [
    "mobius-arch",
    "monument-valley-mittens",
    "monument-valley-spire",
    "horseshoe-bend",
    "grand-canyon",
    "grand-canyon-river",
    "dawn-crest",
    "lava-field",
    "red-rock-approach",
    "valley-of-fire-canyon",
    "valley-of-fire-wash",
  ]),
  photography: g("photography", [
    "tunnel-view",
    "el-capitan",
    "yosemite-falls",
    "taft-point-crow",
    "sierra-meadow",
    "kearsarge-basin",
    "sequoia-grove",
    "moss-forest",
    "glacier-valley",
    "glacier-bear",
    "river-sunrise",
    "the-narrows",
    "antelope-canyon",
    "starry-night",
    "monet-agapanthus",
    "asmat-mask",
    "malachite-carving",
    "statice-flowers",
    "old-cafe",
    "stone-steps",
  ]),
};

/* ---------- per-scene walking paths (round 4) ----------
   Each scene draws its trodden trail along these waypoints, and auto/attract
   travel walks node-to-node along them instead of cutting straight lines. */

/** Round 4B: the trail skirts BELOW the relocated track oval (right side). */
const MEADOW_PATH: Vec[] = [
  { gx: -560, gy: 74 },
  { gx: -440, gy: 68 },
  { gx: -330, gy: 60 },
  { gx: -200, gy: 50 },
  { gx: -90, gy: 64 },
  { gx: 30, gy: 76 },
  { gx: 180, gy: 88 },
  { gx: 360, gy: 94 },
  { gx: 505, gy: 92 },
  { gx: 560, gy: 86 },
];

const SLOT_PATH: Vec[] = [
  { gx: -336, gy: 70 },
  { gx: -160, gy: 76 },
  { gx: 0, gy: 70 },
  { gx: 170, gy: 78 },
  { gx: 336, gy: 70 },
];

/** Switchbacks down the snowfield, then across the plank to the desert side. */
const SNOW_PATH: Vec[] = [
  { gx: -540, gy: 78 },
  { gx: -360, gy: 88 },
  { gx: -200, gy: 40 },
  { gx: -40, gy: 86 },
  { gx: 140, gy: 44 },
  { gx: 250, gy: 56 },
  { gx: 340, gy: 56 },
  { gx: 470, gy: 64 },
  { gx: 540, gy: 66 },
];

const DESERT_PATH: Vec[] = [
  { gx: -560, gy: 70 },
  { gx: -400, gy: 68 },
  { gx: -260, gy: 64 },
  { gx: -80, gy: 66 },
  { gx: 120, gy: 68 },
  { gx: 300, gy: 64 },
  { gx: 560, gy: 66 },
];

/**
 * Round 4B: the camp widened (gxClamp 700) so the billboard-scale project
 * stations fit — lake far west, planner board west-center, campfire + tent
 * mid-east, camp kitchen far east.
 */
const CAMP_PATH: Vec[] = [
  { gx: -660, gy: 80 },
  { gx: -560, gy: 84 },
  { gx: -420, gy: 80 },
  { gx: -260, gy: 74 },
  { gx: -150, gy: 66 },
  { gx: -20, gy: 70 },
  { gx: 130, gy: 74 },
  { gx: 250, gy: 72 },
  { gx: 355, gy: 68 },
  { gx: 500, gy: 66 },
  { gx: 640, gy: 62 },
  { gx: 695, gy: 60 },
];

/**
 * The drawn path: interpolates flat trodden stamps along a scene's waypoint
 * polyline so the visible trail and the walked route can never drift apart.
 * `v` picks the per-scene ground tone (see PathStampArt in scenes.tsx).
 */
function pathStamps(path: Vec[], v: number): Decor[] {
  const out: Decor[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const d = Math.hypot(b.gx - a.gx, (b.gy - a.gy) * 2.5);
    const n = Math.max(1, Math.round(d / 44));
    for (let j = 0; j < n; j++) {
      const t = j / n;
      out.push({
        kind: "pathstamp",
        gx: Math.round(a.gx + (b.gx - a.gx) * t),
        gy: Math.round((a.gy + (b.gy - a.gy) * t) * 10) / 10,
        v,
        flat: true,
      });
    }
  }
  const last = path[path.length - 1];
  out.push({ kind: "pathstamp", gx: last.gx, gy: last.gy, v, flat: true });
  return out;
}

/* ---------- scenes (order: meadow → slot → snow → desert → camp) ---------- */

export const scenes: Scene[] = [
  {
    id: "meadow",
    name: "THE MEADOW",
    theme: "ABOUT & ATHLETICS",
    cls: "sc-meadow",
    img: "/world/meadow.jpg",
    // Valley + cliffs centered, treeline meeting the ground seam.
    bgPos: "center 67%",
    aria: "Stylized Yosemite meadow with a trailhead information kiosk, a giant sequoia grove, a granite climbing boulder with a rope and a perched crow, a six-lane running track with a Georgia Tech sign, a bear resting by the far treeline, a thin waterfall on the cliffs, roaming yellow jackets, and a walkable hiker character",
    gxClamp: 560,
    camClamp: 311,
    exits: { right: 1 },
    path: MEADOW_PATH,
    // Round 4B layout: climbing boulder against the west wall, kiosk beside
    // it, grove behind, the bear tucked into the far back-left treeline, and
    // the six-lane track owning the right side (a side attraction — its
    // infield stays walkable, so the oval needs no blocker).
    blockers: [
      { shape: "ellipse", gx: -545, gy: 68, hw: 85, hh: 5 }, // climbing boulder
      { shape: "ellipse", gx: -500, gy: 14, hw: 30, hh: 3 }, // bear boulder
      { shape: "ellipse", gx: -400, gy: 52, hw: 28, hh: 4 }, // kiosk posts
      { shape: "ellipse", gx: -180, gy: 34, hw: 150, hh: 5 }, // sequoia trunks
      { shape: "ellipse", gx: -100, gy: 70, hw: 16, hh: 3 }, // GT sign post
    ],
    decor: [
      ...pathStamps(MEADOW_PATH, 0),
      { kind: "track", gx: 300, gy: 84, flat: true },
      // back treeline
      { kind: "pine", gx: -545, gy: 16 },
      { kind: "pine", gx: -420, gy: 10 },
      { kind: "pine", gx: 60, gy: 10 },
      { kind: "pine", gx: 300, gy: 14 },
      { kind: "pine", gx: 530, gy: 20 },
      // grass tufts — dense ground cover (client asked three times)
      { kind: "grass", gx: -520, gy: 34 },
      { kind: "grass", gx: -440, gy: 84 },
      { kind: "grass", gx: -300, gy: 80 },
      { kind: "grass", gx: -260, gy: 20 },
      { kind: "grass", gx: 10, gy: 58 },
      { kind: "grass", gx: -130, gy: 90 },
      { kind: "grass", gx: 120, gy: 78 },
      { kind: "grass", gx: 450, gy: 20 },
      { kind: "grass", gx: 555, gy: 90 },
      { kind: "grass", gx: -350, gy: 46 },
      { kind: "grass", gx: 250, gy: 96 },
      { kind: "grass", gx: 60, gy: 92 },
      // rocks + logs
      { kind: "rock", gx: -160, gy: 48 },
      { kind: "rock", gx: 160, gy: 18 },
      { kind: "log", gx: -180, gy: 86 },
      { kind: "mossRock", gx: -520, gy: 40 },
      { kind: "mossRock", gx: -30, gy: 90, v: 1 },
      // wildflowers — lupine/poppy/paintbrush + purple statice (v3)
      { kind: "flowers", gx: -410, gy: 96, v: 0 },
      { kind: "flowers", gx: -130, gy: 46, v: 1 },
      { kind: "flowers", gx: 55, gy: 88, v: 2 },
      { kind: "flowers", gx: 195, gy: 14, v: 0 },
      { kind: "flowers", gx: -350, gy: 88, v: 3 },
      { kind: "flowers", gx: -60, gy: 94, v: 3 },
      { kind: "flowers", gx: 150, gy: 20, v: 3 },
      { kind: "flowers", gx: 520, gy: 94, v: 3 },
      // ground cover: daisies, clover, seed heads, desire-line wear
      { kind: "daisies", gx: 20, gy: 66, flat: true },
      { kind: "daisies", gx: -250, gy: 88, flat: true },
      { kind: "daisies", gx: -420, gy: 78, flat: true },
      { kind: "daisies", gx: 480, gy: 90, flat: true },
      { kind: "daisies", gx: 120, gy: 94, flat: true },
      { kind: "clover", gx: -320, gy: 92, flat: true },
      { kind: "clover", gx: -360, gy: 70, flat: true },
      { kind: "clover", gx: 220, gy: 90, flat: true },
      { kind: "seedheads", gx: -490, gy: 58 },
      { kind: "seedheads", gx: -240, gy: 72 },
      { kind: "seedheads", gx: 90, gy: 64 },
      { kind: "seedheads", gx: 400, gy: 92 },
      { kind: "seedheads", gx: -30, gy: 80 },
      { kind: "seedheads", gx: 540, gy: 52 },
      { kind: "worn", gx: 0, gy: 62, flat: true },
      { kind: "worn", gx: -150, gy: 56, v: 1, flat: true },
      { kind: "worn", gx: -380, gy: 86, v: 2, flat: true },
      { kind: "worn", gx: -60, gy: 88, v: 2, flat: true },
      { kind: "stones", gx: -300, gy: 74 },
      { kind: "stones", gx: 140, gy: 88 },
      { kind: "needles", gx: -200, gy: 56, flat: true },
      // critters (the yellow jackets roam the whole meadow — see World.tsx)
      { kind: "bird", gx: -70, gy: 86, v: 0 },
      { kind: "bird", gx: 200, gy: 96, v: 1 },
      { kind: "butterfly", gx: -190, gy: 62, v: 0 },
      { kind: "butterfly", gx: -260, gy: 86, v: 1 },
      { kind: "butterfly", gx: 100, gy: 70, v: 0 },
    ],
    signs: [{ text: "THE SLOT →", gx: 505, gy: 96 }],
    setPieces: [
      // Round 4: the site starts here — the About anchor is a trailhead
      // information kiosk on the meadow's west side.
      {
        id: "about",
        kind: "kiosk",
        label: "ABOUT",
        gx: -400,
        gy: 52,
        approach: { gx: -400, gy: 66 },
      },
      // The climbing boulder against the meadow's west wall (round 4B):
      // granite cluster, rope over the lip, crash pad, the Taft Point crow.
      {
        id: "climbing",
        kind: "boulder",
        label: "CLIMBING",
        gx: -545,
        gy: 68,
        approach: { gx: -545, gy: 82 },
        discovery: true,
      },
      // The grove stays as scenery (Experience moved to the snow).
      {
        id: "grove",
        kind: "grove",
        label: "SEQUOIA GROVE",
        gx: -180,
        gy: 34,
        approach: { gx: -180, gy: 48 },
        discovery: true,
      },
      // The bear moved to the far back-left treeline (round 4B client note:
      // off to the side, not on the path, still discoverable).
      {
        id: "bear",
        kind: "bear",
        label: "THE BEAR",
        gx: -500,
        gy: 14,
        approach: { gx: -455, gy: 22 },
        discovery: true,
      },
      {
        id: "athletics",
        kind: "gtsign",
        label: "RECORDS",
        gx: -100,
        gy: 70,
        approach: { gx: -100, gy: 84 },
      },
    ],
    stations: [],
  },
  {
    id: "slot",
    name: "THE SLOT",
    theme: "PHOTOGRAPHY",
    cls: "sc-slot",
    img: "/world/slot.jpg",
    bgPos: "center 30%",
    aria: "Stylized slot canyon with sculpted wave ledges on both walls, a light beam with drifting dust, a trickle of falling sand, a shallow reflective puddle, smooth stones, a photographer's tripod setup with an open camera bag and a laid-out print, a raven, and a walkable hiker character",
    gxClamp: 336,
    camClamp: 92,
    exits: { left: 0, right: 2 },
    path: SLOT_PATH,
    // Round 4B redress: sculpted wave-ledges hug both walls (their bases
    // blocked), the photographer's setup gets a small base blocker, and
    // everything on the floor is identifiable at a glance — smooth stones,
    // wind-rippled sand, a beam-lit puddle. (The old climbing wall dressing
    // moved to the meadow's boulder.)
    blockers: [
      { shape: "ellipse", gx: -290, gy: 32, hw: 60, hh: 5 }, // west wave-ledge
      { shape: "ellipse", gx: 295, gy: 34, hw: 60, hh: 5 }, // east wave-ledge
      { shape: "ellipse", gx: 50, gy: 56, hw: 30, hh: 4 }, // photographer's setup
    ],
    decor: [
      ...pathStamps(SLOT_PATH, 1),
      // sculpted wave-ledges (stepped curved shelves echoing the walls)
      { kind: "waveledge", gx: -290, gy: 32 },
      { kind: "waveledge", gx: 295, gy: 34, v: 1 },
      // sand trickling off the east ledge, piling below
      { kind: "sandfall", gx: 252, gy: 50 },
      // the beam-lit puddle
      { kind: "puddle", gx: -40, gy: 62, flat: true },
      // floor dressing: rocks, smooth sand-polished stones, rippled sand
      { kind: "slotRock", gx: 120, gy: 76 },
      { kind: "slotRock", gx: -70, gy: 84 },
      { kind: "slotRock", gx: -140, gy: 58 },
      { kind: "stones", gx: -120, gy: 86, v: 1 },
      { kind: "stones", gx: 180, gy: 82, v: 1 },
      { kind: "stones", gx: -230, gy: 66, v: 1 },
      { kind: "sandline", gx: -210, gy: 74, flat: true },
      { kind: "sandline", gx: 110, gy: 84, v: 1, flat: true },
      { kind: "sandline", gx: -30, gy: 90, v: 2, flat: true },
      { kind: "sandline", gx: 235, gy: 70, v: 1, flat: true },
      { kind: "slab", gx: -115, gy: 72, flat: true },
      // the raven sits just in front of the west fin, reading as perched on
      // its lowest shelf (fin anchors at gy 32; the raven draws over it)
      { kind: "raven", gx: -262, gy: 37 },
    ],
    signs: [
      { text: "← THE MEADOW", gx: -282, gy: 52 },
      { text: "THE SNOW →", gx: 285, gy: 62 },
    ],
    setPieces: [
      {
        id: "photography",
        kind: "photo",
        label: "PHOTOGRAPHY",
        gx: 50,
        gy: 56,
        approach: { gx: 50, gy: 70 },
      },
    ],
    stations: [],
  },
  {
    id: "snow",
    name: "THE SNOW",
    theme: "EXPERIENCE",
    cls: "sc-snow",
    img: "/world/snow.jpg",
    // Banff ranges + snow-dusted firs across the mid-band, footprinted trail
    // meeting the drawn snowpack at the seam (38%: sunlit peaks stay in view).
    bgPos: "center 38%",
    aria: "Stylized Banff snow trail with switchbacks, snow-dusted firs, a frozen teal river crossed by a plank, carved trail signs listing career stops, and a walkable hiker character",
    gxClamp: 540,
    camClamp: 291,
    exits: { left: 1, right: 3 },
    path: SNOW_PATH,
    blockers: [
      // The frozen river: unwalkable except the plank lane (gy 46..64).
      { shape: "rect", gx: 340, gy: 22, hw: 55, hh: 24 },
      { shape: "rect", gx: 340, gy: 82, hw: 55, hh: 18 },
      { shape: "ellipse", gx: -200, gy: 30, hw: 20, hh: 3 }, // trail-sign post
    ],
    decor: [
      ...pathStamps(SNOW_PATH, 2),
      // The frozen teal river, running from the ranges toward the viewer —
      // segments overlap along gy so it reads as one continuous band.
      { kind: "river", gx: 340, gy: 10, flat: true },
      { kind: "river", gx: 340, gy: 18, v: 1, flat: true },
      { kind: "river", gx: 340, gy: 26, flat: true },
      { kind: "river", gx: 340, gy: 34, v: 1, flat: true },
      { kind: "river", gx: 340, gy: 42, flat: true },
      { kind: "river", gx: 340, gy: 50, v: 1, flat: true },
      { kind: "river", gx: 340, gy: 58, flat: true },
      { kind: "river", gx: 340, gy: 67, v: 1, flat: true },
      { kind: "river", gx: 340, gy: 76, flat: true },
      { kind: "river", gx: 340, gy: 84, v: 1, flat: true },
      { kind: "river", gx: 340, gy: 92, flat: true },
      { kind: "plank", gx: 340, gy: 59, flat: true },
      { kind: "snowpine", gx: -500, gy: 20 },
      { kind: "snowpine", gx: -440, gy: 12 },
      { kind: "snowpine", gx: -350, gy: 18 },
      { kind: "snowpine", gx: 60, gy: 14 },
      { kind: "snowpine", gx: 130, gy: 20 },
      { kind: "snowpine", gx: 475, gy: 16 },
      { kind: "snowpine", gx: 535, gy: 24 },
      { kind: "snowmound", gx: -300, gy: 62 },
      { kind: "snowmound", gx: -80, gy: 66, v: 1 },
      { kind: "snowmound", gx: 200, gy: 82 },
      { kind: "snowmound", gx: -440, gy: 92, v: 1 },
      { kind: "snowmound", gx: 480, gy: 84 },
      { kind: "burrock", gx: -350, gy: 36 },
      { kind: "burrock", gx: 90, gy: 74, v: 1 },
      { kind: "burrock", gx: 250, gy: 22 },
      { kind: "footprints", gx: -260, gy: 72, flat: true },
      { kind: "footprints", gx: 30, gy: 58, v: 1, flat: true },
      { kind: "footprints", gx: 430, gy: 38, flat: true },
      { kind: "footprints", gx: -120, gy: 90, v: 1, flat: true },
      { kind: "stones", gx: -40, gy: 24 },
      { kind: "stones", gx: 240, gy: 90 },
    ],
    signs: [
      { text: "← THE SLOT", gx: -505, gy: 88 },
      { text: "THE DESERT →", gx: 505, gy: 86 },
    ],
    setPieces: [
      {
        id: "experience",
        kind: "trailsigns",
        label: "EXPERIENCE",
        gx: -200,
        gy: 30,
        approach: { gx: -200, gy: 44 },
      },
    ],
    stations: [],
  },
  {
    id: "desert",
    name: "THE DESERT",
    theme: "SKILLS",
    cls: "sc-desert",
    img: "/world/desert.jpg",
    // The Mittens + Merrick Butte on the horizon just above the seam.
    bgPos: "center 58%",
    aria: "Stylized Monument Valley desert with buttes on the horizon, a granite arch over a straight dusty path, cairns, scrub, a climbing gear cache on a boulder, and a walkable hiker character",
    gxClamp: 560,
    camClamp: 311,
    exits: { left: 2, right: 4 },
    path: DESERT_PATH,
    blockers: [
      { shape: "ellipse", gx: -340, gy: 58, hw: 26, hh: 5 }, // arch west pillar
      { shape: "ellipse", gx: -176, gy: 58, hw: 18, hh: 5 }, // arch east pillar
      { shape: "ellipse", gx: 120, gy: 46, hw: 42, hh: 4 }, // gear-cache boulder
    ],
    decor: [
      ...pathStamps(DESERT_PATH, 3),
      { kind: "scrub", gx: -480, gy: 30 },
      { kind: "scrub", gx: -380, gy: 84, v: 1 },
      { kind: "scrub", gx: -60, gy: 28 },
      { kind: "scrub", gx: 60, gy: 86, v: 1 },
      { kind: "scrub", gx: 320, gy: 26 },
      { kind: "scrub", gx: 480, gy: 78, v: 1 },
      { kind: "scrub", gx: -160, gy: 90 },
      { kind: "cracked", gx: -320, gy: 88, flat: true },
      { kind: "cracked", gx: 180, gy: 28, v: 1, flat: true },
      { kind: "cracked", gx: 440, gy: 86, flat: true },
      { kind: "cracked", gx: -40, gy: 52, v: 1, flat: true },
      { kind: "cairn", gx: -410, gy: 74 },
      { kind: "cairn", gx: -30, gy: 74, v: 1 },
      { kind: "cairn", gx: 390, gy: 60 },
      { kind: "rock", gx: -140, gy: 20 },
      { kind: "rock", gx: 250, gy: 84 },
      { kind: "stones", gx: 200, gy: 34 },
      { kind: "stones", gx: -520, gy: 66 },
      { kind: "jackrabbit", gx: 30, gy: 80 },
    ],
    signs: [
      { text: "← THE SNOW", gx: -505, gy: 88 },
      { text: "THE CAMP →", gx: 505, gy: 88 },
    ],
    setPieces: [
      {
        id: "skills",
        kind: "gearcache",
        label: "SKILLS",
        gx: 120,
        gy: 46,
        approach: { gx: 120, gy: 62 },
      },
    ],
    stations: [],
  },
  {
    id: "camp",
    name: "THE CAMP",
    theme: "PROJECTS & CONTACT",
    cls: "sc-camp",
    img: "/world/camp.jpg",
    // Wide-band asset (2400×1044): clouds top, mountain crest mid, glowing
    // tent bottom-right — sits just above the drawn-ground seam.
    bgPos: "center 62%",
    aria: "Stylized night campsite with a detailed campfire, a glowing blue dome tent, billboard-scale project stations, lantern lights, and a drawn mountain mirrored in a still lake with a fishing dock and a bench, with a walkable hiker character",
    gxClamp: 700,
    camClamp: 391,
    exits: { left: 3 },
    alwaysNight: true,
    path: CAMP_PATH,
    blockers: [
      { shape: "ellipse", gx: -600, gy: 57, hw: 150, hh: 8 }, // the lake
      { shape: "ellipse", gx: -670, gy: 86, hw: 14, hh: 3 }, // owl tree trunk
      { shape: "ellipse", gx: -150, gy: 50, hw: 230, hh: 5 }, // planner board base
      { shape: "ellipse", gx: 250, gy: 58, hw: 42, hh: 4 }, // campfire ring
      { shape: "ellipse", gx: 355, gy: 52, hw: 62, hh: 5 }, // dome tent
      { shape: "ellipse", gx: 705, gy: 47, hw: 235, hh: 5 }, // camp kitchen base
    ],
    // Layout audited round 4B for the 3× stations: lake far west (bench on
    // its near shore), planner board west-center, campfire with the blue
    // dome tent to its right (the real campfire photo's composition), camp
    // kitchen far east. Screen-projected footprints checked pairwise.
    decor: [
      ...pathStamps(CAMP_PATH, 4),
      { kind: "campRock", gx: 75, gy: 20 },
      { kind: "campRock", gx: -40, gy: 88 },
      { kind: "log", gx: 455, gy: 78 },
      { kind: "log", gx: 110, gy: 74 },
      { kind: "lanterns", gx: 60, gy: 18 },
      { kind: "backpack", gx: -270, gy: 70 },
      { kind: "canister", gx: 62, gy: 78 },
      { kind: "stump", gx: 165, gy: 64 },
      { kind: "stump", gx: 330, gy: 66, v: 1 },
      { kind: "owltree", gx: -670, gy: 86 },
      { kind: "bench", gx: -480, gy: 84 },
      { kind: "tent", gx: 355, gy: 53 },
      { kind: "poles", gx: 440, gy: 57 },
      // Night dressing: trodden earth, pine duff, stones, pooled lamplight.
      { kind: "earth", gx: 250, gy: 72, flat: true },
      { kind: "earth", gx: -150, gy: 62, v: 1, flat: true },
      { kind: "earth", gx: 700, gy: 58, flat: true },
      { kind: "needles", gx: -350, gy: 74, flat: true },
      { kind: "needles", gx: 170, gy: 82, flat: true },
      { kind: "stones", gx: 140, gy: 68 },
      { kind: "stones", gx: -180, gy: 76 },
      { kind: "stones", gx: 500, gy: 80 },
      { kind: "lightpool", gx: 60, gy: 22, flat: true },
      { kind: "lightpool", gx: -140, gy: 54, flat: true },
      { kind: "lightpool", gx: 700, gy: 52, v: 1, flat: true },
    ],
    signs: [{ text: "← THE DESERT", gx: -640, gy: 92 }],
    setPieces: [
      // The camp's mountain-lake vignette (round 4: About moved to the
      // meadow kiosk; the lake keeps a discovery-only flavor card).
      {
        id: "lake",
        kind: "lake",
        label: "MOUNTAIN LAKE",
        gx: -600,
        gy: 60,
        approach: { gx: -600, gy: 78 },
        discovery: true,
      },
    ],
    stations: [
      {
        id: "todoclaw",
        kind: "desk",
        label: "TODOCLAW",
        gx: -150,
        gy: 50,
        approach: { gx: -150, gy: 64 },
        anim: "opening",
        animMs: 350,
      },
      {
        id: "contact",
        kind: "fire",
        label: "CONTACT",
        gx: 250,
        gy: 58,
        approach: { gx: 250, gy: 72 },
        animMs: 0,
      },
      {
        id: "chefclaw",
        kind: "pot",
        label: "CHEFCLAW",
        gx: 705,
        gy: 47,
        approach: { gx: 695, gy: 60 },
        anim: "popping",
        animMs: 400,
      },
    ],
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

/**
 * Dev-only alignment guard (round-3 audit): every POI interaction point must
 * keep a minimum engine-weighted distance from its neighbors so two labels /
 * markers / proximity zones can never collide. Warns at module load in dev.
 */
const MIN_POI_GAP = 110; // world units, gy weighted ×2.5 like the engine
if (process.env.NODE_ENV !== "production") {
  scenes.forEach((sc) => {
    const pts = [...sc.setPieces, ...sc.stations];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].gx - pts[j].gx, (pts[i].gy - pts[j].gy) * 2.5);
        if (d < MIN_POI_GAP)
          console.warn(
            `[world] POIs too close in "${sc.id}": ${pts[i].id} ↔ ${pts[j].id} (${Math.round(d)} < ${MIN_POI_GAP})`,
          );
      }
    }
  });

  /* Round-4 walkability guard: every path waypoint and every POI approach
     point must be outside the scene's blockers, or programmatic travel
     could wedge against them. */
  const blockedIn = (sc: Scene, gx: number, gy: number) =>
    sc.blockers.some((b) => {
      const dx = Math.abs(gx - b.gx);
      const dy = Math.abs(gy - b.gy);
      return b.shape === "rect"
        ? dx <= b.hw && dy <= b.hh
        : (dx / b.hw) ** 2 + (dy / b.hh) ** 2 <= 1;
    });
  scenes.forEach((sc) => {
    sc.path.forEach((p, i) => {
      if (blockedIn(sc, p.gx, p.gy))
        console.warn(`[world] path node ${i} in "${sc.id}" is inside a blocker (${p.gx},${p.gy})`);
    });
    [...sc.setPieces, ...sc.stations].forEach((p) => {
      if (blockedIn(sc, p.approach.gx, p.approach.gy))
        console.warn(`[world] approach for "${p.id}" in "${sc.id}" is inside a blocker`);
    });
  });

  /* Round-4 label guard: labels are now always visible, so approximate each
     label's screen box at 1280×800 (camera centered and at both clamps) and
     warn when two boxes could collide. Heuristic — anchor y stands in for
     label y since art heights vary — but it catches the side-by-side class
     of collision that matters. */
  const GUARD_W = 1280;
  const GUARD_H = 800;
  scenes.forEach((sc) => {
    const labeled = [
      ...sc.setPieces.filter((p) => !p.discovery).map((p) => ({ id: p.id as string, gx: p.gx, gy: p.gy, text: p.label })),
      ...sc.stations.map((s) => ({ id: s.id as string, gx: s.gx, gy: s.gy, text: s.label })),
      ...sc.signs.map((s) => ({ id: `sign:${s.text}`, gx: s.gx, gy: s.gy, text: s.text })),
    ];
    [-sc.camClamp, 0, sc.camClamp].forEach((camX) => {
      const boxes = labeled.map((l) => {
        const t = l.gy / 100;
        const x = GUARD_W / 2 + (l.gx - camX) * (0.55 + 0.45 * t);
        const w = Math.max(30, l.text.length * 7.5) + 14;
        return { id: l.id, x0: x - w / 2, x1: x + w / 2, y: (0.615 + 0.315 * t) * GUARD_H };
      });
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i];
          const b = boxes[j];
          if (a.x0 < b.x1 && b.x0 < a.x1 && Math.abs(a.y - b.y) < 56)
            console.warn(
              `[world] labels may collide in "${sc.id}" (cam ${camX}): ${a.id} ↔ ${b.id}`,
            );
        }
      }
    });
  });
}

export interface Chip {
  label: string;
  poi: CardId;
}

export const chips: Chip[] = [
  { label: "ABOUT", poi: "about" },
  { label: "ATHLETICS", poi: "athletics" },
  { label: "PHOTOGRAPHY", poi: "photography" },
  { label: "EXPERIENCE", poi: "experience" },
  { label: "SKILLS", poi: "skills" },
  { label: "PROJECTS", poi: "todoclaw" },
  { label: "CONTACT", poi: "contact" },
];

/**
 * Route stop order across all scenes — shared by the manual tour (▶) and the
 * ambient attract mode (which ping-pongs back through it forever). Follows
 * the world west→east: meadow → slot → snow → desert → camp (the finale).
 */
export const autoRoute: CardId[] = [
  "about",
  "bear",
  "athletics",
  "photography",
  "experience",
  "skills",
  "todoclaw",
  "chefclaw",
  "contact",
];

/* ---------- simple view ("Topo" / Trail Map) content ---------- */

export const heroEyebrow = "Full-stack software engineer";
export const heroSub =
  "I build production systems at scale — thousands of users, millions of API requests a day — and spend the weekends somewhere above the treeline. Former NCAA distance runner; recovering 4:03 miler.";
export const heroCoords =
  "33.7490° N  84.3880° W · ATLANTA, GA · UTC−5 · EST. 2021 IN PRODUCTION";

/** Route log — the career as a climb with switchbacks (all facts real). */
export interface RouteStop {
  marker: string;
  title: string;
  detail: string;
}
export const routeLog: RouteStop[] = [
  {
    marker: "2017 · TRAILHEAD",
    title: "Georgia Tech, CS",
    detail:
      "Specialized in high-performance computing & simulation. Ran NCAA track & cross country.",
  },
  {
    marker: "2021 · SWITCHBACKS",
    title: "OnSolve — Full-stack",
    detail:
      "React microfrontends for 1,000+ users; C#/.NET APIs serving millions of requests a day.",
  },
  {
    marker: "2023 · RIDGELINE",
    title: "Data & ML pipelines",
    detail:
      "RabbitMQ ingestion over millions of global events; built the human-in-the-loop moderation platform.",
  },
  {
    marker: "NOW · SUMMIT PUSH",
    title: "Todoclaw & ChefClaw",
    detail:
      "Two full products, solo: AI-assisted planning and multimodal recipe extraction.",
  },
];

/** Expeditions section subheading. */
export const expeditionsIntro =
  "Two self-built products, treated like first ascents — a briefing, the stack, the standout engineering, then a stamped permit opens the live app in a new tab.";

/** Basecamp — earlier projects, shown as smaller cards under the expeditions. */
export interface BasecampProject {
  title: string;
  detail: string;
}
export const basecamp: BasecampProject[] = [
  {
    title: "NCAA Track & Field Rankings",
    detail:
      "Live-updated ranking platform. React · Java Spring · Docker · K8s on GKE · MongoDB · Flask scraper.",
  },
  {
    title: "Wildfire Simulation",
    detail:
      "Cellular-automata fire model; Monte Carlo trials of controlled-burn strategies.",
  },
  {
    title: "N-Body on CUDA",
    detail:
      "Grid-stride GPU kernels vs. threaded CPU for O(n²) simulation; speedup & efficiency curves. Julia · CUDA.jl.",
  },
];

/** PRs — personal records and pull requests, same discipline, different units. */
export interface StatRow {
  lab: string;
  val: string;
}
export const personalRecords: StatRow[] = [
  { lab: "Mile", val: "4:03" },
  { lab: "5,000 m", val: "14:17" },
  { lab: "10,000 m", val: "31:07" },
];
export const pullRequests: StatRow[] = [
  { lab: "API traffic maintained", val: "10⁶+/day" },
  { lab: "Users on shipped UI", val: "1,000+" },
  { lab: "K8s deployments monitored", val: "40+" },
  { lab: "Geolocation API bill", val: "−50%" },
];
export const pullRequestsNote = "Four-plus years of production full-stack at OnSolve.";

/** Gear rack — skills grouped for the simple view. */
export interface GearGroup {
  label: string;
  items: string[];
}
export const gearRack: GearGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "C#", "Python", "Java", "SQL", "Julia"],
  },
  {
    label: "Frameworks",
    items: ["React", ".NET / ASP.NET Core", "Spring", "FastAPI", "Next.js", "CUDA"],
  },
  {
    label: "Cloud & data",
    items: [
      "PostgreSQL",
      "Kubernetes",
      "Docker",
      "Redis",
      "RabbitMQ",
      "AWS",
      "GCP",
      "Supabase",
      "Grafana",
    ],
  },
];

/** ChefClaw guided-tour steps (shown while the app is still in development). */
export const chefTourSteps = [
  "1 · Paste a Bilibili or Rednote link — an async job downloads and watches the video.",
  "2 · A multimodal model extracts a structured, bilingual recipe. Quantities are captured verbatim — the pipeline never invents food data.",
  "3 · One video can yield several linked dishes, filed into a searchable, browsable library.",
];

/** Viewpoints — a small strip of real photographs (originals, not stylized). */
export interface Viewpoint {
  src: string;
  caption: string;
}
export const viewpoints: Viewpoint[] = [
  { src: "/gallery/photography/tunnel-view.jpg", caption: "TUNNEL VIEW · YOSEMITE" },
  {
    src: "/gallery/photography/kearsarge-basin.jpg",
    caption: "KEARSARGE BASIN · EASTERN SIERRA",
  },
  { src: "/gallery/photography/taft-point-crow.jpg", caption: "TAFT POINT · YOSEMITE" },
  { src: "/gallery/photography/the-narrows.jpg", caption: "THE NARROWS · ZION" },
  {
    src: "/gallery/photography/antelope-canyon.jpg",
    caption: "ANTELOPE CANYON · ARIZONA",
  },
  {
    src: "/gallery/photography/glacier-valley.jpg",
    caption: "GLACIER NATIONAL PARK · MONTANA",
  },
];
export const viewpointsNote =
  "Every frame here is one of my own photographs — the full set lives in the world view.";
