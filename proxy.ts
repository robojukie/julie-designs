import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { geolocation } from "@vercel/functions";

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const headers = request.headers;

  // A. PRE-FETCH CLEANUP: Stop Next.js pre-download loops from creating excess logs
  const isPrefetch =
    headers.get("purpose") === "prefetch" ||
    headers.get("x-nextjs-data") !== null;

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

  // B. GEO VALIDATION: Filter out fake automated Vercel compilation pings
  const { city, country, region } = geolocation(request);
  if (region === "dev1") {
    return NextResponse.next();
  }

  // C. PERSONAL BYPASS: Block tracking for your own registered devices
  const bypassCookie = request.cookies.get("bypass_tracking")?.value;
  if (bypassCookie === process.env.MY_BYPASS_COOKIE_SECRET) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  let sessionId = request.cookies.get("visitor_session_id")?.value;
  let isNewSession = false;

  // D. SESSION IDENTIFICATION
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

  // E. SUPABASE LOGGER: Keep your functioning Supabase endpoint
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

    event.waitUntil(logTask);
  }

  // F. BULLETPROOF DIRECT RESEND DISPATCH: Avoids proxy loopback failures
  // (We removed process.env.NODE_ENV === 'production' so you can verify it locally first!)
  if (isNewSession && pathname === "/") {
    // Direct network call to Resend bypassing internal Next.js API endpoints
    const directEmailTask = fetch("https://resend.com", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tracking <onboarding@resend.dev>", // Guaranteed sandbox sender path
        to: ["your-resend-account-email@gmail.com"], // 👈 REPLACE with your Resend login address!
        subject: `🚨 New Arrival: ${locationText}`,
        html: `
          <h2>New Analytics Session Started</h2>
          <p><strong>Location Details:</strong> ${locationText}</p>
          <p><strong>Target Path:</strong> <code>${pathname}</code></p>
          <p><strong>Session Tracker ID:</strong> <code>${sessionId}</code></p>
        `,
      }),
    })
      .then(async (res) => {
        const logData = await res.json();
        if (!res.ok)
          console.error(
            "❌ Resend API directly rejected the request:",
            JSON.stringify(logData),
          );
        else
          console.log(
            "✅ Resend Direct Push Successful! Message ID:",
            logData.id,
          );
      })
      .catch((err) =>
        console.error("💥 Raw Resend connection network error:", err.message),
      );

    // Lock the Edge execution runtime thread open until transmission finishes
    event.waitUntil(directEmailTask);
  }

  return response;
}
