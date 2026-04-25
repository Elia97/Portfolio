# Portfolio — Elia Zarantonello

Sito portfolio personale. Bilingue (IT/EN), statico, ottimizzato per SEO.

## Sviluppo

```bash
pnpm install
pnpm dev
```

## Comandi

```bash
pnpm dev        # server locale
pnpm build      # build di produzione
pnpm preview    # anteprima build
pnpm typecheck  # type check
pnpm lint       # eslint
pnpm format     # prettier
```

## Aggiungere contenuto

**Post del blog** — creare un file `.md` o `.mdx` in `src/content/blog/`:

```yaml
---
title: "Titolo del post"
description: "Descrizione breve"
pubDate: 2024-01-01
lang: it # oppure en
tags: [tag1, tag2]
---
```

**Componenti UI** — tramite shadcn:

```bash
pnpm dlx shadcn@latest add <componente>
```

**Nuove pagine** — creare `.astro` in `src/pages/` (IT) e `src/pages/en/` (EN). Aggiornare `src/i18n/it.ts` e `en.ts` con i metadati della pagina.

## Tech stack

Astro 6 · React 19 · Tailwind CSS 4 · TypeScript · shadcn/ui
