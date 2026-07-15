import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
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
  } finally { await rm(temp, { recursive: true, force: true }); }
});
