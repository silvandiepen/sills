import { readFile, readdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const manifestPath = join(root, 'contracts', 'manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const schemaFiles = (await readdir(join(root, 'schemas')))
  .filter((file) => file.endsWith('.schema.json'))
  .sort();

const errors = [];
const names = new Set();
const schemas = new Set();

for (const contract of manifest.contracts ?? []) {
  if (!contract.name || names.has(contract.name)) errors.push(`Duplicate or missing contract name: ${contract.name ?? '<missing>'}`);
  names.add(contract.name);
  if (!contract.schema || schemas.has(contract.schema)) errors.push(`Duplicate or missing schema registration for ${contract.name}`);
  schemas.add(contract.schema);
  for (const field of ['description', 'generatedBy', 'validatedBy']) {
    if (!contract[field] || typeof contract[field] !== 'string') errors.push(`${contract.name} is missing ${field}`);
  }
  if (!contract.example || typeof contract.example !== 'object' || Array.isArray(contract.example)) {
    errors.push(`${contract.name} must include an inline object example`);
  }
  try {
    const schema = JSON.parse(await readFile(join(root, contract.schema), 'utf8'));
    if (!schema.$schema) errors.push(`${contract.schema} is missing $schema`);
    if (!schema.title) errors.push(`${contract.schema} is missing title`);
    if (!schema.type) errors.push(`${contract.schema} is missing root type`);
  } catch (error) {
    errors.push(`Cannot read ${contract.schema}: ${error.message}`);
  }
}

for (const file of schemaFiles) {
  const path = `schemas/${file}`;
  if (!schemas.has(path)) errors.push(`Unregistered public schema: ${path}`);
}

for (const schema of schemas) {
  if (!schemaFiles.includes(basename(schema))) errors.push(`Manifest references missing schema: ${schema}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${manifest.contracts.length} public contracts.`);
}
