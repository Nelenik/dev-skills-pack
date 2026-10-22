---
name: 3-prd
description: "Define product behavior, journeys, requirements, acceptance criteria, and edge cases for a product increment."
---
# 3-prd — Product Requirements

Read context, scope, relevant code, and current product behavior. Extend existing requirements when possible.

## Discovery conversation

Treat the PRD as an interview, not a transcription task. Before writing requirements, walk through the intended product experience with the developer one decision at a time. Ask what the user sees first, what they know at each step, what they can do, what the system should return, what happens after success, and what should happen when input is missing, invalid, slow, duplicated, unauthorized, or interrupted.

Clarify the developer's priorities, desired tone and interaction style, important examples, acceptance threshold, and tradeoffs between speed, simplicity, flexibility, automation, and control. Ask which edge cases matter for the first release and which can be deferred. For an existing product, compare current and intended behavior explicitly and identify compatibility expectations.

Do not invent screens, behavior, copy, user roles, or acceptance criteria. Convert the developer's answers into precise requirements, while labeling agent-derived assumptions and asking about consequential gaps.

Read [references/prd-guide.md](references/prd-guide.md) for interview and edge-case guidance. Use [templates/prd-template.md](templates/prd-template.md) when creating or restructuring `project/prd.md`.

## Requirement quality

Every requirement must be testable. A testable requirement has an observable outcome that can be verified with a command, test, or manual check.

### Testable acceptance criteria
For each requirement, write acceptance criteria that are:
- **Observable:** the outcome can be seen or measured (e.g. "API returns 200" not "API is fast").
- **Specific:** exact values, states, and behaviors are defined (e.g. "P95 latency < 200ms" not "low latency").
- **Verifiable:** a command, test, or manual check can confirm the criterion passes.

### Edge cases and failure scenarios
For each requirement, document at minimum:
- Missing input.
- Invalid input.
- Empty data.
- Slow dependencies.
- Failed dependencies.
- Retries.
- Duplicate actions.
- Permissions.
- Interrupted work.
- Recovery after failure.

### Non-functional requirements (NFR)
When the change affects production behavior, document NFRs with testable criteria:

- **Performance:** latency, throughput, resource usage (e.g. "P95 API response < 200ms under 1000 RPS").
- **Availability:** uptime, error rate, graceful degradation (e.g. "99.9% monthly uptime").
- **Scalability:** how the system behaves under increased load (e.g. "supports 10x current traffic without degradation").
- **Privacy:** data minimization, encryption, retention (e.g. "PII encrypted at rest and in transit").
- **Operability:** logging, metrics, health checks, alerting (e.g. "all API endpoints expose health checks").

Do not invent NFRs without a project reason. Mark unresolved NFRs as open questions.

Specify target users, journey, interfaces, behaviors, permissions, data visible to users, loading/empty/error states, acceptance criteria, operational needs, and deferred work. Acceptance criteria must be testable; use `11-test-strategy` for coverage.

For existing products document current behavior, intended behavior, compatibility expectations, and rollout impact. Write or update `project/prd.md` with `status: draft`; mark assumptions and unresolved decisions. Set `status: approved` when behavior is clear enough for technical design. Purely internal changes belong in `6-plan`.

After approval, route architecture or interfaces to `4-spec`, sequencing/migration/rollout concerns to `6-plan`, and already-clear localized implementation to `5-build`.
