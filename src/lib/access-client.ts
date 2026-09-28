export const classroomCookie = 'ganesha_classroom';
export const tokenPattern = /^g_[A-Za-z0-9_-]{43}$/;
export type AccessResult =
  | { status: 'authorized'; userId: string; entitlement: 'ganesha-course'; expiresAt: string }
  | { status: 'unauthenticated' | 'forbidden' | 'unconfigured' };
export async function verifyClassroomToken(token: string, options: { serviceToken?: string; fetch?: typeof fetch } = {}): Promise<AccessResult> {
  if (!tokenPattern.test(token)) return { status: 'unauthenticated' };
  const secret = options.serviceToken ?? process.env.CLASSROOM_SERVICE_TOKEN ?? '';
  if (!/^[a-f0-9]{64}$/.test(secret)) return { status: 'unconfigured' };
  try {
    const response = await (options.fetch || fetch)('https://ganesha-devops.vercel.app/api/classroom/access', {
      method: 'POST', cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ token }),
    });
    if (!response.ok) return { status: 'unconfigured' };
    const data = await response.json() as { authorized?: boolean; courseId?: string; userId?: string };
    if (data.authorized !== true || data.courseId !== 'course.first-site' || !/^[a-f0-9]{64}$/.test(data.userId || '')) return { status: 'forbidden' };
    return { status: 'authorized', userId: data.userId!, entitlement: 'ganesha-course', expiresAt: new Date(Date.now() + 30000).toISOString() };
  } catch { return { status: 'unconfigured' }; }
}
