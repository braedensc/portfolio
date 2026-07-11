"use client";

/**
 * The explorable world: five walkable scenes (meadow → slot → snow → desert
 * → camp), each a single crisp photo backdrop + a vector sky strip + a
 * rotated ground plane, with a canvas pixel-art hiker, mascot NPCs,
 * furnished set-piece waypoints, and project stations.
 *
 * React renders structure and UI state (open card, scene, auto mode);
 * WorldEngine (engine.ts) owns the game loop and writes transforms directly.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  scenes,
  chips,
  identity,
  aboutText,
  experienceRows,
  recordsStats,
  recordsNote,
  skillGroups,
  bearNote,
  groveNote,
  lakeNote,
  climbingNote,
  photographyNote,
  morePlacesNote,
  finePrint,
  cardMedia,
  galleries,
  photoCaption,
  projects,
  todoclawUrl,
  type CardId,
} from "@/content/site";
import { WorldEngine } from "./engine";
import { DecorArt, HawkArt, SignArt, SetPieceArt, SkyDriftArt, StationArt } from "./scenes";
import { Lightbox } from "./Lightbox";
import { HIKER } from "./sprites";
import "./world.css";

/** Human-readable card titles — reused for gallery alt text / lightbox labels. */
const CARD_TITLES: Record<CardId, string> = {
  about: "About",
  experience: "Experience",
  athletics: "Records",
  bear: "The bear",
  grove: "Sequoia grove",
  lake: "Mountain lake",
  climbing: "Climbing",
  skills: "Skills",
  photography: "Photography",
  todoclaw: "Todoclaw",
  chefclaw: "ChefClaw",
  contact: "Contact",
};

/** Tiny deterministic PRNG — the bees' wander paths are seeded, so server
 *  and client render identical markup (no hydration drift). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Yellow jackets roaming the whole meadow (round 4B: bigger, readable
 * striped bodies, and no longer tied to the GT sign). Each bee gets a
 * seeded lazy Lissajous wander: two nested layers animating X and Y over
 * different periods, plus a quick wing flap. CSS-gated to the meadow;
 * hidden entirely under reduced motion.
 */
