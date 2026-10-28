---
name: 7-review
description: Review code changes for correctness, maintainability, security, compatibility, and missing verification without modifying the implementation by default.
---

# 7-review — Review Changes

Review the requested diff, pull request, commit range, or implementation against its requirements and surrounding code. Produce actionable findings with evidence. Do not modify files, rewrite the implementation, or approve a change by default; if the user asks for fixes, route the implementation through `5-build`.

## Review scope

Start by identifying:

- the exact diff or files in scope;
- the intended behavior, acceptance criteria, approved spec, or plan;
- the repository conventions, project documents, and existing tests that define the baseline;
- whether the change affects public contracts, data, security, deployment, or compatibility.

Preserve unrelated user changes and do not review generated files or vendored code as application logic unless they are directly relevant to the risk.

## Review procedure

1. Inspect repository state, the complete diff, changed-file context, and relevant history.
2. Trace changed behavior through its callers, consumers, persistence, external integrations, and error paths.
3. Compare the implementation with requirements, contracts, project documents, and existing conventions.
4. Check correctness, edge cases, failure handling, security, performance, maintainability, observability, and compatibility according to the change type.
5. Verify that tests and other checks cover the changed behavior. Run focused read-only checks when the repository supports them; never claim checks ran when they did not.
6. Report findings ordered by severity, then summarize verified strengths, missing evidence, and recommended follow-ups.

## Review quality gates

Apply only the gates relevant to the change:

- **Correctness:** happy path, boundary values, invalid input, empty state, failure path, retry, timeout, cancellation, concurrency, and cleanup behavior.
- **Architecture:** clear responsibility boundaries, narrow interfaces, no accidental coupling, no duplicated source of truth, and appropriate module/component decomposition.
- **Security:** authentication and authorization, trust boundaries, input validation, secrets, sensitive data in logs, dependency risk, injection, and abuse cases.
- **Data and compatibility:** schema and migration safety, data integrity, idempotency, backward compatibility, API contracts, and rollback or recovery assumptions.
- **Testing:** focused tests for business rules and failure paths, deterministic behavior, regression coverage, and meaningful verification evidence.
- **Operations:** logging, metrics, tracing, health checks, resource limits, graceful shutdown, rollout, feature flags, and alertable failure behavior where applicable.
- **Maintainability:** understandable names and control flow, appropriate comments or doc comments for non-obvious logic, no dead code, no unrelated scope, and documentation synchronized with behavior.
- **Frontend:** accessibility, loading/error/empty states, unnecessary re-renders, state ownership, server/client boundaries, and component decomposition where applicable.

## Blocking findings

These findings block merge or release and must be resolved before the change can proceed:

- Data loss, corruption, or irreversible migration without rollback.
- Security vulnerability: auth bypass, injection, privilege escalation, or secret exposure.
- Severe outage or broken core behavior in a common path.
- Invalid migration or deployment path that cannot be rolled back.
- Missing tests for high-risk paths with no recorded follow-up.
- Breaking change to a public contract without documentation or migration plan.
- Unsafe logging of secrets or PII.

## Non-blocking findings

These findings should be resolved before merge when practical, or recorded as explicit follow-ups:

- Medium: real defect or maintainability problem with limited scope, missing important coverage, or a risky assumption.
- Low: minor clarity, consistency, or non-blocking improvement.

## Finding severity

Use these levels consistently:

- **Blocker:** likely data loss, security vulnerability, severe outage, broken core behavior, or an invalid migration/deployment path. Must be resolved before merge or release.
- **High:** significant correctness, compatibility, security, or operational risk affecting common paths. Should be resolved before merge.
- **Medium:** real defect or maintainability problem with limited scope, missing important coverage, or a risky assumption. Resolve before merge when practical; otherwise record a follow-up.
- **Low:** minor clarity, consistency, or non-blocking improvement. Do not obscure higher-risk findings.

Do not report hypothetical concerns without a plausible failure path. Do not downgrade a finding merely because it is easy to fix.

## Finding format

Each finding should be concise and include:

~~~text
[Severity] path/to/file:line — short problem
Why it matters: concrete failure mode or maintainability impact.
Suggested direction: the smallest reasonable correction or verification.
~~~

Reference the narrowest relevant location. Separate independent issues. If no findings exist, say so explicitly and state what was checked and what could not be verified.

## Review output

Return the outcome in this order:

1. Findings, ordered from highest to lowest severity.
2. Verification performed and its results.
3. Remaining uncertainty, missing tests, or follow-ups.
4. Short summary of the change's overall risk.

Do not claim that code is fully correct or production-ready when tests, environments, requirements, or deployment evidence were unavailable. A clean review means no issues were found within the inspected scope, not that every possible defect was disproven.

## Pre-build consistency check (read-only)

Run after `17-tasks` and before the first `5-build` task of a stage or change, or when the developer asks. Nothing is edited; the output is a report in chat.

Check that:

- every requirement or exit criterion covered by the spec and plan is covered by at least one task, and every task traces to one (no orphan tasks, no uncovered requirements);
- every task has a file whitelist of at most 3 files, or an approved written reason for more, and its acceptance is a concrete command or manual step;
- task dependencies are acyclic and early tasks leave the project runnable;
- specs and plan respect the binding conventions in `context.md` and do not contradict each other or the PRD;
- risk levels are proposed for risky tasks and generator or scaffolder tasks name the exact command and expected files;
- nothing in the tasks belongs to a later stage.

Report findings with the usual severities; the developer decides how to resolve each, then `17-tasks` or the owning document is revised.

## Routing

After review, report `Result`, `Next step`, `Command`, and `Approval`. If the task list passes, recommend `5-build` with `Invoke skill `5-build`` for the specifically authorized task; otherwise recommend the single action needed to resolve the finding and wait.

If requirements or acceptance criteria are unclear, return to `2-prd`. If the technical design is the problem, use `4-spec`. If the change needs implementation fixes, use `5-build`. If security, release, or test-coverage gaps appear, use `9-security`, `10-release`, or `11-test-strategy`. If the review exposes a broad refactor, migration, rollout, or other multi-step change, use `6-plan` before implementation.
