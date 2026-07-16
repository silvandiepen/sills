import { cp, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(new URL('..', import.meta.url).pathname);
const webRoot = join(root, 'web');
const staging = await mkdtemp(join(tmpdir(), 'sills-girky-'));
const output = join(webRoot, 'public');

try {
  await cp(join(webRoot, 'docs'), staging, { recursive: true });
  await cp(join(webRoot, 'girk.config.json'), join(staging, 'girk.config.json'));
  await mkdir(join(staging, 'assets'), { recursive: true });
  await cp(join(root, 'sills.svg'), join(staging, 'assets', 'logo.svg'));

  const result = spawnSync('npx', ['girky@latest'], {
    cwd: staging,
    encoding: 'utf8',
    stdio: 'inherit',
  });
  if (result.status !== 0) process.exit(result.status ?? 1);

  await rm(output, { recursive: true, force: true });
  await cp(join(staging, 'public'), output, { recursive: true });
} finally {
  await rm(staging, { recursive: true, force: true });
}
