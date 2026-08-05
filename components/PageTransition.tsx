"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

// Upper bound on a phase: --pt-cover (1200ms) is the longer of the two,
// --pt-reveal is 240ms. Both live in styles/page-transition.css. Used only to
// size the watchdog below, so it needs to be >= the real value, not exact.
const DURATION_MS = 1200;

/* Full-viewport wipe played on navigation: a "V" sweep — enters top-right,
   dives down-left to a bottom vertex ("cover", where the route swaps
   underneath), then rebounds up-right off the right edge ("reveal").

   The motion itself is two CSS animations in styles/page-transition.css; this
   component only drives the phase state machine and the router.push between
   the two legs. Timing/easing/curve are matched to austlee.com — see that
   stylesheet's header for the specifics.

   It runs in three cases:
     1. Page-to-page clicks — both legs, cover then reveal.
     2. Entry loads (a refresh of any page, or a direct load of anything but
        home) — reveal only, out of the pre-painted covered state that
        ENTRY_SCRIPT in app/layout.tsx sets up.
     3. Never on a first load of home, so the hero's "Hi! I'm Julie" sequence
        plays against an unobstructed page. */

const ENTRY_ATTR = "data-pt-entry";

/* Runs before first paint, inlined into the document — see app/layout.tsx.

   The covered-on-entry state has to be decided and painted before React
   hydrates, otherwise a refresh flashes the page content for however long
   hydration takes before the panel could cover it. Deliberately not a React
   concern for that reason; PageTransition just picks the flag up on mount.

   performance.getEntriesByType("navigation")[0].type distinguishes a refresh
   ("reload") from a first load ("navigate"), which is the only way to satisfy
   "no transition on initial home, but yes on refreshing it". */
export const ENTRY_SCRIPT = `(function(){try{
var n=performance.getEntriesByType("navigation")[0];
var t=n?n.type:"navigate";
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(t==="navigate"&&location.pathname==="/")return;
document.documentElement.setAttribute("${ENTRY_ATTR}","1");
// Safety net: if the bundle never executes, don't strand the page behind an
// opaque panel with no way out.
setTimeout(function(){document.documentElement.removeAttribute("${ENTRY_ATTR}")},3000);
}catch(e){}})();`;

function isModifiedClick(e: ReactMouseEvent) {
  return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const pendingHref = useRef<string | null>(null);
  // True once a "cover" we triggered has finished landing, so the pathname
  // effect below knows a route change is one we should reveal for (vs. a
  // back/forward nav that bypassed the click handler entirely).
  const awaitingRouteChange = useRef(false);

  /* Entry loads. Starts at "idle" so the server-rendered markup matches and
     hydration stays clean — the panel is held in its covered position by CSS
     ([data-pt-entry] in page-transition.css) rather than by state until this
     runs. useLayoutEffect, not useEffect, so the swap to "reveal" is in the
     same frame and the covered panel never flickers. */
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute(ENTRY_ATTR)) return;
    root.removeAttribute(ENTRY_ATTR);
    setPhase("reveal");
  }, []);

  useEffect(() => {
    if (!awaitingRouteChange.current) return;
    awaitingRouteChange.current = false;
    setPhase("reveal");
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || isModifiedClick(e as unknown as ReactMouseEvent)) return;

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.origin !== window.location.origin
      ) {
        return;
      }

      /* Same route — an in-page jump such as the nav's "work" link
         (/#projects-list) clicked while already on home. Nav's handleWorkClick
         smooth-scrolls to the section on the bubble phase; because this
         listener is on the capture phase it would otherwise preventDefault()
         first and replace that scroll with a full cover/reveal, which is both
         wrong and much slower than the scroll it replaced. */
      if (anchor.pathname === pathname) return;

      // anchor.pathname/.search/.hash are resolved DOM properties (the browser
      // expands a relative href attribute like "/writing" for us) — slicing
      // the raw attribute string by anchor.origin.length was wrong for every
      // relative href next/link renders, which is all of them.
      const destination = anchor.pathname + anchor.search + anchor.hash;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      pendingHref.current = destination;
      setPhase("cover");
    }

    // Capture phase: next/link's own onClick (bubble phase, attached to the
    // anchor) calls preventDefault() and starts its own router.push before a
    // bubble-phase listener on document would ever see the event — this has
    // to run first so we can preventDefault() and drive the navigation
    // ourselves instead.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  /* Guarded so the animationend listener and the watchdog below can't both
     run a leg's follow-up. Reset when the phase returns to idle. */
  const advancedFor = useRef<string | null>(null);

  const advance = useCallback(
    (from: "cover" | "reveal") => {
      if (advancedFor.current === from) return;
      advancedFor.current = from;

      if (from === "cover") {
        awaitingRouteChange.current = true;
        const href = pendingHref.current;
        pendingHref.current = null;
        if (href) router.push(href);
      } else {
        setPhase("idle");
      }
    },
    [router]
  );

  /* Watchdog. A backgrounded tab stops compositing, and a CSS animation that
     never renders never fires animationend — so a click followed by a tab
     switch would otherwise strand the panel mid-cover with router.push never
     called, i.e. an opaque screen with no way forward. austlee.com drives its
     own transition off a setTimeout for the same reason rather than trusting
     the event. Slack on top of the duration so this only ever fires when the
     event genuinely didn't. */
  useEffect(() => {
    if (phase === "idle") {
      advancedFor.current = null;
      return;
    }
    const id = window.setTimeout(() => advance(phase), DURATION_MS + 150);
    return () => window.clearTimeout(id);
  }, [phase, advance]);

  return (
    <>
      {/* onAnimationEnd sits here rather than on either moving element: each
          leg runs TWO animations (the x wrapper and the ball), both finishing
          together, so the handler fires twice. advance() is idempotent per
          phase, which is what absorbs the duplicate.

          The two-element split is what makes the arc a parabola — see the
          header of styles/page-transition.css. */}
      <div
        className="page-transition"
        data-phase={phase}
        aria-hidden="true"
        onAnimationEnd={() => {
          if (phase !== "idle") advance(phase);
        }}
      >
        {/* Two balls meeting at the bottom-middle. A falls in from the
            top-right, then drops straight down and out of frame; B rises
            straight back up from that same point, stops centred (the sealed
            frame the route swaps under), and carries on out the top-left — so
            it reads as one bounce with the impact hidden off-frame. Arrivals
            are slower than departures. See styles/page-transition.css. */}
        <div className="page-transition__ball page-transition__ball--a" />
        <div className="page-transition__ball page-transition__ball--b" />
      </div>
      {children}
    </>
  );
}
