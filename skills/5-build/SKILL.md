---
name: 5-build
description: "Implement and verify planned changes in coherent increments, from small fixes through multi-step production work."
---
# 5-build — Implement and Verify

Inspect repository state and relevant project documents before editing. Preserve unrelated user changes. Use `project/checklist.md` as the execution record; create it when needed from the approved scope, PRD, spec, or plan.

Use [templates/checklist-template.md](templates/checklist-template.md) as the starting structure for planned work, adapting the slices and evidence to the actual change.

## Choose execution mode

- **Direct mode:** one or a few localized files, clear behavior, reversible change, no data/schema/public-contract/security/deployment impact. Do an impact check, implement, verify, and summarize.
- **Planned mode:** multiple components, migrations, public APIs, dependency upgrades, risky refactors, rollout work, or unclear behavior. Require an approved `project/plan.md` or `project/spec.md`, then execute ordered slices.

## Checklist format

For planned work, each slice must contain: objective, affected paths/components, dependencies, implementation notes, verification commands and manual checks, rollback or recovery note when relevant, and completion evidence. Keep dependencies explicit and never mark a slice complete without evidence.

## Execution loop

1. Read the slice and inspect the current code.
2. Implement the smallest coherent change.
3. Run focused tests, type checks, lint, build, migration validation, or manual checks appropriate to the change.
4. Run `8-verify` for this slice; record evidence in the checklist.
5. Review the diff for accidental scope, secrets, compatibility problems, and missing documentation.
5. Update the checklist and affected project documents with actual results.
6. Commit at a stable recovery point when the repository workflow expects commits.

## Engineering quality gate

Apply these rules to new code and to the parts of existing code touched by the change, regardless of language, framework, or application type. Do not preserve a clearly unhealthy structure merely because the requested behavior is small; make the smallest safe refactor needed to keep the design maintainable. Do not perform unrelated broad rewrites.

### General software engineering practices

- Keep each module, class, function, and command focused on one clear responsibility. Separate domain logic, orchestration, I/O, presentation, persistence, and configuration instead of mixing them in one unit.
- Prefer small, composable units with explicit inputs and outputs. Keep public interfaces narrow and stable; avoid hidden global state, implicit coupling, unnecessary inheritance, and abstractions that do not remove real duplication or complexity.
- Organize code by feature or domain boundary when that makes ownership and change impact clearer. Avoid dumping grounds such as generic `utils`, `helpers`, `common`, or `misc` modules; name modules after the behavior or domain they own.
- Treat large or difficult-to-review files as decomposition signals. Roughly 200–300 lines for a module or class, deeply nested control flow, many parameters, repeated branches, or several unrelated responsibilities should trigger a refactoring review. These are review signals, not absolute limits.
- Keep side effects at explicit boundaries. Isolate network, filesystem, database, process, time, randomness, and external-service access from pure logic so behavior can be tested deterministically.
- Make failure behavior deliberate: validate inputs at boundaries, preserve useful error context, use typed or structured errors where appropriate, and handle retries, timeouts, cancellation, partial failure, and cleanup according to the operation's risk.
- Avoid duplicated sources of truth and derived state that can drift. Define ownership, invariants, lifecycle, and concurrency assumptions for shared state and resources.
- Prefer clear, boring code over clever code. Optimize only where evidence supports it, and document non-obvious trade-offs, invariants, security assumptions, and compatibility constraints near the code.
- Write code so another developer can understand its intent and reasoning. Add concise, meaningful comments for non-obvious business rules, algorithms, workarounds, invariants, security assumptions, lifecycle constraints, and intentional trade-offs; do not use comments to excuse unclear naming or avoid decomposition.
- Document every public function, exported function, class, method, hook, endpoint, and other reusable entry point with the idiomatic documentation format of the language: for example JSDoc/TSDoc in JavaScript/TypeScript, docstrings in Python, Go doc comments in Go, rustdoc in Rust, or XML documentation comments in C#/.NET. Include purpose, parameters, return value, thrown errors or failure behavior, side effects, and important preconditions where applicable.
- Add documentation to private functions as well when their behavior is non-obvious, their logic is complex, or their constraints would not be clear from the name and types alone. Keep documentation next to the code and update it whenever behavior or contracts change.
- Add focused tests for business rules, edge cases, failure paths, and public contracts. Keep tests independent, deterministic, and proportional to risk; do not weaken production design merely to satisfy brittle tests.
- Preserve backwards compatibility deliberately. For changed contracts, update consumers, validation, documentation, migrations, observability, and rollback or recovery procedures as applicable.
- Before completion, inspect changed code for dead paths, accidental scope, leaked secrets, unsafe logging, resource leaks, race conditions, unnecessary work, and missing documentation. Record intentional exceptions and follow-ups in the checklist.

### React and Next.js adaptation

