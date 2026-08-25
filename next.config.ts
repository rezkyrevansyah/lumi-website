import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [new URL("https://zrddtvjwbjybloezczha.supabase.co/storage/v1/object/public/**")],
  },
};

export default nextConfig;
