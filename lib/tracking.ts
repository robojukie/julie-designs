/* Shared constants and request-shape helpers for visitor logging.

   Both the proxy (which owns the bypass cookies) and the /api/log-activity
   route (which owns the actual writes) need the same cookie names and the
   same idea of what a bot looks like, so they live here rather than being
   duplicated and drifting apart. */

export const SESSION_COOKIE = "visitor_session_id";
export const BYPASS_COOKIE = "bypass_tracking";

/* A visitor's session id is a year-long cookie rather than a browser-session
   one: the "new arrival" email keys off the cookie being absent, and a plain
   session cookie means the same person emails you again every time they
   reopen their browser. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 365;

/* Two writes for the same session+path inside this window are treated as the
   same page view. The client only fires once per navigation, so this is a
   backstop for retries, double-mounts, and back/forward taps — not the
   primary defence. */
export const DEDUPE_WINDOW_MS = 10_000;

/* The timestamp column used for the dedupe lookup. If the table names it
   something else, change it here — a mismatch is handled gracefully (the
   lookup is skipped and the insert still runs), it just loses the backstop. */
export const CREATED_AT_COLUMN = "created_at";

const BOT_KEYWORDS = [
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

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  const ua = userAgent.toLowerCase();
  return BOT_KEYWORDS.some((keyword) => ua.includes(keyword));
}

/* The bypass secret is compared with `=== undefined` semantics in mind: if
   MY_BYPASS_COOKIE_SECRET is unset, an absent cookie would otherwise compare
   equal to it (undefined === undefined) and every visitor on earth would be
   treated as you. Missing config must mean "nobody is bypassed", not
   "everybody is". */
export function isBypassed(cookieValue: string | undefined): boolean {
  const secret = process.env.MY_BYPASS_COOKIE_SECRET;
  if (!secret) return false;
  return cookieValue === secret;
}

/* Only real route paths are accepted — the client sends usePathname(), so
   anything with a scheme, a host, or a file extension is either a bug or
   someone poking the endpoint by hand. */
export function isTrackablePath(path: unknown): path is string {
  return (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    path.length <= 512
  );
}
