#!/usr/bin/env node
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const selfRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = dirname(dirname(selfRoot));
const installer = await importInstaller();
const names = [
  "sills-audit-accessibility",
  "sills-audit-experience",
  "sills-audit-content",
  "sills-audit-architecture",
  "sills-audit-security",
  "sills-audit-performance",
  "sills-audit-design-system",
  "sills-audit-release-readiness",
  "sills-audit-localization",
  "sills-audit-testing-strategy",
  "sills-audit-privacy-and-trust",
  "sills-audit-seo",
  "sills-audit-api-design",
  "sills-audit-agent-readiness",
  "sills-audit-code-quality",
  "sills-audit-apple-review"
];
const packages = [
  { skillName: 'sills', packageRoot: selfRoot },
  { skillName: 'sills-audit', packageRoot: selfRoot }
];
for (const name of names) packages.push({ skillName: name, packageRoot: packageRootFor(name) });

try {
  const result = await installer.installSkillSuite({ packages });
  installer.printInstallResult(result);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

async function importInstaller() {
  try {
    return await import('sills-audit-installer');
  } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
    return import(join(repoRoot, 'packages', 'skill-installer', 'src', 'index.mjs'));
  }
}

function packageRootFor(name) {
  try {
    return dirname(require.resolve(`${name}/package.json`));
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    return join(repoRoot, 'skills', name);
  }
}
