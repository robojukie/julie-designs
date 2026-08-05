"use client";

import { useEffect, useRef } from "react";

/* Drives the pink cursor rig. Everything visual — the parts, their sizes per
   state, the morph timing — lives in styles/cursor.css; this file only tracks
   the pointer, decides which state it is in, and measures the one value the
   stylesheet can't work out for itself (the height of the text caret).

   Ported from the technique austlee.com uses (a fixed element written to with
   translate3d on pointermove) rather than from any of the things it is easy to
   reach for instead: a `cursor: url(...)` image can't animate between states,
   and an SVG buys nothing for a circle and a rectangle. */

// Mirrors the @media guard in styles/cursor.css. Both have to agree: this one
// decides whether the listeners and the `cursor: none` class are installed,
// that one decides whether the rig is styled at all.
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

// Set on <html>, and the only thing that hides the native cursor — see the
// stylesheet for why that indirection matters.
const ACTIVE_CLASS = "has-custom-cursor";

/* Text that reads as artwork rather than prose: it keeps the resting dot
   instead of the caret. Carried by the tag alone, never inferred — the home
   hero wordmark and the page title on each top-level page wear it.

   Inferring it was tried and dropped. Matching `.home .hero-title-text` picked
   out the right elements, but only because a Webflow LAYOUT class happened to
   sit on the right three pages; it tied "which titles are unselectable" to
   "which pages share a layout", two things that agree today by coincidence.
   Case studies are excluded now because they simply don't carry the tag,
   rather than because they root at a different class.

   KEEP IN SYNC with styles/custom.css section 13, which makes the same
   attribute unselectable. Both halves of "this is a picture of words" answer
   the same question, so they read from the same selector.

   Matches austlee.com's data-cursor="none", which sits on his "austin lee"
   wrapper and is the only such attribute on his page. */
const GRAPHIC_TEXT = "[data-graphic-text]";

/* Images that open the zoom, tagged by components/ZoomableImage.tsx. They are
   `<img role="button">` with no button chrome and — because the rig means
   `cursor` stays `none` over them — no native pointer change either, so on a
   fine pointer the rig IS the affordance. Without this state a zoomable image
   and a decorative one look identical to the hand.

   KEEP IN SYNC with the data-zoomable attribute in that file and the
   [data-state="image"] rules in styles/cursor.css. */
const ZOOMABLE = "[data-zoomable]";

/* The open zoom overlay, from components/ZoomableImage.tsx. Every surface in
   it — backdrop and image alike — closes on click, so the whole thing reads as
   one target and takes one cursor.

   Matched by container rather than by a flag this component keeps: the overlay
   mounts and unmounts in a portal outside this tree, so a piece of React state
   here would need wiring across that boundary to say something the hit-test
   already knows. */
const LIGHTBOX = ".lightbox";

type State = "default" | "text" | "image" | "zoom-out";

/* True when the element paints text of its own, as opposed to merely
   containing something that does. Checking for a direct non-empty text child
   is what separates a <p> or an <h2> from the stack of layout wrappers above
   it — elementFromPoint returns the innermost element either way, so without
   this test a gap between two paragraphs inside a text column would read as
   text just as strongly as the paragraphs do. */
function paintsText(el: Element): boolean {
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      return true;
    }
  }
  return false;
}

/* The caret's height, taken from the line box it sits in so the bar matches
   the text's rhythm rather than a fixed guess. getComputedStyle returns either
   a px value or the keyword "normal"; the keyword has no numeric form, so it
   falls back to the ~1.2 ratio browsers use for it. */
