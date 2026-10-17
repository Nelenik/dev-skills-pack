---
name: 1-start
description: Establish or recover project context for a new or existing codebase before planning or building.
---

# 1-start — Establish Project Context

Use when the repository has no reliable context or its documentation is incomplete. Inspect structure, git status/history, manifests, entrypoints, tests, CI, deployment files, and existing docs before asking questions. Never assume the project is empty or overwrite existing context silently.

Create `project/` only when needed. Prefer an existing equivalent context directory or propose a migration. For a new project clarify purpose, users, desired outcome, constraints, and current idea. For an existing project capture current behavior, important things to preserve, technical debt, risks, and intended direction.

Write `project/context.md` with purpose, users, current status, capabilities, constraints, repository map, run/test/deploy entrypoints, risks, open questions, near-term direction, and non-goals. Link to `scope.md`, `prd.md`, `spec.md`, `checklist.md`, and `plan.md` when present. Version public technical context; ignore only genuinely private context. Never request credentials.

Use [templates/context-template.md](templates/context-template.md) when creating the document, adapting it to the repository instead of filling empty sections mechanically.

## Routing

Choose the first applicable path:

- no clear product direction → `2-scope`;
- clear user-facing feature or behavior change → `3-prd`;
- non-trivial feature, migration, refactor, upgrade, or integration → `6-plan`;
- approved requirements needing architecture → `4-spec`;
- small, clear implementation → `5-build`.

Save context before handoff. Later sessions must resume from artifacts, not conversation memory.
