import { readFile } from 'node:fs/promises';

const modes = new Set(['source', 'runtime', 'full', 'changed', 'ci', 'verify']);
const depths = new Set(['quick', 'standard', 'deep']);

export async function validateReportFile(file) {
  const report = JSON.parse(await readFile(file, 'utf8'));
  const errors = [];
  if (report.schemaVersion !== '1.0.0') errors.push('schemaVersion must be 1.0.0');
  if (!report.audit?.id) errors.push('audit.id is required');
  if (!modes.has(report.audit?.mode)) errors.push('audit.mode is invalid');
  if (!depths.has(report.audit?.depth)) errors.push('audit.depth is invalid');
  if (!Array.isArray(report.findings)) errors.push('findings must be an array');
  for (const [index, finding] of (report.findings ?? []).entries()) {
    for (const key of ['id', 'kind', 'category', 'title', 'confidence', 'status', 'scope', 'userImpact', 'recommendation', 'verification']) {
      if (finding[key] === undefined) errors.push(`findings[${index}].${key} is required`);
    }
    if ((!finding.evidence || finding.evidence.length === 0) && finding.kind === 'issue' && finding.confidence !== 'requires-manual-verification') {
      errors.push(`findings[${index}] has no evidence and is not marked for manual verification`);
    }
  }
  return { valid: errors.length === 0, errors };
}
