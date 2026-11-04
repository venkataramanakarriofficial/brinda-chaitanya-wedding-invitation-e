import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const port = 3002;
const url = `http://localhost:${port}/`;
const projectRoot = process.cwd();
const nextCli = join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');

async function isServerReady() {
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(1500) })).ok;
  } catch { return false; }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (await isServerReady()) return;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error(`Invitation did not start at ${url}. Check the terminal for errors.`);
}

function openBrowser() {
  if (process.platform === 'win32') {
    // Launch the visitor's default browser; media permissions remain respected.
    const child = spawn('cmd', ['/c', 'start', '', url], { windowsHide: true, stdio: 'ignore' });
    child.on('error', () => {});
    child.unref();
  } else if (process.platform === 'darwin') {
    const child = spawn('open', [url], { stdio: 'ignore' });
    child.on('error', () => {});
    child.unref();
  } else {
    const child = spawn('xdg-open', [url], { stdio: 'ignore' });
    child.on('error', () => {});
    child.unref();
  }
  console.log(`Invitation ready at ${url} (tap the music button to play audio).`);
}

if (!existsSync(nextCli)) throw new Error('Next.js dependencies are missing. Run npm install first.');
let server = null;
if (!(await isServerReady())) {
  server = spawn(process.execPath, [nextCli, 'dev', '-p', String(port)], {
    cwd: projectRoot, env: process.env, stdio: 'inherit'
  });
}
await waitForServer();
openBrowser();
if (server) process.exitCode = await new Promise(resolve => server.once('exit', code => resolve(code ?? 0)));
