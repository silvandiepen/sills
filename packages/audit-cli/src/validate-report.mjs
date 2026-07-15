import { readFile } from 'node:fs/promises';

const modes = new Set(['source', 'runtime', 'full', 'changed', 'ci', 'verify']);
const depths = new Set(['quick', 'standard', 'deep']);
const conclusionLevels = new Set(["strong","acceptable","needs-attention","high-risk","critical","insufficient-evidence"]);
const shipDecisions = new Set(['ready-to-ship', 'ready-with-conditions', 'not-ready', 'insufficient-evidence']);
const taskPriorities = new Set(['now', 'next', 'later']);
const taskStatuses = new Set(['open', 'in-progress', 'blocked', 'done', 'wont-do']);

export async function validateReportFile(file) {
  const report = JSON.parse(await readFile(file, 'utf8'));
  const errors = [];
  if (report.schemaVersion !== '1.1.0') errors.push('schemaVersion must be 1.1.0');
  if (!report.audit?.id) errors.push('audit.id is required');
  if (!modes.has(report.audit?.mode)) errors.push('audit.mode is invalid');
  if (!depths.has(report.audit?.depth)) errors.push('audit.depth is invalid');
  if (!report.conclusion || typeof report.conclusion !== 'object') errors.push('conclusion is required');
  if (!conclusionLevels.has(report.conclusion?.level)) errors.push('conclusion.level is invalid');
  for (const key of ['label', 'summary']) if (!report.conclusion?.[key]) errors.push(`conclusion.${key} is required`);
  if (!Array.isArray(report.conclusion?.rationale) || report.conclusion.rationale.length === 0) errors.push('conclusion.rationale must be a non-empty array');
  if (!Array.isArray(report.conclusion?.dimensions) || report.conclusion.dimensions.length === 0) errors.push('conclusion.dimensions must be a non-empty array');
  for (const [index, dimension] of (report.conclusion?.dimensions ?? []).entries()) {
    for (const key of ['id', 'label', 'level', 'summary']) if (!dimension?.[key]) errors.push(`conclusion.dimensions[${index}].${key} is required`);
    if (dimension?.level && !conclusionLevels.has(dimension.level)) errors.push(`conclusion.dimensions[${index}].level is invalid`);
  }
  if (report.conclusion?.shipDecision && !shipDecisions.has(report.conclusion.shipDecision)) errors.push('conclusion.shipDecision is invalid');
  if (!Array.isArray(report.tasks)) errors.push('tasks must be an array');
  for (const [index, task] of (report.tasks ?? []).entries()) {
    for (const key of ['id', 'title', 'priority', 'status', 'blocking', 'action', 'sourceFindingIds', 'acceptanceCriteria', 'verification']) if (task?.[key] === undefined) errors.push(`tasks[${index}].${key} is required`);
    if (task?.priority && !taskPriorities.has(task.priority)) errors.push(`tasks[${index}].priority is invalid`);
    if (task?.status && !taskStatuses.has(task.status)) errors.push(`tasks[${index}].status is invalid`);
    if (!Array.isArray(task?.sourceFindingIds)) errors.push(`tasks[${index}].sourceFindingIds must be an array`);
    if (!Array.isArray(task?.acceptanceCriteria) || task.acceptanceCriteria.length === 0) errors.push(`tasks[${index}].acceptanceCriteria must be a non-empty array`);
    if (!Array.isArray(task?.verification) || task.verification.length === 0) errors.push(`tasks[${index}].verification must be a non-empty array`);
  }
  if (!Array.isArray(report.findings)) errors.push('findings must be an array');
  for (const [index, finding] of (report.findings ?? []).entries()) {
    for (const key of ['id', 'kind', 'category', 'title', 'confidence', 'status', 'scope', 'userImpact', 'recommendation', 'verification']) if (finding[key] === undefined) errors.push(`findings[${index}].${key} is required`);
    if ((!finding.evidence || finding.evidence.length === 0) && finding.kind === 'issue' && finding.confidence !== 'requires-manual-verification') errors.push(`findings[${index}] has no evidence and is not marked for manual verification`);
  }
  return { valid: errors.length === 0, errors };
}
