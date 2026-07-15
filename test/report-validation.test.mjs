import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateReportFile } from '../packages/audit-cli/src/validate-report.mjs';

test('report validator rejects unsupported evidence-free confirmed issues', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-report-'));
  const file = join(temp, 'report.json');
  try {
    await writeFile(file, JSON.stringify({
      schemaVersion: '1.0.0', audit: { id: 'x', mode: 'full', depth: 'standard' },
      findings: [{ id:'A11Y-0001', kind:'issue', category:'accessibility', title:'Missing label', confidence:'confirmed', status:'open', origin:['runtime'], scope:{}, userImpact:'Blocked', recommendation:'Add a label', verification:['Retest'] }]
    }));
    const result = await validateReportFile(file);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((error) => error.includes('no evidence')));
  } finally { await rm(temp, { recursive: true, force: true }); }
});
