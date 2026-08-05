import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import MediumFeed from "@/components/MediumFeed";

export const metadata: Metadata = {
  title: "Blog posts",
  description:
    "Some articles I've published on Medium - one day I'd like to publish more consistently and share my growth",
};

// The export's wrapper carries the "fade writing" IX2 action list (a-151):
// PAGE_START, opacity 0 -> 1, 500ms delay, 500ms duration — identical to the
// home/about fades, so it reuses FadeIn.
export default function Writing() {
  return (
    <FadeIn className="home">
      <div className="hero-section page-header-section">
        <div className="hero-text-container">
          <div className="page-title-container">
            <div className="page-title">
              {/* Page titles read as artwork rather than prose — see
                  styles/custom.css section 13. */}
              <h1 className="hero-title-text main-page" data-graphic-text>
                Blog posts
              </h1>
            </div>
          </div>
          <div className="container-680 home-subtitle">
            <div className="tagline-text w-richtext">
              <p>
                Some articles I&apos;ve published on Medium - one day I&apos;d
                like to publish more consistently and share my growth
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section about">
        <div className="subsection">
          <div className="container-800">
            <MediumFeed />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
