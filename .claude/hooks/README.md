# Claude Code Hooks

Project-scoped hooks configured in `.claude/settings.json`. They guard Claude's
real-time tool calls before execution — unlike git pre-commit hooks, **the model
cannot bypass them** (no `--no-verify` equivalent).

---

## PreToolUse — `pre-tool-use.py`

Runs before every tool call. Exit 2 = block with reason. Exit 0 = allow.

| What it blocks | Tool | Why |
|---|---|---|
| Edit/Write while on `main`/`master` | Edit/Write | Forces the feature-branch workflow (`docs/COLLABORATION.md`) — keeps `main` clean for collaborators |
| `git commit` while on `main`/`master` | Bash | Same — no direct commits to `main` |
| `rm -rf` / `rm --recursive` | Bash | Accidental mass deletion |
| `curl/wget \| bash` | Bash | Supply-chain attack vector |
| `git add planning/` | Bash | Gitignored reference dir must not be published |
| `git add .env*` (non-example) | Bash | Secrets leak via git |
| Force-push / push to main | Bash | Bypasses PR + CI gate |
| Reading `.env*`/`*.pem`/`*.key` via shell | Bash | Secrets entering Claude's context |
| `supabase db reset --linked` / `--db-url <remote>` | Bash | Wipes a **production** DB — only the local (Docker) reset is allowed |
| `supabase projects delete` | Bash | Irreversible deletion of a hosted project |
| Remote `DROP`/`TRUNCATE`/`DELETE` SQL | Bash | Destructive verb + a non-localhost `postgres://…@host` → prod data loss |
| Reading `.env*` (non-example) | Read | Use env var names, not values |
| Reading `*.pem`/`*.key` | Read | Private key material |
| Writing to `.env*` (non-example) | Edit/Write | Only `.env.example` is committed |
| Embedding secret values | Edit/Write | `sk-ant-`, OpenAI keys, DB URLs w/ password, private keys, AWS keys, GitHub tokens, raw JWTs |

> Bash command-matching is scoped per shell command: the gap between a command and
> its target excludes `;`, `&`, `|`, so a `.env` mentioned in a *later* command on
> the same line (e.g. `cat foo; grep x .env`) is not a false positive — the real
> read (`cat .env`) still blocks.

> **Gotcha — the destructive-DB guard matches on *mention*, not just execution.** A
> Bash command that merely contains `supabase db reset --linked`, `projects delete`,
> or a remote `postgres://…@host` + `DROP/DELETE` is blocked — including a
> `git commit -m "…"` or `gh pr create --body "…"` whose **text** describes those
> commands. Workaround: put the message in a file and use `git commit -F <file>` /
> `gh pr create --body-file <file>` (the hook scans the command string, not file
> contents). The false-positive is the safe default — better to block a commit
> message than risk a real prod wipe. The DB guards no-op on projects with no
> Supabase/Postgres.

## PostToolUse — `audit.py`

Runs after every `Bash`/`Edit`/`Write`. Appends a timestamped one-liner to
`.claude/audit.log` (gitignored — local only). Review before committing.

---

## Defense in depth — three independent layers

1. **Claude Code hooks** (this) — guard Claude's actions; model cannot bypass.
2. **Git pre-commit hooks** (Husky + secretlint) — guard commit contents; bypassable via `--no-verify`.
3. **CI + branch protection** — the unbypassable gate on every PR.
