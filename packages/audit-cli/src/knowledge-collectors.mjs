import { extname } from 'node:path';

function fact(technology, kind, name, attributes, evidence, confidence = 'likely') {
  return {
    technology,
    kind,
    value: { name, ...attributes },
    evidence: [...new Set(evidence)].sort(),
    confidence,
  };
}

function matching(files, patterns) {
  return files.filter((file) => patterns.some((pattern) => pattern.test(file)));
}

function routeFacts(context) {
  const files = matching(context.files, [
    /(^|\/)pages\/.+\.(vue|tsx?|jsx?|svelte)$/,
    /(^|\/)app\/.+\/(page|route)\.(tsx?|jsx?)$/,
    /(^|\/)src\/routes\/.+\.(svelte|tsx?|jsx?)$/,
    /(^|\/)(router|routes)(\/|\.).+\.(tsx?|jsx?)$/,
  ]);
  return files.length ? [fact('cross-platform', 'routes', 'Application routes', { files }, files)] : [];
}

function apiFacts(context) {
  const files = matching(context.files, [
    /(^|\/)server\/api\/.+\.(tsx?|jsx?)$/,
    /(^|\/)api\/.+\.(tsx?|jsx?)$/,
    /(^|\/)app\/.+\/route\.(tsx?|jsx?)$/,
    /(^|\/)functions\/.+\.(tsx?|jsx?|py|go|rs)$/,
    /(^|\/)workers?\/.+\.(tsx?|jsx?)$/,
  ]);
  return files.length ? [fact('cross-platform', 'api-endpoints', 'API and function entry points', { files }, files)] : [];
}

function authFacts(context) {
  const files = matching(context.files, [
    /(^|\/)(auth|authentication|authorization)(\/|\.).+/i,
    /(^|\/)(middleware|guard|guards)\.(tsx?|jsx?)$/,
    /(^|\/)policies?\/.+/i,
    /(^|\/)supabase\/migrations\/.+\.sql$/,
  ]);
  return files.length ? [fact('cross-platform', 'auth', 'Authentication and authorization surfaces', { files }, files)] : [];
}

function dataFacts(context) {
  const files = matching(context.files, [
    /(^|\/)migrations?\/.+\.(sql|tsx?|jsx?|py)$/,
    /(^|\/)(schema|models?)\.(prisma|sql|tsx?|jsx?|py)$/,
    /(^|\/)supabase\/migrations\/.+\.sql$/,
    /(^|\/)firestore\.(rules|indexes\.json)$/,
  ]);
  return files.length ? [fact('cross-platform', 'data', 'Data models and migrations', { files }, files)] : [];
}

function deploymentFacts(context) {
  const files = matching(context.files, [
    /(^|\/)wrangler\.(toml|jsonc?)$/,
    /(^|\/)firebase\.json$/,
    /(^|\/)(vercel|netlify)\.json$/,
    /(^|\/)(docker-compose|compose)\.(yml|yaml)$/,
    /(^|\/)Dockerfile(\..+)?$/,
    /(^|\/)\.github\/workflows\/.+\.ya?ml$/,
    /\.tf$/,
  ]);
  return files.length ? [fact('cross-platform', 'deployment-topology', 'Deployment and delivery configuration', { files }, files, 'certain')] : [];
}

function componentFacts(context) {
  const files = matching(context.files, [/(^|\/)components\/.+\.(vue|tsx?|jsx?|svelte)$/]);
  if (!files.length) return [];
  const extensions = [...new Set(files.map(extname))].sort();
  return [fact('cross-platform', 'components', 'Component inventory', { files, extensions, count: files.length }, files)];
}

function testingFacts(context) {
  const files = matching(context.files, [
    /(^|\/)(__tests__|tests?|e2e)\/.+\.(tsx?|jsx?|mjs|cjs|py)$/,
    /\.(test|spec)\.(tsx?|jsx?|mjs|cjs)$/,
    /(^|\/)(playwright|vitest|jest|cypress)\.config\./,
  ]);
  return files.length ? [fact('cross-platform', 'testing', 'Test topology', { files, count: files.length }, files)] : [];
}

function localizationFacts(context) {
  const files = matching(context.files, [
    /(^|\/)(locales?|i18n|translations?)\/.+\.(json|ya?ml|tsx?|jsx?)$/,
    /(^|\/)(i18n|vue-i18n|next-intl|lingui)\.config\./,
  ]);
  return files.length ? [fact('cross-platform', 'localization', 'Localization resources', { files, count: files.length }, files)] : [];
}

export const builtInKnowledgeCollectors = [
  routeFacts,
  apiFacts,
  authFacts,
  dataFacts,
  deploymentFacts,
  componentFacts,
  testingFacts,
  localizationFacts,
];

export async function runBuiltInKnowledgeCollectors(context) {
  const settled = await Promise.allSettled(builtInKnowledgeCollectors.map((collector) => collector(context)));
  const facts = [];
  const warnings = [];
  settled.forEach((result, index) => {
    if (result.status === 'fulfilled') facts.push(...result.value);
    else warnings.push({
      type: 'knowledge-collector-failed',
      collector: builtInKnowledgeCollectors[index].name,
      message: result.reason?.message ?? String(result.reason),
    });
  });
  return { facts, warnings };
}
