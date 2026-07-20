import { access, mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

async function exists(path) { try { await access(path); return true; } catch { return false; } }
function today() { return new Date().toISOString().slice(0, 10); }

export async function createRun({ root = process.cwd(), output = 'audit', date = today(), skill = 'sills-audit-apple-review' } = {}) {
  const auditRoot = resolve(root, output);
  let suffix = ''; let index = 1; let directory = join(auditRoot, date);
  while (await exists(directory)) { index += 1; suffix = `-${String(index).padStart(2, '0')}`; directory = join(auditRoot, `${date}${suffix}`); }
  for (const path of [directory, join(directory, 'reports'), join(directory, 'findings'), join(directory, 'evidence', 'screenshots'), join(directory, 'evidence', 'traces'), join(directory, 'evidence', 'logs'), join(directory, 'evidence', 'snapshots'), join(directory, 'raw')]) await mkdir(path, { recursive: true });
  const id = `${date}${suffix}`;
  const report = {
    schemaVersion: '1.1.0',
    audit: { id, date, mode: 'full', depth: 'standard', skills: [skill], toolVersions: {} },
    conclusion: { level: 'insufficient-evidence', label: 'Audit not completed', summary: 'The audit run has been created but evidence has not yet been collected.', rationale: ['No audit findings or coverage evidence have been recorded yet.'], dimensions: [{ id: 'coverage', label: 'Coverage', level: 'insufficient-evidence', summary: 'Audit work has not started.' }], shipDecision: skill === 'sills-audit' || skill === 'sills-audit-release-readiness' ? 'insufficient-evidence' : undefined },
    scope: {}, coverage: { tested: [], untested: [] }, tasks: [], findings: [], positiveFindings: [], releaseBlockers: [], limitations: [], evidenceIndex: []
  };
  if (report.conclusion.shipDecision === undefined) delete report.conclusion.shipDecision;
  await writeFile(join(directory, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(join(directory, 'manifest.json'), JSON.stringify({ auditId: id, createdAt: new Date().toISOString(), files: [] }, null, 2) + '\n');
  await writeFile(join(directory, 'coverage.json'), JSON.stringify({ tested: [], untested: [], roles: [], routes: [], workflows: [], states: [], packages: [], runtimeTargets: [] }, null, 2) + '\n');
  await writeFile(join(directory, 'index.md'), `# Audit ${id}\n\n- [Summary](summary.md)\n- [Full report](report.md)\n- [Tasks](report.md#tasks)\n- [Remediation handoff](handoff.md)\n- [Machine-readable report](report.json)\n`);
  await writeFile(join(directory, 'summary.md'), `# Audit summary\n\n## Status conclusion\n\n**Audit not completed** — insufficient evidence.\n\n## Tasks\n\nNo tasks have been recorded yet.\n\n## Coverage and limitations\n\nAudit scaffolding created by ${skill}. Evidence has not yet been collected.\n`);
  await writeFile(join(directory, 'report.md'), `# Audit report\n\n## Status conclusion\n\nAudit not completed.\n\n## Executive summary\n\nTo be completed.\n\n## Status by dimension\n\nTo be completed.\n\n## Scope and coverage\n\nTo be completed.\n\n## Tasks\n\nNo tasks recorded.\n\n## Release blockers\n\nNone identified.\n\n## Findings\n\nNone recorded.\n\n## Positive findings\n\nNone recorded.\n\n## Cross-cutting patterns\n\nNone recorded.\n\n## Manual-review queue\n\nNone recorded.\n\n## Limitations and untested areas\n\nAudit work has not started.\n\n## Evidence index\n\nNo evidence recorded.\n`);
  await writeFile(join(directory, 'handoff.md'), `# Remediation handoff\n\nRead report.json as the source of truth and the Tasks section as the implementation queue. No findings or tasks have been recorded yet.\n`);
  return { id, directory };
}
