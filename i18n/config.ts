// Para sumar un idioma: agregarlo aquí, crear su diccionario y sus noticias (content/noticias.ts).
export const locales = ["es", "en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

export const localeTags: Record<Locale, { html: string; og: string }> = {
  es: { html: "es-CO", og: "es_CO" },
  en: { html: "en", og: "en_US" },
  pt: { html: "pt-BR", og: "pt_BR" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** El español no lleva prefijo: localePath("en", "/sedes") → "/en/sedes", localePath("es", "/sedes") → "/sedes". */
export function localePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

export function alternatesFor(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [localeTags[l].html, localePath(l, path)])),
      "x-default": localePath(defaultLocale, path),
    },
  };
}

export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  if (first && hasLocale(first)) return `/${rest.join("/")}`;
  return pathname || "/";
}
