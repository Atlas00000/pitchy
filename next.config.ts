import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" is used for Docker only — remove for Vercel
  ...(process.env.DOCKER_BUILD === "1" && { output: "standalone" }),
};

export default nextConfig;
