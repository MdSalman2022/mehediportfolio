"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      icon,
      className = "",
      onClick,
      type = "button",
      as = "button",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500",
      secondary:
        "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 focus:ring-gray-500",
      outline:
        "bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
      ghost:
        "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800/50 focus:ring-gray-500",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

    const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled || loading ? disabledClasses : ""}
    ${className}
  `.trim();

    const LoadingSpinner = () => (
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    );

    const buttonContent = (
      <>
        {loading && <LoadingSpinner />}
        {!loading && icon && icon}
        {children}
      </>
    );

    // Handle different element types
    const Component = as;
    const elementProps = {
      ref,
      className: buttonClasses,
      disabled: disabled || loading,
      ...props,
    };

    // Add type for buttons only
    if (as === "button") {
      elementProps.type = type;
      elementProps.onClick = onClick;
    }

    if (variant === "primary" && !disabled && !loading && as === "button") {
      return (
        <motion.button
          {...elementProps}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <span className="relative z-10 flex items-center gap-3 cursor-pointer">
            {buttonContent}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </motion.button>
      );
    }

    return <Component {...elementProps}>{buttonContent}</Component>;
  }
);

Button.displayName = "Button";

export default Button;
