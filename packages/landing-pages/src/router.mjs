const agents = new Set(['devops', 'landing-pages']);
const channelId = value => String(value ?? '').replace(/^slack:/, '').split(':')[0];

/** Pure routing only. Verify workspace/signature and persist thread binding in the host. */
export function routeAgent(input, config) {
  const landing = channelId(config.landingPagesChannelId);
  const devops = channelId(config.devopsChannelId);
  if (!/^[CG][A-Z0-9]+$/.test(landing) || !/^[CG][A-Z0-9]+$/.test(devops) || landing === devops) {
    throw new Error('Two distinct Slack channel IDs are required');
  }
  if (input.author.isMe) return { status: 'ignored' };
  if (input.author.isBot !== false && !(input.author.isBot === true && input.mentioned === true &&
    (config.allowedAgentUserIds ?? []).includes(input.author.userId))) return { status: 'ignored' };
  const currentChannel = channelId(input.channelId);
  const channelAgent = currentChannel === landing ? 'landing-pages' : currentChannel === devops ? 'devops' : undefined;
  if (!input.isDM && !channelAgent) return { status: 'ignored' };
  const cleaned = String(input.text ?? '').replace(/<@[A-Z0-9]+>/g, '').trim();
  const selector = /^(devops|landing-pages)\s*:\s*/i.exec(cleaned);
  const selected = selector?.[1].toLowerCase();
  const pinned = input.assignedAgent;
  if (pinned !== undefined && !agents.has(pinned)) throw new Error('Invalid stored agent binding');
  if ((pinned && selected && pinned !== selected) || (channelAgent && selected && channelAgent !== selected) ||
    (pinned && channelAgent && pinned !== channelAgent)) {
    return { status: 'conflict', message: 'This thread belongs to another Ganesha agent. Start a new thread in the appropriate channel, or a new DM thread with devops: or landing-pages:.' };
  }
  const agent = pinned ?? channelAgent ?? selected;
  if (!agent) return { status: 'choose', message: 'Which Ganesha agent do you need? Start your request with devops: or landing-pages:.' };
  return { status: 'routed', agent, text: selector ? cleaned.slice(selector[0].length).trim() : cleaned };
}
