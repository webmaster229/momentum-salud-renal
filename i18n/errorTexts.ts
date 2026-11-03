import { defaultLocale, hasLocale, type Locale } from "./config";

/** Aparte de los diccionarios: las pantallas de error corren en el navegador y no deben cargar todos los textos. */
export const errorTexts: Record<Locale, { title: string; text: string; retry: string; home: string }> = {
  es: {
    title: "Algo salió mal",
    text: "No pudimos mostrar esta página. Inténtalo de nuevo en unos segundos.",
    retry: "Intentar de nuevo",
    home: "Volver al inicio",
  },
  en: {
    title: "Something went wrong",
    text: "We couldn't show this page. Please try again in a few seconds.",
    retry: "Try again",
    home: "Back to home",
  },
  pt: {
    title: "Algo deu errado",
    text: "Não foi possível exibir esta página. Tente novamente em alguns segundos.",
    retry: "Tentar novamente",
    home: "Voltar ao início",
  },
};

export const toLocale = (lang: unknown): Locale => (typeof lang === "string" && hasLocale(lang) ? lang : defaultLocale);
