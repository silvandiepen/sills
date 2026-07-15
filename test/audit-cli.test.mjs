import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRun } from '../packages/audit-cli/src/create-run.mjs';
import { discoverProject } from '../packages/audit-cli/src/discover.mjs';
import { validateReportFile } from '../packages/audit-cli/src/validate-report.mjs';

test('createRun creates dated, non-overwriting audit directories', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-run-'));
  try {
    const first = await createRun({ root: temp, date: '2026-07-15' });
    const second = await createRun({ root: temp, date: '2026-07-15' });
    assert.match(first.directory, /2026-07-15$/);
    assert.match(second.directory, /2026-07-15-02$/);
    assert.deepEqual(await validateReportFile(join(first.directory, 'report.json')), { valid: true, errors: [] });
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('discoverProject identifies frameworks and documentation', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-discover-'));
  try {
    await writeFile(join(temp, 'package.json'), JSON.stringify({ dependencies: { vue: '3.0.0' } }));
    await writeFile(join(temp, 'README.md'), '# App');
    await writeFile(join(temp, 'package-lock.json'), '{}');
    const result = await discoverProject(temp);
    assert.deepEqual(result.frameworks, ['vue']);
    assert.deepEqual(result.packageManagers, ['npm']);
    assert.ok(result.documentation.includes('README.md'));
    assert.ok(result.platformFacts.some((item) => item.technology === 'vue' && item.kind === 'framework'));
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('built-in adapters produce reusable platform facts', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-platforms-'));
  try {
    await mkdir(join(temp, 'supabase'), { recursive: true });
    await mkdir(join(temp, 'ios', 'App', 'App.xcodeproj'), { recursive: true });
    await writeFile(join(temp, 'package.json'), JSON.stringify({
      name: 'fixture-app',
      scripts: { build: 'vite build', test: 'vitest run' },
      dependencies: {
        vue: '^3.0.0',
        '@capacitor/core': '^7.0.0',
        '@supabase/supabase-js': '^2.0.0',
        '@cloudflare/workers-types': '^4.0.0'
      }
    }));
    await writeFile(join(temp, 'vite.config.ts'), 'export default {}');
    await writeFile(join(temp, 'capacitor.config.ts'), 'export default {}');
    await writeFile(join(temp, 'wrangler.toml'), 'name = "fixture"');
    await writeFile(join(temp, 'supabase', 'config.toml'), 'project_id = "fixture"');

    const result = await discoverProject(temp);
    const technologies = new Set(result.platformFacts.map((item) => item.technology));
    assert.ok(technologies.has('javascript'));
    assert.ok(technologies.has('vue'));
    assert.ok(technologies.has('capacitor'));
    assert.ok(technologies.has('ios'));
    assert.ok(technologies.has('cloudflare'));
    assert.ok(technologies.has('supabase'));
    assert.ok(result.platformFacts.every((item) => item.evidence && item.confidence));
  } finally { await rm(temp, { recursive: true, force: true }); }
});
