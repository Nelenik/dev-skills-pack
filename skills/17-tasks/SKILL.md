---
name: 17-tasks
description: "Decompose an approved plan for the active stage or change into small, reviewable tasks: at most 3 files each, explicit file whitelist, acceptance checks, dependencies. Use after 6-plan and before 5-build."
---
# 17-tasks — Decompose into Reviewable Tasks

> Working agreement: `AGENTS.md` (dev-skills-pack block). Read it first if it is not already in context.

Tasks are what the developer reviews. Each one must be small enough to read as a diff and check calmly, and explicit enough that the implementer never has to decide what to touch.

Task lifecycle is `todo → in-progress → review → done`: `todo` means ready but not started; `in-progress` requires explicit authorization; `review` means implementation and checks are complete and awaiting acceptance; `done` means the developer accepted the result. The agent never sets `done` or starts another task from `review`.

Read `project/state.md`, then the approved spec(s) and plan in the active work folder. If any is not `status: approved`, stop and propose the skill that produces it. Decompose only the active stage or change. Use [templates/tasks-template.md](templates/tasks-template.md) for `<work_dir>/tasks.md`.

## How to decompose

1. Take the plan's slices in order. Split each slice until every task has one observable result.
2. **At most 3 implementation/test files per task.** Count modified and new implementation files and tests. Workflow files (`state.md`, the active `tasks.md`, `backlog.md` when needed, and the sync report) are a separate, limited administrative set and do not consume this limit. They may only be updated for status, evidence, triage, or synchronization; they are not a general document-editing exemption. Lockfiles and generated files are listed separately and not counted.
3. A task needing more than 3 files must say why under "Why more than 3 files" (for example an atomic rename or move, generator output, a contract change that cannot compile otherwise). The developer approves each exception. Convenience is not a reason.
4. Every task states: type, goal, what it traces to, the file whitelist, out of scope, dependencies, proposed risk, acceptance (exact commands or manual steps with expected results). A task without checkable acceptance is not ready.
5. Tasks that run a generator or scaffolder (for example a project initializer) are separate tasks that name the exact command and the expected resulting file list. Nothing else is done in them, and the output is reviewed before the next task.
6. Order by dependency. Early tasks leave the project runnable. Do not hide risky work (migrations, auth, data) inside a large task; give it its own task and mark the risk.
7. For a `partial` stage use `finish` tasks for missing behavior and `adopt` tasks for tests/docs/types around code that already exists. `adopt` tasks may be deferred to the backlog if they are not exit criteria.
8. Check coverage: every plan slice maps to at least one task, every task traces to a requirement, no task exceeds the limit without an approved reason, and dependencies form no cycle. Report gaps instead of filling them with invented work.

## Approval and handoff

Write the file with `status: draft`, present it, revise, and set `status: approved` only after explicit approval. Set `step: check` in `state.md` and propose the pre-build consistency check in `7-review`, then `5-build` for the first task. Never start implementation from this skill.

## Changing tasks later

After producing or revising `tasks.md`, report `Result`, `Next step`, `Command`, and `Approval`. Once the task list is explicitly approved, recommend `7-review` with `Invoke skill `7-review`` and wait; do not start implementation or select a task autonomously.

Task text changes after approval are proposed as a diff and recorded under `## Revisions`. Splitting a task that turned out too large is always allowed as a proposal; merging tasks to save time is not.
