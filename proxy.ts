import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { geolocation } from "@vercel/functions";

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const headers = request.headers;

  // A. ADVANCED PRE-FETCH CLEANUP: Catches speculation rule background checks
  const isPrefetch =
    headers.get("purpose") === "prefetch" ||
    headers.get("x-nextjs-data") !== null ||
    headers.get("sec-purpose") === "prefetch" ||
    headers.get("next-router-prefetch") === "1"; // Catch Next.js client-side link preloading engines

  // B. SYSTEM BLOCKS, BOT FILTERING & ASSET DEDUPLICATION
  const userAgent = headers.get("user-agent")?.toLowerCase() || "";
  const acceptLanguage = headers.get("accept-language") || "";

  // // Explicit detection for Next.js internal background routing queries
  // const isNextDataQuery =
  //   pathname.includes("/_next/data/") || headers.get("x-nextjs-data") !== null;

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
    "lighthouse",
  ];
  const isBot = botKeywords.some((keyword) => userAgent.includes(keyword));

  // Blocks headless bots (automated scrapers typically bypass browser language arrays)
  const isHeadlessAutomation = acceptLanguage.trim() === "";

  // const isNextInternal =
  //   pathname.startsWith("/_next") ||
  //   pathname.includes("/_next/data") ||
  //   pathname.startsWith("/favicon") ||
  //   pathname.startsWith("/api");

  // Explicitly block assets, system layouts, and images from triggering a tracking thread
  const isStaticAsset =
    pathname.startsWith("/images/") || // 👈 Blocks your dedicated portfolio asset storage folder
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api") ||
    pathname.includes("."); // Catches explicit file targets (.png, .jpg, .svg, .pdf)

  if (
    isPrefetch ||
    isBot ||
    isHeadlessAutomation ||
    // isNextInternal ||
    // isNextDataQuery ||
    // pathname.includes(".") ||
    isStaticAsset ||
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

    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("admin");

    const redirectResponse = NextResponse.redirect(cleanUrl);
    redirectResponse.cookies.set(response.cookies.get("bypass_tracking")!);
    return redirectResponse;
  }

  if (bypassCookie === process.env.MY_BYPASS_COOKIE_SECRET) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  let sessionId = request.cookies.get("visitor_session_id")?.value;
  let isNewSession = false;

  // D. SESSION IDENTIFICATION WITH DOUBLE-FIRE BLOCK
  if (!sessionId) {
    const alreadyProcessed = request.headers.get("x-middleware-session-cached");
    if (alreadyProcessed) return response;

    sessionId = Math.random().toString(36).substring(2, 15);
    response.cookies.set("visitor_session_id", sessionId, {
      path: "/",
      sameSite: "none",
      secure: true,
    });
    isNewSession = true;
  } else {
    // BLOCK CONSECUTIVE SUB-SECOND REPEATS
    const currentSecondToken = `${pathname}-${Math.floor(Date.now() / 1000)}`;
    const lastProcessedToken = request.cookies.get(
      "last_processed_ping",
    )?.value;

    if (lastProcessedToken === currentSecondToken) {
      return NextResponse.next();
    }

    response.cookies.set("last_processed_ping", currentSecondToken, {
      path: "/",
      maxAge: 5,
      sameSite: "none",
      secure: true,
    });

    request.headers.set("x-middleware-session-cached", "true");

    // 🛡️ FIX: Forces subsequent layout paths to register without sending spam emails
    isNewSession = false;
  }

  const locationText = `${city || "Unknown City"}, ${region || "Unknown Region"}, ${country || "Unknown Country"}`;

  // E. SUPABASE LOGGER
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
  // use process.env.NODE_ENV === 'production' if no need to test olocally
  if (isNewSession && pathname === "/") {
    // update to https://api.resend.com/emails?
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

export const config = {
  // Excludes asset file targets cleanly from processing loops
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// export const config = {
//   matcher: [
//     {
//       source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
//       missing: [
//         { type: "header", key: "next-router-prefetch" }, // 👈 BLOCKS background link caches completely!
//         { type: "header", key: "purpose", value: "prefetch" },
//       ],
//     },
//   ],
// };
