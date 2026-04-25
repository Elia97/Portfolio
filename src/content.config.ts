import { defineCollection } from "astro:content"
import z from "astro/zod"
import { glob } from "astro/loaders"

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    order: z.number().optional(),
    lang: z.enum(["it", "en"]).default("it"),
  }),
})

export const collections = { blog }
