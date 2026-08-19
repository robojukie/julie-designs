import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BYPASS_COOKIE, SESSION_MAX_AGE } from "@/lib/tracking";

/* The proxy no longer logs page views — see components/VisitLogger.tsx for
   why that moved to the client. All it owns now is the ?admin=true shortcut
   for opting this device out of tracking, which has to be set server-side
   because the value is a secret the browser can't know.

   The full control panel — including opting back IN — lives at
   /dont-track-me. That page deliberately does NOT opt you out just by being
   opened: it has to be visitable to read your current state and to turn
   tracking back on. */
export function proxy(request: NextRequest) {
  const secret = process.env.MY_BYPASS_COOKIE_SECRET;

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
