import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "study-centre-data.s3.ap-southeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins:["*"]
};

export default nextConfig;
