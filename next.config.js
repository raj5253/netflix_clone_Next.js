/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**i.ytimg.com",
      },
    ],
  },
};

module.exports = nextConfig;

//config got changed after image addition. so restart the server.
