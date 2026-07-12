import "./plain.css";
import type { Metadata } from "next";
import Link from "next/link";
import {
  identity,
  heroEyebrow,
  heroSub,
  heroCoords,
  routeLog,
  projects,
  expeditionsIntro,
  basecamp,
  personalRecords,
  pullRequests,
  pullRequestsNote,
  recordsNote,
  gearRack,
  viewpoints,
  viewpointsNote,
} from "@/content/site";
import Atmosphere from "./atmosphere";
import RevealObserver from "./reveal-observer";
import PermitStamp from "./permit-stamp";
import ChefTour from "./chef-tour";

export const metadata: Metadata = {
  title: "Braeden Collins — Simple view",
  description:
    "Braeden Collins, full-stack software engineer in Atlanta — plain-page portfolio: route log, expeditions (Todoclaw & ChefClaw), records, gear, and photography.",
};

const todoclaw = projects.find((p) => p.id === "todoclaw")!;
const chefclaw = projects.find((p) => p.id === "chefclaw")!;
const [firstName, ...restName] = identity.name.split(" ");

export default function PlainPage() {
  return (
    <div className="topo" id="top">
      <Atmosphere />
      <RevealObserver />

      <header>
        <div className="wrap hd">
          <a className="brand" href="#top">
            ▲{" "}
            <span>
              <b>{identity.name.toUpperCase()}</b> · TRAIL MAP
            </span>
          </a>
          <nav aria-label="Sections">
            <a href="#route">Route log</a>
            <a href="#expeditions">Expeditions</a>
            <a href="#prs">PRs</a>
            <a href="#gear">Gear</a>
            <a href="#viewpoints">Viewpoints</a>
            <a href="#contact">Contact</a>
            <Link href="/">The world ↗</Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="wrap">
          <div className="hero">
            <div className="plaque">
              <p className="eyebrow">{heroEyebrow}</p>
              <h1>
                {firstName}
                <br />
                {restName.join(" ")}
              </h1>
              <p className="sub">{heroSub}</p>
              <p className="coords">{heroCoords}</p>
              <div className="cta">
                <a className="btn solid" href="#expeditions">
                  View expeditions
                </a>
                <Link className="btn" href="/">
                  Enter the world →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ---- route log ---- */}
        <section id="route">
          <div className="wrap">
            <div className="sec-head">
              <span className="wpt">WPT 01</span>
              <h2>Route log</h2>
            </div>
            <p className="sec-sub">
              The career, drawn the way it felt: a long climb with switchbacks.
              This is the profile view — the full portfolio is an explorable
              world.
            </p>
            <svg
              id="elev"
              viewBox="0 0 1080 190"
              role="img"
              aria-label="Career elevation profile from 2017 to today"
            >
              <defs>
                <linearGradient id="efill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#33506B" stopOpacity=".55" />
                  <stop offset="1" stopColor="#33506B" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="fillpath"
                d="M40,168 C170,160 240,150 320,128 C420,100 470,96 560,84 C660,70 720,58 830,44 C920,33 990,28 1040,24 L1040,182 L40,182 Z"
              />
              <path
                className="track"
                d="M40,168 C170,160 240,150 320,128 C420,100 470,96 560,84 C660,70 720,58 830,44 C920,33 990,28 1040,24"
              />
              <circle cx="40" cy="168" r="5" />
              <text x="40" y="188" textAnchor="middle">
                2017
              </text>
              <circle cx="320" cy="128" r="5" />
              <text x="320" y="188" textAnchor="middle">
                2021
              </text>
              <circle cx="700" cy="61" r="5" />
              <text x="700" y="188" textAnchor="middle">
                2023
              </text>
              <circle className="you" cx="1040" cy="24" r="6" />
              <text x="1032" y="14" textAnchor="end">
                YOU ARE HERE ▲
              </text>
            </svg>
            <div className="route-grid">
              {routeLog.map((r) => (
                <div className="route-card reveal" key={r.marker}>
                  <span className="yr">{r.marker}</span>
                  <h3>{r.title}</h3>
                  <p>{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- expeditions ---- */}
        <section id="expeditions">
          <div className="wrap">
            <div className="sec-head">
              <span className="wpt">WPT 02</span>
              <h2>Expeditions</h2>
            </div>
            <p className="sec-sub">{expeditionsIntro}</p>
            <div className="peaks">
              <article className="peak reveal">
                <svg className="rings" viewBox="0 0 200 200" aria-hidden="true">
                  <g fill="none" stroke="#4C7196" strokeWidth="1">
                    <ellipse cx="100" cy="100" rx="24" ry="18" />
                    <ellipse cx="100" cy="100" rx="48" ry="38" transform="rotate(-8 100 100)" />
                    <ellipse cx="100" cy="100" rx="72" ry="58" transform="rotate(5 100 100)" />
                    <ellipse cx="100" cy="100" rx="95" ry="78" transform="rotate(-4 100 100)" />
                  </g>
                </svg>
                <div className="pk-top">
                  <span className="pk-no">{todoclaw.peakLabel}</span>
                  <span className={`badge ${todoclaw.badge!.kind}`}>
                    {todoclaw.badge!.text}
                  </span>
                </div>
                <h3>{todoclaw.name}</h3>
                <p className="pitch">{todoclaw.pitch}</p>
                <div className="stack">
                  {todoclaw.stackChips!.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
                <p className="hi">
                  <b>Standout engineering:</b> {todoclaw.standout}
                </p>
                <PermitStamp />
              </article>

              <article className="peak reveal">
                <svg className="rings" viewBox="0 0 200 200" aria-hidden="true">
                  <g fill="none" stroke="#4C7196" strokeWidth="1" strokeDasharray="4 5">
                    <ellipse cx="100" cy="100" rx="24" ry="18" />
                    <ellipse cx="100" cy="100" rx="48" ry="38" transform="rotate(9 100 100)" />
                    <ellipse cx="100" cy="100" rx="72" ry="58" transform="rotate(-6 100 100)" />
                    <ellipse cx="100" cy="100" rx="95" ry="78" transform="rotate(3 100 100)" />
                  </g>
                </svg>
                <div className="pk-top">
                  <span className="pk-no">{chefclaw.peakLabel}</span>
                  <span className={`badge ${chefclaw.badge!.kind}`}>
                    {chefclaw.badge!.text}
                  </span>
                </div>
                <h3>{chefclaw.name}</h3>
                <p className="pitch">{chefclaw.pitch}</p>
                <div className="stack">
                  {chefclaw.stackChips!.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
                <p className="hi">
                  <b>Standout engineering:</b> {chefclaw.standout}
                </p>
                <ChefTour />
              </article>
            </div>

            <div style={{ height: 26 }} />
            <div className="base">
              {basecamp.map((b) => (
                <div className="bcard reveal" key={b.title}>
                  <h4>{b.title}</h4>
                  <p>{b.detail}</p>
                  <span className="chip">Basecamp project</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- PRs ---- */}
        <section id="prs">
          <div className="wrap">
            <div className="sec-head">
              <span className="wpt">WPT 03</span>
              <h2>PRs</h2>
            </div>
            <p className="sec-sub">
              Personal records and pull requests — same discipline, different
              units.
            </p>
            <div className="prs">
              <div className="pr-col reveal">
                <h3>Personal records</h3>
                {personalRecords.map((r) => (
                  <div className="pr-row" key={r.lab}>
                    <span className="lab">{r.lab}</span>
                    <span className="val">{r.val}</span>
                  </div>
                ))}
                <p className="pr-note">{recordsNote}</p>
              </div>
              <div className="pr-col reveal">
                <h3>Pull requests</h3>
                {pullRequests.map((r) => (
                  <div className="pr-row" key={r.lab}>
                    <span className="lab">{r.lab}</span>
                    <span className="val">{r.val}</span>
                  </div>
                ))}
                <p className="pr-note">{pullRequestsNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- gear rack ---- */}
        <section id="gear">
          <div className="wrap">
            <div className="sec-head">
              <span className="wpt">WPT 04</span>
              <h2>Gear rack</h2>
            </div>
            <p className="sec-sub">Carried on most trips. The kit, not the garage.</p>
            {gearRack.map((group) => (
              <div className="gear-group reveal" key={group.label}>
                <div className="glab">{group.label}</div>
                <div className="gear">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- viewpoints ---- */}
        <section id="viewpoints">
          <div className="wrap">
            <div className="sec-head">
              <span className="wpt">WPT 05</span>
              <h2>Viewpoints</h2>
            </div>
            <p className="sec-sub">
              Shot on trail. The full gallery is a page of its own inside the
              world.
            </p>
            <div className="views">
              {viewpoints.map((v) => (
                <figure className="view reveal" key={v.src}>
                  {/* Empty alt: the figcaption is the image's accessible name,
                      so a non-empty alt would double-announce the caption. */}
                  <img src={v.src} alt="" loading="lazy" />
                  <figcaption>{v.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="views-note">{viewpointsNote}</p>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="wrap">
          <div className="f-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                Send a signal
              </p>
              <a className="f-mail" href={`mailto:${identity.email}`}>
                {identity.email}
              </a>
            </div>
            <div className="f-links">
              <a href={identity.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <Link href="/">The world</Link>
            </div>
          </div>
          <div id="bearline" aria-hidden="true">
            <svg viewBox="0 0 1080 46" preserveAspectRatio="none">
              <path
                d="M0,30 C120,26 200,34 320,30 C460,25 560,34 700,29 C840,24 960,33 1080,28"
                fill="none"
                stroke="#33506B"
                strokeWidth="1.2"
              />
            </svg>
            <svg id="bear" viewBox="0 0 64 40" aria-hidden="true">
              <path
                fill="#8FA5B8"
                d="M8 32c-2-7 1-14 7-17 3-8 12-10 19-8 3-3 8-3 11 0 3-1 7 1 8 5 4 1 6 5 5 9-1 2-2 3-4 4l-2 7h-5l-1-5c-5 2-12 2-17 0l-1 5h-5l-2-6c-6 1-11-1-13 6z"
              />
              <circle cx="49" cy="14" r="1.6" fill="#0A121E" />
            </svg>
          </div>
          <p className="fine">
            Simple view — the full portfolio is an explorable world drawn from
            my own photographs.
          </p>
        </div>
      </footer>
    </div>
  );
}
