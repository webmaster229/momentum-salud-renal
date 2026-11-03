"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/** LazyMotion + componentes `m`: el motor de animación no entra en el bundle inicial. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
