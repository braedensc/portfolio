/**
 * The world engine: game loop, keyboard/pointer movement, click-to-move,
 * billboard projection onto a static fit-to-viewport stage, NPC idle
 * animation, proximity-opened drawers, scene transitions, and auto mode.
 *
 * Round 5: the camera never moves. Every scene is a fixed-width stage
 * (±gxClamp world units) scaled so the whole stage fits the viewport width;
 * the hiker walks within the frame and scenes swap at the edges.
 *
 * React owns UI state (which card is open, which scene renders, auto on/off)
 * via the EngineHooks callbacks; the engine owns all per-frame math and writes
 * transforms imperatively. Ported from the approved vanilla mock (l-route).
 */

import {
  scenes,
  poiLocations,
  autoRoute,
  type Blocker,
  type CardId,
  type SetPiece,
  type Station,
  type StationAnim,
  type Vec,
} from "@/content/site";
import { paintHiker, paintBear, paintDeer, type HikerFrame } from "./sprites";

export interface EngineHooks {
  setScene: (idx: number) => void;
  setCard: (id: CardId | null) => void;
  setAuto: (running: boolean) => void;
  /** Ambient attract mode is driving (shows the "WATCHING" hint). */
  setAttract: (running: boolean) => void;
}

export interface AttachRefs {
  root: HTMLElement;
  fader: HTMLElement;
  card: HTMLElement;
  /** Thin accent line from the drawer's edge toward its source POI. */
  link: HTMLElement;
  hiker: HTMLElement;
  hikerCanvas: HTMLCanvasElement;
  fx: HTMLElement;
  stars: HTMLElement;
  motes: HTMLElement;
  fireflies: HTMLElement;
  embers: HTMLElement;
  snowfall: HTMLElement;
}

type Side = "left" | "right" | null;
type Dir = "l" | "r" | "u" | "d";

const GW = 2.5; // gy-to-gx distance weighting
const SPEED = 314; // 273 (round 2) × 1.15 (round-5 client feedback: "a little faster again")
const AUTO_DWELL = 4; // seconds a drawer stays open in the manual tour
const ATTRACT_DWELL = 4; // seconds a drawer stays open while attract mode wanders
const ATTRACT_FIRST_DELAY = 4; // s after load before attract mode starts on its own
const ATTRACT_IDLE_DELAY = 30; // s of no input before attract mode resumes
/* Round-5 stage fit: world units of margin past the walkable clamp that must
   stay on screen (keeps the far-edge signposts fully visible). */
const STAGE_PAD = 20;
/* Proximity drawer zones (round 5): stand within R_OPEN of a POI and its
   drawer opens on its own; walk past R_CLOSE and it closes. The gap is the
   hysteresis that keeps the drawer from flapping at the boundary. */
const R_OPEN = 80;
const R_CLOSE = 115;
/** A dismissed (✕/Escape) POI stays suppressed until the hiker steps this far away. */
const R_SUPPRESS_CLEAR = 100;
/** First-load spawn (round 5B): the meadow trailhead, beside the About kiosk. */
const SPAWN: Vec = { gx: -440, gy: 80 };

const KEYMAP: Record<string, Dir> = {
  arrowleft: "l",
  a: "l",
  arrowright: "r",
  d: "r",
  arrowup: "u",
  w: "u",
  arrowdown: "d",
  s: "d",
};

interface WorldItem {
  el: HTMLElement;
  gx: number;
  gy: number;
  /** Ground-flat art (track, pond, sand ripples…) renders under all billboards. */
  flat: boolean;
}

/** One proximity-openable POI (set-piece or station) in the current scene. */
interface PoiRec {
  id: CardId;
  gx: number;
  gy: number;
  type: "setpiece" | "station";
  /** The .setp/.stn item root — gets the `near` class + station open anims. */
  el: HTMLElement | null;
  /** The stand-here zone pad drawn at the POI's approach point. */
  pad: HTMLElement | null;
  anim?: StationAnim;
  animMs?: number;
  d: number;
}

/** Ambient pixel-art critters painted by the engine (bear, deer). */
type NpcKind = "bear" | "deer";
interface NpcRec {
  kind: NpcKind;
  ctx: CanvasRenderingContext2D;
  frame: 0 | 1;
  acc: number;
  period: number;
}

interface AutoState {
  idx: number;
  phase: "go" | "travel" | "dwell" | "pause";
  timer: number;
  /** "manual" = the ▶ tour (one pass); "attract" = ambient idle wandering (loops). */
  mode: "manual" | "attract";
  /** Route direction — attract mode ping-pongs so the wander feels natural. */
  dir: 1 | -1;
}

export class WorldEngine {
  private hooks: EngineHooks;
  private refs: AttachRefs | null = null;
  private attached = false;
  private rm = false;

