---
title: Codebase architecture audit
description: Review repository structure, boundaries, components, services, state, and maintainability.
slug: /skills/architecture
section: Skills
order: 6
skill: sills-audit-architecture
package: sills-audit-architecture
status: available
---

# Codebase architecture audit

Review repository structure, boundaries, components, services, state, and maintainability.

## Install

```bash
npx sills-audit-architecture install
```

## Use

```text
$sills-audit-architecture Audit this project.
```

## What it inspects

Applications, packages, responsibilities, coupling, dependency direction, services, state management, testability, documentation drift, and generated-code incoherence.

## What it gives you

A dated human-readable report, structured JSON, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill does not modify the product. It may write only inside the selected audit directory. Runtime actions are non-destructive and production defaults to observation.

## Limitations

The report states which routes, roles, workflows, states, platforms, and tools were not tested. Automated passes are not proof of complete quality or compliance.
