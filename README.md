# Dev Skills Pack

A workflow toolkit for AI coding agents. The developer controls requirements, architectural decisions, scope, and workflow transitions. The agent handles routine work within approved boundaries.

## Installation

Requires Node.js and a supported AI coding agent. This repository does not require a `package.json`.

**Project installation:**

```bash
npx skills add Nelenik/dev-skills-pack --branch main --all -y
```

Install for one agent instead:

```bash
npx skills add Nelenik/dev-skills-pack --branch main --agent codex -y
```

**Global installation:**

```bash
npx skills add Nelenik/dev-skills-pack --branch main --all -g -y
```

Replace `codex` with your agent's supported name.

**Update skills:**

```bash
npx skills check
npx skills update -p  # project
npx skills update -g  # global
```

Updating skills does not automatically update the workflow instructions in `AGENTS.md`. Use `0-setup` when those instructions need to be refreshed.

## Setup

Start a new project or introduce the workflow to an existing one by invoking:

```text
Invoke skill `0-setup`
```

The agent initializes `AGENTS.md` and project tracking files. Review any proposed changes before approving them.

### Optional: Claude Code

If you use Claude Code and want a dedicated entry point, ask the agent to create `CLAUDE.md` separately. It should import the shared instructions from `AGENTS.md`:

```markdown
@AGENTS.md
```

Do not duplicate the workflow instructions in both files. Keep `AGENTS.md` as the shared source of truth.

## Start every session

At the beginning of **every new coding session**, invoke:

```text
Invoke skill `1-start`
```

The agent checks the current workflow state and runs the read-only detection part of `18-sync`. It reports the current task, discrepancies, and recommended next action. If unexpected changes require a decision, it stops and asks before proceeding.

Project files—not conversation history—are the persistent source of context.

## Workflows

### New project

`0-setup` → `1-start` → `2-prd` → `16-roadmap`

Define the project, requirements, and development stages before implementation.

### Existing project

Run `0-setup` if the workflow is not configured, then invoke `1-start`. The agent inspects the existing code and documents, identifies gaps, and helps reconstruct the project state without recreating approved documents.

### Implement a stage or feature

`4-spec` → `6-plan` → `17-tasks` → `7-review` → `5-build` → `8-verify`

Approve the plan before implementation. The agent implements one approved task at a time and stops for review before continuing.

### Small change

Request `5-build` in ad-hoc mode. Agree on task boundaries and permitted files before implementation.

### Synchronize after manual changes

Invoke `18-sync`. It detects differences without modifying files. Review the findings and approve any reconciliation before changes are applied.

## Key skills

| Skill | Purpose |
|---|---|
| `0-setup` | Initialize workflow instructions and project tracking |
| `1-start` | Resume a session and identify the next action |
| `2-prd` | Define project boundaries and requirements |
| `4-spec`, `6-plan`, `17-tasks` | Specify and plan work |
| `7-review`, `5-build`, `8-verify` | Review, implement, and verify |
| `16-roadmap` | Plan and track development stages |
| `18-sync` | Detect and reconcile project changes |
| `9-security`–`15-ui-verify` | Specialized security, release, testing, incident, and UI workflows |

## Project files

Files are created as needed; not all exist initially.

- `AGENTS.md` — shared agent instructions.
- `CLAUDE.md` — optional Claude Code entry point.
- `dev-workspace/state.json` — current workflow status.
- `dev-workspace/project-context.md` — skill-pack project context and constraints.
- `dev-workspace/decisions.md` — accepted decisions.
- `dev-workspace/backlog.md` — deferred work.
- `dev-workspace/prd.md`, `roadmap.md` — skill-pack project definition and planning.
- `dev-workspace/stages/` and `dev-workspace/changes/` — stage and change specifications, plans, and tasks.
- `dev-workspace/.sync/` — snapshots for detecting changes.

## Autonomy and approvals

**The agent can independently** inspect files, run non-destructive checks, and perform routine work within an approved task.

**Your decision is required** to choose the next task, resolve significant ambiguity, change approved scope, or handle unexpected changes.

**Explicit permission is required** before unapproved implementation, out-of-scope edits, destructive actions, dependency/environment/CI changes, commits, or pushes.

After each implementation task, the agent reports changed files, a diff or summary, checks, and unresolved issues, then stops. Tests passing does not mean the task is accepted.

**Rule of thumb:** start every session with `1-start`, approve work before implementation, and keep control of decisions and workflow transitions.
