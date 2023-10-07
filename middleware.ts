import {
  NextFetchEvent,
  NextRequest,
  userAgent,
  NextResponse,
} from "next/server";

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname.startsWith("/")) {
    const { isBot } = userAgent(request);
    if (isBot) {
      return new Response("봇은 들어올 수 없어요", { status: 403 });
    }
    if (!request.url.includes("/api")) {
      if (
        !request.cookies.has("jmarketSession") &&
        !request.url.includes("/enter")
      ) {
        return NextResponse.redirect(new URL("/enter", request.url));
      }
    }
  }
}
