import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyClassroomToken } from '../src/lib/access-client';
const token = `g_${'a'.repeat(43)}`;
const secret = 'b'.repeat(64);
test('No URL flag, browser identifier or missing service configuration grants access', async () => {
  assert.equal((await verifyClassroomToken('paid=true')).status, 'unauthenticated');
  assert.equal((await verifyClassroomToken(token, { serviceToken: '' })).status, 'unconfigured');
});
test('Origin verifies the exact course through a fixed authenticated server endpoint without caching', async () => {
  const result = await verifyClassroomToken(token, { serviceToken: secret, fetch: async (input, options) => {
    assert.equal(input, 'https://ganesha-devops.vercel.app/api/classroom/access');
    assert.equal(options?.cache, 'no-store'); assert.equal(options?.redirect, 'error');
    assert.equal((options?.headers as Record<string, string>).Authorization, `Bearer ${secret}`);
    assert.equal(JSON.parse(options!.body as string).token, token);
    return Response.json({ authorized: true, courseId: 'course.first-site', userId: 'c'.repeat(64) });
  } });
  assert.equal(result.status, 'authorized');
});
test('Revoked access, a different course, outage and invalid responses fail closed at the origin', async () => {
  for (const data of [{ authorized: false }, { authorized: true, courseId: 'other', userId: 'c'.repeat(64) }, { authorized: true }]) {
    assert.equal((await verifyClassroomToken(token, { serviceToken: secret, fetch: async () => Response.json(data) })).status, 'forbidden');
  }
  assert.equal((await verifyClassroomToken(token, { serviceToken: secret, fetch: async () => { throw new Error('offline'); } })).status, 'unconfigured');
  assert.equal((await verifyClassroomToken(token, { serviceToken: secret, fetch: async () => new Response('', { status: 503 }) })).status, 'unconfigured');
});
