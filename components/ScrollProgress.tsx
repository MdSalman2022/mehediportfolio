"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePortfolioStore } from "@/store/portfolioStore";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      const sections = ["hero", "about", "experience", "projects", "contact"];
      const sectionElements = sections.map((id) => document.getElementById(id));

      let activeSection = "hero";
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            activeSection = sections[i];
            break;
          }
        }
      }

      setActiveSection(activeSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      className="fixed top-0 left-0 h-1 bg-primary z-50 origin-left"
      style={{ width: "100%" }}
    />
  );
}
