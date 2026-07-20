// Sills runnable evidence collectors.
//
// Self-contained (Node builtins only) so this file can be bundled verbatim into a
// skill's scripts/ directory and run from an installed skill with no dependencies.
//
// Report-only contract: collectors never modify the audited project, never install
// dependencies, and run tools read-only. A missing tool is recorded as a limitation,
// never a hard failure. Collector output is evidence, never a finding or an approval.

import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const IGNORE = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'coverage', 'audit', '.turbo', 'Pods', 'DerivedData', '.expo', 'vendor']);

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function nowIso() {
  return new Date().toISOString();
}

function evidenceId(source, capturedAt) {
  const hash = createHash('sha256').update(`${source}\n${capturedAt}`).digest('hex').slice(0, 12).toUpperCase();
  return `EVD-${hash}`;
}

function contentHash(text) {
  return createHash('sha256').update(text ?? '').digest('hex').slice(0, 16);
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function emptyOutput(collector, extra = {}) {
  return { collector, tool: null, toolVersion: null, toolAvailable: false, ranAt: nowIso(), observations: [], evidence: [], limitations: [], ...extra };
}

// Run a command read-only with a timeout. Never throws; returns a result object.
function run(cmd, args, { cwd, timeout = 120000, maxBuffer = 1024 * 1024 * 32 } = {}) {
  return new Promise((resolvePromise) => {
    execFile(cmd, args, { cwd, timeout, maxBuffer, windowsHide: true }, (error, stdout, stderr) => {
      resolvePromise({
        ok: !error || typeof error.code === 'number',
        failed: Boolean(error) && typeof error.code !== 'number',
        code: error && typeof error.code === 'number' ? error.code : 0,
        stdout: stdout ?? '',
        stderr: stderr ?? '',
        error: error && typeof error.code !== 'number' ? error.message : null,
      });
    });
  });
}

// Locate a CLI tool without ever triggering an install. Prefers a project-local
// node_modules/.bin binary, then a binary on PATH. Returns null when unavailable.
async function resolveTool(root, bin) {
  const local = join(root, 'node_modules', '.bin', bin);
  if (await exists(local)) return { cmd: local, args: [] };
  const which = await run(process.platform === 'win32' ? 'where' : 'which', [bin]);
  if (which.code === 0 && which.stdout.trim()) return { cmd: bin, args: [] };
  return null;
}

async function toolVersion(runner) {
  const result = await run(runner.cmd, [...runner.args, '--version'], { timeout: 15000 });
  const line = (result.stdout || result.stderr).split('\n').find((l) => l.trim());
  return line ? line.trim().slice(0, 80) : null;
}

// Persist raw tool output as an evidence record when an output directory is supplied.
async function writeEvidence(out, collector, name, text, { kind = 'command', source, summary } = {}) {
  const capturedAt = nowIso();
  const record = {
    id: evidenceId(source, capturedAt),
    kind,
    source,
    capturedAt,
    hash: contentHash(text),
    summary,
    sensitivity: 'internal',
  };
  if (out) {
    await mkdir(out, { recursive: true });
    const file = join(out, `${collector}-${name}.txt`);
    await writeFile(file, text ?? '');
    record.path = file;
  }
  return record;
}

// Shallow walk collecting files that match a predicate. Bounded depth, ignores noise.
async function collectFiles(root, predicate, { maxDepth = 8 } = {}) {
  const found = [];
  async function walk(dir, depth) {
    if (depth > maxDepth) return;
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (IGNORE.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full, depth + 1);
      else if (predicate(entry.name, full)) found.push(full);
    }
  }
  await walk(root, 0);
  return found;
}

