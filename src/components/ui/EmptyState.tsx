import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gray">
        <Icon className="h-7 w-7 text-brand-black" aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold text-brand-black">{title}</h2>
        <p className="max-w-sm text-sm text-brand-muted">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="primary" size="md" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
