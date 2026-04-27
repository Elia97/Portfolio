import { gsapEngine } from "@/lib/motion/engines/gsap-engine"
import { lenisEngine } from "@/lib/motion/engines/lenis-engine"
import { createSignal } from "@/lib/create-signal"
import { EASE, BREAKPOINT_LG } from "@/lib/motion/presets"

type GsapContext = ReturnType<typeof gsapEngine.createContext>

let _ctx: GsapContext | null = null
const getSignal = createSignal()

// ─── helpers ──────────────────────────────────────────────────────────────

function q<T extends Element>(el: Element, sel: string) {
  return el.querySelector<T>(sel)
}
function qa<T extends Element>(el: Element, sel: string) {
  return Array.from(el.querySelectorAll<T>(sel))
}

// ─── initial states (desktop only) ────────────────────────────────────────

function hidePanel0(panel: HTMLElement) {
  const { gsap } = gsapEngine
  gsap.set(qa(panel, "[data-svg-node]"), { opacity: 0, y: 10 })
  gsap.set(qa(panel, "[data-svg-arrow]"), { opacity: 0 })
  gsap.set(qa(panel, "[data-svg-arrow-label]"), { opacity: 0 })
  gsap.set(q(panel, "[data-svg-response]"), { opacity: 0, y: 8 })
}

function hidePanel1(panel: HTMLElement) {
  const { gsap } = gsapEngine
  const ring = q<SVGCircleElement>(panel, "[data-svg-ring]")
  if (ring) gsap.set(ring, { strokeDasharray: "0 100", strokeDashoffset: 0 })
  gsap.set(qa(panel, "[data-svg-score]"), {
    opacity: 0,
    scale: 0.7,
    transformOrigin: "center",
  })
  gsap.set(qa(panel, "[data-svg-metric]"), { opacity: 0, x: 12 })
}

function hidePanel2(panel: HTMLElement) {
  const { gsap } = gsapEngine
  gsap.set(qa(panel, "[data-svg-step-icon]"), { opacity: 0 })
  gsap.set(qa(panel, "[data-svg-step-label]"), { opacity: 0 })
  gsap.set(qa<SVGLineElement>(panel, "[data-svg-step-line]"), {
    strokeDashoffset: 1,
  })
  gsap.set(q(panel, "[data-svg-status]"), { opacity: 0, y: 8 })
  gsap.set(q(panel, "[data-svg-step-pulse]"), { opacity: 0, attr: { r: 22 } })
}

// ─── animation sequences ──────────────────────────────────────────────────

function animateArchitecture(panel: HTMLElement) {
  const { gsap } = gsapEngine
  const nodes = qa(panel, "[data-svg-node]")
  const arrows = qa(panel, "[data-svg-arrow]")
  const labels = qa(panel, "[data-svg-arrow-label]")
  const response = q(panel, "[data-svg-response]")

  const tl = gsap.timeline()
  tl.to(nodes, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.15,
    ease: EASE.snap,
  })
  tl.to(
    arrows,
    { opacity: 1, duration: 0.3, stagger: 0.2, ease: "none" },
    "-=0.2"
  )
  tl.to(labels, { opacity: 1, duration: 0.25, stagger: 0.15 }, "-=0.2")
  if (response)
    tl.to(
      response,
      { opacity: 1, y: 0, duration: 0.35, ease: EASE.snap },
      "-=0.1"
    )
}

function animateMetrics(panel: HTMLElement) {
  const { gsap } = gsapEngine
  const ring = q<SVGCircleElement>(panel, "[data-svg-ring]")
  const scores = qa(panel, "[data-svg-score]")
  const metrics = qa(panel, "[data-svg-metric]")

  const tl = gsap.timeline()
  if (ring) {
    tl.to(
      ring,
      { strokeDasharray: "97 3", duration: 1.5, ease: "power2.out" },
      0
    )
  }
  if (scores.length) {
    tl.to(
      scores,
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: EASE.bounce },
      0.5
    )
  }
  metrics.forEach((m) => gsap.set(m, { x: 12 }))
  tl.to(
    metrics,
    { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: EASE.snap },
    0.9
  )
}

