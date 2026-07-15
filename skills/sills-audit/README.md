# sills-audit

Run one complete, evidence-based project audit across accessibility, product experience, content quality, codebase architecture, and security.

## Install the complete suite

```bash
npx sills-audit install
```

This installs the umbrella skill and all five specialists for Codex and Claude Code. Use `--codex`, `--claude`, or `--global` to narrow installation.

## Use

```text
$sills-audit Do a full audit of this project.
```

## What it does

The umbrella skill reads project documentation, discovers applications, packages, routes, roles, workflows, states, services, integrations, trust boundaries, and available runtimes. It coordinates every applicable specialist, reuses evidence, deduplicates overlap, identifies cross-cutting root causes, and decides release blockers.

## What it gives you

- One executive summary and complete human-readable report.
- A machine-readable `report.json`.
- Separate accessibility, experience, content, architecture, and security reports.
- Coverage inventory, evidence, raw tool results, positive findings, limitations, and release blockers.
- `handoff.md` so another agent can fix every open finding in a controlled order.

## Modes

`source`, `runtime`, `full`, `changed`, `ci`, and `verify`, with `quick`, `standard`, and `deep` depth profiles.

## Report-only safety

The suite writes only inside the selected dated audit directory and never modifies the product itself.
