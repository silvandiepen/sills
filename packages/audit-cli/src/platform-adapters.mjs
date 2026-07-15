import { access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function readJson(path) {
  try { return JSON.parse(await readFile(path, 'utf8')); } catch { return null; }
}

function fact(technology, kind, value, evidence, confidence = 'certain') {
  return { technology, kind, value, evidence: [...new Set(evidence)].sort(), confidence };
}

function packageRoots(root, packageFiles) {
  return packageFiles.map((file) => ({ file, root: dirname(join(root, file)) }));
}

async function detectJavascript(context) {
  const facts = [];
  for (const { file, root } of packageRoots(context.root, context.packageFiles)) {
    const pkg = await readJson(join(context.root, file));
    if (!pkg) continue;
    const scripts = pkg.scripts ?? {};
    facts.push(fact('javascript', 'package', pkg.name ?? file, [file]));
    if (Object.keys(scripts).length) facts.push(fact('javascript', 'commands', scripts, [file]));
    if (pkg.workspaces) facts.push(fact('javascript', 'workspace', pkg.workspaces, [file]));
    if (await exists(join(root, 'src'))) facts.push(fact('javascript', 'source-root', join(dirname(file), 'src'), [file]));
  }
  return facts;
}

async function detectVueNuxt(context) {
  const facts = [];
  for (const { file } of packageRoots(context.root, context.packageFiles)) {
    const pkg = await readJson(join(context.root, file));
    if (!pkg) continue;
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const base = dirname(file) === '.' ? '' : dirname(file);
    if (deps.nuxt) {
      const evidence = [file, ...context.configFiles.filter((item) => item.startsWith(base) && /nuxt\.config\./.test(item))];
      facts.push(fact('nuxt', 'framework', { version: deps.nuxt, applicationRoot: base || '.' }, evidence));
      facts.push(fact('nuxt', 'evidence-hints', ['pages', 'app', 'server', 'middleware', 'plugins', 'nuxt.config'], evidence));
    } else if (deps.vue) {
      const evidence = [file, ...context.configFiles.filter((item) => item.startsWith(base) && /vite\.config\./.test(item))];
      facts.push(fact('vue', 'framework', { version: deps.vue, applicationRoot: base || '.' }, evidence));
      facts.push(fact('vue', 'evidence-hints', ['src/router', 'src/components', 'src/views', 'src/App'], evidence));
    }
  }
  return facts;
}

async function detectCapacitorIos(context) {
  const facts = [];
  const configs = context.configFiles.filter((file) => /capacitor\.config\./.test(file));
  if (context.frameworks.includes('capacitor') || configs.length) {
    facts.push(fact('capacitor', 'platform', {
      configFiles: configs,
      iosProjects: context.iosProjects,
      androidProjects: context.androidProjects,
    }, [...configs, ...context.iosProjects, ...context.androidProjects], configs.length ? 'certain' : 'likely'));
    facts.push(fact('capacitor', 'evidence-hints', ['native permissions', 'deep links', 'WebView navigation', 'privacy manifests', 'entitlements'], [...configs, ...context.iosProjects]));
  }
  if (context.iosProjects.length) facts.push(fact('ios', 'native-targets', context.iosProjects, context.iosProjects));
  return facts;
}

async function detectCloudflare(context) {
  const configs = context.configFiles.filter((file) => /^wrangler\.(toml|jsonc?)$/.test(file.split('/').at(-1)));
  if (!context.frameworks.includes('cloudflare-workers') && !configs.length) return [];
  return [
    fact('cloudflare', 'deployment', { configFiles: configs, runtime: 'workers' }, configs, configs.length ? 'certain' : 'likely'),
    fact('cloudflare', 'evidence-hints', ['bindings', 'routes', 'compatibility date', 'environment overrides', 'secrets references'], configs),
  ];
}

async function detectSupabase(context) {
  const configs = context.configFiles.filter((file) => file === 'supabase/config.toml' || file.endsWith('/supabase/config.toml'));
  if (!context.frameworks.includes('supabase') && !configs.length) return [];
  return [
    fact('supabase', 'service', { configFiles: configs }, configs, configs.length ? 'certain' : 'likely'),
    fact('supabase', 'evidence-hints', ['migrations', 'row-level security', 'edge functions', 'storage policies', 'generated types'], configs),
  ];
}

export const builtInPlatformAdapters = [
  detectJavascript,
  detectVueNuxt,
  detectCapacitorIos,
  detectCloudflare,
  detectSupabase,
];

export async function runBuiltInPlatformAdapters(context) {
  const settled = await Promise.allSettled(builtInPlatformAdapters.map((adapter) => adapter(context)));
  const facts = [];
  const warnings = [];
  settled.forEach((result, index) => {
    if (result.status === 'fulfilled') facts.push(...result.value);
    else warnings.push({ type: 'platform-adapter-failed', adapter: builtInPlatformAdapters[index].name, message: result.reason?.message ?? String(result.reason) });
  });
  return { facts, warnings };
}
