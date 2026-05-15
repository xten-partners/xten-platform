"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeReveal, fadeRevealViewport, motionDurations, motionEase } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function EditorialFadeIn({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <motion.div className={className}>{children}</motion.div>;
  }

  return (
    <motion.div
      className={className}
      initial={fadeReveal.initial}
      whileInView={fadeReveal.animate}
      viewport={fadeRevealViewport}
      transition={{
        duration: motionDurations.base,
        delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}