async function detectEcosystems(root) {
  const eco = new Set();
  if (await exists(join(root, 'package.json'))) eco.add('node');
  if (await exists(join(root, 'tsconfig.json'))) eco.add('typescript');
  if (await exists(join(root, 'pyproject.toml')) || await exists(join(root, 'requirements.txt'))) eco.add('python');
  if (await exists(join(root, 'go.mod'))) eco.add('go');
  if (await exists(join(root, 'Cargo.toml'))) eco.add('rust');
  if (await exists(join(root, 'composer.json'))) eco.add('php');
  if (await exists(join(root, 'Gemfile'))) eco.add('ruby');
  return [...eco];
}

// Minimal Apple property-list reader. Extracts <key> names and their scalar values
// from XML plists. Not a full parser: enough to observe declared keys and flags.
function parsePlistKeys(xml) {
  const keys = {};
  const regex = /<key>([^<]+)<\/key>\s*(?:<(string|true|false|integer|real|array|dict)\s*\/?>([^<]*)(?:<\/\2>)?)?/g;
  let match;
  while ((match = regex.exec(xml))) {
    const [, key, type, value] = match;
    if (type === 'true' || type === 'false') keys[key] = type === 'true';
    else if (type === 'array' || type === 'dict') keys[key] = type;
    else keys[key] = value !== undefined ? value.trim() : '';
  }
  return keys;
}

// ---------------------------------------------------------------------------
// Code-quality collectors
// ---------------------------------------------------------------------------

async function collectMetrics(root, out) {
  const runner = await resolveTool(root, 'scc');
  if (!runner) return emptyOutput('metrics', { tool: 'scc', limitations: ['scc is not installed; install github.com/boyter/scc for size, complexity, and DRYness metrics.'] });
  const version = await toolVersion(runner);
  const result = await run(runner.cmd, [...runner.args, '--format', 'json', root], { cwd: root });
  const output = emptyOutput('metrics', { tool: 'scc', toolVersion: version, toolAvailable: true, target: root });
  if (result.failed || !result.stdout.trim()) {
    output.limitations.push(`scc did not produce output${result.error ? `: ${result.error}` : ''}.`);
    return output;
  }
  let languages = [];
  try { languages = JSON.parse(result.stdout); } catch { output.limitations.push('scc output was not valid JSON.'); return output; }
  let totalCode = 0; let totalComplexity = 0;
  for (const lang of languages) {
    totalCode += lang.Code ?? 0;
    totalComplexity += lang.Complexity ?? 0;
    output.observations.push({ rule: 'language-footprint', location: lang.Name, metric: 'code+complexity', value: { code: lang.Code, complexity: lang.Complexity, files: lang.Count }, note: `${lang.Name}: ${lang.Code} code lines across ${lang.Count} files.` });
  }
  output.observations.push({ rule: 'codebase-size', location: root, metric: 'total-code-lines', value: totalCode, note: `Total ${totalCode} lines of code, aggregate complexity ${totalComplexity}.` });
  output.evidence.push(await writeEvidence(out, 'metrics', 'scc', result.stdout, { source: 'scc --format json', summary: 'scc size and complexity metrics.' }));
  return output;
}

async function collectComplexity(root, out) {
  const runner = await resolveTool(root, 'lizard');
  if (!runner) return emptyOutput('complexity', { tool: 'lizard', limitations: ['lizard is not installed; install it (pip install lizard) for multi-language cyclomatic complexity and function-length analysis.'] });
  const version = await toolVersion(runner);
  // Warnings-only run: one line per function that exceeds a complexity threshold.
  const result = await run(runner.cmd, [...runner.args, '--warnings_only', root], { cwd: root, timeout: 300000 });
  const output = emptyOutput('complexity', { tool: 'lizard', toolVersion: version, toolAvailable: true, target: root });
  if (result.failed) { output.limitations.push(`lizard did not run: ${result.error}.`); return output; }
  const lines = result.stdout.split('\n').filter((l) => l.trim());
  for (const line of lines) {
    const match = line.match(/^(.*?):(\d+):\s*(?:warning:\s*)?(.+?)\s+has\s+(\d+)\s+CCN/i);
    if (!match) continue;
    const [, file, lineNo, fn, ccn] = match;
    output.observations.push({
      rule: 'high-cyclomatic-complexity',
      location: `${relative(root, file) || file}:${lineNo}`,
      metric: 'cyclomatic-complexity',
      value: Number(ccn),
      threshold: 15,
      severityHint: Number(ccn) >= 30 ? 'major' : 'moderate',
      confidenceHint: 'high',
      note: `Function ${fn} exceeds the default complexity threshold.`,
    });
  }
  if (!output.observations.length) output.observations.push({ rule: 'complexity-clean', location: root, metric: 'cyclomatic-complexity', value: 0, severityHint: 'observation', note: 'lizard flagged no functions above its default threshold. This is not proof of simple code.' });
  output.evidence.push(await writeEvidence(out, 'complexity', 'lizard', result.stdout, { source: 'lizard --warnings_only', summary: 'lizard cyclomatic-complexity warnings.' }));
  return output;
}

