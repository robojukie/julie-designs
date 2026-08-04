"use client";

import { motion, useScroll, useTransform } from "motion/react";

// Matches the "progress bar animation - <case study>" IX2 action lists: a
// SCROLL_PROGRESS-driven TRANSFORM_SCALE, xValue 0 at keyframe 0% and xValue 1
// at keyframe 97% (not 100%) of scroll — reproduced here via the same input range.
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 0.97], [0, 1], {
    clamp: true,
  });

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
}
