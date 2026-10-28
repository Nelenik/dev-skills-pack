---
name: 7-verify
description: "Verify changes with evidence-based quality gates tailored to change type and risk level."
---

# 7-verify — Quality Gates & Evidence

Use after implementation or during review. Every gate item must link to evidence: a command, test, manual check, or artifact. No evidence = not verified.

## Phase baseline

- **`mvp` phase:** verify each task with its own acceptance checks plus the project's baseline commands that exist (lint, typecheck, build, and the tests covering the changed files). The heavier gates below (security, release, rollout, incident) apply only when the plan or task references them, in a dedicated hardening stage, or when the developer asks. Do not add gates on your own initiative.
- **`evolve` phase:** gates follow the risk level below.
- In every phase a gate without evidence is not verified, and the agent never marks a task `done`; it reports evidence and the developer accepts.

## Risk matrix

The risk level is proposed in the plan or task and confirmed by the developer. During implementation you may raise it and say so, but never lower it. The level determines which gates apply and how much verification is required.

### Low risk
- Localized, reversible, no contract/data/security/deploy impact.
- **Required verification:** focused checks only (unit tests, typecheck, lint on changed files).
- **Approval:** the agent reports evidence and sets the task to `review`; the developer accepts it.
- **Examples:** bug fix in one file, UI tweak, minor config change.

### Medium risk
- Multi-component or contract-touching, but no data migration or security exposure.
- **Required verification:** full relevant gates for the change type, plus a review gate.
- **Approval:** `6-review` run and findings resolved, then the developer accepts; high-risk findings block completion.
- **Examples:** API contract change, refactor touching several modules, dependency upgrade.

### High risk
- Migrations, public contracts, security-sensitive changes, deployment/infrastructure changes, or anything affecting user data or availability.
- **Required verification:** all applicable gates for the change type, plus rollback evidence, plus a review gate, plus a security gate when applicable.
- **Approval:** `6-review` run and findings resolved, `8-security` review when security-sensitive, then the developer accepts; rollback procedure must be documented and tested.
- **Examples:** database migration, breaking API change, auth change, infrastructure change, rollout to production.

## Change type completion criteria

Each change type has executable completion criteria. Copy the relevant gates into the task's acceptance and `Evidence` fields (or into `dev-workspace/checklist.md` for ad-hoc work) and mark them done with evidence. Do not mark a gate complete without a command, test, manual check, or artifact as evidence.

### Frontend / UI
- Component decomposition signals checked (size, nesting, mixed concerns).
- Loading/empty/error states present.
- Accessibility: semantic markup, keyboard, focus.
- No unnecessary re-renders; state ownership justified.
- Tests for hooks and non-trivial logic.
- **Completion evidence:** `npm run lint`, `npm run typecheck`, `npm test -- --watch=false`, manual accessibility check, component render test output.

### Backend / API
- Input validation at boundary.
- Auth/authz enforced server-side.
- Stable response/error contracts.
- Pagination, rate limits, idempotency, timeouts.
- Backward compatibility deliberate.
- **Completion evidence:** integration tests for validation and auth, contract test output, manual review of response contracts.

### Databases / Migrations
- Indexes, constraints, nullability, locking.
- Migration safe for existing data and running versions.
- Backup/rollback/recovery steps documented and verified.
- Idempotency and data validation.
- **Completion evidence:** migration dry-run output, rollback test result, data validation query output.

### Integrations / Distributed
- Provider code isolated.
- Timeouts, retries, circuit breaking/fallback.
- Contract/integration tests for malformed/delayed/duplicated/unavailable responses.
- Correlation IDs preserved.
- **Completion evidence:** contract test results, integration test output, correlation ID verification.

### CLI / Workers / Batch
- Meaningful exit codes.
- Safe retries, resumability, progress reporting.
- Bounded resource usage, idempotent processing.
- **Completion evidence:** exit code test output, retry/resume test output, resource usage report.

### Security-sensitive
- Route to `8-security`. Verify threat model, trust boundaries, abuse cases, secrets scan.
- **Completion evidence:** threat model document, security test results, secrets scan output (e.g. `gitleaks detect`).

### Deployment / Infrastructure
- Route to `9-release`. Verify CI gates, rollout, rollback, observability.
- **Completion evidence:** CI pipeline output, rollout plan, rollback test result, observability check output.

## Evidence format

Every gate item must link to evidence. No evidence = not verified.

Each checklist item: `- [ ] <gate> — evidence: <command/test/artifact>`.

Evidence must be one of:
- **Command:** a runnable command whose output proves the gate passes (e.g. `npm test -- --watch=false`, `npm run lint`, `npm run typecheck`, `npm run build`).
- **Test:** a specific test file or test case that covers the changed behavior.
- **Manual check:** a documented manual verification with its result recorded (e.g. "manual accessibility audit — passed").
- **Artifact:** a generated file, report, or screenshot that demonstrates the gate (e.g. migration dry-run output, security scan report).

Do not mark a gate complete without evidence. If a gate cannot be verified, record it as an open follow-up in `## Remaining uncertainty` and route to the appropriate skill (`4-build`, `8-security`, `9-release`, `10-test-strategy`).

## Routing

Select gates proportionally to task type and risk. Verification evidence supports review; it does not accept the task or authorize the next task.

After verification, report `Result`, `Next step`, `Command`, and `Approval`. If evidence is complete, recommend the developer's acceptance or stage-close decision; if evidence is missing, recommend `4-build` with `Invoke skill `4-build``. Do not mark a task done or close a stage autonomously.

Missing evidence → report it and propose returning to `4-build`; do not route yourself. Security/deploy gates → `8-security` / `9-release`. Test coverage gaps → `10-test-strategy`.
