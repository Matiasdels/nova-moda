"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItemData = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export function Accordion({
  items,
  defaultOpenId,
}: {
  items: AccordionItemData[];
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);

  return (
    <div className="divide-y divide-brand-border border-y border-brand-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? undefined : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-medium uppercase tracking-wide text-brand-black focus-ring"
            >
              {item.title}
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden text-sm leading-relaxed text-brand-muted">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
