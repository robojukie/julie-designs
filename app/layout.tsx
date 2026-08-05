import type { Metadata } from "next";
import { baloo2, nunito } from "./fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import "./globals.css";

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
    <html lang="en" className={`${baloo2.variable} ${nunito.variable}`}>
      <body className="body">
        <Nav />
        {children}
        <Footer />
        {/* Last in <body> deliberately: the rig shares the maximum z-index
            with the Webflow badge, and document order is what breaks that
            tie in the rig's favour. See styles/cursor.css. */}
        <Cursor />
      </body>
    </html>
  );
}
