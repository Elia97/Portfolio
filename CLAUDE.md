# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandi principali

Usa **pnpm** come package manager.

```bash
pnpm dev          # Server di sviluppo locale
pnpm build        # Build di produzione
pnpm preview      # Anteprima della build di produzione
pnpm lint         # ESLint
pnpm format       # Prettier su tutti i file .ts, .tsx, .astro
pnpm typecheck    # Type check con astro check
```

## Stack tecnologico

- **Astro 6** — framework principale con routing file-based (`src/pages/`)
- **React 19** — componenti interattivi (idratati con direttive `client:*`)
- **Tailwind CSS 4** — styling tramite plugin Vite (`@tailwindcss/vite`)
- **shadcn/ui** — componenti UI basati su Radix UI (stile `radix-lyra`, baseColor `mist`)
- **TypeScript** (strict mode, alias `@/*` → `./src/*`)

## Architettura

```
src/
  pages/       # Route Astro (file-based routing)
  layouts/     # Wrapper HTML (main.astro è il layout radice)
  components/
    ui/        # Componenti shadcn/ui
  lib/
    utils.ts             # Funzione cn() per merge classi Tailwind
    button-variants.ts   # Varianti CVA per il Button
  styles/
    global.css   # Import Tailwind, variabili colore (OKLch), font, dark mode
```

Le pagine `.astro` importano layout e componenti React. I componenti React vengono idratati lato client con `client:load` (o altre direttive Astro). Non esiste backend: è un sito statico.

## Convenzioni di codice

- Nessun punto e virgola, virgolette doppie, 2 spazi di indentazione (vedi `.prettierrc`)
- Il dark mode usa `@custom-variant` in `global.css`
- I colori sono definiti come variabili CSS in formato OKLch nel `:root` e nella variante dark
- Aggiungere componenti shadcn con: `pnpx shadcn@latest add <component>`
- Path alias `@/` per tutti gli import da `src/`
