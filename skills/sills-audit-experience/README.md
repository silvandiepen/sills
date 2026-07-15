# sills-audit-experience

Evaluate how the product looks, behaves, responds, and communicates quality in real use.

## Install

```bash
npx sills-audit-experience install
```

The installer supports `--codex`, `--claude`, `--global`, `--force`, `--dry-run`, and `--target PATH`.

## Use

```text
$sills-audit-experience Audit this project.
```

## What it inspects

Visual hierarchy, layout, typography, consistency, responsiveness, affordances, clicks and taps, states, navigation, error recovery, lag, jank, browser errors, network failures, documentation alignment, and evidence-based AI-slop signals.

## What it gives you

- A dated human-readable audit report.
- Structured JSON for automation and remediation agents.
- Explicit tested and untested coverage.
- Evidence, raw tool output, and manual-review queues.
- Prioritised findings with severity, confidence, impact, recommendations, and verification steps.
- Concrete positive findings worth preserving.
- A remediation handoff another agent can follow.

## Modes

`source`, `runtime`, `full`, `changed`, `ci`, and `verify`, with `quick`, `standard`, and `deep` depth profiles where the environment permits.

## Report-only safety

The skill never changes the audited product. It may create files only inside the selected audit directory. It does not install dependencies into the project or mutate real data.

## Limitations

The report states all unavailable roles, routes, workflows, states, platforms, and tools. Automated passes are not proof of complete quality, compliance, or security.
