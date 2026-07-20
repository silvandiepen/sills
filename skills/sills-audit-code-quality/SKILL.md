---
name: sills-audit-code-quality
description: Perform a report-only code-quality audit covering cyclomatic and cognitive complexity, oversized functions and files, copy-paste duplication, dead code, unused and circular dependencies, weak types and unsafe casts, magic values, naming and convention drift, over-abstraction, and language-specific idioms and anti-patterns. Use for source and changed-code reviews that ask whether code is unnecessarily complex, duplicated, or hard to maintain, and that want concrete simplification recommendations backed by real tool evidence. Never use to modify, refactor, or reformat the code.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.1.0"
---

# Code Quality Audit

Perform a comprehensive, evidence-based, report-only audit of internal code health and ask, for every hotspot, whether the complexity is necessary and how it could be simplified.

## Scope and boundary with the architecture audit

This audit owns **code-level health**: complexity hotspots, oversized units, duplication, dead code, unused and circular dependencies, weak typing, magic values, convention drift, over-abstraction, and language-idiom violations.

It does **not** own **structural design**: module and service boundaries, coupling direction, layering, and state and data-flow shape belong to `$sills-audit-architecture`. When a finding is really about system structure, record it as a cross-reference and defer the detailed judgement to the architecture audit rather than duplicating it. See `references/boundaries.md`.

## Non-negotiable contract

- Do not modify application code, content, configuration, dependencies, lockfiles, generated files, data, or repository structure.
- Do not run formatters, linters with `--fix`, codemods, or any command that writes to the project. Collectors run read-only.
- Create files only inside the selected dated audit directory.
- Suggestions and verification steps are allowed; fixes are not.
- Never invent evidence, source locations, metrics, measurements, or tool output.
- Distinguish direct observation, automated tool detection, manual verification, documentation, inference, and untested areas.
- Include concrete positive findings. Do not manufacture praise.
- Read project documentation, style guides, and repository instructions before applying general practice. Prefer project evidence over arbitrary universal thresholds.
- A clean tool run is not proof of quality, simplicity, or absence of defects.

## Supported modes

- `source`: repository inspection only.
- `runtime`: not usually applicable; code quality is a source concern. Use only to confirm dead-code claims against runtime coverage when such data already exists.
- `full`: source plus any existing coverage or runtime signal.
- `changed`: focus on a branch, commit, or pull-request diff and the units it touches.
- `ci`: non-interactive execution with machine-readable output.
- `verify`: retest findings from an earlier report without changing the product.

Depth is independent: `quick`, `standard`, or `deep`. Default to `source` and `standard` when possible.

## Before auditing

1. Read `AGENTS.md`, `CLAUDE.md`, README files, contributing and style guides, linter and formatter configuration, `tsconfig`, and any documented complexity or size conventions.
2. Determine the languages, frameworks, package managers, applications, and packages in scope.
3. Locate prior audit reports and any project-specific thresholds or accepted exceptions.
4. Build a coverage inventory of applications, packages, and languages before selecting representative hotspots.
5. Identify which analysis tools are available in the environment; record any that are missing as a coverage limitation rather than failing.

## Evidence collectors

Bundled runnable collectors gather tool evidence read-only. Run only those relevant to the detected languages, and treat their output as evidence, never as a verdict:

```bash
node scripts/collect.mjs --kind metrics       --path <target> --out <audit-dir>/raw
node scripts/collect.mjs --kind complexity    --path <target> --out <audit-dir>/raw
node scripts/collect.mjs --kind duplication   --path <target> --out <audit-dir>/raw
node scripts/collect.mjs --kind dependencies  --path <target> --out <audit-dir>/raw
# or the whole group:
node scripts/collect.mjs --kind code-quality  --path <target> --out <audit-dir>/raw
```

Each collector emits JSON conforming to the Sills collector-output contract: `observations`, `evidence` records, and honest `limitations` when a tool is absent. Collectors wrap `scc`, `lizard`, `jscpd`, `madge`, and `depcheck`; see `references/platforms-and-tools.md` for what each proves and, importantly, what it does not. When a tool is unavailable, record the gap and continue with manual source analysis.

## Output

Default to `audit/YYYY-MM-DD/`; use `-02`, `-03`, and so on for repeated runs on the same date. Ask only when a project convention or explicit user preference conflicts with the default.

Write:

- `summary.md`
- `report.md`
- `report.json`
- `coverage.json`
- `manifest.json`
- `handoff.md`
- `reports/code-quality.md`
- individual finding files when useful
- collector output and raw tool results under `raw/`

Use finding IDs `CQ-0001`, `CQ-0002`, and so on.

Each finding must include category, kind, title, severity when applicable, release-blocker status, confidence, origin, scope, impact, evidence or manual-review reason, reproduction or location, expected and observed results, recommendation, and verification instructions. For complexity and duplication findings, always answer the question **is this complexity necessary?** and give a concrete, lower-complexity alternative when one exists.

## Audit procedure

1. **Discover** the languages, packages, and conventions in scope.
2. **Run relevant collectors** read-only and record their evidence and limitations.
3. **Prioritise** the highest-complexity, most-duplicated, and most-depended-on units rather than reporting every metric.
4. **Analyse** using the applicable references. Correlate tool signal with a manual read of the code; a high metric on intentional, well-tested code is not automatically a defect.
5. **Judge necessity** for each hotspot and propose a specific simplification with the trade-off named.
6. **Record positive findings** where code is genuinely clean, well-factored, or appropriately simple.
7. **Record limitations** and untested areas explicitly, including any absent tools or languages.
8. **Write structured and human-readable reports** that agree with each other.
9. **Prepare remediation handoff** so another agent can act on open findings.
10. **Validate** report structure and verify that no files outside the audit directory changed.

## Severity and confidence

Use the shared Sills definitions:

- Severity: `critical`, `major`, `moderate`, `minor`, `observation`.
- Confidence: `confirmed`, `high`, `medium`, `low`, `requires-manual-verification`.
- `releaseBlocker` is a separate boolean. Code-quality findings are rarely release blockers on their own; mark one only when it demonstrably causes a correctness or safety risk.

Do not produce a single artificial overall score. Prefer finding counts, hotspot lists, duplication ratios, coverage, tested and untested areas, and category assessments such as `strong`, `acceptable`, `needs work`, or `critical`.

## References

Read only the reference files relevant to the current project and scope. Do not load all reference material automatically.

<!-- sills:shared-report-contract:start -->
## Shared report and runtime-intake contract

Before writing any Code quality audit output, read `references/report-contract.md` and use the bundled report template.

- Begin with a professional status conclusion using the universal Sills health level and an audit-specific label.
- Report the relevant status dimensions rather than hiding materially different strengths and weaknesses behind one label.
- Include a ship decision only when this specialist has enough evidence to justify one.
- Include a prioritised Tasks section with traceable actions, acceptance criteria, and verification.
- Keep the standard section order so every Sills report is immediately comparable.
- When runtime web coverage is relevant and no usable URL is supplied or documented, ask once for live, staging, preview, or local URLs and their environment and role. Continue source analysis if none are provided.
- In CI mode, never prompt; record absent runtime targets as a limitation.

Recommended status dimensions: Complexity; Duplication; Dead code and dependencies; Language idioms and conventions; Type safety and maintainability.
<!-- sills:shared-report-contract:end -->
