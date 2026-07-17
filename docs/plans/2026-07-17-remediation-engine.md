# Sills Remediation Engine — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task. Dispatch a fresh subagent per task with two-stage review (spec compliance, then code quality).

**Goal:** Build `packages/sills-remediate` — the report-driven remediation engine that consumes `sills-audit-*` reports and applies evidence-backed fixes on a branch, per the contract in [ADR 0003](../decisions/0003-remediation-architecture.md).

**Architecture:** One engine (`sills-remediate`) + thin domain profiles (`sills-fix-*`). The engine owns report discovery, finding eligibility, safety-level enforcement, git lifecycle, per-finding commits, idempotency, and verify wiring. Profiles are data/rules packages that tell the engine what is auto-fixable per domain. Full design: `~/.hermes/plans/sills-remediation-spec.md`.

**Tech Stack:** Node.js ≥20, ESM (`.mjs`), `node --test` runner, no external dependencies (stdlib only). Matches existing `packages/audit-cli/` conventions.

**Conventions:** ESM modules, named exports, `@sills/*` scope for private packages, conventional commits, TDD (red-green-refactor).

---

## Phase 1 — Engine core (keystone)

No git operations yet. These modules are pure functions operating on report data and the filesystem. Fully testable without a real repo.

### Task 1.1: Scaffold the package

**Objective:** Create `packages/sills-remediate/` with package.json and directory structure.

**Files:**
- Create: `packages/sills-remediate/package.json`
- Create: `packages/sills-remediate/README.md`

**Step 1: Create package.json**

```json
{
  "name": "@sills/remediate",
  "version": "0.1.0",
  "private": true,
  "description": "Report-driven remediation engine for Sills audits.",
  "license": "MIT",
  "type": "module",
  "bin": {
    "sills-remediate": "bin/sills-remediate.mjs"
  }
}
```

Note: `@sills/remediate` is private for now (matches `@sills/audit-cli`). It becomes public `sills-remediate` only when the contract settles and it ships as an installable skill — see Phase 3.

**Step 2: Create README.md**

```markdown
# @sills/remediate

Report-driven remediation engine. Consumes `sills-audit-*` reports and applies evidence-backed fixes on a dedicated branch.

See ADR 0003 for architecture decisions.
```

**Step 3: Verify workspace picks it up**

Run: `cd /home/hermes/workspace/sills && node -e "import('./packages/sills-remediate/package.json', { with: { type: 'json' } }).then(() => console.log('ok')).catch(e => console.log('ok (json import not needed):', e.message))"`

**Step 4: Commit**

```bash
cd /home/hermes/workspace/sills
git add packages/sills-remediate/package.json packages/sills-remediate/README.md
git commit -m "feat(remediate): scaffold @sills/remediate package"
```

---

### Task 1.2: Report discovery — type definitions

**Objective:** Define the `DiscoveredReport` type and the discovery options interface.

**Files:**
- Create: `packages/sills-remediate/src/types.mjs`

**Step 1: Write the types module**

```javascript
// packages/sills-remediate/src/types.mjs

/**
 * A resolved audit report location after discovery.
 * @typedef {Object} DiscoveredReport
 * @property {string} directory   - Absolute path to the audit run directory.
 * @property {string} reportFile  - Absolute path to report.json.
 * @property {string} source      - How it was found: 'explicit' | 'convention'.
 * @property {string} runId       - The audit run ID (e.g. "2026-07-17").
 */

/**
 * Options for report discovery.
 * @typedef {Object} DiscoverOptions
 * @property {string} [explicitPath]   - From --audit flag. Absolute or relative to cwd.
 * @property {string} sourceAudit      - e.g. "sills-audit-seo". Filters reports by audit.skills[].
 * @property {string} [cwd]            - Override process.cwd() for testing.
 */

export const DISCOVER_RESULT = {
  FOUND: 'found',
  NOT_FOUND: 'not-found',
  EXPLICIT_MISSING: 'explicit-missing',
};
```

**Step 2: Commit**

```bash
git add packages/sills-remediate/src/types.mjs
git commit -m "feat(remediate): add discovery type definitions"
```

---

### Task 1.3: Report discovery — `resolveProjectRoot`

**Objective:** Walk up from cwd to find the project root by marker files.

**Files:**
- Create: `packages/sills-remediate/src/discover.mjs`
- Create: `packages/sills-remediate/test/discover.test.mjs`

**Step 1: Write failing tests**

