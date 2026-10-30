## Interview focus

Walk the core journey from the user's perspective. Ask what the user sees, knows, does, and receives at each consequential step. Clarify priorities, automation, control, constraints, success evidence, and what the developer would protect if scope had to shrink.

## Scope and requirements

Keep product boundaries in the PRD. Separate included work, explicit exclusions, deferred work, assumptions, and unresolved questions. Convert intent into observable behavior and testable acceptance criteria. Keep technical design in later skills unless it is a genuine product constraint.

For every significant requirement, trace the product intent to a concrete user-visible behavior: relevant UI state, user action, system response, priority, validation, failure behavior, recovery or retry behavior, and acceptance criteria that can be checked without guessing. A statement such as "the application shall persist data" is incomplete when timing, visibility, failure, retry, or recovery materially affects the user experience.

Before approval, check that the PRD defines the problem and goal, primary user and use cases, core journeys, MVP boundaries and exclusions, assumptions, dependencies, decisions, and open questions. Mark non-applicable edge-case categories rather than filling them with invented behavior. A draft with consequential unresolved decisions remains a draft and must not route to roadmap work.

## Edge cases

Use edge cases as an applicability checklist. Consider missing input, invalid input, empty data, slow or failed dependencies, retries, duplicate actions, permissions, interruption, and recovery when relevant. Mark irrelevant scenarios as not applicable and use reasonable standard behavior for routine technical failures.

## Existing projects

Read existing scope and PRD documents without overwriting them. If both exist, compare them, report overlap and contradictions, and propose a reviewed merge into `dev-workspace/prd.md`.

Preserve meaningful existing detail, including optional fields, filters, error handling, optimistic behavior, and compatibility expectations. Identify vague or missing requirements instead of replacing detailed behavior with generic template prose. If implementation and PRD disagree, report the discrepancy and ask for a decision; do not treat historical implementation details as automatically approved product requirements.