function MeadowBees() {
  const bees = Array.from({ length: 5 }, (_, i) => {
    const rnd = mulberry32(97 + i * 41);
    return {
      left: 8 + rnd() * 80,
      top: 62 + rnd() * 27,
      rx: 90 + rnd() * 240,
      ry: 24 + rnd() * 54,
      dx: 26 + rnd() * 22,
      dy: 7 + rnd() * 5,
      delx: -rnd() * 30,
      dely: -rnd() * 9,
    };
  });
  return (
    <div className="bees" aria-hidden="true">
      {bees.map((b, i) => (
        <div
          key={i}
          className="beeR"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            ["--brx" as string]: `${b.rx}px`,
            animationDuration: `${b.dx}s`,
            animationDelay: `${b.delx}s`,
          }}
        >
          <div
            className="beeRy"
            style={{
              ["--bry" as string]: `${b.ry}px`,
              animationDuration: `${b.dy}s`,
              animationDelay: `${b.dely}s`,
            }}
          >
            <svg width="22" height="18" viewBox="0 0 22 18">
              <ellipse className="beeWing" cx="8" cy="4.5" rx="4.4" ry="2.8" fill="#f0eee6" opacity="0.85" />
              <ellipse className="beeWing beeWingB" cx="13" cy="4.5" rx="4" ry="2.5" fill="#e2ddd0" opacity="0.75" />
              <ellipse cx="10" cy="11" rx="7.5" ry="5" fill="#e8b93d" />
              <path d="M6.6 6.8L6.6 15.4M10.2 6.2L10.2 15.8M13.8 6.8L13.8 15.4" stroke="#26201c" strokeWidth="2" />
              <circle cx="17.8" cy="9.6" r="2.8" fill="#26201c" />
              <path d="M2.6 11.4L0.8 12.8" stroke="#26201c" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

function CardMediaImg({ id }: { id: CardId }) {
  const media = cardMedia[id];
  if (!media) return null;
  return (
    <>
      <img className="cardImg" src={media.src} alt={media.alt} />
      {media.caption ? <p className="cap">{media.caption}</p> : null}
    </>
  );
}

/** PHOTOS row — thumbnails for a card's gallery; clicking opens the lightbox. */
function GalleryRow({ id, onOpen }: { id: CardId; onOpen: (index: number) => void }) {
  const images = galleries[id];
  if (!images || images.length === 0) return null;
  return (
    <div className="gal">
      <div className="galLabel">PHOTOS</div>
      <div className="galRow">
        {images.map((src, i) => (
          <button
            key={src}
            className="galThumb"
            aria-label={`Open ${CARD_TITLES[id]} photo ${i + 1} of ${images.length}`}
            onClick={() => onOpen(i)}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CardContent({
  id,
  onOpenGallery,
}: {
  id: CardId;
  onOpenGallery: (id: CardId, index: number) => void;
}) {
  const todoclaw = projects[0];
  const chefclaw = projects[1];
  const gallery = <GalleryRow id={id} onOpen={(i) => onOpenGallery(id, i)} />;
  switch (id) {
    case "about":
      return (
        <div>
          <div className="ct">About</div>
          <CardMediaImg id="about" />
          <p>{aboutText}</p>
          {gallery}
        </div>
      );
    case "experience":
      return (
        <div>
          <div className="ct">Experience</div>
          <CardMediaImg id="experience" />
          {experienceRows.map((row) => (
            <p key={row.period}>
              {row.period} · {row.org} — {row.detail}
            </p>
          ))}
          {gallery}
        </div>
      );
    case "athletics":
      return (
        <div>
          <div className="ct">Records</div>
          <p className="recs">{recordsStats}</p>
          <p>{recordsNote}</p>
          {gallery}
        </div>
      );
    case "bear":
      return (
        <div>
          <div className="ct">The bear</div>
          <CardMediaImg id="bear" />
          <p>{bearNote}</p>
        </div>
      );
    case "grove":
      return (
        <div>
          <div className="ct">Sequoia grove</div>
          <CardMediaImg id="grove" />
          <p>{groveNote}</p>
        </div>
      );
    case "lake":
      return (
        <div>
          <div className="ct">Mountain lake</div>
          <CardMediaImg id="lake" />
          <p>{lakeNote}</p>
          {gallery}
        </div>
      );
    case "climbing":
      return (
        <div>
          <div className="ct">Climbing</div>
          <CardMediaImg id="climbing" />
          <p>{climbingNote}</p>
        </div>
      );
    case "skills":
      return (
        <div>
          <div className="ct">Skills</div>
          <ul className="skills">
            {skillGroups.map((group) => (
              <li key={group}>{group}</li>
            ))}
          </ul>
          {gallery}
        </div>
      );
    case "photography":
      return (
        <div>
          <div className="ct">Photography</div>
          <CardMediaImg id="photography" />
          <p>{photographyNote}</p>
          <p className="note">{morePlacesNote}</p>
          {gallery}
        </div>
      );
    case "todoclaw":
      return (
        <div>
          <div className="ct">Project — Todoclaw</div>
          <p>
            <strong>{todoclaw.name}</strong> — {todoclaw.description} {todoclaw.stack}.{" "}
            {todoclaw.status}
          </p>
          <button
            className="go"
            onClick={() => {
              window.open(todoclawUrl, "_blank", "noopener,noreferrer");
            }}
          >
            Open Todoclaw
          </button>
        </div>
      );
    case "chefclaw":
      return (
        <div>
          <div className="ct">Project — ChefClaw</div>
          <p>
            <strong>{chefclaw.name}</strong> — {chefclaw.description} {chefclaw.stack}.
          </p>
          <p className="note">{chefclaw.status}</p>
        </div>
      );
    case "contact":
      return (
        <div>
          <div className="ct">Contact</div>
          <a className="mailto" href={`mailto:${identity.email}`}>
            {identity.email}
          </a>
          <p>
            <a href={identity.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            · <span className="inert">LinkedIn</span> · <span className="inert">Resume</span>
          </p>
          {gallery}
        </div>
      );
  }
}

export default function World() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [card, setCard] = useState<CardId | null>(null);
  const [userNight, setUserNight] = useState(false);
  const [autoOn, setAutoOn] = useState(false);
  const [attractOn, setAttractOn] = useState(false);
  const [hintOn, setHintOn] = useState(true);
  const [lightbox, setLightbox] = useState<{ id: CardId; index: number } | null>(null);

  const engineRef = useRef<WorldEngine | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const faderRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const hikerRef = useRef<HTMLDivElement>(null);
  const hikerCvRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const motesRef = useRef<HTMLDivElement>(null);
  const ffsRef = useRef<HTMLDivElement>(null);
  const embersRef = useRef<HTMLDivElement>(null);
  const snowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const engine = new WorldEngine({
      setScene: setSceneIdx,
      setCard,
      setAuto: setAutoOn,
      setAttract: setAttractOn,
    });
    engineRef.current = engine;
    engine.attach({
      root: rootRef.current!,
      backdrop: backdropRef.current!,
      sky: skyRef.current!,
      ground: groundRef.current!,
      fader: faderRef.current!,
      card: cardRef.current!,
      link: linkRef.current!,
      hiker: hikerRef.current!,
      hikerCanvas: hikerCvRef.current!,
      fx: fxRef.current!,
      stars: starsRef.current!,
      motes: motesRef.current!,
      fireflies: ffsRef.current!,
      embers: embersRef.current!,
      snowfall: snowRef.current!,
    });
    return () => {
      engine.detach();
      engineRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (itemsRef.current) engineRef.current?.sceneMounted(sceneIdx, itemsRef.current);
  }, [sceneIdx]);

  useEffect(() => {
    const t = window.setTimeout(() => setHintOn(false), 6000);
    return () => window.clearTimeout(t);
  }, []);

  // The lightbox owns input while open — the engine must not walk/close cards.
  useEffect(() => {
    engineRef.current?.setModalOpen(lightbox !== null);
  }, [lightbox]);

  const scene = scenes[sceneIdx];
  const night = Boolean(scene.alwaysNight) || userNight;
  const lbImages = lightbox ? (galleries[lightbox.id] ?? []) : [];

  return (
    <div ref={rootRef} className={`world ${scene.cls}${night ? " night" : ""}`}>
      <div className="world-scene" role="img" aria-label={scene.aria}>
        <div
          ref={backdropRef}
          className="plane"
          style={{ backgroundImage: `url(${scene.img})`, backgroundPosition: scene.bgPos }}
        >
          {/* waterfall accent drawn onto the meadow backdrop's crag side
              (CSS-gated to sc-meadow; rides the plane's parallax) */}
          <div className="falls" aria-hidden="true" />
        </div>
        <div ref={skyRef} className="skyDrift" aria-hidden="true">
          <SkyDriftArt />
        </div>
        <div ref={starsRef} className="stars" />
        <div className="shafts">
          <div className="shaft s1" />
          <div className="shaft s2" />
          <div className="shaft s3" />
        </div>
        <div className="beam">
          <div className="bw" />
          {/* dust motes drifting inside the light beam (slot canyon) */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className={`bmote bm${i}`} />
          ))}
        </div>
        {/* per-scene sky ambience (CSS-gated): snow-night aurora, desert
            heat shimmer (day) and a circling hawk silhouette */}
        <div className="aurora" aria-hidden="true" />
        <div className="heatShimmer" aria-hidden="true" />
        <div className="hawkPath" aria-hidden="true">
          <div className="hawkDrift">
            <HawkArt />
          </div>
        </div>
        <div ref={groundRef} className="ground">
          <div className="mottle m1" />
          <div className="mottle m2" />
          <div className="groundTex" />
          <div className="sandl" />
          <div className="beamspot" />
          <div className="fglow" />
        </div>
        <div className="seam" />
        <div className="cw cwL" />
        <div className="cw cwR" />
        <div className="items">
          <div key={sceneIdx} ref={itemsRef} className="sceneItems">
            {scene.decor.map((d, i) => (
              <div
                key={`d${i}`}
                className="item decor"
                data-gx={d.gx}
                data-gy={d.gy}
                data-kind={d.kind}
                data-flat={d.flat ? "1" : undefined}
                aria-hidden="true"
              >
                <div className="in">
                  <DecorArt kind={d.kind} v={d.v} />
                </div>
              </div>
            ))}
            {scene.signs.map((s) => (
              <div key={s.text} className="item spost" data-gx={s.gx} data-gy={s.gy}>
                <div className="in">
                  <div className="mlabel" aria-hidden="true">
                    {s.text}
                  </div>
                  <SignArt />
                </div>
              </div>
            ))}
            {scene.setPieces.map((p) => (
              <div
                key={p.id}
                className="item setp"
                data-gx={p.gx}
                data-gy={p.gy}
                data-kind={p.kind}
                data-poi={p.id}
              >
                <div className="in">
                  {/* discovery pieces (bear, mirror lake, grove) stay unlabeled */}
                  {!p.discovery && (
                    <div className="mlabel" aria-hidden="true">
                      {p.label}
                    </div>
                  )}
                  <div className="gem" />
                  <button
                    className="pbtn"
                    aria-label={`Open ${p.label}`}
                    onClick={() => engineRef.current?.setPieceClick(p)}
                  >
                    <SetPieceArt kind={p.kind} />
                  </button>
                </div>
              </div>
            ))}
            {scene.stations.map((s) => (
              <div
                key={s.id}
                className="item stn"
                data-gx={s.gx}
                data-gy={s.gy}
                data-kind={s.kind}
                data-poi={s.id}
              >
                <div className="in">
                  <div className="slabel" aria-hidden="true">
                    {s.label}
                  </div>
                  <div className="gem gemS" />
                  <button
                    className="stbtn"
                    aria-label={`Open ${s.label}`}
                    onClick={() => engineRef.current?.stationClick(s)}
                  >
                    <StationArt kind={s.kind} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div ref={hikerRef} className="item hiker">
            <div className="in">
              <div className="lant" />
              {/* cold-air breath puff, snow scene only (CSS-gated) */}
              <div className="breath" />
              <canvas
                ref={hikerCvRef}
                width={HIKER.w}
                height={HIKER.h}
                className="hikerCv"
                aria-hidden="true"
              />
            </div>
          </div>
          <div ref={fxRef} className="fx" />
        </div>
        <div ref={ffsRef} className="ffs" />
        <div ref={embersRef} className="embers" />
        <div ref={snowRef} className="snowfall" />
        <MeadowBees />
        <div className="groundDark" />
        <div className="tint" />
      </div>
      <div className="bandT" />
      <div className="bandB" />
      <div className="vignette" />
      <div ref={motesRef} className="motes" />
      <div ref={faderRef} className="fader" />

      <div ref={linkRef} className="cardLink" aria-hidden="true" />
      <div ref={cardRef} className={`card${card ? " on" : ""}`} aria-live="polite">
        {card ? (
          <>
            <button
              className="cardClose"
              aria-label="Close note"
              onClick={() => engineRef.current?.dismissCard()}
            >
              ×
            </button>
            {/* the shell stays put (✕ always visible); only the body scrolls */}
            <div className="cardBody">
              <CardContent id={card} onOpenGallery={(id, index) => setLightbox({ id, index })} />
            </div>
          </>
        ) : null}
      </div>

      {lightbox && lbImages.length > 0 ? (
        <Lightbox
          images={lbImages}
          index={Math.min(lightbox.index, lbImages.length - 1)}
          label={CARD_TITLES[lightbox.id]}
          caption={photoCaption}
          onNavigate={(index) => setLightbox({ id: lightbox.id, index })}
          onClose={() => setLightbox(null)}
        />
      ) : null}

      <header className="who">
        <h1>{identity.name}</h1>
        <p>{identity.role}</p>
      </header>
      <div className="scind">
        {scene.name} — {scene.theme} · {sceneIdx + 1}/{scenes.length}
      </div>
      {attractOn && (
        <div className="watchHint" aria-hidden="true">
          WATCHING — PRESS ANY KEY TO EXPLORE
        </div>
      )}
      <button
        className="autoBtn"
        data-auto-btn="true"
        aria-pressed={autoOn}
        aria-label={autoOn ? "Pause the route" : "Play the route"}
        onClick={() => engineRef.current?.toggleAuto()}
      >
        <span aria-hidden="true">{autoOn ? "⏸" : "▶"}</span> PLAY THE ROUTE
      </button>
      <div className="tr">
        <Link href="/plain" className="simple">
          SIMPLE VIEW
        </Link>
        {!scene.alwaysNight && (
          <button
            className="dayNight"
            aria-pressed={userNight}
            aria-label={userNight ? "Switch to day" : "Switch to night"}
            onClick={() => setUserNight((v) => !v)}
          >
            {userNight ? "☀" : "☾"}
          </button>
        )}
        <div className={`hint${hintOn ? "" : " off"}`}>WASD / CLICK — WALK</div>
      </div>
      <nav className="chips" aria-label="Sections">
        {chips.map((c) => (
          <button
            key={c.poi}
            aria-label={`Travel to ${c.label}`}
            onClick={() => engineRef.current?.travelTo(c.poi)}
          >
            {c.label}
          </button>
        ))}
      </nav>
      <div className="fine">{finePrint}</div>
    </div>
  );
}
