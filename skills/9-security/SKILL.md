---
name: 9-security
description: "Security workflow: threat modeling, trust boundaries, abuse cases, secrets and dependency checks."
---

# 9-security — Security Workflow

Use for security-sensitive changes or when `8-verify` security gate triggers.

## Threat modeling
- Identify assets, actors, trust boundaries.
- Map data flows and failure paths.
- Document assumptions explicitly.
- Use [templates/threat-model-template.md](templates/threat-model-template.md) to structure the model.

## Trust boundaries & authorization
- Auth/authz enforced server-side.
- Validate inputs at boundaries.
- Least privilege for services and users.
- Review permissions for every role and service account.

## Abuse cases
- Injection (SQL, command, template, header).
- IDOR / broken access control.
- Replay and token reuse.
- Privilege escalation (horizontal and vertical).
- Rate abuse and resource exhaustion.
- Data exfiltration paths.
- Unsafe logging of secrets or PII.
- Dependency risk: known vulnerabilities, supply chain, typosquatting.

## Secrets & data
- No secrets in source, logs, or client bundles.
- Sensitive data handling documented.
- PII minimization: collect only what is needed, encrypt at rest and in transit.
- Verify that secrets are not committed: run a secrets scanner as part of CI.

## Dependencies
- Dependency risk review: check version, maintainer, license, and recent activity.
- Known vulnerability scan: use `npm audit`, `pip-audit`, `cargo audit`, `dotnet list package --vulnerable`, or equivalent.
- Pin dependencies and lockfiles; update incrementally with a plan.

## Security tests
- Tests for authz, input validation, and abuse cases.
- Negative tests for unauthorized access.
- Contract tests for API schemas and error responses.
- Integration tests for trust boundaries (e.g. cross-tenant access).

## Security scanning (CI/CD)
- Secrets scan: `gitleaks detect` or equivalent.
- Dependency vulnerability scan: see Dependencies section.
- Unsafe logging check: grep for patterns that leak secrets or PII.
- Static analysis for injection, deserialization, and crypto mistakes.

## Routing

If design exposes security gaps → `4-spec`. If implementation needed → `5-build`. Review findings → `7-review`. CI/CD and rollout concerns → `10-release`.
