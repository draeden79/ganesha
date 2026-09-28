export function GET() {
  return Response.json({ service: 'Ganesha', channel: 'Slack', mode: 'noncommercial-prototype', agents: ['DevOps', 'Landing Pages'] });
}
