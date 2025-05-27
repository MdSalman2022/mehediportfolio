"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Loader2 className={`${sizeClasses[size]} text-blue-400 animate-spin`} />
    </motion.div>
  );
}
