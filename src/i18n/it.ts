import { translationsSchema } from "./schema"

export const it = translationsSchema.parse({
  site: {
    name: "Elia Zarantonello",
    description: "Sviluppatore full stack.",
    rssTitle: "Blog | Elia Zarantonello",
    rssDescription: "Articoli su sviluppo web, frontend e tecnologia.",
  },
  footer: {
    navigation: "Navigazione",
    connect: "Connettiti",
    copyright: "Tutti i diritti riservati.",
    builtWith: "Realizzato con",
  },
  nav: {
    home: {
      label: "Home",
      href: "/",
    },
    about: {
      label: "Chi Sono",
      href: "/chi-sono",
    },
    projects: {
      label: "Progetti",
      href: "/progetti",
    },
    blog: {
      label: "Blog",
      href: "/blog",
    },
    contact: {
      label: "Contatti",
      href: "/contatti",
    },
  },
  pages: {
    index: {
      title: "Full-Stack Developer",
      description:
        "Full-stack developer con focus su Node.js. Backend, frontend e automazione — dal prototipo al deploy.",
    },
    about: {
      title: "Chi Sono",
      description:
        "Full-stack developer. Lavoro con Node.js, TypeScript e tecnologie moderne lato frontend e backend.",
    },
    projects: {
      title: "Progetti",
      description:
        "Progetti reali: sistemi in produzione, automazione per clienti e librerie open source.",
    },
    blog: {
      title: "Blog",
      description:
        "Articoli tecnici su Node.js, TypeScript e sviluppo web moderno.",
    },
    contact: {
      title: "Contatti",
      description:
        "Disponibile per collaborazioni e nuove opportunità. Scrivimi.",
    },
  },
  ui: {
    themeToggle: "Cambia tema",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
  },
  notFound: {
    title: "Pagina non trovata",
    cta: "Torna alla homepage",
  },
})
