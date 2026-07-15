import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "robohash.org",
      },
      {
        protocol: "https",
        hostname: "placecats.com",
      },
      { protocol: "https", 
        hostname: "placecats.com" 
      },
      { protocol: "https", 
        hostname: "media2.dev.to" 
      },
      { protocol: "https", 
        hostname: "avatars.githubusercontent.com"
       },
    ],
  },
};

export default nextConfig;