/** Cinematic motion presets — DDRE-style slow, elegant transitions */
export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  fast: 0.45,
  base: 0.85,
  slow: 1.15,
  cinematic: 1.4,
} as const;

export const fadeReveal = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: motionDurations.slow,
    ease: motionEase,
  },
} as const;

export const fadeRevealViewport = {
  once: true,
  margin: "-12%" as const,
};

export const imageParallax = {
  yRange: ["-6%", "6%"] as [string, string],
  scale: 1.08,
};
