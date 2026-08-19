import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip assets, system paths, and your secret page
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/dont-track-me"
  ) {
    return NextResponse.next();
  }

  console.log(`🔍 DIAGNOSTIC: Middleware triggered on path: ${pathname}`);

  const response = NextResponse.next();
  let sessionId = request.cookies.get("visitor_session_id")?.value;
  let isNewSession = false;

  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    response.cookies.set("visitor_session_id", sessionId, {
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    isNewSession = true;
    console.log(`✨ DIAGNOSTIC: Created new Session ID: ${sessionId}`);
  }

  // Capture location
  const { city, country, region } = geolocation(request);
  const locationText = `${city || "Unknown City"}, ${region || "Unknown Region"}, ${country || "Unknown Country"}`;

  // 🧪 TEMPORARY TEST: We removed "process.env.NODE_ENV === 'production'"
  // This forces it to run locally so you can see the results right now!

  console.log(
    `📡 DIAGNOSTIC: Attempting to log to Supabase for path: ${pathname}`,
  );
  fetch(`${request.nextUrl.origin}/api/log-activity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, location: locationText, path: pathname }),
  }).catch((err) => console.error("❌ Supabase fetch failed:", err));

  if (isNewSession && pathname === "/") {
    console.log(
      "📧 DIAGNOSTIC: New session on homepage! Sending email request...",
    );
    fetch(`${request.nextUrl.origin}/api/send-visitor-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        location: locationText,
        sessionId,
      }),
    }).catch((err) => console.error("❌ Email fetch failed:", err));
  }

  return response;
}
