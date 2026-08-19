import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip assets, system API routes, and your secret bypass page
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/dont-track-me"
  ) {
    return NextResponse.next();
  }

  // 2. Block your own visits using your custom bypass passphrase
  const bypassCookie = request.cookies.get("bypass_tracking")?.value;
  if (bypassCookie === process.env.MY_BYPASS_COOKIE_SECRET) {
    return NextResponse.next();
  }

  // 3. Handle Session Tracking
  const response = NextResponse.next();
  let sessionId = request.cookies.get("visitor_session_id")?.value;
  let isNewSession = false;

  // If visitor doesn't have a session ID cookie, create one
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    // Session cookie clears automatically when they close the browser tab
    response.cookies.set("visitor_session_id", sessionId, {
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    isNewSession = true;
  }

  // 4. Capture location details
  const { city, country, region } = geolocation(request);
  const locationText = `${city || "Unknown City"}, ${region || "Unknown Region"}, ${country || "Unknown Country"}`;

  // 5. High-density Activity Logging (Feeds to Axiom)
  // This prints a single clean line tracking their specific Session ID and current path
  console.log(
    `[SESSION:${sessionId}] [LOC:${locationText}] [PATH:${pathname}]`,
  );

  // 6. Only fire an email on a NEW arrival to the Home Page
  if (
    isNewSession &&
    pathname === "/" &&
    process.env.NODE_ENV === "production"
  ) {
    fetch(`${request.nextUrl.origin}/api/send-visitor-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        location: locationText,
        sessionId,
      }),
    }).catch((err) => console.error("Email trigger failed", err));
  }

  return response;
}
