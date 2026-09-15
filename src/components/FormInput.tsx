import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
  id: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

export function FormInput({ label, error, hint, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {props.required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`h-12 rounded-xl border bg-white px-4 text-base text-ink placeholder:text-ink-muted/70 transition-colors ${
          error ? "border-danger" : "border-sand focus:border-sage"
        } ${className}`}
        {...props}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type AreaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormTextarea({ label, error, hint, id, className = "", ...props }: AreaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        className={`min-h-28 rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 ${
          error ? "border-danger" : "border-sand focus:border-sage"
        } ${className}`}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-ink-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
