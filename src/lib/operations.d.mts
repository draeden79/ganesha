export type Operation = { kind: 'github-status'; ref: string } | { kind: 'github-pr'; head: string; base: string; title: string } | { kind: 'vercel-status'; target: 'classroom' | 'devops' } | { kind: 'vercel-deploy'; target: 'classroom'; sha: string };
export const OPERATIONS_HELP: string;
export function parseOperation(text: string): Operation | {kind:'retry';jobId:string} | null;
