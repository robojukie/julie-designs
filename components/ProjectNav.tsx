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

   WHY STICKY-IN-A-WRAPPER, NOT FIXED. The bar is the LAST child of
   .project-run, which spans exactly the three project sections.
   `position: sticky; bottom: 0` then does the appearing and disappearing on its
   own: it pins to the viewport bottom while the run is on screen and releases
   when the last project ends. The alternative — position: fixed plus a scroll
   listener toggling visibility — needs JS to decide something CSS already
   knows, and gets it wrong at both boundaries during momentum scrolling.

   LAST child specifically. Sticky clamps an element inside its parent's box, so
   as the FIRST child its static position is the top of the run — already above
   the viewport bottom for the entire run, so it never sticks and just scrolls
   away with the opening. Verified both ways.

   WHY THE BOTTOM. The top edge is contested: navbar, progress bar, and a navbar
   that hides on scroll-down by translating up while keeping its 60px slot. A
   bar pinned below it hung under an empty band the moment the nav slid away,
   and closing that gap meant publishing the nav's hidden state to the document
   and matching its easing. The bottom edge is uncontested, so none of that
   exists — and it stops taking back the reading room the nav hides to give.

   WHY ALL THREE ITEMS ARE SHOWN. The brief was "clear at all times how many
   there are and which one is which". Showing only the current one answers half
   of that. Three visible entries answer the count without being told it, mark
   the current one, and double as the way to reach the other two — which is the
   job the per-section cross-links at the foot were doing, one screen too late.

   IntersectionObserver rather than a scroll handler: no listener to throttle,
   no work on frames where nothing crossed, and it keeps working when rAF is
   suspended in a background tab. */

/* The line a reader's eye sits on, measured from the top of the viewport. Just
   under the 60px navbar, and five above where an anchor jump lands
   (`.project-run .project-section` scroll-margin-top: 60px) so an arriving
   section is unambiguously past it rather than exactly on it.

   The indicator's own height is not in this number — it is pinned to the
   BOTTOM of the viewport, so it obstructs nothing up here. That is the second
   thing moving it down bought. */
const READ_LINE = 55;

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
      rootMargin: "-55px 0px -85% 0px",
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

      {/* The count, stated once, for anyone who cannot see that the list has
          three entries. Visually redundant, so it is hidden from sight only. */}
      <p className="project-nav-status" role="status">
        Project {activeIndex + 1} of {projects.length}
      </p>
    </nav>
  );
}
