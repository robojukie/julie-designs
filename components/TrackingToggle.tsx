"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* The button half of /dont-track-me. The cookie it flips is httpOnly, so the
   current state can't be read here — it's passed down from the server
   component that rendered the page, and router.refresh() re-reads it after a
   change rather than this component tracking its own copy. */
export default function TrackingToggle({
  tracked,
  configured,
}: {
  tracked: boolean;
  configured: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function set(next: boolean) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/tracking-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracked: next }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Something went wrong.");
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: "1rem", justifyItems: "center" }}>
      <p style={{ fontSize: "1.25rem", margin: 0 }}>
        {tracked
          ? "🔴 Your visits ARE being logged on this device."
          : "✅ Your visits are NOT being logged on this device."}
      </p>

      {tracked ? (
        <button
          type="button"
          onClick={() => set(false)}
          disabled={busy || !configured}
          style={BUTTON}
        >
          {busy ? "Working…" : "Stop tracking me"}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => set(true)}
          disabled={busy}
          style={BUTTON}
        >
          {busy ? "Working…" : "Track me again"}
        </button>
      )}

      {!configured && (
        <p style={{ color: "#b00", maxWidth: "34rem" }}>
          <strong>MY_BYPASS_COOKIE_SECRET isn&apos;t set</strong> in this
          environment, so opting out can&apos;t work yet. Add it to your Vercel
          project&apos;s environment variables and redeploy.
        </p>
      )}

      {error && <p style={{ color: "#b00" }}>{error}</p>}

      <p style={{ color: "#666", maxWidth: "34rem", fontSize: "0.9rem" }}>
        This is per-device and per-browser, and it lasts a year. Clearing
        cookies resets it, and you&apos;ll need to opt out again in any other
        browser or on your phone.
      </p>
    </div>
  );
}

const BUTTON: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "0.5rem",
  border: "1px solid currentColor",
  background: "transparent",
  cursor: "pointer",
};