function animatePipeline(panel: HTMLElement) {
  const { gsap } = gsapEngine
  const steps = qa(panel, "[data-svg-step]")
  const lines = qa<SVGLineElement>(panel, "[data-svg-step-line]")
  const status = q(panel, "[data-svg-status]")
  const liveDot = q(panel, "[data-svg-live-dot]")
  const pulse = q(panel, "[data-svg-step-pulse]")

  const tl = gsap.timeline()

  steps.forEach((step, i) => {
    const bg = q<SVGCircleElement>(step, "[data-svg-step-bg]")
    const icon = q(step, "[data-svg-step-icon]")
    const label = q(step, "[data-svg-step-label]")
    const t = i * 0.36

    if (i > 0 && lines[i - 1]) {
      tl.to(
        lines[i - 1],
        { strokeDashoffset: 0, duration: 0.2, ease: "none" },
        t - 0.12
      )
    }
    if (bg) {
      tl.to(
        bg,
        {
          attr: {
            stroke: "var(--primary)",
            fill: "var(--primary)",
            "fill-opacity": 0.12,
          },
          duration: 0.25,
        },
        t
      )
    }
    if (icon)
      tl.to(icon, { opacity: 1, duration: 0.2, ease: EASE.smooth }, t + 0.05)
    if (label)
      tl.to(label, { opacity: 1, duration: 0.2, ease: EASE.smooth }, t + 0.1)
  })

  const endT = steps.length * 0.36
  if (status) {
    gsap.set(status, { y: 8 })
    tl.to(status, { opacity: 1, y: 0, duration: 0.4, ease: EASE.snap }, endT)
  }
  if (liveDot) {
    tl.to(
      liveDot,
      {
        scale: 1.5,
        transformOrigin: "center",
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
      endT + 0.3
    )
  }
  if (pulse) {
    tl.to(
      pulse,
      {
        opacity: 0.6,
        attr: { r: 34 },
        duration: 1.1,
        repeat: -1,
        ease: "power2.out",
      },
      endT + 0.2
    )
    tl.to(pulse, { opacity: 0, duration: 0.4 }, endT + 0.9)
  }
}

const animators = [animateArchitecture, animateMetrics, animatePipeline]
const hiders = [hidePanel0, hidePanel1, hidePanel2]

// ─── setup ────────────────────────────────────────────────────────────────

function setupWork(): void {
  _ctx?.revert()
  _ctx = null
  const signal = getSignal()

  const section = document.querySelector<HTMLElement>("[data-work-section]")
  if (!section) return

  const desktop = section.querySelector<HTMLElement>("[data-work-desktop]")
  const sticky = desktop?.querySelector<HTMLElement>("[data-work-sticky]")
  const track = desktop?.querySelector<HTMLElement>("[data-work-track]")
  const panels = Array.from(
    desktop?.querySelectorAll<HTMLElement>("[data-work-panel]") ?? []
  )
  const dots = Array.from(
    desktop?.querySelectorAll<HTMLElement>("[data-work-dot]") ?? []
  )

  if (!desktop || !sticky || !track || panels.length === 0) return
  if (gsapEngine.prefersReduceMotion()) return

  _ctx = gsapEngine.createContext(() => {
    const { gsap } = gsapEngine
    {
      const scrollDistance = () => (panels.length - 1) * window.innerWidth
      let currentIdx = 0
      let isSnapping = false

      // Set initial hidden states for all panels
      panels.forEach((p, i) => hiders[i]?.(p))

      if (dots[0])
        gsap.set(dots[0], { width: 24, backgroundColor: "var(--primary)" })

      const updateDots = (idx: number) => {
        dots.forEach((dot, i) =>
          gsap.to(dot, {
            width: i === idx ? 24 : 16,
            backgroundColor: i === idx ? "var(--primary)" : "var(--border)",
            duration: 0.25,
            ease: EASE.smooth,
            overwrite: true,
          })
        )
      }

      const { scrollTrigger: ST } = gsapEngine

      // Scrub visual position
      gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: desktop,
          pin: sticky,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate(self) {
            currentIdx = Math.round(self.progress * (panels.length - 1))
            updateDots(currentIdx)
          },
        },
      })

      // Dedicated trigger for panel 0
      ST.create({
        trigger: desktop,
        start: "top 80%",
        once: true,
        onEnter: () => animators[0]?.(panels[0]),
      })

      // Snap via lenis.scrollTo on wheel
      const snapTo = (idx: number) => {
        if (isSnapping) return
        const target = Math.max(0, Math.min(panels.length - 1, idx))
        isSnapping = true
        currentIdx = target
        updateDots(target)
        animators[target]?.(panels[target])

        lenisEngine.lenis?.scrollTo(
          section.offsetTop + target * window.innerWidth,
          {
            duration: 0.6,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            lock: true,
            onComplete: () => {
              isSnapping = false
            },
          }
        )
      }

      window.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          if (window.innerWidth < BREAKPOINT_LG) return
          const scrollY = window.scrollY
          const sectionStart = section.offsetTop
          const sectionEnd = sectionStart + scrollDistance()

          if (scrollY < sectionStart - 10 || scrollY > sectionEnd + 10) return
          if (e.deltaY > 0 && currentIdx >= panels.length - 1) return
          if (e.deltaY < 0 && currentIdx <= 0) return

          snapTo(currentIdx + (e.deltaY > 0 ? 1 : -1))
        },
        { signal }
      )
    }
  }, section)
}

document.addEventListener("astro:page-load", setupWork)