  // Spawn at the meadow trailhead beside the about-this-site kiosk
  // (round 5B: the journey starts at the very west end of the trail).
  private gx = SPAWN.gx;
  private gy = SPAWN.gy;
  private facing = 1;
  private target: Vec | null = null;
  /** Waypoints still to visit after `target` (path-following travel). */
  private queue: Vec[] = [];
  private walkAcc = 0;
  private walking = false;
  private curFrame: HikerFrame = "idle";
  private keys: Record<Dir, 0 | 1> = { l: 0, r: 0, u: 0, d: 0 };

  private cur = 0;
  private gxcl = scenes[0].gxClamp;
  private blockers: Blocker[] = scenes[0].blockers;
  private scenePath: Vec[] = scenes[0].path;
  private transitioning = false;
  private pending: { idx: number; side: Side; thenTarget: Vec | null } | null = null;
  /**
   * A navigation request (chip click / travelTo) that landed DURING a scene
   * fade. Instead of dropping it (the old behavior), the latest one is kept
   * and executed when the transition completes. Only idx + target are
   * stored — the entry side is recomputed against wherever we end up.
   */
  private queuedNav: { idx: number; thenTarget: Vec | null } | null = null;

  private activeId: CardId | null = null;
  private suppressed: CardId | null = null;
  private auto: AutoState | null = null;
  /** performance.now() of the last real user input (key/pointer/touch). */
  private lastInput = 0;
  /** Seconds of quiet before attract mode may start (4 on load, 30 after input). */
  private attractDelay = ATTRACT_FIRST_DELAY;
  /** A fullscreen overlay (photo lightbox) owns input — engine ignores it. */
  private modalOpen = false;

  private itemsEl: HTMLElement | null = null;
  private worldEls: WorldItem[] = [];
  private pois: PoiRec[] = [];
  private npcs: NpcRec[] = [];
  private hikerCtx: CanvasRenderingContext2D | null = null;

  private w = 0;
  private h = 0;
  private seamY = 0;
  private botY = 0;
  /** Round-5 stage scale: world units → px so the whole stage fits the width. */
  private u = 1;

  private raf = 0;
  private hiddenT = 0;
  private last = 0;
  private timeouts = new Set<number>();

  constructor(hooks: EngineHooks) {
    this.hooks = hooks;
  }

  /* ---------- lifecycle ---------- */

  attach(refs: AttachRefs): void {
    this.refs = refs;
    this.attached = true;
    this.rm =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.hikerCtx = refs.hikerCanvas.getContext("2d");
    if (this.hikerCtx) paintHiker(this.hikerCtx, "idle");
    this.curFrame = "idle";
    this.buildParticles();
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    refs.root.addEventListener("pointerdown", this.onPointerDown);
    this.last = performance.now();
    this.lastInput = this.last;
    this.attractDelay = ATTRACT_FIRST_DELAY;
    this.raf = requestAnimationFrame(this.tick);
  }

  detach(): void {
    this.attached = false;
    cancelAnimationFrame(this.raf);
    window.clearTimeout(this.hiddenT);
    this.timeouts.forEach((t) => window.clearTimeout(t));
    this.timeouts.clear();
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    if (this.refs) {
      this.refs.root.removeEventListener("pointerdown", this.onPointerDown);
      [
        this.refs.stars,
        this.refs.motes,
        this.refs.fireflies,
        this.refs.embers,
        this.refs.snowfall,
      ].forEach((el) => {
        el.innerHTML = "";
      });
    }
    this.refs = null;
    this.itemsEl = null;
  }

  /** Called from a layout effect whenever a scene's items mount/remount. */
  sceneMounted(idx: number, itemsEl: HTMLElement): void {
    this.itemsEl = itemsEl;
    const sc = scenes[idx];
    this.cur = idx;
    this.gxcl = sc.gxClamp;
    this.blockers = sc.blockers;
    this.scenePath = sc.path;
    const pending = this.pending;
    this.pending = null;
    const side = pending ? pending.side : null;
    if (side === "left") this.gx = -(this.gxcl - 90);
    else if (side === "right") this.gx = this.gxcl - 90;
    else if (!pending) this.gx = SPAWN.gx;
    this.gy = Math.max(20, Math.min(92, this.gy));
    if (this.blockedAt(this.gx, this.gy)) this.unstick();
    this.target = null;
    this.queue = [];
    this.suppressed = null;
    this.rescan(itemsEl, idx);
    this.measure();
    this.positionAll();
    if (pending && pending.thenTarget) this.walkVia(pending.thenTarget);
    if (this.transitioning) {
      if (this.rm) this.endTransition();
      else
        this.after(80, () => {
          this.refs?.fader.classList.remove("on");
          this.endTransition();
        });
    }
  }

  /** Fade finished: release the guard, then run any queued navigation. */
  private endTransition(): void {
    this.transitioning = false;
    const q = this.queuedNav;
    this.queuedNav = null;
    if (!q) return;
    if (q.idx === this.cur) {
      if (q.thenTarget) this.walkVia(q.thenTarget);
    } else {
      this.requestScene(q.idx, q.idx > this.cur ? "left" : "right", q.thenTarget);
    }
  }

