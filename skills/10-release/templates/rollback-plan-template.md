# Rollback plan template

## Change summary
- What is being released?
- What version are we rolling back from? What version are we rolling back to?

## Rollout steps
1. Deploy new version.
2. Enable feature flag (if applicable).
3. Gradually increase traffic (canary → staged → full).

## Monitoring signals
- Error rate threshold:
- Latency threshold:
- User impact threshold:
- Other signals:

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
- Verify that rollback is safe for running versions and concurrent traffic.

## Feature flag kill switch
- Flag name:
- Default state:
- Expected behavior when disabled:
- Who controls the flag:

## Post-rollback
- [ ] Verify metrics are within thresholds.
- [ ] Verify no unexpected errors.
- [ ] Document the cause of rollback.
- [ ] Schedule fix and re-release.