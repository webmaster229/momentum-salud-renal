"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

const DURATION = 1200;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// El HTML del servidor ya trae el valor final (SEO y sin JS). El número se escribe
// directo en el DOM para no re-renderizar React en cada frame.
type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  locale: string;
};

export function CountUp({ value, prefix = "", suffix = "", locale }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const final = `${prefix}${new Intl.NumberFormat(locale).format(value)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const format = new Intl.NumberFormat(locale);
    const write = (n: number) => (node.textContent = `${prefix}${format.format(n)}${suffix}`);
    if (!inView) {
      write(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      write(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, prefix, suffix, locale]);

  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {final}
      </span>
    </>
  );
}
