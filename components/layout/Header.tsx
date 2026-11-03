"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useState } from "react";
import { easeInCubic, easeOutQuint } from "@/components/motion/easing";
import { containerWide } from "@/components/ui/container";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { LanguageSwitcher } from "./LanguageSwitcher";

const items = [
  { key: "inicio", path: "/" },
  { key: "sedes", path: "/sedes" },
  { key: "sobre", path: "/sobre-momentum" },
  { key: "contacto", path: "/contacto" },
] as const;

export function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const path = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (itemPath: string) => (itemPath === "/" ? path === "/" : !itemPath.includes("#") && path.startsWith(itemPath));

  return (
    <header
      data-scrolled={scrolled || open}
      className="fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ease-out data-[scrolled=true]:shadow-[0_4px_24px_-12px_rgb(0_0_0/0.18)]"
    >
      <div className={`${containerWide} flex h-16 items-center justify-between gap-6 lg:h-20 2xl:h-[100px]`}>
        <Link href={localePath(locale, "/")} className="shrink-0" aria-label={t.home}>
          <Image
            src="/images/logos/momentum-salud-renal.png"
            alt="Momentum Salud Renal"
            width={1337}
            height={249}
            loading="eager"
            className="h-auto w-[clamp(170px,21.7vw,417px)]"
          />
        </Link>

        <div className="hidden items-center lg:flex">
          <nav aria-label={t.label}>
            <ul className="flex items-center gap-[clamp(0.75rem,1.6vw,1.9rem)]">
              {items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.key}>
                    <Link
                      href={localePath(locale, item.path)}
                      aria-current={active ? "page" : undefined}
                      className={`relative block py-2.5 text-nav font-bold transition-colors duration-150 hover:text-brand ${
                        active
                          ? "text-brand after:absolute after:inset-x-0 after:bottom-0.5 after:h-[3px] after:rounded-full after:bg-gradient-to-r after:from-brand after:via-brand after:to-brand/0"
                          : "text-muted"
                      }`}
                    >
                      {t[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span aria-hidden className="mx-[clamp(1rem,1.3vw,1.6rem)] h-10 w-px bg-line" />
          <LanguageSwitcher locale={locale} path={path} label={t.language} />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? t.closeMenu : t.openMenu}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition active:scale-[0.94] lg:hidden"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <m.nav
            id="menu-movil"
            aria-label={t.label}
            // Con scroll propio: en un celular horizontal el menú es más alto que la pantalla.
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-mist bg-white px-5 pt-2 pb-6 shadow-[0_16px_24px_-16px_rgb(0_0_0/0.2)] sm:px-8 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: easeOutQuint } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: easeInCubic } }}
          >
            <ul>
              {items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.key}>
                    <Link
                      href={localePath(locale, item.path)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block border-b border-mist py-3.5 text-lg font-bold ${active ? "text-brand" : "text-ink/70"}`}
                    >
                      {t[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4">
              <LanguageSwitcher locale={locale} path={path} label={t.language} inline />
            </div>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
