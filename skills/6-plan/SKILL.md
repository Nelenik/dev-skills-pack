---
name: 6-plan
description: "Plan non-trivial features, migrations, refactors, upgrades, and continued development in existing projects."
---
# 6-plan — Plan the Next Change

Use for features, migrations, upgrades, refactors, integrations, scaling, or other changes needing impact analysis. Read `dev-workspace/context.md` and inspect code, data, tests, deployment setup, history, and existing plans. If context is missing, propose `1-start`.

**Location and scope.** Read `dev-workspace/state.md`. In the `mvp` phase a plan covers the active stage (or one spec of it) and lives at `<work_dir>/plan.md`; in the `evolve` phase at `dev-workspace/changes/<name>/plan.md`. Slices are coarse implementation steps; each one is later split into tasks by `17-tasks`. Never plan beyond the active stage or change.

Classify the request. A localized, reversible, low-risk change with clear acceptance criteria and no contract, data, security, or deployment impact may be proposed to the developer as ad-hoc work (`5-build`, ad-hoc mode); the developer decides. Changes crossing components, changing schemas or public contracts, requiring staged rollout, or carrying meaningful risk require a plan.

Clarify desired outcome, current and target state, compatibility, affected users/systems, dependencies, success criteria, risks, rollout, monitoring, and rollback. For migrations include backfill, validation, cutover, failure recovery, and cleanup.

Write the plan at `<work_dir>/plan.md` with `status: draft`: summary, current/target state, affected areas, ordered slices, verification, rollout/rollback, risks, alternatives, assumptions, non-goals, and `## Revisions`. For meaningful alternatives, compare each option by correctness, complexity, migration effort, performance, operational risk, reversibility, and long-term maintenance; recommend one and record why. Set `status: approved` only after the developer's explicit approval. Propose a risk level for each slice; the developer confirms it. If user-facing behavior changes, update or route to `3-prd`; if architecture or interfaces need design, update or route to `4-spec`. Then propose `17-tasks` and wait; do not start implementation.

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

There is no separate shipping skill. Closing a stage (`16-roadmap`) updates `dev-workspace/context.md`. For rollout, migration, or deployment concerns, propose `10-release`.

After planning, report `Result`, `Next step`, `Command`, and `Approval`. Once the plan is explicitly approved, recommend `17-tasks` with `Invoke skill `17-tasks`` and wait. Do not create tasks or start implementation before approval.
