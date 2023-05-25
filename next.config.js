/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.NODE_ENV.OPENAI_API_KEY,
        UPSTASH_REDIS_REST_URL: process.env.NODE_ENV.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.NODE_ENV.UPSTASH_REDIS_REST_TOKEN,
    },
}

module.exports = nextConfig
