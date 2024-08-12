/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  swcMinify: true,
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
