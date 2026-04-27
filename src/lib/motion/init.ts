import { initMotion } from "viewmotion"
import { initPageMotion } from "./page-orchestrator"
import { lenisEngine } from "./engines/lenis-engine"
import { gsapEngine } from "./engines/gsap-engine"

// Must match the slide duration in src/layouts/website.astro
const PAGE_TRANSITION_MS = 1000

let _destroyViewmotion: (() => void) | null = null
let _isNavigation = false

document.addEventListener("astro:before-swap", () => {
  _isNavigation = true
})

async function boot(): Promise<void> {
  const isNav = _isNavigation
  _isNavigation = false

  _destroyViewmotion?.()
  _destroyViewmotion = null

  initPageMotion()
  lenisEngine.destroy()
  lenisEngine.safeInit()

  if (isNav) {
    await new Promise<void>((r) => setTimeout(r, PAGE_TRANSITION_MS))
  }

  gsapEngine.scrollTrigger.refresh()

  const { destroy } = await initMotion({ smoothScroll: false })
  _destroyViewmotion = destroy
}

document.addEventListener("astro:page-load", boot)
