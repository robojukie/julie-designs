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

/* Mirrors --pt-duration in styles/page-transition.css, where the real timing
   lives. Used only to size the watchdog below, but it must not be LOWER than
   the CSS value: the watchdog force-advances the phase, which tears down a
   still-running animation. A too-small number here silently cancels the leg
   mid-flight. Erring high is harmless — the animationend event beats the
   watchdog in every case except the one it exists for. */
const DURATION_MS = 400;

/* Full-viewport wipe played on navigation: a "V" sweep — enters top-right,
   dives down-left to a bottom vertex ("cover", where the route swaps
   underneath), then rebounds up-right off the right edge ("reveal").

   The motion itself is two CSS animations in styles/page-transition.css; this
   component only drives the phase state machine and the router.push between
   the two legs. See that stylesheet's header for the timing, easing, and
   curve specifics.

   It runs in two cases:
     1. Page-to-page clicks — both legs, cover then reveal.
     2. Every entry load, home included — reveal only (the second leg), played
        out of the pre-painted covered state that ENTRY_SCRIPT in
        app/layout.tsx sets up. */

const ENTRY_ATTR = "data-pt-entry";

/* How long the ball sits parked dead centre — screen fully covered, nothing
   moving — before the reveal leg runs. The cover animation's forwards fill is
   what holds it there, so this is purely a delay before the phase flips.

   Deliberately a FLAT timer, not a readiness gate. Gating on
   document.fonts.ready plus above-fold images was considered and dropped: it
   lands around 0.4-0.6s on a warm load but stretches on image-heavy routes,
   and the hero intro plays immediately after the reveal, so the hold has to be
   the same length every time or the two fall out of step. */
const HOLD_MS = 300;

/* Runs before first paint, inlined into the document — see app/layout.tsx.

   The covered-on-entry state has to be decided and painted before React
   hydrates, otherwise the page content shows for however long hydration takes
   before the ball could cover it. Deliberately not a React concern for that
   reason; PageTransition just picks the flag up on mount.

   Every load gets it now, home and first visits included, so there is no
   navigation-type check left — an earlier version read
   performance.getEntriesByType("navigation")[0].type to tell a refresh from a
   first load, purely to exempt home. The flag carried a "home" vs "1" value
   for a while too, back when home's entry reveal ran slower; every route is
   the same speed now, so its presence is the whole signal. */
export const ENTRY_SCRIPT = `(function(){try{
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
// See the header of styles/page-transition.css. The panel is absolute rather
// than fixed to keep it out of Safari's chrome-tint sampler, and rides
// window.scrollY via this variable to visually match a fixed element.
// Setting it here (before hydration, before first paint) covers a browser
// that restores a non-zero scrollY on refresh.
document.documentElement.style.setProperty("--pt-scroll-top", window.scrollY + "px");
document.documentElement.setAttribute("${ENTRY_ATTR}","1");
// data-pt-slow bumps the reveal-leg duration up by 100ms — see the override
// in styles/page-transition.css. Applied to every entry load (all devices)
// and every mobile click transition, so the reveal-only handoff reads more
// gracefully than the fast one paired with a cover.
document.documentElement.setAttribute("data-pt-slow","1");
// Safety net: if the bundle never executes, don't strand the page behind an
// opaque panel with no way out.
setTimeout(function(){document.documentElement.removeAttribute("${ENTRY_ATTR}");document.documentElement.removeAttribute("data-pt-slow");},3000);
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

  /* Keep --pt-scroll-top synced with window.scrollY so the absolute-positioned
     panel rides the viewport like a fixed element would. Absolute (rather than
     fixed) so Safari's Website Tinting / iOS chrome sampler ignores it — see
     the header of styles/page-transition.css. Passive listener; setProperty on
     documentElement is cheap and doesn't force layout. */
  useEffect(() => {
    function sync() {
      document.documentElement.style.setProperty(
        "--pt-scroll-top",
        window.scrollY + "px",
      );
    }
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  /* Entry loads. Starts at "idle" so the server-rendered markup matches and
     hydration stays clean — the panel is held in its covered position by CSS
     ([data-pt-entry] in page-transition.css) rather than by state until this
     runs. useLayoutEffect, not useEffect, so the swap to "reveal" is in the
     same frame and the covered panel never flickers. */
  useLayoutEffect(() => {
    if (!document.documentElement.hasAttribute(ENTRY_ATTR)) return;
    /* The attribute is what pins the ball centre, so it stays put for the
       duration of the hold and is cleared by the effect below instead — in the
       same commit as the phase flip, so there is no frame where the cover has
       been released but the reveal has not started. */
    const id = window.setTimeout(() => setPhase("reveal"), HOLD_MS);
    return () => window.clearTimeout(id);
  }, []);

  /* Hands the ball off from the entry attribute to the reveal animation. Runs
     in the same commit that sets the phase (layout effect, before paint), and
     the animation's forwards fill outranks the attribute rule from there on. */
  useLayoutEffect(() => {
    if (phase !== "idle") document.documentElement.removeAttribute(ENTRY_ATTR);
  }, [phase]);

  useEffect(() => {
    if (!awaitingRouteChange.current) return;
    awaitingRouteChange.current = false;
    // Same hold as an entry load: the route has already swapped underneath the
    // parked ball, so this is dwell time on a fully covered screen.
    const id = window.setTimeout(() => setPhase("reveal"), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        isModifiedClick(e as unknown as ReactMouseEvent)
      )
        return;

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

      // Mobile: skip the cover leg entirely and use the same reveal-only path
      // an entry load takes. The parabolic cover animation on iOS Safari has
      // an intermittent flash we haven't been able to close; the reveal-only
      // path (home load) is smooth. Set the entry attribute so CSS pins the
      // panel at centre, mark data-pt-slow so the reveal runs at the 100ms-
      // slower entry duration, then navigate. The pathname useEffect above
      // schedules setPhase("reveal") once the route swaps.
      if (window.matchMedia("(max-width: 640px)").matches) {
        document.documentElement.setAttribute(ENTRY_ATTR, "1");
        document.documentElement.setAttribute("data-pt-slow", "1");
        awaitingRouteChange.current = true;
        router.push(destination);
        return;
      }

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
  }, [pathname, router]);

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
        // The slow-reveal flag lives from entry-load setup or mobile click
        // through the end of the reveal. Cleared here so a subsequent
        // desktop-click transition (cover + reveal) uses the fast duration.
        document.documentElement.removeAttribute("data-pt-slow");
      }
    },
    [router],
  );

  /* Watchdog. A backgrounded tab stops compositing, and a CSS animation that
     never renders never fires animationend — so a click followed by a tab
     switch would otherwise strand the panel mid-cover with router.push never
     called, i.e. an opaque screen with no way forward. A setTimeout is the
     only thing that still fires in that situation. Slack on top of the
     duration so this only ever fires when the event genuinely didn't. */
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
        {/* One ball on a parabola: in from off the top-right, bottoming out
            dead centre (the sealed frame the route swaps under), then back out
            through the top-left. The wrapper carries the horizontal half of
            the motion and the ball the vertical half — that split is what
            makes the arc a parabola. See styles/page-transition.css. */}
        <div className="page-transition__x">
          <div className="page-transition__ball" />
        </div>
      </div>
      {children}
    </>
  );
}
