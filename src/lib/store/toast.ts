import { create } from "zustand";
import type { ToastMessage, ToastVariant } from "@/lib/types";

type ToastState = {
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, variant?: ToastVariant) => void;
  dismissToast: (id: string) => void;
};

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  showToast: (title, description, variant = "success") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    set({ toasts: [...get().toasts, { id, title, description, variant }] });
    setTimeout(() => {
      get().dismissToast(id);
    }, 3500);
  },
  dismissToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));
