import { gsapEngine } from "@/lib/motion/engines/gsap-engine"

const setupTerminal = () => {
  const container = document.querySelector<HTMLElement>(
    "[data-terminal-container]"
  )
  const terminalWindow = document.querySelector<HTMLElement>(
    "[data-terminal-window]"
  )
  const inputLine = document.querySelector<HTMLElement>("[data-terminal-input]")
  const outputDiv = document.querySelector<HTMLElement>(
    "[data-terminal-output]"
  )
  const cursor = document.querySelector<HTMLElement>("[data-terminal-cursor]")
  const dateSpan = document.querySelector<HTMLElement>("[data-terminal-date]")

  if (!container || !terminalWindow || !inputLine || !outputDiv || !cursor)
    return

  const gsap = gsapEngine.gsap

  const labels = {
    installing: container.dataset.installing,
    installed: container.dataset.installed,
    starting: container.dataset.starting,
    ready: container.dataset.ready,
    protocol: container.dataset.protocol,
    opening: container.dataset.opening,
    reclick: container.dataset.reclick,
  }

  const command = container.dataset.command ?? "npx send-email"
  const email = container.dataset.email ?? ""

  if (dateSpan) {
    const now = new Date()
    dateSpan.textContent = now.toDateString() + " " + now.toLocaleTimeString()
  }

  let isTyping = false
  let hasExecuted = false

  const addToOutput = (html: string) => {
    const line = document.createElement("div")
    line.innerHTML = html
    line.className = "mb-1"
    outputDiv!.appendChild(line)

    const terminalBody = document.querySelector<HTMLElement>(
      "[data-terminal-body]"
    )
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight
    }
  }

  const executeCommand = () => {
    if (hasExecuted) return
    hasExecuted = true
    cursor!.style.display = "none"

    const tl = gsap.timeline()

    tl.to(outputDiv, {
      duration: 0.8,
      onStart: () => {
        addToOutput(
          `<span class="text-terminal-text-muted">${labels.installing}</span>`
        )
      },
    })
      .to({}, { duration: 0.4 })
      .call(() => {
        addToOutput(
          `<span class="text-terminal-dot-green">✔</span> ${labels.installed}`
        )
        addToOutput(
          `<span class="text-terminal-text-muted">${labels.starting}</span>`
        )
      })
      .to({}, { duration: 0.8 })
      .call(() => {
        addToOutput(
          `<span class="text-terminal-dot-green">✔</span> ${labels.protocol}`
        )
        addToOutput(
          `<span class="text-terminal-dot-yellow">⚠</span> ${labels.opening}`
        )
      })
      .to({}, { duration: 1.2 })
      .call(() => {
        window.location.href = `mailto:${email}`
        addToOutput(
          `<br/><span class="text-terminal-dot-green font-bold">${labels.ready}</span>`
        )
        addToOutput(
          `<span class="text-terminal-text-muted text-xs mt-2 block">${labels.reclick}</span>`
        )
      })
  }

  const typeCommand = () => {
    if (isTyping || hasExecuted) return
    isTyping = true

    inputLine.textContent = ""

    gsap.to(inputLine, {
      duration: 1.5,
      text: command,
      ease: "none",
      onComplete: () => {
        isTyping = false
        executeCommand()
      },
    })
  }

  terminalWindow.addEventListener("click", () => {
    if (!hasExecuted && !isTyping) {
      typeCommand()
    } else if (hasExecuted && !isTyping) {
      hasExecuted = false
      inputLine.textContent = ""
      outputDiv.innerHTML = ""
      cursor!.style.display = "inline-block"
      typeCommand()
    }
  })
}

document.addEventListener("astro:page-load", setupTerminal)
