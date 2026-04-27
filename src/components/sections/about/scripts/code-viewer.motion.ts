function setupCodeViewer(): void {
  const section = document.querySelector<HTMLElement>(
    "[data-codeviewer-section]"
  )
  if (!section) return

  const content = section.querySelector<HTMLElement>(
    "[data-codeviewer-content]"
  )
  const lineNumbers = section.querySelector<HTMLElement>(
    "[data-codeviewer-line-numbers]"
  )
  const viewer = section.querySelector<HTMLElement>("[data-codeviewer-viewer]")
  const scan = section.querySelector<HTMLElement>("[data-codeviewer-scan]")

  if (!content || !lineNumbers) return

  const lines = content.querySelectorAll(".code-line")
  lineNumbers.innerHTML = ""
  lines.forEach((_, i) => {
    const span = document.createElement("span")
    span.textContent = String(i + 1).padStart(2, " ")
    lineNumbers.appendChild(span)
  })

  if (!viewer || !scan) return

  viewer.addEventListener("mousemove", (e) => {
    const rect = viewer.getBoundingClientRect()
    scan.style.setProperty("--scan-y", `${e.clientY - rect.top}px`)
  })
}

document.addEventListener("astro:page-load", setupCodeViewer)
