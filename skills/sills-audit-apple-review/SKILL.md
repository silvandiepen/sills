---
name: sills-audit-apple-review
description: Perform a report-only pre-submission audit against Apple App Store and Mac App Store review expectations for native iOS and macOS apps and for Capacitor, React Native, Expo, and Electron hybrid apps. Use before a TestFlight or App Store submission to catch likely rejection reasons early, covering App Store Review Guidelines, privacy manifests and required-reason APIs, permission purpose strings, App Tracking Transparency, entitlements, private-API and deprecated-API usage, Human Interface Guideline signals, and submission metadata readiness. Never use to submit, upload, or modify App Store Connect state.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.1.0"
---

# Apple Review Audit

Gather as much evidence as possible about what Apple reviews, so likely rejections are caught before submission rather than after. This audit predicts risk; it does not guarantee approval or rejection, which only Apple decides.

## Non-negotiable contract

- Do not modify application code, content, configuration, entitlements, manifests, metadata, dependencies, lockfiles, generated files, data, or repository structure.
- Never submit, upload, deliver, or change App Store Connect state. Never run `fastlane deliver`, `fastlane pilot`, `xcrun altool`, or any network command against App Store Connect. Detection of `fastlane precheck` configuration is reported as a recommendation only.
- Create files only inside the selected dated audit directory.
- Suggestions and verification steps are allowed; fixes are not.
- Never invent guideline numbers, evidence, entitlements, metadata, or review outcomes. When you cite an App Store Review Guideline section, cite it because it applies, not to sound authoritative.
- Distinguish direct observation, automated detection, manual verification, documentation, inference, and untested areas.
- Private-API and deprecated-API heuristics are always `requires-manual-verification` unless a symbol is directly confirmed in source.
- Include concrete positive findings. Do not manufacture praise.
- Read project documentation and repository instructions before applying general practice.
- A clean automated result is not proof of approval. Apple review includes human judgement this audit cannot replicate.

## Supported modes

- `source`: repository, manifest, entitlement, and configuration inspection only.
- `runtime`: inspection of a running build on simulator or device when one is already available and safe.
- `full`: combine source and any available runtime or build evidence.
- `changed`: focus on a branch, commit, or pull-request diff and the review surfaces it touches.
- `ci`: non-interactive execution with machine-readable output.
- `verify`: retest findings from an earlier report without changing the product.

Depth is independent: `quick`, `standard`, or `deep`. Default to `source` and `standard` when possible.

## Before auditing

1. Read `AGENTS.md`, `CLAUDE.md`, README files, product and privacy documentation, and any App Store metadata, release notes, or submission guidance in the repository.
2. Determine whether the project is native iOS/macOS, hybrid (Capacitor, React Native, Expo, Electron), or a mix, and locate the app target(s), `Info.plist`, entitlements, and any `PrivacyInfo.xcprivacy`.
3. Identify declared capabilities: permissions, background modes, tracking, in-app purchase, sign-in methods, and third-party SDKs.
4. Locate prior audits, prior rejection history if documented, and the intended submission target (App Store, Mac App Store, TestFlight).
5. Build a coverage inventory of review surfaces before selecting representative areas.

## Evidence collectors

Bundled runnable collectors gather evidence read-only. They parse manifests and configuration and never contact Apple:

```bash
node scripts/collect.mjs --kind apple-manifests    --path <target> --out <audit-dir>/raw
node scripts/collect.mjs --kind apple-hybrid       --path <target> --out <audit-dir>/raw
node scripts/collect.mjs --kind apple-private-api  --path <target> --out <audit-dir>/raw
node scripts/collect.mjs --kind apple-precheck     --path <target> --out <audit-dir>/raw
# or the whole group:
node scripts/collect.mjs --kind apple              --path <target> --out <audit-dir>/raw
```

Each collector emits JSON conforming to the Sills collector-output contract, with `observations`, `evidence`, and honest `limitations`. `apple-precheck` only detects fastlane configuration and never executes a submission or network call. See `references/platforms-and-tools.md`.

## Output

Default to `audit/YYYY-MM-DD/`; use `-02`, `-03`, and so on for repeated runs on the same date. Ask only when a project convention or explicit user preference conflicts with the default.

Write:

- `summary.md`
- `report.md`
- `report.json`
- `coverage.json`
- `manifest.json`
- `handoff.md`
- `reports/apple-review.md`
- individual finding files when useful
- collector output and raw results under `raw/`

Use finding IDs `APL-0001`, `APL-0002`, and so on.

Each finding must include category, kind, title, severity when applicable, release-blocker status, confidence, origin, scope, impact, evidence or manual-review reason, the applicable App Store Review Guideline section when one applies, reproduction or location, expected and observed results, recommendation, and verification instructions.

## Audit procedure

1. **Discover** the platform, targets, capabilities, and intended submission surface.
2. **Run relevant collectors** read-only and record their evidence and limitations.
3. **Prioritise** the highest-probability rejection vectors: crashes and completeness, privacy and permissions, tracking, payments, and metadata.
4. **Analyse** using the applicable references and map each risk to the relevant guideline.
5. **Weight confidence honestly** — many review outcomes depend on human judgement or on the running app, which source analysis cannot fully assess.
6. **Record positive findings** where the app clearly meets an expectation.
7. **Record limitations** and untested review surfaces explicitly.
8. **Write structured and human-readable reports** that agree with each other.
9. **Prepare remediation handoff** so another agent can act on open findings before submission.
10. **Validate** report structure and verify that no files outside the audit directory changed.

## Severity and confidence

Use the shared Sills definitions:

- Severity: `critical`, `major`, `moderate`, `minor`, `observation`.
- Confidence: `confirmed`, `high`, `medium`, `low`, `requires-manual-verification`.
- `releaseBlocker` is a separate boolean; use it for issues that are very likely to cause a rejection.

Do not produce a single artificial approval score or predict an approval probability. Prefer counts of likely-rejection risks by guideline area, blockers, coverage, and category assessments such as `ready`, `needs work`, or `high risk`.

## References

Read only the reference files relevant to the current project and scope. Do not load all reference material automatically.

<!-- sills:shared-report-contract:start -->
## Shared report and runtime-intake contract

Before writing any Apple review audit output, read `references/report-contract.md` and use the bundled report template.

- Begin with a professional status conclusion using the universal Sills health level and an audit-specific label.
- Report the relevant status dimensions rather than hiding materially different strengths and weaknesses behind one label.
- Include a ship decision only when this specialist has enough evidence to justify one.
- Include a prioritised Tasks section with traceable actions, acceptance criteria, and verification.
- Keep the standard section order so every Sills report is immediately comparable.
- When runtime web coverage is relevant and no usable URL is supplied or documented, ask once for live, staging, preview, or local URLs and their environment and role. Continue source analysis if none are provided.
- In CI mode, never prompt; record absent runtime targets as a limitation.

Recommended status dimensions: App Store guideline compliance; Privacy and permissions; Data collection and tracking; HIG and platform conventions; Submission and metadata readiness.
<!-- sills:shared-report-contract:end -->
