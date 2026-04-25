export class ParticleNetwork {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null
  private width: number = 0
  private height: number = 0
  private particles: Particle[] = []
  private mouse: { x: number | null; y: number | null } = { x: null, y: null }
  private wanderingTarget = { x: 0, y: 0, vx: 0, vy: 0 }
  private particleCount: number
  private connectionDistance = 150
  private mouseDistance = 200
  private animationId: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.particleCount = document.documentElement.clientWidth < 768 ? 50 : 100

    this.init()
    this.bindEvents()
    this.animate()
  }

  private init() {
    this.resize()
    this.initParticles()
  }

  private bindEvents() {
    window.addEventListener("resize", () => this.resize())

    window.addEventListener("mousemove", (e) => {
      // Disable mouse interaction on touch devices
      if (window.matchMedia("(pointer: coarse)").matches) return

      const rect = this.canvas.getBoundingClientRect()
      this.mouse.x = e.clientX - rect.left
      this.mouse.y = e.clientY - rect.top
    })

    window.addEventListener("mouseleave", () => {
      this.mouse.x = null
      this.mouse.y = null
    })

    window.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) {
        this.mouse.x = null
        this.mouse.y = null
      }
    })
  }

  private resize() {
    const newWidth = document.documentElement.clientWidth
    const newHeight = window.innerHeight

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
    this.initParticles()
  }

  private initParticles() {
    this.particles = []
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height))
    }

    this.wanderingTarget = {
      x: this.width / 2,
      y: this.height / 2,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }
  }

  private updateWanderingTarget() {
    this.wanderingTarget.x += this.wanderingTarget.vx
    this.wanderingTarget.y += this.wanderingTarget.vy

    const margin = 100
    if (
      this.wanderingTarget.x < margin ||
      this.wanderingTarget.x > this.width - margin
    )
      this.wanderingTarget.vx *= -1
    if (
      this.wanderingTarget.y < margin ||
      this.wanderingTarget.y > this.height - margin
    )
      this.wanderingTarget.vy *= -1

    if (Math.random() < 0.01) {
      this.wanderingTarget.vx += (Math.random() - 0.5) * 0.5
      this.wanderingTarget.vy += (Math.random() - 0.5) * 0.5

      const speed = Math.sqrt(
        this.wanderingTarget.vx ** 2 + this.wanderingTarget.vy ** 2
      )
      if (speed > 2) {
        this.wanderingTarget.vx = (this.wanderingTarget.vx / speed) * 2
        this.wanderingTarget.vy = (this.wanderingTarget.vy / speed) * 2
      }
    }
  }

  private isTargetActive = true
  private lastToggleTime = 0
  private activeDuration = 2000
  private inactiveDuration = 5000

  private animate() {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.width, this.height)

    const now = Date.now()
    const duration = this.isTargetActive
      ? this.activeDuration
      : this.inactiveDuration

    if (now - this.lastToggleTime > duration) {
      this.isTargetActive = !this.isTargetActive
      this.lastToggleTime = now
    }

    this.updateWanderingTarget()

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(
        this.width,
        this.height,
        this.mouse,
        this.wanderingTarget,
        this.mouseDistance,
        this.isTargetActive
      )
      this.particles[i].draw(this.ctx)

      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.connectionDistance) {
          this.ctx.beginPath()
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${
            1 - distance / this.connectionDistance
          })`
          this.ctx.lineWidth = 1
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
          this.ctx.stroke()
        }
      }

      const mx = this.mouse.x
      const my = this.mouse.y
      if (mx != null && my != null) {
        const dx = this.particles[i].x - mx
        const dy = this.particles[i].y - my
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < this.connectionDistance) {
          this.ctx.beginPath()
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${
            1 - distance / this.connectionDistance
          })`
          this.ctx.lineWidth = 1
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(mx, my)
          this.ctx.stroke()
        }
      }
    }
    this.animationId = requestAnimationFrame(() => this.animate())
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.2
    this.vy = (Math.random() - 0.5) * 0.2
    this.size = Math.random() * 2 + 1
    this.color = "rgba(59, 130, 246, 0.5)"
  }

  update(
    width: number,
    height: number,
    mouse: { x: number | null; y: number | null },
    wanderingTarget: { x: number; y: number },
    mouseDistance: number,
    isTargetActive: boolean
  ) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1

    const mx = mouse.x
    const my = mouse.y

    if (mx != null && my != null) {
      const dx = mx - this.x
      const dy = my - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouseDistance) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (mouseDistance - distance) / mouseDistance
        const attractionStrength = 0.08

        this.vx += forceDirectionX * force * attractionStrength
        this.vy += forceDirectionY * force * attractionStrength
      }
    } else {
      if (isTargetActive) {
        const dx = wanderingTarget.x - this.x
        const dy = wanderingTarget.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 600) {
          const orbitalStrength = 0.00001
          this.vx += dx * orbitalStrength
          this.vy += dy * orbitalStrength
        }
      }

      this.vx += (Math.random() - 0.5) * 0.04
      this.vy += (Math.random() - 0.5) * 0.04
    }

    this.vx *= 0.999
    this.vy *= 0.999

    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    const maxSpeed = 1.5
    if (currentSpeed > maxSpeed) {
      this.vx = (this.vx / currentSpeed) * maxSpeed
      this.vy = (this.vy / currentSpeed) * maxSpeed
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}
