# ADR 0003: Remediation uses one engine + domain profiles

## Context

Two prior planning documents implied different remediation architectures:

- `docs/roadmap/remediation-engine.md` proposed a single centralized `sills-remediate` package with safety levels (`explain`/`patch`/`branch`/`pr`).
- `sills-specialist-authoring/references/ecosystem-architecture.md` proposed per-domain `sills-fix-*` skills (fix-seo, fix-accessibility, etc.), each standalone.

Both are needed. The per-domain design would duplicate report discovery, git lifecycle, commit protocol, and verify wiring across six skills. The centralized engine alone loses domain-specific safety tuning (what is auto-fixable in SEO vs security).

## Decision

Remediation is structured as **one engine plus thin domain profiles.**

- `sills-remediate` is the single engine. It owns report discovery, finding eligibility, safety-level enforcement, branch and commit lifecycle, idempotency, and verify integration. Skill-agnostic infrastructure, written once.
- `sills-fix-seo`, `sills-fix-accessibility`, and subsequent domains are **profiles**, not full standalone skills. Each profile is a data and rules package that tells the engine: for findings with this prefix, here is what is auto-fixable, what requires review, what is out of scope, and where the boundary with sibling domains lies.

### Resolved parameters

1. **Architecture:** engine + profiles.
2. **Report discovery:** explicit `--audit <path>` flag, then convention search of `audit/*/report.json` (newest by directory name), filtered by the profile's source audit. No marker files, dotfiles, or `.sills/` directory written into consumer repos. If no report is found, fail with a clear message and non-zero exit. Never re-audit inline.
3. **Default safety level:** `explain`. Nothing is written to the source tree unless the user explicitly elevates.
4. **Verify:** opt-in via `--verify`, default ON for `pr` level in interactive mode. In CI, always opt-in.
5. **Draft PR:** at `pr` level the engine confirms before pushing (unless `--yes`), opens as draft, never auto-merges.

## Consequences

- Remediation remains a separate consumer of `report.json`. ADR 0001 (report-only audits) is unchanged — audit skills still never modify the audited project.
- Every applied change references a finding ID in its commit message. No finding ID means no commit.
- One finding equals one commit, on a dedicated branch off the integration branch. Cherry-pickable, reviewable, revertable.
- Complex, low-confidence, or cross-cutting findings go to a manual-review queue rather than being attempted.
- Excluded categories (auth, migrations, dependency upgrades, secrets, billing, infrastructure, legal) are never auto-fixed at any level.
- The `sills-fix-*` packages are lighter than full skills: they contain profile rules, boundaries, and tier definitions, not duplicated infrastructure.
- Report discovery has no state to go stale and no files to gitignore — it relies on the date-named directory convention already produced by `create-audit-run.mjs`.
