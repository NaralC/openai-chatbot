import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limit";

export default async function middleWare(req: NextRequest) {
    const ip = req.ip ?? '127.0.0.1';

    try {
        const { success } = await rateLimiter.limit(ip);

        if (!success) return new NextResponse('You are writing too fast!')
        return NextResponse.next();
    } catch (error) {
        return new NextResponse("Something went wrong. Try again later!")
    }
}

export const config = {
    matcher: '/api/message/:path*'
}
