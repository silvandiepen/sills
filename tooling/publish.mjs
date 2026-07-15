import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(new URL('..', import.meta.url).pathname);
const tagIndex = process.argv.indexOf('--tag');
const tag = tagIndex >= 0 ? process.argv[tagIndex + 1] : 'latest';
const paths = [join(root, 'packages', 'skill-installer')];
const skills = await readdir(join(root, 'skills'));
for (const name of skills.filter((name) => name !== 'sills-audit').sort()) paths.push(join(root, 'skills', name));
paths.push(join(root, 'skills', 'sills-audit'));

for (const cwd of paths) {
  const pkg = JSON.parse(await readFile(join(cwd, 'package.json'), 'utf8'));
  if (pkg.private) continue;
  const current = spawnSync('npm', ['view', `${pkg.name}@${pkg.version}`, 'version'], { encoding: 'utf8' });
  if (current.status === 0 && current.stdout.trim() === pkg.version) {
    console.log(`Skip ${pkg.name}@${pkg.version}: already published.`);
    continue;
  }
  console.log(`Publishing ${pkg.name}@${pkg.version}...`);
  const result = spawnSync('npm', ['publish', '--access', 'public', '--tag', tag], { cwd, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
