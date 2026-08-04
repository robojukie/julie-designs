import { animate } from "motion/react";

/* Eased scroll to an in-page section.
 * ---------------------------------------------------------------------------
 * This is INTENTIONALLY SEPARATE from the page-transition timing in
 * components/FadeIn.tsx. They are two different transitions that happen to feel
 * similar today; changing the page fade later should not silently retime the
 * scroll, and vice versa. Nothing here imports from FadeIn and nothing in
 * FadeIn imports from here — if you want them to match again, copy the values
 * across deliberately rather than sharing a constant.
 *
 * Replaces `scrollIntoView({ behavior: "smooth" })`, whose duration and easing
 * are entirely browser-controlled — Chrome, Safari and Firefox each pick their
 * own, and none of them are tunable.
 */
export const SECTION_SCROLL = {
  duration: 0.7,
  /* easeOutQuint — leaves quickly, settles softly. The long tail is what reads
     as "smooth"; a symmetric ease stops abruptly by comparison. */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

/**
 * Scrolls the window so `element` sits at the top of the viewport.
 *
 * Honours prefers-reduced-motion by jumping instead of animating, and cancels
 * as soon as the user scrolls themselves — a scroll animation that fights the
 * wheel feels broken, which is the main way hand-rolled smooth scrolling goes
 * wrong.
 *
 * @param offset px to leave above the element, e.g. for a sticky header.
 */
export function scrollToSection(element: HTMLElement, offset = 0) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(
    0,
    Math.min(
      maxScroll,
      Math.round(window.scrollY + element.getBoundingClientRect().top - offset)
    )
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, target);
    return;
  }

  const controls = animate(window.scrollY, target, {
    ...SECTION_SCROLL,
    onUpdate: (value) => window.scrollTo(0, value),
  });

  // Any real user input wins immediately.
  const cancel = () => {
    controls.stop();
    removeListeners();
  };
  const removeListeners = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  window.addEventListener("keydown", cancel, { once: true });

  controls.then(removeListeners, removeListeners);
}
