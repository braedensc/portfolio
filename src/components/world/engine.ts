/**
 * The world engine: game loop, keyboard/pointer movement, click-to-move,
 * camera deadzone panning, parallax planes, billboard projection, NPC idle
 * animation, proximity cards, scene transitions, and auto mode.
 *
 * React owns UI state (which card is open, which scene renders, auto on/off)
 * via the EngineHooks callbacks; the engine owns all per-frame math and writes
 * transforms imperatively. Ported from the approved vanilla mock (l-route).
 */

import {
  scenes,
  poiLocations,
  autoRoute,
  type CardId,
  type SetPiece,
  type Station,
  type Vec,
} from "@/content/site";
import { paintHiker, paintDog, paintChef, type HikerFrame } from "./sprites";

export interface EngineHooks {
  setScene: (idx: number) => void;
  setCard: (id: CardId | null) => void;
  setAuto: (running: boolean) => void;
}

export interface AttachRefs {
  root: HTMLElement;
  planes: [HTMLElement, HTMLElement, HTMLElement];
  ground: HTMLElement;
  fader: HTMLElement;
  card: HTMLElement;
  hiker: HTMLElement;
  hikerCanvas: HTMLCanvasElement;
  fx: HTMLElement;
  stars: HTMLElement;
  motes: HTMLElement;
  fireflies: HTMLElement;
  embers: HTMLElement;
}

type Side = "left" | "right" | null;
type Dir = "l" | "r" | "u" | "d";

const GW = 2.5; // gy-to-gx distance weighting
const SPEED = 182; // 140 in the approved mock × 1.3 (client feedback: brisker)
const AUTO_DWELL = 4.5; // seconds a card stays open in auto mode

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
}

interface PieceRec {
  id: CardId;
  gx: number;
  gy: number;
  d: number;
}

interface StationRec {
  el: HTMLElement;
  gx: number;
  gy: number;
}

interface NpcRec {
  ctx: CanvasRenderingContext2D;
  kind: "dog" | "chef";
  frame: 0 | 1;
  acc: number;
  period: number;
}

interface AutoState {
  idx: number;
  phase: "go" | "travel" | "dwell";
  timer: number;
}

function setPlane(el: HTMLElement, z: number, f: number, p: number): void {
  const s = (1000 - z) / 1000;
  el.style.transform = `translate3d(${-p * f * s}px,0,${z}px) scale(${s})`;
}

export class WorldEngine {
  private hooks: EngineHooks;
  private refs: AttachRefs | null = null;
  private attached = false;
  private rm = false;

  private gx = 0;
  private gy = 58;
  private camX = 0;
  private facing = 1;
  private target: Vec | null = null;
  private walkAcc = 0;
  private walking = false;
  private curFrame: HikerFrame = "idle";
  private keys: Record<Dir, 0 | 1> = { l: 0, r: 0, u: 0, d: 0 };

  private cur = 0;
  private gxcl = scenes[0].gxClamp;
  private camcl = scenes[0].camClamp;
  private transitioning = false;
  private pending: { idx: number; side: Side; thenTarget: Vec | null } | null = null;

  private activeId: CardId | null = null;
  private suppressed: CardId | null = null;
  private auto: AutoState | null = null;

  private itemsEl: HTMLElement | null = null;
  private worldEls: WorldItem[] = [];
  private pieces: PieceRec[] = [];
  private stns: StationRec[] = [];
  private npcs: NpcRec[] = [];
  private hikerCtx: CanvasRenderingContext2D | null = null;

