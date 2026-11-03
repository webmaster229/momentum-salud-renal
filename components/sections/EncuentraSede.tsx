"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useId, useRef, useState } from "react";
import { easeInCubic, easeOutQuint } from "@/components/motion/easing";
import { CheckIcon, ChevronDownIcon, ChevronIcon, DirectionsIcon, MapPinIcon, SearchIcon } from "@/components/ui/icons";
import { sedes, type Sede } from "@/content/sedes";
import { countries, emailHref, site, type CountryId } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { clean, findSedes, type SedeEnPais } from "./buscarSedes";
import { MapPoints } from "./MapPoints";

type Texts = Dictionary["encuentra"];

const AUTOPLAY_MS = 4500;

const swap = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOutQuint } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: easeOutQuint } },
};

const slide = {
  enter: (direction: number) => ({ x: 40 * direction, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: easeOutQuint } },
  exit: (direction: number) => ({ x: -40 * direction, opacity: 0, transition: { duration: 0.2, ease: easeOutQuint } }),
};

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const longest = (texts: string[]) => texts.reduce((a, b) => (b.length > a.length ? b : a), "");

function mapsHref(sede: Sede, countryName: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${sede.address}, ${sede.city}, ${countryName}`)}`;
}

/** En celular y tablet la lista y el panel van uno debajo del otro: sin esto, tocar un país no parece hacer nada. */
function revealWhenStacked(element: HTMLElement | null) {
  if (!window.matchMedia("(min-width: 1024px)").matches) element?.scrollIntoView({ block: "start" });
}

/** Alterna los países: si no, sin país elegido pasarían primero las 76 sedes de Colombia. */
function mixByCountry(order: CountryId[]): SedeEnPais[] {
  const rounds = Math.max(...order.map((id) => sedes[id].length));
  return Array.from({ length: rounds }).flatMap((_, i) => order.flatMap((id) => (sedes[id][i] ? [{ ...sedes[id][i], country: id }] : [])));
}

type EncuentraSedeProps = {
  t: Texts;
  countryTexts: Dictionary["countries"];
  mapLabel: string;
  locale: string;
  order: CountryId[];
  heading: React.ReactNode;
};

