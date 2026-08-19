'use client';
import { useEffect, useState } from 'react';

export default function SecretBypassPage() {
  const [status, setStatus] = useState('Setting bypass cookie...');

  useEffect(() => {
    // Set the cookie for 1 year
    document.cookie = "bypass_tracking=not-me!; path=/; max-age=31536000; Secure";
    setStatus('✅ Bypass cookie activated! This device will no longer be tracked.');
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>{status}</h1>
      <p>You can now close this tab and browse your site normally.</p>
    </div>
  );
}
