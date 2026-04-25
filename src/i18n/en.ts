import { translationsSchema } from "./schema"

export const en = translationsSchema.parse({
  site: {
    name: "Elia Zarantonello",
    description: "Full stack developer.",
    rssTitle: "Blog | Elia Zarantonello",
    rssDescription: "Articles about web development, frontend and technology.",
  },
  footer: {
    navigation: "Navigation",
    connect: "Connect",
    copyright: "All rights reserved.",
    builtWith: "Built with",
  },
  nav: {
    home: {
      label: "Home",
      href: "/",
    },
    about: {
      label: "About Me",
      href: "/about",
    },
    projects: {
      label: "Projects",
      href: "/projects",
    },
    blog: {
      label: "Blog",
      href: "/blog",
    },
    contact: {
      label: "Contact",
      href: "/contact",
    },
  },
  pages: {
    index: {
      title: "Full-Stack Developer",
      description:
        "Full-stack developer focused on Node.js. Backend, frontend, and automation — from prototype to deploy.",
    },
    about: {
      title: "About Me",
      description:
        "Full-stack developer. I work with Node.js, TypeScript, and modern frontend and backend technologies.",
    },
    projects: {
      title: "Projects",
      description:
        "Real projects: production systems, client automation, and open source libraries.",
    },
    blog: {
      title: "Blog",
      description:
        "Technical articles on Node.js, TypeScript, and modern web development.",
    },
    contact: {
      title: "Contact",
      description:
        "Open to collaborations and new opportunities. Get in touch.",
    },
  },
  ui: {
    themeToggle: "Toggle theme",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  notFound: {
    title: "Page not found",
    cta: "Go back to homepage",
  },
})
