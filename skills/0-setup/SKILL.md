---
name: 0-setup
description: "Install or update the dev-skills-pack working agreement in AGENTS.md (create the file, append to an existing one, or refresh the managed block) and create project/state.md. Use on first run in a repository, when the AGENTS.md block or project/state.md is missing, or after the skills were updated."
---
# 0-setup — Install the Working Agreement

The skills installer (`npx skills add`) copies skills only. It does not touch `AGENTS.md`, so this skill does it. It is safe to run repeatedly.

## What it does

1. **AGENTS.md block.** First inspect whether setup is needed. Inspection is autonomous; creating or updating `AGENTS.md` is a write and requires the developer's explicit approval after showing the target file and proposed change. Once that setup change has been explicitly approved and applied, do not ask for approval again unless setup is needed again. Run the script that ships with this skill (it sits next to this file):

   ```
   node <this-skill-directory>/scripts/setup-agents-md.mjs --dry-run
   ```

   Show the developer the dry-run result, then run it again without `--dry-run`. The script:
   - creates `AGENTS.md` when it does not exist;
   - appends the block to an existing `AGENTS.md` and leaves everything already there untouched;
   - replaces only the text between `<!-- dev-skills-pack:begin ... -->` and `<!-- dev-skills-pack:end -->` when the block already exists (use this after `npx skills update`);
   - appends an `@AGENTS.md` import to an existing `CLAUDE.md` (Claude Code reads `CLAUDE.md`, not `AGENTS.md`); add `--claude` to create `CLAUDE.md` when it does not exist;
   - stops with exit code 2 and changes nothing when the markers are broken. Report this to the developer; do not repair it yourself.

   If `node` is unavailable, do the same by hand from [templates/agents-block.md](templates/agents-block.md) following the rules above. Never edit text outside the markers.

2. **State file.** If `project/state.md` is missing, create it from [templates/state-template.md](templates/state-template.md) with `phase: mvp`, `mode: bootstrap`, `initialized: false`, `step: idle`, `last_synced_commit: none`, and today's date. Do not guess the stage; `1-start` and `16-roadmap` fill it in. Also create empty `project/decisions.md` and `project/backlog.md` (one heading each) if they are missing.

3. **Report** exactly what was created or changed using `Result`, `Next step`, `Command`, and `Approval`, then recommend `1-start` with `Invoke skill `1-start``. This transition requires the developer's authorization. Do not commit; the developer reviews the diff.

## Rules

- Do not rewrite, reorder, or "tidy" any existing content of `AGENTS.md` or `CLAUDE.md`.
- Do not install dependencies and do not change any other configuration.
- If the repository already has a differently named context directory, ask the developer before creating `project/` (see `1-start`).