  /* ---------- public interactions (called from React handlers) ---------- */

  travelTo(poi: CardId): void {
    const loc = poiLocations[poi];
    this.suppressed = null;
    // Mid-fade the current scene is about to change, so even a "same scene"
    // walk must be queued (requestScene queues) — otherwise a chip click
    // landing during a transition is silently lost.
    if (!this.transitioning && loc.scene === this.cur) this.walkVia({ ...loc.approach });
    else
      this.requestScene(loc.scene, loc.scene > this.cur ? "left" : "right", {
        ...loc.approach,
      });
  }

  /** Click on a set-piece or station: near → open now (stations play their
   *  reveal anim); far → walk to its stand-here zone, where proximity opens it. */
  setPieceClick(p: SetPiece): void {
    if (this.transitioning) return;
    this.suppressed = null;
    const d = Math.hypot(this.gx - p.gx, (this.gy - p.gy) * GW);
    if (d > R_OPEN) this.walkVia({ ...p.approach });
    else this.openCard(p.id);
  }

  stationClick(s: Station): void {
    if (this.transitioning) return;
    this.suppressed = null;
    const d = Math.hypot(this.gx - s.gx, (this.gy - s.gy) * GW);
    if (d > R_OPEN) {
      this.walkVia({ ...s.approach });
      return;
    }
    const rec = this.pois.find((p) => p.id === s.id);
    if (rec) this.openPoi(rec);
    else this.openCard(s.id);
  }

  /** ▶ button: starts the manual tour (taking over from attract mode if it was driving). */
  toggleAuto(): void {
    if (this.auto?.mode === "manual") this.cancelAuto();
    else {
      if (this.auto) this.cancelAuto();
      this.startAuto("manual");
    }
  }

  /** A fullscreen overlay (lightbox) is open — pause world input + attract mode. */
  setModalOpen(open: boolean): void {
    this.modalOpen = open;
    this.lastInput = performance.now();
    if (open && this.auto?.mode === "attract") this.cancelAuto();
  }

  /** ✕ on the drawer: close it, and suppress the POI so proximity doesn't
   *  instantly reopen it under the hiker's feet. Always pushes the closed
   *  state to React, even if the engine lost track. */
  dismissCard(): void {
    if (this.activeId) this.suppressed = this.activeId;
    this.closeCard();
  }

  /* ---------- internals ---------- */

  private after(ms: number, fn: () => void): void {
    const id = window.setTimeout(() => {
      this.timeouts.delete(id);
      if (this.attached) fn();
    }, ms);
    this.timeouts.add(id);
  }

  private openCard(id: CardId): void {
    this.activeId = id;
    this.hooks.setCard(id);
  }

  /** Open a POI's drawer, playing a station's reveal anim first if it has one. */
  private openPoi(p: PoiRec): void {
    if (p.anim && !this.rm && p.el) {
      if (p.el.dataset.busy) return;
      const { el, anim, id } = p;
      el.dataset.busy = "1";
      el.classList.add(anim);
      this.after(p.animMs ?? 350, () => {
        el.classList.remove(anim);
        delete el.dataset.busy;
        this.openCard(id);
      });
    } else this.openCard(p.id);
  }

  private closeCard(): void {
    this.activeId = null;
    this.hooks.setCard(null);
  }

  private esc(): void {
    if (this.activeId) {
      this.suppressed = this.activeId;
      this.closeCard();
    }
    this.target = null;
    this.queue = [];
    this.queuedNav = null;
  }

  private startAuto(mode: "manual" | "attract"): void {
    this.suppressed = null;
    this.closeCard();
    this.keys = { l: 0, r: 0, u: 0, d: 0 };
    this.target = null;
    this.queue = [];
    const idx = mode === "attract" ? this.nearestRouteIdx() : 0;
    this.auto = { idx, phase: "go", timer: 0, mode, dir: 1 };
    if (mode === "manual") this.hooks.setAuto(true);
    else this.hooks.setAttract(true);
  }

