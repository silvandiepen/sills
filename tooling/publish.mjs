import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(new URL('..', import.meta.url).pathname);
const tagIndex = process.argv.indexOf('--tag');
const tag = tagIndex >= 0 ? process.argv[tagIndex + 1] : 'latest';
const dryRun = process.argv.includes('--dry-run');
const paths = [join(root, 'packages', 'skill-installer')];
const skills = await readdir(join(root, 'skills'));
for (const name of skills.filter((name) => name !== 'sills-audit').sort()) paths.push(join(root, 'skills', name));
paths.push(join(root, 'skills', 'sills-audit'));

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${command} ${args.join(' ')} failed`);
  }
  return result;
}

async function walkFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(full, base));
    else if (entry.isFile()) files.push(full.slice(base.length + 1));
  }
  return files.sort();
}

async function normalizedPackageJson(path) {
  const pkg = JSON.parse(await readFile(path, 'utf8'));
  pkg.version = '0.0.0-normalized';
  return `${JSON.stringify(pkg, null, 2)}\n`;
}

async function hashDirectory(dir) {
  const hash = createHash('sha256');
  for (const file of await walkFiles(dir)) {
    hash.update(file);
    hash.update('\0');
    const full = join(dir, file);
    if (file === 'package.json') hash.update(await normalizedPackageJson(full));
    else hash.update(await readFile(full));
    hash.update('\0');
  }
  return hash.digest('hex');
}

async function packLocal(cwd, destination) {
  const result = run('npm', ['pack', '--json', '--pack-destination', destination], { cwd });
  return JSON.parse(result.stdout)[0].filename;
}

async function packPublished(spec, destination) {
  const result = spawnSync('npm', ['pack', spec, '--json', '--pack-destination', destination], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  return JSON.parse(result.stdout)[0].filename;
}

async function extract(tarball, destination) {
  run('tar', ['-xzf', tarball, '-C', destination]);
  return join(destination, 'package');
}

async function packageHashFromTarball(tarball, temp) {
  const destination = join(temp, createHash('sha1').update(tarball).digest('hex'));
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  return hashDirectory(await extract(tarball, destination));
}

const temp = await mkdtemp(join(tmpdir(), 'sills-publish-'));
try {
  for (const cwd of paths) {
    const pkg = JSON.parse(await readFile(join(cwd, 'package.json'), 'utf8'));
    if (pkg.private) continue;

    const localTarball = await packLocal(cwd, temp);
    const localHash = await packageHashFromTarball(join(temp, localTarball), temp);
    const publishedTarball = await packPublished(`${pkg.name}@latest`, temp);
    if (publishedTarball) {
      const publishedHash = await packageHashFromTarball(join(temp, publishedTarball), temp);
      if (localHash === publishedHash) {
        console.log(`Skip ${pkg.name}@${pkg.version}: package contents match ${pkg.name}@latest.`);
        continue;
      }
    }

    const current = spawnSync('npm', ['view', `${pkg.name}@${pkg.version}`, 'version'], { encoding: 'utf8' });
    if (current.status === 0 && current.stdout.trim() === pkg.version) {
      throw new Error(`${pkg.name}@${pkg.version} is already published but local package contents differ from latest. Bump the version before publishing.`);
    }

    console.log(`${dryRun ? 'Would publish' : 'Publishing'} ${pkg.name}@${pkg.version}...`);
    if (dryRun) continue;
    const result = spawnSync('npm', ['publish', '--access', 'public', '--tag', tag], { cwd, stdio: 'inherit' });
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