```javascript
// packages/sills-remediate/test/discover.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { resolveProjectRoot } from '../src/discover.mjs';

test('resolveProjectRoot finds nearest package.json ancestor', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  await writeFile(join(base, 'package.json'), '{}');
  await mkdir(join(base, 'src', 'deep', 'nested'), { recursive: true });
  const root = resolveProjectRoot(join(base, 'src', 'deep', 'nested'));
  assert.equal(root, base);
});

test('resolveProjectRoot finds .git marker', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  await mkdir(join(base, '.git'), { recursive: true });
  await mkdir(join(base, 'app'), { recursive: true });
  const root = resolveProjectRoot(join(base, 'app'));
  assert.equal(root, base);
});

test('resolveProjectRoot falls back to cwd when no marker found', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  const root = resolveProjectRoot(base, base);
  assert.equal(root, base);
});
```

**Step 2: Run tests to verify failure**

Run: `cd /home/hermes/workspace/sills && node --test packages/sills-remediate/test/discover.test.mjs`
Expected: FAIL — cannot find module `../src/discover.mjs`

**Step 3: Implement `resolveProjectRoot`**

```javascript
// packages/sills-remediate/src/discover.mjs
import { access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const MARKERS = ['package.json', '.git', 'pyproject.toml', 'Cargo.toml', 'go.mod', 'pnpm-workspace.yaml'];

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

export function resolveProjectRoot(startPath, fallback) {
  let current = resolve(startPath);
  while (true) {
    for (const marker of MARKERS) {
      if (exists(join(current, marker))) return current;  // sync check via accessSync below
    }
    const parent = dirname(current);
    if (parent === current) return fallback ?? startPath;
    current = parent;
  }
}
```

⚠️ `access` is async but `resolveProjectRoot` is called sync above. Use `accessSync` instead:

```javascript
import { accessSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const MARKERS = ['package.json', '.git', 'pyproject.toml', 'Cargo.toml', 'go.mod', 'pnpm-workspace.yaml'];

export function resolveProjectRoot(startPath, fallback) {
  let current = resolve(startPath);
  while (true) {
    for (const marker of MARKERS) {
      try { accessSync(join(current, marker)); return current; } catch {}
    }
    const parent = dirname(current);
    if (parent === current) return fallback ?? startPath;
    current = parent;
  }
}
```

**Step 4: Run tests to verify pass**

Run: `node --test packages/sills-remediate/test/discover.test.mjs`
Expected: 3 passed

**Step 5: Commit**

```bash
git add packages/sills-remediate/src/discover.mjs packages/sills-remediate/test/discover.test.mjs
git commit -m "feat(remediate): add resolveProjectRoot with marker-file walk"
```

---

### Task 1.4: Report discovery — `findLatestReport` (convention search)

**Objective:** Scan `audit/*/report.json`, filter by source audit, pick newest by directory name.

**Files:**
- Modify: `packages/sills-remediate/src/discover.mjs`
- Modify: `packages/sills-remediate/test/discover.test.mjs`

**Step 1: Write failing tests**

Append to `test/discover.test.mjs`:

```javascript
import { findLatestReport } from '../src/discover.mjs';
import { writeFile, mkdir } from 'node:fs/promises';

test('findLatestReport picks newest dated directory for the source audit', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  // older run
  await mkdir(join(base, 'audit', '2026-07-10'), { recursive: true });
  await writeFile(join(base, 'audit', '2026-07-10', 'report.json'), JSON.stringify({
    schemaVersion: '1.1.0',
    audit: { id: '2026-07-10', skills: ['sills-audit-seo'] },
    findings: [],
  }));
  // newer run
  await mkdir(join(base, 'audit', '2026-07-15'), { recursive: true });
  await writeFile(join(base, 'audit', '2026-07-15', 'report.json'), JSON.stringify({
    schemaVersion: '1.1.0',
    audit: { id: '2026-07-15', skills: ['sills-audit-seo'] },
    findings: [],
  }));
  const result = await findLatestReport({ projectRoot: base, sourceAudit: 'sills-audit-seo' });
  assert.equal(result.runId, '2026-07-15');
  assert.equal(result.source, 'convention');
});

test('findLatestReport ignores reports from a different source audit', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  await mkdir(join(base, 'audit', '2026-07-15'), { recursive: true });
  await writeFile(join(base, 'audit', '2026-07-15', 'report.json'), JSON.stringify({
    schemaVersion: '1.1.0',
    audit: { id: '2026-07-15', skills: ['sills-audit-accessibility'] },
    findings: [],
  }));
  const result = await findLatestReport({ projectRoot: base, sourceAudit: 'sills-audit-seo' });
  assert.equal(result, null);
});

test('findLatestReport returns null when no audit directory exists', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  const result = await findLatestReport({ projectRoot: base, sourceAudit: 'sills-audit-seo' });
  assert.equal(result, null);
});
```

**Step 2: Run tests to verify failure**

Run: `node --test packages/sills-remediate/test/discover.test.mjs`
Expected: FAIL — `findLatestReport` is not a function

