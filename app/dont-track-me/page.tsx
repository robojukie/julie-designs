/* The bypass cookie is set by the proxy when this path is requested — see
   proxy.ts. It can't be set here: the value is MY_BYPASS_COOKIE_SECRET, which
   the browser has no way of knowing, so the old client-side
   `document.cookie = "bypass_tracking=not-me!"` wrote a value that never
   matched what the server compared against, and tracked you anyway. */
export default function SecretBypassPage() {
  return (
    <div
      style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}
    >
      <h1>✅ Bypass cookie activated! This device will no longer be tracked.</h1>
      <p>You can now close this tab and browse your site normally.</p>
    </div>
  );
}
