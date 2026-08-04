"use client";

import { forwardRef } from "react";
import HiLottie, { type HiLottieHandle } from "@/components/HiLottie";

// Faithful port of the custom JS embed in juliepaik.webflow/index.html
// (search "hero-title-span-wrapper") — not IX2-driven, so translated directly
// rather than reverse-engineered from the interaction data.
const TEXT = "I'm Julie";
const TEXT_OFFSET = 0.07;
const LETTER_STAGGER = 0.07;

/* The letters finish landing at 1030ms: TEXT_OFFSET + 8 staggers + the 0.4s
 * fade. HiLottie starts its wave at 1100ms — a-14's own delay — so the icon
 * takes over right as the text settles, and the face then plays as the wave
 * ends. The timing lives in HiLottie because a-14 is its source.
 *
 * (The embed computed a separate clip delay here as
 * `textOffset + text.length * 0.7 + 0.4`, using 0.7 where every other timing in
 * that script uses 0.07 — 6770ms for a 9-character string, nearly six seconds
 * after anything else moves, which is why the greeting looked absent. Its
 * corrected value, 1100ms, turned out to equal a-14's delay exactly, so the
 * wave's own timing now drives the whole sequence.)
 */

// Forwards a ref to HiLottie so the hover/click trigger — now the whole
// "Hi I'm Julie" title in page.tsx, not just the icon — can replay it.
const HeroTitle = forwardRef<HiLottieHandle>(function HeroTitle(_props, ref) {
  return (
    <>
      <div className="site-title">
        <div className="page-title-text-wrapper hi">
          {/* IX2 a-14 is bound to PAGE_FINISH on this page, so the icon rocks
              on load as well as on hover; the face plays as the rock settles. */}
          <HiLottie ref={ref} loadSequence="wave-then-clip" className="fade-in-up" />
        </div>
        {/* Empty in the original too (just carried an inline script tag) —
            kept because .site-title's flex gap uses it to space the icon
            away from the text that follows; removing it collapses the gap. */}
        <div className="page-title-text-wrapper" />
      </div>
      <span className="hero-title-span-wrapper">
        {TEXT.split("").map((char, i) => (
          <span
            key={i}
            className="hero-title-text main-page home-page fade-in-up"
            style={{ animationDelay: `${TEXT_OFFSET + i * LETTER_STAGGER}s` }}
          >
            {/* The embed uses \u00A0, not a plain space, and it matters: the
                ported .hero-title-text is display:flex, so a regular space in
                a span of its own collapses to zero width and the hero reads
                "I'mJulie". */}
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </>
  );
});

export default HeroTitle;
