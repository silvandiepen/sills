import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);

test('umbrella package depends on and installs every specialist skill', async () => {
  const names = (await readdir(join(root, 'skills'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name !== 'sills-audit')
    .map((entry) => entry.name)
    .sort();
  const pkg = JSON.parse(await readFile(join(root, 'skills', 'sills-audit', 'package.json'), 'utf8'));
  const bin = await readFile(join(root, 'skills', 'sills-audit', 'bin', 'sills-audit.mjs'), 'utf8');
  for (const name of names) {
    assert.equal(pkg.dependencies[name], '0.1.0', `${name} dependency missing`);
    assert.match(bin, new RegExp(name), `${name} installer entry missing`);
  }
});
