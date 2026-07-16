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
- Reuse shared discovery, source inventory, runtime sessions, screenshots, traces, network records, logs, accessibility snapshots, and measurements across specialists.
- Never equate automated passes with compliance, security, readiness, rankings, performance, agent readiness, or defect-free status.
- Read project documentation before applying general guidance.
- Include evidence-backed positive findings.

## Audit selection

Do not run every specialist by default.

1. Discover the project and the user's stated goal.
2. Present the relevant specialist audits with a one-line explanation of each.
3. Ask which audits the user wants to run, unless the request already names or clearly implies them.
4. Ask which depth the user wants: `quick`, `standard`, or `deep`, unless the request or CI configuration already states it.
5. Recommend a focused audit set and depth when useful, but keep the final selection explicit.
6. In CI mode, use the configured selection and depth and never prompt.

A request for a "full audit" means all applicable specialists, not automatically the deepest audit. A generic request such as "audit this project" requires both audit selection and depth selection before specialist execution.

## Invocation shortcuts

When invoked as `$sills`, treat the first words after the skill name as a compact command:

- `audit api`: run or plan only `$sills-audit-api-design`.
- `audit accessibility`: run or plan only `$sills-audit-accessibility`.
- `audit architecture`: run or plan only `$sills-audit-architecture`.
- `audit content`: run or plan only `$sills-audit-content`.
- `audit design-system` or `audit design system`: run or plan only `$sills-audit-design-system`.
- `audit experience` or `audit ux`: run or plan only `$sills-audit-experience`.
- `audit performance`: run or plan only `$sills-audit-performance`.
- `audit privacy`: run or plan only `$sills-audit-privacy-and-trust`.
- `audit release`: run or plan only `$sills-audit-release-readiness`.
- `audit security`: run or plan only `$sills-audit-security`.
- `audit seo`: run or plan only `$sills-audit-seo`.
- `audit testing`: run or plan only `$sills-audit-testing-strategy`.
- `audit localization` or `audit i18n`: run or plan only `$sills-audit-localization`.
- `audit agent-readiness`, `audit agents`, or `audit agent`: run or plan only `$sills-audit-agent-readiness`.

For example, `$sills audit api` means an API design audit. If the shortcut omits depth, ask for `quick`, `standard`, or `deep` unless the surrounding request clearly implies it.

## Depth contract

Depth is a run-level contract. It controls collector work, source coverage, runtime exploration, evidence density, specialist sampling, and reporting detail. A specialist may reduce coverage when capabilities are missing, but it must not silently reinterpret the selected depth.

### Quick

Use for changed code, pull requests, CI feedback, or an initial risk scan.

- targeted source and configuration analysis;
- run required collectors in targeted mode;
- inspect changed or highest-risk surfaces rather than the whole product;
- use no runtime or a small smoke sample when a safe target is already available;
- collect minimal evidence needed to substantiate findings;
- do not claim broad project coverage.

### Standard

Default recommendation for normal project audits.

- representative source analysis across applications, routes, components, services, roles, and states;
- run all relevant collectors in representative mode;
- inspect primary journeys and representative edge states;
- use runtime evidence when available and material;
- cross-check source and runtime evidence;
- collect normal evidence density and explicit coverage gaps.

### Deep

Use for release decisions, architecture reviews, major migrations, or high-risk products.

- broad source analysis across all discoverable relevant applications and packages;
- run relevant collectors in broad mode and resolve dynamic or ambiguous structures where practical;
- explore substantially more routes, roles, states, environments, and edge cases;
- correlate specialists and conflicting evidence;
- collect high-density evidence and preserve richer raw output;
- require explicit manual-review queues for unresolved high-risk areas;
- report collector-level coverage and confidence.

Do not promise clock-time estimates as guarantees. Before execution, describe relative effort and the factors that may expand scope, such as repository size, route count, runtime availability, role count, and selected audits.

Record the selected depth and its resolved coverage settings in `manifest.json` using the audit-plan contract. Reports must state the actual achieved coverage when it falls below the requested depth.

## Shared evidence phase

Before specialists begin, create one shared evidence plan and one run-level evidence index.

Collect shared inputs once, at the selected depth:

- repository and workspace discovery;
- documentation and instruction inventory;
- application, route, package, platform, service, API, and data-flow inventory;
- runtime targets and environments;
- authenticated sessions and available roles;
- screenshots, traces, console output, network records, accessibility trees, and performance measurements;
- tool versions, command results, timestamps, and known limitations.

Specialists consume evidence by stable evidence ID. They add specialist-only evidence to the same index rather than creating disconnected copies. When evidence already exists, reuse it unless freshness, scope, or the selected depth requires recollection.

## Capability and execution plan

Resolve each selected specialist's required and optional capabilities before execution. Record one of:

- `run`;
- `run-reduced-coverage`;
- `manual-review`;
- `skip-not-applicable`;
- `skip-missing-capability`.

Write the selected depth, resolved selection, capabilities, shared evidence plan, and limitations to `manifest.json` before specialist reports are produced.

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
4. Resolve depth.
5. Resolve capabilities and coverage expectations.
6. Prepare the audit directory and shared evidence index.
7. Gather reusable evidence once at the selected depth.
8. Run selected specialists, in parallel where their evidence dependencies permit.
9. Deduplicate and correlate findings while preserving specialist IDs.
10. Decide blockers and priority.
11. Write coherent human and machine-readable reports.
12. Prepare remediation handoff.
13. Validate integrity, redaction, coverage, depth agreement, and limitations.

## Modes

- `source`: repository only.
- `runtime`: running product only.
- `full`: source plus runtime.
- `changed`: changed files and affected runtime areas.
- `ci`: non-interactive machine-readable execution using configured audit selection and depth.
- `verify`: retest an existing audit without changing the product.

Mode and depth are independent. For example, `source + deep`, `full + standard`, and `changed + quick` are valid combinations.

## Safety

Temporary records may be created only in authorised local, test, staging, or preview environments. Production defaults to observation. Security testing is passive. The suite never deploys, publishes, submits, approves, attacks, or modifies the product.

<!-- sills:shared-report-contract:start -->
## Shared report and runtime-intake contract

Before writing output, read `references/report-contract.md` and use the bundled templates.

- Human and machine-readable outputs must agree.
- Every conclusion must reflect actual coverage, selected depth, and limitations.
- Begin with the required professional status conclusion and relevant status dimensions.
- Include traceable tasks, evidence references, limitations, and untested areas.
- Include a ship decision whenever the selected audit set includes full or release-readiness coverage.
- When selected runtime-capable audits need a URL and none is documented, ask once for the relevant local, preview, staging, or production targets and roles.
- In CI mode, never prompt; record missing runtime targets as limitations.

Recommended status dimensions are limited to the selected audits and may include Accessibility; Product experience; Content quality; Codebase architecture; Security; Performance; Design system; Release readiness; Localization; Testing strategy; Privacy and trust; SEO; API design; Agent readiness.
<!-- sills:shared-report-contract:end -->
