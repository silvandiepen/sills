import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const mode = process.argv[2];
const errors = [];

async function dirs(path) {
  return (await readdir(path, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

function frontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---\n', 4);
  if (end < 0) return null;
  const lines = text.slice(4, end).split('\n');
  return Object.fromEntries(lines.filter((line) => line.includes(':') && !line.startsWith(' ')).map((line) => {
    const index = line.indexOf(':');
    return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^"|"$/g, '')];
  }));
}

async function validateSkills() {
  const names = await dirs(join(root, 'skills'));
  for (const name of names) {
    const base = join(root, 'skills', name);
    const skillText = await readFile(join(base, 'SKILL.md'), 'utf8');
    const meta = frontmatter(skillText);
    const pkg = JSON.parse(await readFile(join(base, 'package.json'), 'utf8'));
    if (!meta) errors.push(`${name}: missing SKILL.md frontmatter`);
    if (meta?.name !== name) errors.push(`${name}: frontmatter name must equal directory and package name`);
    if (pkg.name !== name) errors.push(`${name}: package name mismatch`);
    if (!meta?.description || meta.description.length < 80) errors.push(`${name}: description must clearly describe use cases`);
    for (const required of ['README.md', 'LICENSE', 'bin', 'agents']) {
      try { await stat(join(base, required)); } catch { errors.push(`${name}: missing ${required}`); }
    }
  }
}

async function validateDocs() {
  const docsRoot = join(root, 'web', 'docs');
  async function walk(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const full = join(path, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith('.md')) {
        const text = await readFile(full, 'utf8');
        const meta = frontmatter(text);
        if (!meta?.title || !meta?.description || !meta?.slug) errors.push(`${relative(root, full)}: incomplete frontmatter`);
        if (!/^#\s/m.test(text)) errors.push(`${relative(root, full)}: missing H1`);
      }
    }
  }
  await walk(docsRoot);
}

async function validatePackages() {
  const rootPkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  if (!rootPkg.workspaces) errors.push('root package.json must define workspaces');
  const parent = JSON.parse(await readFile(join(root, 'skills', 'sills-audit', 'package.json'), 'utf8'));
  for (const name of ['sills-audit-accessibility','sills-audit-experience','sills-audit-content','sills-audit-architecture','sills-audit-security']) {
    if (!parent.dependencies?.[name]) errors.push(`sills-audit must depend on ${name}`);
  }
}

if (!mode || mode === '--skills') await validateSkills();
if (!mode || mode === '--docs') await validateDocs();
if (!mode) await validatePackages();

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}
console.log('Validation passed.');
