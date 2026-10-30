---
name: 17-sync
description: "Detect and triage changes made outside the agent's tasks (the developer's manual edits, merged branches) and divergences between code and project documents. Use at session start (detect only), before closing a stage, when recovering an existing project, or when the developer asks to synchronize."
---
# 17-sync — Detect, Triage, Synchronize

> Working agreement: `AGENTS.md` (dev-skills-pack block). Read it first if it is not already in context.

Manual edits by the developer are normal. This skill never reverts, reformats, completes, or "improves" them. It finds them, explains them, and lets the developer decide. Code is the source of truth over documents; every divergence still goes to the developer for a decision.

## Detect (read-only; runs at every session start)

1. Before deciding whether setup or synchronization is needed, run the read-only `0-setup` marker check (`--check`) for any existing `AGENTS.md` managed block. This is a mandatory read/validation step independent of project initialization. If the block is malformed or ambiguous, report the problem and safe recovery option, modify nothing, and stop before routing to `1-start` or any other workflow. Only after validation succeeds, read `dev-workspace/state.md` for `mode`, `initialized`, `step`, `stage`, and `last_synced_commit`. The canonical baseline also includes `dev-workspace/decisions.md` and `dev-workspace/backlog.md`; if any baseline file is missing, report setup as incomplete and route to `0-setup`, without treating the absence as an unrelated project change. If `initialized: false` or `mode: bootstrap`, inspect existing `dev-workspace/` artifacts and relevant project documents, then route to `1-start` in bootstrap-resume mode; preserve approved documents and resume from state rather than recreating them. If code/history exists and the developer explicitly requests reconstruction, `1-start` may set `mode: recovery`. Only after the developer confirms the completion transition (`initialized: true`, `mode: normal`, agreed baseline, and accepted snapshot) does normal synchronization begin.
2. Inspect the repository: `git rev-parse HEAD`, `git status --porcelain`, `git log --oneline <last_synced_commit>..HEAD`, `git diff --stat <last_synced_commit>..HEAD`. Without git, ask the developer to describe what changed, or compare the file tree with the active task whitelists.
3. Map every changed file and changed hunk to the active `tasks.md` (`Files` lists and done tasks). A filename in a whitelist is not sufficient to explain a later, unrelated hunk: compare the diff with the task's accepted evidence or stored accepted snapshot. Anything new after that snapshot is pending triage.
4. If nothing is unexplained, say "in sync" in one line, update nothing, and continue.
5. Otherwise write a short report in chat using [templates/sync-report-template.md](templates/sync-report-template.md), identify the affected paths and hunks, and stop. Detect never writes `state.md`, the sync report, or any other project file. Do not start other work until the developer responds.

Uncommitted edits are visible but must not be touched, stashed, or committed.

### Accepted uncommitted state

When the developer accepts changes without committing, store the accepted snapshot under `dev-workspace/.sync/`: `accepted-snapshot.md` contains one manifest line per path in the form `path | A/M/D | sha256 | content-ref`, while `content-ref` points to the saved accepted file content or unified diff. For a deletion, preserve the path as `path | D | missing | content-ref`. Hash exact file bytes with SHA-256 for change detection; never treat the hash as the saved content or diff. Record the decision in `dev-workspace/decisions.md`. The next detect compares the baseline commit and current tree with both the manifest and saved accepted content. An unchanged hash is accepted; a changed or newly added file is new work, and a missing file is a deletion requiring triage. For partial changes in the same file, compare the saved accepted content with the current file and show only the new hunks. After each explicit acceptance, replace the manifest and saved contents together for the complete accepted tree, including deletions. Keep `last_synced_commit` unchanged unless the developer explicitly names a commit; a no-commit baseline is valid when explicitly recorded.

## Triage (after the report; the developer chooses)

| Kind of manual change | Propose |
|---|---|
| Inside the active task's whitelist | Count it as part of the task; run the task's checks; continue |
| Matches another task or stage | Ask whether to mark that task done by hand; status changes only by the developer |
| Outside any task (small fix, config) | Record in `decisions.md` as a manual change; leave documents alone unless behavior changed |
| Changes behavior described in PRD/spec | Show "document says X, code does Y"; options: update the document, or change the code back |
| Changes architecture or a contract (new dependency, folder structure, API) | Propose an ADR or a `Binding conventions` update in `context.md` |
| Breaks lint, typecheck, build, or tests | Report; propose a `fix` task; do not repair it yourself |
| Looks like an unfinished refactor | Do not finish it. Ask: finish via a task, the developer reverts it, or leave as is |
| Touches a closed stage | Do not reopen the stage; record in `decisions.md`; propose re-checking exit criteria if they are affected |
| Large manual commit, unclear origin | Do not reconstruct history; record one entry and, if needed, propose `adopt` tasks (tests, docs) |

If the developer is in the middle of a task and manual edits overlap its files, pause the task, triage first, and ask how to proceed.

## Reconcile (only after decisions)

- Apply exactly the decisions made. Only after the developer approves reconciliation may the agent update `state.md`, the sync report, accepted snapshots, or other agreed documents; show the diff first.
- Never expand scope because manual edits revealed more to fix: put that into `backlog.md`.
- When every pending item is resolved, set `last_synced_commit` to HEAD (or to the commit the developer names), clear `## Pending triage`, set `updated`, and note it in `decisions.md`.

Detect and Reconcile are separate phases. A clean Detect result may continue the current approved work. A non-clean result always stops at the decision boundary and never becomes permission to edit or accept changes.

## Document vs code divergence (also used in recovery)

Compare what documents claim (behavior, structure, commands, dependencies) with what the repository does. List each divergence with the document location and the code evidence. Do not rewrite anything until the developer decides per item.

## Cadence

Detect at every session start and before a stage closes (`15-roadmap`). After each task the task report already covers the diff, so no extra sync is needed. Run it on request at any time.

## Routing

After detection or synchronization, report `Result`, `Next step`, `Command`, and `Approval`. Recommend one action with `Invoke skill `<name>``; wait before applying reconciliations or starting new work. Read-only detection may run automatically at session start.

Resolved manual changes that imply new work → propose `16-tasks`. Roadmap boundaries affected → `15-roadmap`. Architecture or contract change → `3-spec` or an ADR.
