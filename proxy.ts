import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server"; // 👈 Added NextFetchEvent type
import { geolocation } from "@vercel/functions";

// 1. Accept the NextFetchEvent context as the second parameter
export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const headers = request.headers;

  // A. STRIP PRE-FETCHES: Stop Next.js background caching loops from inflating logs
  const isPrefetch =
    headers.get("purpose") === "prefetch" ||
    headers.get("x-nextjs-data") !== null;

  // B. SYSTEM BLOCKS: Exit silently if asset, system path, preview deployment, or a prefetch
  if (
    isPrefetch ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/dont-track-me" ||
    request.nextUrl.hostname.includes("-vercel.app")
  ) {
    return NextResponse.next();
  }

  // C. GEO CHECK: Exclude Vercel's automated compilation test logs
  const { city, country, region } = geolocation(request);
  if (region === "dev1") {
    return NextResponse.next();
  }

  // D. PERSONAL BYPASS: Don't track your own devices
  const bypassCookie = request.cookies.get("bypass_tracking")?.value;
  if (bypassCookie === process.env.MY_BYPASS_COOKIE_SECRET) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  let sessionId = request.cookies.get("visitor_session_id")?.value;
  let isNewSession = false;

  // E. SESSION CONFIG
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    response.cookies.set("visitor_session_id", sessionId, {
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    isNewSession = true;
  }

  const locationText = `${city || "Unknown City"}, ${region || "Unknown Region"}, ${country || "Unknown Country"}`;

  // F. EDGE FETCH GUARANTEE: Call waitUntil on the execution context event
  if (process.env.NODE_ENV === "production") {
    const logTask = fetch(`${request.nextUrl.origin}/api/log-activity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        location: locationText,
        path: pathname,
      }),
    }).catch((err) => console.error("DB log trigger failed", err));

    // Force Vercel to preserve the pipeline until Supabase saves the row
    event.waitUntil(logTask);
  }

  if (
    isNewSession &&
    pathname === "/" &&
    process.env.NODE_ENV === "production"
  ) {
    const emailTask = fetch(
      `${request.nextUrl.origin}/api/send-visitor-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: pathname,
          location: locationText,
          sessionId,
        }),
      },
    ).catch((err) => console.error("Email trigger failed", err));

    // Force Vercel to keep the runtime active until Resend confirms dispatch
    event.waitUntil(emailTask);
  }

  return response;
}
