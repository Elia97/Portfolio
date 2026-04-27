import { ParticleNetwork } from "@/lib/particle-network"
import { gsapEngine } from "@/lib/motion/engines/gsap-engine"
import { DURATION, EASE } from "@/lib/motion/presets"

type GsapContext = ReturnType<typeof gsapEngine.createContext>

let _ctx: GsapContext | null = null
let _network: ParticleNetwork | null = null
let _typewriterAbort: AbortController | null = null

function setupHero(): void {
  _ctx?.revert()
  _ctx = null
  _network?.destroy()
  _network = null
  _typewriterAbort?.abort()
  _typewriterAbort = null

  const section = document.querySelector<HTMLElement>("[data-hero-section]")
  if (!section) return

  const canvas = section.querySelector<HTMLCanvasElement>("[data-hero-canvas]")
  if (canvas) _network = new ParticleNetwork(canvas)

  const typewriterContainer = section.querySelector<HTMLElement>(
    "[data-hero-typewriter]"
  )
  const typewriterText = typewriterContainer?.querySelector<HTMLElement>(
    "span:not([data-hero-cursor])"
  )
  const cursor =
    typewriterContainer?.querySelector<HTMLElement>("[data-hero-cursor]")

  if (!typewriterContainer || !typewriterText) return

  const originalText = typewriterText.textContent?.trim() ?? ""
  if (!originalText) return

  typewriterText.textContent = " "
  if (cursor)
    gsapEngine.gsap.set(cursor, { display: "inline-block", opacity: 0 })

  if (gsapEngine.prefersReduceMotion()) {
    typewriterText.textContent = originalText
    return
  }

  _typewriterAbort = new AbortController()

  typewriterContainer.addEventListener(
    "animationend",
    () => {
      _ctx = gsapEngine.createContext(() => {
        const { gsap } = gsapEngine
        let cursorTween: gsap.core.Tween | null = null

        typewriterText.textContent = ""

        if (cursor) {
          gsap.set(cursor, { opacity: 1 })
          cursorTween = gsap.to(cursor, {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.5,
            ease: EASE.inOut,
          })
        }

        gsap.to(typewriterText, {
          duration: originalText.length * 0.05,
          text: { value: originalText },
          ease: EASE.linear,
          onComplete: () => {
            cursorTween?.kill()
            if (cursor) {
              gsap.set(cursor, { opacity: 1 })
              gsap.to(cursor, { opacity: 0, duration: DURATION.fast, delay: 2 })
            }
          },
        })
      }, typewriterContainer)
    },
    { once: true, signal: _typewriterAbort.signal }
  )
}

document.addEventListener("astro:page-load", setupHero)
