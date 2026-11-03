"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import type { Historia } from "@/content/site";
import { easeInCubic, easeOutQuint } from "@/components/motion/easing";

type VideoModalProps = {
  historia: Historia | null;
  title: string;
  labels: { soon: string; close: string };
  onClose: () => void;
};

/** El iframe de YouTube solo se crea al abrir, así no pesa en la carga inicial. */
export function VideoModal({ historia, title, labels, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!historia) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [historia, onClose]);

  return (
    <AnimatePresence>
      {historia ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={`Video: ${title}`}>
          <m.div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          />
          <m.div
            // El ancho también depende del alto: en un celular horizontal el video 16:9 debe caber.
            className="relative w-full max-w-[min(56rem,calc((100dvh-4rem)*16/9))] overflow-hidden rounded-3xl bg-ink shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, ease: easeOutQuint } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: easeInCubic } }}
          >
            <div className="relative aspect-video">
              {historia.youtubeId ? (
                <iframe
                  className="absolute inset-0 size-full"
                  src={`https://www.youtube-nocookie.com/embed/${historia.youtubeId}?autoplay=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image src={historia.image} alt="" fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover opacity-40" />
                  <p className="absolute inset-0 flex items-center justify-center p-8 text-center text-xl font-bold text-white sm:text-2xl">
                    {labels.soon}
                  </p>
                </>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-ink transition hover:bg-white active:scale-[0.97]"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
