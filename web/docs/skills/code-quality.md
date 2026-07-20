---
title: Code quality audit
description: Find where code is unnecessarily complex, duplicated, or hard to maintain, with real tool evidence.
slug: /skills/code-quality
section: Skills
order: 17
skill: sills-audit-code-quality
package: sills-audit-code-quality
status: available
---

# Code quality audit

Find where code is unnecessarily complex, duplicated, or hard to maintain, and get concrete simplification recommendations backed by real tool evidence.

## Install

```bash
npx sills-audit-code-quality install
```

## Use

```text
$sills-audit-code-quality Audit this project.
```

## What it inspects

Cyclomatic and cognitive complexity, oversized functions and files, copy-paste duplication, dead code, unused and circular dependencies, weak types and unsafe casts, magic values, naming and convention drift, over-abstraction, and language-specific idioms and anti-patterns. For every hotspot it asks whether the complexity is necessary.

## Real tool evidence

Bundled read-only collectors wrap `scc`, `lizard`, `jscpd`, `madge`, and `depcheck` when they are available, and record an honest limitation when they are not. Tool output is treated as evidence, never as a verdict.

## Boundary with the architecture audit

This audit covers code-level health. Module and service boundaries, coupling, layering, and data-flow shape belong to the architecture audit; structural findings are cross-referenced rather than duplicated.

## What it gives you

A dated human-readable report, structured JSON, coverage inventory, collector evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## Modes

Source, changed, CI, and verification modes are supported. Quick, standard, and deep depth profiles are available.

## Safety

The skill does not modify the code. It may write only inside the selected audit directory, and its collectors run tools read-only and never install anything into the project.

## Limitations

The report states which languages, packages, and tools were not covered. A clean tool run is not proof of quality, simplicity, or absence of defects.
