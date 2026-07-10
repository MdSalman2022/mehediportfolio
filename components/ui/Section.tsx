"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  backgroundVariant?: "default" | "dark" | "darker" | "gradient";
}

const Section = ({
  id,
  children,
  className = "",
  title,
  subtitle,
  backgroundVariant = "default",
  ...props
}: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const backgroundVariants = {
    default: "py-20",
    dark: "py-20 bg-gray-800/30",
    darker: "py-20 bg-gray-800/50",
    gradient: "py-20 bg-gray-800/20",
  };

  const sectionClasses = `${backgroundVariants[backgroundVariant]} ${className}`;

  return (
    <section id={id} className={sectionClasses} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              {title && (
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