function lineHeightOf(el: Element): number {
  const style = window.getComputedStyle(el);
  const lineHeight = Number.parseFloat(style.lineHeight);
  if (Number.isFinite(lineHeight)) return lineHeight;
  return Math.round(Number.parseFloat(style.fontSize) * 1.2);
}

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rig = ref.current;
    if (!rig) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;

    const root = document.documentElement;
    root.classList.add(ACTIVE_CLASS);

    let x = 0;
    let y = 0;
    let frame = 0;
    let inside = false;
    // Both written to the DOM only on change: every dataset write invalidates
    // style for the rig's whole subtree, and the state holds steady across the
    // large majority of frames.
    let state: State | null = null;
    let textHeight = 0;

    const setState = (next: State) => {
      if (next === state) return;
      state = next;
      rig.dataset.state = next;
    };

    const setTextHeight = (next: number) => {
      if (next === textHeight) return;
      textHeight = next;
      rig.style.setProperty("--cursor-text-h", `${next}px`);
    };

    const paint = () => {
      frame = 0;
      rig.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const under = document.elementFromPoint(x, y);
      if (!under || !inside) {
        rig.dataset.visible = "false";
        return;
      }

      /* Order matters, and this is the whole decision:

         1. Anything with a cursor of its own — a link, a button, a field — is
            left to the native cursor, which is already on screen there; a rig
            layered over it would be two cursors.
         2. Then text, which by this point is text that isn't also a link —
            unless it has been marked as artwork, which is checked first
            precisely because such elements ARE text and would otherwise pass
            the test below.
         3. Then the open zoom overlay, which is checked FIRST of the three
            content states and genuinely has to be: it covers the viewport, so
            everything below would otherwise match through it — the caption
            text inside a zoomed screenshot is still text, and the page's own
            zoomable images are still tagged behind the backdrop.
         4. Then a zoomable image, which is checked before text only because
            it can't BE text — that ordering is for the reader, not the
            machine.
         5. Otherwise the resting dot. Images with no zoom land here, along
            with the page's own background: they have no cursor of their own,
            so the default arrow is what they would otherwise get, and the dot
            is what stands in for it. */
      if (window.getComputedStyle(under).cursor !== "none") {
        rig.dataset.visible = "false";
        return;
      }

      if (under.closest(LIGHTBOX)) {
        setState("zoom-out");
      } else if (under.closest(ZOOMABLE)) {
        setState("image");
      } else if (!under.closest(GRAPHIC_TEXT) && paintsText(under)) {
        setTextHeight(lineHeightOf(under));
        setState("text");
      } else {
        setState("default");
      }

      rig.dataset.visible = "true";
    };

    const show = (event: PointerEvent) => {
      // A hybrid machine (touchscreen laptop, iPad with a trackpad) satisfies
      // the media query on account of its mouse but still emits pointermove
      // for finger contact. Following those would park the rig wherever the
      // last tap landed, so touch is dropped and only mouse/pen move it.
      if (event.pointerType === "touch") return;

      x = event.clientX;
      y = event.clientY;
      inside = true;

      // Coalesce to one write per frame: pointermove can fire well above
      // display rate on a high-polling mouse, and the hit-test in paint()
      // costs a style flush, so running it per event rather than per frame is
      // the difference that matters here.
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // The rig is a fixed element, so without this it would stall at the edge
    // of the window — visible and wrong — while the real pointer is off in
    // another app or in the browser chrome.
    const hide = () => {
      inside = false;
      rig.dataset.visible = "false";
    };

    window.addEventListener("pointermove", show, { passive: true });
    // On <document>, not <window>: pointerleave/-enter on window don't fire
    // reliably for the pointer exiting the viewport in every browser.
    document.addEventListener("pointerleave", hide);
    // Covers the case the leave event misses — cmd-tabbing away without the
    // pointer crossing an edge.
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", show);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove(ACTIVE_CLASS);
    };
  }, []);

  /* data-visible starts "false" so the server and client markup agree, and so
     the rig doesn't paint at (0, 0) before the first move — see the
     stylesheet. The parts are spans because the rig is purely decorative and
     aria-hidden; neither carries meaning. */
  return (
    <div
      ref={ref}
      className="cursor-root"
      data-state="default"
      data-visible="false"
      aria-hidden="true"
    >
      <span className="cursor-ring" />
      {/* Two bars, not three parts: the caret is the text state's caret AND
          the vertical stroke of the image state's "+", which is what lets the
          two states morph into each other instead of swapping. */}
      <span className="cursor-caret" />
      <span className="cursor-plus" />
    </div>
  );
}
