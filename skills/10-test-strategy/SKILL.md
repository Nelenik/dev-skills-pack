---
name: 10-test-strategy
description: "Testing strategy: test types, coverage by risk, determinism, acceptance criteria testability."
---

# 10-test-strategy — Testing Strategy

Use when defining or reviewing test coverage.

## Test types
- Unit: pure logic, business rules.
- Integration: boundaries, data access, external calls.
- Contract: API/event schemas.
- E2E: critical user journeys.

## Coverage by risk
- High-risk paths require integration/contract tests.
- Business rules require unit tests.
- Critical journeys require E2E smoke.

## Determinism
- Tests independent and repeatable.
- No flaky tests without follow-up.
- Mocks only at boundaries.

## Acceptance criteria
- PRD acceptance criteria must be testable.
- Edge cases and failure paths covered.

## Routing

Test gaps in implementation → `4-build`. Review → `6-review`. Verification → `7-verify`.
