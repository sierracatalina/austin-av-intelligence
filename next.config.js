/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_SOURCE_DB: process.env.NOTION_SOURCE_DB,
    NOTION_SCRIPTS_DB: process.env.NOTION_SCRIPTS_DB,
    NOTION_ASSETS_DB: process.env.NOTION_ASSETS_DB,
    NOTION_CONFIG_PAGE_ID: process.env.NOTION_CONFIG_PAGE_ID,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
