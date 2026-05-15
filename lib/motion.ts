/** Motion presets — discret, précision DDRE */
export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  fast: 0.4,
  base: 0.7,
  slow: 1.05,
  cinematic: 1.25,
} as const;

export const fadeReveal = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: motionDurations.base,
    ease: motionEase,
  },
} as const;

export const fadeRevealViewport = {
  once: true,
  margin: "-8%" as const,
};

export const imageParallax = {
  yRange: ["-1%", "1%"] as [string, string],
  scale: 1.015,
};
