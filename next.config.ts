import type { NextConfig } from "next";

const PRIMARY_SITE_URL = "https://me.lydev.id";
const LEGACY_SITE_HOSTS = ["zyilzz.my.id", "www.zyilzz.my.id"];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_SITE_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${PRIMARY_SITE_URL}/:path*`,
      statusCode: 301,
    }));
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