async function collectDuplication(root, out) {
  const runner = await resolveTool(root, 'jscpd');
  if (!runner) return emptyOutput('duplication', { tool: 'jscpd', limitations: ['jscpd is not installed; install it (npm i -g jscpd) for copy-paste duplication detection across 150+ languages.'] });
  const version = await toolVersion(runner);
  const reportDir = out ? join(out, 'jscpd') : join(root, 'node_modules', '.cache', 'sills-jscpd');
  await mkdir(reportDir, { recursive: true });
  const result = await run(runner.cmd, [...runner.args, root, '--silent', '--reporters', 'json', '--output', reportDir, '--ignore', '**/node_modules/**,**/dist/**,**/build/**'], { cwd: root, timeout: 300000 });
  const output = emptyOutput('duplication', { tool: 'jscpd', toolVersion: version, toolAvailable: true, target: root });
  let report;
  try { report = JSON.parse(await readFile(join(reportDir, 'jscpd-report.json'), 'utf8')); }
  catch { output.limitations.push(`jscpd did not produce a JSON report${result.error ? `: ${result.error}` : ''}.`); return output; }
  const pct = report?.statistics?.total?.percentage ?? 0;
  output.observations.push({ rule: 'duplication-ratio', location: root, metric: 'duplicated-lines-percent', value: pct, threshold: 5, severityHint: pct >= 10 ? 'moderate' : pct >= 5 ? 'minor' : 'observation', confidenceHint: 'high', note: `${pct}% of tokens are duplicated across the codebase.` });
  for (const dup of (report?.duplicates ?? []).slice(0, 50)) {
    output.observations.push({ rule: 'duplicate-block', location: `${dup.firstFile?.name}:${dup.firstFile?.start} ↔ ${dup.secondFile?.name}:${dup.secondFile?.start}`, metric: 'duplicated-lines', value: dup.lines, severityHint: 'minor', confidenceHint: 'high', note: 'Consider extracting a shared abstraction only if the duplication is semantic, not incidental.' });
  }
  output.evidence.push(await writeEvidence(out, 'duplication', 'jscpd', JSON.stringify(report?.statistics ?? {}, null, 2), { source: 'jscpd --reporters json', summary: 'jscpd duplication statistics.' }));
  return output;
}

