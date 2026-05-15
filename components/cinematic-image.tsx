"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { imageParallax, motionEase } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  overlayClassName?: string;
  objectPosition?: string;
  overlay?: "dark" | "light" | "none";
  /** hero = plus lumineux ; band = bandeaux intermédiaires */
  grade?: "hero" | "band";
};

const overlayLight =
  "bg-gradient-to-b from-[oklch(0.99_0.006_88/0.38)] via-transparent to-[oklch(0.96_0.01_86/0.55)]";

export function CinematicImage({
  src,
  alt,
  priority = false,
  className,
  overlayClassName,
  objectPosition = "center",
  overlay = "dark",
  grade = "band",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], imageParallax.yRange);

  const gradeClass =
    grade === "hero" ? "xten-cinematic-grade-hero" : "xten-cinematic-grade-band";
  const overlayClass =
    overlay === "dark"
      ? grade === "hero"
        ? "xten-cinematic-overlay-hero"
        : "xten-cinematic-overlay-band"
      : overlay === "light"
        ? overlayLight
        : "";

  return (
    <motion.div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden={alt === ""}
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, scale: imageParallax.scale }}
        transition={{ ease: motionEase }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={gradeClass}
          style={{ objectPosition }}
        />
      </motion.div>
      {overlay !== "none" ? (
        <>
          <motion.div
            className={cn("absolute inset-0", overlayClass, overlayClassName)}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: motionEase }}
          />
          {overlay === "dark" ? (
            <motion.div
              className="xten-cinematic-warm-wash absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: motionEase }}
              aria-hidden
            />
          ) : null}
        </>
      ) : null}
    </motion.div>
  );
}
