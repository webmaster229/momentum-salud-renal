"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { useId } from "react";
import { easeInOutCubic } from "./easing";

/** Línea central del trazo de corazon.png (348×316), desde el remate redondo de la derecha. */
const PATH =
  "M282 176C284.5 171.7 293.2 159.8 297 150C300.8 140.2 305.7 128 305 117C304.3 106 299.2 93.2 293 84C286.8 74.8 277.8 66.7 268 62C258.2 57.3 244.8 55.7 234 56C223.2 56.3 212 61.3 203 64C194 66.7 187.7 71.8 180 72C172.3 72.2 166 67.7 157 65C148 62.3 137 56.7 126 56C115 55.3 101.2 56.3 91 61C80.8 65.7 71.3 74.8 65 84C58.7 93.2 53.7 105 53 116C52.3 127 56.7 139.8 61 150C65.3 160.2 72.8 169.2 79 177C85.2 184.8 91.8 190.8 98 197C104.2 203.2 110.2 208.3 116 214C121.8 219.7 126.8 224.8 133 231C139.2 237.2 145.2 245 153 251C160.8 257 171 267.3 180 267C189 266.7 199.3 255.2 207 249C214.7 242.8 220 236 226 230C232 224 237.3 218.7 243 213C248.7 207.3 253 202.8 260 196C267 189.2 280.8 176 285 172";

// Se dibuja TIMES veces (DRAW s dibujando de cada CYCLE s) y queda completo.
const DELAY = 0.35;
const CYCLE = 3;
const DRAW = 1.8;
const TIMES = 4;

const draw: Variants = {
  // opacity 0: un trazo de largo 0 con remate redondo se vería como un punto.
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: [0, 1, 1],
    opacity: 1,
    transition: {
      pathLength: {
        delay: DELAY,
        duration: CYCLE,
        times: [0, DRAW / CYCLE, 1],
        ease: [easeInOutCubic, "linear"],
        repeat: TIMES - 1,
      },
      opacity: { delay: DELAY, duration: 0.01 },
    },
  },
};

export function DrawnHeart({ className = "" }: { className?: string }) {
  const maskId = `corazon-${useId().replace(/[^\w-]/g, "")}`;

  return (
    <m.svg
      aria-hidden
      viewBox="0 0 348 316"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="348" height="316">
        {/* Más ancho que la banda del corazón (~70) por si la línea central no es exacta. */}
        <m.path d={PATH} fill="none" stroke="#fff" strokeWidth={104} strokeLinecap="round" strokeLinejoin="round" variants={draw} />
      </mask>
      <image href="/images/corazon.png" width="348" height="316" mask={`url(#${maskId})`} />
    </m.svg>
  );
}
