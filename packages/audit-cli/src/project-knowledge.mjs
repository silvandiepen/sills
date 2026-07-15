import { createHash } from 'node:crypto';

function slug(value) {
  return String(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'UNKNOWN';
}

function stableId(type, technology, name) {
  const hash = createHash('sha256').update(`${type}\0${technology}\0${name}`).digest('hex').slice(0, 10).toUpperCase();
  return `KN-${slug(type)}-${hash}`;
}

function nodeFromFact(fact) {
  const name = typeof fact.value === 'string'
    ? fact.value
    : fact.value?.name ?? fact.value?.applicationRoot ?? `${fact.technology}:${fact.kind}`;
  return {
    id: stableId(fact.kind, fact.technology, name),
    type: fact.kind,
    name: String(name),
    technology: fact.technology,
    attributes: typeof fact.value === 'object' && fact.value !== null ? fact.value : { value: fact.value },
    evidence: [...new Set(fact.evidence ?? [])].sort(),
    confidence: fact.confidence ?? 'possible',
  };
}

function relationship(from, type, to, evidence = []) {
  return { from, type, to, evidence: [...new Set(evidence)].sort() };
}

export function buildProjectKnowledge(platformFacts = [], warnings = []) {
  const nodes = platformFacts.map(nodeFromFact);
  const relationships = [];

  const packageNodes = nodes.filter((node) => node.type === 'package');
  const frameworkNodes = nodes.filter((node) => node.type === 'framework');
  const platformNodes = nodes.filter((node) => ['platform', 'native-targets'].includes(node.type));
  const deploymentNodes = nodes.filter((node) => node.type === 'deployment');
  const serviceNodes = nodes.filter((node) => node.type === 'service');
  const commandNodes = nodes.filter((node) => node.type === 'commands');

  for (const framework of frameworkNodes) {
    const root = framework.attributes.applicationRoot;
    const owner = packageNodes.find((node) => node.evidence.some((path) => root === '.' ? path === 'package.json' : path.startsWith(`${root}/`)));
    if (owner) relationships.push(relationship(owner.id, 'uses', framework.id, [...owner.evidence, ...framework.evidence]));
  }

  for (const platform of platformNodes) {
    for (const framework of frameworkNodes) {
      if (platform.technology === 'capacitor' && ['vue', 'nuxt', 'react', 'next', 'angular', 'sveltekit'].includes(framework.technology)) {
        relationships.push(relationship(framework.id, 'targets', platform.id, [...framework.evidence, ...platform.evidence]));
      }
    }
  }

  for (const deployment of deploymentNodes) {
    for (const framework of frameworkNodes) {
      relationships.push(relationship(framework.id, 'deploys-to', deployment.id, [...framework.evidence, ...deployment.evidence]));
    }
  }

  for (const service of serviceNodes) {
    for (const framework of frameworkNodes) {
      relationships.push(relationship(framework.id, 'integrates-with', service.id, [...framework.evidence, ...service.evidence]));
    }
  }

  for (const command of commandNodes) {
    const owner = packageNodes.find((node) => node.evidence.some((path) => command.evidence.includes(path)));
    if (owner) relationships.push(relationship(owner.id, 'provides', command.id, command.evidence));
  }

  const uniqueRelationships = [...new Map(relationships.map((item) => [`${item.from}:${item.type}:${item.to}`, item])).values()];

  return {
    version: '1.0.0',
    nodes,
    relationships: uniqueRelationships,
    warnings,
  };
}
