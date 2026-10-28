# Release plan template

## Change summary
- What is being released?
- Why? (motivation, user impact, business value)

## Prerequisites
- [ ] All CI/CD gates pass (lint, typecheck, tests, build, migration checks, security scan).
- [ ] All `7-verify` quality gates pass with evidence recorded in the task's `Evidence` field (or `dev-workspace/checklist.md` for ad-hoc work).
- [ ] Rollout strategy approved.
- [ ] Rollback procedure documented and tested.
- [ ] Observability signals verified (logs, metrics, health checks, alerts).
- [ ] Feature flags configured (if applicable).

## Rollout stages
| Stage | Traffic % | Trigger | Approval | Monitoring |
|-------|-----------|---------|----------|------------|
| Canary | 5% | Deploy complete | Owner | Error rate, latency |
| Staged | 25% | Canary healthy | Owner | Error rate, latency, user impact |
| Full | 100% | Staged healthy | Owner | Error rate, latency, user impact |

## Monitoring signals
- What metrics will we watch?
- What is the error rate threshold?
- What is the latency threshold?
- What is the user impact threshold?

## Rollback trigger
- What conditions trigger rollback? (error rate > X%, latency > Yms, user complaints, etc.)
- Who is authorized to trigger rollback?

## Rollback steps
1. Disable feature flag (if applicable).
2. Revert to previous version.
3. Verify health checks pass.
4. Verify metrics return to baseline.
5. Notify stakeholders.

## Data recovery
- If the release includes data changes, document how to restore or reverse data.
- Include backup/restore steps and validation checks.

## Feature flag kill switch
- Flag name:
- Default state:
- Expected behavior when disabled:
- Who controls the flag:

## Post-release
- [ ] Verify metrics are within thresholds.
- [ ] Verify no unexpected errors.
- [ ] Document any issues found.
- [ ] Schedule follow-up for any known limitations.
