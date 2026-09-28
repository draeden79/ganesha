export function GET() {
  const configured = ['SLACK_CONNECTOR', 'SLACK_TEAM_ID', 'REDIS_URL'].every((key) => Boolean(process.env[key]));
  return Response.json({ service: 'ganesha-devops', status: configured ? 'configured' : 'setup-required', mode: 'planning' },
    { status: configured ? 200 : 503, headers: { 'Cache-Control': 'no-store' } });
}
