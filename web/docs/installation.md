---
title: Installation
description: Install Sills for Codex, Claude Code, a project, or a user account.
slug: /installation
section: Guide
order: 3
hide: true
---


# Installation

## Project installation

```bash
npx sills-audit install
```

This copies the canonical skills into:

```text
.agents/skills/
.claude/skills/
```

The full install adds the `$sills` shortcut, the `$sills-audit` umbrella skill, and every specialist skill.

## User installation

```bash
npx sills-audit install --global
```

## Install one specialist

```bash
npx sills-audit-content install
```

## Options

- `--codex`: install only for Codex.
- `--claude`: install only for Claude Code.
- `--global`: install under the current user's home directory.
- `--force`: replace an existing installed copy.
- `--dry-run`: show destinations without writing.
- `--target PATH`: use a custom skills root.

The installer copies files rather than creating links, because temporary `npx` package locations are not stable.

## Invoke

```text
$sills audit api
$sills-audit Do a full audit of this project.
```
