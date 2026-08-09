"use client";

import { useEffect, useRef, useState } from "react";

/* The persistent feature-area indicator on the NovinoPath showcase.

   WHY IT EXISTS. Each feature area runs about 3.6 screens, and the only thing
   naming the one you are in — "Feature 01 of 03: Consult Review" — sits in the
   first 0.15 of that. Measured: a reader is oriented for roughly 4% of the time
   they spend inside a section, and for the other 96% the page cannot tell them
   which feature this is, how many remain, or how to leave. A static label at
   the top of a long section cannot answer a question that is asked all the way
   down it.

   WHY STICKY-IN-A-WRAPPER, NOT FIXED. The bar is a child of .feature-run, which
   spans exactly the three feature sections. `position: sticky` then does the
   appearing and disappearing on its own: it pins under the navbar while the run
   is on screen and scrolls away with the wrapper's bottom edge. The alternative
   — position: fixed plus a scroll listener toggling visibility — needs JS to
   decide something CSS already knows, and gets it wrong at both boundaries
   during momentum scrolling.

   WHY ALL THREE ITEMS ARE SHOWN. The brief was "clear at all times how many
   there are and which one is which". Showing only the current one answers half
   of that. Three visible entries answer the count without being told it, mark
   the current one, and double as the way to reach the other two — which is the
   job the per-section cross-links at the foot were doing, one screen too late.

   IntersectionObserver rather than a scroll handler: no listener to throttle,
   no work on frames where nothing crossed, and it keeps working when rAF is
   suspended in a background tab. */

type FeatureNavProps = {
  features: { id: string; label: string }[];
};

export default function FeatureNav({ features }: FeatureNavProps) {
  const [activeId, setActiveId] = useState(features[0]?.id ?? "");
  /* Which sections are currently in the band, in document order. Held in a ref
     rather than state because it is bookkeeping between observer callbacks —
     rendering never reads it, only the derived activeId. */
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sections = features
      .map((f) => document.getElementById(f.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    /* The band is a horizontal strip just under the navbar and the bar itself
       (60 + 45 = 105px). A section counts as "current" while it crosses that
       strip, which is the line a reader's eye is actually on — not the middle
       of the viewport, and not the whole viewport, which on a 3.6-screen
       section would mark two features at once for a full screen of scrolling. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        /* The LAST section in document order, not the first. Two are in the
           band together at every boundary — the outgoing section's bottom edge
           and the incoming section's top edge both sit at the same y — and the
           one a reader would name is the one whose heading has just arrived
           under the bars, which is the later of the two. Taking the first
           marked the previous feature and only corrected itself a screen
           later. Document order, not observation order, because entries arrive
           in whatever sequence they happened to change. */
        for (let i = features.length - 1; i >= 0; i--) {
          if (visible.current.has(features[i].id)) {
            setActiveId(features[i].id);
            break;
          }
        }
      },
      /* Band top is 100px, five above where a jumped-to section lands
         (scroll-margin-top: 105px). At exactly 105 the section's top edge only
         TOUCHES the band — zero intersection area, which threshold 0 does not
         count — so clicking a nav link left the previous feature marked. The
         5px of deliberate overlap is what makes the arrival register. */
      { rootMargin: "-100px 0px -85% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [features]);

  const activeIndex = features.findIndex((f) => f.id === activeId);

  return (
    <nav className="feature-nav" aria-label="Feature areas">
      <ol className="feature-nav-list" role="list">
        {features.map((feature, index) => {
          const isActive = feature.id === activeId;
          return (
            <li key={feature.id}>
              <a
                className="feature-nav-link"
                href={`#${feature.id}`}
                /* aria-current="location" rather than "page": these are
                   positions within this document, not separate pages. */
                aria-current={isActive ? "location" : undefined}
              >
                <span className="feature-nav-n" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="feature-nav-name">{feature.label}</span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* The count, stated once, for anyone who cannot see that the list has
          three entries. Visually redundant, so it is hidden from sight only. */}
      <p className="feature-nav-status" role="status">
        Feature {activeIndex + 1} of {features.length}
      </p>
    </nav>
  );
}
