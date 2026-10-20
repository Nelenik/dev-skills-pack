# TODO

Deferred improvements to increase the quality and practical usefulness of the skill pack.

## Priority improvements

- [ ] Add executable completion criteria for different change types:
  - [ ] frontend and UI;
  - [ ] backend and API;
  - [ ] databases and migrations;
  - [ ] integrations and distributed systems;
  - [ ] CLI, workers, and batch jobs;
  - [ ] security-sensitive changes;
  - [ ] deployment and infrastructure.
- [ ] Link every important rule to evidence of completion: a command, test, manual check, or artifact.
- [ ] Add an evidence and mandatory quality gates section to the `checklist.md` template.
- [ ] Describe a risk matrix for low-, medium-, and high-risk changes and the corresponding level of verification.

## Security and production readiness

- [ ] Add a security workflow: threat modeling, trust boundaries, abuse cases, and security tests.
- [ ] Add checks for secrets, dependencies, vulnerabilities, and unsafe logging.
- [ ] Describe CI/CD requirements: lint, typecheck, tests, build, migration checks, and quality gates.
- [ ] Add recommendations for rollout strategy, feature flags, canary releases, and rollback.
- [ ] Expand observability recommendations: structured logs, metrics, tracing, correlation IDs, and health checks.

## Architecture and maintainability

- [ ] Add rules for Architecture Decision Records (ADR): decision, alternatives, trade-offs, and consequences.
- [ ] Add a technical debt management process: recording, impact assessment, prioritization, and follow-up.
- [ ] Describe code review rules: blocking findings, and checks for scope, compatibility, security, and tests.
- [ ] Add recommendations for non-functional requirements: performance, availability, scalability, privacy, and operability.
- [ ] Add rules for checking requirement quality: testable acceptance criteria, edge cases, and failure scenarios.

## Documentation and developer experience

- [ ] Synchronize comment and doc-comment recommendations with the checklist and review gate.
- [ ] Add templates for ADRs, risk assessments, and release/rollback plans.
- [ ] Add quality gate examples for JavaScript/TypeScript, Python, Go, Rust, and C#/.NET.
- [ ] Recheck the README and installation instructions after future changes to the skill structure.

## Implementation principle

New rules should apply to the specific type of task and be verifiable whenever possible. Do not turn every small change into a full production-readiness audit.
