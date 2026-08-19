import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BYPASS_COOKIE, SESSION_MAX_AGE } from "@/lib/tracking";

/* The proxy no longer logs page views — see components/VisitLogger.tsx for
   why that moved to the client. All it owns now is the "don't track me"
   cookie, which has to be set server-side because the value is a secret the
   browser can't know.

   Two ways to claim it, both landing on the same cookie:
     ?admin=true on any URL — then redirect to the clean URL so the parameter
       doesn't stick around in the address bar or in shared links.
     /dont-track-me — the bookmarkable version, which keeps its confirmation
       page rather than redirecting. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.MY_BYPASS_COOKIE_SECRET;

  if (pathname === "/dont-track-me") {
    const response = NextResponse.next();
    setBypassCookie(response, secret);
    return response;
  }

  if (request.nextUrl.searchParams.get("admin") === "true") {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("admin");
    const response = NextResponse.redirect(cleanUrl);
    setBypassCookie(response, secret);
    return response;
  }

  return NextResponse.next();
}

function setBypassCookie(
  response: NextResponse,
  secret: string | undefined,
) {
  if (!secret) {
    console.error("MY_BYPASS_COOKIE_SECRET is unset — bypass not applied");
    return;
  }
  response.cookies.set(BYPASS_COOKIE, secret, {
    path: "/",
    maxAge: SESSION_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/* Without a matcher this runs on every asset, font, and image request too.
   Nothing here needs to see those, and the old code spent its first thirty
   lines filtering them back out by hand. */
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
