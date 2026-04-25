# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Regole non negoziabili

**Package manager**: solo `pnpm`.

**i18n**: ogni stringa visibile va in `src/i18n/schema.ts` → `it.ts` → `en.ts`. Nessun testo hardcodato nei componenti — inclusi `aria-label`. Usare sempre `t("sezione.chiave")`.

**Styling pulsanti**: usare `buttonVariants()` da `@/lib/button-variants`. Il componente React `Button` non esiste più.

**React**: solo per componenti con stato client-side genuino. Layout e presentazione vanno in Astro puro.

**Event listeners con `astro:after-swap`**: usare `createSignal()` da `@/lib/create-signal` per evitare accumulo di listener tra navigazioni.

**Responsive su icon buttons**: usare `w-*`/`h-*` espliciti — non `size-*`. Tailwind v4 non genera correttamente le varianti responsive di `size-*` nelle stringhe CVA.

**`<a>` stilato come pulsante**: usare `buttonVariants()` direttamente sull'elemento `<a>`. Il pattern `Button` con `asChild` non funziona senza `client:load`.

**Elementi nascosti (drawer, modal)**: usare `inert` — non `aria-hidden`. `inert` impedisce anche il focus sui discendenti, evitando il conflitto che `aria-hidden` crea su elementi con focus attivo.

**CSS globale**: importare `@/styles/global.css` solo in `Head.astro`. Se importato nel layout, Astro non riesce a iniettare il foglio di stile nel `<head>` corretto.

**Script con `astro:after-swap`**: usare `<script>` bundled (non `is:inline`) per poter importare `createSignal`. I tag `is:inline` non supportano import di moduli.

**URL con locale**: usare sempre `getRelativeLocaleUrl(locale, path)` da `astro:i18n`. Non hardcodare mai path con o senza prefisso `/en/`.

**Commit messages**: Conventional Commits. Tipi validi: `feat` `fix` `chore` `docs` `style` `refactor` `perf` `test` `ci` `build` `revert`.

## Stack

- **Astro 6** — static, file-based routing, `prefixDefaultLocale: false` (`it` senza prefisso, `en` → `/en/`)
- **Tailwind CSS 4** — via `@tailwindcss/vite`, variabili colore OKLch in `global.css`
- **React 19** — disponibile ma non attualmente usato in produzione
- **shadcn/ui** — stile `radix-lyra`, baseColor `mist`

## Pattern chiave

```
src/i18n/schema.ts   → fonte di verità per le traduzioni (Zod)
src/lib/create-signal.ts  → AbortController riutilizzabile
src/lib/button-variants.ts → CVA per tutti i pulsanti
src/components/Head.astro  → unico punto di ingresso per meta, CSS, script globali
```

Locali: `it` (default, no prefisso) — `en` (prefisso `/en/`). Nuove pagine EN vanno in `src/pages/en/`.
