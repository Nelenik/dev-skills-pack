---
name: 6-plan
description: "Plan non-trivial features, migrations, refactors, upgrades, and continued development in existing projects."
---
# 6-plan — Plan the Next Change

Use for features, migrations, upgrades, refactors, integrations, scaling, or other changes needing impact analysis. Read `project/context.md` and inspect code, data, tests, deployment setup, history, and existing plans. If context is missing, use `1-start`.

Classify the request. A localized, reversible, low-risk change with clear acceptance criteria and no contract, data, security, or deployment impact can go directly to `5-build`. Changes crossing components, changing schemas or public contracts, requiring staged rollout, or carrying meaningful risk require a plan.

Clarify desired outcome, current and target state, compatibility, affected users/systems, dependencies, success criteria, risks, rollout, monitoring, and rollback. For migrations include backfill, validation, cutover, failure recovery, and cleanup.

Write `project/plan.md` with `status: draft`: summary, current/target state, affected areas, ordered slices, verification, rollout/rollback, risks, alternatives, assumptions, non-goals, and `## Revisions`. For meaningful alternatives, compare each option by correctness, complexity, migration effort, performance, operational risk, reversibility, and long-term maintenance; recommend one and record why. Set `status: approved` after review. If user-facing behavior changes, update or route to `3-prd`; if architecture or interfaces need design, update or route to `4-spec`. Then route implementation to `5-build`.

Use [templates/plan-template.md](templates/plan-template.md) when creating the plan, removing irrelevant sections rather than leaving misleading placeholders.

There is no separate shipping skill. After implementation, `5-build` verifies the increment and updates `project/context.md` using the project's own release process when applicable.
