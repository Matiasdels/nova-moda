"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

export function TopBar() {
  const messages = siteConfig.announcementBar;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-brand-black text-brand-white">
      <div className="container-page flex h-9 items-center justify-center text-center sm:justify-between">
        {/* Móvil: mensaje rotativo */}
        <p className="text-xs tracking-wide sm:hidden" aria-live="polite">
          {messages[activeIndex]}
        </p>

        {/* Escritorio: todos los mensajes distribuidos */}
        <div className="hidden w-full items-center justify-between text-xs tracking-wide sm:flex">
          {messages.map((message) => (
            <span key={message}>{message}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
