import { access, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { validateReportFile } from './validate-report.mjs';

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function run(command, args, cwd) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
    child.on('error', reject);
    child.on('exit', (code) => code === 0
      ? resolvePromise()
      : reject(new Error(`${command} exited with code ${code}`)));
  });
}

export async function renderReport({ directory, markdown, report, output, title, nizelVersion = 'latest' }) {
  const auditDirectory = resolve(directory ?? dirname(markdown ?? report ?? process.cwd()));
  const reportFile = resolve(report ?? join(auditDirectory, 'report.json'));
  const markdownFile = resolve(markdown ?? join(auditDirectory, 'report.md'));
  const outputFile = resolve(output ?? join(auditDirectory, 'report.html'));

  if (!await exists(reportFile)) throw new Error(`Missing report contract: ${reportFile}`);
  if (!await exists(markdownFile)) throw new Error(`Missing Markdown report: ${markdownFile}`);

  const validation = await validateReportFile(reportFile);
  if (!validation.valid) {
    throw new Error(`Cannot render invalid report.json:\n${validation.errors.join('\n')}`);
  }

  const source = await readFile(markdownFile, 'utf8');
  if (!source.trim()) throw new Error(`Markdown report is empty: ${markdownFile}`);

  const args = [
    '--yes',
    `nizel@${nizelVersion}`,
    markdownFile,
    '--document',
    '--output',
    outputFile,
  ];
  if (title) args.push('--title', title);

  await run('npx', args, auditDirectory);
  return { reportFile, markdownFile, outputFile, renderer: `nizel@${nizelVersion}` };
}
