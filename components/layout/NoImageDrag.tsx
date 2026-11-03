"use client";

import { useEffect } from "react";

/** Complementa -webkit-user-drag de globals.css, que Firefox no conoce. */
export function NoImageDrag() {
  useEffect(() => {
    const onDragStart = (e: DragEvent) => {
      const target = e.target;
      if (target instanceof HTMLImageElement || (target instanceof Element && target.closest("a")?.querySelector("img"))) {
        e.preventDefault();
      }
    };
    document.addEventListener("dragstart", onDragStart);
    return () => document.removeEventListener("dragstart", onDragStart);
  }, []);

  return null;
}
