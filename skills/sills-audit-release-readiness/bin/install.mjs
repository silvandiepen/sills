#!/usr/bin/env node
import { installSkillPackage, packageRootFromMeta, printInstallResult } from 'sills-audit-installer';

try {
  const result = await installSkillPackage({ packageRoot: packageRootFromMeta(import.meta.url), skillName: 'sills-audit-release-readiness' });
  printInstallResult(result);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
