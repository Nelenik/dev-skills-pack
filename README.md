# Project Dev Skills

Skill pack for product development workflow.

## Structure

- `skills/1-start` — establish project context
- `skills/2-scope` — define direction
- `skills/3-prd` — product requirements
- `skills/4-spec` — technical design
- `skills/5-build` — implement and verify
- `skills/6-plan` — plan changes
- `skills/7-review` — review changes
- `skills/8-verify` — quality gates and evidence
- `skills/9-security` — security workflow
- `skills/10-release` — release and operations
- `skills/11-test-strategy` — testing strategy
- `skills/12-incident` — incident management and on-call

## UI/UX layer

- `skills/13-ux-design` — user flows, interaction states, and accessibility requirements
- `skills/14-ui-design` — visual direction, design tokens, responsive UI, and component consistency
- `skills/15-ui-verify` — browser, responsive, accessibility, and visual verification

For UI changes, use `13-ux-design → 14-ui-design → 15-ui-verify` as needed. Small visual fixes may go directly to `5-build` and `15-ui-verify`.

## Installation

### Install all skills for the current project

```bash
npx skills add Nelenik/dev-skills-pack --all -y
```

### Install all skills globally

Use `-g` / `--global` to install into your user-level skills directory:

```bash
npx skills add Nelenik/dev-skills-pack --all -g -y
```

Project installation is recommended for team projects because the skills are visible in version-controlled setup and can be kept consistent. Global installation is convenient for personal use across repositories.

Each skill has `SKILL.md`, optional `templates/` and `references/`.

## Templates and references

| Skill | Templates | References |
|-------|-----------|------------|
| 1-start | `context-template.md` | |
| 2-scope | `scope-template.md` | |
| 3-prd | `prd-template.md` | `prd-guide.md` |
| 4-spec | `spec-template.md`, `adr-template.md` | `spec-patterns.md` |
| 5-build | `checklist-template.md` | |
| 6-plan | `plan-template.md` | |
| 7-review | | |
| 8-verify | `verify-template.md`, `risk-assessment-template.md` | `gate-examples.md` |
| 9-security | `threat-model-template.md` | |
| 10-release | `rollback-plan-template.md`, `release-plan-template.md` | |
| 11-test-strategy | `test-plan-template.md` | |
| 12-incident | | |

## Workflow overview

```
1-start → 2-scope → 3-prd → 4-spec → 6-plan → 5-build → 8-verify → 10-release
                ↑                              ↑
          9-security (when needed)    12-incident (when needed)
```

- `7-review` runs after implementation or before merge.
- `11-test-strategy` defines test coverage and is referenced by `3-prd`, `5-build`, and `8-verify`.
- `12-incident` handles production incidents and on-call readiness.
- `13-ux-design` defines user journeys, interaction states, and accessibility expectations.
- `14-ui-design` defines visual and responsive implementation decisions.
- `15-ui-verify` records browser, accessibility, responsive, and visual evidence.
