"use client";

import { useEffect, useState } from "react";

/* The persistent project indicator on the NovinoPath showcase.

   WHY IT EXISTS. Each project runs about 3.6 screens, and the only thing
   naming the one you are in — "Project 01 of 03: Consult Review" — sits in the
   first 0.15 of that. Measured: a reader is oriented for roughly 4% of the time
   they spend inside a section, and for the other 96% the page cannot tell them
   which project this is, how many remain, or how to leave. A static label at
   the top of a long section cannot answer a question that is asked all the way
   down it.

   WHY STICKY-IN-A-WRAPPER, NOT FIXED. The bar is a child of .project-run,
   which spans exactly the three project sections. `position: sticky` then does
   the appearing and disappearing on its own: it pins under the navbar while
   the run is on screen and scrolls away with the wrapper's bottom edge. The
   alternative — position: fixed plus a scroll listener toggling visibility —
   needs JS to decide something CSS already knows, and gets it wrong at both
   boundaries during momentum scrolling.

   WHERE IT SITS. Attached to the navbar and travelling with it: pinned at 60px
   while the nav is out, moving up to 0 when the nav hides so it takes the
   nav's place rather than hanging below an empty band. See .project-nav in
   styles/custom.css for how that is driven.

   Two other positions were built and rejected. Flush to the BOTTOM of the
   viewport removed the coupling entirely — but that edge belongs to the
   browser toolbar, the home indicator and the window frame, and a dark band
   there reads as the reader's own chrome rather than as part of the page. A
   light translucent strip in the page's paper colour, at either edge, simply
   disappeared into it.

   WHY ALL THREE ITEMS ARE SHOWN. The brief was "clear at all times how many
   there are and which one is which". Showing only the current one answers half
   of that. Three visible entries answer the count without being told it, mark
   the current one, and double as the way to reach the other two — which is the
   job the per-section cross-links at the foot were doing, one screen too late.

   IntersectionObserver rather than a scroll handler: no listener to throttle,
   no work on frames where nothing crossed, and it keeps working when rAF is
   suspended in a background tab. */

/* The line a reader's eye sits on, measured from the top of the viewport: just
   below the navbar and the indicator together (60 + 51 = 111), and then five
   more.

   BELOW the landing point, not above it. A section is current once its top has
   passed this line (`top <= READ_LINE`), and an anchor jump parks that top at
   exactly 111 — so a line at 111 or less leaves the arriving section one pixel
   short and the previous project stays marked. Verified: at 108 a jump to
   Dashboards still read "Slide Viewer".

   The five was originally on the other side, which was right for a different
   implementation. When this derived from IntersectionObserver entries the
   failure was a zero-area TOUCH at the boundary, so the line had to sit above.
   Reading geometry inverts that. Same number, opposite sign, and nothing in
   the old comment would have warned anyone. */
const READ_LINE = 116;

type ProjectNavProps = {
  projects: { id: string; label: string }[];
};

export default function ProjectNav({ projects }: ProjectNavProps) {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");

  useEffect(() => {
    const sections = projects
      .map((f) => document.getElementById(f.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    /* The last section whose top has passed the read line, computed from
       geometry at the moment the observer fires.

       An earlier version derived this from the observer's own entries — a Set
       of ids currently intersecting a thin band, then the last of those in
       document order. It was correct in principle and brittle in practice:
       the Set is state accumulated across callbacks, so any entry that failed
       to arrive (a large jump, a restored scroll position, a bfcache
       restore) left a section marked long after it had left the screen, and
       the error persisted until something crossed the band again.

       Reading the rects is O(3) on a callback that only fires when something
       crossed, and it cannot go stale because it holds nothing. */
    const pick = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= READ_LINE) {
          return sections[i].id;
        }
      }
      return sections[0].id;
    };

    /* The observer is only a TRIGGER — "something crossed, look again" — and
       its rootMargin no longer decides anything. A thin strip near the read
       line means the callback fires around each boundary and not on every
       pixel of a 3.6-screen section. */
    const observer = new IntersectionObserver(() => setActiveId(pick()), {
      rootMargin: "-111px 0px -85% 0px",
      threshold: 0,
    });

    sections.forEach((el) => observer.observe(el));
    /* The first callback fires on observe, which also covers a page restored
       mid-run by the browser's scroll restoration. */
    return () => observer.disconnect();
  }, [projects]);

  const activeIndex = projects.findIndex((f) => f.id === activeId);

  return (
    <nav className="project-nav" aria-label="Projects">
      <div className="project-nav-inner">
        {/* Names the row. Three numbered titles on a strip are ambiguous on
            their own — they read equally well as a breadcrumb or as a
            progress tracker, and both readings are wrong. aria-hidden because
            the <nav> already carries the same word as its accessible name. */}
        <p className="eyebrow muted project-nav-label" aria-hidden="true">
          Project
        </p>

        <ol className="project-nav-list" role="list">
          {projects.map((project, index) => {
            const isActive = project.id === activeId;
            return (
              <li key={project.id}>
                <a
                  className="project-nav-link"
                  href={`#${project.id}`}
                  /* aria-current="location" rather than "page": these are
                     positions within this document, not separate pages. */
                  aria-current={isActive ? "location" : undefined}
                >
                  <span className="project-nav-n" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-nav-name">{project.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      {/* The count, stated once, for anyone who cannot see that the list has
          three entries. Visually redundant, so it is hidden from sight only. */}
      <p className="project-nav-status" role="status">
        Project {activeIndex + 1} of {projects.length}
      </p>
    </nav>
  );
}
