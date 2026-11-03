export const site = {
  name: "Momentum Salud Renal",
  // TODO: dominio definitivo (SEO, Open Graph y sitemap).
  url: "https://www.momentumsaludrenal.com",
} as const;

export const contact = {
  phone: "+573124690439",
  email: "contacto@momentumholding.com",
} as const;

export const emailHref = `mailto:${contact.email}`;

export const social = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/Nefrouros", icon: "/images/redes/facebook.png" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/nefrouros_col", icon: "/images/redes/instagram.png" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@nefrouros", icon: "/images/redes/tiktok.png" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@MoMentumSaludReanal", icon: "/images/redes/youtube.png" },
] as const;

export const stats = {
  pacientes: { value: 45000, prefix: "+", icon: "/images/iconos/atencion.png" },
  sedes: { value: 110, prefix: "+", icon: "/images/iconos/infraestructura.png" },
  paises: { value: 6, prefix: "", icon: "/images/iconos/presencia.png" },
  anios: { value: 19, prefix: "+", icon: "/images/iconos/calidad.png" },
  red: { value: 1, prefix: "", icon: "/images/iconos/red.png" },
} as const;

export type StatId = keyof typeof stats;

/**
 * `x`/`y`: punto en el mapa (%); `labelX`/`labelY`: nombre del país; `sedes`: total del país.
 * `labelEnd`: `labelX` marca dónde termina el nombre (a la izquierda del punto), para que al
 * crecer en celular o en otro idioma el texto se aleje del punto en vez de taparlo.
 */
export const countries = [
  { id: "colombia", x: 40.39, y: 24.68, labelX: 34.6, labelEnd: true, labelY: 27.4, sedes: 76, main: true },
  { id: "mexico", x: 16.97, y: 11.45, labelX: 21.6, labelY: 9.1, sedes: 12 },
  { id: "guatemala", x: 25.89, y: 17.59, labelX: 21, labelEnd: true, labelY: 20.3, sedes: 11 },
  { id: "ecuador", x: 35.88, y: 35.18, labelX: 31.2, labelEnd: true, labelY: 36, sedes: 5 },
  { id: "brasil", x: 70.14, y: 43.21, labelX: 76.8, labelY: 48, sedes: 7 },
  { id: "republica-dominicana", x: 44.58, y: 11.22, labelX: 49, labelY: 11.45, sedes: 1 },
] as const;

export type CountryId = (typeof countries)[number]["id"];

/** Colombia (origen) primero y luego orden alfabético en el idioma dado. */
export function countryOrder(names: Record<CountryId, { name: string }>, localeTag: string): CountryId[] {
  const collator = new Intl.Collator(localeTag);
  return [
    "colombia",
    ...countries
      .map((c) => c.id)
      .filter((id) => id !== "colombia")
      .sort((a, b) => collator.compare(names[a].name, names[b].name)),
  ];
}

export type Historia = {
  id: "planear-futuro" | "dialisis-suenos" | "cuidar-avanzar";
  image: string;
  /** Lo que va después de "youtu.be/". Vacío: el modal muestra "muy pronto". */
  youtubeId: string;
};

export const historias: Historia[] = [
  { id: "planear-futuro", image: "/images/historias/historia-1.jpg", youtubeId: "JrBXm_-2RUQ" },
  { id: "dialisis-suenos", image: "/images/historias/historia-2.jpg", youtubeId: "Ft4ZuxaPDkU" },
  { id: "cuidar-avanzar", image: "/images/historias/historia-3.jpg", youtubeId: "XztJfxXRqn8" },
];

export const holdingUrl = "https://momentumholding.com";

export const holding = [
  { id: "health", logo: "/images/marcas/momentum-health.png", width: 468, height: 68, name: "MoMentum health" },
  { id: "services", logo: "/images/marcas/momentum-services.png", width: 516, height: 68, name: "MoMentum services" },
  { id: "financial", logo: "/images/marcas/momentum-financial.png", width: 520, height: 68, name: "MoMentum financial" },
] as const;
