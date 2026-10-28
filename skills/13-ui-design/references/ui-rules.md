# UI rules and design-system governance

## Visual foundations

- Define semantic color roles, not component-specific raw colors.
- Use a documented type scale with readable line height and a clear hierarchy.
- Use a spacing scale and consistent layout constraints; avoid arbitrary per-component gaps.
- Define responsive behavior by content needs, not device names alone.
- Use motion to communicate state or continuity; respect reduced-motion preferences.
- Preserve contrast and do not communicate meaning by color alone.

## Component quality

For each reusable component document purpose, anatomy, variants, states, content limits, keyboard behavior, accessible name/role/value, and composition boundaries. Prefer existing primitives and patterns.

## Governance

Every new token or shared component should have an owner, reuse decision, usage example, accessibility contract, and migration/deprecation plan when it replaces an existing pattern. Keep product-specific exceptions local unless repetition proves they belong in the system.

## Performance

Avoid unnecessary fonts, large images, layout shift, expensive animation, and duplicated styling. Record meaningful asset or rendering trade-offs in the UI spec and verify them with the project's performance tooling when risk is material.
