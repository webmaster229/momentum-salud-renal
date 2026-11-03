"use client";

import Image from "next/image";
import { MotionConfig, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { countries, type CountryId } from "@/content/site";
import { easeOutBack } from "@/components/motion/easing";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const point: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeOutBack } },
};

/** Igual que --animate-pulse-ring en globals.css. */
const PULSE_MS = 2400;

type MapPointsProps = {
  labels: Record<CountryId, string>;
  ariaLabel: string;
  activeId?: CountryId | null;
  /** Si se pasa, los puntos son botones para elegir país. */
  onSelect?: (id: CountryId) => void;
  className?: string;
};

export function MapPoints({ labels, ariaLabel, activeId, onSelect, className = "" }: MapPointsProps) {
  return (
    // pointer-events-none: el mapa se superpone a otras columnas sin taparles los clics.
    <div className={`@container pointer-events-none relative aspect-[931/847] w-full ${className}`}>
      <Image src="/images/mapa-latam.png" alt="" fill sizes="(min-width: 1024px) 931px, 92vw" className="object-contain" />
      {/* "never": animación pequeña que se mantiene aunque el sistema pida reducir movimiento. */}
      <MotionConfig reducedMotion="never">
        <m.ul
          className="absolute inset-0"
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          aria-label={ariaLabel}
        >
          {countries.map((c, i) => {
            const isMain = "main" in c && c.main;
            const active = activeId === c.id;
            const dimmed = activeId != null && !active;
            // Retraso negativo: cada punto empieza en otra fase del ciclo, sin esperar.
            const phase = -((i * 340) % PULSE_MS);
            const marker = (
              <>
                {active ? <span aria-hidden className="absolute -inset-1/2 rounded-full bg-white/15" /> : null}
                {[0, PULSE_MS / 2].map((offset) => (
                  <span
                    key={offset}
                    aria-hidden
                    className="absolute inset-[18%] animate-pulse-ring rounded-full border-2 border-white"
                    style={{ animationDelay: `${phase - offset}ms` }}
                  />
                ))}
                <span aria-hidden className="absolute inset-0 animate-beat" style={{ animationDelay: `${phase}ms` }}>
                  <Image src="/images/punto-ondas.png" alt="" fill sizes="64px" className="object-contain" />
                  {isMain || active ? (
                    <span className="absolute inset-[38%] rounded-full bg-white shadow-[0_0_16px_rgb(255_255_255/0.9)]" />
                  ) : null}
                </span>
              </>
            );
            return (
              <li key={c.id} className="pointer-events-none absolute inset-0">
                {/* El atenuado va en el hijo: Motion escribe opacity/scale en línea en este span. */}
                <m.span
                  variants={point}
                  className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 ${isMain || active ? "w-[9%]" : "w-[7%]"}`}
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  {onSelect ? (
                    <button
                      type="button"
                      onClick={() => onSelect(c.id)}
                      aria-pressed={active}
                      aria-label={labels[c.id]}
                      className={`relative block aspect-square w-full cursor-pointer rounded-full transition-[opacity,scale] duration-300 ease-out hover:scale-110 ${
                        active ? "scale-125 hover:scale-125" : ""
                      } ${dimmed ? "opacity-70" : ""}`}
                    >
                      {marker}
                    </button>
                  ) : (
                    <span className="relative block aspect-square">{marker}</span>
                  )}
                </m.span>
                <m.span
                  variants={point}
                  aria-hidden={onSelect ? true : undefined}
                  // Mínimo 10 px para que se lean en celular.
                  className="absolute -translate-y-[78%] text-[max(2.28cqw,0.625rem)] leading-none font-bold whitespace-nowrap text-white"
                  style={{ ...("labelEnd" in c ? { right: `${100 - c.labelX}%` } : { left: `${c.labelX}%` }), top: `${c.labelY}%` }}
                >
                  <span className={`transition-opacity duration-300 ${dimmed ? "opacity-70" : ""}`}>{labels[c.id]}</span>
                </m.span>
              </li>
            );
          })}
        </m.ul>
      </MotionConfig>
    </div>
  );
}
