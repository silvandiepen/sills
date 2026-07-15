import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(new URL('..', import.meta.url).pathname);

test('umbrella package depends on and installs every specialist skill', async () => {
  const names = (await readdir(join(root, 'skills'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name !== 'sills-audit')
    .map((entry) => entry.name)
    .sort();
  const pkg = JSON.parse(await readFile(join(root, 'skills', 'sills-audit', 'package.json'), 'utf8'));
  const bin = await readFile(join(root, 'skills', 'sills-audit', 'bin', 'sills-audit.mjs'), 'utf8');
  for (const name of names) {
    const specialist = JSON.parse(await readFile(join(root, 'skills', name, 'package.json'), 'utf8'));
    assert.equal(pkg.dependencies[name], specialist.version, `${name} dependency version mismatch`);
    assert.match(bin, new RegExp(name), `${name} installer entry missing`);
  }
});

test('umbrella CLI can run directly from a source checkout', () => {
  const result = spawnSync(process.execPath, [
    join(root, 'skills', 'sills-audit', 'bin', 'sills-audit.mjs'),
    '--dry-run',
    '--target',
    join(root, '.tmp-test-install')
  ], {
    cwd: root,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Would install sills-audit for custom:/);
  assert.match(result.stdout, /Would install sills-audit-api-design for custom:/);
  assert.match(result.stdout, /Would install sills-audit-agent-readiness for custom:/);
});