**Step 3: Implement `findLatestReport`**

Add to `src/discover.mjs`:

```javascript
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function readReport(reportFile) {
  try {
    const content = await readFile(reportFile, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function findLatestReport({ projectRoot, sourceAudit }) {
  const auditDir = join(projectRoot, 'audit');
  let entries;
  try {
    entries = await readdir(auditDir, { withFileTypes: true });
  } catch {
    return null;  // no audit directory
  }

  // Collect dated run directories, sorted newest first (lexical = chronological)
  const runDirs = entries
    .filter((e) => e.isDirectory() && /^\d{4}-\d{2}-\d{2}/.test(e.name))
    .map((e) => e.name)
    .sort()
    .reverse();

  for (const runName of runDirs) {
    const reportFile = join(auditDir, runName, 'report.json');
    const report = await readReport(reportFile);
    if (!report) continue;
    if (Array.isArray(report.audit?.skills) && report.audit.skills.includes(sourceAudit)) {
      return {
        directory: join(auditDir, runName),
        reportFile,
        source: 'convention',
        runId: report.audit.id ?? runName,
        report,
      };
    }
  }

  // Fallback: single-run layout (audit/report.json, no date subdirs)
  const singleReportFile = join(auditDir, 'report.json');
  const singleReport = await readReport(singleReportFile);
  if (singleReport && Array.isArray(singleReport.audit?.skills) && singleReport.audit.skills.includes(sourceAudit)) {
    return {
      directory: auditDir,
      reportFile: singleReportFile,
      source: 'convention',
      runId: singleReport.audit.id ?? 'single',
      report: singleReport,
    };
  }

  return null;
}
```

**Step 4: Run tests to verify pass**

Run: `node --test packages/sills-remediate/test/discover.test.mjs`
Expected: 6 passed

**Step 5: Commit**

```bash
git add packages/sills-remediate/src/discover.mjs packages/sills-remediate/test/discover.test.mjs
git commit -m "feat(remediate): add findLatestReport convention search filtered by source audit"
```

---

### Task 1.5: Report discovery — `discoverReport` (the top-level resolver)

**Objective:** Wire explicit flag → convention search → fail. This is the §4 protocol entry point.

**Files:**
- Modify: `packages/sills-remediate/src/discover.mjs`
- Modify: `packages/sills-remediate/test/discover.test.mjs`

**Step 1: Write failing tests**

```javascript
import { discoverReport } from '../src/discover.mjs';

test('discoverReport uses explicit --audit path when provided and valid', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  await mkdir(join(base, 'audit', '2026-07-15'), { recursive: true });
  const reportFile = join(base, 'audit', '2026-07-15', 'report.json');
  await writeFile(reportFile, JSON.stringify({
    schemaVersion: '1.1.0',
    audit: { id: '2026-07-15', skills: ['sills-audit-seo'] },
    findings: [],
  }));
  const result = await discoverReport({ explicitPath: join(base, 'audit', '2026-07-15'), sourceAudit: 'sills-audit-seo' });
  assert.equal(result.source, 'explicit');
  assert.equal(result.runId, '2026-07-15');
});

test('discoverReport fails with explicit-missing when --audit path does not exist', async () => {
  const result = await discoverReport({ explicitPath: '/nonexistent/path', sourceAudit: 'sills-audit-seo' });
  assert.equal(result.status, 'explicit-missing');
  assert.match(result.message, /not found/i);
});

test('discoverReport falls back to convention search when no explicit path', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  await mkdir(join(base, 'audit', '2026-07-15'), { recursive: true });
  await writeFile(join(base, 'audit', '2026-07-15', 'report.json'), JSON.stringify({
    schemaVersion: '1.1.0',
    audit: { id: '2026-07-15', skills: ['sills-audit-seo'] },
    findings: [],
  }));
  const result = await discoverReport({ cwd: base, sourceAudit: 'sills-audit-seo' });
  assert.equal(result.source, 'convention');
});

test('discoverReport returns not-found with helpful message when no report exists', async () => {
  const base = await mkdtemp(join(tmpdir(), 'sills-'));
  const result = await discoverReport({ cwd: base, sourceAudit: 'sills-audit-seo' });
  assert.equal(result.status, 'not-found');
  assert.match(result.message, /sills-audit-seo/);
  assert.match(result.message, /--audit/);
});
```

**Step 2: Run tests to verify failure**

Run: `node --test packages/sills-remediate/test/discover.test.mjs`
Expected: FAIL — `discoverReport` is not a function

**Step 3: Implement `discoverReport`**

