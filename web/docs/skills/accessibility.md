---
title: Accessibility audit
description: Audit complete user processes for accessibility barriers.
slug: /skills/accessibility
section: Skills
order: 3
skill: sills-audit-accessibility
package: sills-audit-accessibility
status: available
---

# Accessibility audit

Audit complete user processes for accessibility barriers.

## Install

```bash
npx sills-audit-accessibility install
```

## Use

```text
$sills-audit-accessibility Audit this project.
```

## What it inspects

WCAG 2.2 A/AA, keyboard, focus, screen readers, reflow, contrast, forms, motion, targets, Dynamic Type, VoiceOver, and manual-review queues.

## What it gives you

A dated human-readable report, structured JSON, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill does not modify the product. It may write only inside the selected audit directory. Runtime actions are non-destructive and production defaults to observation.

## Limitations

The report states which routes, roles, workflows, states, platforms, and tools were not tested. Automated passes are not proof of complete quality or compliance.
