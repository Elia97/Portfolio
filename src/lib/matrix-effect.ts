export class MatrixEffect {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null
  private width = 0
  private height = 0
  private columns = 0
  private drops: number[] = []
  private speeds: number[] = []
  private prevHeads: number[] = []
  private charGrid: string[][] = []
  private readonly chars = "01"
  private readonly fontSize = 16
  private readonly columnSize = 32
  private readonly trailLength = 5
  private animationId: number | null = null
  private lastTime = 0
  private readonly interval = 100
  private resizeHandler = () => this.resize()

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.resize()
    window.addEventListener("resize", this.resizeHandler)
    this.animate(0)
  }

  private randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }

  private resize() {
    const parent = this.canvas.parentElement
    if (!parent) return

    const newWidth = parent.offsetWidth
    const newHeight = parent.offsetHeight

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

    const rows = Math.ceil(this.height / this.columnSize) + this.trailLength + 2
    this.columns = Math.floor(this.width / this.columnSize)

    this.charGrid = Array.from({ length: this.columns }, () =>
      Array.from({ length: rows }, () => this.randomChar())
    )
    this.drops = Array.from({ length: this.columns }, () => -Math.random() * 3)
    this.speeds = Array.from(
      { length: this.columns },
      () => 0.25 + Math.random() * 0.5
    )
    this.prevHeads = new Array(this.columns).fill(-Infinity)
  }

  private animate(timestamp: number) {
    if (timestamp - this.lastTime > this.interval) {
      this.draw()
      this.lastTime = timestamp
    }
    this.animationId = requestAnimationFrame((t) => this.animate(t))
  }

  private draw() {
    if (!this.ctx) return

    const charColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--matrix-char")
        .trim() || "#3fb950"

    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.font = `${this.fontSize}px monospace`
    this.ctx.fillStyle = charColor

    for (let col = 0; col < this.drops.length; col++) {
      const head = Math.floor(this.drops[col])
      const rowCount = this.charGrid[col].length

      // Assign a new char only when the head moves to a new row
      if (head !== this.prevHeads[col] && head >= 0) {
        this.charGrid[col][head % rowCount] = this.randomChar()
        this.prevHeads[col] = head
      }

      for (let offset = 0; offset <= this.trailLength; offset++) {
        const row = head - offset
        const y = row * this.columnSize
        if (y < 0 || y > this.height) continue

        this.ctx.globalAlpha = Math.pow(
          (this.trailLength - offset) / this.trailLength,
          2
        )
        const idx = ((row % rowCount) + rowCount) % rowCount
        this.ctx.fillText(this.charGrid[col][idx], col * this.columnSize, y)
      }

      this.drops[col] += this.speeds[col]

      if (this.drops[col] * this.columnSize > this.height) {
        this.drops[col] = -Math.random() * 3
        this.speeds[col] = 0.25 + Math.random() * 0.5
      }
    }

    this.ctx.globalAlpha = 1
  }

  public destroy() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId)
    window.removeEventListener("resize", this.resizeHandler)
  }
}
