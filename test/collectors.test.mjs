import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { COLLECTORS, COLLECTOR_GROUPS, runCollector, runCollectorGroup } from '../packages/audit-cli/src/collectors.mjs';

const REQUIRED_KEYS = ['collector', 'toolAvailable', 'ranAt', 'observations', 'evidence', 'limitations'];
const SEVERITY = new Set(['critical', 'major', 'moderate', 'minor', 'observation']);

function assertShape(output, collector) {
  for (const key of REQUIRED_KEYS) assert.ok(key in output, `${collector}: missing ${key}`);
  assert.equal(output.collector, collector);
  assert.equal(typeof output.toolAvailable, 'boolean');
  assert.match(output.ranAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.ok(Array.isArray(output.observations));
  assert.ok(Array.isArray(output.evidence));
  assert.ok(Array.isArray(output.limitations));
  for (const observation of output.observations) {
    assert.ok(observation.rule && observation.metric, `${collector}: observation needs rule and metric`);
    if (observation.severityHint) assert.ok(SEVERITY.has(observation.severityHint), `${collector}: bad severityHint ${observation.severityHint}`);
  }
  for (const record of output.evidence) {
    assert.match(record.id, /^EVD-[A-Z0-9-]+$/, `${collector}: bad evidence id`);
    assert.ok(record.kind && record.source && record.capturedAt, `${collector}: evidence record incomplete`);
  }
}

test('every collector returns the standard shape and degrades gracefully on an empty project', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'sills-collect-'));
  try {
    for (const kind of Object.keys(COLLECTORS)) {
      const output = await runCollector(kind, { root: dir });
      assertShape(output, kind);
      if (!output.toolAvailable || !output.observations.length) {
        assert.ok(output.limitations.length > 0, `${kind}: an unavailable tool or empty project must record a limitation`);
      }
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('a missing external tool is a limitation, never a thrown error', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'sills-collect-'));
  try {
    for (const kind of COLLECTOR_GROUPS['code-quality']) {
      const output = await runCollector(kind, { root: dir });
      assertShape(output, kind);
      if (!output.toolAvailable) assert.match(output.limitations.join(' '), /install/i, `${kind}: should tell the user how to enable the tool`);
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('apple-manifests parses purpose strings, privacy manifest, and encryption flags', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'sills-collect-'));
  try {
    await mkdir(join(dir, 'App'), { recursive: true });
    await writeFile(join(dir, 'App', 'Info.plist'), `<?xml version="1.0"?>
<plist version="1.0"><dict>
  <key>NSCameraUsageDescription</key><string>Scan documents with the camera.</string>
  <key>NSUserTrackingUsageDescription</key><string></string>
  <key>ITSAppUsesNonExemptEncryption</key><false/>
</dict></plist>`);
    await writeFile(join(dir, 'App', 'PrivacyInfo.xcprivacy'), `<?xml version="1.0"?>
<plist version="1.0"><dict><key>NSPrivacyTracking</key><true/></dict></plist>`);
    const output = await runCollector('apple-manifests', { root: dir });
    assertShape(output, 'apple-manifests');
    const rules = output.observations.map((o) => o.rule);
    assert.ok(rules.includes('weak-usage-description'), 'empty tracking purpose string should be flagged');
    assert.ok(rules.includes('privacy-manifest-present'), 'privacy manifest should be detected');
    assert.ok(rules.includes('required-reason-api-undeclared'), 'missing required-reason declaration should be flagged');
    assert.ok(output.evidence.length > 0, 'manifest content should be captured as evidence');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('apple-hybrid parses a Capacitor config', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'sills-collect-'));
  try {
    await writeFile(join(dir, 'capacitor.config.json'), JSON.stringify({ appId: 'com.example.app', plugins: { Camera: {} } }));
    const output = await runCollector('apple-hybrid', { root: dir });
    assertShape(output, 'apple-hybrid');
    const capacitor = output.observations.find((o) => o.rule === 'capacitor-config');
    assert.ok(capacitor, 'capacitor config should be observed');
    assert.deepEqual(capacitor.value.plugins, ['Camera']);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('collector groups run every member collector', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'sills-collect-'));
  try {
    const results = await runCollectorGroup('apple', { root: dir });
    assert.equal(results.length, COLLECTOR_GROUPS.apple.length);
    for (const output of results) assertShape(output, output.collector);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('an unknown collector name is rejected', async () => {
  await assert.rejects(() => runCollector('does-not-exist', { root: process.cwd() }), /Unknown collector/);
});
