import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@chat-adapter/slack",
    "@chat-adapter/state-redis",
    "chat",
  ],
};

export default withWorkflow(nextConfig);
