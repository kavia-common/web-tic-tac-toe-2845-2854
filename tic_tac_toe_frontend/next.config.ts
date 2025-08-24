import type { NextConfig } from "next";

/**
 * Next.js configuration tailored for static export.
 * - output: "export" ensures `next export` compatible output during `next build`.
 * - trailingSlash avoids dynamic redirects in some hosting environments.
 * - reactStrictMode for best practices (safe for static export).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