export function EncuentraSede({ t, countryTexts, mapLabel, locale, order, heading }: EncuentraSedeProps) {
  const [country, setCountry] = useState<CountryId | null>(null);
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  // Deja de pasar sola cuando la persona usa las flechas.
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const everywhere = mixByCountry(order);
  const scope = country ? everywhere.filter((s) => s.country === country) : everywhere;
  const { results, elsewhere } = findSedes(
    city ? scope.filter((s) => s.city === city) : scope,
    // El país elegido primero, para que sus sedes salgan antes que las de otros.
    country ? [...scope, ...everywhere.filter((s) => s.country !== country)] : everywhere,
    query,
  );
  const current = results[index];
  // Altura de todo el país, no de los resultados: si no, el buscador se movería mientras se escribe.
  const sizing = [...scope, ...results];
  const cities = country ? [...new Set(sedes[country].map((s) => s.city))].sort(new Intl.Collator(locale).compare) : [];

  const totalOf = (id: CountryId) => countries.find((c) => c.id === id)?.sedes ?? 0;
  const count = (n: number) => `${n} ${n === 1 ? t.sedesCount.one : t.sedesCount.other}`;
  const placeOf = (s: SedeEnPais) => `${s.city}, ${countryTexts[s.country].name}`;
  const shortNames = Object.fromEntries(countries.map((c) => [c.id, countryTexts[c.id].short])) as Record<CountryId, string>;

  const playing = !country && !query.trim() && autoplay && !paused;
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setPage(([i]) => [(i + 1) % results.length, 1]), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, results.length]);

  const chooseCountry = (id: CountryId | null) => {
    setCountry(id);
    setCity("");
    setQuery("");
    setPage([0, 1]);
  };
  const chooseCity = (value: string) => {
    setCity(value);
    setPage([0, 1]);
  };
  const search = (value: string) => {
    setQuery(value);
    setPage([0, 1]);
  };
  const step = (delta: number) => {
    setAutoplay(false);
    setPage(([i]) => [(i + delta + results.length) % results.length, delta]);
  };

  return (
    <section
      id="encuentra"
      aria-labelledby="encuentra-title"
      className="relative isolate overflow-hidden bg-brand py-16 lg:pt-[clamp(5.5rem,5.6vw,6.75rem)] lg:pb-[clamp(4rem,5.6vw,6.75rem)]"
    >
      <Image src="/images/fondo-mapa.jpg" alt="" fill sizes="100vw" className="-z-10 hidden -scale-x-100 object-cover object-left-top lg:block" />

      <div className="mx-auto grid w-full max-w-[1840px] gap-x-8 gap-y-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-y-[clamp(2rem,3vw,3.5rem)] lg:px-12 xl:grid-cols-[clamp(17rem,24vw,26rem)_minmax(0,1fr)_clamp(21rem,27vw,30rem)] 2xl:px-[3.6rem]">
        <div ref={headingRef} className="lg:col-span-2">
          {heading}
        </div>

        <div className="self-start xl:self-center">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {order.map((id) => {
              const active = country === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => {
                      chooseCountry(active ? null : id);
                      if (!active) revealWhenStacked(panelRef.current);
                    }}
                    aria-pressed={active}
                    className={`group flex min-h-14 w-full items-center gap-3 rounded-xl border-[1.5px] border-white px-5 py-2 text-left leading-tight transition-[background-color,color,box-shadow] duration-200 active:scale-[0.99] ${
                      active ? "bg-white text-brand shadow-card" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {/* Nombre corto en escritorio: la columna es angosta. */}
                    <span className="flex-1 text-[clamp(1.0625rem,0.9rem+0.35vw,1.375rem)] font-bold">
                      <span className="xl:hidden">{countryTexts[id].name}</span>
                      <span className="hidden xl:inline">{countryTexts[id].short}</span>
                    </span>
                    <span className="text-[0.95rem] font-bold">{count(totalOf(id))}</span>
                    {/* Apunta hacia abajo mientras el panel va debajo de la lista. */}
                    <ChevronIcon className="h-4 w-3 rotate-90 transition-transform duration-200 ease-out group-hover:translate-x-0.5 lg:rotate-0" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <MapPoints
          labels={shortNames}
          ariaLabel={mapLabel}
          activeId={current?.country ?? country}
          onSelect={chooseCountry}
          // Márgenes negativos: los bordes de la imagen del mapa están vacíos.
          className="hidden xl:col-start-2 xl:row-start-2 xl:-mx-[2vw] xl:-mt-[4vw] xl:block xl:w-[calc(100%+4vw)] xl:max-w-[52rem] xl:self-center xl:justify-self-center"
        />

        <div
          ref={panelRef}
          className="rounded-2xl bg-white p-5 shadow-card sm:p-6 lg:col-start-2 lg:row-start-2 lg:self-start xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:self-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={country ?? "todas"} {...swap}>
              {country ? (
                <div className="flex items-center gap-3 border-b border-mist pb-4">
                  <RoundButton
                    label={t.allCountries}
                    onClick={() => {
                      chooseCountry(null);
                      revealWhenStacked(headingRef.current);
                    }}
                    flip
                    small
                  />
                  <h3 className="flex-1 text-[clamp(1.125rem,0.95rem+0.4vw,1.375rem)] leading-tight font-bold text-ink">{countryTexts[country].sedesIn}</h3>
                  <span className="shrink-0 rounded-full bg-cream px-3 py-1 text-sm font-bold text-brand">{count(totalOf(country))}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center pt-1 text-center">
                  <Image src="/images/logos/momentum-salud-renal.png" alt={site.name} width={1337} height={249} className="h-auto w-[min(17rem,85%)]" />
                  <p className="mt-3 text-sm text-ink/60">{t.pickCountry}</p>
                </div>
              )}

              <label className="relative mt-4 block">
                <span className="sr-only">{t.search}</span>
                <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => search(e.target.value)}
                  // En el celular, "Buscar" esconde el teclado para dejar ver el resultado.
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                  placeholder={t.search}
                  autoComplete="off"
                  enterKeyHint="search"
                  className="h-11 w-full rounded-lg border border-mist bg-white pr-3 pl-11 text-base text-ink transition-colors outline-none placeholder:text-muted focus:border-brand"
                />
              </label>

              {cities.length > 1 ? <CitySelect cities={cities} value={city} onChange={chooseCity} label={t.cities} allLabel={t.allCities} /> : null}

              {elsewhere ? <p className="mt-3 text-center text-sm text-ink/75">{t.elsewhere}</p> : null}

              <div aria-live={playing ? "off" : "polite"} className="relative mt-4 grid overflow-hidden">
                {/* Copia invisible con los textos más largos: reserva la altura para que la página no salte al cambiar de sede. */}
                <div aria-hidden className="invisible flex flex-col items-center px-4 py-5 text-center [grid-area:1/1]">
                  <SlideBody
                    name={longest(sizing.map((s) => s.name))}
                    place={longest(sizing.map(placeOf))}
                    address={longest(sizing.map((s) => s.address))}
                    href="#"
                    action={t.openMap}
                  />
                </div>
                {current ? (
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <m.div
                      key={current.name}
                      custom={direction}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col items-center justify-center rounded-xl bg-cream px-4 py-5 text-center [grid-area:1/1]"
                    >
                      <SlideBody
                        name={current.name}
                        place={placeOf(current)}
                        address={current.address}
                        href={mapsHref(current, countryTexts[current.country].name)}
                        action={t.openMap}
                      />
                    </m.div>
                  </AnimatePresence>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-cream px-4 py-5 text-center [grid-area:1/1]">
                    <p className="leading-snug text-ink/75">{t.noResults}</p>
                    <a href={emailHref} className="leading-snug font-bold text-brand underline-offset-2 hover:underline">
                      {t.contactUs}
                    </a>
                  </div>
                )}
              </div>

              {/* Se oculta sin quitarla: el panel conserva su altura mientras se escribe. */}
              {scope.length > 1 || results.length > 1 ? (
                <div className={`mt-4 flex items-center justify-center gap-3 ${results.length > 1 ? "" : "invisible"}`}>
                  <RoundButton label={t.prevSede} onClick={() => step(-1)} flip />
                  <span className="min-w-24 text-center text-sm font-bold text-ink/70 tabular-nums">
                    {fill(t.page, { current: index + 1, total: results.length })}
                  </span>
                  <RoundButton label={t.nextSede} onClick={() => step(1)} />
                </div>
              ) : null}

              {country && sedes[country].length < totalOf(country) ? (
                <p className="mt-4 border-t border-mist pt-4 text-sm text-ink/75">
                  {t.morePending}{" "}
                  <a href={emailHref} className="font-bold text-brand underline-offset-2 hover:underline">
                    {t.contactUs}
                  </a>
                </p>
              ) : null}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

type CitySelectProps = {
  cities: string[];
  value: string;
  onChange: (city: string) => void;
  label: string;
  allLabel: string;
};

/** Lista propia: un `<select>` la abre el navegador, y con 45 ciudades a veces hacia arriba. */
function CitySelect({ cities, value, onChange, label, allLabel }: CitySelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const options = ["", ...cities];

  useEffect(() => {
    if (!open) return;
    // Si no cabe bajo el botón, sube la página en vez de abrirse hacia arriba.
    const overflow = (listRef.current?.getBoundingClientRect().bottom ?? 0) - window.innerHeight;
    if (overflow > 0) window.scrollBy({ top: overflow + 12 });
    const onPointer = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    const option = list?.children[active] as HTMLElement | undefined;
    if (!list || !option) return;
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight;
  }, [open, active]);

  const show = () => {
    setActive(options.indexOf(value));
    setOpen(true);
  };
  const choose = (city: string) => {
    onChange(city);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") return setOpen(false);
    const letter = e.key.length === 1 ? clean(e.key) : "";
    if (!["ArrowDown", "ArrowUp", "Home", "End", "Enter", "Escape"].includes(e.key) && e.key !== " " && !letter) return;
    e.preventDefault();

    if (letter) {
      const matches = (city: string) => clean(city).startsWith(letter);
      const next = options.findIndex((city, i) => i > active && matches(city));
      const found = next >= 0 ? next : options.findIndex(matches);
      if (found < 0) return;
      setActive(found);
      return setOpen(true);
    }
    if (e.key === "Escape") return setOpen(false);
    if (!open) return show();
    if (e.key === "Enter" || e.key === " ") return choose(options[active]);
    if (e.key === "Home") return setActive(0);
    if (e.key === "End") return setActive(options.length - 1);
    setActive(Math.min(Math.max(active + (e.key === "ArrowDown" ? 1 : -1), 0), options.length - 1));
  };

  return (
    <div ref={ref} className="relative mt-2">
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white pr-3.5 pl-3.5 text-left text-base text-ink transition-colors outline-none focus:border-brand ${
          open ? "border-brand" : "border-mist"
        }`}
      >
        <span className="truncate">{value || allLabel}</span>
        <ChevronDownIcon className={`size-5 shrink-0 text-muted transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open ? (
          <m.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            // Sin esto, tocar una opción le quita el foco al botón.
            onMouseDown={(e) => e.preventDefault()}
            className="absolute top-full right-0 left-0 z-20 mt-1 max-h-64 origin-top overflow-y-auto overscroll-contain rounded-xl bg-white py-1.5 shadow-card ring-1 ring-mist"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: easeOutQuint } }}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: easeInCubic } }}
          >
            {options.map((city, i) => (
              <li
                key={city}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={city === value}
                onClick={() => choose(city)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3.5 py-2 leading-tight transition-colors hover:bg-cream ${
                  i === active ? "bg-cream" : ""
                } ${city === value ? "font-bold text-brand" : "text-ink/80"}`}
              >
                {city || allLabel}
                {city === value ? <CheckIcon className="size-4 shrink-0" /> : null}
              </li>
            ))}
          </m.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SlideBody({ name, place, address, href, action }: { name: string; place: string; address: string; href: string; action: string }) {
  return (
    <>
      <p className="text-[clamp(1.125rem,0.95rem+0.45vw,1.5rem)] leading-tight font-bold text-ink">{name}</p>
      <p className="mt-1 leading-snug font-bold text-brand">{place}</p>
      <p className="mt-3 flex items-start justify-center gap-1.5 text-[0.95rem] leading-snug text-ink/75">
        <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
        <span>{address}</span>
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-5 text-[0.9375rem] font-bold text-white transition duration-150 hover:bg-brand-dark active:scale-[0.97]"
      >
        <DirectionsIcon className="size-4 shrink-0" />
        {action}
      </a>
    </>
  );
}

function RoundButton({ label, onClick, flip, small }: { label: string; onClick: () => void; flip?: boolean; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-mist/80 text-ink/70 transition duration-150 hover:bg-cream hover:text-brand active:scale-95 ${
        small ? "size-10" : "size-11"
      }`}
    >
      <ChevronIcon className={`h-4 w-3 ${flip ? "rotate-180" : ""}`} />
    </button>
  );
}