  /** Attract mode resumes from wherever the player left the hiker, not stop 0. */
  private nearestRouteIdx(): number {
    let best = 0;
    let bd = Infinity;
    autoRoute.forEach((id, i) => {
      const loc = poiLocations[id];
      const d =
        loc.scene === this.cur
          ? Math.hypot(this.gx - loc.gx, (this.gy - loc.gy) * GW)
          : 1e5 * Math.abs(loc.scene - this.cur);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    return best;
  }

  /**
   * Stop auto/attract. Any user input lands here: the hiker halts mid-step and
   * an attract-opened card closes — unless the pointer is over it (the user is
   * reading / about to click it).
   */
  private cancelAuto(): void {
    if (!this.auto) return;
    const mode = this.auto.mode;
    this.auto = null;
    this.target = null;
    this.queue = [];
    this.queuedNav = null;
    if (mode === "attract") {
      this.hooks.setAttract(false);
      if (this.activeId && this.refs && !this.refs.card.matches(":hover")) {
        this.suppressed = this.activeId;
        this.closeCard();
      }
    } else this.hooks.setAuto(false);
  }

  private measure(): void {
    if (!this.refs) return;
    this.w = this.refs.root.clientWidth;
    this.h = this.refs.root.clientHeight;
    this.seamY = 0.615 * this.h;
    this.botY = 0.93 * this.h;
    // Fit the whole stage (plus signpost margin) to the viewport width.
    // Capped high so ultrawide screens don't blow the art up; floored low so
    // phones keep a readable world (the stage may spill a little there).
    this.u = Math.min(1.35, Math.max(0.34, this.w / (2 * (this.gxcl + STAGE_PAD))));
  }

  private proj(px: number, py: number): { x: number; y: number; s: number } {
    const t = py / 100;
    return {
      x: this.w / 2 + px * (0.55 + 0.45 * t) * this.u,
      y: this.seamY + (this.botY - this.seamY) * t,
      s: (0.62 + 0.63 * t) * this.u,
    };
  }

  /* ----- walkability (round 4): blockers, sliding, nearest-walkable ----- */

  private blockedAt(gx: number, gy: number): boolean {
    for (const b of this.blockers) {
      const dx = Math.abs(gx - b.gx);
      const dy = Math.abs(gy - b.gy);
      if (b.shape === "rect") {
        if (dx <= b.hw && dy <= b.hh) return true;
      } else {
        const ex = dx / b.hw;
        const ey = dy / b.hh;
        if (ex * ex + ey * ey <= 1) return true;
      }
    }
    return false;
  }

  /** Spawn landed inside a blocker (scene entry) — nudge to open ground. */
  private unstick(): void {
    for (let r = 2; r <= 60; r += 2) {
      for (const [dx, dy] of [
        [0, r],
        [0, -r],
        [r * 2, 0],
        [-r * 2, 0],
        [r * 2, r],
        [-r * 2, r],
      ] as const) {
        const gx = Math.max(-this.gxcl, Math.min(this.gxcl, this.gx + dx));
        const gy = Math.max(0, Math.min(100, this.gy + dy));
        if (!this.blockedAt(gx, gy)) {
          this.gx = gx;
          this.gy = gy;
          return;
        }
      }
    }
  }

  /**
   * Resolve a blocked walk target to the nearest walkable point on the
   * segment back toward the hiker (i.e. the shore/edge the walk approaches
   * from). Falls back to standing still if the whole segment is blocked.
   */
  private toWalkable(tg: Vec): Vec {
    if (!this.blockedAt(tg.gx, tg.gy)) return tg;
    const dx = this.gx - tg.gx;
    const dy = this.gy - tg.gy;
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy * GW) / 3));
    for (let i = 1; i <= steps; i++) {
      const gx = tg.gx + (dx * i) / steps;
      const gy = tg.gy + (dy * i) / steps;
      if (!this.blockedAt(gx, gy)) return { gx, gy };
    }
    return { gx: this.gx, gy: this.gy };
  }

  /**
   * Move toward (nx, ny), sliding along blocker edges. On a hit, the WHOLE
   * step is re-aimed along a free axis (a wall glide) — otherwise shallow
   * -angle collisions would creep by only their tiny cross component and
   * read as stuck. Returns true if the position changed.
   */
  private slideTo(nx: number, ny: number): boolean {
    nx = Math.max(-this.gxcl, Math.min(this.gxcl, nx));
    ny = Math.max(0, Math.min(100, ny));
    const ox = this.gx;
    const oy = this.gy;
    if (!this.blockedAt(nx, ny)) {
      this.gx = nx;
      this.gy = ny;
    } else {
      const step = Math.hypot(nx - ox, (ny - oy) * GW);
      const sx = nx !== ox ? Math.sign(nx - ox) : 0;
      const sy = ny !== oy ? Math.sign(ny - oy) : oy > 50 ? -1 : 1;
      const cands: Array<[number, number]> = [
        [ox + sx * step, oy],
        [ox, oy + (sy * step) / GW],
        [ox, oy - (sy * step) / GW],
      ];
      // Mostly-vertical pushes glide vertically first.
      if (Math.abs((ny - oy) * GW) > Math.abs(nx - ox)) cands.unshift(cands.splice(1, 1)[0]);
      for (const [cx, cy] of cands) {
        const gx = Math.max(-this.gxcl, Math.min(this.gxcl, cx));
        const gy = Math.max(0, Math.min(100, cy));
        if ((Math.abs(gx - ox) > 1e-4 || Math.abs(gy - oy) > 1e-4) && !this.blockedAt(gx, gy)) {
          this.gx = gx;
          this.gy = gy;
          break;
        }
      }
    }
    return Math.abs(this.gx - ox) > 1e-4 || Math.abs(this.gy - oy) > 1e-4;
  }

  private wdist(a: Vec, b: Vec): number {
    return Math.hypot(a.gx - b.gx, (a.gy - b.gy) * GW);
  }

  /** Direct walk (raw click-to-move / ground taps). Blocked targets resolve
   *  to the nearest walkable point; blockers are slid along en route. */
  private walkTo(tg: Vec): void {
    const t = this.toWalkable({
      gx: Math.max(-this.gxcl, Math.min(this.gxcl, tg.gx)),
      gy: Math.max(0, Math.min(100, tg.gy)),
    });
    this.queue = [];
    if (this.rm) {
      this.gx = t.gx;
      this.gy = t.gy;
      this.target = null;
    } else this.target = t;
    this.ripple(t);
  }

  /**
   * Programmatic travel (chips, POI approach walks, auto/attract): follow
   * the scene's drawn path between here and the destination — enter at the
   * nearest waypoint, walk node to node, then peel off to the target.
   */
  private walkVia(tg: Vec): void {
    const t = this.toWalkable({
      gx: Math.max(-this.gxcl, Math.min(this.gxcl, tg.gx)),
      gy: Math.max(0, Math.min(100, tg.gy)),
    });
    if (this.rm) {
      this.gx = t.gx;
      this.gy = t.gy;
      this.target = null;
      this.queue = [];
      return;
    }
    const here = { gx: this.gx, gy: this.gy };
    const path = this.scenePath;
    const nodes: Vec[] = [];
    if (path.length >= 2 && this.wdist(here, t) > 130) {
      let ai = 0;
      let bi = 0;
      let ad = Infinity;
      let bd = Infinity;
      path.forEach((p, i) => {
        const da = this.wdist(here, p);
        if (da < ad) {
          ad = da;
          ai = i;
        }
        const db = this.wdist(t, p);
        if (db < bd) {
          bd = db;
          bi = i;
        }
      });
      const dir = bi >= ai ? 1 : -1;
      for (let i = ai; i !== bi + dir; i += dir) nodes.push(path[i]);
      // Don't backtrack to enter the path, and don't overshoot the goal.
      while (nodes.length >= 2 && this.wdist(here, nodes[1]) <= this.wdist(nodes[0], nodes[1]))
        nodes.shift();
      while (
        nodes.length >= 2 &&
        this.wdist(nodes[nodes.length - 2], t) <= this.wdist(nodes[nodes.length - 1], t)
      )
        nodes.pop();
      while (nodes.length && this.wdist(here, nodes[0]) < 24) nodes.shift();
      if (nodes.length && this.wdist(t, nodes[nodes.length - 1]) < 24) nodes.pop();
    }
    const pts = [...nodes.map((n) => ({ ...n })), t];
    this.target = pts.shift() ?? null;
    this.queue = pts;
    this.ripple(t);
  }

  private ripple(tg: Vec): void {
    if (!this.refs) return;
    const p = this.proj(tg.gx, tg.gy);
    const d = document.createElement("div");
    d.className = "ripple";
    d.style.left = `${p.x}px`;
    d.style.top = `${p.y}px`;
    d.style.width = `${26 * p.s}px`;
    d.style.height = `${11 * p.s}px`;
    this.refs.fx.appendChild(d);
    this.after(700, () => {
      if (d.parentNode) d.parentNode.removeChild(d);
    });
  }

  private requestScene(idx: number, side: Side, thenTarget: Vec | null): void {
    if (this.transitioning) {
      // A click landed mid-fade (chips especially): queue the latest request
      // and run it from endTransition() instead of dropping it.
      this.queuedNav = { idx, thenTarget };
      return;
    }
    if (idx === this.cur) {
      if (thenTarget) this.walkTo(thenTarget);
      return;
    }
    this.transitioning = true;
    this.closeCard();
    this.pending = { idx, side, thenTarget };
    if (this.rm) this.hooks.setScene(idx);
    else {
      this.refs?.fader.classList.add("on");
      this.after(270, () => this.hooks.setScene(idx));
    }
  }

  private rescan(itemsEl: HTMLElement, idx: number): void {
    const sc = scenes[idx];
    this.worldEls = [];
    itemsEl.querySelectorAll<HTMLElement>(".item").forEach((el) => {
      this.worldEls.push({
        el,
        gx: Number(el.dataset.gx),
        gy: Number(el.dataset.gy),
        flat: el.dataset.flat === "1",
      });
    });
    // Round 5: set-pieces and stations share one proximity model — every POI
    // opens by standing near it (its zone pad) as well as by click.
    this.pois = [
      ...sc.setPieces.map((p) => ({ id: p.id, gx: p.gx, gy: p.gy, type: "setpiece" as const })),
      ...sc.stations.map((s) => ({
        id: s.id,
        gx: s.gx,
        gy: s.gy,
        type: "station" as const,
        anim: s.anim,
        animMs: s.animMs,
      })),
    ].map((p) => ({
      ...p,
      el: itemsEl.querySelector<HTMLElement>(`.item[data-poi="${p.id}"]`),
      pad: itemsEl.querySelector<HTMLElement>(`.zonepad[data-zone="${p.id}"]`),
      d: 1e9,
    }));
    this.npcs = [];
    itemsEl.querySelectorAll<HTMLCanvasElement>("canvas[data-npc]").forEach((cv, i) => {
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      const kind: NpcKind = cv.dataset.npc === "deer" ? "deer" : "bear";
      // Slow, occasional gestures — the bear turns its head (~3s a frame),
      // a deer holds its grazing pose longer. Stagger by index so two
      // animals in one scene never move in lockstep.
      const rec: NpcRec = {
        kind,
        ctx,
        frame: 0,
        acc: (i * 1.7) % 3,
        period: kind === "deer" ? 4.2 : 3,
      };
      this.paintNpc(rec);
      this.npcs.push(rec);
    });
  }

  private paintNpc(n: NpcRec): void {
    if (n.kind === "deer") paintDeer(n.ctx, n.frame);
    else paintBear(n.ctx, n.frame);
  }

  private setFrame(f: HikerFrame): void {
    if (f !== this.curFrame && this.hikerCtx) {
      this.curFrame = f;
      paintHiker(this.hikerCtx, f);
    }
  }

  private buildParticles(): void {
    if (!this.refs) return;
    const { stars, motes, fireflies, embers, snowfall } = this.refs;
    stars.innerHTML = "";
    motes.innerHTML = "";
    fireflies.innerHTML = "";
    embers.innerHTML = "";
    snowfall.innerHTML = "";
    // Base starfield + a desert-only booster set (.stX, CSS-gated): the
    // desert night is a huge open sky, so it gets roughly 2.5× the stars.
    for (let i = 0; i < 106; i++) {
      const st = document.createElement("div");
      st.className = i < 42 ? "st" : "st stX";
      st.style.left = `${Math.random() * 100}%`;
      st.style.top = `${Math.random() * 33}%`;
      const sz = Math.random() < 0.3 ? 2 : 1;
      st.style.width = `${sz}px`;
      st.style.height = `${sz}px`;
      st.style.animationDelay = `${Math.random() * 4}s`;
      st.style.animationDuration = `${2 + Math.random() * 3}s`;
      stars.appendChild(st);
    }
    // Sparse falling snow — visible only in the snow scene (CSS-gated), and
    // stays invisible under reduced motion (base opacity 0, animation only).
    for (let i = 0; i < 16; i++) {
      const fl = document.createElement("div");
      fl.className = "flake";
      fl.style.left = `${Math.random() * 100}%`;
      fl.style.setProperty("--sx", `${Math.round(Math.random() * 60 - 30)}px`);
      fl.style.animationDelay = `${Math.random() * 9}s`;
      fl.style.animationDuration = `${8 + Math.random() * 7}s`;
      snowfall.appendChild(fl);
    }
    for (let i = 0; i < 8; i++) {
      const mo = document.createElement("div");
      mo.className = "mote";
      mo.style.left = `${8 + Math.random() * 84}%`;
      mo.style.top = `${15 + Math.random() * 55}%`;
      mo.style.animationDelay = `${Math.random() * 9}s`;
      mo.style.animationDuration = `${8 + Math.random() * 8}s`;
      motes.appendChild(mo);
    }
    for (let i = 0; i < 7; i++) {
      const ff = document.createElement("div");
      ff.className = `ff f${i % 3}`;
      ff.style.left = `${10 + Math.random() * 80}%`;
      ff.style.top = `${66 + Math.random() * 26}%`;
      ff.style.animationDelay = `${Math.random() * 6}s`;
      ff.style.animationDuration = `${7 + Math.random() * 6}s`;
      fireflies.appendChild(ff);
    }
    for (let i = 0; i < 7; i++) {
      const em = document.createElement("div");
      em.className = "em";
      em.style.left = `${34 + Math.random() * 32}%`;
      em.style.top = `${56 + Math.random() * 24}%`;
      em.style.setProperty("--dx", `${Math.random() * 44 - 22}px`);
      em.style.animationDelay = `${Math.random() * 5}s`;
      em.style.animationDuration = `${4 + Math.random() * 3.5}s`;
      embers.appendChild(em);
    }
  }

  /* ---------- input ---------- */

  private onKeyDown = (e: KeyboardEvent): void => {
    if (!e.key) return;
    this.noteInput();
    if (this.modalOpen) return; // the lightbox owns the keyboard while open
    if (this.auto) this.cancelAuto();
    if (e.key === "Escape") {
      this.esc();
      return;
    }
    const t = e.target instanceof Element ? e.target : null;
    if (t && t.closest("button,a,input,textarea,select")) return;
    const k = KEYMAP[e.key.toLowerCase()];
    if (k) {
      this.keys[k] = 1;
      this.target = null;
      this.queue = [];
      if (e.key.startsWith("Arrow")) e.preventDefault();
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    if (!e.key) return;
    const k = KEYMAP[e.key.toLowerCase()];
    if (k) this.keys[k] = 0;
  };

  private noteInput(): void {
    this.lastInput = performance.now();
    this.attractDelay = ATTRACT_IDLE_DELAY;
  }

  private onPointerDown = (e: PointerEvent): void => {
    const t = e.target instanceof Element ? e.target : null;
    this.noteInput();
    if (this.modalOpen) return; // the lightbox owns the pointer while open
    if (this.auto && !(t && t.closest("[data-auto-btn]"))) this.cancelAuto();
    if (this.transitioning) return;
    if (t && t.closest("button,a,.card,.wpw,.tr,.who,[data-auto-btn]")) return;
    if (!this.refs) return;
    const r = this.refs.root.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    let tt = (y - this.seamY) / (this.botY - this.seamY);
    if (tt < -0.08) return;
    tt = Math.max(0, Math.min(1, tt));
    const k = (0.55 + 0.45 * tt) * this.u;
    this.walkTo({ gx: (x - this.w / 2) / k, gy: tt * 100 });
  };

  /* ---------- per-frame ---------- */

  private positionAll(): void {
    if (!this.refs) return;
    for (const w of this.worldEls) {
      const p = this.proj(w.gx, w.gy);
      w.el.style.transform = `translate(${p.x}px,${p.y}px) scale(${p.s})`;
      // Flat ground art stays below every standing billboard (incl. the hiker).
      w.el.style.zIndex = String((w.flat ? 40 : 100) + Math.round(w.gy));
    }
    const hp = this.proj(this.gx, this.gy);
    const bob = this.walking && !this.rm && this.curFrame === "a" ? 1.4 * hp.s : 0;
    this.refs.hiker.style.transform = `translate(${hp.x}px,${hp.y - bob}px) scale(${hp.s})`;
    this.refs.hiker.style.zIndex = String(100 + Math.round(this.gy));
    this.refs.hikerCanvas.style.transform = this.facing < 0 ? "scaleX(-1)" : "";
  }

  /**
   * Drawer connector (round 5 keeps the round-3 character): the info panel is
   * a full-height left drawer; when its source POI is on-screen, a thin
   * accent line runs from the drawer's right edge toward the POI so the eye
   * can find what the panel belongs to. Hidden when the geometry would read
   * as clutter (POI behind the drawer or off-screen, small screens).
   */
  private positionConnector(): void {
    if (!this.refs) return;
    const link = this.refs.link;
    const loc = this.activeId ? poiLocations[this.activeId] : null;
    if (!loc || loc.scene !== this.cur || this.transitioning || this.w < 600) {
      link.classList.remove("on");
      return;
    }
    const card = this.refs.card;
    const x0 = card.offsetLeft + card.offsetWidth;
    const y0 = card.offsetTop + Math.min(card.offsetHeight * 0.3, 170);
    const p = this.proj(loc.gx, loc.gy);
    const tx = p.x;
    const ty = p.y - 46 * p.s;
    const dx = tx - x0;
    const dy = ty - y0;
    if (dx < 48 || tx > this.w - 10 || ty < 8) {
      link.classList.remove("on");
      return;
    }
    link.style.left = `${x0}px`;
    link.style.top = `${y0}px`;
    link.style.width = `${Math.hypot(dx, dy)}px`;
    link.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    link.classList.add("on");
  }

  private stepAuto(dt: number): void {
    const a = this.auto;
    if (!a) return;
    const step = autoRoute[a.idx];
    const loc = poiLocations[step];
    if (a.phase === "dwell") {
      a.timer -= dt;
      if (a.timer <= 0) {
        this.closeCard();
        if (a.mode === "attract") {
          // Loop forever: brief random pause so it reads as wandering, then
          // ping-pong back through the route at the ends.
          this.suppressed = step;
          a.phase = "pause";
          a.timer = 0.5 + Math.random();
        } else {
          a.idx += 1;
          if (a.idx >= autoRoute.length) {
            // Keep the last drawer from instantly reopening via proximity.
            this.suppressed = step;
            this.cancelAuto();
          } else a.phase = "go";
        }
      }
    } else if (a.phase === "pause") {
      a.timer -= dt;
      if (a.timer <= 0) {
        let next = a.idx + a.dir;
        if (next < 0 || next >= autoRoute.length) {
          a.dir = a.dir === 1 ? -1 : 1;
          next = a.idx + a.dir;
        }
        a.idx = next;
        a.phase = "go";
      }
    } else if (a.phase === "go") {
      if (!this.transitioning) {
        if (this.cur !== loc.scene)
          this.requestScene(loc.scene, loc.scene > this.cur ? "left" : "right", {
            ...loc.approach,
          });
        else this.walkVia({ ...loc.approach });
        a.phase = "travel";
      }
    } else if (!this.transitioning && this.cur === loc.scene && !this.target) {
      const anim = loc.anim;
      if (anim && !this.rm && this.itemsEl) {
        const el = this.itemsEl.querySelector<HTMLElement>(`.stn[data-poi="${step}"]`);
        if (el) {
          el.classList.add(anim);
          this.after(loc.animMs ?? 400, () => el.classList.remove(anim));
        }
      }
      this.openCard(step);
      a.phase = "dwell";
      a.timer = a.mode === "attract" ? ATTRACT_DWELL : AUTO_DWELL;
    }
  }

  /**
   * Idle attract mode: the world never sits static. After ~4s on first load
   * (or ~30s of no input later), the hiker starts wandering the route on its
   * own. Never with reduced motion (teleports would be jarring), never over an
   * open card or the lightbox, and any input cancels it instantly.
   */
  private maybeStartAttract(now: number): void {
    if (this.auto || this.rm || this.modalOpen || this.transitioning) return;
    if (this.activeId) return;
    if ((now - this.lastInput) / 1000 < this.attractDelay) return;
    this.startAuto("attract");
  }

  private schedule(): void {
    if (!this.attached) return;
    if (document.hidden) {
      this.hiddenT = window.setTimeout(() => this.tick(performance.now()), 66);
    } else {
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  private tick = (now: number): void => {
    if (!this.attached || !this.refs) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.measure();
    if (!this.itemsEl) {
      this.schedule();
      return;
    }

    this.maybeStartAttract(now);
    this.stepAuto(dt);

    /* movement (round 4: all motion resolves through the blocker slide) */
    if (!this.transitioning) {
      const vx = this.keys.r - this.keys.l;
      const vy = this.keys.d - this.keys.u;
      let moved = false;
      if (vx || vy) {
        const inv = 1 / Math.hypot(vx, vy);
        moved = this.slideTo(
          this.gx + vx * inv * SPEED * dt,
          this.gy + (vy * inv * SPEED * dt) / GW,
        );
        if (vx) this.facing = vx > 0 ? 1 : -1;
      } else if (this.target) {
        const dx = this.target.gx - this.gx;
        const dyw = (this.target.gy - this.gy) * GW;
        const d = Math.hypot(dx, dyw);
        const stp = SPEED * dt;
        if (d <= stp || d < 2) {
          this.gx = this.target.gx;
          this.gy = this.target.gy;
          this.target = this.queue.shift() ?? null;
          moved = this.target !== null;
        } else {
          moved = this.slideTo(this.gx + (dx / d) * stp, this.gy + ((dyw / d) * stp) / GW);
          // Wedged against a blocker: skip to the next waypoint, not stall.
          if (!moved) this.target = this.queue.shift() ?? null;
          if (Math.abs(dx) > 1) this.facing = dx > 0 ? 1 : -1;
        }
      }
      this.walking = moved;
      /* edge exits */
      const ex = scenes[this.cur].exits;
      if (ex.right != null && this.gx > this.gxcl - 6) this.requestScene(ex.right, "left", null);
      else if (ex.left != null && this.gx < -(this.gxcl - 6))
        this.requestScene(ex.left, "right", null);
    } else this.walking = false;

    this.gx = Math.max(-this.gxcl, Math.min(this.gxcl, this.gx));
    this.gy = Math.max(0, Math.min(100, this.gy));

    /* hiker + NPC frames */
    if (this.walking && !this.rm) {
      this.walkAcc += dt;
      this.setFrame(Math.floor(this.walkAcc * 7) % 2 ? "a" : "b");
    } else this.setFrame("idle");
    if (!this.rm) {
      for (const n of this.npcs) {
        n.acc += dt;
        if (n.acc >= n.period) {
          n.acc = 0;
          n.frame = n.frame === 0 ? 1 : 0;
          this.paintNpc(n);
        }
      }
    }

    /* billboards */
    this.positionAll();

    /* proximity drawer zones (round 5): stand near any POI → its drawer
       opens; walk past R_CLOSE → it closes. Opening waits for the hiker to
       stop so walking THROUGH a zone en route elsewhere doesn't flash it. */
    if (!this.transitioning) {
      for (const p of this.pois) {
        p.d = Math.hypot(this.gx - p.gx, (this.gy - p.gy) * GW);
        const inZone = p.d < R_OPEN;
        p.el?.classList.toggle("near", inZone);
        p.pad?.classList.toggle("on", inZone);
      }
      if (!this.auto) {
        if (this.suppressed) {
          const sp = this.pois.find((m) => m.id === this.suppressed);
          if (!sp || sp.d > R_SUPPRESS_CLEAR) this.suppressed = null;
        }
        let best: PoiRec | null = null;
        for (const p of this.pois)
          if (p.d < R_OPEN && p.id !== this.suppressed && (!best || p.d < best.d)) best = p;
        const act = this.activeId
          ? this.pois.find((m) => m.id === this.activeId)
          : undefined;
        if (this.activeId && !act) {
          // Open card belongs to another scene (stale) — drop it.
          this.closeCard();
        } else if (act && act.d > R_CLOSE) {
          this.closeCard();
        } else if (best && best.id !== this.activeId && !this.walking) {
          this.openPoi(best);
        }
      }
    }
    this.positionConnector();

    this.schedule();
  };
}
