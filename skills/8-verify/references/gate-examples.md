# Quality gate examples

Use these examples as starting points for a task's acceptance and `Evidence` fields (or `project/checklist.md` for ad-hoc work). Adapt commands to the project's actual tooling and configuration.

## JavaScript / TypeScript

### Lint
- `npm run lint` — pass with no errors.
- `npm run lint -- --fix` — auto-fix warnings where safe.
- Evidence: lint output or CI log.

### Typecheck
- `npm run typecheck` — pass with no errors.
- Evidence: typecheck output.

### Tests
- `npm test` — unit tests pass.
- `npm run test:integration` — integration tests pass.
- `npm run test:contract` — contract tests pass.
- `npm run test:e2e` — E2E smoke tests pass.
- Evidence: test output with pass/fail counts.

### Build
- `npm run build` — build succeeds and produces expected artifacts.
- Evidence: build log or artifact hash.

### Security scan
- `npm audit` — no high or critical vulnerabilities.
- `gitleaks detect` — no secrets detected.
- Evidence: audit output or scan report.

### Observability
- Verify structured logs, metrics, and health checks are present.
- Evidence: manual review or test output.

## Python

### Lint
- `ruff check .` — pass with no errors.
- `ruff format --check .` — formatting is consistent.
- Evidence: lint output.

### Typecheck
- `mypy .` — pass with no errors.
- Evidence: typecheck output.

### Tests
- `pytest` — unit tests pass.
- `pytest tests/integration` — integration tests pass.
- `pytest tests/contract` — contract tests pass.
- Evidence: test output with pass/fail counts.

### Build
- `python -m build` — build succeeds and produces wheel/sdist.
- Evidence: build log or artifact hash.

### Security scan
- `pip-audit` — no known vulnerabilities.
- `detect-secrets` or `gitleaks` — no secrets detected.
- Evidence: audit output or scan report.

## Go

### Lint
- `golangci-lint run` — pass with no errors.
- `go vet ./...` — pass with no errors.
- Evidence: lint output.

### Typecheck
- `go build ./...` — compiles with no errors.
- Evidence: build output.

### Tests
- `go test ./...` — unit tests pass.
- `go test ./... -tags=integration` — integration tests pass.
- `go test ./... -run TestContract` — contract tests pass.
- Evidence: test output with pass/fail counts.

### Build
- `go build ./...` — build succeeds.
- Evidence: build output or artifact hash.

### Security scan
- `govulncheck ./...` — no known vulnerabilities.
- `gitleaks detect` — no secrets detected.
- Evidence: scan output.

## Rust

### Lint
- `cargo clippy --all-targets --all-features` — pass with no warnings.
- `cargo fmt --check` — formatting is consistent.
- Evidence: lint output.

### Typecheck
- `cargo check` — compiles with no errors.
- Evidence: check output.

### Tests
- `cargo test` — unit tests pass.
- `cargo test --test integration` — integration tests pass.
- `cargo test --test contract` — contract tests pass.
- Evidence: test output with pass/fail counts.

### Build
- `cargo build` — build succeeds.
- Evidence: build output or artifact hash.

### Security scan
- `cargo audit` — no known vulnerabilities.
- `gitleaks detect` — no secrets detected.
- Evidence: scan output.

## C# / .NET

### Lint
- `dotnet format --verify-no-changes` — formatting is consistent.
- `dotnet roslynator` or `dotnet analyzers` — pass with no errors.
- Evidence: lint output.

### Typecheck
- `dotnet build` — compiles with no errors.
- Evidence: build output.

### Tests
- `dotnet test` — unit tests pass.
- `dotnet test --filter "FullyQualifiedName~Integration"` — integration tests pass.
- `dotnet test --filter "FullyQualifiedName~Contract"` — contract tests pass.
- Evidence: test output with pass/fail counts.

### Build
- `dotnet build` — build succeeds and produces expected artifacts.
- Evidence: build log or artifact hash.

### Security scan
- `dotnet list package --vulnerable` — no vulnerable packages.
- `gitleaks detect` — no secrets detected.
- Evidence: scan output.

## Cross-cutting

### Secrets scan
- `gitleaks detect --no-git` — no secrets detected.
- Evidence: scan output.

### Dependency vulnerability scan
- Use the appropriate command for the language (see above).
- Evidence: scan output.

### Unsafe logging check
- Grep for patterns that leak secrets or PII (e.g. `console.log.*password`, `logger.info.*token`).
- Evidence: grep output.

### Migration checks (when applicable)
- Dry-run migration and verify no data loss.
- Verify idempotency.
- Document backup/rollback steps.
- Evidence: dry-run output, idempotency test, backup procedure document.