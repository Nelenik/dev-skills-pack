---
doc: checklist
status: active
updated: YYYY-MM-DD
---

# Implementation Checklist

> Used for ad-hoc work. For staged work the execution record is the active `tasks.md` (status and `Evidence` per task); copy gates from below into a task's acceptance only when the plan marks them relevant.

## Preconditions
- [ ] Dependencies, environment, and baseline checks confirmed.
- [ ] Current branch, working tree, and baseline checks recorded.
- [ ] Backup/recovery assumptions confirmed when data or infrastructure is affected.

## Risk assessment
- Risk level: low / medium / high
- Scope:
- Data impact:
- Contract impact:
- Security impact:
- Deploy impact:

## Quality Gates

Copy the applicable gates from `8-verify` for the change type. Each gate must have evidence.

### Frontend / UI
- [ ] Component decomposition signals checked — evidence:
- [ ] Loading/empty/error states present — evidence:
- [ ] Accessibility: semantic markup, keyboard, focus — evidence:
- [ ] No unnecessary re-renders; state ownership justified — evidence:
- [ ] Tests for hooks and non-trivial logic — evidence:

### Backend / API
- [ ] Input validation at boundary — evidence:
- [ ] Auth/authz enforced server-side — evidence:
- [ ] Stable response/error contracts — evidence:
- [ ] Pagination, rate limits, idempotency, timeouts — evidence:
- [ ] Backward compatibility deliberate — evidence:

### Databases / Migrations
- [ ] Indexes, constraints, nullability, locking — evidence:
- [ ] Migration safe for existing data and running versions — evidence:
- [ ] Backup/rollback/recovery steps documented and verified — evidence:
- [ ] Idempotency and data validation — evidence:

### Integrations / Distributed
- [ ] Provider code isolated — evidence:
- [ ] Timeouts, retries, circuit breaking/fallback — evidence:
- [ ] Contract/integration tests for malformed/delayed/duplicated/unavailable responses — evidence:
- [ ] Correlation IDs preserved — evidence:

### CLI / Workers / Batch
- [ ] Meaningful exit codes — evidence:
- [ ] Safe retries, resumability, progress reporting — evidence:
- [ ] Bounded resource usage, idempotent processing — evidence:

### Security-sensitive
- [ ] Threat model documented — evidence:
- [ ] Trust boundaries and abuse cases reviewed — evidence:
- [ ] Secrets scan passed — evidence:
- [ ] Security tests for authz and input validation — evidence:

### Deployment / Infrastructure
- [ ] CI gates (lint, typecheck, tests, build) pass — evidence:
- [ ] Migration checks pass — evidence:
- [ ] Security scan passes — evidence:
- [ ] Rollout strategy documented — evidence:
- [ ] Rollback procedure documented and tested — evidence:
- [ ] Observability: structured logs, metrics, health checks — evidence:

## Slices

### Slice 1 — [name]
- Objective:
- Affected paths/components:
- Dependencies:
- Risk: low / medium / high
- [ ] Implementation complete
- [ ] Automated verification: <command> — result: <pass/fail>
- [ ] Manual verification: <check> — result: <pass/fail>
- [ ] Recovery/rollback note:
- Evidence: <command/test/artifact>


## Rollout and Validation
- [ ] Rollout order and owner confirmed.
- [ ] Monitoring or verification signals identified.
- [ ] Data/API compatibility validated.
- [ ] Rollback or recovery procedure tested or explicitly assessed.

## Final Review
- [ ] Diff reviewed for accidental scope and secrets.
- [ ] Tests, documentation, and related project documents reviewed.
- [ ] High-risk findings resolved.
- [ ] Low-risk follow-ups recorded.

## Documentation and comment check
- [ ] Public API, exported functions, classes, methods, hooks, and endpoints are documented with the idiomatic format of the language (JSDoc/TSDoc, docstrings, Go doc comments, rustdoc, XML comments).
- [ ] Documentation includes purpose, parameters, return value, thrown errors or failure behavior, side effects, and important preconditions where applicable.
- [ ] Private functions have documentation when their behavior is non-obvious, their logic is complex, or their constraints would not be clear from the name and types alone.
- [ ] Comments are concise and meaningful: they explain non-obvious business rules, algorithms, workarounds, invariants, security assumptions, lifecycle constraints, and intentional trade-offs.
- [ ] Comments do not excuse unclear naming or avoid decomposition — if a comment is needed to explain the code, the code itself should be clarified.
- [ ] Documentation is updated whenever behavior or contracts change.
- [ ] No dead code, no unrelated scope, and no leaked secrets in the diff.
- [ ] Documentation and project context are current.

## Definition of Done
- [ ] Agreed behavior works.
- [ ] Relevant checks pass and results are recorded.
- [ ] Documentation and project context are current.
- [ ] No unintended scope or secrets are in the diff.
- [ ] Known follow-ups are recorded.

## Revisions
