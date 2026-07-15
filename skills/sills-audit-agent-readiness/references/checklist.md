# Agent readiness checklist

## Instructions and discovery

- Repository and nested instruction files are discoverable and their scope is clear.
- Canonical rules are not duplicated into drifting Claude- and Codex-specific copies.
- Instructions identify protected, generated, and prohibited files or actions.
- Conventions are specific enough to guide work and short enough to remain usable.

## Project knowledge

- Product purpose, users, core workflows, terminology, and constraints are clear.
- Architecture, components, data models, APIs, services, integrations, and trust boundaries have authoritative sources.
- Requirements and feature documentation match implemented behaviour or state their status.
- Important unknowns and open decisions are explicit.

## Decisions and continuity

- Material decisions record context, alternatives, consequences, status, and supersession.
- Current work, known issues, incomplete migrations, and roadmap state are discoverable.
- Historical documents are marked and do not masquerade as current guidance.
- A new agent can determine what changed recently and what remains unfinished.

## Workflows and safety

- Package manager, runtime versions, environment setup, and required services are documented.
- Build, lint, test, preview, migration, release, deploy, and rollback commands match configuration.
- Secrets and example environment values are handled without exposing credentials.
- Production, destructive, financial, notification, migration, and third-party actions have explicit boundaries.
- Test accounts, fixtures, seed data, and cleanup expectations are documented where relevant.

## Context quality

- Guidance uses progressive disclosure rather than one enormous context file.
- Nested instructions add local detail instead of repeating global rules.
- File paths, package names, commands, versions, and examples are current.
- Generic AI filler, unsupported claims, and imaginary architecture are absent.
- Documentation ownership or validation mechanisms reduce drift.
