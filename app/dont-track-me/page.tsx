import { cookies } from "next/headers";
import TrackingToggle from "@/components/TrackingToggle";
import { BYPASS_COOKIE, isBypassed } from "@/lib/tracking";

/* Reads a cookie, so it must render per-request rather than being baked at
   build time into a page that reports everyone's state as whatever the
   builder's was. */
export const dynamic = "force-dynamic";

/* The opt-out control panel, not a one-way switch.

   It used to set the cookie from the browser
   (`document.cookie = "bypass_tracking=not-me!"`), which never matched the
   secret the server compares against — so the page said you were opted out
   while logging every visit. Both directions now go through
   /api/tracking-preference, and the state shown here is read server-side from
   the actual cookie. */
export default async function TrackingPreferencePage() {
  const cookieStore = await cookies();
  const tracked = !isBypassed(cookieStore.get(BYPASS_COOKIE)?.value);

  return (
    <div
      style={{
        padding: "6rem 2rem",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Tracking preference</h1>
      <TrackingToggle
        tracked={tracked}
        configured={Boolean(process.env.MY_BYPASS_COOKIE_SECRET)}
      />
    </div>
  );
}
