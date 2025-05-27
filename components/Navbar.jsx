"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolioStore";
import { smoothScrollTo } from "@/lib/utils";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { activeSection, isMenuOpen, setMenuOpen, scrollY } =
    usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavClick = (sectionId) => {
    console.log("Nav click:", sectionId, "Menu open:", isMenuOpen); // Debug log

    // Close mobile menu first
    if (isMenuOpen) {
      setMenuOpen(false);
    }

    // Add a small delay for mobile to ensure menu animation completes
    const delay = isMenuOpen && window.innerWidth < 768 ? 300 : 0;

    setTimeout(() => {
      console.log("Scrolling to:", sectionId); // Debug log
      smoothScrollTo(sectionId);
    }, delay);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => handleNavClick("hero")}
          >
            <span className="text-blue-400">Mehedi</span>
            <span>.dev</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              href="https://github.com/MdSalman2022"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              href="https://www.linkedin.com/in/mehedihasan-salman/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              href="mailto:mehedi.salman102@gmail.com"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>{" "}
      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800`}
        style={{
          display: isMenuOpen ? "block" : "none",
        }}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                activeSection === item.id
                  ? "text-blue-400 bg-blue-400/10"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Social Links */}
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-800">
            <a
              href="https://github.com/MdSalman2022"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mehedihasan-salman/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:mehedi.salman102@gmail.com"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
