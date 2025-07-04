import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "ik.imagekit.io",
  //       port: "",
  //     },
  //   ],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs', 'child_process', etc. modules on the client
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        http2: false,
        net: false,
        tls: false,
        os: false,
        path: false,
        stream: false,
        util: false,
        crypto: false,
        zlib: false,
        http: false,
        https: false,
        url: false,
        querystring: false,
        buffer: false,
        assert: false,
      };
    }
    return config;
  },
};

export default nextConfig;
