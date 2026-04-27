import { gsapEngine } from "@/lib/motion/engines/gsap-engine"

const setupProjects = () => {
  const grid = document.querySelector<HTMLElement>("[data-projects-grid]")
  const cards = document.querySelectorAll<HTMLElement>("[data-project-card]")

  if (!grid || cards.length === 0) return

  const gsap = gsapEngine.gsap

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: grid,
      start: "top 80%",
    },
  })
}

document.addEventListener("astro:page-load", setupProjects)
