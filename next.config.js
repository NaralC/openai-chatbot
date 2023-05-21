/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.NODE_ENV.OPENAI_API_KEY
    },
    experimental: {
        runtime: 'experimental-edge',
    },
}

module.exports = nextConfig
