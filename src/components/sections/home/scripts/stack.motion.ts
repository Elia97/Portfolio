import { gsapEngine } from "@/lib/motion/engines/gsap-engine"
import { lenisEngine } from "@/lib/motion/engines/lenis-engine"
import { EASE } from "@/lib/motion/presets"

type GsapContext = ReturnType<typeof gsapEngine.createContext>

let _ctx: GsapContext | null = null
let _scrollAbort: AbortController | null = null

function setupStack(): void {
  _ctx?.revert()
  _ctx = null
  _scrollAbort?.abort()
  _scrollAbort = null

  const section = document.querySelector<HTMLElement>("[data-stack-section]")
  if (!section) return

  const grid = section.querySelector<HTMLElement>("[data-stack-grid]")
  const icons = Array.from(
    section.querySelectorAll<HTMLElement>("[data-stack-icon]")
  )
  const scrollBtn = section.querySelector<HTMLElement>("[data-stack-scroll]")

  if (!grid || icons.length === 0) return

  if (gsapEngine.prefersReduceMotion()) {
    gsapEngine.gsap.set(icons, { opacity: 1 })
    return
  }

  // Misure prima di nascondere — getBoundingClientRect richiede DOM visibile
  const sectionRect = section.getBoundingClientRect()
  const gridRect = grid.getBoundingClientRect()
  const gridCenterX = gridRect.left + gridRect.width / 2 - sectionRect.left
  const gridCenterY = gridRect.top + gridRect.height / 2 - sectionRect.top

  _ctx = gsapEngine.createContext(() => {
    const { gsap } = gsapEngine

    gsap.set(icons, { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to({}, { duration: 0.1 })

    icons.forEach((icon, index) => {
      const rect = icon.getBoundingClientRect()
      const iconCenterX = rect.left + rect.width / 2 - sectionRect.left
      const iconCenterY = rect.top + rect.height / 2 - sectionRect.top

      tl.fromTo(
        icon,
        {
          autoAlpha: 0,
          scale: 0,
          x: gridCenterX - iconCenterX,
          y: gridCenterY - iconCenterY,
        },
        { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: 1, ease: EASE.bounce },
        index * 0.3
      )
    })

    if (scrollBtn)
      tl.to(scrollBtn, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")

    tl.to({}, { duration: 0.4 })
  }, section)

  if (scrollBtn) {
    _scrollAbort = new AbortController()
    scrollBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault()
        const target = document.querySelector<HTMLElement>(
          "[data-services-section]"
        )
        if (target)
          lenisEngine.lenis?.scrollTo(target, { offset: -40, duration: 5 })
      },
      { signal: _scrollAbort.signal }
    )
  }
}

document.addEventListener("astro:page-load", setupStack)
