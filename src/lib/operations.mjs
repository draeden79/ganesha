const refPattern = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,179}$/;
const validRef = value => typeof value === 'string' && refPattern.test(value) && !value.includes('..') && !value.endsWith('/') && !value.includes('//') &&
  value.split('/').every(part => !part.startsWith('.') && !part.endsWith('.') && !part.endsWith('.lock'));
export const OPERATIONS_HELP = `DevOps · Executable operations for draeden79/ganesha:
ops github status [branch-or-commit]
ops github pr {"head":"codex/example","base":"main","title":"Release description"}
ops vercel status classroom
ops vercel status devops
ops dns status iganesha.online
ops deploy classroom <full 40-character commit SHA>
ops retry <full job ID> (same thread, failed operations only)

Mention Gdevops in any workspace channel. Bots must mention it on every request. Deployments use the separate ganesha-classroom project and commits from codex/diretor-integracao. Accepted jobs wait durably if the operations worker is offline. Results and URLs return in this thread. Purchases, secret changes and arbitrary shell commands are outside these operations.`;

/** Natural DNS requests select a fixed read-only diagnostic, never model-generated shell or DNS edits. */
export function parseOperation(text) {
  const value = String(text).trim();
  if (!/^ops(?:\s|$)/i.test(value) && /\biganesha\.online\b/i.test(value) &&
    /\b(dns|domain|dom[ií]nio|certificate|certificado|https)\b/i.test(value) &&
    /\b(fix|solve|repair|check|diagnose|verify|correct|resolve|corrigir|corrija|resolver|resolva|verificar|verifique|diagnosticar)\b/i.test(value)) {
    return {kind:'dns-check',domain:'iganesha.online'};
  }
  if (!/^ops(?:\s|$)/i.test(value)) return null;
  let match;
  if (/^ops dns (?:status|check) iganesha\.online$/i.test(value)) return {kind:'dns-check',domain:'iganesha.online'};
  if ((match = /^ops retry ([a-f0-9]{64})$/i.exec(value))) return { kind: 'retry', jobId: match[1].toLowerCase() };
  if ((match = /^ops github status(?: ([^\s]+))?$/i.exec(value))) {
    const ref = match[1] || 'main';
    if (validRef(ref)) return { kind: 'github-status', ref };
  }
  if ((match = /^ops vercel status (classroom|devops)$/i.exec(value))) return { kind: 'vercel-status', target: match[1].toLowerCase() };
  if ((match = /^ops deploy classroom ([a-f0-9]{40})$/i.exec(value))) return { kind: 'vercel-deploy', target: 'classroom', sha: match[1].toLowerCase() };
  if ((match = /^ops github pr (\{[^]*\})$/i.exec(value))) {
    try {
      const args = JSON.parse(match[1]);
      if (args && Object.keys(args).sort().join(',') === 'base,head,title' && validRef(args.head) && validRef(args.base) && args.head !== args.base &&
        typeof args.title === 'string' && args.title.length > 0 && args.title.length <= 150 && !/[\r\n\x00-\x1f]/.test(args.title)) {
        return { kind: 'github-pr', head: args.head, base: args.base, title: args.title };
      }
    } catch {}
  }
  throw new Error(OPERATIONS_HELP);
}
