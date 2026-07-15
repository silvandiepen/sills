import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { installSkillPackage } from '../packages/skill-installer/src/index.mjs';

const root = resolve(new URL('..', import.meta.url).pathname);

test('installer copies a skill for Codex and Claude', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-install-'));
  try {
    const packageRoot = join(root, 'skills', 'sills-audit-content');
    const result = await installSkillPackage({ packageRoot, skillName: 'sills-audit-content', argv: ['install'], cwd: temp });
    assert.equal(result.actions.length, 2);
    const codex = await readFile(join(temp, '.agents', 'skills', 'sills-audit-content', 'SKILL.md'), 'utf8');
    const claude = await readFile(join(temp, '.claude', 'skills', 'sills-audit-content', 'SKILL.md'), 'utf8');
    assert.match(codex, /name: sills-audit-content/);
    assert.equal(codex, claude);
  } finally { await rm(temp, { recursive: true, force: true }); }
});
