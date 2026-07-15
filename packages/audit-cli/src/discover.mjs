import { readFile, readdir } from 'node:fs/promises';
import { basename, join, relative, resolve } from 'node:path';

const IGNORE = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'coverage', 'audit']);
const DOC_NAMES = new Set(['README.md', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md', 'ARCHITECTURE.md', 'SECURITY.md']);

async function walk(root, current, result, depth = 0) {
  if (depth > 5) return;
  let entries = [];
  try { entries = await readdir(current, { withFileTypes: true }); } catch { return; }
  for (const entry of entries) {
    if (IGNORE.has(entry.name)) continue;
    const full = join(current, entry.name);
    const rel = relative(root, full);
    if (entry.isDirectory()) await walk(root, full, result, depth + 1);
    else if (entry.name === 'package.json') result.packageFiles.push(rel);
    else if (DOC_NAMES.has(entry.name) || entry.name.endsWith('.md') && depth <= 2) result.documentation.push(rel);
    else if (/^(vite|next|nuxt|svelte|angular|astro|webpack)\.config\./.test(entry.name)) result.configFiles.push(rel);
    else if (entry.name.endsWith('.xcodeproj') || entry.name.endsWith('.xcworkspace')) result.iosProjects.push(rel);
  }
}

export async function discoverProject(path) {
  const root = resolve(path);
  const result = { root, packageFiles: [], documentation: [], configFiles: [], iosProjects: [], frameworks: [], packageManagers: [], workspaces: [] };
  await walk(root, root, result);
  for (const file of result.packageFiles) {
    try {
      const pkg = JSON.parse(await readFile(join(root, file), 'utf8'));
      const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
      for (const [name, framework] of [['vue','vue'],['nuxt','nuxt'],['react','react'],['next','next'],['svelte','svelte'],['@sveltejs/kit','sveltekit'],['@angular/core','angular'],['electron','electron']]) {
        if (dependencies[name]) result.frameworks.push(framework);
      }
      if (pkg.workspaces) result.workspaces.push({ file, workspaces: pkg.workspaces });
    } catch {}
  }
  for (const [file, manager] of [['pnpm-lock.yaml','pnpm'],['package-lock.json','npm'],['yarn.lock','yarn'],['bun.lockb','bun'],['bun.lock','bun']]) {
    try { await readFile(join(root, file)); result.packageManagers.push(manager); } catch {}
  }
  result.frameworks = [...new Set(result.frameworks)];
  result.packageManagers = [...new Set(result.packageManagers)];
  return result;
}
