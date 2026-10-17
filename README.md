# Project Development Skills

This skill set supports serious, iterative software development with an AI coding agent. It works for both new projects and existing repositories, and keeps the project context and planning artifacts in a `project/` directory inside the repository.

## Installation

Copy the `skills/` directory into the location where your Codex setup discovers local skills. Keep the directory names unchanged:

```text
skills/
├── 1-start/
├── 2-scope/
├── 3-prd/
├── 4-spec/
├── 5-build/
└── 6-plan/
```

The skill folders must contain their `SKILL.md` files. Templates are kept inside the skill that uses them:

```text
1-start/templates/context-template.md
5-build/templates/checklist-template.md
6-plan/templates/plan-template.md
```

Do not copy the `project/` directory into a repository during installation. It is created in the project being worked on when the workflow starts.

### Install from a Git repository with the Skills CLI

If the skills are published in a GitHub repository, install all of them with:

```bash
npx skills add OWNER/REPO --all -y
```

For example:

```bash
npx skills add challengepost/learn-ai-basics --all -y
```

The `--all` flag installs every skill exposed by the repository. The `-y` flag accepts the installation prompts automatically. To install only selected skills, omit `--all` and pass the requested skill names according to the Skills CLI syntax.

To update the installed skills, run the same command again after the repository has changed:

```bash
npx skills add OWNER/REPO --all -y
```

Replace `OWNER/REPO` with the GitHub repository containing this skill set. The repository should expose the skill folders with their `SKILL.md` files; keep the names `1-start`, `2-scope`, `3-prd`, `4-spec`, `5-build`, and `6-plan` unchanged.

## Start a new project

1. Create or open a dedicated project directory.
2. Invoke `1-start`.
3. Answer the context questions about the product, users, goals, constraints, and desired direction.
4. Let `1-start` inspect the repository and create `project/context.md`.
5. Follow the routing recommendation:

   - unclear idea or product direction → `2-scope`;
   - user-facing behavior → `3-prd`;
   - architecture or contracts → `4-spec`;
   - complex feature or migration → `6-plan`;
   - small, clear implementation → `5-build`.

Do not start implementation before the relevant requirements and technical decisions are clear enough for the size and risk of the work.

## Start an existing project

1. Open the repository root, not a parent directory.
2. Invoke `1-start` even if the code already works.
3. Let the agent inspect the repository, git history, manifests, tests, CI, deployment files, and existing documentation.
4. Review the generated or updated `project/context.md`.
5. Choose the next step based on the requested change:

   - unclear product direction → `2-scope`;
   - new or changed user behavior → `3-prd`;
   - technical design or interface changes → `4-spec`;
   - migration, refactor, upgrade, integration, rollout, or other multi-step work → `6-plan`;
   - localized and low-risk change → `5-build`.

Existing behavior is the baseline. Do not rewrite it or recreate documentation unless the user approves the change.

## Normal workflow

The skills are not a one-time tutorial. After the first working version, continue using the same workflow for every meaningful increment:

```text
1-start → 2-scope → 3-prd → 4-spec / 6-plan → 5-build
```

Not every change needs every step. Small changes can go directly to `5-build`. A complex change may use `6-plan` and `4-spec` together. User-facing requirements belong in `3-prd`; architecture and contracts belong in `4-spec`; sequencing, rollout, migration, and risk management belong in `6-plan`.

## Project documents

The workflow stores its durable context in the repository:

```text
project/
├── context.md     # current project state, constraints, risks, and repository map
├── scope.md       # product direction, boundaries, priorities, and non-goals
├── prd.md         # user-facing behavior and acceptance criteria
├── spec.md        # technical design, contracts, data, and operations
├── plan.md        # current complex change, sequencing, rollout, and rollback
└── checklist.md   # implementation state and verification evidence
```

Only create documents that are relevant to the current work. Keep them synchronized with the code. When a decision changes, update the authoritative document and its downstream references instead of maintaining conflicting copies.

## Working rules

- Inspect the repository before making assumptions.
- Preserve unrelated user changes.
- Use direct mode for small, localized, reversible changes.
- Use a plan for cross-component, data, contract, security, rollout, or high-risk changes.
- Verify changes proportionally with tests, builds, migrations, and manual checks.
- Record evidence in `project/checklist.md`.
- Update `project/context.md` after meaningful increments.
- Never request credentials in chat.
- Do not use destructive git operations without explicit consent.

## Resuming work

When a session is interrupted, invoke `5-build` for an in-progress implementation. It should read `project/checklist.md`, the approved plan or spec, git state, and the current code, then continue from the first incomplete slice.

For a new change after an earlier release, invoke `6-plan` for anything non-trivial or `5-build` for a small, clearly understood change. The project is never considered permanently finished after one working version.
