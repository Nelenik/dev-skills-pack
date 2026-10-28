# UI verification gates

## Accessibility baseline

Use the project's declared target. If none exists, treat WCAG 2.2 AA as the default engineering baseline while recording any exceptions. Automated tools find only some issues; combine them with keyboard and screen-reader-relevant checks.

## Suggested tools

- Browser automation: Playwright or the repository's existing equivalent.
- Accessibility: axe-core or the existing equivalent.
- Visual regression: Playwright screenshots, Storybook test runner, or the existing snapshot tool.
- Performance: Lighthouse, Web Vitals, browser performance tooling, or project-specific benchmarks.

Use installed project tooling first. Do not add a dependency solely to satisfy this reference without assessing scope and maintenance cost.

## Minimum browser matrix

Record supported desktop and mobile browsers from project policy. If none exists, cover one current Chromium-based browser, one WebKit-based browser, and one narrow/mobile viewport for critical flows. Expand the matrix for platform-specific behavior, touch input, or public-facing products.

## Evidence thresholds

Record actual results, not an assumed pass. For visual regression, explain intentional differences. For accessibility failures, include location, impact, affected interaction, and remediation or accepted exception. For performance, compare against a baseline and record the environment.
