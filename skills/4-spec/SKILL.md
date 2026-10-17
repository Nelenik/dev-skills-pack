---
name: 4-spec
description: Create a technical design for an approved product direction, feature, refactor, or migration.
---

# 4-spec — Technical Design

Read approved project documents and inspect the actual repository. Cover architecture/data flow, interfaces, data model and migration, failure and rollback behavior, compatibility, observability, security, testing, deployment sequence, dependencies, and file/component impact. Distinguish current, target, and transition states for existing systems.

Write `project/spec.md` with `status: draft`; explain tradeoffs and resolve consequential unknowns. Set `status: approved` after review. Small local changes may skip this and go directly to `5-build`; risky, cross-component, data, or contract changes should have a spec or `6-plan`.

After approval, route work needing staged execution, migration, rollout, or coordination to `6-plan`; otherwise use `5-build`. Return to `3-prd` if the design exposes unresolved product behavior.
