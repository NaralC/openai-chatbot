import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, '10 s'), // 1 request per 10 seconds
    prefix: "@upstash/ratelimit"
})