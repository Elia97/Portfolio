export const BREAKPOINT_LG = 1024

export const DURATION = {
  instant: 0.2,
  fast: 0.6,
  normal: 1.0,
  slow: 1.2,
} as const

export const EASE = {
  smooth: "power2.out",
  snap: "power3.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
  inOut: "power2.inOut",
  linear: "none",
} as const
