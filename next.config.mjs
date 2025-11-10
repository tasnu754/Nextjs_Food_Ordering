/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: [
      "image/webp",
      "image/avif",
      "image/jpeg",
      "image/png",
      "image/jfif",
    ],
    domains: [],
  },
};

export default nextConfig;
