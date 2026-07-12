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
  | "falls"
  | "castle"
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
  | "boulder"
  | "falls"
  | "castle";
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
  | "scrub"
  | "cracked"
  | "cairn"
  | "jackrabbit"
  | "tent"
  | "bench"
  | "poles"
  | "seedheads"
  | "waveledge"
  | "slotfin"
  | "sandfall"
  | "puddle"
  | "boots"
  | "stream"
  | "driftwood"
  | "lizard"
  | "riverback"
  | "riverfront"
  | "bridge"
  | "cedar"
  | "gate"
  | "jpine"
  | "skis"
  | "skirack"
  | "hogan"
  | "blanketrack"
  | "hoodoo"
  | "arch"
  | "roadrunner"
  | "coyote"
  | "snake"
  | "squirrel"
  | "hare"
  | "deer";
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
  /** Content category shown big in the area header, e.g. "PROJECTS & CONTACT". */
  theme: string;
  /** Real place the scene's photograph was taken — the area subheader. */
  place: string;
  cls: string;
  img: string;
  bgPos: string;
  aria: string;
  /**
   * Half-width of the walkable stage in world units. Round 5: the camera is
   * static and every stage is normalized to the same width (±600) so each
   * scene fits the viewport whole, signposts at both far edges.
   */
  gxClamp: number;
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
  "Climbing days between trail days. The wall is drawn from El Capitan; the crow on top is from Taft Point, Yosemite.";
export const fallsNote =
  "Lower Yosemite Falls — the last drop of the tallest waterfall in North America.";
