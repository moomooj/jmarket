import { NextFetchEvent, NextRequest, userAgent } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname.startsWith("/")) {
    const { isBot } = userAgent(request);
    if (!isBot) {
      return new Response("봇은 들어올 수 없어요", { status: 403 });
    }
  }
}
