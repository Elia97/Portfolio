import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { getTranslations } from "@/i18n"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const t = getTranslations("it")
  const posts = await getCollection("blog")

  const items = posts
    .filter((post) => post.data.lang === "it")
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    }))

  return rss({
    title: t("site.rssTitle"),
    description: t("site.rssDescription"),
    site: context.site!,
    items,
    customData: `<language>it</language>`,
  })
}
