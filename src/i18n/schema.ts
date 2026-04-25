import { z } from "astro/zod"

const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
})

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
  pages: z.object({
    index: metaSchema,
    about: metaSchema,
    projects: metaSchema,
    blog: metaSchema,
    contact: metaSchema,
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
})

export type Translations = z.infer<typeof translationsSchema>
export type NavItem = z.infer<typeof navItemSchema>
