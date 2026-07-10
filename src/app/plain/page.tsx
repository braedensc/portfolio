import type { Metadata } from "next";
import Link from "next/link";
import {
  identity,
  aboutText,
  stats,
  projects,
  experienceRows,
  photographyNote,
  worldPhotos,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Braeden Collins — Simple view",
  description:
    "Braeden Collins, full-stack software engineer — plain-page portfolio: about, projects, experience, photography, contact.",
};

const sectionLabel =
  "font-mono text-[11px] uppercase tracking-[0.22em] text-accent";

export default function PlainPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/60">
            Portfolio — simple view
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide sm:text-5xl">
            {identity.name}
          </h1>
          <p className="mt-2 text-base text-ink/80">{identity.role}</p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-md border border-accent bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-cream hover:text-accent"
          >
            Enter the world →
          </Link>
        </header>

        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-ink/15 py-4">
          {stats.map((s) => (
            <li key={s} className="font-mono text-xs tracking-[0.14em] text-ink/75">
              {s}
            </li>
          ))}
        </ul>

        <section className="mt-10" aria-labelledby="about-h">
          <h2 id="about-h" className={sectionLabel}>
            About
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed">{aboutText}</p>
        </section>

        <section className="mt-10" aria-labelledby="projects-h">
          <h2 id="projects-h" className={sectionLabel}>
            Projects
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.id}
                className="rounded-lg border border-ink/15 bg-white/40 p-5"
              >
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed">{p.description}</p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-ink/70">
                  {p.stack}
                </p>
                {p.url ? (
                  <p className="mt-3 text-sm">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent underline underline-offset-2"
                    >
                      Open Todoclaw →
                    </a>{" "}
                    <span className="font-mono text-[11px] text-ink/60">invite-only beta</span>
                  </p>
                ) : (
                  <p className="mt-3 font-mono text-[11px] text-ink/60">{p.status}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="experience-h">
          <h2 id="experience-h" className={sectionLabel}>
            Experience
          </h2>
          <ul className="mt-4 space-y-4">
            {experienceRows.map((row) => (
              <li key={row.period} className="sm:flex sm:gap-6">
                <span className="block shrink-0 font-mono text-xs tracking-[0.1em] text-ink/60 sm:w-32 sm:pt-1">
                  {row.period}
                </span>
                <span className="block leading-relaxed">
                  <strong className="font-semibold">{row.org}</strong> — {row.detail}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="photography-h">
          <h2 id="photography-h" className={sectionLabel}>
            Photography
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {worldPhotos.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-24 w-32 rounded-sm border-4 border-white object-cover shadow-md sm:h-28 sm:w-40"
              />
            ))}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80">
            {photographyNote}
          </p>
        </section>

        <section className="mt-10" aria-labelledby="contact-h">
          <h2 id="contact-h" className={sectionLabel}>
            Contact
          </h2>
          <p className="mt-3">
            <a
              href={`mailto:${identity.email}`}
              className="font-medium text-accent underline underline-offset-2"
            >
              {identity.email}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline underline-offset-2"
            >
              GitHub
            </a>{" "}
            · <span className="text-ink/40">LinkedIn</span> ·{" "}
            <span className="text-ink/40">Resume</span>
          </p>
        </section>

        <footer className="mt-14 border-t border-ink/15 pt-6">
          <Link
            href="/"
            className="font-display text-xl font-semibold text-accent underline-offset-4 hover:underline"
          >
            Enter the world →
          </Link>
          <p className="mt-2 font-mono text-[11px] text-ink/50">
            The world is drawn from my photographs.
          </p>
        </footer>
      </main>
    </div>
  );
}
