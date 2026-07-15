# sills-audit-accessibility

Find accessibility barriers across complete user processes, source code, running web products, and supported iOS projects.

## Install

```bash
npx sills-audit-accessibility install
```

The installer supports `--codex`, `--claude`, `--global`, `--force`, `--dry-run`, and `--target PATH`.

## Use

```text
$sills-audit-accessibility Audit this project.
```

## What it inspects

WCAG 2.2 A/AA, semantics, keyboard, focus, screen readers, reflow, zoom, contrast, forms, motion, targets, media, Dynamic Type, VoiceOver, and manual-review requirements.

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
