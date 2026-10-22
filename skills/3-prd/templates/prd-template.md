---
doc: prd
status: draft
updated: YYYY-MM-DD
---

# Product Requirements

## Summary

## Users and Use Cases

## Core Journey

### Step 1 — [name]
- User intent:
- Visible state:
- User actions:
- System response:
- Success condition:

## Functional Requirements

### [Requirement]
- Behavior:
- Priority:
- Acceptance criteria:

## Non-functional Requirements (NFR)

When the change affects production behavior, document NFRs with testable criteria.

- **Performance:** latency, throughput, resource usage (e.g. "P95 API response < 200ms under 1000 RPS").
- **Availability:** uptime, error rate, graceful degradation (e.g. "99.9% monthly uptime").
- **Scalability:** how the system behaves under increased load (e.g. "supports 10x current traffic without degradation").
- **Privacy:** data minimization, encryption, retention (e.g. "PII encrypted at rest and in transit").
- **Operability:** logging, metrics, health checks, alerting (e.g. "all API endpoints expose health checks").

## Requirement quality

Every requirement must be testable. A testable requirement has an observable outcome that can be verified with a command, test, or manual check.

### Testable acceptance criteria
For each requirement, write acceptance criteria that are:
- **Observable:** the outcome can be seen or measured (e.g. "API returns 200" not "API is fast").
- **Specific:** exact values, states, and behaviors are defined (e.g. "P95 latency < 200ms" not "low latency").
- **Verifiable:** a command, test, or manual check can confirm the criterion passes.

### Edge cases and failure scenarios
For each requirement, document at minimum:
- Missing input.
- Invalid input.
- Empty data.
- Slow dependencies.
- Failed dependencies.
- Retries.
- Duplicate actions.
- Permissions.
- Interrupted work.
- Recovery after failure.

## States and Edge Cases

Cover loading, empty, invalid, error, timeout, retry, duplicate, unauthorized, interrupted, and recovery states where relevant.

## Permissions and Compatibility

## Data Visible to Users

## Operational Requirements

Include observability, support, audit, performance, or availability requirements when relevant.

## Deferred Work

## Product Decisions

## Assumptions and Open Questions

## Revisions
