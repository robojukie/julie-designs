"use client";

import Image, { type ImageProps } from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/* The zoom that replaces Webflow's lightbox.

   WHAT THE EXPORT DID. 20 `<a class="w-lightbox">` anchors across the case
   studies, each carrying a `<script class="w-json">` payload and driven by
   webflow.js, which this rebuild doesn't run — so app/vac-redesign/page.tsx
   and its siblings kept the anchors purely as layout (see the comments there)
   and dropped the behaviour. This is the behaviour, put back.

   Every `group` in those payloads was the empty string, so no two lightboxes
   ever formed a gallery. That is why there is no next/previous here and no
   shared open-image state between instances: each image is its own overlay,
   which is also what lets this be a leaf component with no provider.

   WHY THE INTERACTION SITS ON THE <img> AND NOT ON A WRAPPER. The obvious
   shape — wrap the image in a <button> — cannot be used. These images sit
   inside ported Webflow containers whose sizing is load-bearing and fragile:
   .zoom-link-rounded must stay an <a> so the stylesheet's bare
   `a { max-width: 100% }` is what .image-max300h's `height: 100%` resolves
   against, and next/image's no-upscale rule already collapses shrink-wrapping
   containers here. Any new box in that chain is a layout risk for no gain. So
   this component renders the SAME DOM the page rendered before — one <img>,
   same classes, same parents — and adds only attributes to it.

   `display: contents` on a wrapper was the other candidate. It generates no
   box, but it also can't carry a focus ring, which is the thing keyboard users
   need most here. */

/* The zoomed image's ceiling. These are what shape the framing on a normal
   screen: the image grows until it meets one of them, and the space left over
   is the margin — rather than the margin being set and the image taking what
   remains. The practical difference shows on a large display, where a
   viewport-relative margin would keep scaling the image up with the monitor
   and there is no reading benefit past roughly this size.

   MAX_H is the smaller-feeling number on purpose: a landscape screenshot
   bounded by height is the common case, and 760 leaves the frame clear of the
   top and bottom edges at the 800px-tall viewports that are most common. */
const MAX_W = 1200;
const MAX_H = 760;

/* SIZING HAS TWO CAPS. The MAX_W / MAX_H pair above, plus the current viewport
   minus a small breathing inset. The smaller of the two binds, which means:

     - On a desktop wider than MAX_W, the fixed caps are what matter and the
       zoom lands at its familiar large-screen size.
     - On a phone or a narrow window, the viewport binds instead and the image
       is sized to fit inside the current window rather than bleeding off it.

   An earlier version used only the fixed caps and let the overlay scroll when
   the sized image ran past the viewport — which on a phone opened the zoom
   as an off-screen crop the user had to pan to see rather than a picture they
   could take in at once. Adding the viewport constraint restores the
   "fit and centre" resting state for every screen size. The pan-mode code
   below is retained as a safety net for extreme aspect ratios, but the
   viewport cap here means the modeFor check consistently lands on "fit". */

/* Breathing room around the frame at the viewport cap — 16px on each side —
   so the shadow and rounded corners have space to read instead of touching
   the viewport edges. */
const FIT_INSET = 32;

/* Enter is quick and eager; exit is deliberately slower. Shrinking reads
   faster than growing at the same duration — a symmetric 260/260 made the
   close feel abrupt next to the open — so the exit is stretched to give the
   image time to settle back into the page. */
const OPEN_MS = 260;
const CLOSE_MS = 400;

type Rect = { top: number; left: number; width: number; height: number };

/* The image's on-page box, captured at click time. The overlay animates OUT of
   this and back INTO it, which is what makes the zoom read as the same image
   growing rather than a modal appearing over it. */
function rectOf(el: HTMLElement): Rect {
  const { top, left, width, height } = el.getBoundingClientRect();
  return { top, left, width, height };
}

