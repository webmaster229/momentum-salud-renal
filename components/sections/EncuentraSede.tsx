"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useState, useSyncExternalStore } from "react";
import { easeOutQuint } from "@/components/motion/easing";
import {
  BuildingIcon,
  ChevronIcon,
  ClinicIcon,
  ClockIcon,
  DirectionsIcon,
  MapPinIcon,
  PhoneIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { logos } from "@/content/logos";
import { sedes, type Sede } from "@/content/sedes";
import { countries, whatsappHref, type CountryId } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries/es";
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

/** Sin tildes ni mayúsculas, para que "monteria" encuentre "Montería". */
const normalize = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Minuto actual para "Abierto ahora": null en el servidor para que el HTML prerenderizado no dependa de la hora.
const subscribeMinute = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
};
const currentMinute = () => Math.floor(Date.now() / 60_000);
const noMinute = () => null;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function isOpenAt(hours: NonNullable<Sede["hours"]>, timeZone: string, minute: number) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date(minute * 60_000))
      .map((p) => [p.type, p.value]),
  );
  const day = WEEKDAYS.indexOf(parts.weekday) + 1;
  const time = `${parts.hour}:${parts.minute}`;
  return hours.some((h) => day >= h.days[0] && day <= h.days[1] && time >= h.open && time < h.close);
}

function formatHours(hours: NonNullable<Sede["hours"]>, weekdays: string[]) {
  const time = (hhmm: string) => hhmm.replace(/^0(\d)/, "$1");
  return hours.map(({ days: [from, to], open, close }) => {
    const days = from === to ? weekdays[from - 1] : `${weekdays[from - 1]} – ${weekdays[to - 1]}`;
    return `${days}: ${time(open)} – ${time(close)}`;
  });
}

