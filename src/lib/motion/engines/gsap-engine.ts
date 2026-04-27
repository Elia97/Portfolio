import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

class GsapEngine {
  private initialized = false
  private _reduceMotion = false
  private static instance: GsapEngine

  private constructor() {
    this.safeInit()
  }

  public get gsap() {
    return gsap
  }

  public get scrollTrigger() {
    return ScrollTrigger
  }

  private safeInit() {
    if (typeof window === "undefined") return
    this.init()
  }

  private init() {
    if (this.initialized) return

    this.gsap.registerPlugin(ScrollTrigger, TextPlugin)

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    this._reduceMotion = mq.matches

    if (this._reduceMotion) {
      console.warn(
        "[motion] prefers-reduced-motion: reduce attivo. " +
          "Le animazioni decorative verranno disabilitate."
      )
    }

    mq.addEventListener("change", (e) => {
      this._reduceMotion = e.matches
    })

    this.initialized = true
  }

  public static getInstance(): GsapEngine {
    return this.instance ?? (this.instance = new GsapEngine())
  }

  public prefersReduceMotion(): boolean {
    return this._reduceMotion
  }

  public createContext(
    fn: (ctx: gsap.Context) => void,
    scope: string | Element
  ): gsap.Context {
    return gsap.context(fn, scope)
  }

  public addTick(tick: gsap.TickerCallback) {
    this.gsap.ticker.add(tick)
    this.gsap.ticker.lagSmoothing(0)
  }

  public removeTick(tick: gsap.TickerCallback) {
    this.gsap.ticker.remove(tick)
  }
}

export const gsapEngine = GsapEngine.getInstance()
