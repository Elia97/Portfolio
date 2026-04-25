import Lenis from "lenis"
import { scrollEngine } from "./scroll-engine"
import { gsapEngine } from "./gsap-engine"
import { BREAKPOINT_LG } from "../presets"

class LenisEngine {
  private static instance: LenisEngine
  private engine = gsapEngine
  private scroll = scrollEngine
  private _lenis: Lenis | null = null
  private initialized = false
  private mq: MediaQueryList | null = null
  private mqHandler: ((e: MediaQueryListEvent) => void) | null = null

  private constructor() {}

  public get lenis() {
    return this._lenis
  }

  public safeInit() {
    if (typeof window === "undefined") return

    this.mq = window.matchMedia(`(min-width: ${BREAKPOINT_LG}px)`)

    this.mqHandler = (e) => {
      if (e.matches && !this.initialized) {
        this.init()
      } else if (!e.matches && this.initialized) {
        this.destroyLenis()
      }
    }

    this.mq.addEventListener("change", this.mqHandler)

    if (this.mq.matches) {
      this.init()
    }
  }

  private init() {
    if (this.initialized) return

    this._lenis = new Lenis()

    this._lenis.on("scroll", () => {
      this.scroll.updateScroll()
    })

    this.engine.addTick(this.tick)

    window.addEventListener("resize", this.refresh)

    this.initialized = true
  }

  private tick = (time: number): void => {
    if (!this.lenis) return
    this.lenis.raf(time * 1000)
  }

  public static getInstance(): LenisEngine {
    return this.instance ?? (this.instance = new LenisEngine())
  }

  public refresh = () => {
    if (!this.initialized || !this.lenis) return
    this.lenis.resize()
  }

  private destroyLenis() {
    if (!this.initialized) return

    this.engine.removeTick(this.tick)
    window.removeEventListener("resize", this.refresh)

    this.lenis?.destroy()
    this._lenis = null

    this.initialized = false
  }

  public destroy() {
    if (this.mq && this.mqHandler) {
      this.mq.removeEventListener("change", this.mqHandler)
      this.mq = null
      this.mqHandler = null
    }

    this.destroyLenis()
  }
}

export const lenisEngine = LenisEngine.getInstance()
