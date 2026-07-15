import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const headings = ['## Status conclusion','## Executive summary','## Status by dimension','## Scope and coverage','## Tasks','## Release blockers','## Findings','## Positive findings','## Cross-cutting patterns','## Manual-review queue','## Limitations and untested areas','## Evidence index'];

test('every audit skill carries the same report contract and layout', async () => {
  const skills = (await readdir(join(root, 'skills'), { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  for (const name of skills) {
    const base = join(root, 'skills', name); const skill = await readFile(join(base, 'SKILL.md'), 'utf8'); const contract = await readFile(join(base, 'references', 'report-contract.md'), 'utf8');
    const templatePath = join(base, 'templates', name === 'sills-audit' ? 'report.md' : 'specialist-report.md'); const template = await readFile(templatePath, 'utf8');
    assert.match(skill, /Shared report and runtime-intake contract/, `${name} does not require the shared contract`); assert.match(contract, /Live and deployed web surfaces/, `${name} lacks URL intake guidance`);
    let previous = -1; for (const heading of headings) { const index = template.indexOf(heading); assert.ok(index > previous, `${name} report section missing or out of order: ${heading}`); previous = index; }
  }
});
