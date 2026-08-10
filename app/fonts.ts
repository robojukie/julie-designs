import { Baloo_2, Nunito } from "next/font/google";

// 800 is the only weight the stylesheets ask for. 700 is kept as the weight
// headings fell back to before 800 was loaded, so reverting stays cheap.
export const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-baloo-2",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});
