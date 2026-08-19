"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";

export default function VercelAnalyticsWrapper() {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // 1. Check for ?admin=true query param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("admin") === "true") {
      localStorage.setItem("block_analytics", "true");
    }

    // 2. Check localStorage state
    if (localStorage.getItem("block_analytics") === "true") {
      setIsBlocked(true);
    }
  }, []);

  if (isBlocked) return null;

  return <Analytics />;
}
