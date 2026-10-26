---
name: 0-setup
description: "Install or update the dev-skills-pack working agreement in AGENTS.md and create missing dev-workspace workflow state. Use on first run in a repository, when the AGENTS.md block or workflow state is missing, or after the skills were updated."
---
# 0-setup — Install the Working Agreement

The skills installer (`npx skills add`) copies skills only. It does not touch `AGENTS.md`, so this skill does it. It is safe to run repeatedly.

## What it does

1. **AGENTS.md block.** Inspect whether setup is needed, then apply the safe setup operation without asking for approval. Run the script that ships with this skill (it sits next to this file):

   ```
   node <this-skill-directory>/scripts/setup-agents-md.mjs
   ```

   Run the script without `--dry-run`. The script:
   - creates `AGENTS.md` when it does not exist;
   - appends the block to an existing `AGENTS.md` and leaves everything already there untouched;
   - replaces only the text between `<!-- dev-skills-pack:begin ... -->` and `<!-- dev-skills-pack:end -->` when the block already exists (use this after `npx skills update`);
   - appends an `@AGENTS.md` import to an existing `CLAUDE.md` (Claude Code reads `CLAUDE.md`, not `AGENTS.md`); add `--claude` to create `CLAUDE.md` when it does not exist;
   - stops with exit code 2 and changes nothing when markers are missing, duplicated, incorrectly ordered, or otherwise ambiguous. Report this to the developer; do not repair it yourself.

   If `node` is unavailable, do the same by hand from [templates/agents-block.md](templates/agents-block.md) following the rules above. Never edit text outside the markers.

2. **Workflow state.** If `dev-workspace/state.md` is missing, create it from [templates/state-template.md](templates/state-template.md) with `phase: mvp`, `mode: bootstrap`, `initialized: false`, `step: idle`, `last_synced_commit: none`, and today's date. Do not guess the stage; `1-start` and `16-roadmap` fill it in. Create only the additional workflow artifacts needed by the current stage. Never overwrite existing workflow files or existing user content.

3. **Report** exactly what was created or changed using `Result`, `Next step`, `Command`, and `Approval`. For safe setup, say that no approval was required. If a malformed or ambiguous block, existing equivalent context directory, overwrite, deletion, outside-scope change, or other unsafe modification is needed, stop and request the relevant approval or recovery decision. Recommend `1-start` with `Invoke skill `1-start``; setup completion does not authorize starting that workflow.

## Rules

- Do not rewrite, reorder, or "tidy" any existing content of `AGENTS.md` or `CLAUDE.md`.
- Do not install dependencies and do not change any other configuration.
- If the repository already has a differently named workflow directory, preserve it and ask the developer before creating or migrating `dev-workspace/` (see `1-start`).
- Update only the text inside one valid managed block. If it cannot be identified reliably, make no change and report the ambiguity.
- Approval is required only for overwrites, deletions, changes outside the managed block, non-trivial repairs, or changes outside this established setup scope.
