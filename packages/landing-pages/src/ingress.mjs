import { routeAgent } from './router.mjs';

const ok = () => new Response('ok');
export function createSharedIngress(config, deps) {
  if (!/^T[A-Z0-9]+$/.test(config.teamId)) throw new Error('Invalid Slack workspace configuration');
  if (config.agent !== undefined && !['devops', 'landing-pages'].includes(config.agent)) throw new Error('Invalid dedicated agent');
  return async function ingress(request) {
    let body;
    try {
      const reader = request.clone().body?.getReader();
      if (!reader) return new Response('Invalid event', { status: 400 });
      const chunks = []; let bytes = 0;
      for (;;) {
        const { done, value } = await reader.read(); if (done) break;
        bytes += value.length;
        if (bytes > 65536) { void reader.cancel(); return new Response('Event too large', { status: 413 }); }
        chunks.push(value);
      }
      body = Buffer.concat(chunks).toString('utf8');
      if (!await deps.verify(request, body)) return new Response('Unauthorized', { status: 401 });
    } catch { return new Response('Verification unavailable', { status: 503 }); }
    let envelope;
    try { envelope = JSON.parse(body); } catch { return new Response('Invalid event', { status: 400 }); }
    if (config.appId && envelope.api_app_id && envelope.api_app_id !== config.appId) return new Response('Forbidden', { status: 403 });
    // Connect-authenticated Slack URL verification can legitimately omit team_id.
    if (envelope.type === 'url_verification') {
      return typeof envelope.challenge === 'string' && envelope.challenge.length <= 1000
        ? Response.json({ challenge: envelope.challenge }) : new Response('Invalid challenge', { status: 400 });
    }
    if (!/^[UW][A-Z0-9]+$/.test(config.botUserId) ||
      (config.agent && !/^A[A-Z0-9]+$/.test(config.appId ?? ''))) {
      return new Response('Ganesha routing setup required', { status: 503 });
    }
    // Dedicated identities must not accept a missing or another application's identity.
    if (config.agent && envelope.api_app_id !== config.appId) return new Response('Forbidden', { status: 403 });
    if (envelope.team_id !== config.teamId || envelope.is_ext_shared_channel === true) return new Response('Forbidden', { status: 403 });
    const event = envelope.event;
    if (envelope.type !== 'event_callback' || !event || !['app_mention', 'message'].includes(event.type) ||
      (event.subtype && event.subtype !== 'bot_message') || event.hidden || event.is_ext_shared_channel === true ||
      !/^[CDG][A-Z0-9]+$/.test(event.channel ?? '') ||
      (!/^[UW][A-Z0-9]+$/.test(event.user ?? '') && !/^B[A-Z0-9]+$/.test(event.bot_id ?? '')) ||
      !/^\d+\.\d+$/.test(event.ts ?? '') || !/^\d+\.\d+$/.test(event.thread_ts ?? event.ts ?? '') ||
      typeof event.text !== 'string' || event.user === config.botUserId) return ok();
    const isDM = event.channel.startsWith('D');
    const mentioned = event.text.includes(`<@${config.botUserId}>`);
    const actorId = event.user || event.bot_id;
    const threadKey = `${config.teamId}:${event.channel}:${event.thread_ts ?? event.ts}`;
    const requestKey = `${config.teamId}:${event.channel}:${event.ts}`;
    let claim;
    try {
      let assignedAgent = await deps.store.getBinding(threadKey);
      // Both apps may now share a channel; only the thread's agent follows passive human replies.
      if (config.agent && assignedAgent && assignedAgent !== config.agent && !mentioned) return ok();
      if (!isDM && !mentioned && !(event.thread_ts && assignedAgent)) return ok();
      if (!isDM && !mentioned && assignedAgent === 'devops' && !await deps.isDevOpsSubscribed(threadKey)) return ok();
      const author = event.bot_id
        ? await deps.lookupBot?.(event.bot_id, event.app_id)
        : await deps.lookupUser(event.user);
      if (!author || author.deleted || typeof author.isBot !== 'boolean') return ok();
      if (author.appId === config.appId || author.userId === config.botUserId) return ok();
      const input = { channelId: event.channel, isDM, text: event.text, assignedAgent, mentioned,
        author: { userId: actorId, isBot: author.isBot, isMe: false } };
      let route = routeAgent(input, config);
      if (route.status === 'ignored') return ok();
      // Legacy allowlists grant Landing Pages only; the explicit workspace policy enables both roles.
      if (author.isBot && (route.status !== 'routed' || (route.agent !== 'landing-pages' && config.allowWorkspaceBots !== true))) return ok();
      if (route.status === 'routed') {
        assignedAgent = await deps.store.bind(threadKey, route.agent);
        route = routeAgent({ ...input, assignedAgent }, config);
      }
      const tooLong = event.text.length > 12000;
      const landingHelp = route.status === 'routed' && route.agent === 'landing-pages' && ['', 'help', 'status'].includes(route.text.toLowerCase());
      const devopsControl = route.status === 'routed' && route.agent === 'devops' &&
        (['', 'help', '/help', 'status', 'stop', 'ajuda', 'encerrar', 'parar'].includes(route.text.toLowerCase()) ||
          /^ops(?:\s|$)/i.test(route.text) || deps.isDevOpsOperation?.(route.text) === true);
      claim = await deps.store.claim(requestKey, { userId: actorId, charge: route.status === 'routed' && !tooLong && !landingHelp && !devopsControl });
      if (claim.status === 'done') return ok();
      if (claim.status === 'busy') return new Response('Retry event', { status: 503, headers: { 'Retry-After': '1' } });
      let response = ok();
      if (claim.limit || tooLong || landingHelp || route.status !== 'routed') {
        const text = landingHelp ? 'Landing Pages · Send the course subject, audience, learning outcome and curriculum. I will create a Ganesha demo page in English and return its URL in this thread. This is a noncommercial prototype without payments.'
          : tooLong ? 'Please shorten this message to 12,000 characters or fewer.'
          : claim.limit === 'daily' ? 'Ganesha has reached its daily request limit. It resets at midnight UTC.'
          : claim.limit === 'cooldown' ? 'This earlier request was rejected by a retired cooldown. Send it again; new requests are no longer discarded for arriving close together.'
          : route.message;
        await deps.send({ threadKey, body: text });
      } else if (route.agent === 'landing-pages') {
        await deps.startLanding({ requestKey, threadKey, text: route.text, actorId, now: Date.now() });
      } else {
        response = await deps.dispatchDevOps(request);
        if (!response.ok) throw new Error('DevOps dispatch failed');
      }
      await deps.store.finish(requestKey, claim.token);
      return response;
    } catch {
      if (claim?.token) { try { await deps.store.release(requestKey, claim.token); } catch {} }
      return new Response('Ganesha temporarily unavailable; retry this event', { status: 503 });
    }
  };
}