async function collectDependencies(root, out) {
  const output = emptyOutput('dependencies', { tool: 'madge+depcheck', toolAvailable: false, target: root });
  const madge = await resolveTool(root, 'madge');
  const depcheck = await resolveTool(root, 'depcheck');
  if (!madge && !depcheck) { output.limitations.push('Neither madge nor depcheck is installed; install madge (circular dependencies) and depcheck (unused dependencies) for JS/TS dependency analysis.'); return output; }
  output.toolAvailable = true;

  if (madge) {
    const result = await run(madge.cmd, [...madge.args, '--circular', '--json', '--extensions', 'ts,tsx,js,jsx,mjs,cjs,vue', root], { cwd: root, timeout: 300000 });
    try {
      const cycles = JSON.parse(result.stdout || '[]');
      const list = Array.isArray(cycles) ? cycles : Object.values(cycles);
      if (!list.length) output.observations.push({ rule: 'circular-dependencies-clean', location: root, metric: 'circular-dependency-count', value: 0, severityHint: 'observation', note: 'madge found no circular dependencies in the scanned extensions.' });
      for (const cycle of list.slice(0, 40)) output.observations.push({ rule: 'circular-dependency', location: (Array.isArray(cycle) ? cycle : [cycle]).join(' → '), metric: 'circular-dependency', value: (Array.isArray(cycle) ? cycle.length : 1), severityHint: 'moderate', confidenceHint: 'high', note: 'Circular imports make modules hard to reason about, test, and tree-shake.' });
      output.evidence.push(await writeEvidence(out, 'dependencies', 'madge-circular', result.stdout || '[]', { source: 'madge --circular --json', summary: 'madge circular-dependency report.' }));
    } catch { output.limitations.push('madge did not return valid JSON for circular dependencies.'); }
  } else output.limitations.push('madge is not installed; circular-dependency detection was skipped.');

  if (depcheck) {
    const result = await run(depcheck.cmd, [...depcheck.args, root, '--json'], { cwd: root, timeout: 180000 });
    try {
      const report = JSON.parse(result.stdout || '{}');
      for (const dep of (report.dependencies ?? [])) output.observations.push({ rule: 'unused-dependency', location: dep, metric: 'unused-dependency', value: dep, severityHint: 'minor', confidenceHint: 'medium', note: 'depcheck reports no import; verify it is not used via config, CLI, or dynamic require before removal.' });
      for (const [dep, files] of Object.entries(report.missing ?? {})) output.observations.push({ rule: 'missing-dependency', location: dep, metric: 'missing-dependency', value: files, severityHint: 'moderate', confidenceHint: 'medium', note: 'Imported but not declared in package.json.' });
      output.evidence.push(await writeEvidence(out, 'dependencies', 'depcheck', result.stdout || '{}', { source: 'depcheck --json', summary: 'depcheck unused/missing dependency report.' }));
    } catch { output.limitations.push('depcheck did not return valid JSON.'); }
  } else output.limitations.push('depcheck is not installed; unused-dependency detection was skipped.');

  return output;
}

// ---------------------------------------------------------------------------
// Apple-review collectors
// ---------------------------------------------------------------------------

const USAGE_DESCRIPTION_KEYS = ['NSCameraUsageDescription', 'NSMicrophoneUsageDescription', 'NSPhotoLibraryUsageDescription', 'NSPhotoLibraryAddUsageDescription', 'NSLocationWhenInUseUsageDescription', 'NSLocationAlwaysAndWhenInUseUsageDescription', 'NSContactsUsageDescription', 'NSCalendarsUsageDescription', 'NSRemindersUsageDescription', 'NSMotionUsageDescription', 'NSFaceIDUsageDescription', 'NSBluetoothAlwaysUsageDescription', 'NSHealthShareUsageDescription', 'NSUserTrackingUsageDescription', 'NSLocalNetworkUsageDescription'];

