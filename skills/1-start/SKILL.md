---
name: 1-start
description: "Establish or recover project context for a new or existing codebase (including a partly built MVP) before planning or building. Never routes to implementation on its own."
---
# 1-start — Establish Project Context

> Working agreement: `AGENTS.md` (dev-skills-pack block). Before deciding whether setup is needed, run the read-only `0-setup` marker check (`--check`); this validation is mandatory even when no setup appears necessary. If validation reports a malformed or ambiguous block, stop and present its recovery recommendation without modifying files or routing to another workflow. Only after integrity validation succeeds, if `AGENTS.md` lacks a valid block or `project/state.md` is missing, invoke `0-setup` automatically for its safe initialization operations.

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

For a new project, keep `mode: bootstrap` and `initialized: false` until the initial context and baseline are established. Do not enter recovery merely because `last_synced_commit` is `none`. Set `mode: recovery` only when code or development history already exists and the project context must be reconstructed.

Write `project/context.md` with purpose, users, current status, capabilities, constraints, repository map, run/test/deploy entrypoints, risks, open questions, near-term direction, non-goals, and binding conventions (rules later specs must follow; empty until a foundation spec is approved). Link to `scope.md`, `prd.md`, `roadmap.md`, and the active stage's spec, plan, and tasks when present. Version public technical context; ignore only genuinely private context. Never request credentials.

Record the answers as a concise context summary, separating user-provided intent from repository observations and agent assumptions. Preserve unresolved questions explicitly; do not fill gaps with invented product decisions.

Use [templates/context-template.md](templates/context-template.md) when creating the document, adapting it to the repository instead of filling empty sections mechanically.

## Recovery mode (existing project, possibly an unfinished MVP)

Use when code exists but project documents are missing, partial, or stale, or when this workflow is adopted midway.

1. Set `mode: recovery` in `project/state.md` (create it through `0-setup` if missing).
2. Inspect first, ask later. Read the code, git history, tests, and existing documents. Code is the source of truth over documents. Do not change any code.
3. List divergences between documents and code (see `18-sync`, "Document vs code divergence") as a numbered list. The developer decides per item whether to update the document or change the code. Do not rewrite documents before that.
4. Ask only what artifacts cannot tell: the intended MVP, what counts as finished, what must not change.
5. Write or update `project/context.md` from observations, keeping observations, developer intent, and agent assumptions separate.
6. After the developer confirms the context summary, propose the recovery completion transition. If `scope.md`, `prd.md`, and `roadmap.md` are already approved, preserve them and do not recreate them. Once the developer explicitly confirms the transition, set `initialized: true`, `mode: normal`, record `last_synced_commit` to the agreed baseline commit (or `none` when the developer explicitly chooses a no-commit baseline), and create/update the accepted snapshot manifest and saved contents under `project/.sync/`. Until that confirmation, recovery remains active and synchronization must not treat the project as initialized.
7. Propose `16-roadmap` in reconstruct mode to establish which stages are done, partial, or not started.

## Routing

After inspection, report `Result`, `Next step`, `Command`, and `Approval`. Use `Invoke skill `<name>`` for the recommendation. Never invoke a new workflow step without developer approval; read-only `18-sync` detection may run automatically at session start.

Supporting skills may run autonomously only when the shared autonomy criterion is satisfied: the operation is necessary for the current authorized task, in scope, does not alter approved decisions, and does not cross an approval checkpoint.

At startup, keep two decisions separate: first validate managed-block integrity; then determine whether project setup is needed. When initialization is needed and validation succeeded, `0-setup` is a routine supporting operation: it may create missing setup and tracking files, append a missing managed block, or update a valid managed block without an approval checkpoint. After setup reports its result, stop at this skill's existing routing decision; setup does not authorize planning, implementation, or another workflow step.

Routing is a proposal. Name the next skill and the reason, then wait for the developer. Never invoke the next skill on your own.

- no clear product direction → propose `2-scope`;
- new project with approved scope and PRD → propose `16-roadmap` (create mode); never go straight to building;
- existing project with an unfinished MVP → propose `16-roadmap` (reconstruct mode);
- project in the `evolve` phase and a user-facing change → `3-prd`, then `4-spec`;
- technical change without product impact → `4-spec` or `6-plan`;
- a small change the developer explicitly asks for → `5-build` in ad-hoc mode, only after the developer says "go".

Save context and `state.md` before handoff. Later sessions must resume from artifacts, not conversation memory.

## Completing bootstrap

After `context.md` is confirmed and the initial baseline is established (normally after the roadmap is approved and before the first implementation stage), propose one explicit transition: `initialized: true`, `mode: normal`, `last_synced_commit: <agreed commit or none by explicit decision>`, and a complete accepted snapshot under `project/.sync/`. Apply it only after the developer confirms the transition. If bootstrap was interrupted, resume from existing artifacts: preserve approved `scope.md`, `prd.md`, and `roadmap.md`, preserve any partially implemented foundation, and continue from the recorded `step`, `stage`, `work_dir`, and `task`; do not restart document creation. Until the transition is confirmed, `18-sync` routes to bootstrap. The same transition closes recovery after the developer confirms the reconstructed context; recovery does not complete merely because `last_synced_commit` was recorded.
