"use client";

import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  animate = false,
  delay = 0,
  ...props
}) => {
  const baseClasses =
    "bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm";
  const hoverClasses = hover
    ? "hover:bg-gray-800/70 transition-all duration-300"
    : "";

  const cardClasses = `${baseClasses} ${hoverClasses} ${className}`;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay }}
        className={cardClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
