"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none tracking-wide uppercase text-xs";

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary:
        "border border-border text-foreground hover:border-primary hover:text-primary",
      outline:
        "border border-border text-muted-foreground hover:border-primary hover:text-primary",
      ghost: "text-muted-foreground hover:text-primary",
    };

    const sizes = {
      sm: "px-5 py-2",
      md: "px-6 py-3",
      lg: "px-8 py-4",
    };

    const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
          disabled || loading ? disabledClasses : ""
        } ${className}`}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
