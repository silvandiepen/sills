# sills-audit

<p>
  <img src="https://raw.githubusercontent.com/silvandiepen/sills/main/sills.svg" alt="Sills" width="180">
</p>

Run one complete, evidence-based project audit across fourteen specialist disciplines.

## Install the complete suite

```bash
npx sills-audit install
```

This installs the `$sills` shortcut, the `$sills-audit` umbrella skill, and all fourteen specialists for Codex and Claude Code. Use `--codex`, `--claude`, or `--global` to narrow installation.

## Use

```text
$sills-audit Do a full audit of this project.
$sills audit api
```

## Specialist coverage

Accessibility, product experience, content quality, codebase architecture, security, performance, design systems, release readiness, localization, testing strategy, privacy and trust, SEO, API design, and agent readiness.

## What it gives you

- One executive summary and complete human-readable report.
- A machine-readable `report.json`.
- Separate specialist reports and related findings.
- Coverage inventory, evidence, raw tool results, positive findings, limitations, and release blockers.
- `handoff.md` so another agent can fix every open finding in a controlled order.

## Modes

`source`, `runtime`, `full`, `changed`, `ci`, and `verify`, with `quick`, `standard`, and `deep` depth profiles.

## Report-only safety

The suite writes only inside the selected dated audit directory and never modifies the product itself.
