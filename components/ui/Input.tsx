"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {label, error, type = "text", className = "", required = false, ...props},
    ref,
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full px-4 py-3 bg-background border ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-border focus:border-primary focus:ring-primary"
          } text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-1 text-sm ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
