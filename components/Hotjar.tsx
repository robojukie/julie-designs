"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function Hotjar() {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // If you visit your site with ?admin=true, it saves the flag automatically
    if (urlParams.get("admin") === "true") {
      localStorage.setItem("block_hotjar", "true");
      alert("Hotjar tracking disabled for this browser!");
    }

    if (localStorage.getItem("block_hotjar") === "true") {
      setIsBlocked(true);
    }
  }, []);

  if (isBlocked) return null;

  return (
    <Script
      id="hotjar-snippet"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:5259516,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );
}
