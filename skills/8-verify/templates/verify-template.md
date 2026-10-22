# Verification checklist template

## Change
- Type:
- Risk: low / medium / high

## Risk assessment
- Scope:
- Data impact:
- Contract impact:
- Security impact:
- Deploy impact:

## Quality Gates

Copy the applicable gates from `8-verify` for the change type. Each gate must have evidence.

### Frontend / UI
- [ ] Component decomposition signals checked — evidence:
- [ ] Loading/empty/error states present — evidence:
- [ ] Accessibility: semantic markup, keyboard, focus — evidence:
- [ ] No unnecessary re-renders; state ownership justified — evidence:
- [ ] Tests for hooks and non-trivial logic — evidence:

### Backend / API
- [ ] Input validation at boundary — evidence:
- [ ] Auth/authz enforced server-side — evidence:
- [ ] Stable response/error contracts — evidence:
- [ ] Pagination, rate limits, idempotency, timeouts — evidence:
- [ ] Backward compatibility deliberate — evidence:

### Databases / Migrations
- [ ] Indexes, constraints, nullability, locking — evidence:
- [ ] Migration safe for existing data and running versions — evidence:
- [ ] Backup/rollback/recovery steps documented and verified — evidence:
- [ ] Idempotency and data validation — evidence:

### Integrations / Distributed
- [ ] Provider code isolated — evidence:
- [ ] Timeouts, retries, circuit breaking/fallback — evidence:
- [ ] Contract/integration tests for malformed/delayed/duplicated/unavailable responses — evidence:
- [ ] Correlation IDs preserved — evidence:

### CLI / Workers / Batch
- [ ] Meaningful exit codes — evidence:
- [ ] Safe retries, resumability, progress reporting — evidence:
- [ ] Bounded resource usage, idempotent processing — evidence:

### Security-sensitive
- [ ] Threat model documented — evidence:
- [ ] Trust boundaries and abuse cases reviewed — evidence:
- [ ] Secrets scan passed — evidence:
- [ ] Security tests for authz and input validation — evidence:

### Deployment / Infrastructure
- [ ] CI gates (lint, typecheck, tests, build) pass — evidence:
- [ ] Migration checks pass — evidence:
- [ ] Security scan passes — evidence:
- [ ] Rollout strategy documented — evidence:
- [ ] Rollback procedure documented and tested — evidence:
- [ ] Observability: structured logs, metrics, health checks — evidence:

## Gates
- [ ] <gate> — evidence: <command/test/artifact>

## Remaining uncertainty
- 
