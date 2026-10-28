# Threat model template

## Assets
- What data or resources must be protected?
- Where are they stored, processed, and transmitted?

## Actors
- Who can interact with the system? (users, services, internal, external)
- What trust level does each actor have?

## Trust boundaries
- Where does trust change? (client ↔ server, service ↔ service, internal ↔ external)
- What crosses each boundary?

## Data flows
- Trace data from input to storage and output.
- Identify where data is transformed, validated, or exposed.

## Abuse cases
- Injection, IDOR, replay, privilege escalation.
- Rate abuse, resource exhaustion.
- Data exfiltration paths.
- Unsafe logging of secrets or PII.

## Mitigations
- For each abuse case: what controls prevent or detect it?
- Validation, authz, encryption, rate limiting, monitoring.

## Security tests
- Negative tests for unauthorized access.
- Tests for input validation and abuse cases.
- Contract tests for error responses.

## Assumptions and open questions
- What did we assume? What is unknown?
