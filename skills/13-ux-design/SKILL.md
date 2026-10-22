---
name: 13-ux-design
description: "Define and review user flows, information architecture, interaction states, accessibility, and recovery behavior for UI changes."
---

# 13-ux-design — UX Design

Use for new or changed user-facing flows, forms, navigation, information architecture, and interaction behavior. Do not use for API-only or infrastructure work.

Read `project/context.md` and the approved `project/prd.md` when present. Inspect the existing UI, routes, components, design conventions, and user-facing behavior before proposing changes.

For substantial changes, read [references/ux-methods.md](references/ux-methods.md) for research, journey mapping, and heuristic review guidance.

## Workflow

1. Describe the current and intended user journey: user goal, entry point, decisions, actions, system response, success, and exit.
2. Define information hierarchy, navigation, terminology, permissions, and the smallest useful interaction model.
3. Specify all relevant states: initial, loading, empty, populated, invalid, error, unavailable, unauthorized, duplicated, interrupted, and recovered.
4. Define keyboard, focus, screen-reader, touch, responsive, reduced-motion, and localization expectations appropriate to the product.
5. Identify risky assumptions and validate them with the developer or existing product evidence; do not invent product behavior silently.
6. Record the result in `project/ux-spec.md` using [templates/ux-spec-template.md](templates/ux-spec-template.md) when the change is non-trivial.
7. Define how the design will be validated: usability observation, analytics, support evidence, acceptance tests, or browser checks.

## Quality rules

- Every important interaction has a visible result and a recoverable failure path.
- Destructive or irreversible actions require clear context, confirmation or undo, and an explicit outcome.
- Preserve established patterns unless a deliberate change is documented.
- Acceptance criteria must be observable and testable.
- Do not treat visual polish as a substitute for understandable flow, accessibility, or useful error recovery.
- Review discoverability, feedback, consistency, error prevention, recognition over recall, user control, and cognitive load.
- Separate observed evidence, stakeholder decisions, and agent assumptions.

## Routing

Unclear product behavior → `2-scope` or `3-prd`. Technical implications → `4-spec` or `6-plan`. Visual implementation → `14-ui-design` and `5-build`. Browser and accessibility validation → `15-ui-verify` and `8-verify`.
