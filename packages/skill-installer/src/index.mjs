import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ALLOWED_ENTRIES = [
  'SKILL.md', 'references', 'scripts', 'assets', 'templates', 'agents'
];

function parseArgs(argv) {
  const args = new Set(argv);
  const value = (name) => {
    const index = argv.indexOf(name);
    return index >= 0 ? argv[index + 1] : undefined;
  };
  const requestedAgents = [];
  if (args.has('--codex')) requestedAgents.push('codex');
  if (args.has('--claude')) requestedAgents.push('claude');
  return {
    command: ['install', 'help'].includes(argv[0]) ? argv[0] : 'install',
    agents: requestedAgents.length ? requestedAgents : ['codex', 'claude'],
    global: args.has('--global'),
    force: args.has('--force'),
    dryRun: args.has('--dry-run'),
    target: value('--target')
  };
}

function destinations(options, cwd = process.cwd()) {
  if (options.target) return [{ agent: options.agents.length === 1 ? options.agents[0] : 'custom', root: resolve(options.target) }];
  const base = options.global ? homedir() : cwd;
  return options.agents.map((agent) => ({
    agent,
    root: agent === 'codex'
      ? join(base, '.agents', 'skills')
      : join(base, '.claude', 'skills')
  }));
}

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

export async function installSkillPackage({ packageRoot, skillName, argv = process.argv.slice(2), cwd = process.cwd() }) {
  const options = parseArgs(argv);
  if (!['install', 'help'].includes(options.command)) {
    throw new Error(`Unknown command: ${options.command}`);
  }
  if (options.command === 'help') {
    return { help: true, message: helpText(skillName) };
  }

  const actions = [];
  for (const destination of destinations(options, cwd)) {
    const target = join(destination.root, skillName);
    if (await exists(target) && !options.force) {
      throw new Error(`${target} already exists. Re-run with --force to replace it.`);
    }
    actions.push({ agent: destination.agent, target });
    if (options.dryRun) continue;
    await mkdir(target, { recursive: true });
    if (options.force) await rm(target, { recursive: true, force: true });
    await mkdir(target, { recursive: true });
    for (const entry of ALLOWED_ENTRIES) {
      const source = join(packageRoot, entry);
      if (!(await exists(source))) continue;
      await cp(source, join(target, entry), { recursive: true });
    }
  }
  return { help: false, skillName, actions, dryRun: options.dryRun };
}

export async function installSkillSuite({ packages, argv = process.argv.slice(2), cwd = process.cwd() }) {
  const results = [];
  for (const item of packages) {
    results.push(await installSkillPackage({ packageRoot: item.packageRoot, skillName: item.skillName, argv, cwd }));
  }
  return results;
}

export function packageRootFromMeta(metaUrl) {
  return resolve(dirname(fileURLToPath(metaUrl)), '..');
}

export function helpText(name = 'sills-audit') {
  return `Install ${name}\n\nUsage:\n  npx ${name} install [--codex] [--claude] [--global] [--force] [--dry-run] [--target PATH]\n`;
}

export function printInstallResult(result) {
  if (Array.isArray(result)) {
    for (const item of result) printInstallResult(item);
    return;
  }
  if (result.help) {
    process.stdout.write(result.message);
    return;
  }
  for (const action of result.actions) {
    process.stdout.write(`${result.dryRun ? 'Would install' : 'Installed'} ${result.skillName} for ${action.agent}: ${action.target}\n`);
  }
}
