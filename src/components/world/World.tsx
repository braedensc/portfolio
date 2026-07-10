"use client";

/**
 * The explorable world: three walkable scenes (camp → meadow → slot) rendered
 * as parallax photo planes + a rotated ground plane, with a canvas pixel-art
 * hiker, mascot NPCs, furnished set-piece waypoints, and project stations.
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
  photographyNote,
  morePlacesNote,
  finePrint,
  cardMedia,
  projects,
  todoclawUrl,
  type CardId,
} from "@/content/site";
import { WorldEngine } from "./engine";
import { DecorArt, SignArt, SetPieceArt, StationArt } from "./scenes";
import { HIKER, DOG, CHEF } from "./sprites";
import "./world.css";

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

function CardContent({ id }: { id: CardId }) {
  const todoclaw = projects[0];
  const chefclaw = projects[1];
  switch (id) {
    case "about":
      return (
        <div>
          <div className="ct">About</div>
          <CardMediaImg id="about" />
          <p>{aboutText}</p>
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
        </div>
      );
    case "photography":
      return (
        <div>
          <div className="ct">Photography</div>
          <CardMediaImg id="photography" />
          <p>{photographyNote}</p>
          <p className="note">{morePlacesNote}</p>
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
        </div>
      );
  }
}

export default function World() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [card, setCard] = useState<CardId | null>(null);
  const [userNight, setUserNight] = useState(false);
  const [autoOn, setAutoOn] = useState(false);
  const [hintOn, setHintOn] = useState(true);

  const engineRef = useRef<WorldEngine | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pDeepRef = useRef<HTMLDivElement>(null);
  const pMidRef = useRef<HTMLDivElement>(null);
  const pNearRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const faderRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hikerRef = useRef<HTMLDivElement>(null);
  const hikerCvRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const motesRef = useRef<HTMLDivElement>(null);
  const ffsRef = useRef<HTMLDivElement>(null);
  const embersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const engine = new WorldEngine({ setScene: setSceneIdx, setCard, setAuto: setAutoOn });
    engineRef.current = engine;
    engine.attach({
      root: rootRef.current!,
      planes: [pDeepRef.current!, pMidRef.current!, pNearRef.current!],
      ground: groundRef.current!,
      fader: faderRef.current!,
      card: cardRef.current!,
      hiker: hikerRef.current!,
      hikerCanvas: hikerCvRef.current!,
      fx: fxRef.current!,
      stars: starsRef.current!,
      motes: motesRef.current!,
      fireflies: ffsRef.current!,
      embers: embersRef.current!,
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

  const scene = scenes[sceneIdx];
  const night = Boolean(scene.alwaysNight) || userNight;

  return (
    <div ref={rootRef} className={`world ${scene.cls}${night ? " night" : ""}`}>
      <div className="world-scene" role="img" aria-label={scene.aria}>
        <div
          ref={pDeepRef}
          className="plane pDeep"
          style={{ backgroundImage: `url(${scene.img})`, backgroundPosition: scene.bgPos }}
        />
        <div
          ref={pMidRef}
          className="plane pMid"
          style={{ backgroundImage: `url(${scene.img})`, backgroundPosition: scene.bgPos }}
        />
        <div
          ref={pNearRef}
          className="plane pNear"
          style={{ backgroundImage: `url(${scene.img})`, backgroundPosition: scene.bgPos }}
        />
        <div ref={starsRef} className="stars" />
        <div className="shafts">
          <div className="shaft s1" />
          <div className="shaft s2" />
          <div className="shaft s3" />
        </div>
        <div className="beam">
          <div className="bw" />
        </div>
        <div ref={groundRef} className="ground">
          <div className="mottle m1" />
          <div className="mottle m2" />
          <div className="trail t1" />
          <div className="trail t2" />
          <div className="trail t3" />
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
                aria-hidden="true"
              >
                <div className="in">
                  <DecorArt kind={d.kind} />
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
              <div key={p.id} className="item setp" data-gx={p.gx} data-gy={p.gy} data-poi={p.id}>
                <div className="in">
                  <div className="mlabel" aria-hidden="true">
                    {p.label}
                  </div>
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
              <div key={s.id} className="item stn" data-gx={s.gx} data-gy={s.gy} data-poi={s.id}>
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
            {scene.npcs.map((n) => (
              <div key={n.kind} className="item npc" data-gx={n.gx} data-gy={n.gy}>
                <div className="in">
                  <canvas
                    data-npc={n.kind}
                    width={n.kind === "dog" ? DOG.w : CHEF.w}
                    height={n.kind === "dog" ? DOG.h : CHEF.h}
                    className={`npcCv ${n.kind === "dog" ? "npcDog" : "npcChef"}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
          <div ref={hikerRef} className="item hiker">
            <div className="in">
              <div className="lant" />
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
        <div className="groundDark" />
        <div className="tint" />
      </div>
      <div className="bandT" />
      <div className="bandB" />
      <div className="vignette" />
      <div ref={motesRef} className="motes" />
      <div ref={faderRef} className="fader" />

      <div ref={cardRef} className={`card${card ? " on" : ""}`} aria-live="polite">
        {card ? <CardContent id={card} /> : null}
      </div>

      <header className="who">
        <h1>{identity.name}</h1>
        <p>{identity.role}</p>
      </header>
      <div className="scind">
        {scene.name} · {sceneIdx + 1}/{scenes.length}
      </div>
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
