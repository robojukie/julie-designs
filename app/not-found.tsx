import Link from "next/link";
import type { Metadata } from "next";

// Matches the export's <title>Not Found</title>.
export const metadata: Metadata = {
  title: "Not Found",
};

/* Port of juliepaik.webflow/404.html.

   The `is-404` class is ours: 404.html's <body> carries no class at all, while
   every other page (including 401) sets `class="body"`. Our root layout always
   renders <body class="body">, so this marker lets custom.css drop the gradient
   back off for this route only.

   Not ported: the IX2 "404 interaction" (a-5), a MOUSE_X/MOUSE_Y parallax
   moving `.circle-image` ±30vw / ±30vh. The action list and the `.circle-image`
   CSS both survive in the export, but no element with that class exists in
   404.html — or in any other exported page — so there is nothing to attach it
   to. Flagged rather than invented. */
export default function NotFound() {
  return (
    <div className="utility-page-wrap is-404">
      <div className="utility-page-content w-form">
        <div className="frosted-glass">
          <div className="_404">Sorry, I&apos;m not here right now!</div>
          <div className="_404-details">
            <div>
              Hm the page you&apos;re looking for doesn&apos;t exist or has been
              moved. Please{" "}
              <a href="mailto:juliespaik@gmail.com">email me</a>{" "}
              if you can&apos;t find what you&apos;re looking for!
            </div>
          </div>
          <div className="horizontal-divider"></div>
          <Link href="/" className="utility-button w-button">
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
