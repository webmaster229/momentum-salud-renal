"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { easeInCubic, easeOutQuint } from "@/components/motion/easing";
import { ChevronDownIcon } from "@/components/ui/icons";
import { localeNames, localePath, locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  /** Ruta actual sin prefijo de idioma. */
  path: string;
  label: string;
  inline?: boolean;
};

export function LanguageSwitcher({ locale, path, label, inline }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (inline) {
    return (
      <div role="group" aria-label={label} className="flex gap-2">
        {locales.map((l) => (
          <Link
            key={l}
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`rounded-[5px] px-4 py-2 font-bold uppercase transition ${
              l === locale ? "bg-brand text-white" : "bg-mist text-ink/70 hover:text-brand"
            }`}
          >
            {l}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${locale}, ${label}: ${localeNames[locale]}`}
        className="flex items-center gap-1 py-2 text-[clamp(1rem,0.6rem+0.5vw,1.25rem)] font-bold text-muted uppercase transition-colors duration-150 hover:text-brand"
      >
        {locale}
        <ChevronDownIcon className={`size-4 transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open ? (
          <m.ul
            className="absolute top-full right-0 mt-2 min-w-40 origin-top-right overflow-hidden rounded-xl bg-white py-1.5 shadow-card ring-1 ring-mist"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.18, ease: easeOutQuint } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.12, ease: easeInCubic } }}
          >
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={localePath(l, path)}
                  hrefLang={l}
                  lang={l}
                  onClick={() => setOpen(false)}
                  aria-current={l === locale ? "true" : undefined}
                  className={`flex items-center justify-between gap-4 px-4 py-2.5 font-bold transition-colors hover:bg-cream ${
                    l === locale ? "text-brand" : "text-ink/75"
                  }`}
                >
                  {localeNames[l]}
                  <span className="text-sm text-muted uppercase">{l}</span>
                </Link>
              </li>
            ))}
          </m.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
