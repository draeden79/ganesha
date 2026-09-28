export function GET() {
  const configured = ['SLACK_CONNECTOR', 'SLACK_TEAM_ID', 'SLACK_BOT_USER_ID', 'SLACK_LANDING_PAGES_CHANNEL_ID', 'SLACK_DEVOPS_CHANNEL_ID', 'REDIS_URL', 'PUBLIC_BASE_URL'].every((key) => Boolean(process.env[key]));
  return Response.json({ service: 'ganesha', status: configured ? 'configured' : 'setup-required', mode: 'noncommercial-prototype', agents: { devops: 'planning', landingPages: 'demo-publication' } },
    { status: configured ? 200 : 503, headers: { 'Cache-Control': 'no-store' } });
}
