import { createHash } from 'node:crypto';

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\\/g, '/').replace(/\s+/g, ' ');
}

export function createFindingFingerprint({ audit, rule, location = '', subject = '' }) {
  const identity = [audit, rule, location, subject].map(normalize).join('\n');
  return createHash('sha256').update(identity).digest('hex').slice(0, 16);
}

export function createFindingId(input) {
  const prefix = normalize(input.audit).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').toUpperCase() || 'GEN';
  return `${prefix}-${createFindingFingerprint(input).toUpperCase()}`;
}
