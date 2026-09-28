import { routeAgent } from './router.mjs';

const ok = () => new Response('ok');
export function createSharedIngress(config, deps) {
  if (!/^T[A-Z0-9]+$/.test(config.teamId)) throw new Error('Invalid Slack workspace configuration');
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
    if (!/^[UW][A-Z0-9]+$/.test(config.botUserId) || !/^C[A-Z0-9]+$/.test(config.landingPagesChannelId) ||
      !/^C[A-Z0-9]+$/.test(config.devopsChannelId) || config.landingPagesChannelId === config.devopsChannelId) {
      return new Response('Ganesha routing setup required', { status: 503 });
    }
    if (envelope.team_id !== config.teamId || envelope.is_ext_shared_channel === true) return new Response('Forbidden', { status: 403 });
    const event = envelope.event;
    if (envelope.type !== 'event_callback' || !event || !['app_mention', 'message'].includes(event.type) ||
      (event.subtype && event.subtype !== 'bot_message') || event.hidden || event.is_ext_shared_channel === true ||
      !/^[CD][A-Z0-9]+$/.test(event.channel ?? '') || !/^[UW][A-Z0-9]+$/.test(event.user ?? '') ||
      !/^\d+\.\d+$/.test(event.ts ?? '') || !/^\d+\.\d+$/.test(event.thread_ts ?? event.ts ?? '') ||
      typeof event.text !== 'string' || event.user === config.botUserId) return ok();
    const isDM = event.channel.startsWith('D');
    if (!isDM && ![config.landingPagesChannelId, config.devopsChannelId].includes(event.channel)) return ok();
    const mentioned = event.text.includes(`<@${config.botUserId}>`);
    const threadKey = `${config.teamId}:${event.channel}:${event.thread_ts ?? event.ts}`;
    const requestKey = `${config.teamId}:${event.channel}:${event.ts}`;
    let claim;
    try {
      let assignedAgent = await deps.store.getBinding(threadKey);
      if (!isDM && !mentioned && !(event.thread_ts && assignedAgent)) return ok();
      if (!isDM && !mentioned && assignedAgent === 'devops' && !await deps.isDevOpsSubscribed(threadKey)) return ok();
      const author = await deps.lookupUser(event.user);
      if (!author || author.deleted || typeof author.isBot !== 'boolean') return ok();
      const input = { channelId: event.channel, isDM, text: event.text, assignedAgent, mentioned,
        author: { userId: event.user, isBot: author.isBot, isMe: false } };
      let route = routeAgent(input, config);
      if (route.status === 'ignored') return ok();
      // Approved external agents may submit course briefs, never infrastructure requests.
      if (author.isBot && (route.status !== 'routed' || route.agent !== 'landing-pages')) return ok();
      if (route.status === 'routed') {
        assignedAgent = await deps.store.bind(threadKey, route.agent);
        route = routeAgent({ ...input, assignedAgent }, config);
      }
      const tooLong = event.text.length > 12000;
      const landingHelp = route.status === 'routed' && route.agent === 'landing-pages' && ['', 'help', 'status'].includes(route.text.toLowerCase());
      const devopsControl = route.status === 'routed' && route.agent === 'devops' &&
        ['', 'help', '/help', 'status', 'stop', 'ajuda', 'encerrar', 'parar'].includes(route.text.toLowerCase());
      claim = await deps.store.claim(requestKey, { userId: event.user, charge: route.status === 'routed' && !tooLong && !landingHelp && !devopsControl });
      if (claim.status === 'done') return ok();
      if (claim.status === 'busy') return new Response('Retry event', { status: 503, headers: { 'Retry-After': '1' } });
      let response = ok();
      if (claim.limit || tooLong || landingHelp || route.status !== 'routed') {
        const text = landingHelp ? 'Landing Pages · Send the course subject, audience, learning outcome and curriculum. I will create a Ganesha demo page in English and return its URL in this thread. This is a noncommercial prototype without payments.'
          : tooLong ? 'Please shorten this message to 12,000 characters or fewer.'
          : claim.limit === 'daily' ? 'Ganesha has reached its daily request limit. It resets at midnight UTC.'
          : claim.limit === 'cooldown' ? 'Please wait ten seconds before sending another request.'
          : route.message;
        await deps.send({ threadKey, body: text });
      } else if (route.agent === 'landing-pages') {
        await deps.startLanding({ requestKey, threadKey, text: route.text, actorId: event.user, now: Date.now() });
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
