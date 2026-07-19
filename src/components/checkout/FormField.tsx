import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  optional?: boolean;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, optional, id, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-black">
          {label}
          {optional && <span className="ml-1 font-normal text-brand-muted">(opcional)</span>}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-11 w-full border px-3 text-sm focus:outline-none",
            error ? "border-brand-red" : "border-brand-border focus:border-brand-black",
          )}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-brand-red">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, optional, id, className, children, ...props }, ref) => {
    return (
      <div className={className}>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-black">
          {label}
          {optional && <span className="ml-1 font-normal text-brand-muted">(opcional)</span>}
        </label>
        <select
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-11 w-full border bg-brand-white px-3 text-sm focus:outline-none",
            error ? "border-brand-red" : "border-brand-border focus:border-brand-black",
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-brand-red">
            {error}
          </p>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
