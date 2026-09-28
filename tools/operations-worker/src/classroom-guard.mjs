import policy from './classroom-release.json' with { type: 'json' };
import { requireCondition, SHA } from './core.mjs';

export const CLASSROOM_RELEASE = Object.freeze({ ...policy, blobs: Object.freeze(policy.blobs) });
export const CHECKOUT_URL = 'https://www.iganesha.online/checkout';
const protectedPath = path => /(?:^|\/)\.gitattributes$/i.test(path) || /^(src\/|contracts\/|scripts\/|app\/|pages\/|(?:next|vercel|tsconfig)\.|(?:middleware|proxy)\.|package(?:-lock)?\.json$|pnpm-(?:lock\.yaml|workspace\.yaml)$|yarn\.lock$|bun\.lockb?$|\.(?:npmrc|vercelignore)$)/i.test(path);

// This reviewed policy lives in the worker, not in the untrusted candidate archive.
// Content-only releases may advance; changes to executable code/config require review.
export function validateClassroomGuard(raw) {
  requireCondition(SHA.test(CLASSROOM_RELEASE.minimumCommit), 'classroom_guard_policy_invalid');
  const expected = CLASSROOM_RELEASE.blobs;
  const seen = new Set();
  for (const entry of raw.split('\0').filter(Boolean)) {
    const [metadata, path] = entry.split('\t');
    const [mode, type, blob] = metadata.split(' ');
    if (!protectedPath(path || '')) continue;
    requireCondition(!seen.has(path) && type === 'blob' && ['100644', '100755'].includes(mode) &&
      SHA.test(blob) && Object.hasOwn(expected, path) && expected[path] === blob, 'classroom_guard_mismatch');
    seen.add(path);
  }
  requireCondition(Object.keys(expected).every(path => seen.has(path)), 'classroom_guard_missing');
}

export async function verifyAnonymousClassroom(fetchImpl, origin, signal) {
  const pages = ['/', '/classroom', '/classroom/en', '/classroom/pt-BR', '/classroom/ar', '/course/en', '/learn/en', '/classroom/exercises/report.py'];
  const probes = [
    ...pages.map(path => ({ path, status: 303 })),
    { path: '/classroom/en?_rsc=guard-check', status: 303, headers: { RSC: '1' } },
    { path: '/api/session', status: 401 },
    { path: '/api/progress', status: 401 },
  ];
  for (const probe of probes) {
    const response = await fetchImpl(origin + probe.path, {
      redirect: 'manual', headers: probe.headers,
      signal: AbortSignal.any([signal || new AbortController().signal, AbortSignal.timeout(20000)]),
    });
    try {
      requireCondition(response.status === probe.status, 'classroom_anonymous_access_not_blocked');
      if (probe.status === 303) requireCondition(response.headers.get('location') === CHECKOUT_URL, 'classroom_checkout_redirect_invalid');
      requireCondition(/(?:^|[,\s])no-store(?:$|[,\s])/i.test(response.headers.get('cache-control') || ''), 'classroom_private_cache_required');
    } finally { await response.body?.cancel(); }
  }
  return probes.length;
}
