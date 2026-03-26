import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vernacular/tokens-core", "@vernacular/control-panel"],
};

export default nextConfig;
