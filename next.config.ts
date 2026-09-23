import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // The journal's artwork is still served from the live site's media library
    // while the articles themselves are rebuilt here.
    remotePatterns: [{ protocol: "https", hostname: "beyondbancard.com", pathname: "/wp-content/uploads/**" }],
  },
  // Keep every route out of search indexes until the rebuild is published.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
