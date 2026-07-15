import { access, mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export async function createRun({ root = process.cwd(), output = 'audit', date = today(), skill = 'sills-audit' } = {}) {
  const auditRoot = resolve(root, output);
  let suffix = '';
  let index = 1;
  let directory = join(auditRoot, date);
  while (await exists(directory)) {
    index += 1;
    suffix = `-${String(index).padStart(2, '0')}`;
    directory = join(auditRoot, `${date}${suffix}`);
  }

  for (const path of [
    directory,
    join(directory, 'reports'),
    join(directory, 'findings'),
    join(directory, 'evidence', 'screenshots'),
    join(directory, 'evidence', 'traces'),
    join(directory, 'evidence', 'logs'),
    join(directory, 'evidence', 'snapshots'),
    join(directory, 'raw')
  ]) await mkdir(path, { recursive: true });

  const id = `${date}${suffix}`;
  const report = {
    schemaVersion: '1.0.0',
    audit: { id, date, mode: 'full', depth: 'standard', skills: [skill], toolVersions: {} },
    scope: {}, coverage: { tested: [], untested: [] }, findings: [], positiveFindings: [],
    releaseBlockers: [], limitations: [], evidenceIndex: []
  };
  await writeFile(join(directory, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(join(directory, 'manifest.json'), JSON.stringify({ auditId: id, createdAt: new Date().toISOString(), files: [] }, null, 2) + '\n');
  await writeFile(join(directory, 'coverage.json'), JSON.stringify({ tested: [], untested: [], roles: [], routes: [], workflows: [], states: [], packages: [] }, null, 2) + '\n');
  await writeFile(join(directory, 'index.md'), `# Audit ${id}\n\n- [Summary](summary.md)\n- [Full report](report.md)\n- [Remediation handoff](handoff.md)\n- [Machine-readable report](report.json)\n`);
  await writeFile(join(directory, 'summary.md'), `# Audit summary\n\nAudit scaffolding created by ${skill}. Findings have not yet been recorded.\n`);
  await writeFile(join(directory, 'report.md'), `# Audit report\n\n## Scope\n\nTo be completed.\n\n## Findings\n\nTo be completed.\n`);
  await writeFile(join(directory, 'handoff.md'), `# Remediation handoff\n\nRead report.json as the source of truth. No findings have been recorded yet.\n`);
  return { id, directory };
}
