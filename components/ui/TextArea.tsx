"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {label, error, rows = 4, className = "", required = false, ...props},
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
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-4 py-3 bg-background border ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-border focus:border-primary focus:ring-primary"
          } text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-1 text-sm resize-none ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