```javascript
export async function discoverReport({ explicitPath, sourceAudit, cwd = process.cwd() }) {
  // 1. Explicit flag
  if (explicitPath) {
    const resolved = resolve(cwd, explicitPath);
    const reportFile = (await pathIsDirectory(resolved))
      ? join(resolved, 'report.json')
      : resolved;
    const report = await readReport(reportFile);
    if (!report) {
      return {
        status: 'explicit-missing',
        message: `Audit path not found or has no report.json: ${explicitPath}`,
      };
    }
    return {
      status: 'found',
      source: 'explicit',
      directory: dirname(reportFile),
      reportFile,
      runId: report.audit?.id ?? 'explicit',
      report,
    };
  }

  // 2. Convention search
  const projectRoot = resolveProjectRoot(cwd, cwd);
  const convention = await findLatestReport({ projectRoot, sourceAudit });
  if (convention) {
    return { status: 'found', ...convention };
  }

  // 3. Fail
  return {
    status: 'not-found',
    message: `No ${sourceAudit} audit report found. Run \`${sourceAudit}\` first, or pass --audit <path>.`,
  };
}

async function pathIsDirectory(path) {
  try { const s = await stat(path); return s.isDirectory(); } catch { return false; }
}
```

**Step 4: Run tests to verify pass**

Run: `node --test packages/sills-remediate/test/discover.test.mjs`
Expected: 10 passed (all discover tests)

**Step 5: Commit**

```bash
git add packages/sills-remediate/src/discover.mjs packages/sills-remediate/test/discover.test.mjs
git commit -m "feat(remediate): add discoverReport top-level resolver (explicit -> convention -> fail)"
```

---

### Task 1.6: Finding eligibility filter

**Objective:** Implement the §3 filter — which findings a fix run will touch.

**Files:**
- Create: `packages/sills-remediate/src/eligibility.mjs`
- Create: `packages/sills-remediate/test/eligibility.test.mjs`

**Step 1: Write failing tests**

```javascript
// packages/sills-remediate/test/eligibility.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyFinding, ELIGIBILITY } from '../src/eligibility.mjs';

const baseFinding = {
  id: 'SEO-0001',
  kind: 'issue',
  category: 'cross-cutting',
  title: 'Missing canonical URL',
  confidence: 'high',
  status: 'open',
  userImpact: 'Duplicate content confusion',
  recommendation: 'Add <link rel="canonical">',
  scope: {},
  verification: ['Canonical present in HTML head'],
};

test('eligible finding returns ELIGIBLE', () => {
  assert.equal(classifyFinding(baseFinding, { prefix: 'SEO-' }), ELIGIBILITY.ELIGIBLE);
});

test('positive finding is skipped', () => {
  assert.equal(classifyFinding({ ...baseFinding, kind: 'positive' }, { prefix: 'SEO-' }).tier, 'skip');
});

test('resolved finding is skipped', () => {
  assert.equal(classifyFinding({ ...baseFinding, status: 'resolved' }, { prefix: 'SEO-' }).tier, 'skip');
});

test('low confidence goes to review queue', () => {
  const result = classifyFinding({ ...baseFinding, confidence: 'low' }, { prefix: 'SEO-' });
  assert.equal(result.tier, 'review');
  assert.match(result.reason, /confidence/i);
});

test('empty recommendation is skipped', () => {
  const result = classifyFinding({ ...baseFinding, recommendation: '' }, { prefix: 'SEO-' });
  assert.equal(result.tier, 'skip');
  assert.match(result.reason, /recommendation/i);
});

test('wrong prefix is skipped', () => {
  const result = classifyFinding({ ...baseFinding, id: 'A11Y-0001' }, { prefix: 'SEO-' });
  assert.equal(result.tier, 'skip');
  assert.match(result.reason, /prefix/i);
});
```

**Step 2: Run tests to verify failure**

Run: `node --test packages/sills-remediate/test/eligibility.test.mjs`
Expected: FAIL — module not found

**Step 3: Implement eligibility**

```javascript
// packages/sills-remediate/src/eligibility.mjs

export const ELIGIBILITY = {
  ELIGIBLE: 'eligible',
  REVIEW: 'review',
  SKIP: 'skip',
};

const FIXABLE_KINDS = new Set(['issue']);
const OPEN_STATUSES = new Set(['open', 'needs-review']);
const FIXABLE_CONFIDENCE = new Set(['confirmed', 'high', 'medium']);

/**
 * @param {Object} finding   - A finding from report.findings[]
 * @param {Object} options
 * @param {string} options.prefix  - e.g. "SEO-"
 * @returns {{ tier: string, reason?: string, finding: Object }}
 */
