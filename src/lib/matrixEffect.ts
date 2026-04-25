export class MatrixEffect {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null
  private width: number = 0
  private height: number = 0
  private columns: number = 0
  private drops: number[] = []
  private chars: string = "01"
  private fontSize: number = 15
  private animationId: number | null = null
  private lastTime: number = 0
  private interval: number = 50 // ms

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.init()
    this.bindEvents()
    this.animate(0)
  }

  private init() {
    this.resize()
  }

  private bindEvents() {
    window.addEventListener("resize", () => this.resize())
  }

  private resize() {
    const parent = this.canvas.parentElement
    if (!parent) return

    const newWidth = parent.offsetWidth
    const newHeight = parent.offsetHeight

    // Skip resize if only height changed on mobile (avoids address bar flickers)
    if (
      this.width === newWidth &&
      Math.abs(this.height - newHeight) < 100 &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return
    }

    this.width = newWidth
    this.height = newHeight
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.columns = Math.floor(this.width / 20)
    this.drops = []
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -50
    }
  }

  private animate(timestamp: number) {
    const deltaTime = timestamp - this.lastTime

    if (deltaTime > this.interval) {
      this.draw()
      this.lastTime = timestamp
    }

    this.animationId = requestAnimationFrame((t) => this.animate(t))
  }

  private draw() {
    if (!this.ctx) return

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    this.ctx.fillRect(0, 0, this.width, this.height)

    const charColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-terminal-prompt")
      .trim()

    this.ctx.fillStyle = charColor || "#3fb950"
    this.ctx.font = `${this.fontSize}px monospace`

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)]
      this.ctx.fillText(text, i * 20, this.drops[i] * 20)

      if (this.drops[i] * 20 > this.height && Math.random() > 0.975) {
        this.drops[i] = 0
      }

      this.drops[i]++
    }
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener("resize", () => this.resize())
  }
}
