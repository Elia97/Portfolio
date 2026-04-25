import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger"
import { gsapEngine } from "./gsap-engine"

export interface ScrollAnimationConfig {
  trigger: string | Element
  animation: gsap.core.Animation
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  once?: boolean
  invalidateOnRefresh?: boolean
  onUpdate?: (self: ScrollTriggerType) => void
}

class ScrollEngine {
  private static instance: ScrollEngine
  private engine = gsapEngine
  private resizeCallback: (() => void) | null = null

  private constructor() {
    if (typeof window === "undefined") return
  }

  public static getInstance(): ScrollEngine {
    return this.instance ?? (this.instance = new ScrollEngine())
  }

  public createScrollAnimation(
    config: ScrollAnimationConfig
  ): ScrollTriggerType {
    const {
      trigger,
      animation,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      pin = false,
      markers = false,
      once = false,
      invalidateOnRefresh = true,
      onUpdate,
    } = config

    return this.engine.scrollTrigger.create({
      trigger,
      animation,
      start,
      end,
      scrub,
      pin,
      markers,
      toggleActions: once ? "play none none none" : "play none none reverse",
      invalidateOnRefresh,
      onUpdate,
    })
  }

  public createBatchReveal(
    selector: string,
    onEnter: (elements: HTMLElement[]) => void
  ): void {
    this.engine.scrollTrigger.batch(selector, {
      onEnter: (batch) => onEnter(batch as HTMLElement[]),
      start: "top 85%",
      once: true,
    })
  }

  public setupResizeRefresh(debounceMs = 200): void {
    this.removeResizeRefresh()

    let resizeTimeout: ReturnType<typeof setTimeout>
    this.resizeCallback = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(
        () => this.engine.scrollTrigger.refresh(),
        debounceMs
      )
    }

    window.addEventListener("resize", this.resizeCallback)
  }

  public removeResizeRefresh(): void {
    if (this.resizeCallback) {
      window.removeEventListener("resize", this.resizeCallback)
      this.resizeCallback = null
    }
  }

  public updateScroll() {
    this.engine.scrollTrigger.update()
  }
}

export const scrollEngine = ScrollEngine.getInstance()
