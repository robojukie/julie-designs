import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // 👈 Prevent the Next.js compiler from stripping logs locally
    removeConsole: false,
  },
};
export default nextConfig;
