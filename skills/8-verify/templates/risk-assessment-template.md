# Risk assessment template

## Change
- What is being changed?
- Why?

## Risk level: low / medium / high

## Factors
- **Scope:** How many components, services, or users are affected?
- **Data impact:** Does the change touch user data, sensitive data, or data integrity?
- **Contract impact:** Does the change affect public APIs, events, or CLI contracts?
- **Security impact:** Does the change affect auth, authorization, trust boundaries, or secrets?
- **Deploy impact:** Does the change require infrastructure changes, migrations, or rollout coordination?

## Required verification
- Which `8-verify` gates apply?
- Which `9-security` checks apply?
- Which `10-release` gates apply?
- What evidence is required?

## Rollback
- How can the change be rolled back?
- Is rollback tested?
- What is the recovery time objective (RTO)?

## Approval
- Who must approve this change?
- What conditions must be met before approval?