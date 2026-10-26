# Stage lifecycle

## Close a stage

1. Run the detect step of `18-sync`; resolve pending items first.
2. For every exit criterion in `roadmap.md`, show the evidence: command and output, test name, or the manual steps for the developer to follow ("run `pnpm dev`, open `/login`, expect ...").
3. List what is not done, parked, or deferred (`backlog.md`), and open `adopt` tasks that were deliberately postponed.
4. Update `project/context.md` (current status, capabilities, repository map, binding conventions) as a proposed diff; apply after agreement.
5. Present the criteria and evidence. The developer explicitly accepts the stage. Before that acceptance the stage remains `active`.
6. After acceptance, apply only the agreed technical update: set the stage to `done` in `roadmap.md`, set `state.md` to `stage: none`, `step: idle`, and report the result. The agent does not accept the stage or invent additional roadmap changes.

## Requests that arrive while the MVP is in progress

Classify each request and propose the handling; the developer decides.

| Request | Handling |
|---|---|
| Clarification inside the active stage | Revise the spec or tasks; record under `## Revisions` |
| New idea not in the roadmap | `backlog.md`, no discussion needed |
| Idea that changes the MVP boundaries | Roadmap change proposed as an exchange (added vs removed or moved); recorded in `decisions.md` |
| Bug in a closed stage that blocks the active stage | `fix` task in the active stage |
| Bug in a closed stage that does not block | `backlog.md` |

A closed stage is reopened only on the developer's explicit command.

## MVP gate: declaring the MVP stable

Evaluate against the MVP definition and the exit criteria, not against "all stages are done".

1. Show a table: each stage, its status, unmet exit criteria.
2. For each unfinished stage the developer chooses:
   - **Finish it:** the MVP stays in the `mvp` phase.
   - **Move it:** the stage becomes a change in `project/changes/<name>/` (status `moved` in the roadmap, reason in `decisions.md`).
   - **Drop it:** status `dropped`, reason in `decisions.md`.
3. Run a smoke check of the critical journeys and show the evidence.
4. When the developer declares the MVP stable: set `phase: evolve` in `state.md`, update `context.md` (status, known gaps), and record the decision. From then on, work happens in `project/changes/<name>/` with `proposal.md` (what and why, in the developer's words), then `spec.md`, `plan.md`, `tasks.md`, and the same one-task-at-a-time loop. When a change is accepted, fold its outcome into `context.md` and the relevant PRD/spec sections.
