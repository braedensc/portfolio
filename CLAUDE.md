# CLAUDE.md

Guidance for Claude Code sessions in this repository.

@AGENTS.md

---

## What This Is

Braeden Collins' personal portfolio — **an explorable HD-2D world built from his own photographs**.
The visitor walks a pixel-art hiker through stylized scenes (night campsite, Yosemite meadow,
Antelope slot canyon, more to come: snow, desert, El Capitan…), each rendered from a real photo
via the posterization pipeline. Content lives at themed points of interest (a mountain lake, a
sequoia grove, a planner desk); the projects are in-world stations with single-click launches.
A **plain view** presents the same content in a normal recruiter-readable layout, same art style.

Design direction was locked 2026-07-10 after a 12-mock workshop (mocks live outside this repo).
Key decisions:

- **Start scene: the camp** (always night, campfire, both project stations).
- **Stations:** Todoclaw = planner desk (dog NPC), ChefClaw = camp kitchen (chef NPC, lid-pop
  reveal), Contact = the campfire. Single-click opens — no hold-to-open interactions.
- **Waypoints are furnished set-pieces** (lake, grove, signposts), never bare markers in empty ground.
- **Auto mode:** a play button walks the expedition through every stop on its own.
- **Day/night** relighting; movement modestly brisk; reduced-motion = teleport + no ambient animation.
- **Copy is plain text.** No puns, no outdoors metaphors in prose. Sections: About, Projects,
  Experience, Photography, Contact.
- Engine: DOM/CSS + canvas sprites inside React (game loop in a hook, scenes as data). No game
  library unless performance demands it (measure first).

## Stack

Next.js (App Router) · TypeScript strict · Tailwind · deployed on Vercel Hobby ($0).
Photo stylization: `scripts/posterize.py` (Python 3 + Pillow) — originals in gitignored
`content-src/`, committed outputs in `public/world/`.

## Commands

```bash
npm run dev        # Next dev server (Turbopack)
npm run build      # production build
npm run lint       # ESLint
npx tsc --noEmit   # typecheck
python3 scripts/posterize.py --help   # stylization pipeline (needs Pillow)
```

## Hard Rules

1. **Original photographs are never committed.** `content-src/` is gitignored; only pipeline
   outputs (stripped, compressed) enter git. EXIF/GPS must never reach `public/`.
2. **Secrets are never output** — never echo, log, or commit any key/token value. Only
   `.env.example` (placeholders) is committed.
3. **No secret values in code.** If one appears in a file about to be committed, block and flag it.
4. **No direct or force push to `main`.** All changes via feature branch + PR.
5. **The plain view must always work** — the game world is additive; content is never locked
   behind it (recruiters, SEO, accessibility).

## Branch Workflow (automatic — never wait to be told)

Before the first `Edit`/`Write` of any task: `git rev-parse --abbrev-ref HEAD`; if on `main`,
create `<type>/<short-kebab-desc>` (type ∈ feat|fix|chore|refactor|docs). One task = one branch
= one PR. Conventional commits. Merging is Braeden's action only — never `gh pr merge`.
The PreToolUse hook blocks Edit/Write/commit on `main`. See `docs/COLLABORATION.md`.

## Security Model (three layers)

1. **Claude Code hooks** (`.claude/settings.json` → `.claude/hooks/pre-tool-use.py`) — block
   destructive commands, secret reads/writes, main-branch edits; `audit.py` logs tool calls.
2. **Git pre-commit** (Husky + secretlint) — secret scan on staged files; blocks `.env*` and
   direct commits to `main`.
3. **CI + branch protection** (GitHub) — the unbypassable gate: secretlint, lint, typecheck, build.
