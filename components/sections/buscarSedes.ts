import type { Sede } from "@/content/sedes";
import type { CountryId } from "@/content/site";

export type SedeEnPais = Sede & { country: CountryId };

/** Los países en todos los idiomas, para que "Brazil" funcione también en la página en español. */
const COUNTRY_WORDS: Record<CountryId, string> = {
  colombia: "colombia",
  //mexico: "mexico mejico",
  guatemala: "guatemala",
  ecuador: "ecuador equador",
  brasil: "brasil brazil",
  "republica-dominicana": "republica dominicana dominican republic rd",
};

/** Palabras que no ayudan a distinguir una sede: sin esto, "sede en cali" no encontraría nada. */
const IGNORED = new Set(["sede", "sedes", "unidade", "unidades", "location", "locations", "city", "de", "del", "la", "las", "el", "los", "en", "y", "a", "al", "the", "in", "of", "em", "do", "da", "e", "o"]);

/** Lo que la lista abrevia y la gente escribe completo, o al revés. */
const SYNONYMS = [
  ["cl", "calle", "cll"],
  ["cra", "carrera", "cr", "kr", "kra"],
  ["av", "avenida", "avda"],
  ["tv", "transversal"],
  ["dg", "diagonal"],
  ["r", "rua"],
  ["no", "numero", "nro"],
  ["col", "colonia"],
  ["blvd", "boulevard", "bulevar"],
  ["priv", "privada"],
  ["cc", "comercial"],
  ["of", "oficina"],
  ["int", "interior"],
  ["conj", "conjunto"],
];

/** Sin tildes, mayúsculas ni signos: "Cra. 11 #26-32" queda "cra 11 26 32". */
export const clean = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokensOf = (query: string) =>
  clean(query)
    .replace(/\bcentro comercial\b/g, "cc")
    .replace(/\bcdmx\b/g, "ciudad mexico")
    .split(" ")
    .filter((word) => word && !IGNORED.has(word));

type Field = { words: string[]; compact: string };

const fieldOf = (text: string): Field => ({ words: text.split(" "), compact: text.replaceAll(" ", "") });

/** 3: palabra exacta; 2: inicio de palabra; 1: en cualquier parte, incluso pegado ("santamarta"). */
function strength(token: string, { words, compact }: Field) {
  if (words.includes(token)) return 3;
  if (words.some((word) => word.startsWith(token))) return 2;
  return compact.includes(token) ? 1 : 0;
}

/** Cambios para pasar de una palabra a otra, contando dos letras cambiadas de lugar como uno solo. */
function typos(a: string, b: string) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) rows[i][j] = Math.min(rows[i][j], rows[i - 2][j - 2] + 1);
    }
  }
  return rows[a.length][b.length];
}

/** Desde este puntaje, la palabra aparece completa. */
const WHOLE_WORD = 5;

function tokenScore(token: string, main: Field, address: Field, tolerant: boolean) {
  const inMain = strength(token, main);
  const inAddress = strength(token, address);
  // Una coincidencia en el nombre o la ciudad pesa más que la misma en la dirección.
  const direct = Math.max(inMain * 2, inAddress ? inAddress * 2 - 1 : 0);
  if (direct) return direct;

  const appears = (word: string) => main.words.includes(word) || address.words.includes(word);
  if (SYNONYMS.some((group) => group.includes(token) && group.some(appears))) return WHOLE_WORD;
  // Mientras se escribe: "carr" ya encuentra "Cra." sin esperar a que termine "carrera".
  if (token.length >= 2 && SYNONYMS.some((group) => group.some((word) => word.startsWith(token)) && group.some(appears))) return 1;

  if (!tolerant || token.length < 4 || !/^[a-z]+$/.test(token)) return 0;
  const allowed = token.length >= 8 ? 2 : 1;
  return [...main.words, ...address.words].some((word) => typos(token, word) <= allowed) ? 1 : 0;
}

/** Todas las palabras deben aparecer, en cualquier orden; primero van las mejores coincidencias. */
function search(items: SedeEnPais[], tokens: string[], tolerant: boolean) {
  const typed = tokens.join(" ");
  const found = items
    .map((item) => {
      const main = fieldOf(clean(`${item.name} ${item.city} ${COUNTRY_WORDS[item.country]}`));
      const address = fieldOf(clean(item.address));
      const scores = tokens.map((token) => tokenScore(token, main, address, tolerant));
      const exactName = tokensOf(item.name).join(" ") === typed;
      return { item, scores, total: scores.reduce((a, b) => a + b, 0) + (exactName ? 100 : 0) };
    })
    .filter(({ scores }) => !scores.includes(0));
  // Si hay sedes con las palabras completas, sobran las parciales: "cali" no debe traer "C.C. Calima".
  const complete = found.filter(({ scores }) => scores.every((score) => score >= WHOLE_WORD));
  return (complete.length ? complete : found).sort((a, b) => b.total - a.total).map(({ item }) => item);
}

/**
 * Busca primero en lo elegido (`here`) y, si no hay nada, en todas las sedes (`everywhere`,
 * `elsewhere: true`). Los errores de digitación solo se toleran si lo exacto no encontró nada.
 */
export function findSedes(here: SedeEnPais[], everywhere: SedeEnPais[], query: string) {
  const tokens = tokensOf(query);
  if (!tokens.length) return { results: here, elsewhere: false };
  for (const tolerant of [false, true]) {
    const inHere = search(here, tokens, tolerant);
    if (inHere.length) return { results: inHere, elsewhere: false };
    const inEverywhere = search(everywhere, tokens, tolerant);
    if (inEverywhere.length) return { results: inEverywhere, elsewhere: true };
  }
  return { results: [], elsewhere: false };
}
