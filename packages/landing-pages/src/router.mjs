const agents = new Set(['devops', 'landing-pages']);
const channelId = value => String(value ?? '').replace(/^slack:/, '').split(':')[0];

/** Pure routing only. Verify workspace/signature and persist thread binding in the host. */
export function routeAgent(input, config) {
  if (config.agent !== undefined && !agents.has(config.agent)) throw new Error('Invalid dedicated agent');
  const landing = channelId(config.landingPagesChannelId);
  const devops = channelId(config.devopsChannelId);
  if (input.author.isMe) return { status: 'ignored' };
  if (input.author.isBot !== false && !(input.author.isBot === true && input.mentioned === true &&
    (config.allowWorkspaceBots === true || (config.allowedAgentUserIds ?? []).includes(input.author.userId)))) return { status: 'ignored' };
  const currentChannel = channelId(input.channelId);
  // Channel IDs are legacy defaults, never an access allowlist. Dedicated identity wins.
  const channelAgent = config.agent ? undefined : currentChannel === landing ? 'landing-pages' : currentChannel === devops ? 'devops' : undefined;
  const cleaned = String(input.text ?? '').replace(/<@[A-Z0-9]+>/g, '').trim();
  const selector = /^(devops|landing-pages)\s*:\s*/i.exec(cleaned);
  const selected = selector?.[1].toLowerCase();
  const pinned = input.assignedAgent;
  if (pinned !== undefined && !agents.has(pinned)) throw new Error('Invalid stored agent binding');
  if ((pinned && selected && pinned !== selected) || (channelAgent && selected && channelAgent !== selected) ||
    (pinned && channelAgent && pinned !== channelAgent) ||
    (config.agent && ((pinned && pinned !== config.agent) || (selected && selected !== config.agent)))) {
    return { status: 'conflict', message: config.agent
      ? 'This thread belongs to another Ganesha agent. Mention the requested agent in a new thread in any workspace channel, or open its DM. Existing thread history stays with its original agent.'
      : 'This thread belongs to another Ganesha agent. Start a new thread with devops: or landing-pages:.' };
  }
  const agent = config.agent ?? pinned ?? channelAgent ?? selected;
  if (!agent) return { status: 'choose', message: 'Which Ganesha agent do you need? Start your request with devops: or landing-pages:.' };
  return { status: 'routed', agent, text: selector ? cleaned.slice(selector[0].length).trim() : cleaned };
}
