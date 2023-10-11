import {
  NextFetchEvent,
  NextRequest,
  userAgent,
  NextResponse,
} from "next/server";

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};

export function middleware(request: NextRequest, event: NextFetchEvent) {}
