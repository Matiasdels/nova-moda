"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToastStore } from "@/lib/store/toast";
import { cn } from "@/lib/utils";

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const dismissToast = useToastStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Notificaciones"
      className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.variant];
        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "flex items-start gap-3 border bg-brand-white p-4 shadow-sm animate-slide-up",
              toast.variant === "error" ? "border-brand-red" : "border-brand-black",
            )}
          >
            <Icon
              className={cn("mt-0.5 h-5 w-5 shrink-0", toast.variant === "error" ? "text-brand-red" : "text-brand-black")}
              aria-hidden="true"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-brand-black">{toast.title}</p>
              {toast.description && <p className="mt-0.5 text-sm text-brand-muted">{toast.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Cerrar notificación"
              className="text-brand-muted hover:text-brand-black focus-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
