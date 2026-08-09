import type { ReactNode } from "react";

/* The page-level reveal used by home, about, writing and the NovinoPath
   showcase. Ports the IX2 "fade in description" / "fade in work" / "fade
   about" / "fade writing" action lists: opacity 0 -> 1, 500ms delay, 500ms
   duration.

   CSS, NOT MOTION, AND THAT IS THE WHOLE POINT. This was a motion.div with
   `initial={{ opacity: 0 }}`, which server-renders as `style="opacity: 0"` —
   so every section it wrapped shipped as real HTML painted invisible, and the
   only thing that ever made it visible was JavaScript succeeding: React
   hydrates, Motion starts a requestAnimationFrame loop, the element fades in.

   That failed three ways:

     - A BACKGROUND TAB. Chromium suspends rAF in a hidden tab, so the loop
       never starts. Verified: in a hidden tab the wrappers sat at opacity 0
       indefinitely and a fresh rAF callback did not fire once in three
       seconds. Cmd-click a project card, come back to that tab later, and the
       page is blank until it is focused. On this page FadeIn wraps everything
       below the hero, so that is the whole page.
     - RENDERERS WITH NO FRAME LOOP — headless screenshot and link-preview
       services, which capture the un-run state.
     - JS BEING SLOW, BLOCKED OR ERRORING, after which the content never
       appears at all.

   A CSS animation runs off the document timeline rather than rAF: a hidden tab
   advances it instead of freezing it, and it completes with no JavaScript
   involved. See `.fade-in` in styles/custom.css §2.

   The codebase already knew this. The hero title's fade was moved to
   @keyframes for exactly this reason, and the note explaining why was written
   into custom.css next to that fix — a stylesheet, where nobody authoring a
   React component would look. This component was written in the SAME initial
   commit, with Motion, and the two never met. Hence the duplicate explanation:
   it belongs where the next person will copy from.

   No "use client" any more. With the animation in CSS this holds no state and
   runs no effects, so it stays a server component and four pages stop shipping
   it as client JavaScript. */
export default function FadeIn({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={className ? `fade-in ${className}` : "fade-in"}>
      {children}
    </div>
  );
}
