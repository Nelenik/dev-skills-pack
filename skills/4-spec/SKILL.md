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

## Architecture Decision Records (ADR)

When the spec contains consequential technical decisions, record them as ADRs. An ADR documents a decision, its alternatives, trade-offs, and consequences so future maintainers understand why a particular approach was chosen.

### When an ADR is required
- Changing a public API contract or interface.
- Changing the data model, storage technology, or migration strategy.
- Choosing a new infrastructure, deployment, or integration pattern.
- Any decision that is hard to reverse or has significant operational cost.
- Any decision that affects security, privacy, or compliance.

### When an ADR is optional
- Local implementation details that are obvious from context.
- Routine configuration or dependency choices.
- Decisions that are already documented in the spec or plan.

### ADR structure
Use [templates/adr-template.md](templates/adr-template.md) as the starting structure. Each ADR must include:

- **Status:** Proposed, Accepted, or Superseded.
- **Context:** What problem or opportunity prompted the decision? What constraints existed?
- **Decision:** What was decided? Be specific.
- **Alternatives considered:** What other options were evaluated?
- **Consequences:** What are the positive and negative outcomes? What new risks or costs appear?
- **Risks and follow-ups:** What could go wrong? What should be monitored or revisited?

### ADR placement
- Store ADRs in `project/adr/` as individual files (e.g. `project/adr/0001-use-postgres.md`).
- Link each ADR from the `## Decisions` section of `project/spec.md`.
- Reference ADRs in `6-plan` when the decision affects implementation slices.
- Update an ADR (do not delete) when it is superseded; link the new ADR to the old one.

Write `project/spec.md` with `status: draft`; explain tradeoffs and resolve consequential unknowns. Set `status: approved` after review. Small local changes may skip this and go directly to `5-build`; risky, cross-component, data, or contract changes should have a spec or `6-plan`. For security-sensitive or data-heavy designs, use `9-security`.

After approval, route work needing staged execution, migration, rollout, or coordination to `6-plan`; otherwise use `5-build`. Return to `3-prd` if the design exposes unresolved product behavior.
