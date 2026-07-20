# Checklist

Use as a coverage aid, not a script. Skip items that do not apply and record why.

## Setup

- [ ] Read project style guides, linter/formatter config, `tsconfig` strictness, and any documented size or complexity limits.
- [ ] Detect languages and packages in scope; note any language you cannot analyse.
- [ ] Identify which analysis tools are available; record missing ones as limitations.

## Complexity

- [ ] Run the `complexity` and `metrics` collectors on the relevant languages.
- [ ] Identify the highest cyclomatic and cognitive complexity hotspots.
- [ ] Classify each hotspot as essential or accidental complexity.
- [ ] For accidental complexity, give a concrete simplification and its trade-off.

## Duplication

- [ ] Run the `duplication` collector; record the overall ratio.
- [ ] Confirm high-value clone pairs are semantic, not incidental.
- [ ] Recommend the smallest extraction only where copies must change together.

## Dead code and dependencies

- [ ] Run the `dependencies` collector; capture circular, unused, and missing results.
- [ ] Verify removal candidates against dynamic, config, CLI, and entry-point usage.
- [ ] Cross-reference circular dependencies that reflect structural boundaries to the architecture audit.

## Idioms and types

- [ ] Run the project linter with its own config (no `--fix`) as evidence.
- [ ] Check weak typing, magic values, flag arguments, over-abstraction, and convention drift.
- [ ] Separate violations of the project's stated standard from general advice.

## Reporting

- [ ] Record positive findings where code is clean or appropriately simple.
- [ ] Answer "is this complexity necessary?" for every complexity and duplication finding.
- [ ] State limitations, absent tools, and untested languages.
- [ ] Ensure `report.json` and the Markdown reports agree.
