import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/classroom', destination: 'https://ganesha-classroom.vercel.app/classroom' },
      { source: '/classroom/:path*', destination: 'https://ganesha-classroom.vercel.app/classroom/:path*' },
    ];
  },
  transpilePackages: [
    "@chat-adapter/slack",
    "@chat-adapter/state-redis",
    "chat",
  ],
};

export default withWorkflow(nextConfig);
