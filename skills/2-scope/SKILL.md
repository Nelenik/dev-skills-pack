---
name: 2-scope
description: "Define or reshape product direction, boundaries, outcomes, and priorities for a new or existing project."
---
# 2-scope — Define Direction

> Working agreement: `AGENTS.md` (dev-skills-pack block). Read it first if it is not already in context.

Read `project/context.md` and inspect the repository first. This supports both new products and existing systems; preserve current behavior unless an intentional change is approved.

## Discovery conversation

Do not derive the scope from a single idea statement or fill gaps with the agent's preferred product decisions. Interview the developer, one focused question at a time by default. Explore the problem and its urgency, primary users and their context, the desired transformation, the distinctive insight, the main workflow, what must feel true about the product, success evidence, constraints, dependencies, priorities, and explicit non-goals.

Use answers to ask adaptive follow-ups. Probe vague words such as “simple”, “fast”, “smart”, or “intuitive” until they have observable meaning. Ask what the developer would protect if scope had to shrink, what they deliberately do not want, and what assumptions could invalidate the direction. For an existing project, separate current behavior, intended change, preserved behavior, affected users, and compatibility constraints.

Offer informed tradeoffs when useful, but do not choose product direction on the developer's behalf. Record their intent, decisions, assumptions, and unresolved questions separately.

Write `project/scope.md` with `status: draft`, show consequential decisions, and set `status: approved` after clear approval. Record revisions instead of regenerating the document. Do not force a proof-of-concept boundary; use an appropriate release, milestone, or migration boundary.

Use [templates/scope-template.md](templates/scope-template.md) as the starting structure. Remove irrelevant sections, but do not leave misleading placeholders.

After approval, report `Result`, `Next step`, `Command`, and `Approval`, then wait. Recommend one appropriate next skill using `Invoke skill `<name>``: `3-prd`, `16-roadmap`, `4-spec`, or `6-plan` according to the state. Never start implementation from this skill.
