import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BYPASS_COOKIE, SESSION_MAX_AGE } from "@/lib/tracking";

/* Turns this device's own tracking on and off — the control behind
   /dont-track-me.

   Tracking is opted OUT by holding a cookie whose value is
   MY_BYPASS_COOKIE_SECRET. The browser can't know that secret, so setting the
   cookie has to happen server-side; that's the only reason this route
   exists. */
export async function POST(request: NextRequest) {
  const secret = process.env.MY_BYPASS_COOKIE_SECRET;

  let tracked: unknown;
  try {
    ({ tracked } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (typeof tracked !== "boolean") {
    return NextResponse.json(
      { error: "Expected { tracked: boolean }" },
      { status: 400 },
    );
  }

  if (!tracked && !secret) {
    return NextResponse.json(
      { error: "MY_BYPASS_COOKIE_SECRET is not configured" },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ tracked });

  if (tracked) {
    // Opting back IN is just dropping the cookie.
    response.cookies.set(BYPASS_COOKIE, "", { path: "/", maxAge: 0 });
  } else {
    response.cookies.set(BYPASS_COOKIE, secret!, {
      path: "/",
      maxAge: SESSION_MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}