export function classifyFinding(finding, { prefix }) {
  // Prefix check
  if (prefix && !finding.id?.startsWith(prefix)) {
    return { tier: ELIGIBILITY.SKIP, reason: `Finding prefix does not match ${prefix}`, finding };
  }

  // Kind check
  if (!FIXABLE_KINDS.has(finding.kind)) {
    return { tier: ELIGIBILITY.SKIP, reason: `Kind "${finding.kind}" is not fixable`, finding };
  }

  // Status check
  if (!OPEN_STATUSES.has(finding.status)) {
    return { tier: ELIGIBILITY.SKIP, reason: `Status "${finding.status}" is not open`, finding };
  }

  // Recommendation check
  if (!finding.recommendation || !finding.recommendation.trim()) {
    return { tier: ELIGIBILITY.SKIP, reason: 'No recommendation provided', finding };
  }

  // Confidence check
  if (!FIXABLE_CONFIDENCE.has(finding.confidence)) {
    return { tier: ELIGIBILITY.REVIEW, reason: `Confidence "${finding.confidence}" requires manual verification`, finding };
  }

  return { tier: ELIGIBILITY.ELIGIBLE, finding };
}

/**
 * Partition all findings in a report into eligible / review / skip buckets.
 */
export function partitionFindings(report, { prefix }) {
  const eligible = [];
  const review = [];
  const skip = [];
  for (const finding of report.findings ?? []) {
    const result = classifyFinding(finding, { prefix });
    if (result.tier === ELIGIBILITY.ELIGIBLE) eligible.push(result);
    else if (result.tier === ELIGIBILITY.REVIEW) review.push(result);
    else skip.push(result);
  }
  return { eligible, review, skip };
}
```

**Step 4: Run tests to verify pass**

Run: `node --test packages/sills-remediate/test/eligibility.test.mjs`
Expected: 6 passed

**Step 5: Commit**

```bash
git add packages/sills-remediate/src/eligibility.mjs packages/sills-remediate/test/eligibility.test.mjs
git commit -m "feat(remediate): add finding eligibility classifier and partition"
```

---

### Task 1.7: Safety level enforcement

**Objective:** Implement the §2 safety-level logic: level ordering, per-finding caps, effective level resolution.

**Files:**
- Create: `packages/sills-remediate/src/safety.mjs`
- Create: `packages/sills-remediate/test/safety.test.mjs`

**Step 1: Write failing tests**

```javascript
// packages/sills-remediate/test/safety.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS, resolveEffectiveLevel, validateRunLevel } from '../src/safety.mjs';

test('LEVELS ordered explain < patch < branch < pr', () => {
  assert.equal(LEVELS.indexOf('explain'), 0);
  assert.equal(LEVELS.indexOf('patch'), 1);
  assert.equal(LEVELS.indexOf('branch'), 2);
  assert.equal(LEVELS.indexOf('pr'), 3);
});

test('validateRunLevel accepts valid levels', () => {
  assert.doesNotThrow(() => validateRunLevel('explain'));
  assert.doesNotThrow(() => validateRunLevel('patch'));
  assert.doesNotThrow(() => validateRunLevel('branch'));
  assert.doesNotThrow(() => validateRunLevel('pr'));
});

test('validateRunLevel rejects invalid level', () => {
  assert.throws(() => validateRunLevel('destroy'), /invalid safety level/i);
});

test('resolveEffectiveLevel returns run level when no cap', () => {
  assert.equal(resolveEffectiveLevel({ runLevel: 'branch', findingCap: null }), 'branch');
});

test('resolveEffectiveLevel caps at finding level when lower', () => {
  assert.equal(resolveEffectiveLevel({ runLevel: 'branch', findingCap: 'patch' }), 'patch');
});

test('resolveEffectiveLevel ignores cap when higher than run level', () => {
  assert.equal(resolveEffectiveLevel({ runLevel: 'explain', findingCap: 'pr' }), 'explain');
});
```

**Step 2: Run tests to verify failure**

Run: `node --test packages/sills-remediate/test/safety.test.mjs`
Expected: FAIL — module not found

**Step 3: Implement safety**

```javascript
// packages/sills-remediate/src/safety.mjs

export const LEVELS = ['explain', 'patch', 'branch', 'pr'];

const VALID_LEVELS = new Set(LEVELS);

export function validateRunLevel(level) {
  if (!VALID_LEVELS.has(level)) {
    throw new Error(`Invalid safety level "${level}". Must be one of: ${LEVELS.join(', ')}`);
  }
  return level;
}

/**
 * Resolve the effective level for a single finding, given the run level and
 * the finding's profile cap. The effective level is whichever is lower.
 * @param {Object} params
 * @param {string} params.runLevel    - The level requested for this run.
 * @param {string|null} [params.findingCap] - Per-finding cap from profile rule.
 * @returns {string}
 */
