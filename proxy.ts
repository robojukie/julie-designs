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

  // B. SYSTEM BLOCKS, BOT FILTERING & ASSET DEDUPLICATION
  const userAgent = headers.get("user-agent")?.toLowerCase() || "";
  const acceptLanguage = headers.get("accept-language") || ""; // 👈 Reads browser language defaults

  const botKeywords = [
    "bot",
    "crawler",
    "spider",
    "googlebot",
    "bingbot",
    "yandexbot",
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest/0.",
    "slackbot",
    "vkshare",
    "w3c_validator",
    "redditbot",
    "applebot",
    "whatsapp",
    "flipboard",
    "tumblr",
    "vercelbot",
    "headless",
    "vercel-screenshot",
    "lighthouse", // 👈 Added Vercel test tools
  ];
  const isBot = botKeywords.some((keyword) => userAgent.includes(keyword));

  // 🛡️ CRITICAL NEW CHECK: Real human browsers always send a preferred language string (like 'en-US')
  // Automated background scripts, network monitors, and scrapers almost always leave this blank.
  const isHeadlessAutomation = acceptLanguage.trim() === "";

  const isNextInternal =
    pathname.startsWith("/_next") ||
    pathname.includes("/_next/data") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api");

  if (
    isPrefetch ||
    isBot ||
    isHeadlessAutomation || // 👈 Instantly filters out headless bots and Vercel edge tests
    isNextInternal ||
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

  // C. PERSONAL BYPASS: Automate cookie setting via ?admin=true URL parameter
  const bypassCookie = request.cookies.get("bypass_tracking")?.value;
  const hasAdminParam = request.nextUrl.searchParams.get("admin") === "true";

  // If you visit with ?admin=true, set the 1-year bypass cookie automatically
  if (hasAdminParam) {
    const response = NextResponse.next();
    response.cookies.set(
      "bypass_tracking",
      process.env.MY_BYPASS_COOKIE_SECRET || "bypass-active",
      {
        path: "/",
        maxAge: 31536000, // Keep this device hidden for 1 full year
        sameSite: "none", // Works inside testing frames and embeds
        secure: true,
      },
    );

    // Redirect to the clean URL (removes the ugly "?admin=true" from your browser bar)
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("admin");

    // Create a new redirected response with the cookie attached
    const redirectResponse = NextResponse.redirect(cleanUrl);
    redirectResponse.cookies.set(response.cookies.get("bypass_tracking")!);
    return redirectResponse;
  }

  // If the device already has the bypass cookie, exit quietly without tracking
  if (bypassCookie === process.env.MY_BYPASS_COOKIE_SECRET) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  let sessionId = request.cookies.get("visitor_session_id")?.value;
  let isNewSession = false;

  // D. SESSION IDENTIFICATION WITH DOUBLE-FIRE BLOCK
  if (!sessionId) {
    // Check if we already created a session during this exact request pass
    const alreadyProcessed = request.headers.get("x-middleware-session-cached");
    if (alreadyProcessed) return response;

    sessionId = Math.random().toString(36).substring(2, 15);
    response.cookies.set("visitor_session_id", sessionId, {
      path: "/",
      sameSite: "none", // Works beautifully inside previews and iframes
      secure: true,
    });

    // Inject a temporary header flag to kill immediate internal double-triggers
    request.headers.set("x-middleware-session-cached", "true");
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
        to: ["juliespaik@gmail.com"],
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
