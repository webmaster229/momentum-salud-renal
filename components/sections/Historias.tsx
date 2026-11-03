"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { container } from "@/components/ui/container";
import { ChevronIcon, PlayIcon } from "@/components/ui/icons";
import { VideoModal } from "@/components/ui/VideoModal";
import { historias, type Historia } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries/es";

type HistoriasProps = {
  t: Dictionary["historias"];
  heading: React.ReactNode;
};

export function Historias({ t, heading }: HistoriasProps) {
  const [video, setVideo] = useState<Historia | null>(null);
  const closeVideo = useCallback(() => setVideo(null), []);

  return (
    <section id="historias" aria-labelledby="historias-title" className="bg-white py-16 lg:pt-[clamp(4rem,4.2vw,5rem)] lg:pb-[clamp(4rem,4.6vw,5.5rem)]">
      <div className={container}>
        {heading}

        <Stagger
          as="ul"
          className="mx-auto mt-10 grid max-w-[1420px] gap-6 sm:grid-cols-3 sm:gap-4 lg:mt-[clamp(2.5rem,4.2vw,5rem)] lg:gap-[clamp(1.5rem,3vw,3.6rem)]"
        >
          {historias.map((h) => (
            <StaggerItem as="li" key={h.id}>
              <button
                type="button"
                onClick={() => setVideo(h)}
                aria-label={`${t.watch} ${t.quotes[h.id]}`}
                className="group flex h-full w-full flex-col rounded-[1.25rem] bg-white p-[clamp(0.75rem,1vw,1.25rem)] text-left shadow-card transition-[translate,box-shadow] duration-300 ease-out-quint hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="relative block aspect-[390/259] w-full overflow-hidden rounded-[1.25rem] bg-mist">
                  <Image
                    src={h.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 ease-out-quint group-hover:scale-[1.04]"
                  />
                  <PlayIcon className="absolute top-1/2 left-1/2 size-[26%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_2px_8px_rgb(0_0_0/0.25)] transition-transform duration-300 ease-out-quint group-hover:scale-110" />
                </span>
                <span className="mt-4 block max-w-[11em] px-2 text-stat text-brand">“{t.quotes[h.id]}”</span>
                <span className="mt-auto flex justify-end px-2 pt-6 pb-1 text-brand">
                  <ChevronIcon className="h-6 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <VideoModal
        historia={video}
        title={video ? t.quotes[video.id] : ""}
        labels={{ soon: t.videoSoon, close: t.closeVideo }}
        onClose={closeVideo}
      />
    </section>
  );
}