export function resolveEffectiveLevel({ runLevel, findingCap }) {
  if (!findingCap) return runLevel;
  const runRank = LEVELS.indexOf(runLevel);
  const capRank = LEVELS.indexOf(findingCap);
  if (capRank < 0) return runLevel;  // invalid cap, ignore
  return runRank <= capRank ? runLevel : findingCap;
}

/**
 * Whether a given level should write to the source tree.
 */
export function writesSource(level) {
  return LEVELS.indexOf(level) >= LEVELS.indexOf('patch');
}

/**
 * Whether a given level commits.
 */
export function commits(level) {
  return LEVELS.indexOf(level) >= LEVELS.indexOf('branch');
}

/**
 * Whether a given level pushes / opens a PR.
 */
export function pushes(level) {
  return level === 'pr';
}
```

**Step 4: Run tests to verify pass**

Run: `node --test packages/sills-remediate/test/safety.test.mjs`
Expected: 6 passed

**Step 5: Commit**

```bash
git add packages/sills-remediate/src/safety.mjs packages/sills-remediate/test/safety.test.mjs
git commit -m "feat(remediate): add safety level enforcement and per-finding cap resolution"
```

---

### Task 1.8: Profile loader

**Objective:** Load and validate a `profile.json` from a `sills-fix-*` skill directory.

**Files:**
- Create: `packages/sills-remediate/src/profile.mjs`
- Create: `packages/sills-remediate/test/profile.test.mjs`
- Create: `packages/sills-remediate/test/fixtures/seo-profile.json`

**Step 1: Write failing tests**

```javascript
// packages/sills-remediate/test/profile.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadProfile } from '../src/profile.mjs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = join(dirname(fileURLToPath(import.meta.url)));
const fixtureDir = join(here, 'fixtures');

function dirname(url) { return url.slice(0, url.lastIndexOf('/')); }

test('loadProfile reads and validates a well-formed profile', async () => {
  const profile = await loadProfile(join(fixtureDir, 'seo-profile.json'));
  assert.equal(profile.name, 'sills-fix-seo');
  assert.equal(profile.findingPrefix, 'SEO-');
  assert.equal(profile.sourceAudit, 'sills-audit-seo');
  assert.equal(profile.maxLevel, 'branch');
  assert.ok(Array.isArray(profile.rules));
});

test('loadProfile throws on missing required fields', async () => {
  await assert.rejects(
    () => loadProfile(join(fixtureDir, 'bad-profile.json')),
    /missing required/i
  );
});
```

Create fixture `test/fixtures/seo-profile.json`:

```json
{
  "name": "sills-fix-seo",
  "findingPrefix": "SEO-",
  "sourceAudit": "sills-audit-seo",
  "maxLevel": "branch",
  "excludedSubcategories": [],
  "rules": [
    {
      "match": { "titlePattern": "missing canonical", "confidence": ["high", "medium"] },
      "tier": "auto",
      "action": "Add <link rel=\"canonical\"> to HTML head",
      "verification": ["Canonical link present in rendered HTML"]
    }
  ],
  "boundaries": []
}
```

Create fixture `test/fixtures/bad-profile.json`:

```json
{ "name": "broken" }
```

**Step 2: Run tests to verify failure**

Run: `node --test packages/sills-remediate/test/profile.test.mjs`
Expected: FAIL — module not found

**Step 3: Implement profile loader**

```javascript
// packages/sills-remediate/src/profile.mjs
import { readFile } from 'node:fs/promises';
import { validateRunLevel } from './safety.mjs';

const REQUIRED_FIELDS = ['name', 'findingPrefix', 'sourceAudit', 'maxLevel'];

export async function loadProfile(profilePath) {
  const content = await readFile(profilePath, 'utf8');
  const profile = JSON.parse(content);

  const missing = REQUIRED_FIELDS.filter((f) => !profile[f]);
  if (missing.length > 0) {
    throw new Error(`Profile ${profilePath} is missing required fields: ${missing.join(', ')}`);
  }

  validateRunLevel(profile.maxLevel);

  if (!Array.isArray(profile.rules)) {
    throw new Error(`Profile ${profilePath}: "rules" must be an array`);
  }

  return profile;
}

/**
 * Find the first matching rule for a finding, or null.
 */