async function collectAppleManifests(root, out) {
  const output = emptyOutput('apple-manifests', { tool: null, toolAvailable: true, target: root });
  const plists = await collectFiles(root, (name) => name === 'Info.plist' || name.endsWith('.entitlements') || name === 'PrivacyInfo.xcprivacy');
  if (!plists.length) { output.limitations.push('No Info.plist, entitlements, or PrivacyInfo.xcprivacy files were found. If this is a native iOS/macOS project, confirm the source is present.'); return output; }

  let sawPrivacyManifest = false;
  let sawTrackingKey = false;
  let sawTrackingUsageString = false;
  let sawEncryptionFlag = false;

  for (const file of plists) {
    const rel = relative(root, file) || file;
    let xml; try { xml = await readFile(file, 'utf8'); } catch { continue; }
    const keys = parsePlistKeys(xml);

    if (file.endsWith('PrivacyInfo.xcprivacy')) {
      sawPrivacyManifest = true;
      const tracking = keys.NSPrivacyTracking;
      output.observations.push({ rule: 'privacy-manifest-present', location: rel, metric: 'privacy-manifest', value: true, severityHint: 'observation', note: 'A privacy manifest is present. Confirm NSPrivacyAccessedAPITypes declares a reason for every required-reason API you call.' });
      if (/NSPrivacyAccessedAPICategory/.test(xml) === false) output.observations.push({ rule: 'required-reason-api-undeclared', location: rel, metric: 'required-reason-apis', value: 0, severityHint: 'major', confidenceHint: 'requires-manual-verification', note: 'Privacy manifest declares no required-reason API categories. Apple rejects apps that use required-reason APIs without a declared reason.' });
      if (tracking) sawTrackingKey = true;
      continue;
    }
    if (file.endsWith('.entitlements')) {
      output.observations.push({ rule: 'entitlements-declared', location: rel, metric: 'entitlements', value: Object.keys(keys), severityHint: 'observation', confidenceHint: 'high', note: 'Verify every entitlement is actually used and provisioned; unused or mismatched entitlements cause rejection.' });
      continue;
    }

    // Info.plist
    for (const key of USAGE_DESCRIPTION_KEYS) {
      if (key in keys) {
        const value = keys[key];
        if (key === 'NSUserTrackingUsageDescription') sawTrackingUsageString = true;
        if (!value || String(value).trim().length < 10) output.observations.push({ rule: 'weak-usage-description', location: `${rel} → ${key}`, metric: 'usage-description', value, severityHint: 'moderate', confidenceHint: 'high', note: 'Purpose strings must clearly explain why the app needs access. Empty or vague strings are a common rejection reason (Guideline 5.1.1).' });
      }
    }
    if ('ITSAppUsesNonExemptEncryption' in keys) { sawEncryptionFlag = true; output.observations.push({ rule: 'encryption-declaration', location: rel, metric: 'ITSAppUsesNonExemptEncryption', value: keys.ITSAppUsesNonExemptEncryption, severityHint: 'observation', note: 'Export-compliance flag is declared.' }); }
    if ('UIBackgroundModes' in keys) output.observations.push({ rule: 'background-modes', location: rel, metric: 'UIBackgroundModes', value: keys.UIBackgroundModes, severityHint: 'minor', confidenceHint: 'medium', note: 'Background modes must be justified by real background behaviour, or review will reject them (Guideline 2.5.4).' });
    if ('CFBundleURLTypes' in keys) output.observations.push({ rule: 'custom-url-schemes', location: rel, metric: 'CFBundleURLTypes', value: keys.CFBundleURLTypes, severityHint: 'observation', note: 'Declared custom URL schemes; confirm they do not enable unvetted deep-link actions.' });
    output.evidence.push(await writeEvidence(out, 'apple-manifests', rel.replace(/[\/]/g, '_'), xml, { kind: 'document', source: rel, summary: 'Apple manifest keys.' }));
  }

  if (!sawPrivacyManifest) output.observations.push({ rule: 'privacy-manifest-missing', location: root, metric: 'privacy-manifest', value: false, severityHint: 'major', confidenceHint: 'requires-manual-verification', note: 'No PrivacyInfo.xcprivacy found. Apple requires a privacy manifest for apps and many SDKs; confirm whether one is needed for this target.' });
  if (!sawEncryptionFlag) output.observations.push({ rule: 'encryption-declaration-missing', location: root, metric: 'ITSAppUsesNonExemptEncryption', value: false, severityHint: 'minor', confidenceHint: 'medium', note: 'ITSAppUsesNonExemptEncryption is not set; App Store Connect will prompt for export-compliance answers at submission.' });
  if (sawTrackingKey && !sawTrackingUsageString) output.observations.push({ rule: 'tracking-without-usage-string', location: root, metric: 'att', value: true, severityHint: 'major', confidenceHint: 'high', note: 'Privacy manifest declares tracking but no NSUserTrackingUsageDescription was found. ATT-tracked apps must present the tracking prompt (Guideline 5.1.2).' });
  return output;
}

