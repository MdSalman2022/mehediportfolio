"use client";

import { forwardRef } from "react";

const TextArea = forwardRef(
  (
    { label, error, rows = 4, className = "", required = false, ...props },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-1 resize-none";
    const errorClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "focus:border-blue-500 focus:ring-blue-500";

    const textareaClasses = `${baseClasses} ${errorClasses} ${className}`;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={textareaClasses}
          {...props}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
