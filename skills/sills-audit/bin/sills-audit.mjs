#!/usr/bin/env node
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { installSkillSuite, printInstallResult } from 'sills-audit-installer';

const require = createRequire(import.meta.url);
const selfRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const names = [
  'sills-audit-accessibility',
  'sills-audit-experience',
  'sills-audit-content',
  'sills-audit-architecture',
  'sills-audit-security'
];
const packages = [{ skillName: 'sills-audit', packageRoot: selfRoot }];
for (const name of names) {
  packages.push({ skillName: name, packageRoot: dirname(require.resolve(`${name}/package.json`)) });
}

try {
  const result = await installSkillSuite({ packages });
  printInstallResult(result);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