- Keep each component focused on one presentational or domain responsibility. A page may compose several feature components, but it should not also contain all data fetching, form orchestration, transformation, and complex rendering logic.
- Treat a component as a decomposition signal when it grows beyond roughly 200 lines, contains more than one major visual section, has deeply nested conditionals or JSX, or has several independent stateful concerns. These are review triggers, not absolute limits.
- Extract repeated or independently understandable UI into named components with explicit props. Prefer composition and small focused components over boolean-prop combinations that create many modes.
- Move reusable stateful behavior into custom hooks. Keep hooks responsible for state, effects, subscriptions, and event orchestration; keep rendering components responsible for UI. A hook should have a clear purpose and stable input/output contract.
- Move pure transformations, validation, constants, and domain calculations out of JSX and into appropriately named modules. Keep API/data-access code behind a small service, query, or server-action boundary rather than embedding it throughout the view.
- Avoid a generic `utils` or `hooks` dumping ground. Place code near its feature and give modules names that describe the behavior they own.
- Keep state as close as possible to its consumers. Do not lift state or introduce global state unless multiple distant consumers genuinely require the same source of truth. Remove duplicated, derived, and synchronization-prone state.
- In Next.js, preserve the Server/Client Component boundary deliberately. Use `"use client"` only where browser APIs, interactivity, or client-only hooks require it; do not make an entire page client-rendered to support one small interactive child. Keep secrets and server-only data out of client modules.

### Frontend maintainability and review signals

- Avoid files that mix unrelated concerns. When a file becomes difficult to scan, test, or explain, split it by responsibility even if it is below a line-count threshold.
- Prefer explicit types, narrow props, predictable data flow, and accessible semantic markup. Do not hide behavior in clever abstractions or premature design-system layers.
- Add or update focused tests for extracted hooks, non-trivial logic, and important component behavior. Refactoring must preserve existing behavior unless a behavior change is explicitly part of the request.
- Before completion, inspect changed files for oversized components, duplicated logic, hidden side effects, unnecessary re-renders, missing loading/error/empty states, accessibility regressions, and dead code. Record intentional exceptions and follow-ups in the checklist.

### Adaptations by system type

Apply only the adaptations relevant to the change. Do not impose a distributed-systems, database, or deployment checklist on an unrelated small task.

- **Backend and APIs:** validate inputs at the boundary; enforce authentication and authorization on the server; use stable response and error contracts; handle pagination, rate limits, idempotency, timeouts, and backward compatibility deliberately.
- **Databases and migrations:** verify indexes, constraints, nullability, locking, transaction boundaries, and query performance; make migrations safe for existing data and running versions; define backup, rollback or recovery, validation, and cleanup steps.
- **Asynchronous and concurrent systems:** define cancellation, timeout, retry and backoff behavior; protect against duplicate processing, race conditions, unbounded queues, resource leaks, and non-graceful shutdown.
- **External integrations and distributed systems:** isolate provider-specific code; define timeouts, retries, circuit breaking or fallback behavior; preserve correlation IDs; test malformed, delayed, duplicated, and unavailable responses with contract or integration tests.
- **Security-sensitive changes:** keep secrets and personal data out of source and logs; review trust boundaries, permissions, input handling, dependency risk, and abuse cases; make security assumptions explicit and verify them in tests or checks.
- **Observability and operations:** add structured logs, useful metrics, tracing or request IDs, health/readiness checks, and actionable failure context when the change affects production behavior.
- **CLI, workers, and batch jobs:** use meaningful exit codes; support safe retries, dry-run where useful, resumability, progress or status reporting, bounded resource usage, and idempotent processing.
- **Libraries and SDKs:** keep the public API minimal and explicit; preserve compatibility or document breaking changes; update examples, changelog, type declarations, and compatibility tests.
- **Performance-sensitive code:** establish a baseline and measure before optimizing; inspect memory, CPU, I/O, query count, payload size, caching, and N+1 behavior; document the reason for non-obvious optimizations.
- **Configuration and deployment:** distinguish configuration from secrets; validate required configuration at startup; document rollout order, feature flags, health checks, rollback, and compatibility between application and infrastructure versions.

For migrations, verify preconditions, backup/recovery assumptions, idempotency, staged rollout, data validation, and cleanup separately. Never claim a migration or deployment ran when it did not.

If implementation contradicts the plan, inspect downstream impact, update only affected documents, record the reason under `## Revisions`, and seek agreement when user-visible behavior, data safety, compatibility, or architecture changes. Do not use destructive git operations without explicit consent.

## Document synchronization

Keep the documents aligned with the code and with each other:

- `context.md`: current status, capabilities, architecture map, risks, and links;
- `scope.md`: product direction, boundaries, priorities, and non-goals;
- `prd.md`: user-facing behavior and acceptance criteria;
- `spec.md`: technical design, contracts, data, and operational decisions;
- `plan.md`: change-specific sequence, risks, rollout, and rollback;
- `checklist.md`: execution state and evidence.

