// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  site: "https://eliazarantonello.dev",
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor"
            }
          },
        },
      },
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "it-IT",
        locales: { "it-IT": "it-IT", "en-US": "en-US" },
      },
    }),
    icon(),
  ],
  i18n: {
    defaultLocale: "it-IT",
    locales: ["it-IT", "en-US"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
})
