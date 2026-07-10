import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? "/invite-maker" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/invite-maker" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
