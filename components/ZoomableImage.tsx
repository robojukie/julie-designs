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

const MAX_W = 1200;
const MAX_H = 760;
const FIT_INSET = 32;

const OPEN_MS = 260;
const CLOSE_MS = 400;

type Rect = { top: number; left: number; width: number; height: number };

function rectOf(el: HTMLElement): Rect {
  const { top, left, width, height } = el.getBoundingClientRect();
  return { top, left, width, height };
}

/* documentElement.clientWidth, not window.innerWidth: the frame is fixed, so it
   resolves against the viewport MINUS the reserved scrollbar gutter. innerWidth
   includes that strip and pushes the frame half a scrollbar right. */
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

function modeFor(sized: Rect): "fit" | "pan" {
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

  useLayoutEffect(() => {
    const onResize = () => setSized(fitRect(naturalW, naturalH));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [naturalW, naturalH]);

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
    const prevPad = body.style.paddingRight;
    /* Probe body.clientWidth, not documentElement.clientWidth. On the root,
       clientWidth reports the VIEWPORT, which does lose the scrollbar here —
       but `scrollbar-gutter: stable` keeps the layout box the same width, so
       the root measure pads a body that never narrowed and shifts the page. */
    const widthBefore = body.clientWidth;
    body.style.overflow = "hidden";
    const reclaimed = body.clientWidth - widthBefore;
    if (reclaimed > 0) body.style.paddingRight = `${reclaimed}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      /* preventScroll: without it, focus() nudges the source image into view
         and the page settles a few pixels up after the exit tween ends. */
      (restoreTo.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, []);

  /* Written to the ref, not React state: AnimatePresence replays the last
     committed render for the exit, so a state change here never lands. */
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
      onClick={doClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.18 } }}
      exit={{ opacity: 0, transition: { duration: CLOSE_MS / 1000 } }}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Zoomed image"}
    >
      <motion.div
        className="lightbox-frame"
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
  /* A mount flag, not a conditional portal: wrapping the portal in `from &&`
     unmounts AnimatePresence on close, leaving no lifecycle to play the exit. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const open = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    setFrom(rectOf(el));
    /* The width/height PROPS, not naturalWidth/Height: next/image rewrites src
       to /_next/image?w=…, so naturalWidth reports the optimizer's variant for
       this viewport rather than the file's own intrinsics. */
    setNatural({
      w: Number(props.width) || el.naturalWidth || 0,
      h: Number(props.height) || el.naturalHeight || 0,
    });
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
      {/* The interaction sits on the <img> itself: these images depend on the
          sizing chain of the containers around them, so an added wrapper box —
          a <button>, a div — changes their layout. */}
      <Image
        {...props}
        alt={alt}
        ref={imgRef}
        /* Read by components/Cursor.tsx for its `image` state. KEEP IN SYNC. */
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
