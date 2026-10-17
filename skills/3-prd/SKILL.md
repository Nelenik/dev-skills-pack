---
name: 3-prd
description: Define product behavior, journeys, requirements, acceptance criteria, and edge cases for a product increment.
---

# 3-prd — Product Requirements

Read context, scope, relevant code, and current product behavior. Extend existing requirements when possible. Specify target users, journey, interfaces, behaviors, permissions, data visible to users, loading/empty/error states, acceptance criteria, operational needs, and deferred work.

For existing products document current behavior, intended behavior, compatibility expectations, and rollout impact. Write or update `project/prd.md` with `status: draft`; mark assumptions and unresolved decisions. Set `status: approved` when behavior is clear enough for technical design. Purely internal changes belong in `6-plan`.

After approval, route architecture or interfaces to `4-spec`, sequencing/migration/rollout concerns to `6-plan`, and already-clear localized implementation to `5-build`.
