import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

export async function middleware(request: NextRequest) {
  // 1. Skip asset folders and system API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Identify and block your own visits
  const clientIp =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "";
  const bypassCookie = request.cookies.get("bypass_tracking")?.value;

  const isMyIp = clientIp === process.env.MY_EXCLUDED_IP;
  const isMyCookie = bypassCookie === process.env.MY_BYPASS_COOKIE_SECRET;
  const isLocalhost =
    clientIp === "127.0.0.1" ||
    clientIp === "::1" ||
    clientIp.includes("localhost");

  if (isMyIp || isMyCookie || isLocalhost) {
    return NextResponse.next(); // Exit silently without tracking
  }

  // 3. Extract the city location details via Vercel
  const { city, country, region } = geolocation(request);
  const locationText = `${city || "Unknown City"}, ${region || "Unknown Region"}, ${country || "Unknown Country"}`;

  // Log to your console (automatically collected by Vercel Logs / Axiom / BetterStack)
  console.log(
    `[VISITOR_LOG] Page: ${request.nextUrl.pathname} | Location: ${locationText}`,
  );

  // 4. Optional: Forward info to an internal Next.js API route to fire emails
  // Using an asynchronous background fetch prevents slowdowns for your end users
  if (process.env.NODE_ENV === "production" && city) {
    fetch(`${request.nextUrl.origin}/api/send-visitor-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: request.nextUrl.pathname,
        location: locationText,
      }),
    }).catch((err) => console.error("Email trigger failed", err));
  }

  return NextResponse.next();
}
