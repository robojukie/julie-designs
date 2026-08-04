"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

/* The waving "Hi!" next to "I'm Julie". Served from /documents/, the same path
   the export uses, so scripts/port-images.js is the single thing that puts it
   there and there's no second copy to drift.

   TWO separate animations live on this icon, which is easy to miss:

   1. The Lottie clip itself (the face). The custom hero-title embed in
      index.html plays it on a timer after the letters land, and IX2's
      `pluginLottie` replays it on hover/click.

   2. The WAVE — IX2 action list a-14, which rocks the whole icon by rotating
      `.lottie-animation-hi`. It is NOT part of the Lottie file. On home it is
      bound to PAGE_FINISH (so it runs on load) as well as MOUSE_OVER and
      MOUSE_CLICK. Missing this is what made the page look like it had no wave
      even once the clip was playing at the right time. */

// a-14, skipping its first group — `useFirstGroupAsInitialState: true` marks
// that as the resting state (rotate 0) rather than an animated step.
const WAVE_DELAY_MS = 1100;
const WAVE_STEPS: Array<{ deg: number; ms: number }> = [
  { deg: 10, ms: 300 },
  { deg: -10, ms: 300 },
  { deg: 10, ms: 300 },
  { deg: -10, ms: 300 },
  { deg: 0, ms: 500 },
];

const WAVE_TOTAL_MS = WAVE_STEPS.reduce((sum, s) => sum + s.ms, 0);
const WAVE_KEYFRAMES = [0, ...WAVE_STEPS.map((s) => s.deg)];
// Cumulative step boundaries as 0..1 offsets, so each leg keeps its own duration.
const WAVE_TIMES = WAVE_STEPS.reduce<number[]>(
  (times, step) => [...times, times[times.length - 1] + step.ms / WAVE_TOTAL_MS],
  [0]
);
// Webflow leaves `easing` empty on every step, which is its "ease" default.
const WAVE_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type HiLottieProps = {
  /* What runs on page load, after WAVE_DELAY_MS:
       "wave"           — rock only. Prototypes: a-14 is bound to PAGE_FINISH
                          there, but nothing plays the clip until you hover.
       "wave-then-clip" — rock, then play the face as it settles. Home, which
                          additionally has the custom embed's clip timer.
     Omitted on archive: it uses a different list (a-146) with its own timing,
     so it waves on hover only. */
  loadSequence?: "wave" | "wave-then-clip";
  className?: string;
};

export type HiLottieHandle = {
  /* Lets a trigger outside this component (e.g. the whole "Hi I'm Julie"
     hero title) replay the wave + clip, since the interactive area no
     longer matches this component's own DOM. */
  replay: () => void;
};

const HiLottie = forwardRef<HiLottieHandle, HiLottieProps>(function HiLottie(
  { loadSequence, className },
  ref
) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const waveControls = useRef<AnimationPlaybackControls | null>(null);
  const waveGeneration = useRef(0);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/documents/Hi-pink-1_1.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* Rotates `.lottie-animation-hi` — the element a-14 targets — rather than the
     outer container, which carries the `fade-in-up` CSS animation. That
     animation is `forwards`, so its held transform would overwrite anything set
     here. Queried from the container because lottie-react renders that div
     itself and doesn't forward a ref to it. */
  const wave = useCallback((delayMs: number, onFinish?: () => void) => {
    const element = containerRef.current?.querySelector<HTMLElement>(
      ".lottie-animation-hi"
    );
    if (!element) return;

    // Reduced motion: no rocking, so "when the wave finishes" is now.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onFinish?.();
      return;
    }

    /* Guards the callback against a wave that gets superseded — hover again
       mid-rock and the first animation is stopped, which must not still fire
       its follow-up and play the clip out of sequence. */
    const generation = ++waveGeneration.current;

    waveControls.current?.stop();
    const controls = animate(
      element,
      { rotate: WAVE_KEYFRAMES },
      {
        duration: WAVE_TOTAL_MS / 1000,
        delay: delayMs / 1000,
        times: WAVE_TIMES,
        ease: WAVE_EASE,
      }
    );
    waveControls.current = controls;

    if (onFinish) {
      controls.then(
        () => {
          if (generation === waveGeneration.current) onFinish();
        },
        () => {} // stopped mid-flight; the newer wave owns the follow-up
      );
    }
  }, []);

  useEffect(() => () => waveControls.current?.stop(), []);

  /* Wait until the page is actually being looked at before starting the clock.
     Browsers suspend requestAnimationFrame in hidden tabs, and both lottie-web
     and Motion are rAF-driven — so firing these on a background tab burns the
     whole (non-looping) sequence with no frames rendered, and by the time the
     tab is focused it has already "finished" without ever being seen. */
  useEffect(() => {
    if (!animationData || !loadSequence) return;

    const start = () => {
      wave(
        WAVE_DELAY_MS,
        loadSequence === "wave-then-clip"
          ? () => lottieRef.current?.play()
          : undefined
      );
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      start();
    };

    if (document.visibilityState === "visible") start();
    else document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [animationData, loadSequence, wave]);

  /* Hover/click rocks, then plays the face as the rock settles — the same order
     as the load sequence. The clip restarts from frame 0 because a plain
     .play() no-ops once a non-looping animation has reached its last frame.

     No delay before the wave here: a-14's 1100ms exists to let the hero text
     land on first load, and waiting over a second after a deliberate hover
     would just read as broken. */
  const replay = useCallback(() => {
    wave(0, () => lottieRef.current?.goToAndPlay(0, true));
  }, [wave]);

  useImperativeHandle(ref, () => ({ replay }), [replay]);

  return (
    <div
      ref={containerRef}
      className={`page-title-lottie-container${className ? ` ${className}` : ""}`}
    >
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          className="lottie-animation-hi"
        />
      )}
    </div>
  );
});

export default HiLottie;
