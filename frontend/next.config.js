const withTM = require('next-transpile-modules')(['@pcd/passport-interface']);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
});

module.exports = nextConfig;

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};