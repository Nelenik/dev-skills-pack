# Sync report — YYYY-MM-DD

Phase: `detect` (read-only) | `reconcile` (after explicit developer decision).

Baseline: `last_synced_commit` = <sha or none>; HEAD = <sha>; working tree: clean | N modified | M untracked.

## Changes since baseline

| # | Files | Origin | Matches | Proposed handling |
|---|---|---|---|---|
| 1 | `path/a`, `path/b` | commit <sha> / uncommitted | task T-05 / none | count as part of T-05 / record in decisions.md / ... |

## Code vs documents (code is the source of truth)

| # | Document and statement | What the code does | Options |
|---|---|---|---|
| 1 | `spec-01.md` §Data flow: "X" | Y | A) update the document to match the code; B) change the code back |

## Checks

Commands run and results (typecheck, lint, tests) — or "not run" with the reason.

## Decisions needed

Numbered list of questions for the developer, one per item above. Nothing is changed until they are answered.
