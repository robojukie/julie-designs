import { Baloo_2, Nunito } from "next/font/google";

// The Webflow export's WebFont.load() call requested Baloo 2 weight 300, but
// Google Fonts never published a 300 weight for Baloo 2 (available: 400-800) —
// the browser silently ignored that request. Matching what Google Fonts
// actually serves rather than the export's (non-functional) request.
export const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-baloo-2",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});
