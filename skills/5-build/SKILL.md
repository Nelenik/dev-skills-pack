---
name: 5-build
description: "Implement exactly one approved task at a time within its file whitelist, verify it with evidence, report, and stop. Never selects or starts the next task on its own."
---
# 5-build — Implement One Task, Verify, Report, Stop

> Working agreement: `AGENTS.md` (dev-skills-pack block). Read it first if it is not already in context.

You implement tasks the developer approved. You do not decide what to build, in what order, which files to touch, or when to continue.

## Preconditions (check before editing anything)

1. `project/state.md` exists and the detect step of `18-sync` found nothing unresolved.
2. The active work folder's `tasks.md` has file-level `status: approved`; the task's dependencies are `done`; its own status is `todo` or `in-progress`; and the developer explicitly told you to start that task. `approved` is never an individual task status.
3. The parent spec and plan are `status: approved`.

If any condition is false, do not build. Say which one is missing and propose the skill that fixes it (`4-spec`, `6-plan`, `17-tasks`, `18-sync`).

## Execution loop (one task)

1. Read the task and the current code of the listed files, plus only the read-only context needed to understand them. Run the baseline checks and note the result.
2. Implement the smallest change that satisfies the task's acceptance. Edit only whitelisted implementation/test files, plus the limited workflow files needed to record status/evidence (`state.md`, active `tasks.md`, `backlog.md` when needed, and the sync report).
3. Stop and ask instead of continuing when: another file must change, a dependency or generator is needed, the task is larger than described, the spec or plan looks wrong, or a requirement is ambiguous. Do not widen scope silently and do not "fix it quickly".
4. Run the task's acceptance checks and the baseline gates for the current phase (`8-verify`, "Phase baseline"). Record the exact commands and real results in the task's `Evidence` field.
5. Review your own diff: only whitelisted files, no secrets, no unrelated edits, no dead code, documentation and comments per the quality gate below.
6. Set the task status to `review` (never `done`), update `tasks.md` and `state.md`, and park anything you noticed but did not do in `project/backlog.md`. Do not modify approved specs, plans, PRDs, or other documents under this administrative exception.
7. Output the task report defined in `AGENTS.md` using `Result`, `Next step`, `Command`, and `Approval`, then stop. Do not start the next task or equate successful verification with developer acceptance. Do not commit unless the developer asked.

## Batch mode

Only when the developer names the tasks ("do T-04 to T-06"). Report after each task and stop at the first failed check or deviation.

## Ad-hoc mode

Only when the developer explicitly asks for a small change outside the task list. For a local, reversible bug, use the short route: one-sentence intent, up to 3 implementation/test files, explicit "go", focused checks, and a concise report. Do not create PRD, roadmap, spec, or plan documents. The developer still chooses the mode and authorizes execution; the agent does not decide that a change is small enough. Use `project/checklist.md` ([templates/checklist-template.md](templates/checklist-template.md)) only when evidence needs to persist. If behavior, public contracts, data, security, infrastructure, or architecture is affected, stop and propose `17-tasks`, `4-spec`, or `6-plan` instead.

## Deviations

If implementation contradicts the spec or plan, stop and describe the contradiction with options. The developer decides; record the outcome under `## Revisions` of the affected document. Never use destructive git operations. Preserve unrelated changes, including the developer's manual edits.

### Stop and resume protocol

When the task cannot be completed within its approved scope: record what changed, do not expand the whitelist or start another task, show the actual diff and checks, explain the blocker, and offer the options to fix within scope, revise the specification, or split the task. Wait for the developer's decision, update only the documents they approve, and continue only after explicit permission.

Ad-hoc mode is selected by the developer. It is limited to a small, local, reversible bug with an explicit file list and checks; behavior changes, public contracts, data models, security, infrastructure, and architectural refactors require the corresponding planning/design flow.

## Engineering quality gate

Apply this gate proportionally to the change and its risk, using `8-verify` as the authoritative selection of applicable checks. Small local UI changes need focused UI, accessibility, and relevant-test checks; business logic needs boundary and failure-path checks; API, authorization, database, migration, infrastructure, and contract changes require their specialized gates. Documentation is required for public/reusable interfaces and non-obvious behavior, not mechanically for every function. Do not impose unrelated gates on low-risk changes.

Apply these rules to new code and to the parts of existing code touched by the change, regardless of language, framework, or application type. These rules apply only to the files in the task whitelist. If a rule shows that structure outside the whitelist or a larger refactor is needed, do not do it: describe it in the task report and put it in `backlog.md`, or propose a task. Inside the whitelist, make only the smallest refactor the task itself needs. Do not perform unrelated broad rewrites.

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
- `roadmap.md`: stages and their status (developer-controlled);
- `plan.md`: change-specific sequence, risks, rollout, and rollback;
- `tasks.md`: task state and evidence (`checklist.md` is used only for ad-hoc work).

When a decision changes, propose an update to the smallest authoritative document and the downstream documents that depend on it, show the diff, and apply it after the developer agrees. When code and documents disagree, code wins; list the divergences through `18-sync`. Do not duplicate conflicting copies. Record the reason in `## Revisions` and link related documents when useful. Before completion, compare the diff against this list and note documents that were intentionally unchanged.

## Review gate

For planned work, migrations, public contracts, security-sensitive changes, or changes touching multiple components, perform a final review before marking the increment done. Review the diff, tests, data migration, compatibility, observability, documentation, rollout, rollback, and accidental scope. Record findings and their resolution in the task's `Evidence` field (or in `checklist.md` for ad-hoc work). Unresolved high-risk findings block completion; low-risk follow-ups must be recorded explicitly.

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

If requirements are unclear, stop and propose `2-scope` or `3-prd`. If technical decisions are missing, propose `4-spec`. If a task is bigger or riskier than described, stop and propose splitting it through `17-tasks` or revising `6-plan`. When a stage closes, `16-roadmap` updates `project/context.md`; there is no separate ship stage in this workflow.

## Definition of Done

The agent sets a finished task to `review`; only the developer sets `done`. A task is ready for review only when its agreed behavior works, relevant automated checks pass, manual checks are recorded, documentation and project context are current, migrations or rollout steps are verified, no unintended scope or secrets are present in the diff, and known follow-ups are recorded. For planned work, the task's acceptance checks and evidence must be complete. Apply `8-verify` before completion; for rollout changes apply `10-release`. If any condition is unknown, mark the increment incomplete rather than guessing.

## Completion criteria by change type

The per-type gates (frontend/UI, backend/API, databases, integrations, CLI/workers, security, deployment) live in `8-verify`. Apply only those that the plan or task marks as relevant, at the tier that matches the phase (`8-verify`, "Phase baseline"), and record the evidence in the task's `Evidence` field.

Resume from `project/state.md`, the active `tasks.md`, project documents, and git state. This skill is the execution path for approved tasks in every phase; it never selects the next task by itself.
