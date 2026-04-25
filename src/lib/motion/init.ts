import { initPageMotion } from "./page-orchestrator"
import { lenisEngine } from "./engines/lenis-engine"

function boot(): void {
  initPageMotion()
  lenisEngine.destroy()
  lenisEngine.safeInit()
}

document.addEventListener("astro:page-load", boot)
