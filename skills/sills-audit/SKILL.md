---
name: sills-audit
description: Plan and coordinate evidence-based, report-only audits across the Sills specialist suite. Use when the user wants help choosing audits, coordinating multiple specialists, running changed-code or CI audits, verifying earlier findings, or producing one coherent cross-functional report.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.5.0"
---

# Sills Audit Orchestrator

Plan first, then coordinate only the audits the user selects or that are explicitly implied by the request.

## Non-negotiable contract

- This is report-only. Never modify the audited project outside the selected audit directory.
- Do not install dependencies into the project, change lockfiles, run migrations, invent environment variables, seed production data, deploy, publish, or approve releases.
- Reuse shared discovery, project knowledge, source inventory, runtime sessions, screenshots, traces, network records, logs, accessibility snapshots, and measurements across specialists.
- Never equate automated passes with compliance, security, readiness, rankings, performance, agent readiness, or defect-free status.
- Read project documentation before applying general guidance.
- Include evidence-backed positive findings.

## Audit selection

Do not run every specialist by default.

1. Discover the project and the user's stated goal.
2. Present the relevant specialist audits with a one-line explanation of each.
3. Ask which audits the user wants to run, unless the request already names or clearly implies them.
4. Recommend a focused set when useful, but keep the final selection explicit.
5. In CI mode, use the configured selection and never prompt.

A request for a "full audit" means all applicable specialists. A generic request such as "audit this project" requires selection before specialist execution.

## Shared knowledge and evidence phase

Before specialists begin, create one run-level `project-knowledge.json`, one shared evidence plan, and one evidence index.

Run built-in platform and knowledge collectors once. Collect and normalize:

- repositories, packages, workspaces, applications, and source roots;
- frameworks, native targets, services, infrastructure, and delivery configuration;
- routes, API and function entry points, authentication and authorization surfaces;
- data models, migrations, components, tests, and localization resources;
- documentation and instruction inventory;
- runtime targets, environments, authenticated sessions, and available roles;
- screenshots, traces, console output, network records, accessibility trees, and performance measurements;
- tool versions, command results, timestamps, and known limitations.

Each selected specialist must:

1. read `project-knowledge.json` before starting domain-specific discovery;
2. reuse existing knowledge nodes and stable evidence IDs;
3. collect only missing or stale domain-specific evidence;
4. add new facts to the shared knowledge model rather than maintaining a disconnected inventory;
5. record which knowledge node and evidence IDs support each finding;
6. never reinterpret an absent collector result as proof that a surface does not exist.

Specialists must not independently rebuild routes, auth, API, data, deployment, component, testing, or localization inventories when those collectors already ran successfully. Recollection is allowed only when scope, freshness, parsing depth, or runtime evidence requires it, and the reason must be recorded.

## Capability and execution plan

Resolve each selected specialist's required and optional capabilities before execution. Record one of:

- `run`;
- `run-reduced-coverage`;
- `manual-review`;
- `skip-not-applicable`;
- `skip-missing-capability`.

Write the resolved selection, collector results, required knowledge kinds, capabilities, shared evidence plan, execution dependencies, and limitations to `manifest.json` before specialist reports are produced.

Specialists may run in parallel only after their required shared collectors have completed. A specialist that needs richer knowledge may extend the shared model first; dependent specialists must consume the updated version.

## Specialists

- `$sills-audit-accessibility`
- `$sills-audit-experience`
- `$sills-audit-content`
- `$sills-audit-architecture`
- `$sills-audit-security`
- `$sills-audit-performance`
- `$sills-audit-design-system`
- `$sills-audit-release-readiness`
- `$sills-audit-localization`
- `$sills-audit-testing-strategy`
- `$sills-audit-privacy-and-trust`
- `$sills-audit-seo`
- `$sills-audit-api-design`
- `$sills-audit-agent-readiness`

Read only the selected specialist methodologies and references relevant to the discovered scope.

## Workflow

1. Read intent, constraints, and repository guidance.
2. Discover the project once.
3. Resolve audit selection.
4. Resolve capabilities and coverage expectations.
5. Prepare the audit directory.
6. Run built-in platform and knowledge collectors once.
7. Write `project-knowledge.json`, the shared evidence index, and the execution plan.
8. Run selected specialists after their required knowledge is available, in parallel where dependencies permit.
9. Merge specialist-added facts and evidence into the shared stores.
10. Deduplicate and correlate findings while preserving specialist IDs.
11. Decide blockers and priority.
12. Write coherent human and machine-readable reports.
13. Prepare remediation handoff.
14. Validate contracts, integrity, redaction, coverage, and limitations.

## Modes

- `source`: repository only.
- `runtime`: running product only.
- `full`: source plus runtime.
- `changed`: changed files and affected runtime areas.
- `ci`: non-interactive machine-readable execution using configured audit selection.
- `verify`: retest an existing audit without changing the product.

Depth: `quick`, `standard`, or `deep`.

## Safety

Temporary records may be created only in authorised local, test, staging, or preview environments. Production defaults to observation. Security testing is passive. The suite never deploys, publishes, submits, approves, attacks, or modifies the product.

<!-- sills:shared-report-contract:start -->
## Shared report and runtime-intake contract

Before writing output, read `references/report-contract.md` and use the bundled templates.

- Human and machine-readable outputs must agree.
- Every conclusion must reflect actual coverage and limitations.
- Begin with the required professional status conclusion and relevant status dimensions.
- Include traceable tasks, evidence references, knowledge-node references, limitations, and untested areas.
- Include a ship decision whenever the selected audit set includes full or release-readiness coverage.
- When selected runtime-capable audits need a URL and none is documented, ask once for the relevant local, preview, staging, or production targets and roles.
- In CI mode, never prompt; record missing runtime targets as limitations.

Recommended status dimensions are limited to the selected audits and may include Accessibility; Product experience; Content quality; Codebase architecture; Security; Performance; Design system; Release readiness; Localization; Testing strategy; Privacy and trust; SEO; API design; Agent readiness.
<!-- sills:shared-report-contract:end -->
