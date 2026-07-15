import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(new URL('..', import.meta.url).pathname);
const packages = [join(root, 'packages', 'skill-installer'), ...((await readdir(join(root, 'skills'))).map((name) => join(root, 'skills', name)))];
const temp = await mkdtemp(join(tmpdir(), 'sills-pack-'));
try {
  for (const cwd of packages) {
    const result = spawnSync('npm', ['pack', '--json', '--pack-destination', temp], { cwd, encoding: 'utf8' });
    if (result.status !== 0) throw new Error(result.stderr || result.stdout);
    const info = JSON.parse(result.stdout)[0];
    const files = info.files.map((file) => file.path);
    if (!files.includes('package.json')) throw new Error(`${cwd}: package.json missing from tarball`);
    if (cwd.includes('/skills/') && !files.includes('SKILL.md')) throw new Error(`${cwd}: SKILL.md missing from tarball`);
    for (const file of files) {
      if (/(^|\/)(\.env|node_modules|audit)(\/|$)/.test(file)) throw new Error(`${cwd}: unsafe packaged path ${file}`);
    }
  }
  console.log(`Validated ${packages.length} package tarballs.`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
