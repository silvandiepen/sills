import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const IGNORE = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'coverage', 'audit', '.turbo']);
const DOC_NAMES = new Set(['README.md', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md', 'ARCHITECTURE.md', 'SECURITY.md']);
const CONFIG_PATTERNS = [
  /^(vite|next|nuxt|svelte|angular|astro|webpack|capacitor|electron|playwright|vitest|jest|eslint|prettier|turbo|nx)\.config\./,
  /^(docker-compose|compose)\.(yml|yaml)$/,
  /^wrangler\.(toml|jsonc?)$/,
  /^supabase\/config\.toml$/,
];

async function walk(root, current, result, depth = 0, maxDepth = 12) {
  if (depth > maxDepth) {
    result.warnings.push({ type: 'depth-limit-reached', path: relative(root, current), maxDepth });
    return;
  }

  let entries;
  try {
    entries = await readdir(current, { withFileTypes: true });
  } catch (error) {
    result.warnings.push({ type: 'unreadable-path', path: relative(root, current), message: error.message });
    return;
  }

  for (const entry of entries) {
    if (IGNORE.has(entry.name)) continue;
    const full = join(current, entry.name);
    const rel = relative(root, full);
    if (entry.isDirectory()) {
      if (entry.name.endsWith('.xcodeproj') || entry.name.endsWith('.xcworkspace')) result.iosProjects.push(rel);
      else if (entry.name === 'android' && depth <= 3) result.androidProjects.push(rel);
      else await walk(root, full, result, depth + 1, maxDepth);
      continue;
    }

    if (entry.name === 'package.json') result.packageFiles.push(rel);
    if (DOC_NAMES.has(entry.name) || (entry.name.endsWith('.md') && depth <= 3)) result.documentation.push(rel);
    if (CONFIG_PATTERNS.some((pattern) => pattern.test(entry.name) || pattern.test(rel))) result.configFiles.push(rel);
    if (entry.name === 'Cargo.toml') result.ecosystems.push('rust');
    if (entry.name === 'go.mod') result.ecosystems.push('go');
    if (entry.name === 'pyproject.toml' || entry.name === 'requirements.txt') result.ecosystems.push('python');
    if (entry.name === 'composer.json') result.ecosystems.push('php');
    if (entry.name === 'Gemfile') result.ecosystems.push('ruby');
    if (entry.name.endsWith('.csproj')) result.ecosystems.push('dotnet');
    if (entry.name === 'Dockerfile' || entry.name.startsWith('Dockerfile.')) result.platforms.push('docker');
    if (entry.name.endsWith('.tf')) result.platforms.push('terraform');
  }
}

export async function discoverProject(path, options = {}) {
  const root = resolve(path);
  const result = {
    root,
    packageFiles: [],
    documentation: [],
    configFiles: [],
    iosProjects: [],
    androidProjects: [],
    frameworks: [],
    packageManagers: [],
    workspaces: [],
    platforms: [],
    ecosystems: [],
    warnings: [],
  };

  await walk(root, root, result, 0, options.maxDepth ?? 12);

  for (const file of result.packageFiles) {
    try {
      const pkg = JSON.parse(await readFile(join(root, file), 'utf8'));
      const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
      for (const [name, framework] of [
        ['vue', 'vue'], ['nuxt', 'nuxt'], ['react', 'react'], ['next', 'next'], ['svelte', 'svelte'],
        ['@sveltejs/kit', 'sveltekit'], ['@angular/core', 'angular'], ['electron', 'electron'],
        ['@capacitor/core', 'capacitor'], ['react-native', 'react-native'], ['expo', 'expo'],
        ['@cloudflare/workers-types', 'cloudflare-workers'], ['@supabase/supabase-js', 'supabase'],
      ]) if (dependencies[name]) result.frameworks.push(framework);
      if (pkg.workspaces) result.workspaces.push({ file, workspaces: pkg.workspaces });
    } catch (error) {
      result.warnings.push({ type: 'invalid-package-json', path: file, message: error.message });
    }
  }

  for (const [file, manager] of [['pnpm-lock.yaml', 'pnpm'], ['package-lock.json', 'npm'], ['yarn.lock', 'yarn'], ['bun.lockb', 'bun'], ['bun.lock', 'bun']]) {
    try { await readFile(join(root, file)); result.packageManagers.push(manager); } catch {}
  }

  for (const key of ['frameworks', 'packageManagers', 'platforms', 'ecosystems', 'configFiles', 'documentation', 'iosProjects', 'androidProjects']) {
    result[key] = [...new Set(result[key])].sort();
  }
  return result;
}
