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

/* Fraction of the viewport the fitted image is allowed to fill. The remainder
   is the margin that keeps the image reading as a thing ON the backdrop rather
   than a new page — Webflow's own lightbox leaves about this much. */
const FIT = 0.92;

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

/* Largest box with the image's aspect ratio that fits the viewport, capped at
   the image's natural size so a small asset is never blown up into its own
   pixels. For the case-study screenshots — 1500px+ files rendered into an
   800px column — the cap never binds and this is a genuine ~1.8x. */
function fitRect(naturalW: number, naturalH: number): Rect {
  const maxW = window.innerWidth * FIT;
  const maxH = window.innerHeight * FIT;
  const scale = Math.min(maxW / naturalW, maxH / naturalH, 1);
  const width = naturalW * scale;
  const height = naturalH * scale;
  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
  };
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
  const [fitted, setFitted] = useState<Rect>(() => fitRect(naturalW, naturalH));
  /* Second level of zoom: the fitted image is still a DOWNSCALE of assets like
     the 10564px async-flow diagram, where fit-to-screen is legible as a shape
     and not as text. Clicking the image again goes to 1:1 and lets it be
     dragged. Webflow had no such level; the images that need it are the reason
     "zoomable" is the word for this and "lightbox" isn't. */
  const [actual, setActual] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<Element | null>(null);

  /* Only offered where it buys real pixels. Below this margin the 1:1 view is
     the same picture a hair larger, and the mode switch is just a trap the
     user has to click their way back out of. */
  const canZoom = naturalW > fitted.width * 1.15;

  useLayoutEffect(() => {
    const onResize = () => {
      setFitted(fitRect(naturalW, naturalH));
      setActual(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [naturalW, naturalH]);

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

  const target: Rect = actual
    ? {
        width: naturalW,
        height: naturalH,
        left: (window.innerWidth - naturalW) / 2,
        top: (window.innerHeight - naturalH) / 2,
      }
    : fitted;

  return (
    <motion.div
      className="lightbox"
      /* Clicking anywhere that isn't the image closes — including the generous
         dead space the FIT margin leaves around it. */
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
        data-actual={actual ? "true" : "false"}
        initial={reduced ? { ...fitted, opacity: 0 } : from}
        animate={{ ...target, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { ...from, opacity: 0 }}
        transition={transition}
        drag={actual}
        dragMomentum={false}
        /* Panning is bounded by how far the image overhangs the viewport, so
           it can never be dragged off into empty space. */
        dragConstraints={{
          left: Math.min(0, window.innerWidth - target.width) / 2,
          right: -Math.min(0, window.innerWidth - target.width) / 2,
          top: Math.min(0, window.innerHeight - target.height) / 2,
          bottom: -Math.min(0, window.innerHeight - target.height) / 2,
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (canZoom) setActual((on) => !on);
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={naturalW}
          height={naturalH}
          /* draggable off so a pan doesn't turn into the browser's native
             image-drag halfway through. */
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
