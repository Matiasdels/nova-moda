"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  function goTo(index: number) {
    setActiveIndex((index + images.length) % images.length);
  }

  useEffect(() => {
    if (!isZoomOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomOpen(false);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isZoomOpen, activeIndex]);

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      <div className="flex gap-2 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible no-scrollbar">
        {images.map((image, index) => (
          <button
            key={image + index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ver imagen ${index + 1} de ${productName}`}
            aria-current={activeIndex === index}
            className={cn(
              "relative h-20 w-16 shrink-0 overflow-hidden border bg-brand-gray lg:h-24 lg:w-20",
              activeIndex === index ? "border-brand-black" : "border-transparent",
            )}
          >
            <Image src={image} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="group relative block aspect-[3/4] w-full overflow-hidden bg-brand-gray focus-ring"
          aria-label="Ampliar imagen"
        >
          <Image
            src={images[activeIndex]}
            alt={`${productName} — imagen ${activeIndex + 1} de ${images.length}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-brand-white/90 text-brand-black opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" />
          </span>
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-brand-white/90 text-brand-black focus-ring"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-brand-white/90 text-brand-black focus-ring"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${productName}`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-black/90 p-4"
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Cerrar vista ampliada"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-brand-white focus-ring"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-3xl">
            <Image
              src={images[activeIndex]}
              alt={`${productName} — imagen ampliada ${activeIndex + 1} de ${images.length}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-brand-white focus-ring"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Imagen siguiente"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-brand-white focus-ring"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