function mapsHref(sede: Sede, countryName: string) {
  const query = sede.address ? `${sede.address}, ${sede.city}, ${countryName}` : (sede.mapsQuery ?? `${sede.name}, ${sede.city}, ${countryName}`);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
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
  const [city, setCity] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [[slideIndex, direction], setSlide] = useState<[number, number]>([0, 1]);
  // Deja de pasar sola cuando la persona usa las flechas o los puntos.
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const minute = useSyncExternalStore(subscribeMinute, currentMinute, noMinute);

  useEffect(() => {
    if (country || !autoplay || paused) return;
    const id = window.setInterval(() => setSlide(([i]) => [(i + 1) % order.length, 1]), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [country, autoplay, paused, order.length]);

  const count = (n: number) => `${n} ${n === 1 ? t.sedesCount.one : t.sedesCount.other}`;
  const totalOf = (id: CountryId) => countries.find((c) => c.id === id)?.sedes ?? 0;
  const shortNames = Object.fromEntries(countries.map((c) => [c.id, countryTexts[c.id].short])) as Record<CountryId, string>;
  const slideCountry = order[slideIndex];

  const chooseCountry = (id: CountryId | null) => {
    setCountry(id);
    setCity(null);
    setQuery("");
  };
  const goTo = (index: number, step: number) => {
    setAutoplay(false);
    setSlide([(index + order.length) % order.length, step]);
  };

  return (
    <section
      id="encuentra"
      aria-labelledby="encuentra-title"
      className="relative isolate overflow-hidden bg-brand py-16 lg:py-[clamp(4rem,5.6vw,6.75rem)]"
    >
      <Image src="/images/fondo-mapa.jpg" alt="" fill sizes="100vw" className="-z-10 hidden -scale-x-100 object-cover object-left-top lg:block" />

      <div className="mx-auto grid w-full max-w-[1840px] gap-x-8 gap-y-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-y-[clamp(2rem,3vw,3.5rem)] lg:px-12 xl:grid-cols-[clamp(17rem,24vw,26rem)_minmax(0,1fr)_clamp(21rem,27vw,30rem)] 2xl:px-[3.6rem]">
        <div className="lg:col-span-2">{heading}</div>

        <div className="self-start xl:self-center">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {order.map((id) => {
              const active = country === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => chooseCountry(active ? null : id)}
                    aria-pressed={active}
                    className={`group flex h-14 w-full items-center gap-3 rounded-xl border-[1.5px] border-white px-5 text-left transition-[background-color,color,box-shadow] duration-200 active:scale-[0.99] ${
                      active ? "bg-white text-brand shadow-card" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {/* Nombre corto en escritorio: la columna es angosta. */}
                    <span className="flex-1 text-[clamp(1.0625rem,0.9rem+0.35vw,1.375rem)] font-bold">
                      <span className="xl:hidden">{countryTexts[id].name}</span>
                      <span className="hidden xl:inline">{countryTexts[id].short}</span>
                    </span>
                    <span className="text-[0.95rem] font-bold">{count(totalOf(id))}</span>
                    <ChevronIcon className="h-4 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <MapPoints
          labels={shortNames}
          ariaLabel={mapLabel}
          activeId={country ?? slideCountry}
          onSelect={chooseCountry}
          // Márgenes negativos: los bordes de la imagen del mapa están vacíos.
          className="hidden xl:col-start-2 xl:row-start-2 xl:-mx-[2vw] xl:-mt-[4vw] xl:block xl:w-[calc(100%+4vw)] xl:max-w-[52rem] xl:self-center xl:justify-self-center"
        />

        <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6 lg:col-start-2 lg:row-start-2 lg:self-start xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:self-center">
          <AnimatePresence mode="wait" initial={false}>
            {country ? (
              <m.div key={country} {...swap}>
                <CountrySedes
                  t={t}
                  country={country}
                  countryTexts={countryTexts}
                  locale={locale}
                  city={city}
                  query={query}
                  minute={minute}
                  count={count}
                  onBack={() => chooseCountry(null)}
                  onCity={setCity}
                  onQuery={setQuery}
                />
              </m.div>
            ) : (
              <m.div
                key="presentacion"
                {...swap}
                className="flex flex-col items-center px-1 py-3 text-center"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
              >
                {(() => {
                  const logo = logos[locale as keyof typeof logos] ?? logos.es;
                  return <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-auto w-[min(17rem,85%)]" />;
                })()}
                <p className="mt-3 text-sm text-ink/60">{t.pickCountry}</p>

                <div aria-live={autoplay ? "off" : "polite"} className="relative mt-6 grid w-full overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <m.div
                      key={slideCountry}
                      custom={direction}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="rounded-xl bg-cream px-5 py-6"
                    >
                      <p className="text-[clamp(1.375rem,1.1rem+0.6vw,1.75rem)] leading-tight font-bold text-ink">{countryTexts[slideCountry].name}</p>
                      <p className="mt-1 font-bold text-brand">{count(totalOf(slideCountry))}</p>
                      <p className="mt-2 text-ink/70">{countryTexts[slideCountry].tagline}</p>
                      <button
                        type="button"
                        onClick={() => chooseCountry(slideCountry)}
                        className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand px-5 text-[0.9375rem] font-bold text-white transition duration-150 hover:bg-brand-dark active:scale-[0.97]"
                      >
                        {t.viewSedes}
                        <ChevronIcon className="h-3.5 w-2.5" />
                      </button>
                    </m.div>
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <RoundButton label={t.prevCountry} onClick={() => goTo(slideIndex - 1, -1)} flip />
                  <div className="flex items-center gap-1.5">
                    {order.map((id, i) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => goTo(i, i >= slideIndex ? 1 : -1)}
                        aria-label={countryTexts[id].name}
                        aria-current={i === slideIndex ? "true" : undefined}
                        className={`h-2 rounded-full transition-[width,background-color] duration-300 ${i === slideIndex ? "w-6 bg-brand" : "w-2 bg-mist hover:bg-line"}`}
                      />
                    ))}
                  </div>
                  <RoundButton label={t.nextCountry} onClick={() => goTo(slideIndex + 1, 1)} />
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

type CountrySedesProps = {
  t: Texts;
  country: CountryId;
  countryTexts: Dictionary["countries"];
  locale: string;
  city: string | null;
  query: string;
  minute: number | null;
  count: (n: number) => string;
  onBack: () => void;
  onCity: (city: string | null) => void;
  onQuery: (query: string) => void;
};

function CountrySedes({ t, country, countryTexts, locale, city, query, minute, count, onBack, onCity, onQuery }: CountrySedesProps) {
  const info = countries.find((c) => c.id === country) ?? countries[0];
  const listed = sedes.filter((s) => s.country === country);
  const cities = [...new Set(listed.map((s) => s.city))].sort(new Intl.Collator(locale).compare);
  const q = normalize(query.trim());
  const results = listed.filter(
    (s) => (!city || s.city === city) && (!q || normalize(`${s.name} ${s.city} ${s.address ?? ""}`).includes(q)),
  );

  return (
    <>
      <div className="flex items-center gap-3 border-b border-mist pb-4">
        <RoundButton label={t.allCountries} onClick={onBack} flip small />
        <h3 className="flex-1 text-[clamp(1.125rem,0.95rem+0.4vw,1.375rem)] leading-tight font-bold text-ink">{countryTexts[country].sedesIn}</h3>
        <span className="shrink-0 rounded-full bg-cream px-3 py-1 text-sm font-bold text-brand">{count(info.sedes)}</span>
      </div>

      {listed.length === 0 ? (
        <div className="py-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-cream text-brand">
            <ClinicIcon className="size-7" />
          </span>
          <p className="mx-auto mt-4 max-w-xs text-ink">{t.comingSoon}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-brand px-4 text-[0.9375rem] font-bold text-white transition hover:bg-brand-dark active:scale-[0.97]"
          >
            {t.contactUs}
          </a>
        </div>
      ) : (
        <>
          <label className="relative mt-4 block">
            <span className="sr-only">{t.search}</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={t.search}
              className="h-11 w-full rounded-lg border border-mist bg-white pr-3 pl-11 text-[0.95rem] text-ink transition-colors outline-none placeholder:text-muted focus:border-brand"
            />
          </label>

          {cities.length > 1 ? (
            <div role="group" aria-label={t.cities} className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
              {[null, ...cities].map((value) => {
                const active = city === value;
                return (
                  <button
                    key={value ?? "todas"}
                    type="button"
                    onClick={() => onCity(value)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors duration-150 ${
                      active ? "bg-brand text-white" : "bg-mist/70 text-ink/75 hover:bg-cream hover:text-brand"
                    }`}
                  >
                    {value ?? t.allCities}
                  </button>
                );
              })}
            </div>
          ) : null}

          {results.length > 0 ? (
            <ul aria-live="polite" className="mt-4 space-y-3 lg:max-h-[27rem] lg:overflow-y-auto lg:pr-1">
              {results.map((sede) => (
                <li key={sede.id} className="rounded-xl border border-mist p-4">
                  <SedeCard sede={sede} t={t} countryName={countryTexts[country].name} timeZone={info.timeZone} minute={minute} />
                </li>
              ))}
            </ul>
          ) : (
            <p aria-live="polite" className="py-6 text-center text-ink/70">
              {t.noResults}
            </p>
          )}

          {listed.length < info.sedes ? (
            <p className="mt-4 border-t border-mist pt-4 text-sm text-ink/75">
              {t.morePending}{" "}
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline-offset-2 hover:underline">
                {t.contactUs}
              </a>
            </p>
          ) : null}
        </>
      )}
    </>
  );
}