export function matchRule(profile, finding) {
  for (const rule of profile.rules ?? []) {
    const match = rule.match ?? {};
    if (match.titlePattern) {
      const re = new RegExp(match.titlePattern, 'i');
      if (!re.test(finding.title ?? '')) continue;
    }
    if (Array.isArray(match.confidence) && match.confidence.length > 0) {
      if (!match.confidence.includes(finding.confidence)) continue;
    }
    return rule;
  }
  return null;
}
```

**Step 4: Run tests to verify pass**

Run: `node --test packages/sills-remediate/test/profile.test.mjs`
Expected: 2 passed

**Step 5: Commit**

```bash
git add packages/sills-remediate/src/profile.mjs packages/sills-remediate/test/profile.test.mjs packages/sills-remediate/test/fixtures/
git commit -m "feat(remediate): add profile loader and rule matcher"
```

---

### Task 1.9: Fix-run artifact writer

**Objective:** Write `fix-report.json`, `changes.md`, `review-queue.md`, `skipped.md` to `.sills/fix-runs/<timestamp>/`. (§5)

**Files:**
- Create: `packages/sills-remediate/src/report.mjs`
- Create: `packages/sills-remediate/test/report.test.mjs`

**Step 1: Write failing tests**

```javascript
// packages/sills-remediate/test/report.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { writeFixRun } from '../src/report.mjs';

test('writeFixRun creates fix-report.json and markdown artifacts', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'sills-'));
  const run = {
    timestamp: '2026-07-17-050000',
    profile: 'sills-fix-seo',
    level: 'branch',
    branch: 'sills-fix-seo-2026-07-17',
    sourceReport: '/path/to/report.json',
    resolved: [{ findingId: 'SEO-0001', commit: 'abc1234', action: 'Added canonical' }],
    review: [{ findingId: 'SEO-0003', reason: 'Low confidence' }],
    skipped: [{ findingId: 'SEO-0005', reason: 'Status resolved' }],
    verifyResult: null,
  };
  const dir = await writeFixRun({ projectRoot, run });
  assert.match(dir, /\.sills\/fix-runs\/2026-07-17-050000$/);

  const report = JSON.parse(await readFile(join(dir, 'fix-report.json'), 'utf8'));
  assert.equal(report.resolved.length, 1);
  assert.equal(report.review.length, 1);
  assert.equal(report.skipped.length, 1);

  const changes = await readFile(join(dir, 'changes.md'), 'utf8');
  assert.match(changes, /SEO-0001/);
  assert.match(changes, /canonical/i);

  const review = await readFile(join(dir, 'review-queue.md'), 'utf8');
  assert.match(review, /SEO-0003/);

  const skipped = await readFile(join(dir, 'skipped.md'), 'utf8');
  assert.match(skipped, /SEO-0005/);
});
```

**Step 2: Run tests to verify failure** → FAIL (module not found)

**Step 3: Implement report writer**

```javascript
// packages/sills-remediate/src/report.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

