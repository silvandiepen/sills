# Sills terminology

## Skill

An Agent Skill is a reusable instruction and workflow package. Sills currently ships Audit Skills. Future Skill categories may perform safe fixes, planning, migrations, documentation, or focused project analysis.

## Audit Skill

A report-only Skill that evaluates a defined quality domain and produces evidence-backed findings, positive patterns, coverage, tasks, and limitations.

## Orchestrator

The umbrella `sills-audit` Skill. It discovers the project, resolves capabilities, asks which audits to run when selection is unclear, gathers shared inputs once, and coordinates selected specialists.

## Platform collector

Built-in discovery logic that understands a technology or project format and emits normalized facts. Platform collectors do not decide whether something is defective.

## Knowledge collector

A reusable collector that creates cross-platform knowledge such as routes, API endpoints, authentication, authorization, data, deployments, components, tests, and localization.

## Project knowledge

The normalized, evidence-backed model of the audited project. It sits between raw discovery and specialist judgement and is stored in `project-knowledge.json`.

## Evidence

A traceable observation supporting a fact or finding, such as a source location, configuration, command result, screenshot, accessibility tree, network request, trace, log, benchmark, or documented limitation.

## Finding

An evidence-backed issue or positive pattern. Findings have deterministic identities, severity, confidence, affected locations, impact, evidence references, and verification instructions.

## Severity

The potential impact of a finding. Severity does not express how certain the finding is.

## Confidence

How strongly the available evidence supports a finding: `certain`, `likely`, `possible`, or `insufficient-evidence`.

## Coverage

What was applicable, what was tested, which roles and environments were included, and which limitations prevented deeper analysis. Coverage is not a product-quality score.

## Capability

An input or tool needed for an audit, such as source access, a browser, a runtime URL, an authenticated session, a role, an iOS simulator, or an external scanner.

## Contract

A public machine-readable data structure used between Sills components. Every public contract should have a schema, validator, fixture, example, documentation, generation path, and tests.

## Verification

A later audit mode that retests previous finding identities and records whether they are resolved, unchanged, improved, regressed, reclassified, or no longer comparable.

## Remediation handoff

A report-derived plan for another agent or person to implement. Audit Skills remain report-only and do not apply the changes themselves.