export const castleNote =
  "Matsumoto Castle in winter — a sixteenth-century keep in Nagano, Japan.";

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
    src: "/gallery/photography/el-capitan.jpg",
    alt: "El Capitan rising over the valley floor",
  },
  falls: {
    src: "/gallery/photography/yosemite-falls.jpg",
    alt: "Lower Yosemite Falls dropping between granite walls",
  },
  castle: {
    src: "/gallery/snow/matsumoto-castle.jpg",
    alt: "Matsumoto Castle above its moat with snowy peaks behind",
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

/**
 * Round 5B photo policy: a card's gallery holds ONLY photographs of features
 * actually rendered in that card's area (the world shows the drawing, the
 * card shows the photo it came from). The one exception is Photography,
 * which keeps the full portfolio set.
 */
export const galleries: Partial<Record<CardId, string[]>> = {
  // Meadow cards — everything here is drawn in the meadow scene.
  about: g("photography", [
    "tunnel-view",
    "yosemite-falls",
    "el-capitan",
    "sequoia-grove",
    "taft-point-crow",
  ]),
  grove: g("photography", ["sequoia-grove"]),
  climbing: g("photography", ["el-capitan", "taft-point-crow"]),
  // (no falls gallery: the falls card shows yosemite-falls as its header image,
  // so a one-photo gallery row would just duplicate it)
  bear: g("photography", ["glacier-bear"]),
  // The camp set is shared by Contact and the camp's mirror-lake vignette.
  contact: g("camp", ["campfire-night", "mirror-lake-dusk", "tent-alpenglow"]),
  lake: g("camp", ["mirror-lake-dusk", "campfire-night", "tent-alpenglow"]),
  // Snow cards — trail + river on Experience; the castle keeps its own.
  experience: g("snow", ["sulphur-mountain-trail", "frozen-river", "togakushi-gate"]),
  castle: g("snow", ["matsumoto-castle", "matsumoto-pines"]),
  // Desert card — the buttes are the backdrop; the arch is drawn on the path.
  skills: g("desert", ["monument-valley-mittens", "monument-valley-spire", "mobius-arch"]),
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
   travel walks node-to-node along them instead of cutting straight lines.
   Round 5: every path meets a connecting stage edge at gy 72, so the trail
   visibly continues from one screen onto the next. */

/**
 * Round 5B: the trail begins under the El Capitan wall at the far west edge,
 * passes the about-this-site kiosk (the hiker spawns there), and still
 * skirts BELOW the track oval on its way to the east edge.
 */
const MEADOW_PATH: Vec[] = [
  { gx: -600, gy: 72 },
  { gx: -500, gy: 80 },
  { gx: -380, gy: 72 },
  { gx: -260, gy: 58 },
  { gx: -140, gy: 52 },
  { gx: -20, gy: 66 },
  { gx: 100, gy: 78 },
  { gx: 240, gy: 88 },
  { gx: 380, gy: 94 },
  { gx: 505, gy: 92 },
  { gx: 600, gy: 72 },
];

const SLOT_PATH: Vec[] = [
  { gx: -600, gy: 72 },
  { gx: -285, gy: 76 },
  { gx: 0, gy: 70 },
  { gx: 300, gy: 78 },
  { gx: 600, gy: 72 },
];

/**
 * Switchbacks down the snowfield — through the red timber gate on the first
 * descent — then across the footbridge (gy 58–68 lane) to the desert side.
 */
const SNOW_PATH: Vec[] = [
  { gx: -600, gy: 72 },
  { gx: -360, gy: 88 },
  { gx: -290, gy: 69 },
  { gx: -200, gy: 44 },
  { gx: -40, gy: 86 },
  { gx: 140, gy: 48 },
  { gx: 250, gy: 60 },
  { gx: 330, gy: 63 },
  { gx: 460, gy: 63 },
  { gx: 600, gy: 72 },
];

const DESERT_PATH: Vec[] = [
  { gx: -600, gy: 72 },
  { gx: -400, gy: 68 },
  { gx: -260, gy: 64 },
  { gx: -80, gy: 66 },
  { gx: 120, gy: 68 },
  { gx: 300, gy: 64 },
  { gx: 600, gy: 72 },
];

/**
 * Round 5: the camp compressed from ±700 to the shared ±600 stage (every
 * position ×0.857) — lake far west, planner board west-center, campfire +
 * tent mid-east, camp kitchen far east. The trail ends at the kitchen.
 */
const CAMP_PATH: Vec[] = [
  { gx: -600, gy: 72 },
  { gx: -480, gy: 82 },
  { gx: -360, gy: 80 },
  { gx: -225, gy: 74 },
  { gx: -130, gy: 66 },
  { gx: -15, gy: 70 },
  { gx: 110, gy: 74 },
  { gx: 215, gy: 72 },
  { gx: 305, gy: 68 },
  { gx: 430, gy: 66 },
  { gx: 550, gy: 62 },
  { gx: 595, gy: 60 },
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
    place: "Yosemite",
    cls: "sc-meadow",
    img: "/world/meadow.jpg",
    // Valley + cliffs centered, treeline meeting the ground seam.
    bgPos: "center 67%",
    aria: "Stylized Yosemite meadow: an about-this-site trailhead kiosk with a loaded backpack, boots and trekking poles beside it, a towering El Capitan-style climbing wall with a rope and gear at its base and a perched crow, a dense giant-sequoia grove, Yosemite Falls pouring off the back cliffs, a six-lane running track with a Georgia Tech sign, deer grazing at the treeline, a bear resting on a boulder, roaming yellow jackets, and a walkable hiker character",
    gxClamp: 600,
    exits: { right: 1 },
    path: MEADOW_PATH,
    // Round 5B layout: the El Capitan wall closes the far west end, the
    // about-this-site kiosk stands at the trailhead where the hiker spawns
    // (gear showcases beside it), the bigger grove owns the mid-back, the
    // falls pour off the back cliffs east of it, the bear rests between
    // grove and falls, and the six-lane track keeps the right side (its
    // infield stays walkable, so the oval needs no blocker).
    blockers: [
      { shape: "ellipse", gx: -590, gy: 40, hw: 135, hh: 6 }, // El Capitan wall
      { shape: "ellipse", gx: -480, gy: 64, hw: 42, hh: 4 }, // kiosk posts
      { shape: "ellipse", gx: -180, gy: 30, hw: 170, hh: 5 }, // sequoia trunks
      { shape: "ellipse", gx: 240, gy: 8, hw: 85, hh: 5 }, // falls cliff
      { shape: "ellipse", gx: 60, gy: 10, hw: 30, hh: 3 }, // bear boulder
      { shape: "ellipse", gx: -100, gy: 70, hw: 16, hh: 3 }, // GT sign post
    ],
    decor: [
      ...pathStamps(MEADOW_PATH, 0),
      // Round 5: the track shifted left and shrank a notch so the whole oval
      // sits inside the static stage, with clear ground between its right
      // end (~gx 520) and the scene exit (gx 594).
      { kind: "track", gx: 190, gy: 84, flat: true },
      // stage-edge biome hint: sandstone creeping in from the slot side
      { kind: "slotRock", gx: 600, gy: 80 },
      // back treeline
      { kind: "pine", gx: -420, gy: 10 },
      { kind: "pine", gx: -30, gy: 8 },
      { kind: "pine", gx: 130, gy: 12 },
      { kind: "pine", gx: 380, gy: 12 },
      { kind: "pine", gx: 530, gy: 20 },
      { kind: "pine", gx: 610, gy: 14 },
      // trailhead gear showcases beside the kiosk (his pack, boots, poles)
      { kind: "backpack", gx: -432, gy: 72 },
      { kind: "boots", gx: -452, gy: 78 },
      { kind: "poles", gx: -408, gy: 70 },
      // grass tufts — dense ground cover (client asked three times)
      { kind: "grass", gx: -560, gy: 60 },
      { kind: "grass", gx: -440, gy: 88 },
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
      { kind: "grass", gx: 620, gy: 92 },
      // rocks + logs
      { kind: "rock", gx: -160, gy: 48 },
      { kind: "rock", gx: 160, gy: 18 },
      { kind: "log", gx: -180, gy: 86 },
      { kind: "mossRock", gx: -530, gy: 78 },
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
      { kind: "flowers", gx: -600, gy: 88, v: 1 },
      // ground cover: daisies, clover, seed heads, desire-line wear
      { kind: "daisies", gx: 20, gy: 66, flat: true },
      { kind: "daisies", gx: -250, gy: 88, flat: true },
      { kind: "daisies", gx: -420, gy: 84, flat: true },
      { kind: "daisies", gx: 480, gy: 90, flat: true },
      { kind: "daisies", gx: 120, gy: 94, flat: true },
      { kind: "clover", gx: -320, gy: 92, flat: true },
      { kind: "clover", gx: -360, gy: 70, flat: true },
      { kind: "clover", gx: 220, gy: 90, flat: true },
      { kind: "seedheads", gx: -490, gy: 90 },
      { kind: "seedheads", gx: -240, gy: 72 },
      { kind: "seedheads", gx: 90, gy: 64 },
      { kind: "seedheads", gx: 400, gy: 92 },
      { kind: "seedheads", gx: -30, gy: 80 },
      { kind: "seedheads", gx: 540, gy: 52 },
      { kind: "worn", gx: 0, gy: 62, flat: true },
      { kind: "worn", gx: -150, gy: 56, v: 1, flat: true },
      { kind: "worn", gx: -420, gy: 78, v: 2, flat: true },
      { kind: "worn", gx: -60, gy: 88, v: 2, flat: true },
      { kind: "stones", gx: -300, gy: 74 },
      { kind: "stones", gx: 140, gy: 88 },
      { kind: "needles", gx: -200, gy: 56, flat: true },
      // wildlife (the yellow jackets roam the whole meadow — see World.tsx)
      { kind: "deer", gx: 470, gy: 14 },
      { kind: "deer", gx: 552, gy: 20, v: 1 },
      { kind: "squirrel", gx: -280, gy: 56 },
      { kind: "bird", gx: -70, gy: 86, v: 0 },
      { kind: "bird", gx: 200, gy: 96, v: 1 },
      { kind: "butterfly", gx: -190, gy: 62, v: 0 },
      { kind: "butterfly", gx: -260, gy: 86, v: 1 },
      { kind: "butterfly", gx: 100, gy: 70, v: 0 },
      { kind: "butterfly", gx: -500, gy: 74, v: 1 },
    ],
    signs: [
      { text: "TRAILHEAD", gx: -572, gy: 88 },
      { text: "ANTELOPE CANYON →", gx: 572, gy: 88 },
    ],
    setPieces: [
      // Round 5B: the About anchor is an about-this-site kiosk at the very
      // start of the trail — the hiker spawns beside it.
      {
        id: "about",
        kind: "kiosk",
        label: "ABOUT",
        gx: -480,
        gy: 64,
        approach: { gx: -480, gy: 78 },
      },
      // The El Capitan wall closes the meadow's far west end (round 5B):
      // sheer granite face, rope lines, chalked holds, gear at the base,
      // the Taft Point crow on the summit.
      {
        id: "climbing",
        kind: "boulder",
        label: "CLIMBING",
        gx: -590,
        gy: 40,
        approach: { gx: -590, gy: 58 },
        discovery: true,
      },
      // The grove stays as scenery (Experience lives in the snow).
      {
        id: "grove",
        kind: "grove",
        label: "SEQUOIA GROVE",
        gx: -180,
        gy: 30,
        approach: { gx: -180, gy: 46 },
        discovery: true,
      },
      // Yosemite Falls pours off the back cliffs east of the grove.
      {
        id: "falls",
        kind: "falls",
        label: "YOSEMITE FALLS",
        gx: 240,
        gy: 8,
        approach: { gx: 240, gy: 26 },
        discovery: true,
      },
      // The bear rests on its boulder between the grove and the falls.
      {
        id: "bear",
        kind: "bear",
        label: "THE BEAR",
        gx: 60,
        gy: 10,
        approach: { gx: 100, gy: 20 },
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
    place: "Antelope Canyon",
    cls: "sc-slot",
    img: "/world/slot.jpg",
    bgPos: "center 30%",
    aria: "Stylized Antelope Canyon slot with sculpted sandstone wave walls and a freestanding stone fin, a shallow green stream winding along the back of the canyon floor, a light beam with drifting dust, a trickle of falling sand, a reflective puddle, driftwood left by flash floods, a basking lizard, small birds, a photographer's tripod setup with an open camera bag and a laid-out print, a raven, and a walkable hiker character",
    gxClamp: 600,
    exits: { left: 0, right: 2 },
    path: SLOT_PATH,
    // Round 5B redress on the round-5 wide stage: the wave walls redrawn as
    // clearly-readable sculpted sandstone (stacked flowing strata with
    // beam-lit lips), plus a freestanding fin. A shallow Narrows-style
    // stream runs the length of the back floor — water is never walkable
    // (one full-width blocker; all POIs and the path stay south of it).
    blockers: [
      { shape: "ellipse", gx: -515, gy: 32, hw: 60, hh: 5 }, // west wave wall
      { shape: "ellipse", gx: 520, gy: 34, hw: 60, hh: 5 }, // east wave wall
      { shape: "ellipse", gx: -245, gy: 28, hw: 26, hh: 4 }, // stone fin
      { shape: "rect", gx: 0, gy: 26, hw: 600, hh: 26 }, // the stream + canyon back (gy 0–52): the whole back third is walls + water, never walkable — a high-gy scene entry unsticks SOUTH onto the floor, never onto the water
      { shape: "ellipse", gx: 90, gy: 56, hw: 30, hh: 4 }, // photographer's setup
    ],
    decor: [
      ...pathStamps(SLOT_PATH, 1),
      // sculpted wave walls + a freestanding fin (round 5B rework)
      { kind: "waveledge", gx: -515, gy: 32 },
      { kind: "waveledge", gx: 520, gy: 34, v: 1 },
      { kind: "slotfin", gx: -245, gy: 28 },
      // the Narrows-style stream along the back of the floor
      { kind: "stream", gx: 0, gy: 46, flat: true },
      // sand trickling off the east wall, piling below
      { kind: "sandfall", gx: 450, gy: 52 },
      // the beam-lit puddle
      { kind: "puddle", gx: -70, gy: 62, flat: true },
      // floor dressing: rocks, smooth sand-polished stones, rippled sand,
      // flash-flood driftwood
      { kind: "slotRock", gx: 215, gy: 76 },
      { kind: "slotRock", gx: -125, gy: 84 },
      { kind: "slotRock", gx: -250, gy: 58 },
      { kind: "slotRock", gx: 385, gy: 24 },
      { kind: "stones", gx: -215, gy: 86, v: 1 },
      { kind: "stones", gx: 320, gy: 82, v: 1 },
      { kind: "stones", gx: -410, gy: 66, v: 1 },
      { kind: "stones", gx: 160, gy: 28, v: 1 },
      { kind: "stones", gx: 525, gy: 88, v: 1 },
      { kind: "sandline", gx: -375, gy: 74, flat: true },
      { kind: "sandline", gx: 195, gy: 84, v: 1, flat: true },
      { kind: "sandline", gx: -55, gy: 90, v: 2, flat: true },
      { kind: "sandline", gx: 420, gy: 70, v: 1, flat: true },
      { kind: "sandline", gx: -525, gy: 60, v: 2, flat: true },
      { kind: "slab", gx: -205, gy: 72, flat: true },
      { kind: "driftwood", gx: -330, gy: 84 },
      { kind: "driftwood", gx: 265, gy: 34, v: 1 },
      // wildlife: the raven on the west wall's lowest shelf, a lizard
      // basking near the fallen slab, canyon birds working the floor
      { kind: "raven", gx: -467, gy: 37 },
      { kind: "lizard", gx: -190, gy: 70 },
      { kind: "bird", gx: 370, gy: 76, v: 0 },
      { kind: "bird", gx: -280, gy: 90, v: 1 },
      // stage-edge biome hints: meadow grass west, first snow east
      { kind: "grass", gx: -598, gy: 84 },
      { kind: "snowmound", gx: 600, gy: 88 },
    ],
    signs: [
      { text: "← YOSEMITE", gx: -572, gy: 64 },
      { text: "BANFF →", gx: 572, gy: 64 },
    ],
    setPieces: [
      {
        id: "photography",
        kind: "photo",
        label: "PHOTOGRAPHY",
        gx: 90,
        gy: 56,
        approach: { gx: 90, gy: 70 },
      },
    ],
    stations: [],
  },
  {
    id: "snow",
    name: "THE SNOW",
    theme: "EXPERIENCE",
    place: "Banff",
    cls: "sc-snow",
    img: "/world/snow.jpg",
    // Banff ranges + snow-dusted firs across the mid-band, footprinted trail
    // meeting the drawn snowpack at the seam (38%: sunlit peaks stay in view).
    bgPos: "center 38%",
    aria: "Stylized Banff snow trail with switchbacks, big snow-covered firs, a frozen teal river winding toward the viewer and crossed by a wooden footbridge, a snow-roofed Matsumoto Castle rising behind the treeline, a red timber gate flanked by giant cedars over the trail, skis and poles planted in the snow beside a small ski rack, carved trail signs listing career stops, a snowshoe hare, and a walkable hiker character",
    gxClamp: 600,
    exits: { left: 1, right: 3 },
    path: SNOW_PATH,
    // Round 5B: the oval river segments are gone — the frozen river is two
    // drawn-perspective pieces (back reach + front reach) split exactly at
    // the footbridge lane (gy 58..68), so the bridge deck draws over the
    // back water and under the hiker. Blockers wall the water off on both
    // sides of the lane.
    blockers: [
      { shape: "rect", gx: 378, gy: 12, hw: 42, hh: 13 }, // river, far reach (sealed to the horizon)
      { shape: "rect", gx: 384, gy: 36, hw: 52, hh: 12 }, // river, mid-back
      { shape: "rect", gx: 390, gy: 52, hw: 62, hh: 6 }, // river above the bridge
      { shape: "rect", gx: 398, gy: 72, hw: 80, hh: 5 }, // river below the bridge
      { shape: "rect", gx: 400, gy: 88, hw: 90, hh: 13 }, // river, front reach (sealed to the front edge)
      { shape: "ellipse", gx: -420, gy: 22, hw: 95, hh: 6 }, // castle stone base
      { shape: "ellipse", gx: -322, gy: 67, hw: 12, hh: 3 }, // gate west cedar
      { shape: "ellipse", gx: -258, gy: 67, hw: 12, hh: 3 }, // gate east cedar
      { shape: "ellipse", gx: -160, gy: 26, hw: 20, hh: 3 }, // trail-sign post
    ],
    decor: [
      ...pathStamps(SNOW_PATH, 2),
      // The frozen teal river (round 5B): back reach narrows toward the
      // ranges, front reach widens toward the viewer, ice shelves creeping
      // in from the banks — one readable body of water.
      { kind: "riverback", gx: 388, gy: 59, flat: true },
      { kind: "riverfront", gx: 400, gy: 97, flat: true },
      // Same anchor gy as the front reach and listed after it: identical
      // flat z, later DOM order — the deck always draws over the water.
      { kind: "bridge", gx: 395, gy: 97, flat: true },
      // Matsumoto Castle grounds: pruned pines at the stone base.
      { kind: "jpine", gx: -498, gy: 30 },
      { kind: "jpine", gx: -338, gy: 32 },
      // The red timber gate straddles the trail, giant cedars either side.
      { kind: "gate", gx: -290, gy: 65 },
      { kind: "cedar", gx: -322, gy: 66 },
      { kind: "cedar", gx: -258, gy: 66, v: 1 },
      // Big snow-covered firs (round 5B scale fix: taller than the hiker).
      { kind: "snowpine", gx: -545, gy: 40 },
      { kind: "snowpine", gx: -60, gy: 10 },
      { kind: "snowpine", gx: -90, gy: 56 },
      { kind: "snowpine", gx: 60, gy: 14 },
      { kind: "snowpine", gx: 130, gy: 26 },
      { kind: "snowpine", gx: 200, gy: 78 },
      { kind: "snowpine", gx: 300, gy: 20 },
      { kind: "snowpine", gx: 520, gy: 32 },
      // Skiing: planted skis + poles by the trail, a small rack further on.
      { kind: "skis", gx: -120, gy: 78 },
      { kind: "skirack", gx: 250, gy: 70 },
      { kind: "snowmound", gx: -300, gy: 60 },
      { kind: "snowmound", gx: -80, gy: 68, v: 1 },
      { kind: "snowmound", gx: 200, gy: 88 },
      { kind: "snowmound", gx: -440, gy: 92, v: 1 },
      { kind: "snowmound", gx: 480, gy: 84 },
      { kind: "burrock", gx: -350, gy: 40 },
      { kind: "burrock", gx: 90, gy: 74, v: 1 },
      { kind: "burrock", gx: 250, gy: 26 },
      { kind: "footprints", gx: -260, gy: 72, flat: true },
      { kind: "footprints", gx: 30, gy: 58, v: 1, flat: true },
      { kind: "footprints", gx: -120, gy: 90, v: 1, flat: true },
      { kind: "footprints", gx: 160, gy: 66, flat: true },
      { kind: "stones", gx: -40, gy: 24 },
      { kind: "stones", gx: 240, gy: 94 },
      // Wildlife: a snowshoe hare working the mounds by the trail.
      { kind: "hare", gx: -60, gy: 64 },
      // stage-edge biome hints: canyon sandstone west, desert scrub east
      { kind: "slotRock", gx: -600, gy: 84 },
      { kind: "scrub", gx: 600, gy: 80 },
    ],
    signs: [
      { text: "← ANTELOPE CANYON", gx: -572, gy: 88 },
      { text: "MONUMENT VALLEY →", gx: 572, gy: 86 },
    ],
    setPieces: [
      {
        id: "experience",
        kind: "trailsigns",
        label: "EXPERIENCE",
        gx: -160,
        gy: 26,
        approach: { gx: -160, gy: 42 },
      },
      // Matsumoto Castle rises behind the west treeline (round 5B).
      {
        id: "castle",
        kind: "castle",
        label: "MATSUMOTO CASTLE",
        gx: -420,
        gy: 22,
        approach: { gx: -420, gy: 40 },
        discovery: true,
      },
    ],
    stations: [],
  },
  {
    id: "desert",
    name: "THE DESERT",
    theme: "SKILLS",
    place: "Monument Valley",
    cls: "sc-desert",
    img: "/world/desert.jpg",
    // The Mittens + Merrick Butte on the horizon just above the seam.
    bgPos: "center 58%",
    aria: "Stylized Monument Valley desert with buttes on the horizon, a rounded granite arch over the dusty path, striped hoodoo spires, an earthen hogan and a rug on a wooden rack, a sprinting roadrunner, a coyote patrolling the back, a snake that slips between the bushes, cairns, scrub, a climbing gear cache on a boulder, and a walkable hiker character",
    gxClamp: 600,
    exits: { left: 2, right: 4 },
    path: DESERT_PATH,
    blockers: [
      { shape: "ellipse", gx: -424, gy: 58, hw: 48, hh: 5 }, // arch west foot
      { shape: "ellipse", gx: -96, gy: 58, hw: 44, hh: 5 }, // arch east foot
      { shape: "ellipse", gx: 120, gy: 46, hw: 42, hh: 4 }, // gear-cache boulder
      { shape: "ellipse", gx: -535, gy: 60, hw: 44, hh: 5 }, // hogan
      { shape: "ellipse", gx: 440, gy: 22, hw: 22, hh: 4 }, // tall hoodoo
      { shape: "ellipse", gx: 505, gy: 34, hw: 18, hh: 4 }, // short hoodoo
    ],
    decor: [
      ...pathStamps(DESERT_PATH, 3),
      // The rounded granite arch spans the path between its two pillars
      // (drawn from the Mobius Arch photograph — the trail passes through).
      { kind: "arch", gx: -258, gy: 60 },
      // Navajo-inspired dressing, generic and respectful: an earthen hogan
      // with its door to the east, and a woven rug aired trailside.
      { kind: "hogan", gx: -535, gy: 60 },
      { kind: "blanketrack", gx: -440, gy: 66 },
      // Zion/Bryce-inspired striped hoodoos on the east rise.
      { kind: "hoodoo", gx: 440, gy: 22 },
      { kind: "hoodoo", gx: 505, gy: 34, v: 1 },
      { kind: "scrub", gx: -480, gy: 30 },
      { kind: "scrub", gx: -380, gy: 84, v: 1 },
      { kind: "scrub", gx: -60, gy: 28 },
      { kind: "scrub", gx: 60, gy: 86, v: 1 },
      { kind: "scrub", gx: 320, gy: 26 },
      { kind: "scrub", gx: 480, gy: 78, v: 1 },
      { kind: "scrub", gx: -160, gy: 90 },
      { kind: "scrub", gx: -240, gy: 24, v: 1 },
      { kind: "scrub", gx: 170, gy: 92 },
      { kind: "scrub", gx: 390, gy: 36, v: 1 },
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
      // Wildlife: the roadrunner sprints the open front, the coyote patrols
      // the back line, a snake slips between the bushes now and then.
      { kind: "roadrunner", gx: -100, gy: 84 },
      { kind: "coyote", gx: 210, gy: 16 },
      { kind: "snake", gx: 340, gy: 78 },
      { kind: "jackrabbit", gx: 30, gy: 80 },
      // stage-edge biome hints: snow creeping in west, camp pines east
      { kind: "snowmound", gx: -600, gy: 80 },
      { kind: "pine", gx: 598, gy: 24 },
    ],
    signs: [
      { text: "← BANFF", gx: -572, gy: 88 },
      { text: "EASTERN SIERRA →", gx: 572, gy: 88 },
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
    place: "Eastern Sierra",
    cls: "sc-camp",
    img: "/world/camp.jpg",
    // Wide-band asset (2400×1044): clouds top, mountain crest mid, glowing
    // tent bottom-right — sits just above the drawn-ground seam.
    bgPos: "center 62%",
    aria: "Stylized Eastern Sierra night campsite with a detailed campfire, a glowing blue dome tent, billboard-scale project stations, lantern lights, and a drawn mountain mirrored in a still lake with a fishing dock and a bench, with a walkable hiker character",
    gxClamp: 600,
    exits: { left: 3 },
    alwaysNight: true,
    path: CAMP_PATH,
    blockers: [
      { shape: "ellipse", gx: -515, gy: 57, hw: 130, hh: 8 }, // the lake
      { shape: "ellipse", gx: 505, gy: 16, hw: 12, hh: 3 }, // owl tree trunk
      { shape: "ellipse", gx: -130, gy: 50, hw: 195, hh: 5 }, // planner board base
      { shape: "ellipse", gx: 215, gy: 58, hw: 36, hh: 4 }, // campfire ring
      { shape: "ellipse", gx: 305, gy: 52, hw: 53, hh: 5 }, // dome tent
      { shape: "ellipse", gx: 595, gy: 47, hw: 200, hh: 5 }, // camp kitchen base
    ],
    // Layout audited round 4B for the 3× stations, compressed ×0.857 for the
    // round-5 shared stage: lake far west (bench on its near shore), planner
    // board west-center, campfire with the blue dome tent to its right (the
    // real campfire photo's composition), camp kitchen far east.
    decor: [
      ...pathStamps(CAMP_PATH, 4),
      { kind: "campRock", gx: 65, gy: 20 },
      { kind: "campRock", gx: -35, gy: 88 },
      { kind: "log", gx: 390, gy: 78 },
      { kind: "log", gx: 95, gy: 74 },
      { kind: "lanterns", gx: 50, gy: 18 },
      { kind: "backpack", gx: -230, gy: 70 },
      { kind: "canister", gx: 55, gy: 78 },
      { kind: "stump", gx: 140, gy: 64 },
      { kind: "stump", gx: 255, gy: 86, v: 1 },
      { kind: "owltree", gx: 505, gy: 16 },
      { kind: "bench", gx: -411, gy: 84 },
      { kind: "tent", gx: 305, gy: 53 },
      { kind: "poles", gx: 375, gy: 57 },
      // Night dressing: trodden earth, pine duff, stones, pooled lamplight.
      { kind: "earth", gx: 215, gy: 72, flat: true },
      { kind: "earth", gx: -130, gy: 62, v: 1, flat: true },
      { kind: "earth", gx: 600, gy: 58, flat: true },
      { kind: "needles", gx: -300, gy: 74, flat: true },
      { kind: "needles", gx: 145, gy: 82, flat: true },
      { kind: "stones", gx: 120, gy: 68 },
      { kind: "stones", gx: -155, gy: 76 },
      { kind: "stones", gx: 430, gy: 80 },
      { kind: "lightpool", gx: 50, gy: 22, flat: true },
      { kind: "lightpool", gx: -120, gy: 54, flat: true },
      { kind: "lightpool", gx: 600, gy: 52, v: 1, flat: true },
      // Round 5B life pass: night grass at the clearing edges (the lake's
      // fish rises live inside the lake art itself).
      { kind: "grass", gx: -275, gy: 88 },
      { kind: "grass", gx: 17, gy: 92 },
      { kind: "grass", gx: 480, gy: 84 },
      { kind: "grass", gx: -377, gy: 66 },
      // stage-edge biome hint: desert scrub + cracked earth at the west edge
      { kind: "scrub", gx: -600, gy: 80 },
      { kind: "cracked", gx: -585, gy: 92, flat: true },
    ],
    signs: [
      { text: "← MONUMENT VALLEY", gx: -572, gy: 88 },
      { text: "TRAIL ENDS", gx: 572, gy: 88 },
    ],
    setPieces: [
      // The camp's mountain-lake vignette (round 4: About moved to the
      // meadow kiosk; the lake keeps a discovery-only flavor card).
      {
        id: "lake",
        kind: "lake",
        label: "MOUNTAIN LAKE",
        gx: -515,
        gy: 60,
        approach: { gx: -515, gy: 78 },
        discovery: true,
      },
    ],
    stations: [
      {
        id: "todoclaw",
        kind: "desk",
        label: "TODOCLAW",
        gx: -130,
        gy: 50,
        approach: { gx: -130, gy: 64 },
        anim: "opening",
        animMs: 350,
      },
      {
        id: "contact",
        kind: "fire",
        label: "CONTACT",
        gx: 215,
        gy: 58,
        approach: { gx: 215, gy: 72 },
        animMs: 0,
      },
      {
        id: "chefclaw",
        kind: "pot",
        label: "CHEFCLAW",
        gx: 595,
        gy: 47,
        approach: { gx: 585, gy: 60 },
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

  /* Round-4 label guard: labels are always visible, so approximate each
     label's screen box at 1280×800 (round 5: static camera — the whole stage
     is fit to the viewport width) and warn when two boxes could collide.
     Heuristic — anchor y stands in for label y since art heights vary — but
     it catches the side-by-side class of collision that matters. */
  const GUARD_W = 1280;
  const GUARD_H = 800;
  scenes.forEach((sc) => {
    const labeled = [
      ...sc.setPieces.filter((p) => !p.discovery).map((p) => ({ id: p.id as string, gx: p.gx, gy: p.gy, text: p.label })),
      ...sc.stations.map((s) => ({ id: s.id as string, gx: s.gx, gy: s.gy, text: s.label })),
      ...sc.signs.map((s) => ({ id: `sign:${s.text}`, gx: s.gx, gy: s.gy, text: s.text })),
    ];
    const u = GUARD_W / (2 * (sc.gxClamp + 20)); // engine fit-to-width scale
    const boxes = labeled.map((l) => {
      const t = l.gy / 100;
      const x = GUARD_W / 2 + l.gx * (0.55 + 0.45 * t) * u;
      const w = (Math.max(30, l.text.length * 7.5) + 14) * u;
      return { id: l.id, x0: x - w / 2, x1: x + w / 2, y: (0.615 + 0.315 * t) * GUARD_H };
    });
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        if (a.x0 < b.x1 && b.x0 < a.x1 && Math.abs(a.y - b.y) < 56)
          console.warn(`[world] labels may collide in "${sc.id}": ${a.id} ↔ ${b.id}`);
      }
    }
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
  "athletics",
  "bear",
  "photography",
  "castle",
  "experience",
  "skills",
  "todoclaw",
  "chefclaw",
  "contact",
];
