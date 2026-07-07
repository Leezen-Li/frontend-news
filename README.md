# News

Nx monorepo for **News**. Package manager: [Bun](https://bun.sh).

[中文文档](README.zh-CN.md)

## Workspace layout

```text
apps/
  frontend/          # React + Rsbuild web app (Nx project: @org/frontend)
  frontend-e2e/      # Playwright E2E tests (@org/frontend-e2e)
  backend/           # NestJS API (Nx project: @org/backend)
packages/            # Shared libraries (reserved)
```

## Prerequisites

- Node.js 20+
- [Bun](https://bun.sh/docs/installation)

## Getting started

```sh
bun install
```

Git hooks install automatically via `bun prepare` → [lefthook](https://github.com/evilmartians/lefthook):

- **pre-commit**: Prettier, `bun verify` (sync + typecheck), cspell, knip
- **pre-push**: production build for `@org/frontend` and `@org/backend`
- **commit-msg**: commitlint (Conventional Commits)

## Common commands

Run from the repository root. Prefer `bun nx` over calling app scripts directly.

### Frontend (@org/frontend)

| Task             | Command                           |
| ---------------- | --------------------------------- |
| Dev server       | `bun nx dev @org/frontend`        |
| Production build | `bun nx build @org/frontend`      |
| Preview build    | `bun nx preview @org/frontend`    |
| Typecheck        | `bun typecheck`                   |
| All checks       | `bun verify`                      |
| Pre-push checks  | `bun verify:push`                 |
| Format           | `bun format` / `bun format:check` |
| Spellcheck       | `bun spellcheck`                  |
| Unused exports   | `bun knip`                        |
| E2E tests        | `bun nx e2e @org/frontend-e2e`    |

Dev server runs at [http://localhost:4200](http://localhost:4200) by default.

### Backend (@org/backend)

| Task             | Command                     |
| ---------------- | --------------------------- |
| Dev server (HMR) | `bun nx serve @org/backend` |
| Production build | `bun nx build @org/backend` |
| Typecheck        | `bun typecheck`             |

API runs at [http://localhost:3000/api](http://localhost:3000/api) by default. Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs).

### Build analysis (Rsdoctor)

[Rsdoctor](https://rsdoctor.rs/) is enabled on demand via `RSDOCTOR=true`:

| Task                | Command                               |
| ------------------- | ------------------------------------- |
| Dev with analysis   | `bun nx dev:rsdoctor @org/frontend`   |
| Build with analysis | `bun nx build:rsdoctor @org/frontend` |

Or run directly from the app package:

```sh
bun --cwd apps/frontend run dev:rsdoctor
bun --cwd apps/frontend run build:rsdoctor
```

### Nx utilities

```sh
bun nx show project @org/frontend --json   # list all targets
bun nx graph                               # project graph
bun nx sync                                # sync TypeScript project references
```

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint on `commit-msg`). Common scopes: `frontend`, `backend`, `ci`, `deps`, `nx`.

Validate a draft message:

```sh
printf '%s\n' 'feat(frontend): add news feed' | bunx commitlint
```

## CI

GitHub Actions workflow: [.github/workflows/ci.yml](.github/workflows/ci.yml).
