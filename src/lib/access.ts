import { cookies } from 'next/headers';
import { cache } from 'react';
import { classroomCookie, verifyClassroomToken } from './access-client';
export type { AccessResult } from './access-client';
// Request-local memoization only; never cache a buyer's authorization across requests.
export const authorizeCourse = cache(async () => verifyClassroomToken((await cookies()).get(classroomCookie)?.value || ''));
