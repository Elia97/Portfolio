import { gsapEngine } from "./engines/gsap-engine"
import { scrollEngine } from "./engines/scroll-engine"
import { DURATION, EASE } from "./presets"

type GsapContext = ReturnType<typeof gsapEngine.createContext>

let _ctx: GsapContext | null = null
let _cleanups: Array<() => void> = []

export function cleanupPageMotion(): void {
  _cleanups.forEach((fn) => fn())
  _cleanups = []
  _ctx?.revert()
  _ctx = null
  scrollEngine.removeResizeRefresh()
}

export function initPageMotion(): void {
  cleanupPageMotion()
  scrollEngine.setupResizeRefresh()

  _ctx = gsapEngine.createContext(() => {
    document
      .querySelectorAll<HTMLElement>("[data-motion-scrub]")
      .forEach((el) => {
        const tween = gsapEngine.gsap.to(el, {
          opacity: 0,
          y: -40,
          duration: DURATION.normal,
          ease: EASE.linear,
          paused: true,
        })

        scrollEngine.createScrollAnimation({
          trigger: el,
          animation: tween,
          scrub: true,
        })
      })
  }, document.body)
}
