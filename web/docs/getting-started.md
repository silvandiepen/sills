---
title: Getting started
description: Install Sills and run your first audit.
slug: /getting-started
section: Guide
order: 2
---


# Getting started

## Install the full suite

```bash
npx sills-audit install
```

The default installs all skills into both `.agents/skills/` and `.claude/skills/` in the current project.

```bash
npx sills-audit install --codex
npx sills-audit install --claude
npx sills-audit install --global
```

## Run a full audit

```text
$sills-audit Do a full audit of this project.
```

Sills defaults to source and runtime analysis when both are available, standard depth, and a dated `audit/` directory.

## Run a specialist

```text
$sills-audit-accessibility Audit this application.
$sills-audit-security Review this repository and running app.
```

## Read the result

Start with `summary.md`, then use `report.md` for detail. `report.json` is authoritative for automation. `handoff.md` explains how another agent should address open findings.
