---
doc: tasks
status: draft            # draft | approved (approved only by the developer)
stage: NN-name           # or change: <name> in the evolve phase
plan: plan.md
updated: YYYY-MM-DD
---

# Tasks

The file status is `draft` or `approved` (approval of the task list by the developer). Individual task lifecycle is `todo` → `in-progress` → `review` → `done`, with `blocked` available when work cannot proceed. `approved` is not an individual task status. `in-progress` requires explicit authorization; the agent sets `review` after checks; only the developer sets `done`. A task in `review` never authorizes the next task.
Task types: `build` (new work) | `finish` (missing part of existing work) | `adopt` (tests/docs/types for existing code) | `fix`.

## T-01 — <short title>

- **Type:** build
- **Goal:** one observable result.
- **Traces to:** spec section / plan slice / roadmap exit criterion this task serves.
- **Files (whitelist, at most 3):**
  - `path/to/existing-file.ts` (modify)
  - `path/to/new-file.ts` (new)
- **Generated or lock files (listed, not counted):** none
- **Out of scope:** what a reader might expect here but must not be done in this task.
- **Depends on:** none
- **Risk:** low | medium | high (proposed; the developer confirms)
- **Acceptance:** exact commands and/or manual steps, with the expected result.
- **Why more than 3 files:** (only when needed; reasons such as an atomic rename, generator output, or a type change that cannot compile otherwise)
- **Status:** todo
- **Evidence:** (filled in by `5-build`: command -> result)

## T-02 — <short title>
