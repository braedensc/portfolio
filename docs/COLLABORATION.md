<!-- Copy to docs/COLLABORATION.md and adapt the project-specific bits (module
     layout, migrations, tracker choice). The branch workflow + worktree sections
     are universal. -->

# Collaboration & Multi-Agent Workflow

How multiple people — and multiple Claude Code sessions — work on this repo at the
same time without stepping on each other.

**Key mental model:** Claude Code does **not** coordinate across machines. Each
session is isolated and has no idea other humans or agents exist. Coordination is
**git + written context**, not a shared "Claude brain." The conflicts you'd hit
are the same two humans would hit — agents just hit them faster, so the discipline
below matters more.

Most of this is **automatic** in this repo (see [Enforcement](#whats-automatic-enforcement)).
You rarely run these commands by hand — they're documented so the rules are legible.

---

## The one rule

**One task = one branch = one PR.** Never have two sessions editing the same
working directory at once. Keep branches small and short-lived: a branch that
lives 3 hours merges cleanly; one that lives 3 days collides.

## Branch naming

`<type>/<short-kebab-desc>` — `type` matches conventional-commit prefixes:
`feat` / `fix` / `chore` / `refactor` / `docs`. Examples: `feat/login-form`,
`fix/cache-invalidation`, `docs/collaboration`.

## Starting new work (the routine)

Claude does this automatically; here it is explicitly:

```bash
git checkout main
git pull --ff-only                       # start from latest (skip if offline / no remote yet)
git checkout -b feat/<short-desc>
# ...work...  commit on the branch
gh pr create --fill                      # CI + review is the merge gate
```

You never merge your own work straight to `main` — that's what the PR + branch
protection is for.

---

## Running several Claudes at once — git worktrees

A **worktree** is a second checkout of the same repo in a different folder, on its
own branch. This is the current best practice for one person running multiple
parallel agents without them clobbering each other's files.

```bash
git worktree add ../proj-featA feat/a    # new folder + new branch
git worktree add ../proj-featB feat/b
# Open a separate Claude Code session in each folder — fully isolated.
git worktree list
git worktree remove ../proj-featA        # clean up when merged
```

Why worktrees beat plain `git checkout` switching: switching mutates the **one**
working directory, so two sessions in the same folder fight. Worktrees give each
session its own folder. (Claude Code can also create/enter worktrees for you.)

**Caveat:** `node_modules/` and local service state are per-folder — install deps
(and use separate ports for local services) in each worktree.

---

## Avoiding conflicts (the checklist)

- **Split work by module/feature folder, not by line.** Assign different people to
  different top-level modules so they rarely touch the same files. This is the
  single biggest conflict-avoider.
- **Small PRs, merged often.** Don't let a branch drift behind `main`.
- **Rebase on main before opening/updating a PR** if main moved:
  `git fetch origin && git rebase origin/main`.
- **`CLAUDE.md` + per-module READMEs are shared coordination, not just docs.** Since
  each Claude session is isolated, written context is the *only* thing keeping
  separate sessions consistent. Update docs in the same PR as the code.
- **Committed hooks + CI mean every contributor's Claude plays by the same rules**
  even if they never read this file.

### Project-specific danger zone: ordered/generated files

Anything with a global order or timestamp that two branches generate in parallel
will collide — **DB migrations** are the classic case. Serialize them: pull latest
`main` immediately before generating one so it sorts last, and don't run two
such branches at once without coordinating. (Adapt/remove for your stack.)

---

## Task tracking — who works on what

Claude doesn't need a tracker; **humans do**, to claim a unit of work. Scale the
tool to the team:

| Scale | Tool |
|---|---|
| 2–3 people | **GitHub Issues + a Project board.** Free, next to the code; Claude can read/close via `gh`. Start here. |
| Small team | **Linear** (has an MCP server — Claude reads a ticket, implements, updates status). |
| Enterprise | **Jira / Azure DevOps**, usually via MCP for ticket context. |

**Claiming convention (GitHub Issues):** assign the issue to yourself and move it
to *In Progress* **before** branching; reference it in the branch name
(`feat/142-login-form`). The agentic loop: "Claude, implement #142" → it reads the
issue, branches, builds, opens the PR.

---

## What's automatic (enforcement)

Three layers, mirroring the security model — so you don't have to remember the
workflow:

1. **Claude Code PreToolUse hook** (`.claude/hooks/pre-tool-use.py`) — blocks
   `Edit`/`Write`/`git commit` while on `main`/`master`. The model **cannot**
   bypass this, so a new task is forced onto a branch. `CLAUDE.md` also tells
   Claude to branch *proactively* before it ever hits the block.
2. **Git pre-commit hook** (`.husky/pre-commit`) — blocks human/CLI commits on
   `main`. Bypassable with `--no-verify`, but…
3. **CI + branch protection** — the unbypassable gate. All changes land via PR
   with passing checks; no direct or force-push to `main`.

So in practice: just start working. If you (or Claude) try to edit on `main`,
you'll be told to branch first — that's the system doing its job, not an error.

---

## Enterprise / large-scale notes

- **Claude Code GitHub Action / `@claude` mentions** — tag `@claude` on an issue or
  PR; it runs in CI to implement or review, decoupled from anyone's laptop. Biggest
  "team" unlock.
- **Cloud / remote agent sessions** — long-running tasks run server-side, so you
  can fan out many agents without tying up local machines.
- **Review is the bottleneck and the quality gate.** When agents write more code,
  human + automated review protects quality: required reviews, `CODEOWNERS`,
  automated passes (e.g. `/code-review`).
- **Centralized governance** — org-wide settings, permission policies, audit logs,
  shared MCP/hook configs so every developer's agent is governed identically.
- **Architecture decides how well this parallelizes.** Clear module boundaries let
  many agents/people work with minimal merge surface.

---

## Quick reference

```bash
# Start a task
git checkout main && git pull --ff-only && git checkout -b feat/<desc>

# Run parallel agents (one worktree per task)
git worktree add ../proj-<task> feat/<desc>
git worktree list
git worktree remove ../proj-<task>

# Keep up to date
git fetch origin && git rebase origin/main

# Finish
gh pr create --fill
```
