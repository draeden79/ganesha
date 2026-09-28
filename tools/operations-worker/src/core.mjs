import { spawn } from 'node:child_process';

export const REPO = 'draeden79/ganesha';
export const REPO_URL = 'https://github.com/draeden79/ganesha.git';
export const TEAM_ID = 'team_Mrwau3ah68XjkRlVpY9fldxg';
export const TEAM_SCOPE = 'manuel-guimaraes-pinto-filhos-projects';
export const DEVOPS_PROJECT_ID = 'prj_DbGGndK0VJ7S8CKPTP2DLk8JWVu4';
export const SHA = /^[a-f0-9]{40}$/;

export class OperationError extends Error {
  constructor(code) { super(code); this.code = code; }
}
export function requireCondition(condition, code = 'invalid_operation') {
  if (!condition) throw new OperationError(code);
}
export function validRef(value) {
  return typeof value === 'string' && value.length <= 180 &&
    /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value) &&
    !value.includes('..') && !value.includes('//') && !value.endsWith('/') &&
    value.split('/').every(p => !p.startsWith('.') && !p.endsWith('.') && !p.endsWith('.lock'));
}
export function validateOperation(op) {
  requireCondition(op && typeof op === 'object' && !Array.isArray(op));
  const fields = {
    'github-status': ['kind','ref'], 'github-pr': ['kind','head','base','title'],
    'vercel-deploy': ['kind','sha','target'], 'vercel-status': ['kind','target'],
    'dns-check': ['kind','domain'],
  }[op.kind];
  requireCondition(fields && Object.keys(op).every(k => fields.includes(k)) && fields.every(k => Object.hasOwn(op,k)));
  if (op.kind === 'github-status') requireCondition(validRef(op.ref));
  if (op.kind === 'github-pr') {
    requireCondition(validRef(op.head) && validRef(op.base) && op.head !== op.base);
    requireCondition(typeof op.title === 'string' && op.title.trim().length > 0 && op.title.length <= 200 && !/[\x00-\x1f\x7f]/.test(op.title));
  }
  if (op.kind === 'vercel-deploy') requireCondition(SHA.test(op.sha) && op.target === 'classroom');
  if (op.kind === 'vercel-status') requireCondition(['classroom','devops'].includes(op.target));
  if (op.kind === 'dns-check') requireCondition(op.domain === 'iganesha.online');
  return op;
}
export function validateConfig(config) {
  requireCondition(/^prj_[A-Za-z0-9]+$/.test(config.projectId || ''), 'invalid_config');
  requireCondition(config.projectId !== DEVOPS_PROJECT_ID && config.teamId === TEAM_ID && config.scope === TEAM_SCOPE, 'invalid_config');
  requireCondition(typeof config.vercelCli === 'string' && /[\\/]vercel[\\/]dist[\\/]vc\.js$/.test(config.vercelCli), 'invalid_config');
  return config;
}
export function childEnvironment(env = process.env) {
  const allowed = new Set(['PATH','PATHEXT','SYSTEMROOT','WINDIR','COMSPEC','TEMP','TMP','USERPROFILE','HOME','HOMEDRIVE','HOMEPATH','APPDATA','LOCALAPPDATA','PROGRAMFILES','PROGRAMFILES(X86)','PROGRAMDATA']);
  return { ...Object.fromEntries(Object.entries(env).filter(([k]) => allowed.has(k.toUpperCase()))),
    CI:'1', GH_PROMPT_DISABLED:'1', GIT_TERMINAL_PROMPT:'0', NO_COLOR:'1', VERCEL_TELEMETRY_DISABLED:'1' };
}
export function runCommand(executable, args, { cwd, env = childEnvironment(), signal, timeoutMs = 120000, maxBytes = 8 * 1024 * 1024 } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(new OperationError('interrupted')); return; }
    let child;
    try { child = spawn(executable, args, { cwd, env, shell:false, windowsHide:true, stdio:['ignore','pipe','pipe'] }); }
    catch { reject(new OperationError('command_unavailable')); return; }
    const output = []; let bytes = 0; let failure;
    const stop = code => { failure ||= new OperationError(code); child.kill(); };
    const abort = () => stop('interrupted');
    signal?.addEventListener('abort', abort, {once:true});
    const timer = setTimeout(() => stop('command_timeout'), timeoutMs);
    child.stdout.on('data', chunk => { bytes += chunk.length; if (bytes > maxBytes) stop('command_output_limit'); else output.push(chunk); });
    child.stderr.on('data', chunk => { bytes += chunk.length; if (bytes > maxBytes) stop('command_output_limit'); });
    child.on('error', () => { failure ||= new OperationError('command_unavailable'); });
    child.on('close', code => {
      clearTimeout(timer); signal?.removeEventListener('abort', abort);
      if (failure) reject(failure);
      else if (code !== 0) reject(new OperationError('command_failed'));
      else resolve(Buffer.concat(output).toString('utf8'));
    });
  });
}
export function parseJson(raw) {
  try { return JSON.parse(raw); } catch { throw new OperationError('invalid_service_response'); }
}
export function safeDeploymentUrl(value) {
  const url = new URL(value.startsWith('https://') ? value : `https://${value}`);
  requireCondition(url.protocol === 'https:' && /^[a-z0-9-]+\.vercel\.app$/.test(url.hostname) && !url.username && !url.password && !url.port && url.pathname === '/' && !url.search && !url.hash, 'invalid_deployment_url');
  return url.origin;
}
export function validateArchiveTree(raw) {
  let count = 0;
  for (const entry of raw.split('\0').filter(Boolean)) {
    const tab = entry.indexOf('\t');
    const [mode, type] = entry.slice(0,tab).split(' '); const path = entry.slice(tab+1);
    requireCondition(tab > 0 && ['100644','100755'].includes(mode) && type === 'blob', 'unsafe_archive_entry');
    requireCondition(path.length <= 220 && !/[\\:\x00-\x1f\x7f]/.test(path), 'unsafe_archive_path');
    for (const part of path.split('/')) {
      requireCondition(part && part !== '.' && part !== '..' && !/[. ]$/.test(part) &&
        !/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(part) &&
        !/^\.git$/i.test(part) && !/^\.vercel$/i.test(part), 'unsafe_archive_path');
      requireCondition(!/^\.env(?:\.|$)/i.test(part) || /^\.env\.(example|sample|template)$/i.test(part), 'archive_contains_environment');
    }
    count++;
  }
  requireCondition(count > 0 && count <= 30000, 'invalid_archive_size');
}
