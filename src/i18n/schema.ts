import { z } from "astro/zod"

// ===============================================================================
// Components
// ===============================================================================

const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
})

const ctaSchema = z.object({
  text: z.string(),
  href: z.string(),
})

const iconSchema = z.object({
  name: z.string(),
  icon: z.string(),
})

const serviceItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
})

const workItemSchema = z.object({
  label: z.string(),
  title: z.string(),
  description: z.string(),
})

const skillCategorySchema = z.object({
  name: z.string(),
  skills: z.array(z.string()),
})

const interestSchema = z.object({
  title: z.string(),
  description: z.string(),
})

// ===============================================================================
// Sections
// ===============================================================================

const heroSchema = z.object({
  badge: z.string(),
  heading: z.string(),
  description: z.string(),
  title: z.string(),
  buttons: z.array(ctaSchema),
})

const stackSchema = z.object({
  heading: z.string(),
  description: z.string(),
  scrollLabel: z.string(),
  icons: z.array(iconSchema),
})

const servicesSchema = z.object({
  heading: z.string(),
  items: z.array(serviceItemSchema),
  cta: ctaSchema,
})

const workSchema = z.object({
  heading: z.string(),
  items: z.array(workItemSchema),
})

const codeViewerSchema = z.object({
  heading: z.string(),
  description: z.string(),
  developer: z.object({
    role: z.string(),
    focus: z.array(z.string()),
    location: z.string(),
    status: z.string(),
  }),
  skills: z.array(skillCategorySchema),
  interests: z.array(interestSchema),
})

const projectSectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
  highlights: z.array(z.string()),
})

const projectItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  year: z.string(),
  problem: projectSectionSchema,
  solution: projectSectionSchema,
  result: projectSectionSchema,
  features: z.array(z.string()),
  technologies: z.array(z.string()),
  githubUrl: z.string().optional(),
  npmUrl: z.string().optional(),
})

const infoSchema = z.object({
  heading: z.string(),
  description: z.string(),
  location: z.string(),
  githubLabel: z.string(),
  linkedinLabel: z.string(),
})

const terminalSchema = z.object({
  lastLogin: z.string(),
  clickToStart: z.string(),
  touchToStart: z.string(),
  installing: z.string(),
  installed: z.string(),
  starting: z.string(),
  ready: z.string(),
  protocol: z.string(),
  opening: z.string(),
  reclick: z.string(),
  promptPath: z.string(),
  command: z.string(),
  email: z.string(),
})

// ===============================================================================
// Main Schema
// ===============================================================================

export const translationsSchema = z.object({
  site: z.object({
    name: z.string(),
    description: z.string(),
    rssTitle: z.string(),
    rssDescription: z.string(),
  }),
  footer: z.object({
    navigation: z.string(),
    connect: z.string(),
    copyright: z.string(),
    builtWith: z.string(),
  }),
  nav: z.object({
    home: navItemSchema,
    about: navItemSchema,
    projects: navItemSchema,
    blog: navItemSchema,
    contact: navItemSchema,
  }),
  ui: z.object({
    themeToggle: z.string(),
    openMenu: z.string(),
    closeMenu: z.string(),
  }),
  notFound: z.object({
    title: z.string(),
    cta: z.string(),
  }),
  home: z.object({
    meta: metaSchema,
    hero: heroSchema,
    stack: stackSchema,
    services: servicesSchema,
    work: workSchema,
  }),
  about: z.object({
    meta: metaSchema,
    codeViewer: codeViewerSchema,
  }),
  projects: z.object({
    meta: metaSchema,
    ctaLabel: z.string(),
    items: z.array(projectItemSchema),
  }),
  blog: z.object({
    meta: metaSchema,
    ui: z.object({
      backLabel: z.string(),
      readingTime: z.string(),
      seriesLabel: z.string(),
      tocLabel: z.string(),
      prevInSeries: z.string(),
      nextInSeries: z.string(),
      noPosts: z.string(),
      italianOnly: z.string(),
    }),
  }),
  contact: z.object({
    meta: metaSchema,
    info: infoSchema,
    terminal: terminalSchema,
  }),
})

// ===============================================================================
// Types
// ===============================================================================

export type Translations = z.infer<typeof translationsSchema>
export type NavItem = z.infer<typeof navItemSchema>
