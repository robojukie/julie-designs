"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Matches the IX2 "fade in description" / "fade in work" / "fade about" /
// "fade writing" action lists: opacity 0 -> 1, 500ms delay, 500ms duration.
export default function FadeIn({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
