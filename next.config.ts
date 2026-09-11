import type { NextConfig } from "next";

// On GitHub Pages the site lives under https://<user>.github.io/<repo>/, so every
// asset and route needs that prefix. Locally the variable is unset and the app
// serves from the root as usual.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
