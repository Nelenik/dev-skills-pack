# Technical Specification Guide

Use this guide when shaping a technical design. Keep the design proportionate to risk and avoid selecting architecture silently.

## Decision quality

For each consequential choice, compare correctness, complexity, delivery effort, performance, reliability, security, operational cost, reversibility, and maintenance. Recommend an option and record the accepted trade-off.

## State transitions

For changes to existing systems, describe current, transition, and target states. Include compatibility with old data, old clients, mixed versions, partial rollout, and rollback.

## Data and migrations

State where data lives, who writes it, how it changes, how it is validated, whether operations are idempotent, how backfill is monitored, and what cleanup is safe. Do not describe a destructive migration without recovery and validation steps.

## Failure and operations

Cover dependency failure, timeouts, retries, duplicate requests, partial writes, degraded behavior, alerts, logs, metrics, and operator actions when they matter.

## Scope discipline

Do not add technology, infrastructure, performance targets, or abstractions without a project reason. Mark unresolved facts as open questions and identify the earliest verification needed.
