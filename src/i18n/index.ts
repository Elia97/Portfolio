import { it } from "./it"
import { en } from "./en"
import type { Translations, NavItem } from "./schema"

type Locale = "it" | "en"

type DotKeys<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${P}${K}`
    : DotKeys<T[K], `${P}${K}.`>
}[keyof T & string]

type TranslationKey = DotKeys<Translations>

const translations: Record<Locale, Translations> = { it, en }

export function getNavItems(locale: string): NavItem[] {
  const dict = translations[locale as Locale] ?? translations.it
  return Object.values(dict.nav)
}

export function getTranslationDict(locale: string): Translations {
  return translations[locale as Locale] ?? translations.it
}

export function getTranslations(locale: string) {
  const dict = translations[locale as Locale] ?? translations.it

  return function t(key: TranslationKey): string {
    return key
      .split(".")
      .reduce<unknown>(
        (obj, k) => (obj as Record<string, unknown>)[k],
        dict
      ) as string
  }
}
