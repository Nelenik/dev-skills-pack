# TODO

Deferred improvements to increase the quality and practical usefulness of the skill pack.

## Priority improvements

- [x] Add executable completion criteria for different change types:
  - [x] frontend and UI;
  - [x] backend and API;
  - [x] databases and migrations;
  - [x] integrations and distributed systems;
  - [x] CLI, workers, and batch jobs;
  - [x] security-sensitive changes;
  - [x] deployment and infrastructure.
- [x] Link every important rule to evidence of completion: a command, test, manual check, or artifact.
- [x] Add an evidence and mandatory quality gates section to the `checklist.md` template.
- [x] Describe a risk matrix for low-, medium-, and high-risk changes and the corresponding level of verification.

## Security and production readiness

- [x] Add a security workflow: threat modeling, trust boundaries, abuse cases, and security tests.
- [x] Add checks for secrets, dependencies, vulnerabilities, and unsafe logging.
- [x] Describe CI/CD requirements: lint, typecheck, tests, build, migration checks, and quality gates.
- [x] Add recommendations for rollout strategy, feature flags, canary releases, and rollback.
- [x] Expand observability recommendations: structured logs, metrics, tracing, correlation IDs, and health checks.

## Architecture and maintainability

- [x] Add rules for Architecture Decision Records (ADR): decision, alternatives, trade-offs, and consequences.
- [x] Add a technical debt management process: recording, impact assessment, prioritization, and follow-up.
- [x] Describe code review rules: blocking findings, and checks for scope, compatibility, security, and tests.
- [x] Add recommendations for non-functional requirements: performance, availability, scalability, privacy, and operability.
- [x] Add rules for checking requirement quality: testable acceptance criteria, edge cases, and failure scenarios.

## Documentation and developer experience

- [x] Synchronize comment and doc-comment recommendations with the checklist and review gate.
- [x] Add templates for ADRs, risk assessments, and release/rollback plans.
- [x] Add quality gate examples for JavaScript/TypeScript, Python, Go, Rust, and C#/.NET.
- [x] Recheck the README and installation instructions after future changes to the skill structure.

## New items (added during implementation)

- [ ] Add incident management and on-call readiness (created `12-incident` skill).
- [ ] Add concrete examples of ADRs, risk assessments, and release/rollback plans to `references/`.
- [ ] Add migration-specific gate examples (dry-run, idempotency, rollback test) to `8-verify/references/gate-examples.md`.
- [ ] Add performance testing gate examples (load testing, benchmarking) to `8-verify/references/gate-examples.md`.
- [ ] Add feature flag management process (flag lifecycle, kill switch testing, flag cleanup).
- [ ] Add dependency update process (security updates vs. minor vs. major, testing strategy).
- [ ] Add data retention and deletion policy guidance.
- [ ] Add backup and disaster recovery procedure template.
- [ ] Add post-mortem template and process.
- [ ] Add on-call rotation and runbook template.
- [ ] Add language-specific lint/typecheck/test command examples for additional stacks (Ruby, PHP, Elixir, etc.).

## Implementation principle

New rules should apply to the specific type of task and be verifiable whenever possible. Do not turn every small change into a full production-readiness audit.