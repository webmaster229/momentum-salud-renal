import type { MetadataRoute } from "next";
import { getNoticias } from "@/content/noticias";
import { site } from "@/content/site";
import { defaultLocale, localePath, localeTags, locales } from "@/i18n/config";

const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) =>
  locales.map((locale) => ({
    url: `${site.url}${localePath(locale, path)}`,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [localeTags[l].html, `${site.url}${localePath(l, path)}`])),
    },
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("/", 1, "monthly"),
    ...entry("/sedes", 0.9, "monthly"),
    ...entry("/sobre-momentum", 0.8, "yearly"),
    ...entry("/contacto", 0.8, "yearly"),
    ...getNoticias(defaultLocale).flatMap((n) => entry(`/noticias/${n.slug}`, 0.7, "yearly")),
  ];
}
