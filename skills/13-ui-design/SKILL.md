---
name: 13-ui-design
description: "Design or improve production web UI visual direction, design tokens, responsive layouts, component states, and frontend consistency."
---

# 13-ui-design — UI Design

Use when creating or changing pages, components, design systems, responsive layouts, typography, color, spacing, motion, or visual hierarchy. This skill owns visual and component decisions; product behavior belongs to `2-prd` or `12-ux-design`.

Read `dev-workspace/context.md`, the relevant PRD/UX spec, and existing component and styling conventions. Reuse the project's design system before introducing new patterns.

For detailed visual rules and design-system governance, read [references/ui-rules.md](references/ui-rules.md).

## Workflow

1. Identify the page or component purpose, hierarchy, primary action, content density, and responsive constraints.
2. Establish or reuse tokens for color, typography, spacing, radius, elevation, motion, and states. Prefer semantic names over raw values.
3. Define component anatomy and variants, including hover, focus, active, disabled, loading, empty, error, and destructive states where relevant.
4. Check responsive behavior at the repository's supported breakpoints, including long text, large data, narrow widths, and touch interaction.
5. Keep visual choices consistent with the product's brand and existing UI. Avoid decorative complexity that reduces clarity, performance, or accessibility.
6. Record meaningful decisions in `dev-workspace/ui-spec.md` using [templates/ui-spec-template.md](templates/ui-spec-template.md).
7. Identify ownership, reuse, versioning, and cleanup implications for any new token or component.

## Quality rules

- Use semantic HTML and accessible interaction primitives.
- Preserve contrast, readable type, visible focus, sufficient touch targets, and reduced-motion behavior.
- Do not introduce a new component pattern when an existing one satisfies the need.
- Keep content, layout, and behavior understandable without relying on color, animation, hover, or placeholder text alone.
- Verify visual changes in a real browser when possible; screenshots are evidence, not the sole accessibility check.
- Prefer a small coherent token system over one-off values and document intentional exceptions.
- Treat new reusable components as API surface: define variants, composition rules, accessibility contract, and deprecation path.

## Routing

User flow or behavior → `12-ux-design`. Implementation → `4-build`. Visual/accessibility validation → `14-ui-verify`. Architecture, performance, or public contracts → `3-spec`, `5-plan`, or `7-verify`.
