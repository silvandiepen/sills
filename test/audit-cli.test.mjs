import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRun } from '../packages/audit-cli/src/create-run.mjs';
import { discoverProject } from '../packages/audit-cli/src/discover.mjs';
import { validateReportFile } from '../packages/audit-cli/src/validate-report.mjs';
import { installSkillPackage, installSkillSuite } from '../packages/skill-installer/src/index.mjs';

async function touch(path, content = '') {
  await mkdir(join(path, '..'), { recursive: true }).catch(() => {});
  await writeFile(path, content);
}

test('createRun creates dated, non-overwriting audit directories', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-run-'));
  try {
    const first = await createRun({ root: temp, date: '2026-07-15' });
    const second = await createRun({ root: temp, date: '2026-07-15' });
    assert.match(first.directory, /2026-07-15$/);
    assert.match(second.directory, /2026-07-15-02$/);
    assert.deepEqual(await validateReportFile(join(first.directory, 'report.json')), { valid: true, errors: [] });
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('discoverProject identifies frameworks and documentation', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-discover-'));
  try {
    await writeFile(join(temp, 'package.json'), JSON.stringify({ name: 'app', dependencies: { vue: '3.0.0' } }));
    await writeFile(join(temp, 'README.md'), '# App');
    await writeFile(join(temp, 'package-lock.json'), '{}');
    const result = await discoverProject(temp);
    assert.deepEqual(result.frameworks, ['vue']);
    assert.deepEqual(result.packageManagers, ['npm']);
    assert.ok(result.documentation.includes('README.md'));
    assert.ok(result.platformFacts.some((item) => item.technology === 'vue' && item.kind === 'framework'));
    assert.equal(result.projectKnowledge.version, '1.0.0');
    assert.ok(result.projectKnowledge.nodes.some((node) => node.technology === 'vue'));
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('built-in adapters produce reusable knowledge across platforms', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-platforms-'));
  try {
    await mkdir(join(temp, 'supabase'), { recursive: true });
    await mkdir(join(temp, 'ios', 'App', 'App.xcodeproj'), { recursive: true });
    await mkdir(join(temp, '.github', 'workflows'), { recursive: true });
    await writeFile(join(temp, 'package.json'), JSON.stringify({
      name: 'fixture-app',
      scripts: { build: 'vite build', test: 'vitest run' },
      dependencies: {
        vue: '^3.0.0',
        '@capacitor/core': '^7.0.0',
        '@supabase/supabase-js': '^2.0.0',
        '@cloudflare/workers-types': '^4.0.0',
        firebase: '^12.0.0'
      }
    }));
    await writeFile(join(temp, 'vite.config.ts'), 'export default {}');
    await writeFile(join(temp, 'capacitor.config.ts'), 'export default {}');
    await writeFile(join(temp, 'wrangler.toml'), 'name = "fixture"');
    await writeFile(join(temp, 'supabase', 'config.toml'), 'project_id = "fixture"');
    await writeFile(join(temp, 'compose.yaml'), 'services: {}');
    await writeFile(join(temp, 'main.tf'), 'terraform {}');
    await writeFile(join(temp, '.github', 'workflows', 'ci.yml'), 'name: CI');

    const result = await discoverProject(temp);
    const technologies = new Set(result.platformFacts.map((item) => item.technology));
    for (const technology of ['javascript', 'vue', 'capacitor', 'ios', 'cloudflare', 'supabase', 'firebase', 'docker', 'terraform', 'github-actions']) {
      assert.ok(technologies.has(technology), `missing ${technology}`);
    }
    assert.ok(result.platformFacts.every((item) => item.evidence && item.confidence));
    assert.ok(result.projectKnowledge.nodes.every((node) => node.id.startsWith('KN-')));
    assert.ok(result.projectKnowledge.relationships.some((edge) => edge.type === 'uses'));
    assert.ok(result.projectKnowledge.relationships.some((edge) => edge.type === 'integrates-with'));
    assert.ok(result.projectKnowledge.relationships.some((edge) => edge.type === 'deploys-to'));
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('web and native adapters identify second-wave technologies', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-second-wave-'));
  try {
    await writeFile(join(temp, 'package.json'), JSON.stringify({
      name: 'multi-app',
      dependencies: {
        next: '^16.0.0',
        react: '^19.0.0',
        electron: '^40.0.0',
        'react-native': '^0.85.0',
        expo: '^56.0.0'
      }
    }));
    await writeFile(join(temp, 'next.config.mjs'), 'export default {}');
    await writeFile(join(temp, 'app.json'), '{}');
    const result = await discoverProject(temp);
    const technologies = new Set(result.platformFacts.map((item) => item.technology));
    for (const technology of ['next', 'electron', 'react-native', 'expo']) assert.ok(technologies.has(technology), `missing ${technology}`);
    assert.ok(!technologies.has('react'), 'Next applications should not emit a duplicate generic React framework fact');
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('installer can create the sills shortcut from the umbrella skill', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-alias-'));
  try {
    const packageRoot = join(process.cwd(), 'skills', 'sills-audit');
    await installSkillSuite({
      packages: [
        { skillName: 'sills', packageRoot },
        { skillName: 'sills-audit', packageRoot }
      ],
      argv: ['install', '--target', temp],
      cwd: temp
    });

    assert.match(await readFile(join(temp, 'sills', 'SKILL.md'), 'utf8'), /^name: sills$/m);
    assert.match(await readFile(join(temp, 'sills-audit', 'SKILL.md'), 'utf8'), /^name: sills-audit$/m);
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('installer rejects shell-style audit invocations', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'sills-install-command-'));
  try {
    await assert.rejects(
      installSkillPackage({
        packageRoot: join(process.cwd(), 'skills', 'sills-audit'),
        skillName: 'sills',
        argv: ['audit', 'api'],
        cwd: temp
      }),
      /Unknown command: audit/
    );
  } finally { await rm(temp, { recursive: true, force: true }); }
});
