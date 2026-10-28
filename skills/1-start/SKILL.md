---
name: 1-start
description: "Establish or recover project context for a new or existing codebase (including a partly built MVP) before planning or building. Never routes to implementation on its own."
---
# 1-start — Establish Project Context

> Working agreement: `AGENTS.md` (dev-skills-pack block). Before deciding whether setup is needed, run the read-only `0-setup` marker check (`--check`); this validation is mandatory even when no setup appears necessary. If validation reports a malformed or ambiguous block, stop and present its recovery recommendation without modifying files or routing to another workflow. Only after integrity validation succeeds, if `AGENTS.md` lacks a valid block or `dev-workspace/state.md` is missing, invoke `0-setup` automatically for its safe initialization operations.

Use when the repository has no reliable context or its documentation is incomplete. First validate the managed block, then inspect repository instructions, documentation, source, tests, configuration, workflow artifacts, and relevant Git changes. Classify the entry point as a new project, in-progress MVP, established MVP, existing project with a defined task, or returning workflow. Never assume the project is empty, that the workflow starts at its first stage, or that ordinary Git changes are errors.

Create `dev-workspace/` only when needed. It is the canonical visible workspace for skill-pack-owned workflow artifacts. Prefer existing equivalent context or workflow artifacts and propose migration when needed. Keep existing project documentation in its original locations; do not move, rename, overwrite, or delete it during onboarding.

For an existing project that has not used the skill pack, read and analyze its relevant documentation and implementation, then create only the necessary artifacts in `dev-workspace/`. Reuse information by reference where practical and separate verified facts, developer-approved decisions, assumptions, and unresolved questions. Existing artifacts in `dev-workspace/` take precedence over recreating equivalent files.

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

## Bootstrap resume

When `dev-workspace/state.md` contains `mode: bootstrap` and `initialized: false`, treat the workflow as a potentially interrupted bootstrap. Read the saved `step`, `stage`, `work_dir`, and `task` values when present, then inspect the existing `context.md`, `scope.md`, `prd.md`, `roadmap.md`, and other workflow artifacts before choosing the next action. Existing workflow documents are evidence of progress, not proof that their stages are approved or complete.

If workflow artifacts exist but the repository has no implementation yet, remain in bootstrap; do not switch to recovery solely because documents exist. Resume from the last confirmed step, preserve existing drafts and approvals, and do not repeat discovery or recreate documents unless a concrete gap requires it. If the saved state contradicts the artifacts and the contradiction cannot be resolved safely, report the specific conflict and ask one focused question.

For a new project, keep `mode: bootstrap` and `initialized: false` until the initial context and baseline are established. Do not enter recovery merely because `last_synced_commit` is `none`. Set `mode: recovery` only when code or development history already exists and the project context must be reconstructed.

Write `dev-workspace/context.md` with purpose, users, current status, capabilities, constraints, repository map, run/test/deploy entrypoints, risks, open questions, near-term direction, non-goals, and binding conventions (rules later specs must follow; empty until a foundation spec is approved). Link to `scope.md`, `prd.md`, `roadmap.md`, and active specs, plans, and tasks when present. Version public technical context; ignore only genuinely private context. Never request credentials.

Record the answers as a concise context summary, separating user-provided intent from repository observations and agent assumptions. Preserve unresolved questions explicitly; do not fill gaps with invented product decisions.

Use [templates/context-template.md](templates/context-template.md) when creating the document, adapting it to the repository instead of filling empty sections mechanically.

## Recovery mode (existing project, possibly an unfinished MVP)

Use when code or development history exists but project documents are missing, partial, or stale, or when this workflow is adopted midway. Do not use recovery merely because `scope.md`, `prd.md`, `roadmap.md`, or `context.md` exist.

1. Set `mode: recovery` in `dev-workspace/state.md` (create it through `0-setup` if missing).
2. Inspect first, ask later. Read the code, git history, tests, and existing documents. Code is the source of truth over documents. Do not change any code.
3. List divergences between documents and code (see `18-sync`, "Document vs code divergence") as a numbered list. The developer decides per item whether to update the document or change the code. Do not rewrite documents before that.
4. Ask only what artifacts cannot tell: the intended MVP, what counts as finished, what must not change.
5. Write or update `dev-workspace/context.md` from observations, keeping observations, developer intent, and agent assumptions separate.
6. After the developer confirms the context summary, propose the recovery completion transition. If `scope.md`, `prd.md`, and `roadmap.md` are already approved, preserve them and do not recreate them. Once the developer explicitly confirms the transition, set `initialized: true`, `mode: normal`, record `last_synced_commit` to the agreed baseline commit (or `none` when the developer explicitly chooses a no-commit baseline), and create/update accepted snapshots under `dev-workspace/.sync/`. Until that confirmation, recovery remains active and synchronization must not treat the project as initialized.
7. Propose `16-roadmap` in reconstruct mode to establish which stages are done, partial, or not started.

## Routing

After inspection, summarize the entry point, discovered project state, existing artifacts and their status, important gaps or contradictions, and the recommended next skill with its reason. Report `Result`, `Next step`, `Command`, and `Approval`. Use `Invoke skill `<name>`` for the recommendation. Never invoke a new workflow step without developer approval; read-only `18-sync` detection may run automatically at session start.

Supporting skills may run autonomously only when the shared autonomy criterion is satisfied: the operation is necessary for the current authorized task, in scope, does not alter approved decisions, and does not cross an approval checkpoint.

At startup, keep two decisions separate: first validate managed-block integrity; then determine whether project setup is needed. When initialization is needed and validation succeeded, `0-setup` is a routine supporting operation: it may create missing setup and tracking files, append a missing managed block, or update a valid managed block without an approval checkpoint. After setup reports its result, stop at this skill's existing routing decision; setup does not authorize planning, implementation, or another workflow step.

Routing is a proposal. Name the next skill and the reason, then wait for the developer. Never invoke the next skill on your own.

- no clear product direction → propose `2-scope`;
- new project with approved scope and PRD → propose `16-roadmap` (create mode); never go straight to building;
- existing project with an unfinished MVP → propose `16-roadmap` (reconstruct mode);
- project in the `evolve` phase and a user-facing change → `3-prd`, then `4-spec`;
- technical change without product impact → `4-spec` or `6-plan`;
- a small change the developer explicitly asks for → `5-build` in ad-hoc mode, only after the developer says "go".

Save context and workflow state in `dev-workspace/` before handoff. Later sessions must resume from artifacts, not conversation memory.

## Completing bootstrap

After `dev-workspace/context.md` is confirmed and the initial baseline is established (normally after the roadmap is approved and before the first implementation stage), propose one explicit transition: `initialized: true`, `mode: normal`, `last_synced_commit: <agreed commit or none by explicit decision>`, and a complete accepted snapshot under `dev-workspace/.sync/`. Apply it only after the developer confirms the transition. If bootstrap was interrupted, resume from existing artifacts: preserve approved `scope.md`, `prd.md`, and `roadmap.md`, preserve any partially implemented foundation, and continue from the recorded `step`, `stage`, `work_dir`, and `task`; do not restart document creation. Until the transition is confirmed, `18-sync` routes to bootstrap. The same transition closes recovery after the developer confirms the reconstructed context; recovery does not complete merely because `last_synced_commit` was recorded.
