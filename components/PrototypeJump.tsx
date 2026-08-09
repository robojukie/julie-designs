"use client";

/* The signpost at the top of a project section: "Interactive prototype below".

   WHAT IT DOES DIFFERENTLY. A plain anchor scrolls its target to the TOP of the
   viewport, which here would put the prototype link on the first line and hide
   everything above it — the before/after and every feature screen the reader
   was meant to pass on the way. This scrolls so the target's BOTTOM sits just
   inside the bottom of the viewport instead, which lands the reader at the end
   of the evidence with the work still on screen above them.

   That framing is deliberately "end of the section" rather than "the link near
   the bottom". The two are the same today because the prototype block is last,
   but only the first stays true once a Figma embed replaces the placeholder and
   the block becomes tall — at which point aligning its bottom edge is still
   right and aligning the link is not.

   WHY JS AND NOT scroll-margin. Landing a target near the bottom needs
   `scroll-margin-top: calc(100vh - <target height>)`, and CSS cannot read the
   target's height. Pinning a number would break the day the embed lands.

   PROGRESSIVE ENHANCEMENT. The href is a real fragment, so with JS broken or
   still loading the link still works — it just lands top-aligned like any
   anchor. The handler only improves where it arrives. */

const BOTTOM_GAP = 32;

export default function PrototypeJump({
  targetId,
  children,
}: {
  targetId: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="inline-link"
      href={`#${targetId}`}
      onClick={(event) => {
        const target = document.getElementById(targetId);
        /* No target, no interception — let the browser do whatever it would
           have done with the fragment. */
        if (!target) return;
        event.preventDefault();

        const bottom = target.getBoundingClientRect().bottom + window.scrollY;
        const top = Math.max(0, bottom - window.innerHeight + BOTTOM_GAP);

        window.scrollTo({
          top,
          /* A long smooth scroll is exactly the kind of motion that causes
             trouble for vestibular disorders, and this one can cross several
             screens. */
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      }}
    >
      {children}
    </a>
  );
}