When a decision changes, update the smallest authoritative document and all downstream documents that depend on it. Do not duplicate conflicting copies. Record the reason in `## Revisions` and link related documents when useful. Before completion, compare the diff against this list and note documents that were intentionally unchanged.

## Review gate

For planned work, migrations, public contracts, security-sensitive changes, or changes touching multiple components, perform a final review before marking the increment done. Review the diff, tests, data migration, compatibility, observability, documentation, rollout, rollback, and accidental scope. Record findings and their resolution in the checklist. Unresolved high-risk findings block completion; low-risk follow-ups must be recorded explicitly.

### Documentation and comment check

Before completion, verify that documentation is synchronized with the code:

- [ ] Public API, exported functions, classes, methods, hooks, and endpoints are documented with the idiomatic format of the language (JSDoc/TSDoc, docstrings, Go doc comments, rustdoc, XML comments).
- [ ] Documentation includes purpose, parameters, return value, thrown errors or failure behavior, side effects, and important preconditions where applicable.
- [ ] Private functions have documentation when their behavior is non-obvious, their logic is complex, or their constraints would not be clear from the name and types alone.
- [ ] Comments are concise and meaningful: they explain non-obvious business rules, algorithms, workarounds, invariants, security assumptions, lifecycle constraints, and intentional trade-offs.
- [ ] Comments do not excuse unclear naming or avoid decomposition — if a comment is needed to explain the code, the code itself should be clarified.
- [ ] Documentation is updated whenever behavior or contracts change.
- [ ] No dead code, no unrelated scope, and no leaked secrets in the diff.
- [ ] Documentation and project context are current.

## Routing

If requirements are unclear, return to `2-scope` or `3-prd`. If technical decisions are missing, use `4-spec`. If the work is bigger or riskier than expected, pause and create/update `6-plan`. When the increment is verified, update `project/context.md`; there is no separate ship stage in this workflow.

## Definition of Done

An increment is done only when its agreed behavior works, relevant automated checks pass, manual checks are recorded, documentation and project context are current, migrations or rollout steps are verified, no unintended scope or secrets are present in the diff, and known follow-ups are recorded. For planned work, all checklist slices and evidence must be complete. Apply `8-verify` before completion; for rollout changes apply `10-release`. If any condition is unknown, mark the increment incomplete rather than guessing.

## Completion criteria by change type

Before marking an increment complete, verify the applicable criteria below. Each criterion must have evidence recorded in `project/checklist.md`.

### Frontend / UI
- [ ] Component decomposition signals checked (size, nesting, mixed concerns).
- [ ] Loading, empty, and error states are present and visible.
- [ ] Accessibility: semantic markup, keyboard navigation, focus management.
- [ ] No unnecessary re-renders; state ownership is justified.
- [ ] Tests for hooks and non-trivial logic pass.
- [ ] Evidence recorded in checklist.

### Backend / API
- [ ] Input validation at the boundary.
- [ ] Auth/authz enforced server-side.
- [ ] Stable response and error contracts documented.
- [ ] Pagination, rate limits, idempotency, timeouts handled deliberately.
- [ ] Backward compatibility preserved or breaking change documented.
- [ ] Evidence recorded in checklist.

### Databases / Migrations
- [ ] Indexes, constraints, nullability, locking reviewed.
- [ ] Migration is safe for existing data and running versions.
- [ ] Backup/rollback/recovery steps documented and verified.
- [ ] Idempotency and data validation confirmed.
- [ ] Evidence recorded in checklist.

### Integrations / Distributed
- [ ] Provider-specific code is isolated.
- [ ] Timeouts, retries, circuit breaking/fallback behavior defined.
- [ ] Contract/integration tests cover malformed, delayed, duplicated, and unavailable responses.
- [ ] Correlation IDs preserved across boundaries.
- [ ] Evidence recorded in checklist.

### CLI / Workers / Batch
- [ ] Meaningful exit codes.
- [ ] Safe retries, resumability, progress reporting.
- [ ] Bounded resource usage, idempotent processing.
- [ ] Evidence recorded in checklist.

### Security-sensitive changes
- [ ] Threat model documented (`9-security`).
- [ ] Trust boundaries and abuse cases reviewed.
- [ ] Secrets scan passed (no secrets in source or logs).
- [ ] Security tests for authz, input validation, and abuse cases pass.
- [ ] Evidence recorded in checklist.

### Deployment / Infrastructure
- [ ] CI gates pass: lint, typecheck, tests, build.
- [ ] Migration checks pass.
- [ ] Security scan passes.
- [ ] Rollout strategy documented (feature flags, canary/staged).
- [ ] Rollback procedure documented and tested.
- [ ] Observability: structured logs, metrics, health checks, alertable failure behavior.
- [ ] Evidence recorded in checklist.

Resume from checklist, project documents, and git state. This skill remains the normal execution path after the first working version.