/* The largest box with the image's aspect ratio that fits inside the caps.
   Taking the SMALLER of the two scales is what makes one axis land flush
   against its cap while the other keeps slack — whichever cap the image runs
   into first is the one that binds, and the image is never cropped.

   Deliberately NOT capped at the image's natural size on top of that. An
   earlier version clamped the scale to 1 to avoid resampling a small asset,
   but that made the zoom do nothing at all for the images that most need it:
   the ~322px competitor-analysis thumbnails opened at essentially their
   on-page size, which reads as a broken control rather than a considered
   limit. Filling the frame always is the promise the cursor makes when it
   offers a "+".

   left/top centre the box in the viewport, which is the resting position when
   it fits. In pan mode they are ignored — the scroll container places it.

   MEASURE THE LAYOUT VIEWPORT, NOT window.innerWidth. The frame is
   position: fixed, so its containing block is the initial containing block —
   the viewport MINUS any scrollbar or reserved scrollbar space — and that is
   exactly what documentElement.clientWidth reports. window.innerWidth includes
   that space, and app/globals.css sets `scrollbar-gutter: stable`, so the two
   differ by the scrollbar's width on every desktop page, permanently: hiding
   the page's overflow while the overlay is open does not reclaim a reserved
   gutter.

   Centring against the wider number pushed the frame half a scrollbar to the
   right — a visible gutter on the left, the image against the reserved strip
   on the right — and the cap let it size a full scrollbar wider than the space
   it actually had, so at narrow widths, where the viewport cap binds rather
   than MAX_W, the right edge ran under the scrollbar. Both come from the same
   mismatch, and both go away by measuring the box the frame is positioned in. */
function viewport(): { width: number; height: number } {
  const el = document.documentElement;
  return { width: el.clientWidth, height: el.clientHeight };
}

function fitRect(naturalW: number, naturalH: number): Rect {
  const view = viewport();
  const capW = Math.min(MAX_W, view.width - FIT_INSET);
  const capH = Math.min(MAX_H, view.height - FIT_INSET);
  const scale = Math.min(capW / naturalW, capH / naturalH);
  const width = naturalW * scale;
  const height = naturalH * scale;
  return {
    width,
    height,
    left: (view.width - width) / 2,
    top: (view.height - height) / 2,
  };
}

/* Does the sized image fit on this screen, or does it have to be panned?

   The whole of the screen-size handling, and note what it does NOT do: it
   never changes how big the image is. A breakpoint or a pointer:coarse query
   would have to decide a size per device class and would get the interesting
   cases wrong in both directions — a narrow desktop window behaves like a
   phone here, and a phone showing a small thumbnail behaves like a desktop.
   Asking whether the one sized box happens to fit answers all of them. */
function modeFor(sized: Rect): "fit" | "pan" {
  /* Same layout-viewport measure as fitRect — asking the question against a
     wider box than the frame actually has would answer "fit" for an image that
     is in fact a scrollbar's width too wide. */
  const view = viewport();
  return sized.width <= view.width && sized.height <= view.height
    ? "fit"
    : "pan";
}

type OverlayProps = {
  src: ImageProps["src"];
  alt: string;
  naturalW: number;
  naturalH: number;
  from: Rect;
  onClose: () => void;
  /* Two independent overrides for the overlay frame's chrome.

     frameBackground — sampled from the source's computed background-color
     at open time, so an image with its own card treatment (e.g.
     .image-flow-diagram) carries that colour into the zoom. Null falls
     back to the CSS default in styles/lightbox.css.

     stripChrome — set when the source has .image-transparent-bg. The image
     already contains its own visual framing (border, background) baked
     into the source pixels, so any frame chrome around it reads as a
     frame-inside-a-frame. Nukes bg + box-shadow + border-radius so the
     overlay renders just the image — and, importantly, so the frame's
     shadow doesn't bleed through the source's transparent regions. */
  frameBackground: string | null;
  stripChrome: boolean;
};

