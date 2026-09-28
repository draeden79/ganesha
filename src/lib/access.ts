/** Server-only boundary. Replace the adapter with the verified identity provider. */
export type AccessResult =
  | { status: "authorized"; userId: string; entitlement: "ganesha-course"; expiresAt: string }
  | { status: "unauthenticated" | "forbidden" | "unconfigured" };
export interface CourseAccessAdapter { authorize(): Promise<AccessResult> }
const unconfigured: CourseAccessAdapter = { async authorize() { return { status: "unconfigured" }; } };
export async function authorizeCourse(): Promise<AccessResult> {
  // Deliberately fail closed. Demo state, URL parameters, and client IDs never grant access.
  return unconfigured.authorize();
}
