---
name: 14-ui-verify
description: "Verify implemented UI through browser, responsive, accessibility, state, and visual checks with concrete evidence."
---

# 14-ui-verify — UI Verification

Use after implementing a user-facing UI change or when auditing an existing interface. Do not declare the UI verified from source inspection alone when browser behavior is material.

Read the relevant PRD, UX/UI specs, changed code, existing tests, and supported browser/device assumptions. Use the project's available browser automation and accessibility tooling; do not claim a manual or automated check that was not run.

Use [references/ui-gates.md](references/ui-gates.md) to select a proportionate WCAG baseline, browser matrix, and tool-assisted gates.

## Verification gates

- Main journey works from entry to successful completion.
- Loading, empty, invalid, error, unauthorized, disabled, and recovery states behave as specified.
- Keyboard-only navigation reaches every interactive control in a logical order.
- Focus is visible and remains sensible after dialogs, validation, navigation, and dynamic updates.
- Semantics, accessible names, roles, labels, and announcements are correct where applicable.
- Contrast, touch targets, zoom/reflow, reduced motion, and responsive breakpoints meet the product's supported baseline.
- Long text, large data, slow responses, duplicate actions, and narrow viewports do not break the interaction.
- Visual changes match the intended tokens, component patterns, and responsive layout; capture screenshots when useful.
- Console errors, failed requests, layout overflow, and unexpected network or performance regressions are investigated.
- Visual regression is checked for important shared components and critical journeys when baseline screenshots exist.
- The check records browser, viewport, zoom, reduced-motion setting, locale, and test data used.

## Evidence

Record each applicable gate with a command, test, screenshot, browser observation, accessibility report, or artifact. Use [templates/ui-verification-template.md](templates/ui-verification-template.md). Route failed implementation checks to `4-build`; route product ambiguity to `12-ux-design`; route broad quality or release risk to `7-verify` or `9-release`.
