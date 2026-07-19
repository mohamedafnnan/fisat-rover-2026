import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight middleware placeholder.
 * Future: CMS redirects, draft mode, capability hints for /explore.
 */
export function middleware(request: NextRequest) {
  // Reserved for redirects / draft mode / /explore hints.
  void request;
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and image optimization.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
