import type { NextConfig } from "next";

const config: NextConfig = {
  // Keep the public landing's Next assets separate from this classroom service.
  assetPrefix: "/classroom",
  distDir: process.env.GANESHA_BUILD_DIR || ".next",
  outputFileTracingIncludes: { "/*": ["./content/curriculum/*.json", "./content/locales/*.json"] },
  async rewrites() {
    return { beforeFiles: [
      { source: "/classroom/_next/:path*", destination: "/_next/:path*" },
      { source: "/classroom/images/:path*", destination: "/images/:path*" },
    ] };
  },
};
export default config;
