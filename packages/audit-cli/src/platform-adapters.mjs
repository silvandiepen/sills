import { access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function readJson(path) {
  try { return JSON.parse(await readFile(path, 'utf8')); } catch { return null; }
}

function fact(technology, kind, value, evidence, confidence = 'certain') {
  return { technology, kind, value, evidence: [...new Set(evidence)].filter(Boolean).sort(), confidence };
}

function packageRoots(root, packageFiles) {
  return packageFiles.map((file) => ({ file, root: dirname(join(root, file)) }));
}

function baseFor(file) {
  return dirname(file) === '.' ? '' : dirname(file);
}

function dependencies(pkg) {
  return { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
}

function matchingConfigs(context, base, expression) {
  return context.configFiles.filter((item) => (!base || item.startsWith(base)) && expression.test(item));
}

async function detectJavascript(context) {
  const facts = [];
  for (const { file, root } of packageRoots(context.root, context.packageFiles)) {
    const pkg = await readJson(join(context.root, file));
    if (!pkg) continue;
    const scripts = pkg.scripts ?? {};
    facts.push(fact('javascript', 'package', { name: pkg.name ?? file, path: file, private: Boolean(pkg.private), type: pkg.type ?? 'commonjs' }, [file]));
    if (Object.keys(scripts).length) facts.push(fact('javascript', 'commands', { name: `${pkg.name ?? file} commands`, scripts }, [file]));
    if (pkg.workspaces) facts.push(fact('javascript', 'workspace', { name: pkg.name ?? file, packages: pkg.workspaces }, [file]));
    if (await exists(join(root, 'src'))) facts.push(fact('javascript', 'source-root', { name: `${pkg.name ?? file} source`, path: join(baseFor(file), 'src') }, [file]));
  }
  return facts;
}

async function detectWebFrameworks(context) {
  const facts = [];
  for (const { file } of packageRoots(context.root, context.packageFiles)) {
    const pkg = await readJson(join(context.root, file));
    if (!pkg) continue;
    const deps = dependencies(pkg);
    const base = baseFor(file);
    const applicationRoot = base || '.';

    const definitions = [
      ['nuxt', 'nuxt', /nuxt\.config\./, ['pages', 'app', 'server', 'middleware', 'plugins', 'nuxt.config']],
      ['next', 'next', /next\.config\./, ['app', 'pages', 'middleware', 'route handlers', 'next.config']],
      ['angular', '@angular/core', /angular\.json$/, ['src/app', 'routes', 'components', 'services', 'environments']],
      ['sveltekit', '@sveltejs/kit', /svelte\.config\./, ['src/routes', 'hooks', 'server endpoints', 'svelte.config']],
      ['vue', 'vue', /vite\.config\./, ['src/router', 'src/components', 'src/views', 'src/App']],
      ['react', 'react', /(vite|webpack)\.config\./, ['src/routes', 'src/components', 'src/pages', 'src/App']],
    ];

    for (const [technology, dependency, configPattern, hints] of definitions) {
      if (!deps[dependency]) continue;
      if (technology === 'vue' && deps.nuxt) continue;
      if (technology === 'react' && deps.next) continue;
      const evidence = [file, ...matchingConfigs(context, base, configPattern)];
      facts.push(fact(technology, 'framework', { name: pkg.name ?? `${technology} application`, version: deps[dependency], applicationRoot }, evidence));
      facts.push(fact(technology, 'evidence-hints', { name: `${technology} evidence`, surfaces: hints }, evidence));
    }
  }
  return facts;
}

async function detectNativeDesktop(context) {
  const facts = [];
  const capacitorConfigs = context.configFiles.filter((file) => /capacitor\.config\./.test(file));
  if (context.frameworks.includes('capacitor') || capacitorConfigs.length) {
    facts.push(fact('capacitor', 'platform', {
      name: 'Capacitor native shell',
      configFiles: capacitorConfigs,
      iosProjects: context.iosProjects,
      androidProjects: context.androidProjects,
    }, [...capacitorConfigs, ...context.iosProjects, ...context.androidProjects], capacitorConfigs.length ? 'certain' : 'likely'));
    facts.push(fact('capacitor', 'evidence-hints', { name: 'Capacitor evidence', surfaces: ['native permissions', 'deep links', 'WebView navigation', 'privacy manifests', 'entitlements'] }, [...capacitorConfigs, ...context.iosProjects]));
  }
  if (context.iosProjects.length) facts.push(fact('ios', 'native-targets', { name: 'iOS targets', projects: context.iosProjects }, context.iosProjects));
  if (context.androidProjects.length) facts.push(fact('android', 'native-targets', { name: 'Android targets', projects: context.androidProjects }, context.androidProjects));

  for (const { file } of packageRoots(context.root, context.packageFiles)) {
    const pkg = await readJson(join(context.root, file));
    if (!pkg) continue;
    const deps = dependencies(pkg);
    const base = baseFor(file);
    if (deps.electron) facts.push(fact('electron', 'platform', { name: pkg.name ?? 'Electron application', version: deps.electron, applicationRoot: base || '.' }, [file, ...matchingConfigs(context, base, /electron/)]));
    if (deps['react-native']) facts.push(fact('react-native', 'platform', { name: pkg.name ?? 'React Native application', version: deps['react-native'], applicationRoot: base || '.' }, [file]));
    if (deps.expo) facts.push(fact('expo', 'platform', { name: pkg.name ?? 'Expo application', version: deps.expo, applicationRoot: base || '.' }, [file, ...matchingConfigs(context, base, /app\.(json|config\.)/)]));
  }
  return facts;
}

async function detectServices(context) {
  const facts = [];
  const wrangler = context.configFiles.filter((file) => /(^|\/)wrangler\.(toml|jsonc?)$/.test(file));
  if (context.frameworks.includes('cloudflare-workers') || wrangler.length) {
    facts.push(fact('cloudflare', 'deployment', { name: 'Cloudflare Workers', configFiles: wrangler, runtime: 'workers' }, wrangler, wrangler.length ? 'certain' : 'likely'));
    facts.push(fact('cloudflare', 'evidence-hints', { name: 'Cloudflare evidence', surfaces: ['bindings', 'routes', 'compatibility date', 'environment overrides', 'secrets references'] }, wrangler));
  }

  const supabase = context.configFiles.filter((file) => /(^|\/)supabase\/config\.toml$/.test(file));
  if (context.frameworks.includes('supabase') || supabase.length) {
    facts.push(fact('supabase', 'service', { name: 'Supabase', configFiles: supabase }, supabase, supabase.length ? 'certain' : 'likely'));
    facts.push(fact('supabase', 'evidence-hints', { name: 'Supabase evidence', surfaces: ['migrations', 'row-level security', 'edge functions', 'storage policies', 'generated types'] }, supabase));
  }

  for (const { file } of packageRoots(context.root, context.packageFiles)) {
    const pkg = await readJson(join(context.root, file));
    if (!pkg) continue;
    const deps = dependencies(pkg);
    if (deps.firebase || deps['firebase-admin']) facts.push(fact('firebase', 'service', { name: 'Firebase', clientVersion: deps.firebase, adminVersion: deps['firebase-admin'] }, [file]));
  }
  return facts;
}

async function detectInfrastructure(context) {
  const facts = [];
  const docker = context.configFiles.filter((file) => /(^|\/)(docker-compose|compose)\.(yml|yaml)$/.test(file));
  if (context.platforms.includes('docker') || docker.length) facts.push(fact('docker', 'infrastructure', { name: 'Docker', composeFiles: docker }, docker, docker.length ? 'certain' : 'likely'));
  if (context.platforms.includes('terraform')) facts.push(fact('terraform', 'infrastructure', { name: 'Terraform' }, context.terraformFiles ?? [], 'certain'));
  if ((context.workflowFiles ?? []).length) facts.push(fact('github-actions', 'ci', { name: 'GitHub Actions', workflows: context.workflowFiles }, context.workflowFiles));
  return facts;
}

export const builtInPlatformAdapters = [
  detectJavascript,
  detectWebFrameworks,
  detectNativeDesktop,
  detectServices,
  detectInfrastructure,
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