async function collectAppleHybrid(root, out) {
  const output = emptyOutput('apple-hybrid', { tool: null, toolAvailable: true, target: root });
  const configs = await collectFiles(root, (name) => /^capacitor\.config\.(json|ts|js)$/.test(name) || name === 'app.json' || /^app\.config\.(js|ts)$/.test(name) || name === 'electron-builder.yml' || name === 'electron-builder.json');
  let matched = false;
  for (const file of configs) {
    const rel = relative(root, file) || file;
    let text; try { text = await readFile(file, 'utf8'); } catch { continue; }
    matched = true;
    if (file.endsWith('.json') || file === 'app.json' || file.endsWith('electron-builder.json')) {
      try {
        const config = JSON.parse(text);
        if (config.expo || file === 'app.json') {
          const expo = config.expo ?? config;
          const iosPerms = expo?.ios?.infoPlist ?? {};
          output.observations.push({ rule: 'expo-ios-config', location: rel, metric: 'expo-ios', value: { bundleIdentifier: expo?.ios?.bundleIdentifier, plistKeys: Object.keys(iosPerms) }, severityHint: 'observation', confidenceHint: 'high', note: 'Expo iOS config. Confirm every declared plist usage string is justified and non-empty.' });
        }
        if (config.appId || config.plugins) output.observations.push({ rule: 'capacitor-config', location: rel, metric: 'capacitor', value: { appId: config.appId, plugins: Object.keys(config.plugins ?? {}) }, severityHint: 'observation', confidenceHint: 'high', note: 'Capacitor configuration. Each native plugin maps to permissions Apple review will check.' });
      } catch { output.limitations.push(`${rel} could not be parsed as JSON.`); }
    } else {
      output.observations.push({ rule: 'hybrid-config-typescript', location: rel, metric: 'hybrid-config', value: 'ts/js', severityHint: 'observation', confidenceHint: 'medium', note: 'Config is a TS/JS module and was not statically evaluated. Review declared plugins and iOS permissions manually.' });
    }
    output.evidence.push(await writeEvidence(out, 'apple-hybrid', rel.replace(/[\/]/g, '_'), text, { kind: 'document', source: rel, summary: 'Hybrid app configuration.' }));
  }
  if (!matched) output.limitations.push('No Capacitor, Expo, or electron-builder configuration was found. If this is a hybrid app, confirm the config location.');
  return output;
}

const PRIVATE_API_PATTERNS = [
  { pattern: /UIGetScreenImage|_UIBackdropView|setStatusBarHidden:animation:|valueForKeyPath:@"[^"]*private/, note: 'Possible private UIKit usage.' },
  { pattern: /LSApplicationWorkspace|SBSLaunch|MobileInstallation|com\.apple\.springboard/, note: 'Possible private SpringBoard/installation API.' },
  { pattern: /performSelector:\s*@selector\(_[A-Za-z]/, note: 'Reflection call into an underscored (likely private) selector.' },
  { pattern: /canOpenURL:.*(whatsapp|tel|sms).*private|__NSCF/, note: 'Suspicious private symbol reference.' },
];

