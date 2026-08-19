'use client';
import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export function SilentTracker() {
  useEffect(() => {
    fetch('/api/geo')
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.city !== 'Unknown') {
          // Send custom event data to Vercel Analytics dashboard
          track('portfolio_visit', { visitor_city: data.city });
        }
      })
      .catch(() => {}); // Fails silently so it never crashes your site
  }, []);

  return null; // This ensures nothing is rendered visually
}