  private w = 0;
  private h = 0;
  private seamY = 0;
  private botY = 0;

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
      [this.refs.stars, this.refs.motes, this.refs.fireflies, this.refs.embers].forEach(
        (el) => {
          el.innerHTML = "";
        },
      );
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
    this.camcl = sc.camClamp;
    const pending = this.pending;
    this.pending = null;
    const side = pending ? pending.side : null;
    if (side === "left") this.gx = -(this.gxcl - 90);
    else if (side === "right") this.gx = this.gxcl - 90;
    else if (!pending) this.gx = 0;
    this.gy = Math.max(20, Math.min(92, this.gy));
    this.camX = Math.max(-this.camcl, Math.min(this.camcl, this.gx));
    this.target = null;
    this.suppressed = null;
    this.rescan(itemsEl, idx);
    this.measure();
    this.positionAll();
    this.paintPlanes(0);
    if (pending && pending.thenTarget) this.walkTo(pending.thenTarget);
    if (this.transitioning) {
      if (this.rm) this.transitioning = false;
      else
        this.after(80, () => {
          this.refs?.fader.classList.remove("on");
          this.transitioning = false;
        });
    }
  }

  /* ---------- public interactions (called from React handlers) ---------- */

  travelTo(poi: CardId): void {
    const loc = poiLocations[poi];
    this.suppressed = null;
    if (loc.scene === this.cur) this.walkTo({ ...loc.approach });
    else
      this.requestScene(loc.scene, loc.scene > this.cur ? "left" : "right", {
        ...loc.approach,
      });
  }

  setPieceClick(p: SetPiece): void {
    if (this.transitioning) return;
    this.suppressed = null;
    const d = Math.hypot(this.gx - p.gx, (this.gy - p.gy) * GW);
    if (d > 85) this.walkTo({ ...p.approach });
    else this.openCard(p.id);
  }

  stationClick(s: Station): void {
    if (this.transitioning) return;
    const el = this.itemsEl?.querySelector<HTMLElement>(`.stn[data-poi="${s.id}"]`);
    if (el && el.dataset.busy) return;
    this.suppressed = null;
    const d = Math.hypot(this.gx - s.gx, (this.gy - s.gy) * GW);
    if (d > 85)
      this.walkTo({ gx: s.gx + (this.gx < s.gx ? -52 : 52), gy: Math.min(96, s.gy + 12) });
    if (s.anim && !this.rm && el) {
      el.dataset.busy = "1";
      el.classList.add(s.anim);
      const anim = s.anim;
      this.after(s.animMs, () => {
        el.classList.remove(anim);
        delete el.dataset.busy;
        this.openCard(s.id);
      });
    } else this.openCard(s.id);
  }

  toggleAuto(): void {
    if (this.auto) this.cancelAuto();
    else this.startAuto();
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

  private closeCard(): void {
    this.activeId = null;
    this.hooks.setCard(null);
  }

  private esc(): void {
    if (this.activeId) {
      const loc = poiLocations[this.activeId];
      if (loc && loc.type === "setpiece") this.suppressed = this.activeId;
      this.closeCard();
    }
    this.target = null;
  }

  private startAuto(): void {
    this.suppressed = null;
    this.closeCard();
    this.keys = { l: 0, r: 0, u: 0, d: 0 };
    this.target = null;
    this.auto = { idx: 0, phase: "go", timer: 0 };
    this.hooks.setAuto(true);
  }

  private cancelAuto(): void {
    if (!this.auto) return;
    this.auto = null;
    this.hooks.setAuto(false);
  }

  private measure(): void {
    if (!this.refs) return;
    this.w = this.refs.root.clientWidth;
    this.h = this.refs.root.clientHeight;
    this.seamY = 0.615 * this.h;
    this.botY = 0.93 * this.h;
  }

  private proj(px: number, py: number): { x: number; y: number; s: number } {
    const t = py / 100;
    return {
      x: this.w / 2 + (px - this.camX) * (0.55 + 0.45 * t),
      y: this.seamY + (this.botY - this.seamY) * t,
      s: 0.62 + 0.63 * t,
    };
  }

  private walkTo(tg: Vec): void {
    const t = {
      gx: Math.max(-this.gxcl, Math.min(this.gxcl, tg.gx)),
      gy: Math.max(0, Math.min(100, tg.gy)),
    };
    if (this.rm) {
      this.gx = t.gx;
      this.gy = t.gy;
      this.target = null;
    } else this.target = t;
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
    if (this.transitioning) return;
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
      this.worldEls.push({ el, gx: Number(el.dataset.gx), gy: Number(el.dataset.gy) });
    });
    this.stns = [];
    itemsEl.querySelectorAll<HTMLElement>(".item.stn").forEach((el) => {
      this.stns.push({ el, gx: Number(el.dataset.gx), gy: Number(el.dataset.gy) });
    });
    this.pieces = sc.setPieces.map((p) => ({ id: p.id, gx: p.gx, gy: p.gy, d: 1e9 }));
    this.npcs = [];
    itemsEl.querySelectorAll<HTMLCanvasElement>("canvas[data-npc]").forEach((cv) => {
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      const kind: "dog" | "chef" = cv.dataset.npc === "chef" ? "chef" : "dog";
      const rec: NpcRec = {
        ctx,
        kind,
        frame: 0,
        acc: kind === "chef" ? 0.5 : 0,
        period: kind === "chef" ? 1 : 1.6,
      };
      this.paintNpc(rec);
      this.npcs.push(rec);
    });
  }

  private paintNpc(n: NpcRec): void {
    if (n.kind === "dog") paintDog(n.ctx, n.frame);
    else paintChef(n.ctx, n.frame);
  }

  private setFrame(f: HikerFrame): void {
    if (f !== this.curFrame && this.hikerCtx) {
      this.curFrame = f;
      paintHiker(this.hikerCtx, f);
    }
  }

  private buildParticles(): void {
    if (!this.refs) return;
    const { stars, motes, fireflies, embers } = this.refs;
    stars.innerHTML = "";
    motes.innerHTML = "";
    fireflies.innerHTML = "";
    embers.innerHTML = "";
    for (let i = 0; i < 42; i++) {
      const st = document.createElement("div");
      st.className = "st";
      st.style.left = `${Math.random() * 100}%`;
      st.style.top = `${Math.random() * 33}%`;
      const sz = Math.random() < 0.3 ? 2 : 1;
      st.style.width = `${sz}px`;
      st.style.height = `${sz}px`;
      st.style.animationDelay = `${Math.random() * 4}s`;
      st.style.animationDuration = `${2 + Math.random() * 3}s`;
      stars.appendChild(st);
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
      if (e.key.startsWith("Arrow")) e.preventDefault();
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    if (!e.key) return;
    const k = KEYMAP[e.key.toLowerCase()];
    if (k) this.keys[k] = 0;
  };

  private onPointerDown = (e: PointerEvent): void => {
    const t = e.target instanceof Element ? e.target : null;
    if (this.auto && !(t && t.closest("[data-auto-btn]"))) this.cancelAuto();
    if (this.transitioning) return;
    if (t && t.closest("button,a,.card,.chips,.tr,.who,[data-auto-btn]")) return;
    if (!this.refs) return;
    const r = this.refs.root.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    let tt = (y - this.seamY) / (this.botY - this.seamY);
    if (tt < -0.08) return;
    tt = Math.max(0, Math.min(1, tt));
    const k = 0.55 + 0.45 * tt;
    this.walkTo({ gx: (x - this.w / 2) / k + this.camX, gy: tt * 100 });
  };

  /* ---------- per-frame ---------- */

  private paintPlanes(dt: number): void {
    if (!this.refs) return;
    const t = this.gy / 100;
    const k = 0.55 + 0.45 * t;
    const sx = (this.gx - this.camX) * k;
    const dz = 0.18 * this.w;
    let tc = this.camX;
    if (sx > dz) tc = this.gx - dz / k;
    else if (sx < -dz) tc = this.gx + dz / k;
    tc = Math.max(-this.camcl, Math.min(this.camcl, tc));
    this.camX = this.rm || dt === 0 ? tc : this.camX + (tc - this.camX) * Math.min(1, dt * 6);
    const p = this.camX * 0.9;
    setPlane(this.refs.planes[0], -420, 0.25, p);
    setPlane(this.refs.planes[1], -220, 0.5, p);
    setPlane(this.refs.planes[2], -70, 0.8, p);
    this.refs.ground.style.transform = `translate3d(${-this.camX * 0.72}px,0,0) rotateX(64deg)`;
  }

  private positionAll(): void {
    if (!this.refs) return;
    for (const w of this.worldEls) {
      const p = this.proj(w.gx, w.gy);
      w.el.style.transform = `translate(${p.x}px,${p.y}px) scale(${p.s})`;
      w.el.style.zIndex = String(100 + Math.round(w.gy));
    }
    const hp = this.proj(this.gx, this.gy);
    const bob = this.walking && !this.rm && this.curFrame === "a" ? 1.4 * hp.s : 0;
    this.refs.hiker.style.transform = `translate(${hp.x}px,${hp.y - bob}px) scale(${hp.s})`;
    this.refs.hiker.style.zIndex = String(100 + Math.round(this.gy));
    this.refs.hikerCanvas.style.transform = this.facing < 0 ? "scaleX(-1)" : "";
  }

  private positionCard(): void {
    if (!this.refs || !this.activeId) return;
    const loc = poiLocations[this.activeId];
    if (!loc || loc.scene !== this.cur) return;
    const card = this.refs.card;
    const p = this.proj(loc.gx, loc.gy);
    const cw = card.offsetWidth || 320;
    const ch = card.offsetHeight || 200;
    const cx = Math.max(cw / 2 + 8, Math.min(this.w - cw / 2 - 8, p.x));
    let by = p.y - 72 * p.s;
    const hp = this.proj(this.gx, this.gy);
    if (Math.abs(hp.x - cx) < cw / 2 + 26) by = Math.min(by, hp.y - 72 * hp.s - 8);
    if (by - ch < 52) by = 52 + ch;
    card.style.left = `${cx}px`;
    card.style.bottom = `${this.h - by}px`;
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
        a.idx += 1;
        if (a.idx >= autoRoute.length) {
          // Keep the last card from instantly reopening via proximity.
          if (loc.type === "setpiece") this.suppressed = step;
          this.cancelAuto();
        } else a.phase = "go";
      }
    } else if (a.phase === "go") {
      if (!this.transitioning) {
        if (this.cur !== loc.scene)
          this.requestScene(loc.scene, loc.scene > this.cur ? "left" : "right", {
            ...loc.approach,
          });
        else this.walkTo({ ...loc.approach });
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
      a.timer = AUTO_DWELL;
    }
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

    this.stepAuto(dt);

    /* movement */
    if (!this.transitioning) {
      const vx = this.keys.r - this.keys.l;
      const vy = this.keys.d - this.keys.u;
      let moved = false;
      if (vx || vy) {
        const inv = 1 / Math.hypot(vx, vy);
        this.gx += vx * inv * SPEED * dt;
        this.gy += (vy * inv * SPEED * dt) / GW;
        moved = true;
        if (vx) this.facing = vx > 0 ? 1 : -1;
      } else if (this.target) {
        const dx = this.target.gx - this.gx;
        const dyw = (this.target.gy - this.gy) * GW;
        const d = Math.hypot(dx, dyw);
        const stp = SPEED * dt;
        if (d <= stp || d < 2) {
          this.gx = this.target.gx;
          this.gy = this.target.gy;
          this.target = null;
        } else {
          this.gx += (dx / d) * stp;
          this.gy += (dyw / d) * stp / GW;
          moved = true;
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

    /* camera + planes + billboards */
    this.paintPlanes(dt);
    this.positionAll();

    /* proximity */
    if (!this.transitioning) {
      for (const s of this.stns) {
        const d = Math.hypot(this.gx - s.gx, (this.gy - s.gy) * GW);
        s.el.classList.toggle("near", d < 95);
      }
      if (!this.auto) {
        let best: PieceRec | null = null;
        let bd = 1e9;
        for (const m of this.pieces) {
          m.d = Math.hypot(this.gx - m.gx, (this.gy - m.gy) * GW);
          if (m.d < bd) {
            bd = m.d;
            best = m;
          }
        }
        const act = this.activeId ? poiLocations[this.activeId] : null;
        if (act && act.type === "station") {
          const sd = Math.hypot(this.gx - act.gx, (this.gy - act.gy) * GW);
          if (sd > 135 && !this.target) this.closeCard();
        } else {
          if (this.suppressed) {
            const sp = this.pieces.find((m) => m.id === this.suppressed);
            if (!sp || sp.d > 70) this.suppressed = null;
          }
          const cand = best && bd < 55 && best.id !== this.suppressed ? best.id : null;
          if (cand !== this.activeId) {
            // Hysteresis: a set-piece card opened by click stays up until ~95.
            const curPiece = this.activeId
              ? this.pieces.find((m) => m.id === this.activeId)
              : undefined;
            const keepOpen = !cand && curPiece !== undefined && curPiece.d < 95;
            if (!keepOpen) {
              if (cand) this.openCard(cand);
              else this.closeCard();
            }
          }
        }
      }
      if (this.activeId) this.positionCard();
    }

    this.schedule();
  };
}
