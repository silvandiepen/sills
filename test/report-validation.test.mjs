import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateReportFile } from '../packages/audit-cli/src/validate-report.mjs';

function baseReport() { return {
  schemaVersion: '1.1.0', audit: { id: 'x', date: '2026-07-15', mode: 'full', depth: 'standard', skills: ['sills-audit'] },
  conclusion: { level: 'needs-attention', label: 'Needs attention', summary: 'Material issues need work.', rationale: ['One supported issue was found.'], dimensions: [{ id: 'quality', label: 'Quality', level: 'needs-attention', summary: 'A material issue exists.', findingIds: ['A11Y-0001'] }], shipDecision: 'ready-with-conditions' },
  scope: {}, coverage: {}, tasks: [{ id: 'TASK-001', title: 'Resolve missing label', priority: 'now', status: 'open', blocking: false, action: 'Add an accessible name.', sourceFindingIds: ['A11Y-0001'], acceptanceCriteria: ['The control has a programmatic name.'], verification: ['Retest with keyboard and accessibility tree.'] }],
  findings: [], positiveFindings: [], releaseBlockers: [], limitations: [], evidenceIndex: []
}; }

test('report validator accepts the shared conclusion and task contract', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-report-')); const file = join(temp, 'report.json');
  try { await writeFile(file, JSON.stringify(baseReport())); assert.deepEqual(await validateReportFile(file), { valid: true, errors: [] }); } finally { await rm(temp, { recursive: true, force: true }); }
});

test('report validator rejects missing conclusion and tasks', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-report-')); const file = join(temp, 'report.json');
  try { const report = baseReport(); delete report.conclusion; delete report.tasks; await writeFile(file, JSON.stringify(report)); const result = await validateReportFile(file); assert.equal(result.valid, false); assert.ok(result.errors.includes('conclusion is required')); assert.ok(result.errors.includes('tasks must be an array')); } finally { await rm(temp, { recursive: true, force: true }); }
});

test('report validator rejects unsupported evidence-free confirmed issues', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-report-')); const file = join(temp, 'report.json');
  try { const report = baseReport(); report.findings = [{ id:'A11Y-0001', kind:'issue', category:'accessibility', title:'Missing label', confidence:'confirmed', status:'open', origin:['runtime'], scope:{}, userImpact:'Blocked', recommendation:'Add a label', verification:['Retest'] }]; await writeFile(file, JSON.stringify(report)); const result = await validateReportFile(file); assert.equal(result.valid, false); assert.ok(result.errors.some((error) => error.includes('no evidence'))); } finally { await rm(temp, { recursive: true, force: true }); }
});
