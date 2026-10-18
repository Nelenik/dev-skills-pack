---
description: "Implement and verify planned changes in coherent increments, from small fixes through multi-step production work."
---
# 5-build — Implement and Verify

Inspect repository state and relevant project documents before editing. Preserve unrelated user changes. Use `project/checklist.md` as the execution record; create it when needed from the approved scope, PRD, spec, or plan.

Use [templates/checklist-template.md](templates/checklist-template.md) as the starting structure for planned work, adapting the slices and evidence to the actual change.

## Choose execution mode

- **Direct mode:** one or a few localized files, clear behavior, reversible change, no data/schema/public-contract/security/deployment impact. Do an impact check, implement, verify, and summarize.
- **Planned mode:** multiple components, migrations, public APIs, dependency upgrades, risky refactors, rollout work, or unclear behavior. Require an approved `project/plan.md` or `project/spec.md`, then execute ordered slices.

## Checklist format

For planned work, each slice must contain: objective, affected paths/components, dependencies, implementation notes, verification commands and manual checks, rollback or recovery note when relevant, and completion evidence. Keep dependencies explicit and never mark a slice complete without evidence.

## Execution loop

1. Read the slice and inspect the current code.
2. Implement the smallest coherent change.
3. Run focused tests, type checks, lint, build, migration validation, or manual checks appropriate to the change.
4. Review the diff for accidental scope, secrets, compatibility problems, and missing documentation.
5. Update the checklist and affected project documents with actual results.
6. Commit at a stable recovery point when the repository workflow expects commits.

For migrations, verify preconditions, backup/recovery assumptions, idempotency, staged rollout, data validation, and cleanup separately. Never claim a migration or deployment ran when it did not.

If implementation contradicts the plan, inspect downstream impact, update only affected documents, record the reason under `## Revisions`, and seek agreement when user-visible behavior, data safety, compatibility, or architecture changes. Do not use destructive git operations without explicit consent.

## Document synchronization

Keep the documents aligned with the code and with each other:

- `context.md`: current status, capabilities, architecture map, risks, and links;
- `scope.md`: product direction, boundaries, priorities, and non-goals;
- `prd.md`: user-facing behavior and acceptance criteria;
- `spec.md`: technical design, contracts, data, and operational decisions;
- `plan.md`: change-specific sequence, risks, rollout, and rollback;
- `checklist.md`: execution state and evidence.

When a decision changes, update the smallest authoritative document and all downstream documents that depend on it. Do not duplicate conflicting copies. Record the reason in `## Revisions` and link related documents when useful. Before completion, compare the diff against this list and note documents that were intentionally unchanged.

## Review gate

For planned work, migrations, public contracts, security-sensitive changes, or changes touching multiple components, perform a final review before marking the increment done. Review the diff, tests, data migration, compatibility, observability, documentation, rollout, rollback, and accidental scope. Record findings and their resolution in the checklist. Unresolved high-risk findings block completion; low-risk follow-ups must be recorded explicitly.

## Routing

If requirements are unclear, return to `2-scope` or `3-prd`. If technical decisions are missing, use `4-spec`. If the work is bigger or riskier than expected, pause and create/update `6-plan`. When the increment is verified, update `project/context.md`; there is no separate ship stage in this workflow.

## Definition of Done

An increment is done only when its agreed behavior works, relevant automated checks pass, manual checks are recorded, documentation and project context are current, migrations or rollout steps are verified, no unintended scope or secrets are present in the diff, and known follow-ups are recorded. For planned work, all checklist slices and evidence must be complete. If any condition is unknown, mark the increment incomplete rather than guessing.

Resume from checklist, project documents, and git state. This skill remains the normal execution path after the first working version.
