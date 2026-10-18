---
name: 1-start
description: "Establish or recover project context for a new or existing codebase before planning or building."
---
# 1-start — Establish Project Context

Use when the repository has no reliable context or its documentation is incomplete. Inspect structure, git status/history, manifests, entrypoints, tests, CI, deployment files, and existing docs before asking questions. Never assume the project is empty or overwrite existing context silently.

Create `project/` only when needed. Prefer an existing equivalent context directory or propose a migration. Inspecting files is not a substitute for understanding product intent.

## Discovery interview

For a new project, do not write `context.md` from the first idea description alone. After the initial description, ask focused follow-up questions, one at a time by default, and adapt later questions to earlier answers. Cover the parts that materially affect planning:

- who the primary user is and what situation creates the need;
- what the user should be able to accomplish from start to finish;
- what the most important outcome or value is;
- what the first meaningful version must include and what can wait;
- what the user expects to see, provide, or receive;
- important constraints: platform, integrations, data, privacy, performance, budget, timeline, or compliance;
- what is known, assumed, uncertain, or explicitly out of scope.

Do not turn this into a fixed questionnaire. Skip questions already answered, ask deeper follow-ups when an answer is vague or consequential, and stop when the project direction, primary workflow, boundaries, and constraints are clear enough for `2-scope`. The goal is a usable working picture, not a polished specification.

For an existing project, inspect the repository first and ask only about intent that cannot be established from artifacts: what should change, what must not change, who is affected, and what constraints or risks matter.

Write `project/context.md` with purpose, users, current status, capabilities, constraints, repository map, run/test/deploy entrypoints, risks, open questions, near-term direction, and non-goals. Link to `scope.md`, `prd.md`, `spec.md`, `checklist.md`, and `plan.md` when present. Version public technical context; ignore only genuinely private context. Never request credentials.

Record the answers as a concise context summary, separating user-provided intent from repository observations and agent assumptions. Preserve unresolved questions explicitly; do not fill gaps with invented product decisions.

Use [templates/context-template.md](templates/context-template.md) when creating the document, adapting it to the repository instead of filling empty sections mechanically.

## Routing

Choose the first applicable path:

- no clear product direction → `2-scope`;
- clear user-facing feature or behavior change → `3-prd`;
- non-trivial feature, migration, refactor, upgrade, or integration → `6-plan`;
- approved requirements needing architecture → `4-spec`;
- small, clear implementation → `5-build`.

Save context before handoff. Later sessions must resume from artifacts, not conversation memory.
