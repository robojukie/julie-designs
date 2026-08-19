"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* Reports one page view per navigation to /api/log-activity.

   This has to run on the client, not in the proxy. Every route in this app is
   static, so next/link fully prefetches them: clicking "about" is served from
   the client router cache and makes NO request to the server at all. A proxy
   can only see requests, so proxy-side logging misses every click-through and
   instead records the prefetches — which fire for every link on the page, at
   page-load time, whether or not the visitor ever goes there.

   usePathname() is the opposite: it changes exactly once per navigation,
   whether that navigation was a click, a back/forward, or a fresh load.

   The ref guard is what keeps a re-render (or React's development-mode double
   effect invocation) from turning one navigation into two rows. It holds the
   last path we reported, not a boolean, so returning to a path later in the
   same session still counts. */
export default function VisitLogger() {
  const pathname = usePathname();
  const lastReported = useRef<string | null>(null);

  useEffect(() => {
    if (lastReported.current === pathname) return;
    lastReported.current = pathname;

    /* keepalive so the write still goes out if the visitor navigates away or
       closes the tab in the same tick — this is fire-and-forget, nothing on
       the page waits for it or reads the result. */
    fetch("/api/log-activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {
      /* Analytics must never surface as a user-visible error. */
    });
  }, [pathname]);

  return null;
}
