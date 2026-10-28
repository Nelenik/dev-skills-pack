---
name: 11-incident
description: "Handle production incidents: detection, response, communication, rollback, and post-mortem."
---

# 11-incident — Incident Management

Use when a production incident occurs or when preparing for on-call duty.

## Detection
- Identify the incident from monitoring alerts, user reports, or automated checks.
- Record the time of detection and the initial symptoms.
- Do not guess the cause; gather evidence first.

## Response
1. Acknowledge the incident and assign an incident commander.
2. Assemble a response channel (chat, call, or war room).
3. Preserve evidence: logs, metrics, traces, and affected requests.
4. Determine impact: which users, services, and data are affected?
5. Decide on immediate action: rollback, feature flag disable, or mitigation.
6. Execute the rollback or mitigation using `9-release` procedures.
7. Verify recovery: health checks, metrics, and user impact.

## Communication
- Notify stakeholders of the incident status.
- Provide regular updates (e.g. every 30 minutes) until resolved.
- Do not speculate about root cause before evidence is gathered.
- After resolution, publish a summary to users and stakeholders.

## Post-incident
- Document the incident: timeline, symptoms, impact, actions, and resolution.
- Identify root cause and contributing factors.
- Assign follow-up items to prevent recurrence.
- Schedule a post-mortem review if the incident had significant impact.
- Update runbooks and monitoring if gaps are found.

## On-call readiness
- Ensure on-call rotation is documented and communicated.
- Ensure runbooks exist for known failure modes.
- Ensure alerting is actionable and has clear ownership.
- Ensure rollback procedures are tested and documented.

## Routing

Rollback or mitigation → `9-release`. Root cause analysis → `5-plan` or `3-spec`. Follow-up implementation → `4-build`. Review findings → `6-review`.