---
title: Design system audit
description: Tokens, components, states, adoption, governance, and visual-system audit.
slug: /skills/design-system
section: Skills
order: 9
skill: sills-audit-design-system
package: sills-audit-design-system
status: available
---

# Design system audit

Determine whether the product has one coherent visual and interaction system or a collection of parallel, drifting implementations.

## Install

```bash
npx sills-audit-design-system install
```

## Use

```text
$sills-audit-design-system Audit this project.
```

## What it inspects

Primitive, semantic, and component tokens; component anatomy and variants; interactive states; accessibility contracts; responsive behaviour; typography, colour, spacing, radius, elevation, motion, icons, theming, dark mode, documentation, adoption, duplicate implementations, contribution rules, versioning, and migration paths.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Read brand, design, token, component, and contribution documentation before judging implementation.
2. Inventory token sources, component libraries, wrappers, copied UI, CSS conventions, and design references.
3. Map representative runtime screens back to primitives and components.
4. Identify drift, competing abstractions, missing states, undocumented exceptions, and inaccessible foundations.
5. Distinguish deliberate product-specific variation from accidental inconsistency.
6. Report high-leverage system fixes separately from local screen defects.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

Visual similarity alone does not prove shared implementation, and shared implementation does not prove a good user experience. Do not enforce one design-system methodology universally or label intentional product variation as drift without evidence.
