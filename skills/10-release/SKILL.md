---
name: 10-release
description: "Release and operations: CI/CD gates, rollout strategy, rollback, observability."
---

# 10-release — Release & Operations

Use for rollout, deployment, or operational changes.

## CI/CD gates

The following gates must pass before a release. Mark each gate with evidence (command output, pipeline log, or artifact).

### Lint
- [ ] Lint passes with no errors. Evidence: `<command>` output.
- [ ] Lint warnings reviewed and either fixed or explicitly accepted. Evidence: `<command>` output.

### Typecheck
- [ ] Typecheck passes with no errors. Evidence: `<command>` output.

### Tests
- [ ] Unit tests pass. Evidence: `<command>` output.
- [ ] Integration tests pass. Evidence: `<command>` output.
- [ ] Contract tests pass. Evidence: `<command>` output.
- [ ] E2E smoke tests pass. Evidence: `<command>` output.

### Build
- [ ] Build succeeds and produces expected artifacts. Evidence: build log or artifact hash.

### Migration checks
- [ ] Migrations are safe for existing data and running versions. Evidence: dry-run output or rollback test.
- [ ] Migration is idempotent. Evidence: idempotency test output.
- [ ] Backup/recovery steps documented. Evidence: backup procedure document.

### Security scan
- [ ] Secrets scan passes (no secrets in source or logs). Evidence: `gitleaks detect` or equivalent output.
- [ ] Dependency vulnerability scan passes. Evidence: `npm audit`, `pip-audit`, `cargo audit`, or equivalent output.
- [ ] Unsafe logging check passes. Evidence: grep output or static analysis report.

### Quality gates
- [ ] All applicable `8-verify` gates pass with evidence recorded in the task's `Evidence` field (or `project/checklist.md` for ad-hoc work).

## Rollout strategy

For risky changes, use a staged rollout. For small, low-risk changes, a direct rollout may be acceptable.

### Feature flags
- Wrap risky or new behavior behind a feature flag.
- The flag must have a kill switch that can disable the behavior without a redeploy.
- Document the flag name, default state, and who controls it.

### Canary or staged rollout
- Deploy to a small percentage of traffic first (e.g. 5%).
- Monitor for errors, latency, and user impact.
- Gradually increase traffic (e.g. 25%, 50%, 100%).
- Document the rollout stages, thresholds, and who approves each stage.

### Compatibility
- Verify backward compatibility between the new version and old clients.
- For breaking changes, document the migration path and deprecation timeline.
- For infrastructure changes, verify compatibility between application and infrastructure versions.

## Rollback

Every release must have a documented rollback procedure.

### Rollback procedure
- Document the exact steps to roll back.
- Include the command or UI action to trigger rollback.
- Identify who is authorized to trigger rollback.
- Test the rollback procedure before release when possible.

### Data migration rollback
- For data migrations, document how to reverse or restore data.
- Include backup/restore steps and validation checks.
- Verify that rollback is safe for running versions and concurrent traffic.

### Feature flag kill switch
- For flag-wrapped changes, verify the kill switch works before release.
- Document the flag name and expected behavior when disabled.

## Observability

Changes that affect production behavior must add or preserve observability signals.

### Structured logs
- Use structured logs (JSON) with consistent fields.
- Include correlation IDs to trace requests across services.
- Never log secrets, PII, or sensitive data.

### Metrics
- Add metrics for key paths: latency, error rate, throughput.
- Use meaningful metric names and labels.
- Ensure metrics are queryable and alertable.

### Tracing
- Use distributed tracing where applicable (e.g. OpenTelemetry).
- Propagate trace IDs across service boundaries.

### Health and readiness checks
- Implement health and readiness endpoints.
- Ensure the orchestrator or load balancer can detect unhealthy instances.
- Verify that readiness checks reflect actual dependencies.

### Alertable failure behavior
- Define what constitutes a failure that requires an alert.
- Ensure alerts are actionable and have runbooks.
- Test alerting before release when possible.

## Routing

Plan rollout → `6-plan`. Implementation → `5-build`. Verification → `8-verify`.
