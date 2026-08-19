import type { Metadata } from "next";
import { baloo2, nunito } from "./fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition, { ENTRY_SCRIPT } from "@/components/PageTransition";
import Cursor from "@/components/Cursor";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SilentTracker } from '@/components/SilentTracker'

export const metadata: Metadata = {
  title: "Julie Paik — Product Designer",
  description: "Julie Paik's UX portfolio",
  /* Ported from the export's <head>:
       <link href="images/favicon.svg" rel="shortcut icon" type="image/x-icon">
       <link href="images/webclip.svg" rel="apple-touch-icon">
     Declared here rather than via Next's app/icon.* file convention so the
     assets stay in public/images, where scripts/port-images.js owns them —
     copying them into app/ would create a second copy that silently goes stale
     if the export is refreshed.

     Without this, Next emits no icon link at all and the browser falls back to
     requesting /favicon.ico, which doesn't exist — hence the blank tab icon. */
  icons: {
    icon: { url: "/images/favicon.svg", type: "image/svg+xml" },
    apple: "/images/webclip.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning: ENTRY_SCRIPT stamps data-pt-entry onto <html>
       before React hydrates, so the client tree legitimately differs from the
       server tree by that one attribute. Scoped to this element only (the
       prop doesn't cascade), same pattern as a theme-flash script. */
    <html
      lang="en"
      className={`${baloo2.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body className="body">
        {/* Must run before first paint so a refresh renders already-covered
            rather than flashing content until hydration. First element in
            <body> so it executes before the panel markup below is parsed. */}
        <script dangerouslySetInnerHTML={{ __html: ENTRY_SCRIPT }} />
        <PageTransition>
          <Nav />
          {children}
          <Footer />
          {/* Last in <body> so the rig stacks above everything before it even
              against an equal z-index. See styles/cursor.css. */}
          <Cursor />
        </PageTransition>
      </body>
      <Analytics />
      {/* Custom background city logger */}
      <SilentTracker />
    </html>
  );
}
