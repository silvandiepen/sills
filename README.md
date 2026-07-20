# Sills

<p>
  <img src="./sills.svg" alt="Sills" width="180">
</p>

**Engineering intelligence skills for AI coding agents.**

Sills provides report-only Audit Skills that discover a software project, build reusable project knowledge, gather evidence once, and produce consistent findings, coverage, trends, risks, and remediation handoffs.

## Supported out of the box

| Web | Native and desktop | Services | Infrastructure and delivery |
|---|---|---|---|
| Vue, Nuxt | Capacitor, iOS, Android | Cloudflare Workers | Docker |
| React, Next.js | Electron | Supabase | Terraform |
| Angular | React Native, Expo | Firebase | GitHub Actions |
| SvelteKit |  |  | npm, pnpm, Yarn, Bun workspaces |

Support depth varies by platform. Sills distinguishes **detected**, **normalized**, **collected**, **runtime-capable**, and **specialist-aware** support instead of treating every integration as equally complete. See the [support matrix](docs/support-matrix.md).

## How Sills works

```text
Project
  ↓
Discovery and built-in platform collectors
  ↓
Shared project knowledge and evidence
  ↓
Selected Audit Skills at Quick, Standard or Deep depth
  ↓
JSON, Markdown and HTML reports
  ↓
Verification and remediation handoff
```

The umbrella skill does not run every audit by default. For a generic request, it discovers the project, recommends relevant audits, asks for an explicit audit selection and depth, gathers reusable evidence once, and coordinates only the selected Audit Skills.

## Audit depth

| Depth | Coverage | Best for |
|---|---|---|
| **Quick** | Targeted source analysis and optional runtime smoke coverage | Pull requests, changed code, CI and first-pass risk scans |
| **Standard** | Representative source and runtime coverage across primary journeys | Normal project audits |
| **Deep** | Broad multi-surface, multi-role and edge-case coverage with richer evidence | Releases, migrations, architecture reviews and high-risk systems |

Mode and depth are independent. A run may be `source + deep`, `full + standard`, or `changed + quick`. Reports record both the requested depth and the coverage actually achieved. See [Audit depth](docs/audit-depth.md).

## Why Sills is different

- **Report-only by design.** Audits do not modify the product outside the selected audit directory.
- **Evidence before judgement.** Findings reference source, runtime, logs, screenshots, traces, configurations, or explicit limitations.
- **Shared project knowledge.** Routes, services, platforms, deployments, auth, data, tests, and other facts are collected once and reused.
- **Stable findings.** Deterministic identities support verification and trend tracking across runs.
- **Honest coverage.** Missing roles, runtime targets, simulators, tools, or environments remain visible.
- **Agent-portable.** Skills use the shared Agent Skills format for Claude Code and OpenAI Codex.

## Audit Skills

| Skill | Purpose |
|---|---|
| `sills-audit` | Select and coordinate relevant audits |
| `sills-audit-accessibility` | Accessibility and inclusive design |
| `sills-audit-experience` | Usability, interaction, responsiveness and perceived performance |
| `sills-audit-content` | Clarity, comprehension, UX writing, hierarchy and content quality |
| `sills-audit-architecture` | Repository and application architecture |
| `sills-audit-security` | Application, dependency, CI/CD and supply-chain security |
| `sills-audit-performance` | Loading, runtime, responsiveness, stability and resources |
| `sills-audit-design-system` | Tokens, components, states, adoption and governance |
| `sills-audit-release-readiness` | Launch risk, operations, rollback and evidence |
| `sills-audit-localization` | Internationalization, translation, locale and RTL readiness |
| `sills-audit-testing-strategy` | Test coverage, architecture, reliability and speed |
| `sills-audit-privacy-and-trust` | Data practices, consent, transparency and user control |
| `sills-audit-seo` | Crawlability, metadata, structured data and discoverability |
| `sills-audit-api-design` | API contracts, consistency, lifecycle, errors and DX |
| `sills-audit-agent-readiness` | Agent instructions, context, workflows and documentation drift |
| `sills-audit-code-quality` | Complexity, duplication, dead code, dependencies and language idioms |
| `sills-audit-apple-review` | Pre-submission App Store review readiness for native and hybrid apps |

Auditing is the first application of the Sills knowledge and evidence model. Future Skill categories may consume the same contracts for safe fixes, planning, migrations, documentation, and project understanding.

## Install

```bash
npx sills-audit install
```

This installs the `$sills` shortcut, the `$sills-audit` umbrella skill, and all specialists into both `.agents/skills/` and `.claude/skills/` in the current project. Use `--codex`, `--claude`, or `--global` to narrow the destination.

```bash
npx sills-audit install --codex
npx sills-audit install --claude --global
npx sills-audit-agent-readiness install
```

## Run

```text
$sills-audit Audit this project.
$sills audit api
```

A generic request prompts for both the relevant Audit Skills and one of three depths: Quick, Standard, or Deep. To request every applicable Audit Skill explicitly:

```text
$sills-audit Do a full standard audit of this project.
```

The default output is a dated folder:

```text
audit/2026-07-15/
├── index.md
├── summary.md
├── report.md
├── report.json
├── report.html
├── manifest.json
├── handoff.md
├── coverage.json
├── project-knowledge.json
├── reports/
├── findings/
├── evidence/
└── raw/
```

## Documentation

- [Support matrix](docs/support-matrix.md)
- [Audit depth](docs/audit-depth.md)
- [Terminology](docs/terminology.md)
- [Discovery and platform support](docs/architecture/discovery-and-platform-support.md)
- [Shared project knowledge](docs/architecture/knowledge-model.md)
- [Platform and knowledge roadmap](docs/roadmap/platform-support.md)
- [Remediation engine plan](docs/roadmap/remediation-engine.md)

## Development

```bash
npm install
npm test
npm run validate
npm run pack:check
```

Public website content lives in [`web/docs`](web/docs).

## Status

Sills is an open-source beta. The repository provides sixteen specialist Audit Skills, a selective umbrella orchestrator, built-in platform discovery, shared knowledge and evidence contracts, report schemas, audit scaffolding, fixtures, CI, Cloudflare deployment, and npm release automation. Audit quality still depends on the capabilities available to the invoking agent and environment, so every report must state its coverage and limitations.

## License

MIT