export async function writeFixRun({ projectRoot, run }) {
  const dir = resolve(projectRoot, '.sills', 'fix-runs', run.timestamp);
  await mkdir(dir, { recursive: true });

  await writeFile(join(dir, 'fix-report.json'), JSON.stringify(run, null, 2) + '\n');

  const changes = [
    `# Changes — ${run.profile} (${run.timestamp})`,
    '',
    `Branch: \`${run.branch ?? 'n/a'}\`  |  Level: \`${run.level}\`  |  Source: \`${run.sourceReport}\``,
    '',
    `## Resolved (${run.resolved.length})`,
    '',
    ...run.resolved.map((r) => `- **${r.findingId}** — ${r.action} (\`${r.commit ?? 'no commit'}\`)`),
  ].join('\n') + '\n';
  await writeFile(join(dir, 'changes.md'), changes);

  const review = [
    `# Review queue — ${run.profile} (${run.timestamp})`,
    '',
    `These findings were not auto-fixed and need manual attention.`,
    '',
    ...run.review.map((r) => `- **${r.findingId}** — ${r.reason}`),
  ].join('\n') + '\n';
  await writeFile(join(dir, 'review-queue.md'), review);

  const skipped = [
    `# Skipped — ${run.profile} (${run.timestamp})`,
    '',
    ...run.skipped.map((s) => `- **${s.findingId}** — ${s.reason}`),
  ].join('\n') + '\n';
  await writeFile(join(dir, 'skipped.md'), skipped);

  if (run.verifyResult) {
    await writeFile(join(dir, 'verify-result.json'), JSON.stringify(run.verifyResult, null, 2) + '\n');
  }

  return dir;
}
```

**Step 4: Run tests to verify pass**

Run: `node --test packages/sills-remediate/test/report.test.mjs`
Expected: 1 passed

**Step 5: Commit**

```bash
git add packages/sills-remediate/src/report.mjs packages/sills-remediate/test/report.test.mjs
git commit -m "feat(remediate): add fix-run artifact writer (fix-report.json + markdown)"
```

---

### Task 1.10: Run full test suite

**Objective:** Verify all Phase 1 modules pass together.

**Step 1: Run the full package test suite**

Run: `cd /home/hermes/workspace/sills && node --test packages/sills-remediate/test/`
Expected: all tests pass, 0 failures

**Step 2: Run repo-wide validate**

Run: `cd /home/hermes/workspace/sills && npm run validate 2>&1 | tail -5`
Expected: no errors related to remediate package

---

## Phase 2 — Git lifecycle (on-hold marker)

> **These tasks involve modifying real repositories.** They require a test fixture repo (created in a temp directory) and careful isolation. Implement after Phase 1 is reviewed and merged.

### Task 2.1: Branch lifecycle — `createFixBranch`
Create `sills-fix-<domain>-<date>` off the integration branch. Detect `development` if it exists, else current branch. Never `main`/`master`. Test with a temp git repo fixture.

### Task 2.2: Per-finding commit — `commitFinding`
Format: `fix(<domain>): <imperative summary> (<FINDING-ID>)`. One commit per finding. Test commit message format via `git log --format`.

### Task 2.3: Idempotency pre-check — `isAlreadyResolved`
Check `fix-status.json` sidecar + `git log --grep "<FINDING-ID>"`. Return boolean.

### Task 2.4: Fix-status sidecar writer — `writeFixStatus`
Write `fix-status.json` next to the source `report.json`. Additive, never mutates original findings.

### Task 2.5: Verify wiring — `runVerify`
Shell out to `sills-audit --mode verify --findings <IDs>` when `--verify` is set or level is `pr`. Parse verify result, flip sidecar status.

---

## Phase 3 — CLI, profile, and integration

### Task 3.1: CLI entry — `bin/sills-remediate.mjs`
Parse args: `--profile <path>`, `--level <explain|patch|branch|pr>`, `--audit <path>`, `--verify`, `--yes`, `--cwd`. Wire: discover → load profile → partition findings → resolve effective levels → (dry-run summary) → apply → write artifacts → optional verify → optional push/PR.

### Task 3.2: `sills-fix-seo` profile package
Create `skills/sills-fix-seo/` with `profile.json` (the rules from spec §10), `SKILL.md`, `README.md`, `package.json`, `bin/install.mjs`. Full auto/review/manual tier rules and boundary declarations.

### Task 3.3: Orchestrator `sills fix` shortcut
Add `sills fix <domain>` to `skills/sills-audit/bin/sills-audit.mjs` and the orchestrator SKILL.md invocation shortcuts. Resolves report via discovery, invokes the engine with the right profile.

### Task 3.4: Post-audit prompt
In interactive mode, after an audit run completes, offer: "Apply fixes now? (explain / patch / branch / pr)". Default `explain`.

---

## Pitfalls

1. **`access` is async, `accessSync` is sync.** `resolveProjectRoot` walks up the tree and must be synchronous to be usable inline. Use `accessSync`.
2. **Date directory sort.** Run dirs are `YYYY-MM-DD[-NN]`. Lexical sort works because the format is zero-padded. Do NOT parse dates with `new Date()` — string sort is correct and avoids timezone issues.
3. **Report `audit.skills` may be undefined.** Always check `Array.isArray(report.audit?.skills)` before `.includes()`.
4. **`process.cwd()` in tests.** Always pass `cwd` explicitly in tests; never rely on the real cwd.
5. **Temp dirs cleanup.** Use `mkdtemp` + cleanup in `test.after`. Node's built-in test runner supports `test.after` hooks.
6. **No external dependencies.** The engine uses Node stdlib only (`fs`, `path`, `child_process`, `crypto`). Do not add `execa`, `glob`, `ajv`, etc. This matches `packages/audit-cli/`.
7. **`--yes` flag for non-interactive.** CI and the sills repo itself skip the push confirmation. Everything else asks.

---

## Verification checklist (Phase 1)

- [ ] `packages/sills-remediate/package.json` exists and is valid JSON
- [ ] `node --test packages/sills-remediate/test/` — all pass
- [ ] `discoverReport` handles: explicit-valid, explicit-missing, convention-found, convention-not-found
- [ ] `classifyFinding` handles: eligible, skip (kind/status/prefix/recommendation), review (confidence)
- [ ] `resolveEffectiveLevel` handles: no-cap, cap-lower, cap-higher
- [ ] `loadProfile` handles: valid profile, missing fields
- [ ] `writeFixRun` produces fix-report.json + 3 markdown files
- [ ] `npm run validate` passes
- [ ] Each task committed separately with conventional commits

---

## What this plan does NOT cover

- **The actual fix logic** (what code to write to resolve a specific SEO finding). That is profile-specific and belongs in the `sills-fix-seo` SKILL.md methodology, consumed by the builder agent at fix time. The engine provides the scaffolding; the profile provides the knowledge.
- **`sills-manage-*` (tasks/track) and `sills-connect-*`.** Separate plans, share the discovery layer.
- **Changes to `report.json` schema.** The engine is a pure consumer + sidecar writer.
