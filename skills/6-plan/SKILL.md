---
name: 6-plan
description: "Plan non-trivial features, migrations, refactors, upgrades, and continued development in existing projects."
---
# 6-plan — Plan the Next Change

Use for features, migrations, upgrades, refactors, integrations, scaling, or other changes needing impact analysis. Read `project/context.md` and inspect code, data, tests, deployment setup, history, and existing plans. If context is missing, use `1-start`.

Classify the request. A localized, reversible, low-risk change with clear acceptance criteria and no contract, data, security, or deployment impact can go directly to `5-build`. Changes crossing components, changing schemas or public contracts, requiring staged rollout, or carrying meaningful risk require a plan.

Clarify desired outcome, current and target state, compatibility, affected users/systems, dependencies, success criteria, risks, rollout, monitoring, and rollback. For migrations include backfill, validation, cutover, failure recovery, and cleanup.

Write `project/plan.md` with `status: draft`: summary, current/target state, affected areas, ordered slices, verification, rollout/rollback, risks, alternatives, assumptions, non-goals, and `## Revisions`. For meaningful alternatives, compare each option by correctness, complexity, migration effort, performance, operational risk, reversibility, and long-term maintenance; recommend one and record why. Set `status: approved` after review. If user-facing behavior changes, update or route to `3-prd`; if architecture or interfaces need design, update or route to `4-spec`. Then route implementation to `5-build`.

## Technical debt

Record debt items with impact, owner, and follow-up. Prioritize by risk and cost. Revisit each plan.

### Recording debt
For each debt item, record:
- **Component:** where the debt lives.
- **Description:** what was done and why it was acceptable at the time.
- **Impact:** what breaks, slows, or risks because of the debt.
- **Owner:** who is responsible for addressing it.
- **Cost to fix:** estimated effort and risk.
- **Follow-up:** when it should be revisited (next release, next quarter, etc.).

### Prioritization
- **High:** debt that causes outages, security issues, or blocks development. Fix before new features.
- **Medium:** debt that slows development or causes recurring bugs. Plan in a future release.
- **Low:** debt that is cosmetic or has minimal impact. Track but do not block on it.

### Revisiting
- Review the debt list at the start of each `6-plan` session.
- Move high-priority debt into the plan as a slice or follow-up.
- Update the debt list when debt is addressed or resolved.

### Linking to ADR
If a debt item is the result of a deliberate trade-off recorded in an ADR, link the debt to the ADR. The ADR explains why the debt was accepted; the debt item tracks when and how it will be addressed.

There is no separate shipping skill. After implementation, `5-build` verifies the increment and updates `project/context.md` using the project's own release process when applicable. For rollout/migration/deployment concerns, use `10-release`.
