---
doc: state
phase: mvp              # mvp | evolve
mode: bootstrap         # bootstrap | normal | recovery
initialized: false      # false until the first project baseline is established
stage: none             # active roadmap stage, e.g. 00-foundation (mvp phase)
change: none            # active change folder name (evolve phase)
work_dir: none          # e.g. dev-workspace/stages/00-foundation or dev-workspace/changes/add-search
spec: none              # active spec file inside work_dir
task: none              # active task id, e.g. T-03
step: idle              # idle | scope | prd | roadmap | spec | plan | tasks | check | build | verify | stage-close | sync
last_synced_commit: none
updated: YYYY-MM-DD
---

# Project State

Only the developer changes `phase`, accepts tasks, and closes stages. The agent updates `step`, `task`, synchronization metadata, and `updated` as work proceeds, and proposes the rest. `mode: bootstrap` and `initialized: false` describe a new project; they are not a recovery signal.

## Pending triage

Manual changes or divergences found by `18-sync` that the developer has not resolved yet. Empty when everything is synchronized.

## Accepted working-tree snapshot

The last developer-accepted uncommitted state. Store the manifest in `dev-workspace/.sync/accepted-snapshot.md` and the accepted file contents or unified diff in the same directory. Each manifest entry is exactly `path | A/M/D | sha256 | content-ref`; for a deletion use `path | D | missing | content-ref` where `content-ref` points to the saved pre-deletion content. SHA-256 detects changes; it is not a substitute for the saved content or diff. Keep the baseline commit separately in `last_synced_commit`. Replace the manifest and snapshot contents together after each explicit acceptance; do not require a commit.

## Parked

One line per parked item with a link into `backlog.md`.
