import { createSignal } from "@/lib/create-signal"
import { gsapEngine } from "@/lib/motion/engines/gsap-engine"

const getSignal = createSignal()
let _observer: IntersectionObserver | null = null
let _lastActiveSlug: string | null = null

function setActive(
  nav: HTMLElement,
  links: HTMLAnchorElement[],
  cursor: HTMLElement | null,
  slug: string,
  instant = false
): void {
  if (_lastActiveSlug === slug) return
  _lastActiveSlug = slug

  const activeLink = nav.querySelector<HTMLAnchorElement>(
    `[data-toc-link][href="#${slug}"]`
  )
  if (!activeLink) return

  // CSS gestisce colore e font-weight via data-active — nessun inline style GSAP
  links.forEach((l) => l.removeAttribute("data-active"))
  activeLink.setAttribute("data-active", "")

  if (!cursor) return

  const container = cursor.parentElement!
  const containerRect = container.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()
  const y =
    linkRect.top -
    containerRect.top +
    (linkRect.height - cursor.offsetHeight) / 2

  const gsap = gsapEngine.gsap
  if (instant) {
    gsap.set(cursor, { y, opacity: 1 })
  } else {
    gsap.to(cursor, {
      y,
      opacity: 1,
      overwrite: "auto",
      duration: 0.4,
      ease: "power3.out",
    })
  }
}

function findInitialActive(headings: HTMLElement[]): string | null {
  // Cerca l'ultimo heading che ha già superato il 35% del viewport dall'alto
  const threshold = window.innerHeight * 0.35
  let result: string | null = null
  for (const h of headings) {
    if (h.getBoundingClientRect().top <= threshold) result = h.id
    else break
  }
  return result ?? headings[0]?.id ?? null
}

function setupToc(): void {
  _observer?.disconnect()
  _observer = null
  _lastActiveSlug = null

  const signal = getSignal()
  const nav = document.querySelector<HTMLElement>("[data-toc]")
  if (!nav) return

  const links = Array.from(
    nav.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")
  )
  if (!links.length) return

  const cursor = nav.querySelector<HTMLElement>("[data-toc-cursor]")
  const articleHeadings = Array.from(
    document.querySelectorAll<HTMLElement>("article h2, article h3")
  )
  if (!articleHeadings.length) return

  // Rimuove eventuali inline styles residui da sessioni GSAP precedenti
  const gsap = gsapEngine.gsap
  gsap.set(links, { clearProps: "all" })
  links.forEach((l) => l.removeAttribute("data-active"))
  if (cursor) gsap.set(cursor, { opacity: 0 })

  // Imposta lo stato iniziale in modo sincrono — nessuna attesa dell'observer → nessun flash
  const initialSlug = findInitialActive(articleHeadings)
  if (initialSlug) setActive(nav, links, cursor, initialSlug, true)

  // Traccia tutti gli heading attualmente visibili nella banda dell'observer
  const visibleIds = new Set<string>()

  _observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleIds.add(entry.target.id)
        else visibleIds.delete(entry.target.id)
      }
      // Attiva sempre il primo heading visibile nell'ordine della pagina
      const activeId = articleHeadings
        .map((h) => h.id)
        .find((id) => visibleIds.has(id))
      if (activeId) setActive(nav, links, cursor, activeId)
    },
    { rootMargin: "-15% 0% -72% 0%", threshold: 0 }
  )

  articleHeadings.forEach((h) => _observer!.observe(h))

  window.addEventListener(
    "beforeunload",
    () => {
      _observer?.disconnect()
      _observer = null
    },
    { signal }
  )
}

document.addEventListener("astro:page-load", setupToc)
