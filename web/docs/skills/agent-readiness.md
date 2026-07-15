---
title: Agent readiness audit
description: Audit whether a repository is clear, efficient, and safe for Claude Code, Codex, and other coding agents.
slug: /skills/agent-readiness
section: Skills
order: 16
skill: sills-audit-agent-readiness
package: sills-audit-agent-readiness
status: available
---

# Agent readiness audit

Determine whether an AI coding agent can understand, navigate, modify, test, and release the project safely without inventing missing context.

## Install

```bash
npx sills-audit-agent-readiness install
```

## Use

```text
$sills-audit-agent-readiness Audit this repository for agent readiness.
```

## What it inspects

`AGENTS.md`, `CLAUDE.md`, nested instructions, README and contributor guidance, requirements, architecture, system and feature documentation, ADRs and decisions, repository maps, package and application boundaries, environment guidance, build and test commands, migrations, release and rollback workflows, secret handling, protected files, context size, duplicated guidance, stale paths and commands, current status, open decisions, known issues, and continuity between sessions.

## What it gives you

A dated specialist report, structured findings, documentation inventory, instruction-scope map, authority and contradiction report, verified-command matrix, repository knowledge map, positive findings, limitations, recommended documentation plan, and an evidence-based Sills Agent Readiness level.

## How it works

1. Maps which instructions each agent discovers and where nested rules apply.
2. Identifies authoritative product, architecture, decision, operational, and workflow documentation.
3. Compares documented commands, paths, package names, services, versions, and boundaries with the repository.
4. Safely verifies non-destructive setup, build, lint, test, preview, and validation workflows where possible.
5. Reviews safety rules for secrets, production, data, migrations, generated files, external services, and destructive actions.
6. Evaluates context efficiency, progressive disclosure, cross-agent portability, current project state, and documentation drift.
7. Assigns `unprepared`, `basic`, `usable`, `strong`, or `agent-native` only when coverage is sufficient.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It does not write `AGENTS.md`, `CLAUDE.md`, decisions, architecture, or other project documentation. It may create files only inside the selected audit directory.

## Limitations

No universal filename set proves agent readiness. The audit evaluates whether required capabilities are present, discoverable, current, and safe, regardless of the repository's chosen document structure. Private systems, production workflows, owner knowledge, and destructive commands remain manual-review areas when they cannot be verified safely.
