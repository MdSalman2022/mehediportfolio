"use client";

import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      icon,
      type = "text",
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-1";
    const errorClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "focus:border-blue-500 focus:ring-blue-500";

    const inputClasses = `${baseClasses} ${errorClasses} ${className}`;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={`${inputClasses} ${icon ? "pl-10" : ""}`}
            {...props}
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
