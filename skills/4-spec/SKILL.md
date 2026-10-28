---
name: 4-spec
description: "Create a technical design for an approved product direction, feature, refactor, or migration."
---
# 4-spec — Technical Design

> Working agreement: `AGENTS.md` (dev-skills-pack block). Read it first if it is not already in context.

Read approved project documents and inspect the actual repository.

## Location and scope

Read `dev-workspace/state.md`. In the `mvp` phase a spec belongs to the active roadmap stage and lives at `<work_dir>/spec-NN-<slug>.md` (`work_dir` comes from `state.md`, for example `dev-workspace/stages/00-foundation/`). One stage may need several specs: split by independently reviewable concern when a single spec would be too large to review calmly, and state in each spec which exit criteria of the stage it serves. In the `evolve` phase the spec lives at `dev-workspace/changes/<name>/spec.md`. Never write specs for stages that are not active.

- The foundation stage spec defines the binding conventions: stack, folder structure, naming, state and data-fetching patterns, testing and styling conventions. After the developer approves it, propose adding them to `context.md` under "Binding conventions". Later specs must follow them; deviating needs an ADR and the developer's approval.
- For a `partial` stage (code already exists), write a delta spec: current state, target state, and the difference. Do not redesign what already works.
- Record `step: spec` and `spec: <file>` in `state.md`.

## Technical discovery conversation

Do not jump from the PRD to an assumed implementation. Interview the developer about the technical qualities and constraints that matter: expected scale, latency, reliability, privacy, security, operability, cost, portability, maintainability, delivery pace, and acceptable complexity. Clarify what they already know, what they want to preserve, which tradeoffs they accept, and which technical decisions are non-negotiable.

Walk through the important data flows and failure paths together. Ask what must happen when dependencies fail, data is partial or duplicated, a request is retried, a migration is interrupted, a deployment is rolled back, or old clients remain active. Present a proportionate recommendation with tradeoffs rather than silently selecting architecture. Resolve consequential unknowns before approval.

Cover architecture/data flow, interfaces, data model and migration, failure and rollback behavior, compatibility, observability, security, testing, deployment sequence, dependencies, and file/component impact. Distinguish current, target, and transition states for existing systems.

Read [references/spec-patterns.md](references/spec-patterns.md) when evaluating technical choices. Use [templates/spec-template.md](templates/spec-template.md) as the starting structure for the spec file.

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
- Store ADRs in `dev-workspace/adr/` as individual files (e.g. `dev-workspace/adr/0001-use-postgres.md`).
- Link each ADR from the `## Decisions` section of the spec file.
- Reference ADRs in `6-plan` when the decision affects implementation slices.
- Update an ADR (do not delete) when it is superseded; link the new ADR to the old one.

Write the spec file with `status: draft`; explain tradeoffs and resolve consequential unknowns. Set `status: approved` only after the developer's explicit approval. Whether a spec can be skipped for a small change is the developer's decision: propose skipping with the reason, never skip on your own. For security-sensitive or data-heavy designs, propose `9-security`.

After approval, report `Result`, `Next step`, `Command`, and `Approval`, then recommend `6-plan` with `Invoke skill `6-plan`` and wait. Return to `2-prd` if the design exposes unresolved product behavior.
