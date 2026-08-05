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
   .lightbox-link-5 must stay an <a> so the stylesheet's bare
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

/* ONE SIZING RULE FOR EVERY SCREEN. The image is grown into the cap box above
   and that is the end of it — the viewport is not consulted. What the viewport
   decides is only what happens NEXT: if the result fits, it sits centred; if
   it doesn't, the overlay scrolls and the image is panned.

   That is what makes a phone work without a second model for it. The reason
   the earlier viewport-relative sizing failed there was structural: on a
   portrait screen the case-study column already runs nearly edge to edge, so
   fitting the image to the viewport returned it at 1.03x — measured — and the
   zoom was a full-screen interruption that changed nothing. Sizing to a cap
   instead means a phone gets the same 1170px-wide screenshot a desktop gets;
   it just arrives as something to pan rather than something to take in at
   once. */

/* Mirrors the transition below, and used only to hold the scroll lock until
   the close animation has actually finished. Restoring the page's scroll while
   the image is still flying back to its slot makes it fly to the wrong place. */
const EXIT_MS = 260;

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
   it fits. In pan mode they are ignored — the scroll container places it. */
function fitRect(naturalW: number, naturalH: number): Rect {
  const scale = Math.min(MAX_W / naturalW, MAX_H / naturalH);
  const width = naturalW * scale;
  const height = naturalH * scale;
  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
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
  return sized.width <= window.innerWidth && sized.height <= window.innerHeight
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
};

function Overlay({
  src,
  alt,
  naturalW,
  naturalH,
  from,
  onClose,
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
    /* The scrollbar's width, given back as padding. Without it, hiding the
       page's scroll reflows the whole layout one scrollbar narrower for the
       length of the overlay — which the eye reads as the page twitching at
       the exact moment the image lifts off it. */
    const gutter = window.innerWidth - body.clientWidth;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      /* Focus goes back to the image that opened this, so a keyboard user
         lands where they left rather than at the top of the document. */
      (restoreTo.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
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
  }, [onClose]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Reduced motion keeps the overlay and drops only the flight: the zoom still
     has to happen, it just cross-fades in place instead of travelling. */
  const transition = reduced
    ? { duration: 0.12 }
    : { duration: EXIT_MS / 1000, ease: [0.2, 0.8, 0.2, 1] as const };

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
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
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
        style={
          mode === "pan"
            ? { width: sized.width, height: sized.height }
            : undefined
        }
        initial={
          mode === "pan"
            ? { opacity: 0 }
            : reduced
              ? { ...sized, opacity: 0 }
              : from
        }
        animate={mode === "pan" ? { opacity: 1 } : { ...sized, opacity: 1 }}
        exit={
          mode === "pan"
            ? { opacity: 0 }
            : reduced
              ? { opacity: 0 }
              : { ...from, opacity: 0 }
        }
        transition={mode === "pan" ? { duration: 0.18 } : transition}
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
        onClick={onClose}
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

      {/* No mounted/isClient guard, deliberately: `from` is set only by the
          click handler, so document.body is guaranteed to exist by the time
          this branch can ever be taken. The usual guard would be a render
          pass and an effect spent proving something the control flow already
          guarantees. */}
      {from && natural
        ? createPortal(
            <AnimatePresence>
              <Overlay
                key="lightbox"
                src={props.src}
                alt={alt}
                naturalW={natural.w}
                naturalH={natural.h}
                from={from}
                onClose={close}
              />
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
