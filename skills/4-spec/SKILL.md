---
name: 4-spec
description: "Create a technical design for an approved product direction, feature, refactor, or migration."
---
# 4-spec — Technical Design

Read approved project documents and inspect the actual repository.

## Technical discovery conversation

Do not jump from the PRD to an assumed implementation. Interview the developer about the technical qualities and constraints that matter: expected scale, latency, reliability, privacy, security, operability, cost, portability, maintainability, delivery pace, and acceptable complexity. Clarify what they already know, what they want to preserve, which tradeoffs they accept, and which technical decisions are non-negotiable.

Walk through the important data flows and failure paths together. Ask what must happen when dependencies fail, data is partial or duplicated, a request is retried, a migration is interrupted, a deployment is rolled back, or old clients remain active. Present a proportionate recommendation with tradeoffs rather than silently selecting architecture. Resolve consequential unknowns before approval.

Cover architecture/data flow, interfaces, data model and migration, failure and rollback behavior, compatibility, observability, security, testing, deployment sequence, dependencies, and file/component impact. Distinguish current, target, and transition states for existing systems.

Read [references/spec-patterns.md](references/spec-patterns.md) when evaluating technical choices. Use [templates/spec-template.md](templates/spec-template.md) as the starting structure for `project/spec.md`.

Write `project/spec.md` with `status: draft`; explain tradeoffs and resolve consequential unknowns. Set `status: approved` after review. Small local changes may skip this and go directly to `5-build`; risky, cross-component, data, or contract changes should have a spec or `6-plan`.

After approval, route work needing staged execution, migration, rollout, or coordination to `6-plan`; otherwise use `5-build`. Return to `3-prd` if the design exposes unresolved product behavior.