type SedeCardProps = {
  sede: Sede;
  t: Texts;
  countryName: string;
  timeZone: string;
  minute: number | null;
};

function SedeCard({ sede, t, countryName, timeZone, minute }: SedeCardProps) {
  const open = sede.hours?.length && minute !== null ? isOpenAt(sede.hours, timeZone, minute) : null;
  const hasDetails = Boolean(sede.address || sede.phone || sede.hours?.length);

  return (
    <>
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cream text-brand">
          <ClinicIcon className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-[1.0625rem] leading-tight font-bold text-ink">{fill(t.sedeName, { name: sede.name })}</h4>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-mist/70 px-2 py-0.5 text-xs font-bold text-ink/70">
            <BuildingIcon className="size-3.5" />
            {sede.city}
          </span>
        </div>
        {open === null ? null : (
          <span className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-bold ${open ? "text-green-700" : "text-ink/60"}`}>
            <span aria-hidden className={`size-2 rounded-full ${open ? "bg-green-600" : "bg-muted"}`} />
            {open ? t.openNow : t.closedNow}
          </span>
        )}
      </div>

      {hasDetails ? (
        <dl className="mt-3 space-y-2 rounded-lg bg-[#f7f7f7] p-3 text-sm text-ink/80">
          {sede.address ? (
            <div className="flex gap-2.5">
              <dt>
                <span className="sr-only">{t.address}</span>
                <MapPinIcon className="mt-px size-4 text-brand" />
              </dt>
              <dd>{sede.address}</dd>
            </div>
          ) : null}
          {sede.phone ? (
            <div className="flex gap-2.5">
              <dt>
                <span className="sr-only">{t.phone}</span>
                <PhoneIcon className="mt-px size-4 text-brand" />
              </dt>
              <dd>
                <a href={`tel:${sede.phone.replace(/[^\d+]/g, "")}`} className="hover:text-brand">
                  {sede.phone}
                </a>
              </dd>
            </div>
          ) : null}
          {sede.hours?.length ? (
            <div className="flex gap-2.5">
              <dt>
                <span className="sr-only">{t.hours}</span>
                <ClockIcon className="mt-px size-4 text-brand" />
              </dt>
              <dd>
                {formatHours(sede.hours, t.weekdays).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="mt-3 flex justify-end">
        <a
          href={mapsHref(sede, countryName)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-brand px-3.5 text-sm font-bold text-white transition hover:bg-brand-dark active:scale-[0.97]"
        >
          <DirectionsIcon className="size-4" />
          {t.directions}
        </a>
      </div>
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
        small ? "size-9" : "size-10"
      }`}
    >
      <ChevronIcon className={`h-4 w-3 ${flip ? "rotate-180" : ""}`} />
    </button>
  );
}
