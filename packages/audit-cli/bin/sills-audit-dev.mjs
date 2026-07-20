#!/usr/bin/env node
import { createRun } from '../src/create-run.mjs';
import { discoverProject } from '../src/discover.mjs';
import { validateReportFile } from '../src/validate-report.mjs';
import { COLLECTOR_GROUPS, COLLECTORS, runCollector, runCollectorGroup } from '../src/collectors.mjs';

const [command = 'help', ...args] = process.argv.slice(2);
const get = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};

try {
  if (command === 'create-run') {
    const result = await createRun({
      root: get('--root', process.cwd()),
      output: get('--output', 'audit'),
      date: get('--date'),
      skill: get('--skill', 'sills-audit')
    });
    console.log(result.directory);
  } else if (command === 'discover') {
    console.log(JSON.stringify(await discoverProject(get('--root', process.cwd())), null, 2));
  } else if (command === 'validate-report') {
    const file = get('--file', args.find((arg) => !arg.startsWith('--')));
    if (!file) throw new Error('Provide --file path/to/report.json');
    console.log(JSON.stringify(await validateReportFile(file), null, 2));
  } else if (command === 'collect') {
    const kind = get('--kind');
    const options = { root: get('--path', get('--root', process.cwd())), out: get('--out') };
    if (!kind) throw new Error(`Provide --kind. Collectors: ${Object.keys(COLLECTORS).join(', ')}. Groups: ${Object.keys(COLLECTOR_GROUPS).join(', ')}.`);
    const result = COLLECTOR_GROUPS[kind] ? await runCollectorGroup(kind, options) : await runCollector(kind, options);
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('Usage: sills-audit-dev <create-run|discover|validate-report|collect> [options]');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