async function collectApplePrivateApi(root, out) {
  const output = emptyOutput('apple-private-api', { tool: null, toolAvailable: true, target: root });
  const sources = await collectFiles(root, (name) => /\.(m|mm|swift|h)$/.test(name), { maxDepth: 10 });
  if (!sources.length) { output.limitations.push('No native Objective-C or Swift source files were found to scan for private-API usage.'); return output; }
  let scanned = 0;
  for (const file of sources.slice(0, 4000)) {
    let text; try { text = await readFile(file, 'utf8'); } catch { continue; }
    scanned += 1;
    const rel = relative(root, file) || file;
    for (const { pattern, note } of PRIVATE_API_PATTERNS) {
      if (pattern.test(text)) output.observations.push({ rule: 'possible-private-api', location: rel, metric: 'private-api-heuristic', value: pattern.source.slice(0, 40), severityHint: 'major', confidenceHint: 'requires-manual-verification', note: `${note} Heuristic match — Apple rejects private-API usage (Guideline 2.5.1). Confirm manually before treating as real.` });
    }
  }
  if (!output.observations.length) output.observations.push({ rule: 'private-api-clean', location: root, metric: 'private-api-heuristic', value: 0, severityHint: 'observation', note: `Scanned ${scanned} native source files; no heuristic private-API patterns matched. This is not proof of compliance.` });
  return output;
}

async function collectApplePrecheck(root) {
  const output = emptyOutput('apple-precheck', { tool: 'fastlane', toolAvailable: false, target: root });
  const hasFastfile = await exists(join(root, 'fastlane', 'Fastfile')) || await exists(join(root, 'Fastfile'));
  const runner = await resolveTool(root, 'fastlane');
  if (!hasFastfile) { output.limitations.push('No fastlane configuration (Fastfile) was found. `fastlane precheck` can check App Store metadata against common rejection reasons before submission; consider adding it.'); return output; }
  output.observations.push({ rule: 'fastlane-configured', location: 'fastlane/Fastfile', metric: 'fastlane', value: true, severityHint: 'observation', confidenceHint: 'high', note: 'fastlane is configured. Run `fastlane precheck` with App Store Connect credentials in your own environment to check metadata rejection vectors. This passive audit does not contact App Store Connect.' });
  if (runner) { output.toolAvailable = true; output.toolVersion = await toolVersion(runner); }
  else output.limitations.push('The fastlane CLI is not installed on PATH; the audit reports configuration only and does not execute precheck.');
  return output;
}

// ---------------------------------------------------------------------------
// Registry + entry point
// ---------------------------------------------------------------------------

export const COLLECTORS = {
  metrics: collectMetrics,
  complexity: collectComplexity,
  duplication: collectDuplication,
  dependencies: collectDependencies,
  'apple-manifests': collectAppleManifests,
  'apple-hybrid': collectAppleHybrid,
  'apple-private-api': collectApplePrivateApi,
  'apple-precheck': collectApplePrecheck,
};

export const COLLECTOR_GROUPS = {
  'code-quality': ['metrics', 'complexity', 'duplication', 'dependencies'],
  apple: ['apple-manifests', 'apple-hybrid', 'apple-private-api', 'apple-precheck'],
};

export async function runCollector(kind, { root = process.cwd(), out } = {}) {
  const resolvedRoot = resolve(root);
  const fn = COLLECTORS[kind];
  if (!fn) throw new Error(`Unknown collector "${kind}". Available: ${Object.keys(COLLECTORS).join(', ')}`);
  return fn(resolvedRoot, out);
}

export async function runCollectorGroup(group, options = {}) {
  const kinds = COLLECTOR_GROUPS[group];
  if (!kinds) throw new Error(`Unknown collector group "${group}". Available: ${Object.keys(COLLECTOR_GROUPS).join(', ')}`);
  const results = [];
  for (const kind of kinds) results.push(await runCollector(kind, options));
  return results;
}

export { detectEcosystems };

// CLI guard: `node collectors.mjs --kind <collector|group> [--path .] [--out dir]`
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const args = process.argv.slice(2);
  const get = (name, fallback) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; };
  const kind = get('--kind');
  const root = resolve(get('--path', process.cwd()));
  const out = get('--out');
  try {
    if (!kind) throw new Error(`Provide --kind. Collectors: ${Object.keys(COLLECTORS).join(', ')}. Groups: ${Object.keys(COLLECTOR_GROUPS).join(', ')}.`);
    const result = COLLECTOR_GROUPS[kind] ? await runCollectorGroup(kind, { root, out }) : await runCollector(kind, { root, out });
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
