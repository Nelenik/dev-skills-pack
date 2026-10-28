---
name: 2-prd
description: "Define and maintain the product direction and requirements in one approved dev-workspace/prd.md document."
---
# 2-prd — Product Definition

> Working agreement: `AGENTS.md` (dev-skills-pack block). Read it first if it is not already in context.

Use this skill to define or change product direction and requirements. It owns one document: `dev-workspace/prd.md`. The document includes product scope; do not create a separate `scope.md` for new work.

Read `dev-workspace/context.md`, existing `dev-workspace/prd.md`, relevant project documentation, current product behavior, and the repository before asking questions. For existing projects, distinguish current behavior, intended change, preserved behavior, affected users, compatibility expectations, and downstream artifacts.

## Discovery and clarification

Treat the work as an adaptive interview, not a transcription task. Ask focused questions, preferably one at a time, only where artifacts and the developer's intent do not answer them. Cover the product problem and business context, target users, desired outcome, core journey, user stories, functional behavior, boundaries, constraints, dependencies, success evidence, and unresolved questions as applicable.

Do not invent product direction, screens, roles, copy, acceptance criteria, or metrics. Within the agreed scope, make low-risk technical decisions autonomously, record assumptions, and ask only when uncertainty could materially affect the product, user experience, safety, compatibility, or scope. Do not put detailed architecture or implementation decisions in the PRD; those belong in `3-spec`, `5-plan`, and tasks unless they are genuine product constraints.

Use the following sections when relevant; do not force irrelevant sections:

- Summary, problem, opportunity, and business context.
- Target users, use cases, and user journeys.
- Product goal and success metrics/evidence.
- Functional requirements, business rules, and constraints.
- Non-functional requirements with testable criteria when production behavior is affected.
- Scope: in scope, excluded, deferred, current state, target state, and non-goals.
- Assumptions, dependencies, open questions, product decisions, and revisions.

## Requirement quality

Every requirement must have an observable, specific, and verifiable acceptance criterion. Use edge cases as an applicability checklist, not as a script requiring separate discussion of every item. Mark irrelevant cases as not applicable and handle routine technical failures with reasonable standard behavior. Consider missing/invalid input, empty data, slow or failed dependencies, retries, duplicates, permissions, interruption, and recovery when applicable.

For applicable production concerns, document NFRs for performance, availability, scalability, privacy, and operability. Do not invent NFRs without a project reason; mark unresolved NFRs as open questions.

## Document and approval workflow

Create or update `dev-workspace/prd.md` with `status: draft`. Preserve existing sections and revisions; do not regenerate the document unnecessarily. A draft is never an approval. Set `status: approved` only after the developer explicitly approves the complete product definition.

If an approved PRD changes, identify affected downstream specs, plans, tasks, roadmap boundaries, and compatibility expectations. Treat changes to approved requirements or scope as requiring review and approval before downstream work continues.

For existing projects:

- If only `prd.md` exists, reuse its meaningful content.
- If only `scope.md` exists, use it as source material for the PRD without deleting or silently rewriting it.
- If both exist, inspect both, identify overlap and contradictions, and propose a merge into `dev-workspace/prd.md`. Preserve both originals unchanged until the developer approves the migration. If approved requirements or scope change, the resulting PRD returns to `draft`.

After approval, report `Result`, `Next step`, `Command`, and `Approval`, then wait. Recommend exactly one next action with `Invoke skill `<name>``: `15-roadmap` when product definition prerequisites are satisfied, `3-spec` or `5-plan` for an approved change, or this skill again when clarification remains. Never start implementation or the next consequential workflow step from this skill.
