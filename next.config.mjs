/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = { "ssh2-sftp-client": "commonjs ssh2-sftp-client" };
    }
    return config;
  },
};

export default nextConfig;
