import { NextResponse, after } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { geolocation } from "@vercel/functions";
import {
  BYPASS_COOKIE,
  CREATED_AT_COLUMN,
  DEDUPE_WINDOW_MS,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  isBot,
  isBypassed,
  isTrackablePath,
} from "@/lib/tracking";

// Fallback values prevent Next.js from throwing build-time compilation errors
const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "placeholder-key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* Everything about a page view is decided here rather than in the proxy.

   The client sends only the path; identity (session cookie), origin
   (geolocation headers), and eligibility (bot, bypass) are all read from the
   request server-side, so a caller can't forge them by POSTing a fancier
   body. */
export async function POST(request: NextRequest) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("Missing Supabase Environment Variables");
    return NextResponse.json({ error: "Database unconfigured" }, { status: 500 });
  }

  let path: unknown;
  try {
    ({ path } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!isTrackablePath(path)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  if (isBypassed(request.cookies.get(BYPASS_COOKIE)?.value)) {
    return NextResponse.json({ skipped: "bypass" });
  }

  if (isBot(request.headers.get("user-agent"))) {
    return NextResponse.json({ skipped: "bot" });
  }

  /* A visitor with no session cookie is a new arrival. The cookie is set on
     this response, so the next navigation in the same session carries it and
     lands in the else-branch — one email per visitor, not one per page. */
  const existingSessionId = request.cookies.get(SESSION_COOKIE)?.value;
  const isNewSession = !existingSessionId;
  const sessionId = existingSessionId ?? crypto.randomUUID();

  /* Every return path from here on has to carry the session cookie. Skipping
     it on one branch (a deduped view, say) would leave the visitor
     cookie-less, so the next page view would look like another new arrival
     and email you again. */
  const reply = (body: Record<string, unknown>, status = 200) => {
    const res = NextResponse.json(body, { status });
    if (isNewSession) {
      res.cookies.set(SESSION_COOKIE, sessionId, {
        path: "/",
        maxAge: SESSION_MAX_AGE,
        httpOnly: true,
        // "lax", not "none": this is a first-party cookie on your own domain,
        // and "none" is both unnecessary here and dropped outright by
        // browsers blocking third-party cookies.
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    return res;
  };

  /* countryRegion, NOT region. geolocation().region is the Vercel edge
     datacenter that served the request ("iad1", "sfo1") — it describes your
     infrastructure, not your visitor. countryRegion is the visitor's state or
     province, which is what "Austin, TX, US" is meant to read as. */
  const { city, country, countryRegion } = geolocation(request);
  const locationText = `${city || "Unknown City"}, ${countryRegion || "Unknown Region"}, ${country || "Unknown Country"}`;

  // Local development shouldn't write into the production analytics table.
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.ALLOW_DEV_LOGGING !== "true"
  ) {
    return reply({ skipped: "dev" });
  }

  if (await isDuplicate(sessionId, path)) {
    return reply({ skipped: "duplicate" });
  }

  const { error } = await supabase
    .from("visitor_logs")
    .insert([{ session_id: sessionId, location: locationText, path }]);

  if (error) {
    console.error("Database logging failed:", error.message);
    return reply({ error: error.message }, 500);
  }

  /* after() rather than awaiting: the visitor's browser gets its response
     immediately and the email goes out on the same invocation afterwards. */
  if (isNewSession) {
    after(() => sendArrivalEmail({ locationText, path, sessionId }));
  }

  return reply({ success: true });
}

/* Backstop against the same view being written twice (a retry, a double
   mount, a fast back-and-forward). The client's own guard is the primary
   defence; this catches what slips past it.

   Deliberately fail-open: if the lookup errors — most likely because the
   table's timestamp column isn't named CREATED_AT_COLUMN — losing a duplicate
   check is far better than losing the page view, so the insert still runs. */
async function isDuplicate(sessionId: string, path: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("visitor_logs")
    .select(`path, ${CREATED_AT_COLUMN}`)
    .eq("session_id", sessionId)
    .order(CREATED_AT_COLUMN, { ascending: false })
    .limit(1);

  if (error) {
    console.warn("Dedupe lookup skipped:", error.message);
    return false;
  }

  const previous = data?.[0] as
    | ({ path: string } & Record<string, string>)
    | undefined;
  if (!previous || previous.path !== path) return false;

  const previousAt = Date.parse(previous[CREATED_AT_COLUMN]);
  if (Number.isNaN(previousAt)) return false;

  return Date.now() - previousAt < DEDUPE_WINDOW_MS;
}

async function sendArrivalEmail({
  locationText,
  path,
  sessionId,
}: {
  locationText: string;
  path: string;
  sessionId: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY — arrival email skipped");
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tracking <onboarding@resend.dev>",
        to: ["juliespaik@gmail.com"],
        subject: `🚨 New Arrival: ${locationText}`,
        html: `
              <h2>New Analytics Session Started</h2>
              <p><strong>Location Details:</strong> ${locationText}</p>
              <p><strong>Landing Path:</strong> <code>${path}</code></p>
              <p><strong>Session Tracker ID:</strong> <code>${sessionId}</code></p>
            `,
      }),
    });

    if (!res.ok) {
      console.error(
        "❌ Resend API rejected the request:",
        JSON.stringify(await res.json()),
      );
    }
  } catch (err) {
    console.error(
      "💥 Resend connection network error:",
      err instanceof Error ? err.message : err,
    );
  }
}
