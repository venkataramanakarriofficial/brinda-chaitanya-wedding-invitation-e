import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const port = 3002;
const url = `http://localhost:${port}/`;
const projectRoot = process.cwd();
const nextCli = join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');

async function isServerReady() {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (await isServerReady()) return;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error(`Next.js did not become ready at ${url}`);
}

function findChrome() {
  const candidates = [
    process.env.ProgramFiles && join(process.env.ProgramFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    process.env['ProgramFiles(x86)'] && join(process.env['ProgramFiles(x86)'], 'Google', 'Chrome', 'Application', 'chrome.exe'),
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe')
  ].filter(Boolean);
  return candidates.find(existsSync);
}

function openInvitationWithSound() {
  const chrome = findChrome();
  if (!chrome) throw new Error('Google Chrome was not found.');
  const profile = join(tmpdir(), 'Brinda-Chaitanya-Invitation-Chrome-Autoplay');
  const browser = spawn(chrome, [
    `--user-data-dir=${profile}`,
    '--autoplay-policy=no-user-gesture-required',
    '--no-first-run',
    '--no-default-browser-check',
    '--new-window',
    url
  ], { detached: true, stdio: 'ignore' });
  browser.unref();
  console.log(`Opening the invitation with synchronized video and music: ${url}`);
}

let nextProcess = null;
if (!(await isServerReady())) {
  if (!existsSync(nextCli)) throw new Error('Next.js dependencies are missing. Run npm install first.');
  nextProcess = spawn(process.execPath, [nextCli, 'dev', '-p', String(port)], {
    cwd: projectRoot,
    env: process.env,
    stdio: 'inherit'
  });
}

await waitForServer();
openInvitationWithSound();

if (nextProcess) {
  const exitCode = await new Promise(resolve => nextProcess.once('exit', code => resolve(code ?? 0)));
  process.exitCode = exitCode;
}
