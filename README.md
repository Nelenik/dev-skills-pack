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

## Installation

Place `skills/` in your skills directory. Each skill has `SKILL.md`, optional `templates/` and `references/`.

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
