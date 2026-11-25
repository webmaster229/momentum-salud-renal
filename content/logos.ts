import type { Locale } from "@/i18n/config";

/** Logo de Momentum Salud Renal según el idioma (PNG recortados al mismo ancho de contenido). */
export const logos: Record<Locale, { src: string; width: number; height: number; alt: string }> = {
  es: { src: "/images/logos/momentum-salud-renal.png", width: 1337, height: 249, alt: "Momentum Salud Renal" },
  pt: { src: "/images/logos/momentum-salud-renal-pt.png", width: 1337, height: 134, alt: "Momentum Saúde Renal" },
  en: { src: "/images/logos/momentum-salud-renal-en.png", width: 1337, height: 141, alt: "Momentum Renal Care" },
};
