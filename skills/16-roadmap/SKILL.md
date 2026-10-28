---
name: 16-roadmap
description: "Create, reconstruct, and manage the MVP roadmap: broad stages with observable results and exit criteria, so the base of an application is built stage by stage under developer control. Use for a new project after scope/PRD, for an existing unfinished MVP, when activating or closing a stage, or when requests change MVP boundaries."
---
# 16-roadmap — MVP Stages

> Working agreement: `AGENTS.md` (dev-skills-pack block). Read it first if it is not already in context.

This skill plans the MVP in broad strokes and controls the stage lifecycle. It writes no code and no specs. Stages are decided with the developer; the agent proposes and records.

Read `dev-workspace/state.md`, `context.md`, `scope.md`, `prd.md`. Use [templates/roadmap-template.md](templates/roadmap-template.md) for `dev-workspace/roadmap.md`. Lifecycle details (closing a stage, triaging requests, the MVP gate) are in [references/stage-lifecycle.md](references/stage-lifecycle.md).

## Mode A — Create (new project)

Requires an approved `scope.md`; a `prd.md` is expected for user-facing products. If missing, route back instead of inventing them.

1. Interview the developer, one question at a time: what the first runnable thing is, what the sensible order of capabilities is, what must exist before what, what can wait, what feels risky, how large a step they want to review.
2. Propose the stages in broad strokes. Rules:
   - Stage `00-foundation` comes first and contains no features: repository skeleton, tooling (lint, typecheck, test), conventions, base layout, shared UI shell. Whether it is one stage or more is the developer's decision.
   - Every stage ends in something the developer can run or see. A stage that ends in "code exists" is not a stage.
   - Each stage lists goal, observable result, in/out, dependencies, rough size, expected number of specs, and testable exit criteria.
   - Keep later stages deliberately coarse. Do not decompose beyond the next stage.
   - Prefer vertical slices after the foundation over horizontal layers, unless the developer prefers otherwise; state the tradeoff.
3. Show the proposal, revise on feedback, and set `status: approved` only after explicit approval. Record consequential choices in `decisions.md`.
4. Do not build, scaffold, or install anything. Propose activating stage `00` (see below).

## Mode B — Reconstruct (existing project, unfinished MVP)

Used by `1-start` recovery mode only when implementation or development history already exists and the project context must be reconstructed. Existing workflow documents without implementation remain in bootstrap resume, not recovery. Code is the source of truth for implemented behavior.

1. Inspect the repository and any existing documents. Draft stages from the intended MVP (ask the developer when intent is not visible in artifacts).
2. For each stage propose `done`, `partial`, or `not started`, with evidence in the `Evidence` field: files, routes, tests, runnable commands. When evidence is weak, propose `partial`, never `done`.
3. List divergences between documents and code (see `18-sync`) without rewriting anything.
4. The developer confirms every stage status one by one. Do not change code during reconstruction.
5. Propose activating the first non-`done` stage. Specs and tasks for a `partial` stage describe only the difference between what exists and the exit criteria (`4-spec`, `17-tasks` with `finish` and `adopt` task types).

## Bootstrap resume

When invoked for a new project whose bootstrap was interrupted, do not reconstruct implementation stages. Read the saved workflow state and existing drafts, preserve their statuses, and continue the unmet bootstrap prerequisite. Use Create mode only after the approved scope and PRD prerequisites are satisfied; do not infer completion from the mere existence of a document.

## Activate a stage

Only one stage is active. A new one may start only when the previous is `done` or the developer explicitly parks it.

1. Propose the stage to activate; wait for the developer's explicit activation permission.
2. Create `dev-workspace/stages/<NN-name>/`, set in `state.md`: `stage`, `work_dir`, `spec: none`, `task: none`, `step: spec`; set the stage to `active` in `roadmap.md` only as the approved diff. The agent never independently changes a stage to `done`, `moved`, or `dropped`.
3. Propose `4-spec`. Specs, plans, and tasks for later stages must not exist yet.

## Rules

After each roadmap operation, report `Result`, `Next step`, `Command`, and `Approval`. Recommend exactly one next action with `Invoke skill `<name>``; activating, changing status, or closing a stage requires the developer's explicit decision.

- `roadmap.md` is approval-controlled: the agent prepares a diff and may apply exactly that diff only after the developer explicitly agrees. The developer owns the decision; the agent may not invent or independently change stage statuses or MVP boundaries. A change of MVP boundaries is an exchange: say what is added and what is removed or moved.
- Use `parked` for an intentionally deferred stage. `moved` means the stage was transferred to another roadmap position or milestone; `dropped` means it was removed from the MVP. A parked stage remains part of the roadmap but is not active.
- The agent never sets a stage to `done`; it presents the evidence and the developer decides.
- Do not stretch a stage to fit unrelated work. New ideas go to `backlog.md`.
