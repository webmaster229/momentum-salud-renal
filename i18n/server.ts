import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import en from "./dictionaries/en";
import es from "./dictionaries/es";
import pt from "./dictionaries/pt";

const dictionaries = { es, en, pt } satisfies Record<Locale, unknown>;

/** Idioma de la ruta actual (segmento raíz `app/[lang]`). Solo en el servidor. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary() {
  return dictionaries[await getLocale()];
}
