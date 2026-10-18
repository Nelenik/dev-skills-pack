---
description: "Define product behavior, journeys, requirements, acceptance criteria, and edge cases for a product increment."
---
# 3-prd — Product Requirements

Read context, scope, relevant code, and current product behavior. Extend existing requirements when possible.

## Discovery conversation

Treat the PRD as an interview, not a transcription task. Before writing requirements, walk through the intended product experience with the developer one decision at a time. Ask what the user sees first, what they know at each step, what they can do, what the system should return, what happens after success, and what should happen when input is missing, invalid, slow, duplicated, unauthorized, or interrupted.

Clarify the developer's priorities, desired tone and interaction style, important examples, acceptance threshold, and tradeoffs between speed, simplicity, flexibility, automation, and control. Ask which edge cases matter for the first release and which can be deferred. For an existing product, compare current and intended behavior explicitly and identify compatibility expectations.

Do not invent screens, behavior, copy, user roles, or acceptance criteria. Convert the developer's answers into precise requirements, while labeling agent-derived assumptions and asking about consequential gaps.

Specify target users, journey, interfaces, behaviors, permissions, data visible to users, loading/empty/error states, acceptance criteria, operational needs, and deferred work.

For existing products document current behavior, intended behavior, compatibility expectations, and rollout impact. Write or update `project/prd.md` with `status: draft`; mark assumptions and unresolved decisions. Set `status: approved` when behavior is clear enough for technical design. Purely internal changes belong in `6-plan`.

After approval, route architecture or interfaces to `4-spec`, sequencing/migration/rollout concerns to `6-plan`, and already-clear localized implementation to `5-build`.
