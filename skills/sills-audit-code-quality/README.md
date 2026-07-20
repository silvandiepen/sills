# sills-audit-code-quality

<p>
  <img src="https://raw.githubusercontent.com/silvandiepen/sills/main/sills.svg" alt="Sills" width="180">
</p>

Find where code is unnecessarily complex, duplicated, or hard to maintain — and get concrete, evidence-backed simplification recommendations.

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

## What it gives you

A dated specialist report, structured findings, coverage inventory, collector evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff. It never changes the audited code.

## Boundary with the architecture audit

This audit covers code-level health. Module and service boundaries, coupling, layering, and data-flow shape belong to `sills-audit-architecture`; structural findings are cross-referenced rather than duplicated.

## Modes

`source`, `changed`, `ci`, and `verify`, with `quick`, `standard`, and `deep` depth profiles.