function Overlay({
  src,
  alt,
  naturalW,
  naturalH,
  from,
  onClose,
  frameBackground,
  stripChrome,
}: OverlayProps) {
  const [sized, setSized] = useState<Rect>(() => fitRect(naturalW, naturalH));
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<Element | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const mode = modeFor(sized);

  /* Only the centring and the fit/pan verdict move on a resize — the size
     itself is fixed by the caps and doesn't depend on the window. */
  useLayoutEffect(() => {
    const onResize = () => setSized(fitRect(naturalW, naturalH));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [naturalW, naturalH]);

  /* Pan mode opens looking at the MIDDLE of the image rather than its top-left
     corner. Scrolled here on mount instead of via CSS because a scroll
     container has no "start centred" property — and centred is the only
     starting point that doesn't make the image look mis-cropped on arrival. */
  useLayoutEffect(() => {
    if (mode !== "pan") return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  }, [mode, sized.width, sized.height]);

  useEffect(() => {
    restoreTo.current = document.activeElement;
    closeRef.current?.focus();

    const { body } = document;
    const prevOverflow = body.style.overflow;
    /* Whatever width hiding the scroll actually costs, given back as padding.
       Without it, hiding the page's scroll reflows the whole layout one
       scrollbar narrower for the length of the overlay — which the eye reads
       as the page twitching at the exact moment the image lifts off it.

       Measured as the CHANGE in layout width across the overflow change, not
       as `innerWidth - body.clientWidth`. That older expression reports the
       scrollbar's width whether or not hiding overflow reclaims it, and
       app/globals.css sets `scrollbar-gutter: stable`, which reserves the
       strip permanently — so nothing was reclaimed and the compensation was
       pure surplus, padding the body a scrollbar to the right behind the blur.
       Comparing before and after is self-correcting: it yields 0 when the
       gutter is reserved and the real width when it isn't. */
    const prevPad = body.style.paddingRight;
    const widthBefore = document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    const reclaimed = document.documentElement.clientWidth - widthBefore;
    if (reclaimed > 0) body.style.paddingRight = `${reclaimed}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      /* Focus goes back to the image that opened this, so a keyboard user
         lands where they left rather than at the top of the document.
         preventScroll matters here: without it, focus() nudges the source
         image into view and the page settles a few pixels UP right after the
         exit tween finishes. That was invisible before the exit tween played
         (unmount was instant, the nudge got lost in the click), but with the
         tween running for its full duration the settle-scroll lands on its
         own and reads as a bug. */
      (restoreTo.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, []);

  /* pointer-events: none is written to the ref rather than driven by React
     state on purpose. The state path was tried and doesn't take effect:
     setClosing(true) here would batch with the parent's setFrom(null), the
     parent re-renders WITHOUT this Overlay in its output, and AnimatePresence
     keeps the last committed render alive for the exit — which is the render
     from BEFORE this handler ran. Writing the style directly sidesteps that,
     and framer-motion doesn't animate pointer-events so nothing overwrites it
     during the exit. The rig then hit-tests through the exiting overlay to the
     source image and morphs "−" back to "+" in step with the zoom collapsing. */
  const doClose = useCallback(() => {
    if (scrollerRef.current) {
      scrollerRef.current.style.pointerEvents = "none";
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        doClose();
        return;
      }
      /* The overlay is modal, and the only thing in it that takes focus is the
         close button — so the trap is just "keep Tab here" rather than a ring
         of focusable nodes to cycle. */
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [doClose]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Reduced motion keeps the overlay and drops only the flight: the zoom still
     has to happen, it just cross-fades in place instead of travelling. Reduced
     motion also stays symmetric — the whole point of that mode is to be brief,
     so the enter/exit asymmetry above doesn't apply. */
  const EASE = [0.2, 0.8, 0.2, 1] as const;
  const openTransition = reduced
    ? { duration: 0.12 }
    : { duration: OPEN_MS / 1000, ease: EASE };
  const closeTransition = reduced
    ? { duration: 0.12 }
    : { duration: CLOSE_MS / 1000, ease: EASE };

  return (
    <motion.div
      ref={scrollerRef}
      className="lightbox"
      data-mode={mode}
      /* One click target, deliberately: the image and the space around it both
         close. The handler sits here and the frame adds none of its own, so
         the click on the image simply bubbles to this. An earlier version put
         a second zoom level (1:1 plus drag-to-pan) on the frame's own click,
         which meant clicking the zoomed image zoomed FURTHER IN rather than
         back out — the opposite of what the gesture reads as.

         In pan mode this is also the scroll container, and the two gestures
         don't collide: a drag scrolls and never becomes a click, so panning
         can't close the overlay by accident. That is the whole reason panning
         lives on native overflow here rather than on a drag handler. */
      onClick={doClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.18 } }}
      /* Backdrop fade tracks the frame's exit duration so the scrim doesn't
         vanish out from under the still-shrinking image. */
      exit={{ opacity: 0, transition: { duration: CLOSE_MS / 1000 } }}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Zoomed image"}
    >
      <motion.div
        className="lightbox-frame"
        /* Pan mode sizes the frame in normal flow so the scroll container has
           something to scroll, and skips the flight from the thumbnail: the
           target overflows the screen, so there is no destination rect to fly
           to and the geometry animation would be animating to a box the user
           can't see the edges of anyway. It cross-fades instead. */
        style={{
          ...(mode === "pan" ? { width: sized.width, height: sized.height } : {}),
          ...(stripChrome
            ? { background: "transparent", boxShadow: "none", borderRadius: 0 }
            : frameBackground
              ? { background: frameBackground }
              : {}),
        }}
        initial={
          mode === "pan"
            ? { opacity: 0 }
            : reduced
              ? { ...sized, opacity: 0 }
              : from
        }
        animate={
          mode === "pan"
            ? { opacity: 1, transition: { duration: 0.18 } }
            : { ...sized, opacity: 1, transition: openTransition }
        }
        exit={
          mode === "pan"
            ? { opacity: 0, transition: { duration: 0.18 } }
            : reduced
              ? { opacity: 0, transition: closeTransition }
              : { ...from, opacity: 0, transition: closeTransition }
        }
      >
        <Image
          src={src}
          alt={alt}
          width={naturalW}
          height={naturalH}
          /* Off so a click-and-wobble doesn't turn into the browser's native
             image-drag, which would swallow the click that closes. */
          draggable={false}
          sizes="100vw"
          priority
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

      <button
        ref={closeRef}
        type="button"
        className="lightbox-close"
        onClick={doClose}
        aria-label="Close zoomed image"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </motion.div>
  );
}

export default function ZoomableImage({
  alt,
  onClick,
  ...props
}: ImageProps & { alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [from, setFrom] = useState<Rect | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [frameBackground, setFrameBackground] = useState<string | null>(null);
  const [stripChrome, setStripChrome] = useState(false);
  /* Client-only gate for the portal. The alternative — a conditional-on-`from`
     portal — was tried and is what kept the exit animation from ever running:
     with the portal inside `{from ? ... : null}`, closing unmounted the whole
     subtree including AnimatePresence, which then had no lifecycle in which to
     play the exit. Guarding on a mount flag lets AnimatePresence stay put
     across the child coming and going, which is what it's for. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const open = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    setFrom(rectOf(el));
    /* The width/height PROPS, not naturalWidth/Height. The obvious-looking
       choice is the wrong one here: next/image rewrites src to
       /_next/image?w=…, so naturalWidth reports whatever VARIANT the optimizer
       picked for this viewport and DPR — 504px for a 1512px file — and the fit
       math then treats a 1512px screenshot as too small to zoom at all. The
       props are the file's own intrinsics, which is what these pages were
       authored with and what the zoom wants. naturalWidth survives only as the
       fallback for a prop-less caller. */
    setNatural({
      w: Number(props.width) || el.naturalWidth || 0,
      h: Number(props.height) || el.naturalHeight || 0,
    });
    /* Decide the overlay frame's chrome. Three cases:
         1. Source has .image-transparent-bg → strip the frame's bg, shadow,
            and radius. The image already contains its own visual framing
            baked into the source pixels; any frame chrome around it reads
            as a frame-inside-a-frame, and — critically — the shadow bleeds
            through the source's transparent regions as a visible fill.
         2. Source has its own background (e.g. .image-flow-diagram's card
            treatment) → sample and mirror it. Keeps the card visually
            continuous through the zoom.
         3. Otherwise → null, and the frame uses its CSS defaults in
            styles/lightbox.css. */
    if (el.classList.contains("image-transparent-bg")) {
      setStripChrome(true);
      setFrameBackground(null);
    } else {
      setStripChrome(false);
      const bg = window.getComputedStyle(el).backgroundColor;
      setFrameBackground(
        bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent" ? bg : null,
      );
    }
  }, [props.width, props.height]);

  const close = useCallback(() => setFrom(null), []);

  return (
    <>
      <Image
        {...props}
        alt={alt}
        ref={imgRef}
        /* Read by components/Cursor.tsx to swap the pink rig into its `image`
           state — the ring opening into an outlined "+" — which is this
           image's ONLY hover affordance on a fine pointer, since the rig also
           means `cursor` stays `none` here. KEEP IN SYNC with that file. */
        data-zoomable=""
        role="button"
        tabIndex={0}
        aria-label={alt ? `Zoom image: ${alt}` : "Zoom image"}
        onClick={(event) => {
          onClick?.(event);
          open();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
          }
        }}
      />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {from && natural ? (
              <Overlay
                key="lightbox"
                src={props.src}
                alt={alt}
                naturalW={natural.w}
                naturalH={natural.h}
                from={from}
                onClose={close}
                frameBackground={frameBackground}
                stripChrome={stripChrome}
              />
            ) : null}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
