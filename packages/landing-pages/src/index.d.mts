export type Course = {
  title: string; eyebrow: string; headline: string[]; introduction: string; overview: string;
  benefits: { title: string; description: string; label: string }[]; journey: string;
  modules: { label: string; title: string; description: string; topics: string[]; practice: string }[];
  audience: { title: string; description: string }[];
  faq: { question: string; answer: string }[]; closing: string;
};
export type Generation = { status: 'ready'; questions: []; course: Course } |
  { status: 'needs_information'; questions: string[]; course: null };
export type Agent = 'devops' | 'landing-pages';
export class GenerationPendingError extends Error { readonly code: 'generation_pending'; readonly retryAfterMs: number; constructor(retryAfterMs?: number); }
export type Route = { status: 'ignored' } | { status: 'choose' | 'conflict'; message: string } |
  { status: 'routed'; agent: Agent; text: string };
export const instructions: string;
export const generationSchema: Record<string, unknown>;
export const courseSchema: Record<string, unknown>;
export const pageHeaders: Record<string, string>;
export function validateGeneration(result: unknown): Generation;
export function validateCourse(course: unknown): Course;
export function renderCourse(course: Course): string;
export function routeAgent(input: { channelId: string; isDM: boolean; text: string; assignedAgent?: Agent;
  mentioned?: boolean; author: { userId: string; isBot: boolean | 'unknown'; isMe: boolean } },
  config: { landingPagesChannelId: string; devopsChannelId: string; allowedAgentUserIds?: string[];
    agent?: Agent; allowWorkspaceBots?: boolean }): Route;
export type PreparedPage = { status: 'needs_information'; requestKey: string; questions: string[]; reply: string } |
  { status: 'ready'; requestKey: string; slug: string; url: string; course: Course; html: string };
export function prepareLandingPage(input: { threadKey: string; requestKey: string; brief: string;
  previousCourse?: Course | null; publicOrigin: string },
  deps: { generate: (input: { requestKey: string; brief: string; previousCourse: Course | null }) => Promise<unknown> }): Promise<PreparedPage>;
export type Notification = { threadKey: string; body: string };
export type JobClaim = { requestKey: string; threadKey: string; token: string; attempt: number; brief: string; previousCourse: Course | null };
export type NotificationClaim = Notification & { id: string; token: string; attempt: number };
/** Implement atomically in durable storage. Every mutation verifies lease ownership/fence. */
export interface LandingStore {
  /** Unique requestKey, immutable thread binding; return false for a duplicate. Commit before HTTP ACK. */
  enqueue(input: { requestKey: string; threadKey: string; text: string; actorId: string; now: number }): Promise<boolean>;
  /** Claim only the oldest nonterminal job in this thread; reclaim expired leases; snapshot prior course/brief. */
  claimJob(requestKey: string, options: { now: number; leaseMs: number }): Promise<JobClaim | null>;
  /** Result, revision, live pointer, completed job, updated brief and one outbox entry in one transaction. */
  completeJob(claim: JobClaim, result: { prepared: PreparedPage; notification: Notification; now: number }): Promise<boolean>;
  /** Leave published state untouched. Retain exhausted jobs and enqueue failure notification atomically. */
  failJob(claim: JobClaim, failure: { code: string; now: number; retryAt: number | null; notification: Notification | null }): Promise<boolean>;
  /** Release the domain lease while local generation is pending, without spending an attempt or changing its snapshot. */
  deferJob(claim: JobClaim, pending: { now: number; retryAt: number }): Promise<boolean>;
  /** Include queued/due-retry/expired-lease jobs so the scheduler can recover after a crash. */
  pendingJobs(options: { now: number; limit: number }): Promise<string[]>;
  /** Public data only: committed HTML, never raw brief, actor, threadKey or credentials. */
  readPage(slug: string): Promise<{ html: string; revision: string } | null>;
  claimNotification(options: { now: number; leaseMs: number; requestKey?: string }): Promise<NotificationClaim | null>;
  ackNotification(claim: NotificationClaim, options: { now: number }): Promise<void>;
  retryNotification(claim: NotificationClaim, options: { now: number; retryAt: number | null }): Promise<void>;
}
export function runLandingJob(requestKey: string, deps: { store: LandingStore; publicOrigin: string; now?: () => number;
  generate: (input: { requestKey: string; brief: string; previousCourse: Course | null }) => Promise<unknown> }): Promise<{ status: string; retryAfterMs?: number }>;
export function deliverLandingNotification(deps: { store: LandingStore; now?: () => number; requestKey?: string;
  send: (message: Notification & { notificationId: string }) => Promise<void> }): Promise<{ status: string }>;
export type RedisLandingStore = LandingStore & {
  jobStatus(requestKey: string): Promise<{ status: string; retryAt?: number; leaseUntil?: number } | null>;
  notificationStatus(requestKey: string): Promise<{ status: string; dueAt: number } | null>;
};
export function createRedisLandingStore(client: {
  eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<unknown>;
  get(key: string): Promise<string | null>;
  zRangeByScore(key: string, min: string, max: number, options: { LIMIT: { offset: number; count: number } }): Promise<string[]>;
}, options?: { namespace?: string }): RedisLandingStore;
export type GatewayClaim = { status: 'done' | 'busy' } | { status: 'claimed'; token: string; limit?: 'daily' | 'cooldown' };
export type SlackUser = { isBot: boolean; deleted: boolean };
export interface GatewayStore {
  getBinding(threadKey: string): Promise<Agent | undefined>;
  bind(threadKey: string, agent: Agent): Promise<Agent>;
  claim(requestKey: string, options: { userId: string; charge: boolean }): Promise<GatewayClaim>;
  finish(requestKey: string, token: string): Promise<void>;
  release(requestKey: string, token: string): Promise<void>;
  getUser(userId: string): Promise<SlackUser | null>;
  cacheUser(userId: string, user: SlackUser): Promise<void>;
}
export type LandingInput = { requestKey: string; threadKey: string; text: string; actorId: string; now: number };
export function createSharedIngress(config: { teamId: string; appId?: string; botUserId: string;
  landingPagesChannelId: string; devopsChannelId: string; allowedAgentUserIds?: string[];
  agent?: Agent; allowWorkspaceBots?: boolean }, deps: {
  store: GatewayStore; verify: (request: Request, body: string) => Promise<boolean>;
  lookupUser: (userId: string) => Promise<SlackUser | null>;
    lookupBot?: (botId: string, appId?: string) => Promise<(SlackUser & { appId?: string; userId?: string }) | null>;
  isDevOpsSubscribed: (threadKey: string) => Promise<boolean>;
  send: (message: Notification) => Promise<unknown>;
  startLanding: (input: LandingInput) => Promise<unknown>;
  dispatchDevOps: (request: Request) => Promise<Response>;
}): (request: Request) => Promise<Response>;
export function createRedisGatewayStore(client: {
  eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<unknown>;
  get(key: string): Promise<string | null>;
  set(key: string, value: string, options?: { NX?: true; EX?: number }): Promise<unknown>;
}, config: { namespace: string; dailyLimit?: number }): GatewayStore;
